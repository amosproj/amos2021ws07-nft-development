# -*- coding: utf-8 -*-

# initiate Database and query


from appwrite.client import Client
from appwrite.services.users import Users
from appwrite.services.teams import Teams

# change here
PROJECT_ID = "6184e0aa6723a"
API_KEY = (
    "e56c3a9f8c5de18a5818fb2cd1e097953bc27fcbeef49d870060659bb54949cb"
    "97107651e527051508937d38989df16b081d1b2d3b4852128c083d9f68c708be"
    "73975f7bb90310eee9df2eb7420b358490166fc04f96593f07dc5c5f17b440a0"
    "876ae10626b7ca8e19d82e31012851aacf609daa22ebfdbdd6bad82f064f3a7f"
)
API_ENDPOINT = "http://localhost/v1"


client = Client()

(
    client.set_endpoint(API_ENDPOINT)  # Your API Endpoint
    .set_project(PROJECT_ID)  # Your project ID
    .set_key(API_KEY)  # Your secret API key
)
users = Users(client)
teams = Teams(client)


"""
users.create('admin0@admin1.de','password',"Berinike")
users.create('admin1@admin1.de', 'password',"Dominic")
users.create('admin2@admin1.de', 'password',"Felix")
users.create('admin3@admin1.de', 'password',"Nick S.")
users.create('admin4@admin1.de', 'password',"Christoph")
users.create('admin5@admin1.de', 'password',"Ba Que")
users.create('admin6@admin1.de','password',"Nik N.")
users.create('admin7@admin1.de','password',"Jannis")


result = users.list()
print(result)



"""


result = teams.create("Admins")
TEAM_ID = result["$id"]

teams.create_membership(TEAM_ID, "admin0@admin1.de", [], API_ENDPOINT, "Berinike")
teams.create_membership(TEAM_ID, "admin1@admin1.de", [], API_ENDPOINT, "Dominic")
teams.create_membership(TEAM_ID, "admin2@admin1.de", [], API_ENDPOINT, "Felix")
teams.create_membership(TEAM_ID, "admin3@admin1.de", [], API_ENDPOINT, "Nick S.")
teams.create_membership(TEAM_ID, "admin4@admin1.de", [], API_ENDPOINT, "Christoph")
teams.create_membership(TEAM_ID, "admin5@admin1.de", [], API_ENDPOINT, "Ba Que")
teams.create_membership(TEAM_ID, "admin6@admin1.de", [], API_ENDPOINT, "Nik N.")
teams.create_membership(TEAM_ID, "admin7@admin1.de", [], API_ENDPOINT, "Jannis")

result = users.list()
print(result)
