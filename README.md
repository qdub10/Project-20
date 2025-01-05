# 19 CI-CD: GitHub Actions CI/CD Setup

## Description

This project involves setting up a CI/CD pipeline using **GitHub Actions** to automate testing and deployment for a Tech Quiz application. The pipeline includes:

- Running **Cypress tests** on every pull request to the `develop` branch.
- Deploying the application to **Render** upon merging to the `main` branch.

The project ensures a streamlined development process with robust testing and deployment practices, adhering to modern DevOps standards.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Configuration](#configuration)
  - [GitHub Actions](#github-actions)
  - [Render Deployment](#render-deployment)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/qdub10/Project-20.git
   ```
2. Navigate to the project directory:
   ```bash
   cd ci-cd-github-actions
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Usage

1. Create a new branch for development:
   ```bash
   git checkout -b <feature-branch>
   ```
2. Commit and push changes to your branch.
3. Open a pull request to `develop`.
4. GitHub Actions will automatically run Cypress tests.
5. Once approved and merged to `main`, the application will be deployed to Render.

## Features

- Automated testing with Cypress on pull requests to the `develop` branch.
- Seamless deployment to Render on merging to `main`.
- Secure handling of environment variables using GitHub Secrets.
- Detailed logs for each step in the CI/CD pipeline.

## Technologies Used

- **GitHub Actions** for CI/CD automation
- **Cypress** for end-to-end and component testing
- **Render** for deployment
- **Node.js** for server-side operations
- **MongoDB** for database integration

## Configuration

### GitHub Actions

1. Create a `.github/workflows` directory in the root of your project.
2. Add the following YAML files:
   #### `cypress-tests.yml`
   ```yaml
   name: Cypress Tests

   on:
     pull_request:
       branches:
         - develop

   jobs:
     test:
       runs-on: ubuntu-latest

       steps:
       - name: Checkout code
         uses: actions/checkout@v3

       - name: Install Node.js
         uses: actions/setup-node@v3
         with:
           node-version: '16'

       - name: Install dependencies
         run: npm install

       - name: Run Cypress tests
         run: npx cypress run
   ```
   #### `deploy-to-render.yml`
   ```yaml
   name: Deploy to Render

   on:
     push:
       branches:
         - main

   jobs:
     deploy:
       runs-on: ubuntu-latest

       steps:
       - name: Trigger Render Deployment
         run: |
           curl -X POST \
           -H "Accept: application/json" \
           -H "Authorization: Bearer ${{ secrets.RENDER_API_KEY }}" \
           https://api.render.com/deploy/${{ secrets.RENDER_DEPLOY_HOOK }}
   ```

### Render Deployment

1. Set up your application on Render.
2. Obtain the Deploy Hook URL and API Key from Render.
3. Add the following secrets to your GitHub repository:
   - `RENDER_API_KEY`
   - `RENDER_DEPLOY_HOOK`

## Testing

This project uses **Cypress** for testing. To run tests locally:

1. Open Cypress test runner:
   ```bash
   npx cypress open
   ```
2. Run tests in the browser.

Cypress tests are automatically executed via GitHub Actions on pull requests to `develop`.

## Deployment

Once a pull request is merged into the `main` branch, GitHub Actions will trigger a deployment to Render using the Deploy Hook.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes with clear messages.
4. Push to your fork.
5. Submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
