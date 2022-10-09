#!/bin/bash

export DB_CON=$DB_CON
export DB_NAME=$DB_NAME
export DB_USER=$DB_USER
export DB_PW=$DB_PW
echo ENV DB_CON="$DB_CON" >> Dockerfile
echo ENV DB_NAME="$DB_NAME" >> Dockerfile
echo ENV DB_USER="$DB_USER" >> Dockerfile
echo ENV DB_PW="$DB_PW" >> Dockerfile
echo RUN ["catalina.sh", "run"] >> Dockerfile
cat Dockerfile
