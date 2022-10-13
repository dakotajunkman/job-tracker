package com.jobtracker

import com.jobtracker.api.repository.CompanyRepository
import com.jobtracker.api.repository.UserRepository
import com.jobtracker.api.repository.entities.CompanyEntity
import com.jobtracker.api.repository.entities.UserEntity
import org.springframework.boot.CommandLineRunner
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.ComponentScan
import java.util.*


/**
 * Anything in this class will be called at start up
 * Any packages defined outside com.jobtracker need to be added to @ComponentScan to be found
 */
@SpringBootApplication
@ComponentScan("db", "com.jobtracker.api.controllers", "com.jobtracker.api.repository")
class JobtrackerApplication {

    /**
     * TEST CODE for REPO CLASSES
     * Un-comment and pass the repo you'd like to test into the function
     * Call whichever repo class method you'd like for testing

    @Bean
    fun init(coRepo: CompanyRepository, uRepo: UserRepository) = CommandLineRunner {
        coRepo.save(
            CompanyEntity(
                UUID.randomUUID(),
                "Test Company 2"
            )
        )

        uRepo.save(
            UserEntity(
                UUID.randomUUID(),
                "Djangus",
                "Roundstone",
                "groundAndROUND@test.com"
            )
        )
    }
    */
}

fun main(args: Array<String>) {
    runApplication<JobtrackerApplication>(*args)
}
