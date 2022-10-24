package com.jobtracker.api.security

import com.jobtracker.api.controllers.JwtAuthEntryPoint
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.oauth2.jwt.JwtDecoder
import org.springframework.security.oauth2.jwt.JwtDecoders
import org.springframework.security.oauth2.jwt.JwtValidators
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder

@Configuration
@EnableWebSecurity
class WebSecurityConfig: WebSecurityConfigurerAdapter() {

    @Value("\${spring.security.oauth2.resourceserver.jwt.issuer-uri}")
    val issuer = ""
    val issuer2 = "accounts.google.com"

    @Autowired
    val jwtAuthEntryPoint: JwtAuthEntryPoint? = null

    /**
     * Creates a JWT decoder that validates the token based on issuer
     * issuer must be https://acccounts.google.com
     */
    @Bean
    fun jwtDecoder(): JwtDecoder {
        val jwtDecoder = JwtDecoders.fromOidcIssuerLocation<NimbusJwtDecoder>(issuer)
        val issuerValidtor = IssuerValidator(issuer, issuer2)
        val withIssuer = JwtValidators.createDefaultWithIssuer(issuer)
        jwtDecoder.setJwtValidator(withIssuer)
        return jwtDecoder
    }

    /**
     * Dictates which endpoints need authentication and which do not
     * As of now, /api/ping is exposed to public for Postman testing
     * All other endpoints require JWT
     */
    @Throws(Exception::class)
    override fun configure(http: HttpSecurity) {
        http.authorizeRequests()
            .mvcMatchers("/api/ping").permitAll()
            .anyRequest().authenticated()
            .and()
            .exceptionHandling().authenticationEntryPoint(jwtAuthEntryPoint)
            .and()
            .oauth2ResourceServer().jwt()
    }
}
