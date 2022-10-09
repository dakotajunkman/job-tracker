#!/bin/bash

export DB_CON=$DB_CON
export DB_NAME=$DB_NAME
export DB_USER=$DB_USER
export DB_PW=$DB_PW
export JAVA_OPTS="$JAVA_OPTS $JSSE_OPTS -Djava.security.egd=file:/dev/./urandom"
echo $DB_CON
echo $DB_NAME
echo $DB_USER
echo $DB_PW
echo $JAVA_OPTS
printenv > env.txt
cat env.txt
