package com.jobtracker.api.repository

import com.jobtracker.api.repository.entities.UserEntity
import com.jobtracker.api.repository.entities.UserSkillFrequencyEntity
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import java.util.UUID

interface UserSkillFrequencyRepository: JpaRepository<UserSkillFrequencyEntity, UUID> {
    @Query("SELECT * FROM user_skill_frequencies WHERE user_id = ?1", nativeQuery = true)
    fun findByUser(userId: UUID): List<UserSkillFrequencyEntity>

    @Query("DELETE FROM user_skill_frequencies WHERE id = ?1", nativeQuery = true)
    @Modifying
    override fun deleteById(id: UUID)
}
