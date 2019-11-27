# firebaseauth
## Firebase Auth Tutorial

This tutorial will allow you to become famaliar with the firebase authentication process.  This could be used with your final creative lab.

The tutorial will roughly follow the 
[firebase documentation](https://github.com/firebase/quickstart-js/blob/master/auth/github-redirect.html) for setting up a redirect authentication with github credentials.

1. You should follow these [instructions](https://firebase.google.com/docs/web/setup) to set up your firebase project.

1. Next set up an express project on your amazon ec2 node.
``` 
express firebaseauth
cd firebaseauth
```
2. Create a ["public/auth.html"](https://raw.githubusercontent.com/mjcleme/firebasauth/master/public/auth.html) file with the javascript to connect to firebase for authentication.

3. Go to your firebase console and copy the firebase information into your "public/auth.html" file replacing
```
    apiKey: "Your APIKEY",
    authDomain: "Your Domain",
    databaseURL: "Your URL",
    storageBucket: "Your bucket",
    messagingSenderId: "Your ID"
```

4. Go to "Authentication/Setup Signin Method" and enable github.  This should bring up a window that asks for "Client ID" and "Client Secret".  We will fill them in during the next step.  Notice that it also gives you a "callback URL" at the bottom of the box that we will need to insert into the github application area.  Keep this tab open, because you will be filling in the "Client ID" and "Client Secret" boxes later.

5. Log into github and go to "settings" by clicking on your picture in the upper right corner.

6. Select "Developer Settings at the bottom left", then select "OAuth Apps" and "New OAuth App".

7. Enter 
    1. "Application name"=firebaseauth
    2. "Homepage URL"=http://yourserver:3000/auth.html
    3. "Application description"=Firebase Auth Test
    4. The next box asks for the "Authorization callback URL".  This was the "callback URL" from the previous step in your firebase window.
    5. Click the "Register Application" Button at the bottom of the page.
  
8. At the top of the page describing the application, there should be a "Client ID" and "Client Secret".  Copy these and use them to fill in the boxes on your firebase project.  You will have to select the "enable" radio button in the firebase tab and then save the github configuration.  

9. Now you should see an "Add Domain" button in your firebase tab.  Select this button and add the domain (hostname) of your ec2 node.

9. Copy the [firebase-logo.png](https://raw.githubusercontent.com/firebase/quickstart-js/master/auth/firebase-logo.png) and [main.css](https://raw.githubusercontent.com/mjcleme/firebasauth/master/public/main.css) files in your public directory.

10. Start your web server with 
```
npm install
npm start
```

11. Now access the "auth.html" page from your browser and see if it works.  When you select the "SIGN IN WITH GITHUB" button, it should redirect you to a login page for github.  You will be asked to approve this application.  The browser will then be redirected to the firebase system which will update the fields in your browser.

Notice that the button handler
```
<!-- Button that handles sign-in/sign-out -->
          <button disabled class="mdl-button mdl-js-button mdl-button--raised" id="quickstart-sign-in">Sign in with GitHub</button>
```
calls toggleSignIn()
```
document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
```
togglSignIn() calls firebase.auth().signInWithRedirect();
```
if (!firebase.auth().currentUser) {
        // [START createprovider]
        var provider = new firebase.auth.GithubAuthProvider();
        // [END createprovider]
        // [START addscopes]
        provider.addScope('repo');
        // [END addscopes]
        // [START signin]
        firebase.auth().signInWithRedirect(provider);
        // [END signin]
      } else {
```
firebase.auth().signInWithRedirect(provider) will have you enter your github credentials and redirect to firebase which will call the function for state change.
```
firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          // [START_EXCLUDE]
          document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
          document.getElementById('quickstart-sign-in').textContent = 'Sign out';
          document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
```




