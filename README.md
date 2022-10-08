# 💻 Job Application Tracker

Applying for software engineering internships and full-time jobs as a student or recent graduate is often a numbers game. It may take hundreds of applications just to get one internship or job offer. Each application may have multiple stages such as an online assessment (OA), phone screen, and multiple rounds of interviews. Given the amount of information that has to be maintained during the application process, there is an opportunity to develop software to keep track of all of this information and provide analysis to users. Our Job Application Tracker project is intended to do just that: to maintain job application information and provide analysis for users of our software.

# ⚙️ Development

## Prerequisites

1. [Node.js](https://nodejs.dev/learn/how-to-install-nodejs), v16.x LTS (recommended) or higher
2. [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), v8.x (recommended) or higher
3. Eslint plugin [for VS Code](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) or [for Intellij IDEA](https://www.jetbrains.com/help/idea/eslint.html)
4. Prettier plugin [for VS Code](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) or [for Intellij IDEA](https://www.jetbrains.com/help/idea/prettier.html)

## Install Frontend Dependencies

Clone or fork the current codebase. Navigate to the root of the project directory in your terminal window and call:

```
cd src/ui
npm install
```

This will install the required node module dependencies into the `src/ui` folder.

## Configure the Frontend Environment

Inside the `src/ui` folder, create a file named `.env.local`. This file will store environment variables that can be used by Next.js. The `.env.local` file should have the following:

```
BACKEND_URL=http://localhost:8080
```

_Developers: note that values are stored as key-value pairs. Additional variables may be required in the future._

## Run the Frontend Development Server

After setting up the `.env.local` file, call `npm run dev`. This will start the Next.js server in development mode.

Finally, open a browser window and navigate to `localhost:3000`. This is the Next.JS project running in your browser.

If you do not have the backend server running on port 8080, you will see the following error message:

```
Failed to proxy http://localhost:8080/api Error: connect ECONNREFUSED 127.0.0.1:8080
    at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1161:16) {
  errno: -4078,
  code: 'ECONNREFUSED',
  syscall: 'connect',
  address: '127.0.0.1',
  port: 8080
}
```

## Testing Frontend Code

The frontend environment uses [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) to perform testing. To run tests, use the `npm run test` command.
