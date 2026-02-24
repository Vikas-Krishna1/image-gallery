FROM node:24

WORKDIR /app

# Copy dependency files first
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy rest of the app
COPY . .

# React dev server runs on 3000
EXPOSE 3000

CMD ["npm", "start"]
