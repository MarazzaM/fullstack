## Getting Started
In the base directory
```bash
cd backend
```

First, install the dependencies:

```bash
npm i
```
Copy .env.example in .env

```bash
cp .env.example .env
```
To start the db and run migrations in development mode, can use deploy instead for prod (im using sqlite so no need to run this really)
```bash
npx prisma migrate dev
```
To start dev server

```bash
npm run dev
```

In the base directory

```bash
cd frontend
```

First, install the dependencies:

```bash
npm i
```

```bash
cp .env.example .env
```
To start dev server
```bash
npm run dev
```