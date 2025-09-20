# Marine Platform Database Setup

## Prerequisites

1. **PostgreSQL** - Install PostgreSQL 14+ on your system
2. **Python 3.8+** - For data import script
3. **Node.js 16+** - For backend API

## Database Setup Steps

### 1. Setup Schema
```bash
cd backend
psql -U postgres -d marine_data -f schema.sql
```

### 2. Grant Permissions
```sql
psql -U postgres -d marine_data -c "GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO marine_app_user;"
psql -U postgres -d marine_data -c "GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO marine_app_user;"
```

### 3. Install Python Dependencies
```bash
pip install -r requirements.txt
```

### 4. Import CSV Data
```bash
# Make sure occurrence.csv is in the backend directory
python import_data.py
```

### 5. Install Node.js Dependencies
```bash
npm install
```

### 6. Configure Environment
Update `.env` file with your database credentials:
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=marine_data
DB_USER=marine_app_user
DB_PASSWORD=your_password
```

### 7. Start Backend Server
```bash
npm run dev
```

## Database Schema Overview

### Tables:
- **institutions** - Research institutions and collections
- **species** - Marine species information
- **locations** - Geographic locations with coordinates
- **marine_occurrences** - Main occurrence records

### Key Features:
- Normalized schema for efficient storage
- Indexes for fast queries
- Views for common data access patterns
- Automatic timestamp updates

## API Endpoints (after setup)

- `GET /api/species` - List all species
- `GET /api/occurrences` - List occurrences with filters
- `GET /api/locations` - Geographic data
- `GET /api/stats` - Database statistics

## Data Import Notes

The CSV contains **marine biodiversity occurrence data** from CMLRE (Central Marine Living Resources and Ecology) with:
- 1000+ species records
- Geographic coordinates (Arabian Sea, Bay of Bengal, Andaman Sea)
- Depth information (2m to 5850m)
- Collection dates (2009-2022)
- Taxonomic classifications
- Specimen details (sex, life stage, count)

Perfect for marine research, biodiversity analysis, and conservation studies.