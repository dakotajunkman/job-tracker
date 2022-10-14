package com.jobtracker.api.repository

import com.jobtracker.api.repository.entities.ContactEntity
import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID

interface ContactRepository: JpaRepository<ContactEntity, UUID>
