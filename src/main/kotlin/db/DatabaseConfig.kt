package db

import org.springframework.context.annotation.Configuration
import javax.sql.DataSource
import com.zaxxer.hikari.HikariConfig
import com.zaxxer.hikari.HikariDataSource
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Scope
import javax.swing.SwingContainer

@Configuration
@Scope("singleton")
class DatabaseConfig {
    val CON_NAME = System.getenv("DB_CON")
    val DB_USER = System.getenv("DB_USER")
    val DB_PW = System.getenv("DB_PW")
    val DB_NAME =System.getenv("DB_NAME")

    fun createConnectionPool(): DataSource {
        val config = HikariConfig()
        config.jdbcUrl = String.format("jdbc:postgresql://%s", DB_NAME)
        config.username = DB_USER
        config.password = DB_PW
        println(CON_NAME)
        println(DB_USER)
        println(DB_PW)
        println(DB_NAME)

        config.addDataSourceProperty("socketFactory", "com.google.cloud.sql.postgres.SocketFactory")
        config.addDataSourceProperty("cloudSqlInstance", CON_NAME)
        return HikariDataSource(config)
    }
}