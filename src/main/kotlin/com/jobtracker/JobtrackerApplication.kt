package com.jobtracker

import com.jobtracker.api.repository.ApplicationRepository
import com.jobtracker.api.repository.CompanyRepository
import com.jobtracker.api.repository.ContactRepository
import com.jobtracker.api.repository.UserRepository
import com.jobtracker.api.repository.entities.ApplicationEntity
import com.jobtracker.api.repository.entities.CompanyEntity
import com.jobtracker.api.repository.entities.ContactEntity
import com.jobtracker.api.repository.entities.UserEntity
import org.springframework.boot.CommandLineRunner
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.ComponentScan
import org.springframework.security.oauth2.jwt.JwtDecoder
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder
import java.util.*


/**
 * Anything in this class will be called at start up
 * Any packages defined outside com.jobtracker need to be added to @ComponentScan to be found
 */
@SpringBootApplication
@ComponentScan("db", "com.jobtracker.api.controllers", "com.jobtracker.api.repository", "com.jobtracker.api.security")
class JobtrackerApplication {

    /**
     * TEST CODE for REPO CLASSES
     * Un-comment and pass the repo you'd like to test into the function
     * Call whichever repo class method you'd like for testing

    @Bean
    fun init(appRepo: ApplicationRepository, userRepository: UserRepository, contactRepository: ContactRepository, companyRepository: CompanyRepository) = CommandLineRunner {
        val user = appRepo.findAll().first()
        println(user)
    }
    */

    @Bean
    fun jwtDecoder(): JwtDecoder {
        return NimbusJwtDecoder
            .withJwkSetUri("https://www.googleapis.com/oauth2/v3/certs")
            .build()
    }
}

fun main(args: Array<String>) {
    runApplication<JobtrackerApplication>(*args)
}
