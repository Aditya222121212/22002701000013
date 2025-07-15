# AfforMed - URL Shortener Service

A modern, full-stack URL shortener application with analytics, built with React.js frontend and Node.js/Express backend.

## 🚀 Features

- **URL Shortening**: Convert long URLs into short, manageable links
- **Custom Short Codes**: Option to create custom short codes
- **Expiry Management**: Set custom expiry times for short URLs (default: 30 minutes)
- **Analytics**: Track click statistics and visit history
- **Modern UI**: Beautiful, responsive React frontend with Tailwind CSS
- **Real-time Stats**: View detailed analytics for your shortened URLs

## 📸 Screenshots

### URL Shortener Interface
![URL Shortener Interface](images/Screenshot%202025-07-15%20124532.png)

### URL Statistics Dashboard
![URL Statistics Dashboard](images/Screenshot%202025-07-15%20124607.png)

## 🛠️ Tech Stack

### Frontend
- **React 19.1.0** - Modern UI library
- **Tailwind CSS 4.1.11** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server
- **ESLint** - Code linting and formatting

### Backend
- **Node.js** - JavaScript runtime
- **Express.js 5.1.0** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose 8.16.3** - MongoDB object modeling
- **ShortID 2.2.17** - Short ID generation
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
AfforMed/
├── Client/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── UrlShortener.jsx
│   │   │   └── UrlStats.jsx
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── Server/                 # Node.js backend
│   ├── src/
│   │   ├── controllers/
│   │   │   └── url.js
│   │   ├── models/
│   │   │   └── url.js
│   │   ├── routes/
│   │   │   └── url.js
│   │   ├── utils/
│   │   │   ├── connectDb.js
│   │   │   └── logger.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AfforMed
   ```

2. **Setup Backend**
   ```bash
   cd Server
   npm install
   ```

3. **Setup Frontend**
   ```bash
   cd ../Client
   npm install
   ```

4. **Environment Configuration**
   
   Create a `.env` file in the `Server` directory:
   ```env
   MONGO_URL=mongodb://localhost:27017/url-shortener
   PORT=3000
   ```

   Create a `.env` file in the `Client` directory:
   ```env
   VITE_API_BASE_URL=http://localhost:3000
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd Server
   npm run dev
   ```
   The server will start on `http://localhost:3000`

2. **Start the Frontend (in a new terminal)**
   ```bash
   cd Client
   npm run dev
   ```
   The frontend will start on `http://localhost:5173`

## 📚 API Documentation

### Base URL
```
http://localhost:3000
```

### Endpoints

#### 1. Create Short URL
**POST** `/shorturls`

Creates a new shortened URL with optional custom short code and expiry time.

**Request Body:**
```json
{
  "url": "https://example.com/very-long-url",
  "shortcode": "custom123",  // Optional
  "validity": 60             // Optional, expiry in minutes (default: 30)
}
```

**Response (201 Created):**
```json
{
  "shortLink": "http://localhost:3000/custom123",
  "expiry": "2025-07-15T14:30:00.000Z"
}
```

**Error Responses:**
- `400 Bad Request`: URL is required
- `409 Conflict`: Shortcode already exists
- `500 Internal Server Error`: Server error

#### 2. Redirect to Original URL
**GET** `/:shortcode`

Redirects to the original URL and tracks the visit.

**Parameters:**
- `shortcode` (path parameter): The short code identifier

**Response:**
- `302 Redirect`: Redirects to original URL
- `404 Not Found`: Shortcode not found
- `410 Gone`: Short URL expired
- `500 Internal Server Error`: Server error

#### 3. Get URL Statistics
**GET** `/shorturls/:shortId`

Retrieves analytics and statistics for a shortened URL.

**Parameters:**
- `shortId` (path parameter): The short code identifier

**Response (200 OK):**
```json
{
  "totalClicks": 15,
  "originalUrl": "https://example.com/very-long-url",
  "createdAt": "2025-07-15T12:00:00.000Z",
  "expiry": "2025-07-15T14:30:00.000Z",
  "visitHistory": [
    {
      "timestamp": 1721052000000,
      "_id": "60d5ec49f1a2c8b1f8e4e1a1"
    }
  ]
}
```

**Error Responses:**
- `404 Not Found`: Shortcode not found
- `500 Internal Server Error`: Server error

## 🗄️ Database Schema

### URL Document Structure
```javascript
{
  _id: ObjectId,
  shortId: String,        // Unique short identifier
  originalUrl: String,    // Original long URL
  visitHistory: [         // Array of visit records
    {
      timestamp: Number,  // Unix timestamp
      _id: ObjectId
    }
  ],
  expiry: Date,          // Expiry date/time
  createdAt: Date,       // Auto-generated creation timestamp
  updatedAt: Date        // Auto-generated update timestamp
}
```

## 🎨 Frontend Features

### Components

#### Header
- Application branding and navigation
- Responsive design with modern styling

#### UrlShortener
- URL input form with validation
- Optional custom short code input
- Expiry time selection
- Success/error message handling
- Copy to clipboard functionality

#### UrlStats
- Short code input for analytics lookup
- Comprehensive statistics display:
  - Total clicks count
  - Original URL
  - Creation date
  - Expiry information
  - Visit history timeline

### UI/UX Features
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern Styling**: Clean, professional interface with Tailwind CSS
- **Interactive Elements**: Hover effects, transitions, and animations
- **Error Handling**: User-friendly error messages
- **Loading States**: Visual feedback during API calls
- **Copy to Clipboard**: Easy sharing of shortened URLs

## 🔧 Development

### Available Scripts

#### Backend (Server)
```bash
npm run dev      # Start development server with nodemon
npm test         # Run tests (to be implemented)
```

#### Frontend (Client)
```bash
npm run dev      # Start Vite development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Code Style
- ESLint configuration for consistent code formatting
- Modern JavaScript (ES6+) with modules
- React functional components with hooks
- RESTful API design patterns

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB connection (MongoDB Atlas recommended for production)
2. Configure environment variables
3. Deploy to services like Heroku, DigitalOcean, or AWS
4. Update CORS settings for production domain

### Frontend Deployment
1. Update API base URL in environment variables
2. Build the project: `npm run build`
3. Deploy to services like Vercel, Netlify, or AWS S3

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👥 Author

**Repository**: 22002701000013  
**Owner**: Aditya222121212

## 🙏 Acknowledgments

- React team for the amazing framework
- Express.js community for the robust backend framework
- Tailwind CSS for the utility-first CSS framework
- MongoDB for the flexible NoSQL database

---

**Note**: This is a development project. For production use, ensure proper security measures, rate limiting, and monitoring are implemented.
