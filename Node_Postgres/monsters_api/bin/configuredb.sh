#!/bin/bash

export PGPASSWORD = 'node_password'

database = "monstersdb"

echo "Configuring database: $database"

dropdb - U node_user monstersdb
createdb - U node_user monstersdb

bash -c "psql -U node_user monstersdb < ./bin/sql/monsters.sql"

echo "$database configured"

sleep 2

