This instruction is for configuring github action deploy. See here https://www.youtube.com/watch?v=QLVzozWDYAs

1. Get the token for firebase(this is needed if you don't have login access like in gitHub)
   1. This can be done using `firebase login:ci`
2. Feed the token in ` firebase deploy --token "$FIREBASE_TOKEN"`
3. Configure github actions using these