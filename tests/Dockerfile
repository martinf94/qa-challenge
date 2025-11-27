# Use the latest official Playwright image
FROM mcr.microsoft.com/playwright:v1.57.0-noble

# Create a workspace inside the container
WORKDIR /app

# Copy the dependency list
COPY package.json ./

# Install the dependencies
RUN npm install

# Copy the actual test files
COPY . .

# The command to run when the container starts
CMD ["npx", "playwright", "test"]