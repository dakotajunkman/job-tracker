# copied from: https://github.com/GoogleCloudPlatform/cloud-build-samples/blob/main/gradle-example/Dockerfile

FROM tomcat:9.0.65-jdk17
RUN rm -rf /usr/local/tomcat/webapps/*
COPY ./build/libs/jobtracker-0.0.1-SNAPSHOT.war /usr/local/tomcat/webapps
COPY ./setenv.sh .
RUN chmod +x setenv.sh
RUN ./setenv.sh
RUN ["catalina.sh", "run"]