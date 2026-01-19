# Common_Tongue

Common Tongue is a mobile app, built using React Native, for both iOS & Android intended to speed-up EFL teacher workflows.   

## Table of Contents
- [About](#about)
- [Features](#features)
- [Installation](#installation)

## About
This project aims to help alleviate stress felt by EFL teachers working abroad by using integrated LLM features that power a lesson plan feedback system. Spend less time out of class, thinking about class. With the capability to share experiences through text chat regardless of geographical location.  

## Features
Common Tongue is currently being developed for a Minimum Viable Product state, therefore these features may not be entirely realised by the time the MVP has been finished, although the intended features are as follows:                                                  
- AI lesson plan feedback based on text or file (.PDF) submission.
- Chat feature for aspiring EFL teachers to ask questions to industry professionals or for teachers to chat with one another.         
- Carefully selected library of information highlighting government-run TEFL schemes & application information.                       
- Account management features so you can share your teaching experiences & network with other users.                                  
## Installation

### Prerequisites
- Node.js
- npm
- Expo GO app (iOS/Android)

### Setup
1. Clone the repository:
	 ```sh
	 git clone https://github.com/CherryCrave/common_tongue.git
	 cd common_tongue
	 ```
2. Install dependencies:
	 ```sh
	 npm install
	 ```
3. Start the development server:
	 ```sh
	 npx expo start
	 ```

## Running the App

- **iOS/Android:**
	- Download the Expo GO app from your mobile's respective application store (App Store/Google Play Store).
	- Scan the QR code shown in your terminal or browser after running `npx expo start`.
	- The app will open in Expo GO on your device.

## Project Structure

- `app/` — Main application screens and navigations.
- `assets/` — Images and other assets.
- `docs/` — Documentation (Primarily Software Engineering Related).
- `app.json` — Expo configuration.
- `package.json` — Project dependencies and scripts that come with Expo React Native.

## Usage

- Navigate between screens using the app’s menu.
- Account management and chat features are available from the main screen.

## Troubleshooting

- If you encounter issues, try:
	- Restarting the Expo server
	- Clearing cache: `npx expo start -c`
	- Ensure Xcode is set up & downloaded.
- For more help, see the [Expo documentation](https://docs.expo.dev/).

## Contributing

Pull requests are welcome! Pull requests are welcomed! Though if you could go through the adequate channels, ideally putting in an issue first, that'd be great.

## License

This project is licensed under the MIT License.