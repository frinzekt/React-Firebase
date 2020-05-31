This instructions came from: Firebase >> Hosting :  https://console.firebase.google.com/u/0/project/react-spas-frinze/hosting
1. Make sure to install firebase tools `npm install -g firebase-tools`
2. login in firebase `firebase login`
3.
3. Initialize the project `firebase init`
4. Pick services you would like to pick, just pick `hosting` for simplicity
5. It will ask you "what do you want to use as your publick directory" answer `build` (because you want it to serve static html contents - production)
6. Create a single page app?
7. It might say "index.html" already exist, DO NOT SAY YES (otherwise it will let firebase create is own index.html page)

8. If you need to set where the project is, use the command `firebase use $_PROJECTID`. `$_PROJECTID` can be found in Firebase >> Project Settings