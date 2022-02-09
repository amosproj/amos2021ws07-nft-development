# Guide to make frontend work with Appwrite for dummies
1. Make sure you have Appwrite started. See #Requirements
2. Go to `localhost` using your browser to access "Appwrite console".
3. Create an Account. Note that this is the `Privilege Account`, not `User Account`!
4. Create a project. On the URL bar you should see something like `http://localhost/console/home?project=618a936863851`. That `618a936863851` is the project ID!
5. Create an API key by clicking on `API Keys` button in the web UI. Give the key enough permissions.
6. If you want to use Postman, add headers in request:

    `X-Appwrite-Project`: [your project id]

    `X-Appwrite-Key`: [your api key]

    You should be able to use Postman with the Appwriter APIs now.
7. Edit `amos2021ws07-nft-development/frontend/.env` with project ID and backend location (Appwrite). Like this:
```bash
# ...
REACT_APP_ENDPOINT="http://localhost:80/v1"
REACT_APP_PROJECT="618a936863851"
# ...
```
Additionally, these data can also be written in `/frontend/src/utils/config.js`.
See bellow what every environment variable needs to be set to.


## Requirements

### AppWrite

It is required that appwrite is running. It can be started using the following command:

Windows
```
docker run -it --rm ^
--volume //var/run/docker.sock:/var/run/docker.sock ^
--volume "%cd%"/appwrite:/usr/src/code/appwrite:rw ^
--entrypoint="install" ^
appwrite/appwrite:0.11.0
```

Unix
```
docker run -it --rm \
--volume /var/run/docker.sock:/var/run/docker.sock \
--volume "$(pwd)"/appwrite:/usr/src/code/appwrite:rw \
--entrypoint="install" \
appwrite/appwrite:0.11.0
```

During development, it is recommended to set the environment variable `_APP_OPTIONS_ABUSE` to `disabled`.
Also, `_APP_SMTP_HOST`, `_APP_SMTP_PORT`, `_APP_SMTP_SECURE`, `_APP_SMTP_USERNAME`, `_APP_SMTP_PASSWORD` need to be set in order 
to confirm registered emails. You can for instance set up an SMTP fulfilling all requirements on https://sendgrid.com/.

You might need to change some settings in the utils/config.js depending on your setup.

### Initializing Appwrite

Appwrite needs to be initialized with some required team ("Admins" team) and database collections. See the `backend` directory of this project
to find out how to create the required teams and database collections.


### Changing config/environment variables

You need to edit the config file (in the utils/config.js file) or alternatively set the following environment variables so that the frontend is
able to communicate with appwrite and can send out correct emails.

| Environment variable | default | Meaning |
|-------|-------|-------|
| `REACT_APP_ENDPOINT`   | `http://localhost:80/v1`   | The endpoint of the running appwrite instance.  | 
| `REACT_APP_PROJECT`   |    | The appwrite project ID. Can be found in the "Settings" tab of the appwrite project in the appwrite UI.   |
| `REACT_APP_DOMAIN`   | `http://localhost:3000`   | The domain (and port) that the frontend is being served from.    |
| `REACT_APP_WALLET_COLLECTION_ID` |   | The AppWrite collection ID of the wallets. The collection must be created using the script in the `backend` directory. The collection ID can then be read in the AppWrite interface in the `Database` tab and the `Settings` tab of the `Wallets` collection. |
| `REACT_APP_ANNOUNCEMENT_COLLECTION_ID` |   | The AppWrite collection ID of the announcements. The collection must be created using the script in the `backend` directory. The collection ID can then be read in the AppWrite interface in the `Database` tab and the `Settings` tab of the `Announcements` collection. |
| `REACT_APP_ABI_COLLECTION_ID` |   | The AppWrite collection ID of the ABIs of the ETH smart contract. The collection must be created using the script cronjob script in the `backend` directory. The collection ID can then be read in the AppWrite interface in the `Database` tab and the `Settings` tab of the `ABIs` collection. |
| `REACT_APP_DROP_COLLECTION_ID` |   | The AppWrite collection ID of the ABIs of the automatically updated NFT drops. The collection must be created using the script cronjob script in the `backend` directory. The collection ID can then be read in the AppWrite interface in the `Database` tab and the `Settings` tab of the `Drops` collection. |
| `ESLINT_NO_DEV_ERRORS` (optional) | true |  disables ESLint errors during development. |
| `DISABLE_ESLINT_PLUGIN` (optional) | true | disables eslint-webpack-plugin during development and production. |

## Testing/running using Docker

Requires installation of docker. Commands may require execution with `sudo`.

Build local docker file

``` 
docker build -t nftfrontend .
```

Run the docker container using the following command.
If you can access the app at http://localhost:8181/, then everything worked.

``` 
docker run -p 8181:80 -it nftfrontend
```

## Development

Run the following command to install all requirements:

```
npm install
```

Run the following command to see linting violations:

```
npx eslint .
```

If the command does not return anything, then there are no violations.

Run the following command to automatically attempt to fix linting violations:

```
npx eslint . --fix
```



## Testing using Cypress

### Integration component tests

After installing all requirements (see development section), you can run 
```
npm run cy:open 
```
or 
```
npx cypress open-ct --config-file cypress.json
```
to run the Cypress Component Test Runner which will run all integration components tests in the `cypress/integration` directory. 
It might take some time until the test runner is initialized. After changes were made, the tests should
be re-run instantly.


To run integration component tests without the UI run 
```
npm run cy:run
``` 
or 
```
npx cypress run-ct --config-file cypress.json
```

### Integration system tests

Make sure that you have the AppWrite backend running so that the tests can actually run. Also, make sure
to set the environment variables in the `cypress_system_tests.json` so that e.g. users can be deleted again
after a test was run to restore a clean state.

You can run
```
npm run cy:open-system
```
or
```
npx cypress open --config-file cypress_system_tests.json
```
to run the Cypress Test Runner which will run all integration system tests in the `cypress/integration` directory.


To run integration component tests without the UI run
```
npm run cy:run-system
``` 
or
```
npx cypress run --config-file cypress_system_tests.json
```

See https://docs.cypress.io/api/commands/get for learning how to write Cypress tests.



## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

