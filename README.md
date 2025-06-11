# Cryptocurrency Dashboard

A modern, responsive cryptocurrency dashboard built with Angular and Tailwind CSS that displays real-time cryptocurrency data using the CoinGecko API.

## Live Demo

Explore the live application here → [crypto-currency-angular.vercel.app](https://crypto-currency-angular.vercel.app/)

## Features

- 📊 **Real-time Data**: Live cryptocurrency prices with automatic updates every 30 seconds
- 🔍 **Search Functionality**: Filter cryptocurrencies by name or symbol
- 📈 **Mini Charts**: Sparkline charts showing 7-day price trends
- 📱 **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- 🎨 **Modern UI**: Beautiful dark theme with smooth animations and transitions
- ⚡ **Fast Performance**: Optimized with Angular best practices
- ♿ **Accessibility**: Full ARIA support and keyboard navigation

## Architecture

The application follows a modular, standalone-component architecture in Angular 19:

### Components

- `AppComponent` – application shell & main layout wrapper
- `HeaderComponent` – sticky toolbar with project title
- `SearchComponent` – fuzzy search / filter box
- `CryptoTableComponent` – responsive table that renders the list of coins
- `TableHeaderComponent` – reusable sortable table-header row
- `CryptoNameLogoComponent` – coin logo + name cell
- `ChartComponent` – sparkline price chart (7-day)
- `LastUpdatedComponent` – timestamp badge
- `LoadingComponent` – skeleton loaders & spinners
- `ErrorComponent` – graceful error message display

### Services

- `CryptocurrencyService` – HTTP wrapper around the CoinGecko REST endpoints
- `CryptoDataManagerService` – orchestrates fetching, caching and polling of coin data
- `ChartService` – prepares datasets & colours for Chart.js
- `SearchService` – manages reactive search/filter state
- `FormattingService` – number / currency / percentage helpers
- `TimestampService` – generates human-readable "last updated" timestamps

### Models

- `Cryptocurrency` – strongly-typed interface representing a single coin returned from CoinGecko

This layout keeps UI concerns separated from data concerns, maximises reusability, and makes unit testing straightforward.

## Technologies Used

- **Angular 19** - Frontend framework
- **Tailwind CSS** - Utility-first CSS framework
- **Chart.js** - Canvas-based charting library
- **RxJS** - Reactive programming for data streams
- **TypeScript** - Type-safe JavaScript
- **CoinGecko API** - Real-time cryptocurrency data

## Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager
- Angular CLI

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/AESharak/crypto_currency_angular.git
   cd crypto_currency_angular
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   ng serve
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200`

## Available Scripts

- `ng serve` - Start development server
- `ng build` - Build the project for production
- `ng test` - Run unit tests
- `ng lint` - Run linting
- `ng e2e` - Run end-to-end tests

## API Usage

This application uses the [CoinGecko API](https://www.coingecko.com/en/api) which provides:

- Free tier with rate limiting
- No API key required for basic usage
- Real-time cryptocurrency market data
- Historical price data and charts

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations

- Lazy loading of images
- OnPush change detection strategy
- Efficient data filtering with RxJS operators
- Canvas-based charts for better performance
- Minimal bundle size with standalone components

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Deployment

### Build for production

```bash
ng build --configuration production
```

### Deploy to Vercel

This project is ready for zero-config deployment on [Vercel](https://vercel.com/). If you have the Vercel CLI installed:

```bash
ng build --configuration production   # build the project
vercel --prod                         # deploy the "dist" folder
```

Alternatively, push to the **master** branch on GitHub and enable the Vercel Git integration; each commit will be built and deployed automatically.
