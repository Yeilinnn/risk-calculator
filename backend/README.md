# Risk Calculator Backend

A NestJS-based REST API for managing risk assessments with automatic score and level computation.

## Features

- **Risk Management**: Create, read, update, and delete risk assessments
- **Automatic Computation**: Server automatically calculates risk scores and levels
- **Filtering & Search**: Filter by risk level and search by hazard description
- **Validation**: Comprehensive input validation with class-validator
- **Type Safety**: Full TypeScript support with strict typing

## Tech Stack

- **Framework**: NestJS
- **Database**: MySQL with TypeORM
- **Validation**: class-validator + class-transformer
- **Testing**: Jest for unit and e2e tests

## Quick Start

### Prerequisites

- Node.js 18+ and pnpm
- MySQL 8.0+
- Database: `risk_calculator`

### Installation

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Configure environment:
   ```bash
   cp env.example .env
   # Edit .env with your MySQL credentials
   ```

3. Run database migrations:
   ```bash
   pnpm typeorm:migrate
   ```

4. Start development server:
   ```bash
   pnpm start:dev
   ```

The API will be available at `http://localhost:3001`

## API Endpoints

### Risks

- `GET /risks` - List all risks (ordered by score DESC)
- `GET /risks?level=High&q=wet` - Filter by level and search query
- `POST /risks` - Create new risk
- `GET /risks/:id` - Get risk by ID
- `PATCH /risks/:id` - Update risk (recomputes score/level)
- `DELETE /risks/:id` - Delete risk

### Admin

- `GET /risks/admin/test` - Health check endpoint

## Risk Calculation

- **Score**: Likelihood × Severity (1-25)
- **Levels**:
  - Low: 1-4
  - Medium: 5-9
  - High: 10-16
  - Critical: 17-25

## Development

### Scripts

- `pnpm start` - Start production server
- `pnpm start:dev` - Start development server with hot reload
- `pnpm test` - Run unit tests
- `pnpm test:e2e` - Run end-to-end tests
- `pnpm typeorm:generate` - Generate new migration
- `pnpm typeorm:migrate` - Run pending migrations

### Testing

```bash
# Unit tests
pnpm test

# E2E tests
pnpm test:e2e

# Test coverage
pnpm test:cov
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MYSQL_HOST` | MySQL host | localhost |
| `MYSQL_PORT` | MySQL port | 3306 |
| `MYSQL_USER` | MySQL username | root |
| `MYSQL_PASSWORD` | MySQL password | your_password |
| `MYSQL_DB` | Database name | risk_calculator |
| `PORT` | API port | 3001 |
| `NODE_ENV` | Environment | development |

## Database Schema

The `risks` table contains:

- `id` (UUID, Primary Key)
- `hazard` (VARCHAR 255)
- `likelihood` (INT 1-5)
- `severity` (INT 1-5)
- `score` (INT 1-25, computed)
- `level` (ENUM: Low, Medium, High, Critical, computed)
- `createdAt` (TIMESTAMP)
- `updatedAt` (TIMESTAMP)
