import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    id("org.springframework.boot") version "2.6.12"
    id("io.spring.dependency-management") version "1.0.14.RELEASE"
    id("com.google.cloud.tools.appengine") version "2.4.4"
    war
    id("org.gretty") version "4.0.3"
    kotlin("jvm") version "1.6.21"
    kotlin("plugin.spring") version "1.6.21"
}

group = "com"
version = "0.0.1-SNAPSHOT"
java.sourceCompatibility = JavaVersion.VERSION_1_8

repositories {
    mavenCentral()
}

extra["springCloudGcpVersion"] = "3.3.0"
extra["springCloudVersion"] = "2021.0.4"

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
    implementation("com.google.cloud:spring-cloud-gcp-starter")
    implementation("org.jetbrains.kotlin:kotlin-reflect")
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
    implementation("org.postgresql:postgresql")
    implementation("com.google.cloud.sql:postgres-socket-factory")
    implementation("javax.persistence:javax.persistence-api")
    implementation("com.zaxxer:HikariCP:5.0.1")
    implementation("org.springframework.data:spring-data-jpa")
    developmentOnly("org.springframework.boot:spring-boot-devtools")
    providedRuntime("org.springframework.boot:spring-boot-starter-tomcat")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    providedCompile("javax.servlet:javax.servlet-api:4.0.1")
    providedCompile("com.google.appengine:appengine:1.9.98")
}

dependencyManagement {
    imports {
        mavenBom("com.google.cloud:spring-cloud-gcp-dependencies:${property("springCloudGcpVersion")}")
        mavenBom("org.springframework.cloud:spring-cloud-dependencies:${property("springCloudVersion")}")
    }
}

tasks.withType<KotlinCompile> {
    kotlinOptions {
        freeCompilerArgs = listOf("-Xjsr305=strict")
        jvmTarget = "1.8"
    }
}

tasks.withType<Test> {
    useJUnitPlatform()
}

appengine {
    deploy {
        projectId = "GCLOUD_CONFIG"
        version = "GCLOUD_CONFIG"
        stopPreviousVersion = true
        promote = true
    }
}
