package com.jobtracker.api.controllers

import com.jobtracker.api.repository.UserSkillFrequencyRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.oauth2.jwt.JwtDecoder
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import com.jobtracker.api.business.Helpers
import com.jobtracker.api.controllers.models.ErrorModel
import com.jobtracker.api.controllers.models.MultipleUserSkillFrequencyModel
import com.jobtracker.api.controllers.models.UserSkillFrequencyModel
import com.jobtracker.api.repository.UserRepository
import com.jobtracker.api.repository.entities.UserSkillFrequencyEntity
import org.springframework.data.repository.findByIdOrNull
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestHeader
import java.util.*

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
    @PostMapping("/skills")
    fun createSkill(
        @RequestBody skill: UserSkillFrequencyModel,
        @RequestHeader("Authorization") token: String
    ): ResponseEntity<Any> {
        val user = Helpers.getUserByJWT(token, jwtDecoder, userRepository)
            ?: return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ErrorModel(404, "User not found"))

        // disallow dupe skill creating for a user
        val fetchSkill = userSkillFrequencyRepository.findBySkillName(skill.skillName.lowercase(), user.id)
        if (fetchSkill != null && fetchSkill.user.id == user.id)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ErrorModel(400, "Skill already exists, please update rather than create"))

        val saved = userSkillFrequencyRepository.save(skill.toUserSkillFrequencyEntity(user, 1))
        return ResponseEntity.status(HttpStatus.CREATED).body(saved)
    }

    @GetMapping("/skills/{skillId}")
    fun getSkill(
        @PathVariable skillId: String,
        @RequestHeader("Authorization") token: String
    ): ResponseEntity<Any> {
        val user = Helpers.getUserByJWT(token, jwtDecoder, userRepository)
            ?: return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ErrorModel(404, "User not found"))

        val skill = userSkillFrequencyRepository.findByIdOrNull(UUID.fromString(skillId))
            ?: return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ErrorModel(404, "Skill not found"))

        if (skill.user.id != user.id)
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(ErrorModel(403, "User cannot access this skill"))

        return ResponseEntity.status(HttpStatus.OK).body(skill)
    }

    @DeleteMapping("/skills/{skillId}")
    fun deleteSkill(
        @PathVariable skillId: String,
        @RequestHeader("Authorization") token: String
    ): ResponseEntity<Any> {
        val user = Helpers.getUserByJWT(token, jwtDecoder, userRepository)
            ?: return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ErrorModel(404, "User not found"))

        val skill = userSkillFrequencyRepository.findByIdOrNull(UUID.fromString(skillId))
            ?: return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ErrorModel(404, "Skill not found"))

        if (skill.user.id != user.id)
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(ErrorModel(403, "User cannot access this skill"))

        userSkillFrequencyRepository.deleteById(skill.id)
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null)
    }

    @GetMapping("/skills")
    fun getAllSkills(
        @RequestHeader("Authorization") token: String
    ): ResponseEntity<Any> {
        val user = Helpers.getUserByJWT(token, jwtDecoder, userRepository)
            ?: return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ErrorModel(404, "User not found"))

        return ResponseEntity.status(HttpStatus.OK)
            .body(MultipleUserSkillFrequencyModel(userSkillFrequencyRepository.findByUser(user.id)))
    }

    @PatchMapping("/skills/{skillId}")
    fun incrementSkill(
        @PathVariable skillId: String,
        @RequestHeader("Authorization") token: String
    ): ResponseEntity<Any> {
        val user = Helpers.getUserByJWT(token, jwtDecoder, userRepository)
            ?: return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ErrorModel(404, "User not found"))

        val skill = userSkillFrequencyRepository.findByIdOrNull(UUID.fromString(skillId))
            ?: return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ErrorModel(404, "Skill not found"))

        if (skill.user.id != user.id)
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(ErrorModel(403, "User cannot access this skill"))

        userSkillFrequencyRepository.save(
            UserSkillFrequencyEntity(
                skill.id,
                skill.skillName,
                skill.frequency + 1,
                user
            )
        )
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null)
    }
}
