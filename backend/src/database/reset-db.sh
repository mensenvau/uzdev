#!/bin/bash

# Database Reset Script
# This script drops and recreates the database with fresh schema and seed data

echo "🔄 Resetting database..."

# Check if MySQL is running
if ! command -v mysql &> /dev/null; then
    echo "❌ MySQL is not installed or not in PATH"
    exit 1
fi

# Load environment variables if .env exists
if [ -f "../../.env" ]; then
    export $(cat ../../.env | grep -v '^#' | xargs)
fi

# Default values
DB_HOST=${DB_HOST:-localhost}
DB_USER=${DB_USER:-root}
DB_PASSWORD=${DB_PASSWORD:-}

# Build MySQL command
MYSQL_CMD="mysql -h ${DB_HOST} -u ${DB_USER}"

if [ -n "$DB_PASSWORD" ]; then
    MYSQL_CMD="$MYSQL_CMD -p${DB_PASSWORD}"
fi

# Run init.sql
echo "📋 Running init.sql..."
$MYSQL_CMD < init.sql

if [ $? -ne 0 ]; then
    echo "❌ Failed to run init.sql"
    exit 1
fi

# Run seed.sql
echo "🌱 Running seed.sql..."
$MYSQL_CMD < seed.sql

if [ $? -ne 0 ]; then
    echo "❌ Failed to run seed.sql"
    exit 1
fi

echo "✅ Database reset successfully!"
echo ""
echo "Default super admin credentials:"
echo "  Email: admin@coreapp.com"
echo "  Username: superadmin"
echo "  Password: Admin@123"
