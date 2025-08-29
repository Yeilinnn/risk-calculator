# Risk Calculator

A full-stack risk assessment application that automatically calculates risk scores and levels based on likelihood and severity inputs. Built with modern technologies and a beautiful pastel green UI.

## 🚀 Features

- **Automatic Risk Calculation**: Server computes risk scores (L×S) and levels (Low/Medium/High/Critical)
- **Real-time Updates**: UI reflects changes immediately without page refresh
- **Dual Views**: Table view for data management, Matrix view for visual analysis
- **Advanced Filtering**: Search by hazard description and filter by risk level
- **CSV Export**: Download risk data for external analysis
- **Responsive Design**: Works seamlessly on all devices
- **Full Accessibility**: Keyboard navigation and screen reader support

## 🏗️ Architecture

### Backend (NestJS + TypeORM + MySQL)
- **RESTful API** with comprehensive CRUD operations
- **Automatic validation** with class-validator
- **Global exception handling** for safe error responses
- **TypeORM** with MySQL for data persistence
- **Comprehensive testing** with Jest

### Frontend (React + Vite + Tailwind)
- **Modern React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** with custom mint color palette
- **Responsive components** with accessibility features
- **Real-time form validation** and error handling

## 📊 Risk Calculation

- **Score Formula**: Likelihood × Severity (1-25)
- **Risk Levels**:
  - **Low**: 1-4 points
  - **Medium**: 5-9 points  
  - **High**: 10-16 points
  - **Critical**: 17-25 points

## 🛠️ Tech Stack

| Component | Technology |
|-----------|------------|
| **Backend** | NestJS, TypeORM, MySQL, TypeScript |
| **Frontend** | React 18, Vite, Tailwind CSS, TypeScript |
| **Database** | MySQL 8.0+ |
| **Testing** | Jest (Backend), Vitest (Frontend) |
| **Package Manager** | pnpm |

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+** and **pnpm**
- **MySQL 8.0+** database
- **Git** for version control

### 1. Clone Repository

```bash
git clone <repository-url>
cd risk-calculator
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
pnpm install

# Configure environment
cp env.example .env
# Edit .env with your MySQL credentials

# Run database migrations
pnpm typeorm:migrate

# Start development server
pnpm start:dev
```

Backend will be available at `http://localhost:3001`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
pnpm install

# Configure environment
cp env.local.example .env.local
# Edit .env.local with backend API URL

# Start development server
pnpm dev
```

Frontend will be available at `http://localhost:5173`

## 📁 Project Structure

```
risk-calculator/
├── backend/                 # NestJS API
│   ├── src/
│   │   ├── core/           # Global filters, pipes, modules
│   │   ├── risks/          # Risk management (CRUD)
│   │   ├── shared/         # Domain types and utilities
│   │   └── main.ts         # Application entry point
│   ├── test/               # Unit and e2e tests
│   └── package.json        # Backend dependencies
├── frontend/                # React application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── lib/            # Utilities and API client
│   │   ├── types/          # TypeScript definitions
│   │   └── styles/         # Global CSS and Tailwind
│   └── package.json        # Frontend dependencies
└── README.md               # This file
```

## 🧪 Testing

### Backend Tests

```bash
cd backend

# Unit tests
pnpm test

# E2E tests
pnpm test:e2e

# Test coverage
pnpm test:cov
```

### Frontend Tests

```bash
cd frontend

# Run tests
pnpm test

# Watch mode
pnpm test --watch
```

## 🔧 Development Scripts

### Backend

| Script | Description |
|--------|-------------|
| `pnpm start` | Start production server |
| `pnpm start:dev` | Start development server with hot reload |
| `pnpm test` | Run unit tests |
| `pnpm test:e2e` | Run end-to-end tests |
| `pnpm typeorm:migrate` | Run database migrations |

### Frontend

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build |
| `pnpm test` | Run tests |

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/risks` | List all risks (with optional filters) |
| `POST` | `/risks` | Create new risk |
| `GET` | `/risks/:id` | Get risk by ID |
| `PATCH` | `/risks/:id` | Update risk |
| `DELETE` | `/risks/:id` | Delete risk |
| `GET` | `/risks/admin/test` | Health check |

### Query Parameters

- `level`: Filter by risk level (Low/Medium/High/Critical)
- `q`: Search query for hazard description

## 🎨 UI Components

- **RiskForm**: Create/edit risks with live validation
- **RiskTable**: Sortable data table with actions
- **RiskMatrix**: Visual 5×5 risk matrix
- **RiskFilters**: Search and level filtering
- **LevelBadge**: Color-coded risk level indicators
- **ExportButton**: CSV export functionality

## 🔒 Security Features

- **Input Validation**: Comprehensive validation with class-validator
- **SQL Injection Protection**: TypeORM parameterized queries
- **CORS Configuration**: Proper cross-origin resource sharing
- **Error Handling**: Safe error responses without information leakage

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: Responsive grid layouts
- **Touch Friendly**: Proper touch targets and interactions
- **Progressive Enhancement**: Works on all screen sizes

## ♿ Accessibility

- **WCAG AA Compliance**: Proper color contrast ratios
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: Semantic HTML and ARIA labels
- **Focus Management**: Clear focus indicators

## 🚀 Deployment

### Backend Deployment

1. Set `NODE_ENV=production`
2. Configure production database
3. Run `pnpm build`
4. Start with `pnpm start:prod`

### Frontend Deployment

1. Run `pnpm build`
2. Deploy `dist/` folder to your hosting service
3. Configure environment variables for production API

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Follow the coding standards
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:
1. Check the documentation
2. Review existing issues
3. Create a new issue with detailed information

---

**Built with ❤️ using modern web technologies**
