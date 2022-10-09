package com.jobtracker

import db.DatabaseConfig
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean
import javax.sql.DataSource

/**
 * Anything in this class will be called at start up
 * @Bean annotation creates a singleton
 */
@SpringBootApplication
class JobtrackerApplication {
    @Bean(name = ["db"])
    fun createDb(): DataSource {
        return DatabaseConfig().createConnectionPool()
    }

    companion object {
        @JvmStatic
        fun main(args: Array<String>) {
            runApplication<JobtrackerApplication>(*args)
        }
    }
}
