# EpidemAI Frontend

React + TypeScript dashboard for the EpidemAI Public Health Surveillance System.

## Setup

```bash
npm install
cp .env.example .env
# Edit .env with your backend API URL
npm run dev
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:5000/api` |

## Deployment (Vercel)

1. Push this folder to a Git repository
2. Import project on Vercel
3. Set environment variable: `VITE_API_URL` = your backend URL
4. Framework preset: Vite
5. Build command: `npm run build`
6. Output directory: `dist`

The `vercel.json` handles SPA routing automatically.
