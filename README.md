# Image Gallery 🖼️

> A full-stack image search application with user authentication, powered by the Unsplash API.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)

## 🔗 Links
- [Live Demo](your-live-demo-link)
- [GitHub](your-github-link)

---

## Features

- 🔍 **Image Search** — Search millions of high-quality images via the Unsplash API
- 👤 **User Authentication** — Register and log in to save your searches
- 🐳 **Containerized** — Full-stack Docker Compose setup for consistent environments
- ⚡ **Optimized Performance** — Production-grade Core Web Vitals scores

---

## Performance

Lighthouse scores on production deployment:

| Category | Score |
|----------|-------|
| Performance | 100 |
| Accessibility | 98 |
| Best Practices | 100 |
| SEO | 91 |

Core Web Vitals:
- **FCP:** 0.3s
- **LCP:** 0.6s
- **CLS:** 0

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React |
| Backend | Node.js, Express |
| Database | MongoDB |
| Image API | Unsplash API |
| Containerization | Docker, Docker Compose |
| Frontend Deployment | Vercel |
| Backend Deployment | Render |

---

## Getting Started

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- Unsplash API key
- MongoDB instance

### Running with Docker (Recommended)

```bash
# Clone the repository
git clone https://github.com/vikaskrishna/image-gallery.git
cd image-gallery

# Set up environment variables
cp .env.example .env
# Add your API keys

# Start with Docker Compose
docker-compose up --build
```

### Running Locally

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend (new terminal)
cd frontend
npm install
npm start
```

---

## Environment Variables

```env
# Backend
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
UNSPLASH_ACCESS_KEY=your_unsplash_key

# Frontend
REACT_APP_API_URL=http://localhost:5000
REACT_APP_UNSPLASH_KEY=your_unsplash_key
```

---

## Project Structure

```
image-gallery/
├── frontend/          # React application
│   ├── src/
│   │   ├── components/
│   │   └── pages/
├── backend/           # Node.js/Express API
│   ├── routes/
│   ├── models/
│   └── server.js
└── docker-compose.yml
```

---

## Author

**Vikas Krishna** — [@vikaskrishna](https://github.com/vikaskrishna)
