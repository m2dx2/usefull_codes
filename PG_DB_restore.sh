#!/bin/bash

# Connection details for local PostgreSQL
DB_HOST="localhost"
DB_PORT="5432"
DB_USER="user"  # Use your local PostgreSQL username
DB_NAME="dbname"        # The target database to restore into
BACKUP_DIR="./backup"          # Directory where the backup files are stored

# Loop through the backup files and restore each table
for BACKUP_FILE in "$BACKUP_DIR"/*_backup.sql; do
  if [ -f "$BACKUP_FILE" ]; then
    echo "Restoring from backup: $BACKUP_FILE"
    pg_restore --host="$DB_HOST" --port="$DB_PORT" --username="$DB_USER" \
               --dbname="$DB_NAME" --no-password --verbose \
               "$BACKUP_FILE"
    if [ $? -ne 0 ]; then
      echo "Error restoring from $BACKUP_FILE"
    else
      echo "Successfully restored $BACKUP_FILE"
    fi
  fi
done
