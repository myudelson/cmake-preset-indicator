# CMake Preset Indicator

A minimal VS Code extension that shows the currently selected **CMake Configure Preset** directly in the status bar.

Useful when working with projects that switch frequently between configurations such as:

- 🐞 Debug
- 🚀 RelWithDebInfo
- 🔥 Release

without keeping the full CMake Tools status bar visible.

## Features

- Shows the active CMake Configure Preset
- Updates when the preset changes
- Uses the official CMake Tools API
- Minimal status bar footprint

## Example

With:

```json
{
  "name": "debug",
  "displayName": "🐞 Debug"
}
```

the status bar shows: 🐞 Debug.

Switch to:


```json
{
  "name": "relwithdebinfo",
  "displayName": "🚀 RelWithDebInfo"
}
```

and it updates automatically.


## Requirements

- VS Code
- CMake Tools extension

## Installation

Install from the VS Code Marketplace: (search: CMake Preset Indicator) or install manually from a .vsix file.

## Development

Clone:

```sh
git clone https://github.com/YOUR_USERNAME/cmake-preset-indicator.git
cd cmake-preset-indicator
```

Install dependencies:

```sh
npm install
```

Compile:

```sh
npm run compile
```

Run:

Press F5 to launch the Extension Development Host.


## License

MIT

