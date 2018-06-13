# Introduction

* [Introduction](README.md#introduction)
  * [How It Works](README.md#how-it-works)
  * [Development](README.md#development)
  * [Building for Production](README.md#building-for-production)
  * [Running Tests](README.md#running-tests)
  * [Additional Commands](README.md#additional-commands)
* [Components](COMPONENTS.md#components)
  * [Higher Order Components](COMPONENTS.md#higher-order-components)
    * [withToken](COMPONENTS.md#withtoken)
    * [withData](COMPONENTS.md#withdata)
    * [withDataTransform](COMPONENTS.md#withdatatransform)
    * [withDataFilter](COMPONENTS.md#withdatafilter)
  * [Base Components](COMPONENTS.md#base-components)
    * [Header](COMPONENTS.md#header)
    * [Footer](COMPONENTS.md#footer)
    * [BaseTable](COMPONENTS.md#basetable)
    * [DataTable](COMPONENTS.md#datatable)
      * [route](COMPONENTS.md#route)
      * [transform](COMPONENTS.md#transform)
      * [filter](COMPONENTS.md#filter)
    * [Input](COMPONENTS.md#input)
      * [Text](COMPONENTS.md#text)
      * [Checkbox](COMPONENTS.md#checkbox)
      * [Select](COMPONENTS.md#select)
      * [DataSelect](COMPONENTS.md#dataselect)
    * [SearchBar](COMPONENTS.md#searchbar)

### How it works

The Demo App is a web application written in React with a Node.js Express server to serve the app as well as provide an authentication token (more on this later). The app uses the MWSL API to grab data for display as well as sending API requests to update or create Mines.

To use the app we must login using an IDIR account. If we are not logged in the app will redirect to the login screen and upon return parse the returned jwt token.

We use the [fetch api](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) and pass an OAUTH authentication token with the request to grab data from MWSL. Our token is fetched from the express server when we log into the app using the jwt token grabbed when we logged in.

### Development

To start developing you need node.js >= 8.4, an npm client, and a git client.
All the commands shown below use [yarn](https://yarnpkg.com/en/) but [npm](https://www.npmjs.com/) works as well using `npm run <command>`

1. Checkout the code from github (you will want to create a fork if you plan on submitting a pull request).
> `git clone <repo>`

2. Install dependencies
> `yarn`

3. Export an MWSL user and pass. Required for the server to fetch an authorization token.

  > `export MWSL_USER=<your-mwsl-user>`

  > `export MWSL_PASS=<your-mwsl-pass>`

4. Run the development server
> `yarn dev`

This starts an express server on port 5000 and the webpack dev server on port 3000. Local requests from the webpack server are proxied to the express server so there is no need to send requests to port 5000. This mimics the production setup where we only use one server to serve all the resources.

Both servers run in watch mode so any changes to the source code is immediately built and deployed!

### Building for Production

To make a production ready build
> `yarn build`

This creates a [bundle](https://github.com/facebook/create-react-app#npm-run-build-or-yarn-build)* with trimmed down dependencies and production versions of the libraries we use.

To start the app in production mode

1. Export an MWSL user and pass. Required for the server to fetch an authorization token.

  > `export MWSL_USER=<your-mwsl-user>`

  > `export MWSL_PASS=<your-mwsl-pass>`

2. Start the server
> `yarn start`

\* without the service worker

### Running Tests

Unit tests are run with [Jest](https://facebook.github.io/jest/) and use [Enzyme](http://airbnb.io/enzyme/) for rendering components.

To run the test suite
> `yarn test`

By default this runs all the tests and exits

Tests can also be run in watch mode (useful for development)
> `yarn test:watch`

Some tests are done by comparing [snapshots](https://facebook.github.io/jest/docs/en/snapshot-testing.html). The snapshots need to be updated when the UI changes. To do so run the tests in watch mode and hit `u` for update.

### Additional Commands

Check out `package.json` for more commands. Anything in the `scripts` section can be run with
>`yarn <script>`

or
>`npm run <script>`
