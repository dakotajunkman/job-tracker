package com.jobtracker.api.repository

import com.jobtracker.api.repository.entities.UserSkillFrequencyEntity
import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID

interface UserSkillFrequencyRepository: JpaRepository<UserSkillFrequencyEntity, UUID>
