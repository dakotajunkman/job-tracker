package com.jobtracker.api.controllers.models

import com.jobtracker.api.repository.entities.UserEntity
import com.jobtracker.api.repository.entities.UserSkillFrequencyEntity
import java.util.UUID

class UserSkillFrequencyModel(
    val userId: String,
    val skillName: String,
    val id: UUID = UUID.randomUUID()
) {
    fun toUserSkillFrequencyEntity(user: UserEntity, freq: Int) =
        UserSkillFrequencyEntity(id, skillName.lowercase(), freq, user)
}