package com.jobtracker.api.controllers

import com.jobtracker.api.controllers.models.ContactModel
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
    val jwtDecoder: JwtDecoder
) {
    @PostMapping("/contacts")
    fun createContacts(
        @RequestBody contact: ContactModel,
        @RequestHeader("Authorization") token: String):ResponseEntity<Any> {

        val saved = contactRepository.save(contact.toContactEntity())
        return ResponseEntity.status(HttpStatus.CREATED).body(saved)
    }
}