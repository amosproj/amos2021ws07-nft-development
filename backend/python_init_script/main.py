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
    name: str
    email: str
    team: str
    roles: [str]
    init_pw: str


def load_user_data(file: str) -> [UserData]:
    # assert "." in file, f"Expected file ending in {file}"
    ending = str(file).lower().split(".")[-1]
    user_df = pd.DataFrame()
    if ending == "csv":
        user_df = pd.read_csv(file, dtype=str)
        # if there are less than 5 columns -> there might be ';' used as separators
        if user_df.shape[1] < 5:
            user_df = pd.read_csv(file, sep=";", dtype=str)
    elif ending in ["xlsx", "xls"]:
        user_df = pd.read_excel(file, dtype=str)
    else:
        print("Only csv and xlsx format are supported!")

    for row_id, row in user_df.iterrows():
        # split roles by ',' if there are more
        _roles = str(row["Roles"])
        _roles = [] if _roles == "nan" else _roles.split(",")

        # if team has nan value -> replace with empty string
        _team = str(row["Team"])
        _team = "" if _team == "nan" else _team

        yield UserData(
            name=str(row["Name"]),
            email=str(row["Email"]),
            team=_team,
            roles=_roles,
            init_pw=str(row["InitialPassword"]),
        )


def init_client(
    project_id: str = os.getenv("APPWRITE_PROJECT_ID"),
    endpoint: str = os.getenv("APPWRITE_ENDPOINT"),
    api_key: str = os.getenv("APPWRITE_API_KEY"),
) -> Client:
    _client = Client()
    _client.set_endpoint(endpoint)
    _client.set_project(project_id)
    _client.set_key(api_key)
    return _client


def get_or_create_team_id(teams: Teams, team_name: str) -> str:
    result = teams.list()
    team_ids = [x["$id"] if x["name"] == team_name else None for x in result["teams"]]
    team_ids = list(filter(None, team_ids))
    if len(team_ids) == 1:
        return team_ids[0]
    if len(team_ids) == 0:
        result = teams.create(team_name)
        return result["$id"]
    raise ValueError(f"Expected no or one '{team_name}' team but found {len(team_ids)}")


def add_user_to_team(teams: Teams, user_data: UserData):
    teams.create_membership(
        team_id=get_or_create_team_id(teams, user_data.team),
        email=user_data.email,
        roles=user_data.roles,
        url=os.getenv("APPWRITE_ENDPOINT"),
        name=user_data.name,
    )


def add_user(users: Users, user_data: UserData):
    users.create(email=user_data.email, password=user_data.init_pw, name=user_data.name)


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument("file", type=str, help="Path of file containing user data")
    parser.add_argument("--apikey", type=str, default=None, help="Appwrite API key")
    parser.add_argument(
        "--endpoint", type=str, default=None, help="Appwrite endpoint URL"
    )
    parser.add_argument(
        "--projectid", type=str, default=None, help="Appwrite project ID"
    )
    args = parser.parse_args()

    _key = str(args.apikey) if args.apikey else os.getenv("APPWRITE_API_KEY")
    _end = str(args.endpoint) if args.endpoint else os.getenv("APPWRITE_ENDPOINT")
    _pid = str(args.projectid) if args.projectid else os.getenv("APPWRITE_PROJECT_ID")

    if None in [_key, _end, _pid]:
        print(
            "Appwrite API key, project id and endpoint url must be provided "
            "via command line arguments or environment variables"
        )
        exit()

    client = init_client(api_key=_key, endpoint=_end, project_id=_pid)
    users = Users(client)
    teams = Teams(client)

    user_data = load_user_data(args.file)
    for user in user_data:
        try:
            add_user(users, user)
            if len(user.team) > 0:
                add_user_to_team(teams, user)
        except AppwriteException as e:
            print(f"{user.email} - {e}")
        if len(user.team) > 0:
            try:
                add_user_to_team(teams, user)
            except AppwriteException as e:
                print(f"{user.email} - {user.team} - {e}")
