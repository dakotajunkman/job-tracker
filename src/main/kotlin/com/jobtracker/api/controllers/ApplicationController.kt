package com.jobtracker.api.controllers

import com.jobtracker.api.business.Converter
import com.jobtracker.api.controllers.models.ApplicationModel
import com.jobtracker.api.controllers.models.ErrorModel
import com.jobtracker.api.repository.ApplicationRepository
import com.jobtracker.api.repository.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.oauth2.jwt.JwtDecoder
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestHeader
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api")
class ApplicationController(
    @Autowired
    val applicationRepository: ApplicationRepository,
    @Autowired
    val userRepository: UserRepository,
    @Autowired
    val jwtDecoder: JwtDecoder,
    @Autowired
    val converter: Converter
) {
    @PostMapping("/applications")
    fun createContact(
        @RequestBody application: ApplicationModel,
        @RequestHeader("Authorization") token: String):ResponseEntity<Any> {

        val companyObj = converter.convertCompany(application.companyID)
            ?: return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ErrorModel(400, "Company ID not found"))

        val decoded = jwtDecoder.decode(token.substring(7))

         val user = userRepository.findByEmail(decoded.getClaimAsString("email"))

         val saved = applicationRepository.save(application.toApplicationEntity(companyObj, user, mutableListOf()))
         return ResponseEntity.status(HttpStatus.CREATED).body(saved)
    }
}