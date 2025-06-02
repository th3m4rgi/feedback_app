# feedback_app

This is the backend server application for the feedback app.
The tech stack used is Node.js and Express. Database used is MongoDB.

```
MacBook-Pro feedback_app % node -v
v16.20.2
MacBook-Pro feedback_app % npm -v
8.0.0
```

MongoDB local instance was used.

The api endpoints are defined in this application.
- POST api/feedback
- PUT api/feedback
- GET api/feedback
- GET api/feedback/:id
- DELETE api/feedback

## Steps for local setup

1. Clone the repository:
```bash
git clone git@github.com:th3m4rgi/feedback_app.git
cd feedback_app
```

2. Update environment variable
create an .env file with 
MONGO_URL=connection string


3.Run
```
npm i
npm start
```

## Illustration of functionality

This public loom video illustrates the functionality of the app from the backend using POSTMAN.
https://www.loom.com/share/2f95499c89ef4f1d8c5f08bd67616fe0?sid=0c009583-07c1-449d-b151-045f6a50f3cc

This public loom video illustrates the functionality of the app from the frontend.
https://www.loom.com/share/507a304340264f37ad3aaa0ffeeecefd?sid=3982d23a-224b-490f-a1bf-5420bc537b14
