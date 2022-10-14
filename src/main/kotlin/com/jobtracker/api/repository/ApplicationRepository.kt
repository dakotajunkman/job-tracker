package com.jobtracker.api.repository

import com.jobtracker.api.repository.entities.ApplicationEntity
import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID

interface ApplicationRepository: JpaRepository<ApplicationEntity, UUID>
