package com.jobtracker.api.repository

import com.jobtracker.api.repository.entities.UserEntity
import com.jobtracker.api.repository.entities.UserSkillFrequencyEntity
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import java.util.UUID

interface UserSkillFrequencyRepository: JpaRepository<UserSkillFrequencyEntity, UUID> {
    @Query("SELECT * FROM user_skill_frequencies WHERE skill_name = ?1 AND user_id = ?2", nativeQuery = true)
    fun findBySkillName(skillName: String, userId: UUID) : UserSkillFrequencyEntity?

    @Query("SELECT * FROM user_skill_frequencies WHERE user_id = ?1", nativeQuery = true)
    fun findByUser(userId: UUID): List<UserSkillFrequencyEntity>?
}
