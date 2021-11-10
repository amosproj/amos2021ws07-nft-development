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
    REACT_APP_ENDPOINT="http://localhost:80/v1"

    REACT_APP_PROJECT="618a936863851"
    ```
    Additionally, these data can also be written in `/frontend/src/utils/config.js`.
    Seem to be that API key is not needed. Now the web UI can be used.

#
```bash
# Make 
```


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## Requirements

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

During development, it is recommended to set the environment variable _APP_OPTIONS_ABUSE to "disabled".
Also, _APP_SMTP_HOST, _APP_SMTP_PORT, _APP_SMTP_SECURE, _APP_SMTP_USERNAME, _APP_SMTP_PASSWORD need to be set in order 
to confirm registered emails. You can for instance set up an SMTP fulfilling all requirements on https://sendgrid.com/.

You might need to change some settings in the utils/config.js depending on your setup.

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




## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
