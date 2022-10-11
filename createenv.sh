#!/bin/bash

export DB_CON=$DB_CON
export DB_NAME=$DB_NAME
export DB_USER=$DB_USER
export DB_PW=$DB_PW

APP_PROPS=./src/main/resources/application.properties

# Copy env variables to application.properties
echo spring.cloud.gcp.sql.database-name="$DB_NAME" >> $APP_PROPS
echo spring.cloud.gcp.sql.instance-connection-name="$DB_CON" >> $APP_PROPS
echo spring.datasource.username="$DB_USER" >> $APP_PROPS
echo spring.datasource.password="$DB_PW" >> $APP_PROPS
# cat $APP_PROPS
