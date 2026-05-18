# Getting Started - Make it Oman Platform

## 📍 Where is the Project?

Your Make it Oman project is located in your Google Drive:

```
G:\My Drive\Projects\منصة صنع في عمان\make-it-oman\
```

### Alternative Location
If not in Google Drive, check:
```
C:\Users\abdullah.j\AppData\Roaming\Claude\local-agent-mode-sessions\...\outputs\make-it-oman\
```

---

## 🚀 Quick Start (5 minutes)

### Step 1: Open Command Prompt or PowerShell

**Option A: Command Prompt (cmd)**
```bash
Win + R
cmd
```

**Option B: PowerShell**
```bash
Win + X
A (for PowerShell as Admin)
```

### Step 2: Navigate to Project

```bash
cd "G:\My Drive\Projects\منصة صنع في عمان\make-it-oman"
```

Or if in your Documents:
```bash
cd "%USERPROFILE%\make-it-oman"
```

### Step 3: Start Everything with One Command

**If using Command Prompt:**
```bash
SETUP.bat
```

**If using PowerShell:**
```bash
.\SETUP.ps1
```

**Or run Docker Compose directly:**
```bash
docker-compose up
```

### Step 4: Wait for Services to Start

You should see:
```
✓ postgres running (port 5432)
✓ redis running (port 6379)
✓ backend running (port 5000)
✓ frontend running (port 3000)
```

### Step 5: Access the Platform

Open your browser and visit:

- 🔗 **Frontend**: http://localhost:3000
- 🔗 **API**: http://localhost:5000
- 🔗 **Health Check**: http://localhost:5000/health

---

## 📁 Project Structure

```
make-it-oman/
├── backend/                    # Node.js/Express API
│   ├── src/
│   │   ├── models/            # Database models (User, Manufacturer, Product)
│   │   ├── routes/            # API endpoints
│   │   ├── middleware/        # Authentication, logging, errors
│   │   ├── config/            # Database configuration
│   │   └── utils/             # Logger and helpers
│   ├── package.json           # Backend dependencies
│   ├── .env.example           # Environment variables template
│   └── Dockerfile             # Docker configuration
│
├── frontend/                  # React application
│   ├── src/
│   │   ├── components/        # React components (ready to build)
│   │   ├── pages/            # Page components
│   │   ├── store/            # Redux state management
│   │   └── App.jsx            # Main component
│   └── package.json           # Frontend dependencies
│
├── docker-compose.yml         # Orchestrate all services
├── SETUP.bat                  # Windows batch setup script
├── SETUP.ps1                  # PowerShell setup script
├── README.md                  # Comprehensive documentation
├── GETTING_STARTED.md         # This file
└── PLATFORM_ARCHITECTURE.md   # Technical specifications
```

---

## 🔧 Prerequisites

### Required
- **Docker Desktop** - [Download here](https://www.docker.com/products/docker-desktop)
- **Git** (optional but recommended)

### Optional
- **Node.js 18+** - For local development without Docker
- **PostgreSQL** - For local database without Docker
- **Redis** - For local caching without Docker

---

## 📋 Manual Setup (Without Docker)

### Backend Setup

```bash
# Navigate to backend
cd backend

# Copy environment file
copy .env.example .env

# Install dependencies
npm install

# Run migrations (if database set up)
npm run migrate

# Start development server
npm run dev
```

### Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Copy environment file
copy .env.example .env

# Install dependencies
npm install

# Start development server
npm start
```

---

## 🔑 Key Endpoints

### Test the API

**Test Authentication:**
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPassword123",
    "fullName": "Test User",
    "role": "user"
  }'
```

**Check Health:**
```bash
curl http://localhost:5000/health
```

**List Manufacturers:**
```bash
curl http://localhost:5000/api/v1/manufacturers
```

---

## 🧹 Common Issues & Solutions

### Issue: "Cannot find path 'make-it-oman'"

**Solution:** Use the full path with quotes:
```bash
cd "G:\My Drive\Projects\منصة صنع في عمان\make-it-oman"
```

### Issue: "Docker is not installed"

**Solution:** Install Docker Desktop:
1. Go to https://www.docker.com/products/docker-desktop
2. Download and install
3. Restart your computer
4. Try again

### Issue: "Port 5000 already in use"

**Solution:** Either:
- Stop the service using port 5000
- Or change port in docker-compose.yml (line 76: change 5000:5000 to 5001:5000)

### Issue: "Docker daemon not running"

**Solution:**
1. Open Docker Desktop application
2. Wait for it to fully start
3. Try docker-compose up again

### Issue: Permission denied on SETUP.ps1

**Solution:** Set execution policy:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

## 📊 Database Access

### Connect to PostgreSQL

**Using psql (if installed):**
```bash
psql -h localhost -U postgres -d make_it_oman
```

**Using pgAdmin (web interface):**
1. Install pgAdmin from https://www.pgadmin.org
2. Connect to: localhost:5432
3. Username: postgres
4. Password: postgres (from docker-compose.yml)

### Default Credentials

```
Database: make_it_oman
User: postgres
Password: postgres
Host: localhost
Port: 5432
```

---

## 📝 Environment Configuration

### Backend (.env)

Create `backend/.env` with:
```
NODE_ENV=development
PORT=5000
DB_HOST=postgres
DB_PORT=5432
DB_NAME=make_it_oman
DB_USER=postgres
DB_PASSWORD=postgres
JWT_SECRET=your_secret_key_here
REDIS_HOST=redis
REDIS_PORT=6379
```

### Frontend (.env)

Create `frontend/.env` with:
```
REACT_APP_API_URL=http://localhost:5000
```

---

## 🎯 Next Steps

1. **Start the platform** - Run SETUP.bat or docker-compose up
2. **Explore the API** - Visit http://localhost:5000/api/v1
3. **Check frontend** - Visit http://localhost:3000
4. **Read documentation** - Check PLATFORM_ARCHITECTURE.md
5. **Start developing** - Begin building features!

---

## 📚 Important Documents

- **README.md** - Full documentation & API specs
- **PLATFORM_ARCHITECTURE.md** - Technical design details
- **DEVELOPMENT_SUMMARY.md** - Progress & roadmap
- **FILES_CREATED.md** - Complete file listing

---

## 🆘 Need Help?

1. Check the troubleshooting section above
2. Read the README.md for more details
3. Check docker-compose logs:
   ```bash
   docker-compose logs -f backend
   docker-compose logs -f postgres
   ```

---

## ✨ You're All Set!

Your Make it Oman platform is ready to develop. Start with `SETUP.bat` or `docker-compose up` and begin building!

**Happy coding! 🚀**
