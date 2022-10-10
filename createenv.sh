#!/bin/bash

export DB_CON=$DB_CON
export DB_NAME=$DB_NAME
export DB_USER=$DB_USER
export DB_PW=$DB_PW

# Copy env variables to application.properties
echo spring.cloud.gcp.sql.database-name="$DB_NAME" >> ./src/main/resources/application.properties
echo spring.cloud.gcp.sql.instance-connection-name="$DB_CON" >> ./src/main/resources/application.properties
echo spring.datasource.username="$DB_USER" >> ./src/main/resources/application.properties
echo spring.datasource.password="$DB_PW" >> ./src/main/resources/application.properties
cat ./src/main/resources/application.properties