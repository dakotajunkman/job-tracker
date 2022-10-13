package com.jobtracker.api.repository

import com.jobtracker.api.repository.entities.CompanyEntity
import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID

interface CompanyRepository: JpaRepository<CompanyEntity, UUID>
