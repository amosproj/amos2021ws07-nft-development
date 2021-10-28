import os
from dotenv import load_dotenv
import psycopg2
import aiosql
import csv
import sys
import random

load_dotenv('../../backend/.env')

POSTGRES_SERVER = os.getenv('POSTGRES_SERVER')
POSTGRES_USER = os.getenv('POSTGRES_USER')
POSTGRES_PASSWORD = os.getenv('POSTGRES_PASSWORD')
POSTGRES_DB = os.getenv('POSTGRES_DB')

# Connect to an existing database
try:
    conn = psycopg2.connect(
        f"dbname='{POSTGRES_DB}' user='{POSTGRES_USER}' host='{POSTGRES_SERVER}' password='{POSTGRES_PASSWORD}'")
    cur = conn.cursor()
except:
    print("I am unable to connect to the database")

queries = aiosql.from_path("queries/", "psycopg2")

""" Clear DB and create tables """
r = queries.create_uuid_ext(conn)
conn.commit()
r = queries.select_uuid_ext_v4(conn)
#
r = queries.drop_table__user_role(conn)
conn.commit()
r = queries.drop_table__users(conn)
conn.commit()
r = queries.drop_table__roles(conn)
conn.commit()
r = queries.drop_update__function(conn)
conn.commit()
#
r = queries.create_function__updated(conn)
conn.commit()
r = queries.create_table__users(conn)
conn.commit()
r = queries.create_table__role(conn)
conn.commit()
r = queries.create_table__user_role(conn)
conn.commit()

""" Add roles """
r = queries.add_role(conn, role_name='admin', description='this is admin')
conn.commit()
r = queries.add_role(conn, role_name='member', description='this is member')
conn.commit()
admin_role_id = int(queries.get_role_id_by_role_name(conn, role_name='admin')[0])
member_role_id = int(queries.get_role_id_by_role_name(conn, role_name='member')[0])

""" Add fake users and their roles"""
def add_user_from_fakes():
    with open("fake_data/1k_fake_user_with_true_salt_and_hash.csv", "r") as csvfile:
        data = csv.reader(csvfile, delimiter=',', quotechar='"')
        count = 0
        for row in data:
            try:
                count += 1
                if count == 1:
                    header = row
                    continue
                # print(row)
                """ Add user ... """
                created_user = queries.add_user(
                    conn, username=row[1], email=row[2],
                    salt=row[4], hashed_password=row[5], bio=row[6],
                )
                conn.commit()
                # print(created_user)
                """ ... and role """
                rid = member_role_id
                if row[13] == 'admin':
                    rid = admin_role_id
                r = queries.add_user_role(
                    conn, user_id=created_user[0], role_id=rid,
                )
                conn.commit()

            except KeyboardInterrupt:
                print('Interrupted')
                break
            except:
                print('-------------------------------')
                print(row[0])
                if count==10:
                    break

add_user_from_fakes()