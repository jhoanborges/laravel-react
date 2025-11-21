# Cotizador Value

A modern quotation and pricing calculator application built with Laravel 12 and React 19, designed for managing business quotes and financial calculations.

## Tech Stack

### Backend

- **PHP** 8.4.14
- **Laravel** 12.39.0
- **Inertia.js** 2.0.10 (Server-side)
- **Laravel Wayfinder** 0.1.12 - Type-safe routing
- **MySQL** - Database engine

### Frontend

- **React** 19.2.0
- **Inertia.js** 2.1.4 (Client-side)
- **TypeScript** 5.7.2
- **Tailwind CSS** 4.1.12
- **Radix UI** - Accessible component primitives
- **Redux Toolkit** 2.10.1 - State management
- **ApexCharts** 5.3.6 - Data visualization
- **TanStack Table** 8.21.3 - Advanced tables

### Development Tools

- **Laravel Sail** - Docker development environment
- **Vite** 7.0.4 - Fast build tool
- **Pest** 4.1.4 - Testing framework
- **Laravel Pint** 1.25.1 - PHP code style fixer
- **ESLint** 9.33.0 - JavaScript linter
- **Prettier** 3.6.2 - Code formatter
- **Larastan** 3.8.0 - Static analysis
- **Rector** 2.2.8 - Automated refactoring

## Requirements

- Docker & Docker Compose (for Laravel Sail)
- Composer
- Node.js >= 18

> **Note:** This project uses Laravel Sail. All PHP/Laravel commands should be run through Sail using `./vendor/bin/sail`.

## Installation

### Using Composer Setup Script

```bash
composer run setup
```

This will:

- Install PHP dependencies
- Copy `.env.example` to `.env`
- Generate application key
- Run database migrations
- Install Node.js dependencies
- Build frontend assets

### Manual Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd cotizador-value
```

2. **Install PHP dependencies**

```bash
composer install
```

3. **Set up environment**

```bash
cp .env.example .env
```

4. **Start Laravel Sail**

```bash
./vendor/bin/sail up -d
```

5. **Generate application key**

```bash
./vendor/bin/sail artisan key:generate
```

6. **Run migrations**

```bash
./vendor/bin/sail artisan migrate
```

7. **Install frontend dependencies**

```bash
npm install
```

8. **Build assets**

```bash
npm run build
```

## Development

### Start Development Environment

1. **Start Docker containers**

```bash
./vendor/bin/sail up -d
```

2. **Start all development services**

```bash
composer run dev
```

This concurrently runs:

- Laravel development server
- Queue worker
- Real-time logs (`sail artisan pail`)
- Vite dev server with hot module replacement

### Development with SSR

Build SSR bundle and start services:

```bash
composer run dev:ssr
```

### Common Sail Commands

```bash
# Run artisan commands
./vendor/bin/sail artisan migrate
./vendor/bin/sail artisan tinker

# Access the container shell
./vendor/bin/sail shell

# View logs
./vendor/bin/sail artisan pail

# Stop containers
./vendor/bin/sail down
```

### Shell Alias (Optional)

For convenience, add this alias to your shell configuration:

```bash
alias sail='./vendor/bin/sail'
```

Then you can run commands like:

```bash
sail artisan migrate
sail up -d
sail down
```

## Available Scripts

### Backend (Composer)

- `composer run setup` - Complete project setup
- `composer run dev` - Start all development services
- `composer run dev:ssr` - Start development with SSR
- `composer run test` - Run test suite

### Frontend (NPM)

- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run build:ssr` - Build with SSR support
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run lint` - Lint and fix code
- `npm run types` - Type check TypeScript

## Code Quality

### Automated Code Quality Script

Run the complete code quality check script:

```bash
./code-check.sh
```

This script runs:

1. Pest tests (with bail on first failure)
2. Rector (automated refactoring)
3. Laravel Pint (code style fixer)
4. PHPStan (static analysis)
5. Pest tests again (with coverage)

### Individual Quality Checks

```bash
# PHP code style fixer
./vendor/bin/sail pint

# Static analysis
./vendor/bin/sail exec cotizador.test vendor/bin/phpstan analyse --memory-limit=2G

# Automated refactoring
./vendor/bin/sail exec cotizador.test vendor/bin/rector

# JavaScript/TypeScript linting
npm run lint

# Code formatting
npm run format

# Type checking
npm run types
```

## Testing

This project uses [Pest](https://pestphp.com/) for testing.

### Run All Tests

```bash
./vendor/bin/sail pest
```

### Run Tests with Bail

Stop on first failure:

```bash
./vendor/bin/sail pest --bail
```

### Run Tests with Coverage

Generate code coverage report:

```bash
./vendor/bin/sail pest --coverage
```

Set minimum coverage thresholds:

```bash
./vendor/bin/sail pest --coverage --min=80
```

### Run Specific Tests

Run a specific test file:

```bash
./vendor/bin/sail pest tests/Feature/ExampleTest.php
```

Run with filter (by test name):

```bash
./vendor/bin/sail pest --filter=testName
```

Run tests in a specific directory:

```bash
./vendor/bin/sail pest tests/Unit
./vendor/bin/sail pest tests/Feature
```

### Parallel Testing

Run tests in parallel for faster execution:

```bash
./vendor/bin/sail pest --parallel
```

### Using Artisan Test Command

Alternatively, use Laravel's test command:

```bash
./vendor/bin/sail artisan test
./vendor/bin/sail artisan test --parallel
./vendor/bin/sail artisan test --coverage
```

## Project Structure

```
.
├── app/                    # Application code
│   ├── Http/
│   │   └── Controllers/   # Laravel controllers
│   └── Services/          # Business logic services
├── bootstrap/             # Application bootstrap
├── config/                # Configuration files
├── database/              # Migrations, factories, seeders
├── public/                # Public assets
├── resources/
│   └── js/
│       ├── components/    # React components
│       ├── pages/         # Inertia.js pages
│       ├── redux/         # Redux store and slices
│       └── types/         # TypeScript definitions
├── routes/                # Route definitions
├── storage/               # Application storage
├── tests/                 # Test files
└── vendor/                # Composer dependencies
```

## Key Features

- Modern React-based UI with TypeScript
- Type-safe routing with Laravel Wayfinder
- Real-time data visualization with ApexCharts
- Advanced table functionality
- Redux state management
- Responsive design with Tailwind CSS 4
- Dark mode support
- API authentication
- Database-backed sessions and queues

## Configuration

Key configuration files:

- `config/` - Laravel configuration
- `vite.config.ts` - Vite build configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `eslint.config.js` - ESLint configuration
- `.prettierrc` - Prettier configuration
- `pint.json` - Laravel Pint configuration
- `phpstan.neon` - PHPStan configuration

## Environment Variables

See `.env.example` for all available environment variables. Key variables:

- `APP_NAME` - Application name
- `APP_URL` - Application URL
- `API_URL` - External API endpoint
- `DB_*` - Database configuration
- `QUEUE_CONNECTION` - Queue driver
- `CACHE_STORE` - Cache driver

## License

MIT License
