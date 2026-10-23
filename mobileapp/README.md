# Setup The Mobile App

## Step 1: Install expo go
1. on your device, head to the respective app store and install the latest version of expo go
   - NOTE: this uses the SDK58 you NEED the latest version of expo go (version compatable with SDK58), if the latest store version does not work use the following link:
   - install apk: https://github.com/expo/expo-go-releases/releases/tag/Expo-Go-58.0.5
   - note apk only works for android, IOS install is unconfirmed, please use android emulator if need to do so
2. once compatable expo version is installed, head to next step 

## Step 2: Install package dependencies
1. make sure you are in the root of the mobileapp folder `COM713-A1/mobileapp` and the run the following commands to install required packages
   - `npm install`
   - `npx expo install expo`

## Step 3: Setup correct constraints
1. locate the `constraints.ts` file under `/src/constraints.ts`
2. open file, and edit the `const address` to your address and nothing more

## Step 4: start the services
1. make sure you have the server credentials JSON file as previously described in root readme
2. start server using methods in root readme
3. start mobile app using command:
   - `npx expo start`

## Step 5: Run the app!
1. go on your phone and open expo go
2. press scan QR
3. scan the QR code that was generated in the terminal when using command `npx expo start`
4. Use the app!

