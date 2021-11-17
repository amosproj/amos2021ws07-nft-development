# SPDX-License-Identifier: MIT
# SPDX-FileCopyrightText: 2021 Felix Steinkohl <steinkohl@campus.tu-berlin.de>

import os
from appwrite.client import Client
from appwrite.services.users import Users
from appwrite.services.teams import Teams



def init_client(
    project_id: str = os.environ.get("APPWRITE_FUNCTION_PROJECT_ID"),
    endpoint: str = os.environ.get("APPWRITE_ENDPOINT"),
    api_key: str = os.environ.get("APPWRITE_API_KEY"),
) -> Client:
    _client = Client()
    _client.set_endpoint(endpoint)
    _client.set_project(project_id)
    _client.set_key(api_key)
    return _client


client = init_client()
users = Users(client)
teams = Teams(client)

result = teams.create("Admins")
_id = result["$id"]
_endpoint = os.environ.get("APPWRITE_ENDPOINT")

# fmt: off
teams.create_membership(team_id=_id, email="admin0@admin1.de", roles=['owner'], url=_endpoint, name="Berinike")
teams.create_membership(team_id=_id, email="admin1@admin1.de", roles=['owner'], url=_endpoint, name="Dominic")
teams.create_membership(team_id=_id, email="admin2@admin1.de", roles=['owner'], url=_endpoint, name="Felix")
teams.create_membership(team_id=_id, email="admin3@admin1.de", roles=['owner'], url=_endpoint, name="Nick S.")
teams.create_membership(team_id=_id, email="admin4@admin1.de", roles=['owner'], url=_endpoint, name="Christoph")
teams.create_membership(team_id=_id, email="admin5@admin1.de", roles=['owner'], url=_endpoint, name="Ba Que")
teams.create_membership(team_id=_id, email="admin6@admin1.de", roles=['owner'], url=_endpoint, name="Nik N.")
teams.create_membership(team_id=_id, email="admin7@admin1.de", roles=['owner'], url=_endpoint, name="Jannis")
# fmt: on

result = users.list()
print(result)
