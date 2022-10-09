# copied from: https://github.com/GoogleCloudPlatform/cloud-build-samples/blob/main/gradle-example/Dockerfile

FROM tomcat:latest
EXPOSE 8080
RUN rm -rf /usr/local/tomcat/webapps/*
COPY ./build/libs/jobtracker-0.0.1-SNAPSHOT.war /usr/local/tomcat/webapps
RUN ["catalina.sh", "run"]