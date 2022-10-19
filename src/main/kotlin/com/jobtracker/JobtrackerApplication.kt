package com.jobtracker

import java.util.*
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.ComponentScan

/**
 * Anything in this class will be called at start up Any packages defined outside com.jobtracker
 * need to be added to @ComponentScan to be found
 */
@SpringBootApplication
@ComponentScan(
    "db",
    "com.jobtracker.api.controllers",
    "com.jobtracker.api.repository",
    "com.jobtracker.api.security",
    "com.jobtracker.api.controllers.models")
class JobtrackerApplication {

  /**
   * TEST CODE for REPO CLASSES Un-comment and pass the repo you'd like to test into the function
   * Call whichever repo class method you'd like for testing
   *
   * @Bean fun init(appRepo: ApplicationRepository, userRepository: UserRepository,
   * contactRepository: ContactRepository, companyRepository: CompanyRepository) = CommandLineRunner
   * { val user = appRepo.findAll().first() println(user) }
   */
}

fun main(args: Array<String>) {
  runApplication<JobtrackerApplication>(*args)
}
