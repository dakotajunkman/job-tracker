package com.jobtracker.api.security

import org.springframework.security.oauth2.core.OAuth2Error
import org.springframework.security.oauth2.core.OAuth2TokenValidator
import org.springframework.security.oauth2.core.OAuth2TokenValidatorResult
import org.springframework.security.oauth2.jwt.Jwt

/**
 * Validates JWT against issuer
 */
class IssuerValidator(private val issuer: String, private val issuer2: String) : OAuth2TokenValidator<Jwt> {
    override fun validate(token: Jwt): OAuth2TokenValidatorResult {
        val error = OAuth2Error("invalid_token", "Token issuer is invalid", null)
        return if (token.issuer.toString() == issuer
            || token.issuer.toString() == issuer2)
            OAuth2TokenValidatorResult.success()
        else
            OAuth2TokenValidatorResult.failure(error)
    }
}
