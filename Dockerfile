# copied from: https://github.com/GoogleCloudPlatform/cloud-build-samples/blob/main/gradle-example/Dockerfile

FROM tomcat:latest
EXPOSE 8080
RUN rm -rf /usr/local/tomcat/webapps/*
ARG WAR_FILE=WAR_FILE_MUST_BE_SPECIFIED_AS_BUILD_ARG
COPY ${WAR_FILE} /usr/local/tomcat/webapps
RUN ["catalina.sh", "run"]