<div align="center">
  <h1>An website made with NextJS for managing Products</h1>
</div>

<br />

<!-- Table of Contents -->

# Table of Contents

- [About the Project](#about-the-project)
  - [Tech Stack](#tech-stack)
  - [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Start the server](#start-the-server)
- [Usage](#usage)
- [Tests](#tests)

<!-- About the Project -->

## About the Project

<!-- TechStack -->

### Tech Stack

  <ul>
    <li><a href="https://www.typescriptlang.org/">Typescript</a></li>
    <li><a href="https://nextjs.org/">NextJS</a></li>
    <li><a href="https://tailwindcss.com/">Tailwind</a></li>
    <li><a href="https://www.cypress.io/">Cypress</a></li>
  </ul>

<!-- Env Variables -->

### Environment Variables

This project has only one env:

`API_URL` _default: http://localhost:3030_

<!-- Getting Started -->

## Getting Started

This project runs on port **3031** by default and was builded with **NodeJS v21.7.3** but older versions should work just fine

<!-- Prerequisites -->

### Prerequisites

You must have the [Backend API](https://github.com/henriquemod/backend-nest-product-api) running on port **3030** or change the `API_URL` env variable to the correct port
I recommend leaving all default, backend on 3030 and frontend on 3031

<!-- Installation -->

### Installation

Clone the project

```bash
git clone https://github.com/henriquemod/products-nextjs.git
```

Go to the project directory

```bash
cd products-nextjs
```

Install dependencies

```bash
npm install
```

#### Start the server

```bash
# for development environment
npm run dev

# or for production environment
npm run build
npm run start
```

```bash
npm run docker:dev

# for development environment
npm run start:dev

# or for production environment
npm run build
npm run start:prod
```

<!-- Usage -->

## Usage

Once the project is started you access the website on http://localhost:3031

#### Credentials

```
username: admin
password: admin
```

<!-- Tests -->

## Tests

Ensure you have the backend API running and the NextJS server running before running the tests,
before proceeding, please check the [system requirements](https://docs.cypress.io/guides/getting-started/installing-cypress#System-requirements)
to ensure your system has all the necessary dependencies installed

You can run the tests with:

```bash
npm run cypress:run # for headless mode - NOTE: requires google-chrome installed

# in case you don't have google-chrome installed you can run
npm run cypress:run:electron

# or

npm run cypress:open # for interactive mode
```

**IMPORTANT** - If you changed the default ports for backend API or NestJS, you must change the `baseUrl` and `API_URL` in the `cypress.config.ts` file otherwise the tests will fail
