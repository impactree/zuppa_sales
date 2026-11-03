# Rubicr — Deployment Guide (Docker + AWS Lightsail)

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Prerequisites](#prerequisites)
3. [AWS Lightsail Server Setup](#aws-lightsail-server-setup)
4. [Environment Variables](#environment-variables)
5. [First-Time Deployment](#first-time-deployment)
6. [Database Migrations](#database-migrations)
7. [Updating the Application](#updating-the-application)
8. [Useful Commands](#useful-commands)
9. [Troubleshooting](#troubleshooting)

---

## Architecture Overview

```
AWS Lightsail Instance
├── Docker Compose (monorepo)
│   ├── zuppa_frontend   → Next.js 14    (port 3000)
│   ├── zuppa_backend    → NestJS         (port 5000)
│   ├── zuppa_postgres   → PostgreSQL 16  (port 5432)
│   └── zuppa_rabbitmq   → RabbitMQ 3    (port 5672 / 15672)
└── Nginx (reverse proxy)
    ├── app.rubicr.com   → :3000
    └── api.rubicr.com   → :5000
```

---

## Prerequisites

- AWS account with Lightsail access
- Domain names pointed to your Lightsail static IP
- SSH key pair (`.pem`) for the Lightsail instance

---

## AWS Lightsail Server Setup

### 1. Create Lightsail Instance

1. Go to [AWS Lightsail Console](https://lightsail.aws.amazon.com)
2. Click **Create instance**
3. Select:
   - Platform: **Linux/Unix**
   - Blueprint: **Ubuntu 22.04 LTS**
   - Instance plan: **4 GB RAM / 2 vCPUs** minimum (8 GB recommended)
4. Attach or create an **SSH key pair** — download the `.pem` file
5. Name the instance (e.g., `rubicr-prod`) and click **Create**
6. Go to **Networking** → assign a **Static IP** to the instance

### 2. Open Firewall Ports

In the Lightsail instance **Networking** tab, add these rules:

| Protocol | Port  | Purpose                  |
|----------|-------|--------------------------|
| TCP      | 22    | SSH                      |
| TCP      | 80    | HTTP (Nginx)             |
| TCP      | 443   | HTTPS (Nginx + SSL)      |
| TCP      | 3000  | Frontend (optional/debug)|
| TCP      | 5000  | Backend (optional/debug) |
| TCP      | 15672 | RabbitMQ UI (optional)   |

> Ports 3000 and 5000 can be closed once Nginx is configured.

### 3. Connect to the Instance

```bash
chmod 400 your-key.pem
ssh -i your-key.pem ubuntu@<LIGHTSAIL_STATIC_IP>
```

### 4. Install Docker & Docker Compose

```bash
# Update packages
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker ubuntu
newgrp docker

# Verify
docker --version
docker compose version
```

### 5. Install Nginx & Certbot

```bash
sudo apt install -y nginx certbot python3-certbot-nginx
```

### 6. Configure Nginx Reverse Proxy

```bash
sudo nano /etc/nginx/sites-available/rubicr
```

Paste the following (replace domains with yours):

```nginx
server {
    listen 80;
    server_name app.rubicr.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

server {
    listen 80;
    server_name api.rubicr.com;

    client_max_body_size 50M;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/rubicr /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 7. Enable SSL with Certbot

```bash
sudo certbot --nginx -d app.rubicr.com -d api.rubicr.com
```

Certbot auto-renews. Verify with:

```bash
sudo certbot renew --dry-run
```

### 8. Clone the Repository

```bash
mkdir -p /home/ubuntu/rubicr
cd /home/ubuntu/rubicr
git clone https://github.com/<your-org>/zuppa_sales.git .
```

---

## Environment Variables

Create these files directly on the server. Never commit them to git.

### Backend — `/home/ubuntu/rubicr/zuppa_sales_backend/.env`

```env
PORT=5000

# JWT
JWT_SECRET=<strong-random-secret>
JWT_TOKEN_EXPIRES=7d
JWT_SECRET_ADMIN=<strong-admin-secret>
JWT_REFRESH_ADMIN=<strong-refresh-admin-secret>
JWT_REFRESH_SECRET=<strong-refresh-secret>
JWT_REFRESH_EXPIRES=30d
JWT_REFRESH_EXPIRES_TIME_IN_MIN=180

# Database — must use Docker service name, not localhost
DB_NAME=valencedb
DB_USERNAME=postgres
DB_PASSWORD=<strong-db-password>
DB_HOST=postgres
DB_PORT=5432

# RabbitMQ — must use Docker service name, not localhost
RABBITMQ_URL=amqp://guest:guest@rabbitmq:5672
QUEUE_NAME=email_q
MAIL_QUEUE=email_q
JOB_QUEUE=report_queue

# SMTP
SMTP_HOST=email-smtp.ap-south-1.amazonaws.com
SMTP_PORT=587
SMTP_USERNAME=<ses-smtp-username>
SMTP_PASSWORD=<ses-smtp-password>
SES_FROM_ADDRESS=tech@impactree.ai
DEFAULT_EMAIL_FROM="Rubicr(No-reply)" <tech@impactree.ai>
PREVIEW_EMAIL=false
MAIL_URL=https://app.rubicr.com
BASE_URL=app.rubicr.com
FRONTEND_URL=app.rubicr.com
IS_HTTPS=true

# AWS S3
AWS_ACCESS_KEY=<aws-access-key>
AWS_SECRET_KEY=<aws-secret-key>
AWS_REGION=ap-south-1
AWS_S3_BUCKET=valences3
AWS_ENDPOINT=https://valences3.s3.ap-south-1.amazonaws.com/

# Swagger
SWAGGER_URL=swagger

# Gemini
GOOGLE_GEMINI_API=<gemini-api-key>
```

### Frontend — `/home/ubuntu/rubicr/zuppa_sales_frontend/.env`

```env
NEXTAUTH_SECRET=<strong-nextauth-secret>
AUTH_SECRET=<strong-nextauth-secret>
NEXTAUTH_URL=https://app.rubicr.com
AUTH_TRUST_HOST=https://app.rubicr.com
NEXT_PUBLIC_BE=https://api.rubicr.com/
```

> `NEXT_PUBLIC_BE` must be the public-facing API URL (not `http://backend:5000`) since it is used in the browser.

---

## First-Time Deployment

```bash
cd /home/ubuntu/rubicr

# Build images and start all services in detached mode
docker compose up --build -d

# Verify all containers are running
docker compose ps

# Watch logs
docker compose logs -f
```

Expected output from `docker compose ps`:

```
NAME               STATUS          PORTS
zuppa_backend      Up (healthy)    0.0.0.0:5000->5000/tcp
zuppa_frontend     Up              0.0.0.0:3000->3000/tcp
zuppa_postgres     Up (healthy)    0.0.0.0:5432->5432/tcp
zuppa_rabbitmq     Up (healthy)    0.0.0.0:5672->5672/tcp
```

---

## Database Migrations

Run after first deployment and after every schema change:

```bash
# 1. Admin (public schema) migrations
docker exec -it zuppa_backend npm run migration

# 2. All tenant migrations
docker exec -it zuppa_backend npm run tenant_migrations_all

# 3. Single tenant migration (if needed)
docker exec -it zuppa_backend sh -c "TENANT_SCHEMA=tenent_<uuid> npm run tenant_migration_run"
```

---

## Updating the Application

For every code change, SSH into the server and run:

```bash
cd /home/ubuntu/rubicr

# Pull latest code
git pull origin main

# Rebuild changed services and restart
docker compose up --build -d

# Run migrations if there are schema changes
docker exec -it zuppa_backend npm run migration
docker exec -it zuppa_backend npm run tenant_migrations_all

# Clean up old/dangling images
docker image prune -f
```

To rebuild only one service (faster):

```bash
# Rebuild and restart backend only
docker compose up --build -d backend

# Rebuild and restart frontend only
docker compose up --build -d frontend
```

---

## Useful Commands

### Container Management

```bash
# List all running containers with status
docker compose ps

# Logs for a specific service
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f postgres

# Restart a single service (no rebuild)
docker compose restart backend

# Stop all services (keeps volumes)
docker compose down

# Stop and remove all volumes — WARNING: deletes all DB data
docker compose down -v
```

### Database

```bash
# Open PostgreSQL shell
docker exec -it zuppa_postgres psql -U postgres -d valencedb

# Backup database to file
docker exec zuppa_postgres pg_dump -U postgres valencedb > backup_$(date +%Y%m%d).sql

# Restore from backup
docker exec -i zuppa_postgres psql -U postgres valencedb < backup.sql
```

### Migration Commands

```bash
# Generate new admin migration
docker exec -it zuppa_backend npm run typeorm:cli -- migration:generate src/migration/admin/<name>

# Generate new tenant migration
docker exec -it zuppa_backend npm run typeorm_tenant:cli -- migration:generate src/migration/tenanted/<name>

# Revert last admin migration
docker exec -it zuppa_backend npm run typeorm:cli -- migration:revert

# Revert last tenant migration
docker exec -it zuppa_backend npm run typeorm_tenant:cli -- migration:revert
```

---

## Troubleshooting

**Container exits immediately after start**
```bash
docker compose logs backend
# Look for missing env vars, port conflicts, or DB connection errors
```

**Frontend can't reach backend (API calls failing)**
- `NEXT_PUBLIC_BE` must be the public URL (`https://api.rubicr.com/`), not the Docker internal hostname
- The `backend` hostname only resolves inside the Docker network (server-side only)

**Database connection refused**
- Confirm `DB_HOST=postgres` in backend `.env` — not `localhost`
- Check postgres is healthy: `docker compose ps`
- Wait ~10s after startup for postgres to be ready

**Migrations fail on first run**
```bash
# Confirm backend can reach postgres
docker exec -it zuppa_backend sh -c "node -e \"const {Client}=require('pg');const c=new Client({host:'postgres',user:'postgres',password:'<your-password>',database:'valencedb'});c.connect().then(()=>console.log('connected')).catch(console.error)\""
```

**Out of disk space**
```bash
# Remove all unused Docker resources
docker system prune -af --volumes
```

**Nginx 502 Bad Gateway**
- Check the relevant container is running: `docker compose ps`
- Confirm the port mapping matches the Nginx `proxy_pass` port

**SSL certificate renewal**
```bash
sudo certbot renew
sudo systemctl reload nginx
```
