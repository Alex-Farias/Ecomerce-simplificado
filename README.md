# Next
## Install dependencies
npx create-next-app@latest ecommerce-frontend --ts
npm i --save -D tailwindcss postcss autoprefixer
## Install React Query
npm i --save @tanstack/react-query 
## Install React Hook Form and Zod
npm i --save react-hook-form zod @hookform/resolvers
## Install NextAuth.js
npm i --save next-auth
## Install Axios
npm i --save axios
## Install Lucide
npm i --save lucide-react




## Start the dev server
npm run dev

## Configure Tailwind CSS (tailwind.config.js)
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

# Nest
npm i
npm i -g @nestjs/cli
npm i --save @nestjs/platform-fastify    
npm i --save @nestjs/typeorm typeorm pg   
npm i --save @nestjs/config
Invoke-WebRequest https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh -OutFile wait-for-it.sh


# Docker

## Set the initial container. Variables need to be the same in .env archive use .env.example
docker run --name [container-name] -e POSTGRES_USER=[user-name] -e POSTGRES_PASSWORD=[your-password] -e POSTGRES_DB=[database-name] -p 5432:5432 -d postgres

## Build the postgres container
docker exec -it postgres_container apt-get update
docker exec -it postgres_container apt-get install -y postgresql-client

## Check the database container and test tables
docker exec -it ecomerce-simplificado psql -U postgres -d Ecomerce-Simplificado
\c Ecomerce-Simplificado
SELECT current_schema(); or  SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';


## Test if it's ok!
SELECT now();

# To run application
docker-compose down -v  # Stop and remove volumes
docker-compose up --build  # Rebuild and restart everything