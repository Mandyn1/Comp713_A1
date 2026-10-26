# Setup The Mobile App

## Step 1: Install expo go
1. on your device, head to the respective app store and install the latest version of expo go
   - NOTE: this uses the SDK58 you NEED the latest version of expo go (version compatable with SDK58), if the latest store version does not work use the following link:
   - install apk: https://github.com/expo/expo-go-releases/releases/tag/Expo-Go-58.0.5
   - note apk only works for android, IOS install is unconfirmed, please use android emulator if need to do so
2. once compatable expo version is installed, head to next step 

## Step 2: Install package dependencies
1. Use install instructions from the root README

## Step 3: Setup correct constraints
1. locate the `port-numbers.json` file in the global root folder
2. open file, and edit the `hostAddress` to your IP address
- Windows: use command ipconfig /all to view host IP
- MAC: go to System Preferences, click on Network, select your network connection, IP address displayed there  

## Step 4: start the services
1. Use start instructions from root README

## Step 5: Run the app!
1. go on your phone and open expo go
2. press scan QR
3. scan the QR code that was generated in the terminal when using command `npx expo start`
4. Use the app!
  
Note: if the QR code doesn't appear, the development server may appear within Expo Go anyway if on the same internet.