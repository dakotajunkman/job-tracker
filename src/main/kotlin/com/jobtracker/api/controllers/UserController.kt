package com.jobtracker.api.controllers

import com.jobtracker.api.controllers.models.ErrorModel
import com.jobtracker.api.controllers.models.UserModel
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
class UserController(
    @Autowired
    val userRepository: UserRepository,
    @Autowired
    val jwtDecoder: JwtDecoder
) {
    @PostMapping("/users")
    fun createUser(
        @RequestBody user: UserModel,
        @RequestHeader("Authorization") token: String):ResponseEntity<Any> {
        /*
         * val decoded = jwtDecoder.decode(token.substring(7))
         * gets the decoded JWT token
         * we can use this to pull off the user's name if needed
         */
        val saved = userRepository.save(user.toUserEntity())
        return ResponseEntity.status(HttpStatus.CREATED).body(saved)
    }

    @GetMapping("/users/{userEmail}")
    fun getUser(
        @PathVariable userEmail: String,
        @RequestHeader("Authorization") token: String):ResponseEntity<Any> {

        val retrieved = userRepository.findByEmail(userEmail)
            ?: return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ErrorModel(404, "User with email does not exist"))

        return ResponseEntity.status(HttpStatus.OK).body(retrieved)
    }

    @DeleteMapping("/users/{userId}")
    fun deleteUser(
        @PathVariable userId: String,
        @RequestHeader("Authorization") token: String
    ): ResponseEntity<Any> {
        userRepository.deleteById(UUID.fromString(userId))
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null)
    }
}