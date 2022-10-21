package com.jobtracker.api.controllers

import com.jobtracker.api.business.Converter
import com.jobtracker.api.controllers.models.ContactModel
import com.jobtracker.api.controllers.models.ErrorModel
import com.jobtracker.api.repository.ContactRepository
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
class ContactController(
    @Autowired
    val contactRepository: ContactRepository,
    @Autowired
    val jwtDecoder: JwtDecoder,
    @Autowired
    val converter: Converter
) {
    @PostMapping("/contacts")
    fun createContacts(
        @RequestBody contact: ContactModel,
        @RequestHeader("Authorization") token: String):ResponseEntity<Any> {

        val companyObj = converter.convertCompany(contact.companyID)
        if (companyObj == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ErrorModel(400, "Company ID not found"))
        }

        val applicationObjs = converter.convertApplication(contact.applications)

        val saved = contactRepository.save(contact.toContactEntity(companyObj, applicationObjs))
        return ResponseEntity.status(HttpStatus.CREATED).body(saved)
    }
}