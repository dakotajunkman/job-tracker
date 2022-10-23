package com.jobtracker.api.controllers

import com.jobtracker.api.controllers.models.CompanyModel
import com.jobtracker.api.repository.CompanyRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.oauth2.jwt.JwtDecoder
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestHeader
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api")
class CompanyController(
    @Autowired
    val companyRepository: CompanyRepository,
    @Autowired
    val jwtDecoder: JwtDecoder
) {
    @PostMapping("/companies")
    fun createCompany(
        @RequestBody company: CompanyModel,
        @RequestHeader("Authorization") token: String):ResponseEntity<Any> {
        /*
         * val decoded = jwtDecoder.decode(token.substring(7))
         * gets the decoded JWT token
         * we can use this to pull off the user's name if needed
         */
        val saved = companyRepository.save(company.toCompanyEntity())
        return ResponseEntity.status(HttpStatus.CREATED).body(saved)
    }
}