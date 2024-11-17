# Micro Code Editor

A modern web-based code editor featuring a file explorer, Monaco Editor integration, and branch management capabilities.

## Prerequisites

- Node.js (v22.0.0 or higher)
- npm (v10.0.0 or higher)
- Any other specific requirements (databases, API keys, etc.)

## Setup & Installation

1. Clone the repository:
```bash
git clone https://github.com/rushi-173/micro-code-editor.git
cd micro-code-editor
```

2. Install dependencies:
```bash
npm install
```

## Development

To start the development server:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src
├── apis/               # mock api call funtions
├── app/                # Next.js 13+ app directory
├── components/         # Reusable components
├── contexts/           # Context for data sharing
├── hooks/              # Custom Hooks
├── lib/                # Data and constants
├── types/              # Types
├── utils/              # Utils
```

## Key Features

- **File Explorer**
  - Tree-like structure for files and folders navigation
  - Click-to-open file functionality

- **Code Editor**
  - Monaco Editor integration for powerful code editing
  - Support for multiple active worksheets

- **Branch Management**
  - View and switch between different branches
  - Dynamic file list updates based on selected branch


## Build & Deployment

To build the application:

```bash
npm run build
# or
yarn build
```

To start the production server:

```bash
npm run start
# or
yarn start
```

