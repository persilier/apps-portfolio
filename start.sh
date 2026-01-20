#!/bin/sh
set -e

echo "Waiting for database to be ready..."
# Simple wait loop could be added here if needed, but depend_on in compose helps.
# Prisma db push will retry or fail if DB is not ready, but we can rely on compose restart policy.

echo "Pushing database schema..."
npx prisma db push --accept-data-loss

echo "Starting application..."
node server.js
