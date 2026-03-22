# EpidemAI Backend

REST API for the EpidemAI Public Health Surveillance System.

## Setup

```bash
npm install
cp .env.example .env
# Edit .env with your MongoDB URI
npm run seed   # Populate database with initial data
npm run dev    # Start development server
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/epidemai` |
| `CORS_ORIGIN` | Allowed CORS origin | `*` |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/hotspots?disease=&city=` | Disease hotspot markers |
| GET | `/api/stats?disease=&period=` | Statistics grid data |
| GET | `/api/alerts?disease=&city=` | Priority alerts |
| GET | `/api/trends?period=` | Disease trend chart data |
| GET | `/api/insights` | AI-generated insights |
| GET | `/api/news` | Outbreak news feed |
| GET | `/api/health` | Health check |

## Deployment (Render / Railway)

1. Push this folder to a Git repository
2. Connect to Render or Railway
3. Set environment variables (`MONGODB_URI`, `PORT`)
4. Build command: `npm install`
5. Start command: `npm start`
