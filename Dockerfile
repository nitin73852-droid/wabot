FROM node:18

# Install necessary dependencies for Puppeteer
RUN apt-get update && apt-get install -y \
  libnss3 \
  libatk-bridge2.0-0 \
  libx11-xcb1 \
  libxcomposite1 \
  libxcursor1 \
  libxdamage1 \
  libxrandr2 \
  libgbm-dev \
  libasound2 \
  libpangocairo-1.0-0 \
  libpangoft2-1.0-0 \
  fonts-liberation \
  libappindicator3-1 \
  xdg-utils \
  libcurl4 \
  --no-install-recommends \
  && apt-get clean

# Set working directory
WORKDIR /app

# Copy project files
COPY . .

# Install dependencies
RUN npm install

# Expose port if needed (not mandatory for WhatsApp bots)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
