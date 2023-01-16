# Front end
---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Packages we used 
- axios: The http client we use to make requests to the backend
- [antd](https://ant.design/): The UI framework we used to style our app.
- [react](https://reactjs.org/): The Core front-end framework for the app
- js-cookie: A simple, lightweight JavaScript library for handling cookies
- [react-router-dom](https://reacttraining.com/react-router/web/guides/quick-start): Routes the requests to the proper components
## Structure
- `./src/`: The root directory of the source code
- `./src/components/`: The directory containing all the components
- `./src/views/`: The directory containing all the pages. Pages are built with the components in `./src/components/`
- `./src/index.js`: The entry point of the app
- Pages
    - `HomePage.js`: the home page
    - `LoginPage.js`: the login page
    - `SignupPage.js`: the register page
    - `UserPage.js`: the user profile and setting page
    - `PostPage.js`: the post detail page
    - `CreatePostPage.js`: new post editing page
    - `CommunityPage.js`: the community home page
    - `CommunityListPage.js`: the community listing page
    - `AboutPage.js`: the 'About The Project' page

## Install
In the `.../frontend/` directory, run the following command to install dependencies:
```
yarn install
```

## Available Scripts
**It is recommended to start the server before startint the front end. Navigate to `../backend/` to see how to prepare the server.**

In the project directory, you can run:
```
yarn start
```

Runs the app in the development mode.\
If your web browser did not respond, open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

```
yarn test
```

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.