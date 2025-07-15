# AfforMed URL Shortener - Frontend

A modern, responsive React frontend for the AfforMed URL shortener service.

## Features

- **URL Shortening**: Create short URLs with optional custom short codes
- **Expiry Management**: Set custom expiry times for URLs (30 minutes to 1 week)
- **Statistics Dashboard**: View detailed analytics for your short URLs
- **Real-time Data**: Live click tracking and visit history
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean, professional interface built with Tailwind CSS

## Screenshots

### URL Shortener
- Clean form interface for creating short URLs
- Optional custom short code input
- Configurable expiry times
- Copy-to-clipboard functionality

### Statistics Dashboard
- Total clicks counter
- Daily and weekly click analytics
- Visit history with timestamps
- URL status (active/expired)
- Original URL display

## Tech Stack

- **React 19** - Modern React with hooks
- **Tailwind CSS 4** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server
- **Modern ES6+** - Latest JavaScript features

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Running AfforMed backend server

### Installation

1. Navigate to the Client directory:
   ```bash
   cd Client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   # Create .env file (already exists)
   VITE_API_URL=http://localhost:3000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and visit: `http://localhost:5173`

### Backend Setup

Make sure your backend server is running on port 3000. The backend should provide these endpoints:

- `POST /shorturls` - Create short URL
- `GET /shorturls/:shortId` - Get URL statistics
- `GET /:shortcode` - Redirect to original URL

## Usage

### Creating Short URLs

1. Navigate to the "Shorten URL" tab
2. Enter the original URL you want to shorten
3. (Optional) Enter a custom short code
4. Select expiry time (30 minutes to 1 week)
5. Click "Shorten URL"
6. Copy the generated short link

### Viewing Statistics

1. Navigate to the "URL Statistics" tab
2. Enter the short code you want to analyze
3. Click "Get Stats"
4. View comprehensive analytics including:
   - Total clicks
   - Clicks today and this week
   - Creation and expiry dates
   - Recent visit history

## API Integration

The frontend communicates with the backend through a clean API layer:

```javascript
// Create short URL
await urlApi.createShortUrl({
  url: 'https://example.com',
  shortcode: 'optional-code',
  validity: 60 // minutes
})

// Get statistics
await urlApi.getUrlStats('short-code')
```

## Project Structure

```
Client/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # App header component
│   │   ├── UrlShortener.jsx    # URL creation form
│   │   └── UrlStats.jsx        # Statistics dashboard
│   ├── utils/
│   │   └── api.js              # API utilities
│   ├── App.jsx                 # Main app component
│   ├── App.css                 # Custom styles
│   └── main.jsx                # App entry point
├── public/
├── .env                        # Environment variables
├── package.json
└── vite.config.js
```

## Styling

The app uses Tailwind CSS for styling with custom CSS for:
- Smooth transitions and animations
- Custom scrollbars
- Focus states
- Loading states
- Success/error animations

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please contact the development team or create an issue in the repository.+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
