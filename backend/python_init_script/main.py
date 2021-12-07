# SPDX-License-Identifier: MIT
# SPDX-FileCopyrightText: 2021 Felix Steinkohl <steinkohl@campus.tu-berlin.de>

import os
from dataclasses import dataclass
import pandas as pd
from appwrite.client import Client
from appwrite.services.users import Users
from appwrite.services.teams import Teams
from appwrite.exception import AppwriteException


@dataclass
class UserData:
    """
    Dataclass for specifying user data
    """

    name: str
    email: str
    team: str
    roles: [str]
    init_password: str


def load_user_data(file: str) -> [UserData]:
    """
    Reads the given file and parses it into UserData objects.

    :param file: path of file containing the user data that shall be loaded
    :type file: str
    :return: iterable of the loaded UserData objects
    :rtype: [UserData]
    """

    def _replace_nan(val) -> str:
        # if cell has no value in xlsx/csv it will result in a nan value
        return "" if str(val) == "nan" else str(val)

    def _get_roles(row):
        # split roles by ',' if there are more
        _roles = str(row["Roles"])
        return [] if _roles == "nan" else _roles.split(",")

    ending = str(file).lower().split(".")[-1]
    if ending == "csv":
        user_data_df = pd.read_csv(file, dtype=str)
        # if there are less than 5 columns -> there might be ';' used as separators
        if user_data_df.shape[1] < 5:
            user_data_df = pd.read_csv(file, sep=";", dtype=str)
    elif ending in ["xlsx", "xls"]:
        user_data_df = pd.read_excel(file, dtype=str)
    else:
        raise TypeError("Only csv and xlsx format are supported!")

    for row_id, row in user_data_df.iterrows():
        yield UserData(
            name=str(row["Name"]),
            email=str(row["Email"]),
            team=_replace_nan(row["Team"]),
            roles=_get_roles(row),
            init_password=_replace_nan(row["InitialPassword"]),
        )


def init_client(
    project_id: str = os.getenv("APPWRITE_PROJECT"),
    endpoint: str = os.getenv("APPWRITE_ENDPOINT"),
    api_key: str = os.getenv("APPWRITE_API_KEY"),
) -> Client:
    """
    Initializes the appwrite client object.

    :param project_id: Project ID of the targeted appwrite project
    :type project_id: str
    :param endpoint: URL of the appwrite endpoint
    :type endpoint: str
    :param api_key: API key to access appwrite backend
    :type api_key: str
    :return: Initialized appwrite client object
    :rtype: Client
    """
    _client = Client()
    _client.set_endpoint(endpoint)
    _client.set_project(project_id)
    _client.set_key(api_key)
    return _client


def get_or_create_team_id(teams: Teams, team_name: str) -> str:
    """
    Gets team id of given team name, if no team with this name is found the method creates the team.
    If it finds more then one team of the given name, an exception is raised.

    :param teams: teams object, containing the server information
    :type teams: Teams
    :param team_name: team name which id shall be returned
    :type team_name: str
    :return: ID of the team
    :rtype: str
    """

    def _filter_team_by_name(
        _teams: Teams = teams, _team_name: str = team_name
    ) -> [str]:
        _ids = [
            x["$id"] if x["name"] == team_name else None for x in _teams.list()["teams"]
        ]
        return list(filter(None, _ids))

    team_ids = _filter_team_by_name()
    # team already exists
    if len(team_ids) == 1:
        return team_ids[0]
    # team not found -> create
    if len(team_ids) == 0:
        response = teams.create(team_name)
        return response["$id"]
    raise ValueError(f"Expected no or one '{team_name}' team but found {len(team_ids)}")


def add_user_to_team(
    teams: Teams, user_data: UserData, endpoint: str = os.getenv("APPWRITE_ENDPOINT")
):
    """
    Adds user to team, according to the user_data
    """
    teams.create_membership(
        team_id=get_or_create_team_id(teams, user_data.team),
        email=user_data.email,
        roles=user_data.roles,
        url=endpoint,
        name=user_data.name,
    )


def add_user(users: Users, user_data: UserData):
    """
    Creates user account, according to the user_data
    """
    users.create(
        email=user_data.email, password=user_data.init_password, name=user_data.name
    )


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(
        "\nThis script allows you to register users in appwrite projects, add them to teams with certain roles.\n"
        "You just have to load a csv or excel file in the layout of the provided template.\n"
        "API key, endpoint and project ID also have to be specified via environment variables or arguments.\n"
    )
    parser.add_argument("file", type=str, help="Path of file containing the user data")
    parser.add_argument(
        "--apikey",
        type=str,
        default=None,
        help="API key to access appwrite backend, you can instead "
        "also set the environment variable APPWRITE_API_KEY",
    )
    parser.add_argument(
        "--endpoint",
        type=str,
        default=None,
        help="URL of the appwrite endpoint, you can instead "
        "also set the environment variable APPWRITE_ENDPOINT",
    )
    parser.add_argument(
        "--projectid",
        type=str,
        default=None,
        help="Project ID of the targeted appwrite project, you can instead "
        "also set the environment variable APPWRITE_PROJECT",
    )
    args = parser.parse_args()

    appwrite_api_key = (
        str(args.apikey) if args.apikey else os.getenv("APPWRITE_API_KEY")
    )
    appwrite_endpoint = (
        str(args.endpoint) if args.endpoint else os.getenv("APPWRITE_ENDPOINT")
    )
    appwrite_project_id = (
        str(args.projectid) if args.projectid else os.getenv("APPWRITE_PROJECT")
    )

    print(
        f"Appwrite endpoint: {appwrite_endpoint}\n"
        f"Appwrite project ID: {appwrite_project_id}\n"
        f"Appwrite API key: {appwrite_api_key}"
    )

    if None in [appwrite_api_key, appwrite_endpoint, appwrite_project_id]:
        print(
            "Appwrite API key, project id and endpoint url must be provided "
            "via command line arguments or environment variables"
        )
        exit()

    client = init_client(
        api_key=appwrite_api_key,
        endpoint=appwrite_endpoint,
        project_id=appwrite_project_id,
    )
    users = Users(client)
    teams = Teams(client)

    user_data = load_user_data(args.file)
    for user in user_data:
        try:
            add_user(users=users, user_data=user)
        except AppwriteException as e:
            print(f"{user.email} - {e}")
        if len(user.team) < 1:
            continue
        try:
            add_user_to_team(teams=teams, user_data=user, endpoint=appwrite_endpoint)
        except AppwriteException as e:
            print(f"{user.email} - {user.team} - {e}")
