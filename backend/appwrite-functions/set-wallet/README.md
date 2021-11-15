# 🦠 Set Wallet Address
A simple python function for setting the wallet address of a user.

## 📝 Environment Variables
Before running the function, set the following env vars:
* **APPWRITE_ENDPOINT** 
* **APPWRITE_API_KEY** 
* **WALLETS_COLLECTION_ID** 

## 🚀 Building and Packaging

To package this example as a cloud function, follow these steps.

```bash
$ PIP_TARGET=./.appwrite pip install -r ./requirements.txt --upgrade --ignore-installed 
```

* Ensure that your folder structure looks like this 
```
.
├── .appwrite/
├── main.py
└── requirements.txt
```

* Create a tarfile

```bash
$ cd ..
$ tar -zcvf code.tar.gz set-wallet
```

* Upload the tarfile to your Appwrite Console and use the following entrypoint command

```bash
python main.py
```
## 🎯 Trigger
Should be triggered by a user in the frontend. 
