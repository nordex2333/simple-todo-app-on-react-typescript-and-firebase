## Firebase Configuration

Follow these steps to configure Firebase:

1. **Create a Firebase project**: Go to the [Firebase console](https://console.firebase.google.com/) and create a new project.

2. **Enable the authentication services**: In the Firebase console, enable the authentication service via email/password.

3. **Get your Firebase configuration object**: In your Firebase project settings, you can find your Firebase configuration object. This object contains the credentials your app needs to connect to Firebase.

4. **Update your .env file**: Put the Firebase credentials from your configuration object into your .env file. If you don't have a .env file, rename .env.example to .env and put your credentials there.

5. **Update your Firestore security rules**: In the Firebase console, go to Firestore Database and update your security rules to the following:

```plaintext
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /todos/{todoId} {
      allow read, update, delete: if request.auth.uid == resource.data.userId;
      allow create: if request.auth.uid != null;
    }
  }
}
```

## Project Deployment

Follow these steps to deploy the project:

1. **Clone the project**: Clone the project onto your local machine.

2. **Install dependencies**: Run `npm install` to install the project's dependencies.

3. **Start the project**: Run `npm start` to start the project. The app should be launched on [http://localhost:3000].

**Note**: Make sure you have Node.js version 21 or higher installed on your machine.