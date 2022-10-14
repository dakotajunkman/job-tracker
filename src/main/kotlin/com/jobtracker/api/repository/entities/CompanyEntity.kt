package com.jobtracker.api.repository.entities

import java.util.*
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.Table
import DEFAULT_FIELD_LENGTH

@Entity
@Table(name = "companies")
data class CompanyEntity(
    @Id
    @Column(name = "id", nullable = false, updatable = false)
    val id: UUID,

    @Column(name = "name", nullable = false, unique = true, length = DEFAULT_FIELD_LENGTH)
    val name: String
) {
    override fun toString() = "Company with id: $id, name: $name"
}