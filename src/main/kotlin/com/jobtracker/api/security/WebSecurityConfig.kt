package com.jobtracker.api.security

import com.jobtracker.api.controllers.JwtAuthEntryPoint
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.oauth2.core.DelegatingOAuth2TokenValidator
import org.springframework.security.oauth2.core.OAuth2TokenValidator
import org.springframework.security.oauth2.jwt.*

@Configuration
@EnableWebSecurity
class WebSecurityConfig : WebSecurityConfigurerAdapter() {

  @Value("\${spring.security.oauth2.resourceserver.jwt.issuer-uri}") val issuer = ""
  val issuer2 = "accounts.google.com"

  @Autowired val jwtAuthEntryPoint: JwtAuthEntryPoint? = null

  /**
   * Creates a JWT decoder that validates the token based on issuer issuer must be
   * https://acccounts.google.com
   */
  @Bean
  fun jwtDecoder(): JwtDecoder {
    val jwtDecoder = JwtDecoders.fromIssuerLocation(issuer) as NimbusJwtDecoder
    val withIssuer = JwtValidators.createDefaultWithIssuer("https://accounts.google.com")
    val withAudience: OAuth2TokenValidator<Jwt> = DelegatingOAuth2TokenValidator(withIssuer)
    jwtDecoder.setJwtValidator(withAudience)
    return jwtDecoder
  }

  /**
   * Dictates which endpoints need authentication and which do not As of now, /api/ping is exposed
   * to public for Postman testing All other endpoints require JWT
   */
  @Throws(Exception::class)
  override fun configure(http: HttpSecurity) {
    http
        .authorizeRequests()
        .mvcMatchers("/api/ping")
        .permitAll()
        .anyRequest()
        .authenticated()
        .and()
        .exceptionHandling()
        .authenticationEntryPoint(jwtAuthEntryPoint)
        .and()
        .oauth2ResourceServer()
        .jwt()
  }
}
