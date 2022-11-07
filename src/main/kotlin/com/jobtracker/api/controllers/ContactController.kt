package com.jobtracker.api.controllers

import com.jobtracker.api.business.Converter
import com.jobtracker.api.business.Helpers
import com.jobtracker.api.controllers.models.ContactModel
import com.jobtracker.api.controllers.models.ErrorModel
import com.jobtracker.api.controllers.models.MultipleContactModel
import com.jobtracker.api.repository.ContactRepository
import com.jobtracker.api.repository.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.repository.findByIdOrNull
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.oauth2.jwt.JwtDecoder
import org.springframework.web.bind.annotation.*
import java.util.*
import javax.persistence.Entity

@RestController
@RequestMapping("/api")
class ContactController(
    @Autowired
    val contactRepository: ContactRepository,
    @Autowired
    val userRepository: UserRepository,
    @Autowired
    val jwtDecoder: JwtDecoder,
    @Autowired
    val converter: Converter
) {
    @PostMapping("/contacts")
    fun createContact(
        @RequestBody contact: ContactModel,
        @RequestHeader("Authorization") token: String):ResponseEntity<Any> {

        val user = converter.convertUser(UUID.fromString(contact.userId))
            ?: return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ErrorModel(400, "Invalid user ID"))

        val companyObj = converter.convertCompany(UUID.fromString(contact.companyId))
            ?: return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ErrorModel(400, "Company ID not found"))

        val applicationObjs = converter.convertApplicationList(Helpers.convertStringArrToUUID(contact.applications))

        val saved = contactRepository.save(contact.toContactEntity(companyObj, applicationObjs, user))
        return ResponseEntity.status(HttpStatus.CREATED).body(saved)
    }

    @GetMapping("/contacts/{contactID}")
    fun getContact(
        @PathVariable contactID: String,
        @RequestHeader("Authorization") token: String):ResponseEntity<Any> {

        val userID = Helpers.getUserIDByJWT(token, jwtDecoder, userRepository)

        val retrieved = contactRepository.findByIdOrNull(UUID.fromString(contactID))
            ?: return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ErrorModel(404, "Contact with ID does not exist"))

        if (retrieved.user.id != userID){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(ErrorModel(403, "Contact is forbidden"))
        }

        return ResponseEntity.status(HttpStatus.OK).body(retrieved)
    }

    @GetMapping("/contacts")
    fun getAllContacts(
        @RequestHeader("Authorization") token: String):ResponseEntity<Any> {

        val userID = Helpers.getUserIDByJWT(token, jwtDecoder, userRepository)

        val retrievedAll = contactRepository.findAll().filter {
            it.user.id == userID
        }

        return ResponseEntity.status(HttpStatus.OK).body(MultipleContactModel(retrievedAll))
    }

    @DeleteMapping("/contacts/{contactId}")
    fun deleteContact(
        @PathVariable contactId: String,
        @RequestHeader("Authorization") token: String
    ): ResponseEntity<Any> {
        contactRepository.deleteById(UUID.fromString(contactId))
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null)
    }
}