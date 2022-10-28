package com.jobtracker.api.repository

import com.jobtracker.api.repository.entities.UserEntity
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import java.util.*

interface UserRepository : JpaRepository<UserEntity, UUID>{
    @Query("SELECT * FROM users WHERE email_address = ?1", nativeQuery = true)
    fun findByEmail(emailAddress: String) : UserEntity?
}
