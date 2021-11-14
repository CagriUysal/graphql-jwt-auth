# JWT Auth Starter

Apollo Server starter with JWTs using Prisma.

## Development

- Install Dependencies

  ```bash
  yarn
  ```

- Migrate Prisma Schema to the Database

  - Rename `.env.example` to `.env` and provide `DATABASE_URL` environmental variable.
  - Check [Connection Urls](https://www.prisma.io/docs/reference/database-reference/connection-urls) for different databases.

  ```bash
  yarn migrate
  ```

- Start Development Server

  ```bash
  yarn dev
  ```
