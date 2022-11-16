package com.jobtracker.api.controllers

import com.jobtracker.api.business.Helpers
import com.jobtracker.api.controllers.models.ErrorModel
import com.jobtracker.api.controllers.models.MultipleUserSkillFrequencyModel
import com.jobtracker.api.repository.UserRepository
import com.jobtracker.api.repository.UserSkillFrequencyRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.oauth2.jwt.JwtDecoder
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestHeader
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api")
class UserSkillFrequencyController(
    @Autowired
    val userSkillFrequencyRepository: UserSkillFrequencyRepository,
    @Autowired
    val jwtDecoder: JwtDecoder,
    @Autowired
    val userRepository: UserRepository
) {
    @GetMapping("/skills")
    fun getAllSkills(
        @RequestHeader("Authorization") token: String
    ): ResponseEntity<Any> {
        val userId = Helpers.getUserIDByJWT(token, jwtDecoder, userRepository)
            ?: return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ErrorModel(404, "User not found"))
        val skills = userSkillFrequencyRepository.findByUser(userId).sortedByDescending { it.frequency }

        return ResponseEntity.status(HttpStatus.OK).body(MultipleUserSkillFrequencyModel(skills))
    }
}
