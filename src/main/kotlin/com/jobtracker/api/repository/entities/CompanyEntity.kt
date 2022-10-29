package com.jobtracker.api.repository.entities

import java.util.*
import DEFAULT_FIELD_LENGTH
import com.fasterxml.jackson.annotation.JsonIgnore
import org.hibernate.annotations.OnDelete
import org.hibernate.annotations.OnDeleteAction
import javax.persistence.*

@Entity
@Table(name = "companies")
data class CompanyEntity(
    @Id
    @Column(name = "id", nullable = false, updatable = false)
    val id: UUID,

    @Column(name = "name", nullable = false, unique = true, length = DEFAULT_FIELD_LENGTH)
    val name: String,

    @JsonIgnore
    @OneToMany(cascade = [CascadeType.ALL], orphanRemoval = true, mappedBy = "company")
    val applications: MutableList<ApplicationEntity>,

    @JsonIgnore
    @OneToMany(cascade = [CascadeType.ALL], orphanRemoval = true, mappedBy = "company")
    val contacts: MutableList<ContactEntity>
) {
    override fun toString() = "Company with id: $id, name: $name"
}
