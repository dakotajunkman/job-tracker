package com.jobtracker.api.controllers

import com.jobtracker.api.business.Converter
import com.jobtracker.api.business.Helpers
import com.jobtracker.api.controllers.models.ApplicationModel
import com.jobtracker.api.controllers.models.ErrorModel
import com.jobtracker.api.controllers.models.MultipleApplicationModel
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

        val contactObjs = converter.convertContactList(Helpers.convertStringArrToUUID(application.contacts))

        val saved = applicationRepository.save(application.toApplicationEntity(companyObj, user, contactObjs))

        if (application.skills.isNotEmpty())
            converter.createOrUpdateSkills(application.skills, user)

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

        return ResponseEntity.status(HttpStatus.OK).body(MultipleApplicationModel(retrievedAll))
    }

    @DeleteMapping("/applications/{appId}")
    fun deleteApplication(
        @PathVariable appId: String,
        @RequestHeader("Authorization") token: String
    ): ResponseEntity<Any> {
        val userId = Helpers.getUserIDByJWT(token, jwtDecoder, userRepository)
        val app = applicationRepository.findByIdOrNull(UUID.fromString(appId))
            ?: return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ErrorModel(404, "Application does not exist"))

        if (app.user.id != userId)
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(ErrorModel(403, "User cannot access this resource"))

        if (!app.skills.isNullOrEmpty())
            converter.deleteOrUpdateSkills(app.skills!!, app.user)

        applicationRepository.deleteById(app.id)
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null)
    }

    @PutMapping("/applications/{appId}")
    fun editApplication(
        @PathVariable appId: String,

        @RequestBody application: ApplicationModel,
        @RequestHeader("Authorization") token: String):ResponseEntity<Any> {

        val user = Helpers.getUserByJWT(token, jwtDecoder, userRepository)
            ?: return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ErrorModel(404, "User with ID does not exist"))

        val retrieved = applicationRepository.findByIdOrNull(UUID.fromString(appId))
            ?: return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ErrorModel(404, "Application with ID does not exist"))

        if (retrieved.user.id != user.id){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(ErrorModel(403, "Application is forbidden"))
        }

        val companyObj = converter.convertCompany(UUID.fromString(application.companyID))
            ?: return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ErrorModel(400, "Company ID not found"))

        val contactObjs = converter.convertContactList(Helpers.convertStringArrToUUID(application.contacts))

        // handle the skillz
        if (!retrieved.skills.isNullOrEmpty())
            converter.deleteOrUpdateSkills(retrieved.skills!!, user)

        // handle the other skillz
        if (application.skills.isNotEmpty())
            converter.createOrUpdateSkills(application.skills, user)

        val saved = applicationRepository.save(application.toUpdateApplicationEntity(companyObj, user, contactObjs, UUID.fromString(appId)))
        return ResponseEntity.status(HttpStatus.CREATED).body(saved)
    }
}