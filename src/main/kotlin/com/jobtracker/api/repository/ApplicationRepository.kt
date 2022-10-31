package com.jobtracker.api.repository

import com.jobtracker.api.repository.entities.ApplicationEntity
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import java.util.UUID

interface ApplicationRepository: JpaRepository<ApplicationEntity, UUID> {
    @Query("DELETE from applications where id = ?1", nativeQuery = true)
    @Modifying
    override fun deleteById(id: UUID)
}
