package com.jobtracker.api.controllers

import com.jobtracker.api.business.Converter
import com.jobtracker.api.controllers.models.ContactModel
import com.jobtracker.api.controllers.models.ErrorModel
import com.jobtracker.api.repository.ContactRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.repository.findByIdOrNull
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.oauth2.jwt.JwtDecoder
import org.springframework.web.bind.annotation.*
import java.util.*

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
    fun createContact(
        @RequestBody contact: ContactModel,
        @RequestHeader("Authorization") token: String):ResponseEntity<Any> {

        val companyObj = converter.convertCompany(contact.companyId)
            ?: return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ErrorModel(400, "Company ID not found"))

        val applicationObjs = converter.convertApplicationList(contact.applications)

        val saved = contactRepository.save(contact.toContactEntity(companyObj, applicationObjs))
        return ResponseEntity.status(HttpStatus.CREATED).body(saved)
    }

    @GetMapping("/contacts/{contactID}")
    fun getContact(
        @PathVariable contactID: String,
        @RequestHeader("Authorization") token: String):ResponseEntity<Any> {

        val retrieved = contactRepository.findByIdOrNull(UUID.fromString(contactID))
            ?: return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ErrorModel(404, "Contact with ID does not exist"))

        return ResponseEntity.status(HttpStatus.OK).body(retrieved)
    }

}