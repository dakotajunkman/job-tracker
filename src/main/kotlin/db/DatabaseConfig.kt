package db

import javax.sql.DataSource
import com.zaxxer.hikari.HikariConfig
import com.zaxxer.hikari.HikariDataSource
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Configuration
import javax.annotation.PostConstruct

/**
 * Initializes connection to database
 * Fills in values from application.properties to initialize the object
 */
@Configuration
class DatabaseConfig(
    @Value("\${spring.cloud.gcp.sql.instance-connection-name}")
    val CON_NAME: String,
    @Value("\${spring.cloud.gcp.sql.database-name}")
    val DB_NAME: String,
    @Value("\${spring.datasource.username}")
    val DB_USER: String,
    @Value("\${spring.datasource.password}")
    val DB_PW: String
) {

    @PostConstruct
    fun getDatabaseConfig(): DataSource {
        val config = HikariConfig()
        config.jdbcUrl = String.format("jdbc:postgresql:///%s", DB_NAME)
        config.username = DB_USER
        config.password = DB_PW
        config.addDataSourceProperty("socketFactory", "com.google.cloud.sql.postgres.SocketFactory")
        config.addDataSourceProperty("cloudSqlInstance", CON_NAME)
        config.driverClassName = "org.postgresql.Driver"
        return HikariDataSource(config)
    }
}