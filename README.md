# Hello World Command Extension

A simple Hello World slash command extension for SillyTavern.

## Features

- `/hello` slash command - Type `/hello` in chat to receive a "Hello World! 👋" greeting
- Settings GUI - Configure the Image Root Directory in the Extensions panel

## Installation

### Option 1: From GitHub (Recommended)

1. Open SillyTavern
2. Go to **Extensions** (wand icon)
3. Click **Install Extension**
4. Select **From Git URL**
5. Enter: `https://github.com/YOUR_USERNAME/sillytavern-hello-world`
6. Click **Install**

### Option 2: Manual Installation

1. Copy the `hello-world` folder to your SillyTavern extensions directory:
   ```
   SillyTavern/data/default-user/extensions/hello-world/
   ```
2. Restart SillyTavern

## Usage

### Slash Command

Type `/hello` in the chat input and press Enter. You'll receive a toast notification with "Hello World! 👋"

### Settings

1. Click the **Extensions** button (wand icon) in the top menu
2. Look for **"Hello World Command"** in the right column
3. Configure the "Image Root Directory" setting as needed

## Files

- `index.js` - Main extension code
- `manifest.json` - Extension manifest
- `README.md` - This file

## License

MIT
