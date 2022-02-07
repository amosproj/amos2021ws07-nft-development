This script allows you to register users in appwrite projects, add them to teams with certain roles.
You just have to load a csv or excel file in the layout of the provided template.
API key, endpoint and project ID also have to be specified via environment variables, arguments or parameter in excel file.
Also the Main-Contract can be set via parameter or via arguments.
Data provided via arguments will override other and the provided parameters will be set as environment variables.

       [-h] [--apikey APIKEY] [--endpoint ENDPOINT] [--projectid PROJECTID] [--maincontract MAINCONTRACT] file

positional arguments:
  file                  Path of file containing the user data

optional arguments:

    -h, --help              show this help message and exit

    --apikey APIKEY         API key to access appwrite backend, you can instead also set the environment variable 
                            APPWRITE_API_KEY or add the parameter to the excel file

    --endpoint ENDPOINT     URL of the appwrite endpoint, you can instead also set the environment variable
                            APPWRITE_ENDPOINT or add the parameter to the excel file

    --projectid PROJECTID   Project ID of the targeted appwrite project, you can instead also set the environment
                            variable APPWRITE_PROJECT or add the parameter to the excel file

    --maincontract MAINCONTRACT
                            Address of the main contract, you also can add the 'MAIN_CONTRACT' parameter to the excel
                            file instead


How to use the Templates:

The Templates basically contain five columns (Name, Email, Team, Roles and InitialPassword).
If the user does not already exist, Name, Email and InitalPassword are required.
If the user shall also be part of a team, you can also add the name of the team into the Team column.
The same applies for team roles, here you are also able to add multiple roles, separated by a ",".
Be aware that these lists are NOT supported in the Team column.
If you want to add a user to multiple teams, simply copy the row and adjust the team name.
In general, if a user or a team is not registert yet in the backend, the script will create the user or the team.