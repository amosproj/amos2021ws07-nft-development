""" 
The data from https://www.mockaroo.com/ doesnt have the correct salt and hash
This script take the password and replace "fake" salt and hash entries with real one.
"""

import csv
import signal
import sys

import bcrypt
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def generate_salt() -> str:
    return bcrypt.gensalt().decode()


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

header = []
with open('fake_data/1k_fake_user_with_true_salt_and_hash.csv', 'w', newline='') as csvfile:
    spamwriter = csv.writer(csvfile, delimiter=',',
                            quotechar='"', quoting=csv.QUOTE_ALL)
    count = 0
    # id, username, email, password, salt, hashed_password, bio
    with open ("fake_data/1k_users_amos.csv", "r", encoding="utf8", errors="ignore") as csvfile:
        data = csv.reader(csvfile, delimiter=',', quotechar='"')
        for row in data:
            try:
                count += 1
                if count==1:
                    header = row
                    spamwriter.writerow(header)
                    continue
                old_row = row.copy()
                row[4] = generate_salt()
                row[5] = get_password_hash(row[4] + row[3]) # salt + password
                if count<5:
                    row[13] = 'admin'
                spamwriter.writerow(row)
                print(count)
            except KeyboardInterrupt:
                print('Interrupted')
                sys.exit(0)
            except:
                print(row)
