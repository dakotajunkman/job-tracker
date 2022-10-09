# copied from: https://github.com/GoogleCloudPlatform/cloud-build-samples/blob/main/gradle-example/Dockerfile

FROM tomcat:9.0.65-jdk17
ENV JAVA_OPTS="$JAVA_OPTS $JSSE_OPTS -Djava.security.egd=file:/dev/./urandom"
ENV DB_CON="${DB_CON}"
RUN echo $DB_CON
ENV DB_NAME="${DB_NAME}"
RUN echo $DB_NAME
ENV DB_USER="${DB_USER}"
RUN echo $DB_USER
ENV DB_PW="${DB_PW}"
RUN echo $DB_PW
RUN rm -rf /usr/local/tomcat/webapps/*
COPY ./build/libs/jobtracker-0.0.1-SNAPSHOT.war /usr/local/tomcat/webapps
RUN ["catalina.sh", "run"]