# copied from: https://github.com/GoogleCloudPlatform/cloud-build-samples/blob/main/gradle-example/Dockerfile

FROM tomcat:9.0.65-jdk17
RUN rm -rf /usr/local/tomcat/webapps/*
COPY ./build/libs/jobtracker-0.0.1-SNAPSHOT.war /usr/local/tomcat/webapps
COPY ./config.json .
ENV GOOGLE_APPLICATION_CREDENTIALS=./config.json
RUN printenv
RUN echo JAVA_OPTS=-Djava.security.egd=file:/dev/./urandom > $CATALINA_HOME/bin/setenv.sh
RUN chmod +x $CATALINA_HOME/bin/setenv.sh
EXPOSE 8080
