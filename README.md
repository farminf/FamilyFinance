# FamilyFinance

[![Heroku](https://heroku-badge.herokuapp.com/?app=heroku-badge&style=flat)](https://familyfinance-webapp.herokuapp.com)

*Bootstrapped by [create-react-app](https://github.com/facebook/create-react-app)*


FamilyFinance is an open source personal finance mangement app made by Firebase, React.

## Your Installation
You can use FamilyFinance on your premises/host with your firebase account easiliy. You need to just add your firebase config to your environment variables as

```
apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
storageBucket:process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
messagingSenderId:process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
```

## Live Demo 

## Run for Development


``` 
> npm install 
> npm run dev 
```

## Run for Production 

You can run the app in production either using server (static) or on nodejs server.

```
> npm run build
> npm install -g serve
> serve -p 80 -s build
```
or

```
> npm run build
> npm start
```

## CI

This project is using Travis-CI for Continuous Deployemnt. On the merge request, it tests and builds and on deployement from branch master, it tests, builds and deploys on Heroku.