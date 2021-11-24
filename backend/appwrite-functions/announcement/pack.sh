cd ancm-function
PIP_TARGET=./.appwrite pip install -r ./requirements.txt --upgrade --ignore-installed
cd ..
appwrite functions createTag --functionId=$APPWRITE_FUNCTION_ID --command='python main.py' --code='ancm-function/'