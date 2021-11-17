# General
This function brings add and get announcements features to appwrite.
- Client can send list of announcements to Backend. These data will be written to DB along with `created_time`
- Client can request annoucements with some filters. The function will then query data from DB and print out to `stdout`.
    Client can now request status of execution and retrieve data from the `stdout` or `stderr` field. See `backend/appwrite-functions/announcement/test.js`.
- `Announcements` collection needed for the operations. Create with 

    `python3 ../../database-collection-schemas/createAnnouncementCollection.py`.
## Get announcements
A simple function that parses request and return announcements (from admin) in string.

A json payload looks like this:
```json
{ "data": "{\"getAnnouncements\":true,\"addAnnouncements\": false,\"numberOfAnnouncements\":3,\"timestamp\":1637100904,\"after\":true}" }
```

- The payload must contain `"data"` key with value in string. This string will be parsed to JSON by the function later on.
- `getAnnouncements` must be set to true and `addAnnouncements` to false. Otherwise, function will ignore this request.
- If `after` is true, the function will return #`numberOfAnnouncements` most recent announcements after the `timestamp`.

## Add announcements

```json
{
    "data": "{\"getAnnouncements\":false,\"addAnnouncements\": true, \"announcements\": [\"Message 3 added using HTTP request\", \"Message 4 added using HTTP request\"]}"
}
```
- `getAnnouncements` must be set to false and `addAnnouncements` to true.

## Frontend example
See `backend/appwrite-functions/announcement/test.js`. Run:

```bash
npm i
node test.js
```

# How to use:
## 📝 Environment Variables

Go to Settings tab of your Cloud Function. Add the following environment variables.

- **APPWRITE_ENDPOINT** - Your Appwrite Project Endpoint. NOTE: don't use `localhost` but actual IP-address of the server. In testing we used `http://192.168.1.15/v1`
- **APPWRITE_FUNCTION_PROJECT_ID** - Your Appwrite Project Id ( can be found at `settings` tab on your Appwrite console)
- **APPWRITE_API_KEY** - Your Appwrite Project API Keys ( can be found at `API Keys` tab on your Appwrite console). Create a key with the scope (`documents.read`)

## 🚀 Building and Packaging

To package this example as a cloud function, follow these steps:

```bash
$ cd ancm-function
$ PIP_TARGET=./.appwrite pip install -r ./requirements.txt --upgrade --ignore-installed
```

Ensure that your folder structure looks like this

```text
.
├── .appwrite/
├── main.py
└── requirements.txt
```

Create a tarfile

```bash
$ cd ..
$ tar -zcvf ancm-function.tar.gz ancm-function
```

Upload the tarfile to your Appwrite Console and use the following entrypoint command

```bash
python main.py
```

### Use the appwrite CLI instead:
```bash
export APPWRITE_FUNCTION_ID=61939abd51018
PIP_TARGET=./.appwrite pip install -r ./requirements.txt --upgrade --ignore-installed
cd ..
appwrite functions createTag --functionId=$APPWRITE_FUNCTION_ID --command='python main.py' --code='ancm-function/'
```
### Or use the `pack.sh`
```bash
# Frrom announcement folder
bash pack.sh
```

## 💽 Database

Run the `backend/database-collection-schemas/createAnnouncementCollection.py` script to create collection and add some dummies data.

## Note
```bash
python3 -m venv venv
. venv/bin/activate

npm i
node test.js
```