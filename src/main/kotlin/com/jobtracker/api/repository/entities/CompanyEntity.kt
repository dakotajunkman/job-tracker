package com.jobtracker.api.repository.entities

import java.util.*
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.Table
import DEFAULT_FIELD_LENGTH
import javax.persistence.UniqueConstraint

@Entity
@Table(name = "companies", uniqueConstraints = [
    UniqueConstraint(columnNames = ["name", "associated_user_id"])
])
data class CompanyEntity(
    @Id
    @Column(name = "id", nullable = false, updatable = false)
    val id: UUID,

    @Column(name = "name", nullable = false, unique = true, length = DEFAULT_FIELD_LENGTH)
    val name: String,

    @Column(name = "associated_user_id", nullable = false)
    val associated_user_id: UUID
) {
    override fun toString() = "Company with id: $id, name: $name, associated user ID: $associated_user_id"
}
