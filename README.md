# DeepSeek AI Workspace Extension

A professional browser extension that transforms DeepSeek into a complete AI workspace.

## Features
- **Sidebar Workspace**: Persistent chat and project management in your browser sidebar.
- **Project Management**: Organize conversations into projects with specific context.
- **Long-term Memory**: Save snippets and past interactions for future reference.
- **Hybrid API Layer**: Use the official DeepSeek API for advanced features or bridge with the web UI.
- **Cross-Browser**: Supports Chrome, Edge, and Firefox.
- **I18n**: Full support for English and Chinese.
- **Advanced Tools**: MCP support, web search, and page reading.

## Installation

### Chrome / Edge
1. Clone this repository.
2. Run `node build.js`.
3. Go to `chrome://extensions`.
4. Enable "Developer mode".
5. Click "Load unpacked" and select `dist/chrome`.

### Firefox
1. Clone this repository.
2. Run `node build.js`.
3. Go to `about:debugging#/runtime/this-firefox`.
4. Click "Load Temporary Add-on" and select `dist/firefox/manifest.json`.

## Development
The project is structured to be modular and easy to extend.
- `src/background`: Service worker for context menus and side panels.
- `src/sidebar`: The main React-like UI for the workspace.
- `src/modules`: Core business logic (API, Memory, Projects, MCP).

## License
MIT
