# Cryptocurrency Dashboard

A modern, responsive cryptocurrency dashboard built with Angular and Tailwind CSS that displays real-time cryptocurrency data using the CoinGecko API.

## Features

- 📊 **Real-time Data**: Live cryptocurrency prices with automatic updates every 30 seconds
- 🔍 **Search Functionality**: Filter cryptocurrencies by name or symbol
- 📈 **Mini Charts**: Sparkline charts showing 7-day price trends
- 📱 **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- 🎨 **Modern UI**: Beautiful dark theme with smooth animations and transitions
- ⚡ **Fast Performance**: Optimized with Angular best practices
- ♿ **Accessibility**: Full ARIA support and keyboard navigation

## Architecture

The application follows Angular best practices with a modular architecture:

### Components

- `AppComponent` - Main application shell
- `CryptoListComponent` - Main dashboard displaying cryptocurrency data
- `SearchComponent` - Search functionality with real-time filtering
- `ChartComponent` - Reusable chart component for sparkline visualizations

### Services

- `CryptocurrencyService` - Handles API calls to CoinGecko and real-time data updates

### Models

- `Cryptocurrency` - TypeScript interfaces for type safety

### Key Features

- **Real-time Updates**: Uses RxJS observables for live data streaming
- **Responsive Grid**: CSS Grid layout that adapts to different screen sizes
- **Error Handling**: Graceful error handling with user-friendly messages
- **Loading States**: Visual feedback during data fetching
- **Type Safety**: Full TypeScript implementation

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
   git clone <repository-url>
   cd crypto-dashboard
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

## License

This project is licensed under the MIT License.

## Deployment

### Build for production

```bash
ng build --configuration production
```

### Deploy to GitHub Pages

```bash
ng deploy --base-href=/crypto-dashboard/
```

## Future Enhancements

- [ ] Portfolio tracking
- [ ] Price alerts
- [ ] Advanced charting with multiple timeframes
- [ ] Favorites/watchlist functionality
- [ ] Dark/light theme toggle
- [ ] PWA support for offline usage
- [ ] WebSocket integration for real-time updates
