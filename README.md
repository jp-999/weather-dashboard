# Meteora Weather Dashboard

A modern, futuristic weather dashboard built with React.

## Features

- Real-time weather data display (uses mock data)
- 5-day weather forecast
- Interactive temperature and precipitation charts
- Location search with favorites and history
- Beautiful UI with animations and responsive design
- Dark mode support
- Mobile-friendly interface

## Technologies Used

- React.js
- React Router
- Context API for state management
- Tailwind CSS for styling
- Framer Motion for animations
- Chart.js for data visualization
- Vite for build tooling

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/meteora-weather-dashboard.git
cd meteora-weather-dashboard
```

2. Install dependencies
```bash
npm install
# or
yarn
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to http://localhost:5173

## Deployment

This project is configured to be deployed on Vercel:

1. Push your repository to GitHub
2. Import the project to Vercel
3. Configure build settings (Vite should be auto-detected)
4. Deploy!

## Project Structure

```
meteora-weather-dashboard/
├── public/               # Static assets
├── src/                  # Source code
│   ├── components/       # React components
│   │   ├── common/       # Shared UI components
│   │   ├── layout/       # Layout components
│   │   └── weather/      # Weather-specific components
│   ├── context/          # Context providers
│   ├── hooks/            # Custom hooks
│   ├── services/         # API services (mock)
│   ├── utils/            # Utility functions
│   ├── styles/           # Global styles
│   ├── App.jsx           # Main app component
│   └── main.jsx          # Entry point
├── .gitignore            # Git ignore file
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind CSS config
└── README.md             # This file
```

## License

MIT

## Acknowledgements

- Weather icons from Heroicons
- Design inspiration from various weather apps and dashboards
