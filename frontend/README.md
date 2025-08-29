# Risk Calculator Frontend

A modern React application for managing risk assessments with a beautiful pastel green UI built with Tailwind CSS.

## Features

- **Risk Management**: Create, edit, and delete risk assessments
- **Real-time Calculation**: See risk scores and levels computed instantly
- **Dual Views**: Switch between table and matrix views
- **Advanced Filtering**: Filter by risk level and search by hazard description
- **Risk Matrix**: Visual 5×5 matrix showing risk distribution
- **CSV Export**: Export risk data for external analysis
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Accessibility**: Full keyboard navigation and screen reader support

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom mint color palette
- **Icons**: Lucide React
- **State Management**: React Hooks
- **Testing**: Vitest

## Quick Start

### Prerequisites

- Node.js 18+ and pnpm
- Backend API running (see backend README)

### Installation

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Configure environment:
   ```bash
   cp env.local.example .env.local
   # Edit .env.local with your backend API URL
   ```

3. Start development server:
   ```bash
   pnpm dev
   ```

The application will be available at `http://localhost:5173`

## Features in Detail

### Risk Form
- **Validation**: Real-time form validation with error messages
- **Live Preview**: See calculated risk score and level as you type
- **Accessibility**: Proper labels, ARIA attributes, and keyboard navigation

### Risk Table
- **Sorting**: Automatically sorted by risk score (highest first)
- **Actions**: View, edit, and delete risks with confirmation dialogs
- **Responsive**: Horizontal scrolling on small screens

### Risk Matrix
- **Visual Representation**: 5×5 grid showing likelihood vs severity
- **Color Coding**: Pastel green palette based on risk levels
- **Interactive**: Hover tooltips with detailed information
- **Risk Counts**: Shows number of risks in each matrix cell

### Filters & Search
- **Level Filter**: Filter by Low, Medium, High, or Critical risks
- **Text Search**: Case-insensitive search in hazard descriptions
- **Combined Filters**: Use both filters simultaneously
- **Clear Filters**: Easy reset of all active filters

### Export Functionality
- **CSV Format**: Standard CSV with proper escaping
- **Filename**: Includes current date for easy identification
- **All Fields**: Exports hazard, likelihood, severity, score, level, and creation date

## Color Palette

The application uses a custom mint color palette:

- **Low Risk**: `mint-200` (Light pastel green)
- **Medium Risk**: `mint-300` (Medium pastel green)
- **High Risk**: `mint-400` (Darker pastel green)
- **Critical Risk**: `mint-600` (Deep mint green)

## Development

### Scripts

- `pnpm dev` - Start development server with hot reload
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm test` - Run tests with Vitest

### Project Structure

```
src/
├── components/          # React components
│   ├── level-badge.tsx # Risk level display
│   ├── risk-form.tsx   # Create/edit form
│   ├── risk-filters.tsx # Search and filtering
│   ├── risk-table.tsx  # Data table view
│   ├── risk-matrix.tsx # Visual matrix view
│   └── export-button.tsx # CSV export
├── lib/                # Utility functions
│   ├── risk.ts         # Risk calculations
│   └── api.ts          # API client
├── types/              # TypeScript definitions
│   └── risk.ts         # Risk data types
├── styles/             # Global styles
│   └── globals.css     # Tailwind + custom CSS
├── app.tsx             # Main application component
└── main.tsx            # Application entry point
```

### Testing

```bash
# Run tests
pnpm test

# Run tests in watch mode
pnpm test --watch
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | http://localhost:3001 |

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Accessibility Features

- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Screen Reader**: Proper ARIA labels and semantic HTML
- **Focus Management**: Clear focus indicators and logical tab order
- **Color Contrast**: WCAG AA compliant color combinations
- **Semantic HTML**: Proper heading hierarchy and landmark elements

## Performance Features

- **Code Splitting**: Automatic code splitting with Vite
- **Lazy Loading**: Components loaded on demand
- **Optimized Builds**: Tree shaking and minification
- **Responsive Images**: Optimized for different screen sizes

## Contributing

1. Follow the established code style and patterns
2. Ensure all components are accessible
3. Add tests for new functionality
4. Update documentation as needed
