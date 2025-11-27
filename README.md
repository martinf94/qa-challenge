🚀 Full-Stack QA Automation Challenge

📖 Overview

This project uses Docker to automatically build a temporary WordPress website, write a specific blog post, and run a test to confirm it exists.

🏗️ Architecture

The project utilizes Docker Compose to orchestrate four distinct microservices:

db: A generic MySQL container acting as the persistence layer.

wordpress: The latest stable release of the WordPress application.

seeder: A container that waits for the application to be healthy, installs the site, and generates the test data.

playwright: The test runner that executes the regression suite against the containerized application.

⚡ Quick Start (Robot Mode)

Execution

Run the entire suite with a single command:

docker-compose up --build --abort-on-container-exit --exit-code-from playwright


What happens next?

🐳 Infrastructure Up: Docker starts the Database and Web Application.

⏳ Health Checks: The system waits for MySQL and WordPress to become responsive.

🌱 Data Seeding: The seeder service installs the site and publishes the required blog post.

🤖 Test Execution: Playwright launches, navigates to the site, and verifies the content.

🛑 Teardown: Once tests complete, all containers act as a single unit and shut down automatically.

👀 Human Mode (Interactive Debugging)

If you want to view the WordPress site in your browser or run the tests visually using the Playwright UI Runner, follow these steps.

1. Start the Environment

Start the website infrastructure without the test runner killing it:

docker-compose up db wordpress seeder


Wait until you see the log message: seeder-1 | Seeding Complete!

2. Configure for Localhost Access

By default, WordPress is configured for the internal Docker network (http://wordpress). To view it in your browser, you must update the database to recognize your local machine.

Open a new terminal and run:

docker-compose exec seeder wp option update home 'http://localhost:8080' --path=/var/www/html --allow-root
docker-compose exec seeder wp option update siteurl 'http://localhost:8080' --path=/var/www/html --allow-root


🎉 View the Site: Open http://localhost:8080 in your browser.

3. Run Tests Visually

You can now run the Playwright UI runner from your local machine to watch the test execution in real-time.

cd tests
npm install
npx playwright test --ui


⚠️ Important: Resetting to Robot Mode

Once you update the database URL to localhost, the internal Robot (Step 1) will fail because it cannot resolve "localhost".

To return to the "One-Command" automation state, you must clear the data:

docker-compose down -v


📂 Project Structure

```text
qa-challenge/
├── docker-compose.yml        # Service orchestration and networking config
├── README.md                 # Project documentation
├── .gitignore                # Git configuration
└── tests/                    # Test Automation Source Code
    ├── Dockerfile            # Definition for the Playwright test runner image
    ├── package.json          # Node.js dependencies and scripts
    ├── playwright.config.ts  # Playwright global configuration
    ├── tsconfig.json         # TypeScript compiler configuration
    ├── pages/                # Page Object Models (POM)
    │   ├── HomePage.ts       # Logic for Home Page interactions
    │   └── PostPage.ts       # Logic for Post verification
    └── e2e/                  # End-to-End Test Specs
        └── blog.spec.ts      # Main test suite using the Page Objects