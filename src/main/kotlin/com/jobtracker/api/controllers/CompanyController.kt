package com.jobtracker.api.controllers

import com.jobtracker.api.controllers.models.CompanyModel
import com.jobtracker.api.controllers.models.ErrorModel
import com.jobtracker.api.repository.CompanyRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.repository.findByIdOrNull
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.oauth2.jwt.JwtDecoder
import org.springframework.web.bind.annotation.*
import java.util.*

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

    @GetMapping("/companies/{companyID}")
    fun getCompany(
        @PathVariable companyID: String,
        @RequestHeader("Authorization") token: String):ResponseEntity<Any> {

        val retrieved = companyRepository.findByIdOrNull(UUID.fromString(companyID))
            ?: return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ErrorModel(404, "Company with ID does not exist"))

        return ResponseEntity.status(HttpStatus.OK).body(retrieved)
    }

    @DeleteMapping("/companies/{companyId}")
    fun deleteCompany(
        @PathVariable companyId: String,
        @RequestHeader("Authorization") token: String
    ): ResponseEntity<Any> {
        companyRepository.deleteById(UUID.fromString(companyId))
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null)
    }
}