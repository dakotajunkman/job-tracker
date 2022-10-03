package com.jobtracker

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class JobtrackerApplication

fun main(args: Array<String>) {
    runApplication<JobtrackerApplication>(*args)
}
