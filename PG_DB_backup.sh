#!/bin/bash

# Connection details
DB_HOST="localhost"
DB_PORT="5670"
DB_USER="user"
DB_NAME="dbname"
SCHEMA_NAME="public" # Replace with your schema name
BACKUP_DIR="./backup"

# Create the backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Log file for errors
ERROR_LOG="$BACKUP_DIR/error.log"
> "$ERROR_LOG" # Clear the error log

# Fetch all table names in the schema
echo "Fetching tables in schema: $SCHEMA_NAME..."
TABLES=$(psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -t -c \
"SELECT table_name FROM information_schema.tables WHERE table_schema = '$SCHEMA_NAME';")

if [ -z "$TABLES" ]; then
  echo "No tables found in schema: $SCHEMA_NAME"
  exit 1
fi

echo "Starting backup of schema: $SCHEMA_NAME"
for TABLE in $TABLES; do
  BACKUP_FILE="$BACKUP_DIR/${TABLE}_backup.sql"
  echo "Backing up table: $TABLE..."
  pg_dump -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" \
          --table="$SCHEMA_NAME.$TABLE" --format=c --blobs \
          --file="$BACKUP_FILE" 2>>"$ERROR_LOG"

  if [ $? -ne 0 ]; then
    echo "Error backing up table: $TABLE. Skipping..."
    echo "Error details logged to $ERROR_LOG"
  else
    echo "Successfully backed up table: $TABLE to $BACKUP_FILE"
  fi
done

echo "Backup completed. Check $BACKUP_DIR for backup files."
echo "Any errors are logged in $ERROR_LOG."
