package com.jobtracker.api.controllers

import com.jobtracker.api.business.Converter
import com.jobtracker.api.business.Helpers
import com.jobtracker.api.controllers.models.ApplicationModel
import com.jobtracker.api.controllers.models.ErrorModel
import com.jobtracker.api.repository.ApplicationRepository
import com.jobtracker.api.repository.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.repository.findByIdOrNull
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.oauth2.jwt.JwtDecoder
import org.springframework.web.bind.annotation.*
import java.util.*

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
    fun createApplication(
        @RequestBody application: ApplicationModel,
        @RequestHeader("Authorization") token: String):ResponseEntity<Any> {

        val companyObj = converter.convertCompany(UUID.fromString(application.companyID))
            ?: return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ErrorModel(400, "Company ID not found"))

        val user = Helpers.getUserByJWT(token, jwtDecoder, userRepository)
            ?: return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ErrorModel(404, "Company with ID does not exist"))

        val saved = applicationRepository.save(application.toApplicationEntity(companyObj, user, mutableListOf()))
        return ResponseEntity.status(HttpStatus.CREATED).body(saved)
    }

    @GetMapping("/applications/{applicationID}")
    fun getApplication(
        @PathVariable applicationID: String,
        @RequestHeader("Authorization") token: String):ResponseEntity<Any> {

        val userID = Helpers.getUserIDByJWT(token, jwtDecoder, userRepository)

        val retrieved = applicationRepository.findByIdOrNull(UUID.fromString(applicationID))
            ?: return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ErrorModel(404, "Application with ID does not exist"))

        if (retrieved.user.id != userID){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(ErrorModel(403, "Application is forbidden"))
        }

        return ResponseEntity.status(HttpStatus.OK).body(retrieved)
    }

    @GetMapping("/applications")
    fun getAllContacts(
        @RequestHeader("Authorization") token: String):ResponseEntity<Any> {

        val userID = Helpers.getUserIDByJWT(token, jwtDecoder, userRepository)

        val retrievedAll = applicationRepository.findAll().filter {
            it.user.id == userID
        }

        return ResponseEntity.status(HttpStatus.OK).body(retrievedAll)
    }

    @DeleteMapping("/applications/{appId}")
    fun deleteApplication(
        @PathVariable appId: String,
        @RequestHeader("Authorization") token: String
    ): ResponseEntity<Any> {
        // This method returns nothing but it probably doesn't matter whether it was successful or not
        applicationRepository.deleteById(UUID.fromString(appId))
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null)
    }
}