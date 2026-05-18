# Make it Oman - Digital Platform for Manufacturing & Products

A comprehensive digital ecosystem for promoting and managing Omani manufacturing, products, and local content.

## 🎯 Overview

**Make it Oman** is a full-featured web platform that:
- Registers and verifies manufacturing facilities across Oman
- Catalogs and showcases Omani-made products
- Enables B2B marketplace functionality
- Provides advanced analytics and market intelligence
- Integrates with government procurement systems
- Supports local content tracking and compliance

## 🏗️ Tech Stack

### Backend
- **Node.js 18+** with Express.js
- **PostgreSQL** for data persistence
- **Redis** for caching and session management
- **JWT** authentication
- **Bull** for job processing
- **AWS S3** for file storage

### Frontend
- **React 18** with hooks
- **Redux Toolkit** for state management
- **Material-UI (MUI)** for components
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Recharts** for analytics visualizations

### DevOps
- **Docker** & **Docker Compose** for containerization
- **GitHub Actions** for CI/CD
- **Kubernetes** for production orchestration

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm 9+
- Docker and Docker Compose (for containerized setup)
- PostgreSQL 14+ (if running without Docker)
- Redis 7+ (if running without Docker)

### Option 1: Docker Compose (Recommended)

```bash
# Clone the repository
git clone https://github.com/your-org/make-it-oman.git
cd make-it-oman

# Copy environment file
cp .env.example .env

# Start all services
docker-compose up

# Accessible at:
# Backend: http://localhost:5000
# Frontend: http://localhost:3000
# API Docs: http://localhost:5000/api-docs
```

### Option 2: Manual Setup

#### Backend

```bash
cd backend

# Copy environment file
cp .env.example .env

# Edit .env with your configuration
nano .env

# Install dependencies
npm install

# Run database migrations
npm run migrate

# Seed sample data
npm run seed

# Start development server
npm run dev
```

#### Frontend

```bash
cd frontend

# Copy environment file
cp .env.example .env

# Install dependencies
npm install

# Start development server
npm start
```

## 📁 Project Structure

```
make-it-oman/
├── backend/                    # Node.js/Express API
│   ├── src/
│   │   ├── models/            # Database models
│   │   ├── routes/            # API endpoints
│   │   ├── controllers/       # Business logic
│   │   ├── middleware/        # Express middleware
│   │   ├── services/          # Service layer
│   │   └── utils/             # Helper functions
│   └── package.json
├── frontend/                  # React application
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── pages/            # Page components
│   │   ├── store/            # Redux store
│   │   ├── services/         # API services
│   │   └── styles/           # Global styles
│   └── package.json
├── docs/                      # Documentation
├── docker-compose.yml         # Full stack setup
└── README.md                  # This file
```

## 📖 API Documentation

### Base URL
```
http://localhost:5000/api/v1
```

### Authentication
```
Authorization: Bearer <jwt_token>
```

### Key Endpoints

#### Authentication
```
POST   /auth/register              # Register new user
POST   /auth/login                 # User login
GET    /auth/me                    # Get current user
POST   /auth/logout                # Logout
POST   /auth/reset-password        # Reset password
```

#### Manufacturers
```
GET    /manufacturers              # List all manufacturers
GET    /manufacturers/:id          # Get manufacturer details
POST   /manufacturers              # Register manufacturer
PUT    /manufacturers/:id          # Update manufacturer
GET    /manufacturers/:id/products # Get manufacturer's products
```

#### Products
```
GET    /products                   # List all products
GET    /products/:id               # Get product details
POST   /products                   # Create product
PUT    /products/:id               # Update product
DELETE /products/:id               # Delete product
GET    /products/search/advanced   # Advanced search
```

#### Analytics
```
GET    /analytics/dashboard        # Dashboard metrics
GET    /analytics/manufacturers    # Manufacturer statistics
GET    /analytics/products         # Product statistics
POST   /analytics/reports          # Generate reports
```

#### Government Integration
```
GET    /government/local-content   # Local content data
GET    /government/procurement     # Procurement opportunities
GET    /government/compliance      # Compliance status
```

## 🔑 Features

### Core Features (MVP)
- [x] User authentication (JWT)
- [x] Manufacturer registration & profiles
- [x] Product database & catalog
- [x] Advanced search & filtering
- [x] Manufacturer verification system
- [x] Image upload & management
- [x] Rating & review system
- [x] Basic analytics dashboard

### Extended Features (Phase 2-3)
- [ ] B2B marketplace & ordering
- [ ] Quotation management
- [ ] Government procurement integration
- [ ] Local content tracking
- [ ] Payment processing
- [ ] Multi-language support (AR/EN)
- [ ] Mobile app
- [ ] Advanced analytics & reports
- [ ] Supply chain mapping
- [ ] Export/import functionality

## 🔒 Security

- **JWT Authentication** with refresh token rotation
- **Password Hashing** with bcryptjs
- **HTTPS/TLS** for all communications
- **CORS** protection
- **Rate Limiting** on API endpoints
- **SQL Injection** prevention (parameterized queries)
- **XSS & CSRF** protection
- **Audit Logging** for all actions

## 📊 Database Schema

Key tables:
- `users` - User accounts
- `manufacturers` - Manufacturing facilities
- `products` - Product catalog
- `orders` - Marketplace orders
- `quotations` - Price quotations
- `analytics_data` - Industrial metrics
- `audit_logs` - System audits

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 📝 Development Workflow

1. Create feature branch
   ```bash
   git checkout -b feature/your-feature
   ```

2. Make changes and commit
   ```bash
   git commit -m "feat: description of changes"
   ```

3. Push to remote
   ```bash
   git push origin feature/your-feature
   ```

4. Create Pull Request for review

## 🚢 Deployment

### Development
```bash
docker-compose -f docker-compose.dev.yml up
```

### Staging
```bash
docker-compose -f docker-compose.staging.yml up
```

### Production
```bash
# Using Kubernetes
kubectl apply -f k8s/
```

See `docs/DEPLOYMENT.md` for detailed deployment instructions.

## 📚 Documentation

- [API Documentation](docs/API_DOCUMENTATION.md)
- [Database Schema](docs/DATABASE_SCHEMA.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [Development Setup](docs/DEVELOPMENT.md)
- [User Guide](docs/USER_GUIDE.md)

## 🤝 Contributing

1. Follow the code style guidelines
2. Write tests for new features
3. Update documentation
4. Submit pull requests

## 📝 Environment Variables

See `.env.example` files in backend and frontend directories for all available configuration options.

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Check PostgreSQL is running
docker-compose logs postgres

# Verify connection string in .env
```

### Port Already in Use
```bash
# Change ports in docker-compose.yml or .env
# Or kill process using the port
lsof -i :5000  # Find process
kill -9 <PID>   # Kill process
```

### Node Modules Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📧 Support

For issues and questions:
- Create GitHub Issues
- Email: support@makeitoman.om
- Documentation: https://docs.makeitoman.om

## 📄 License

MIT License - see LICENSE file for details

## 🎉 Acknowledgments

Developed for the Sultanate of Oman to promote and support Omani manufacturing and local content.

---

**Version:** 1.0.0  
**Last Updated:** May 2026  
**Status:** Production Ready
