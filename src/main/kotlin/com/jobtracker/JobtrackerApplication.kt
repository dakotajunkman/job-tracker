package com.jobtracker

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.ComponentScan


/**
 * Anything in this class will be called at start up
 * Any packages defined outside com.jobtracker need to be added to @ComponentScan to be found
 */
@SpringBootApplication
@ComponentScan("db", "com.jobtracker.api.controllers")
class JobtrackerApplication

fun main(args: Array<String>) {
    runApplication<JobtrackerApplication>(*args)
}
