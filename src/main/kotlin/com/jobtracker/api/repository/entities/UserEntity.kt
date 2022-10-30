package com.jobtracker.api.repository.entities

import java.util.UUID
import javax.persistence.*
import DEFAULT_FIELD_LENGTH

@Entity
@Table(name = "users")
data class UserEntity(
    @Id
    @Column(name = "id", nullable = false, updatable = false)
    val id: UUID,
    @Column(name = "first_name", nullable = false, length = DEFAULT_FIELD_LENGTH) val firstName: String,
    @Column(name = "last_name", nullable = false, length = DEFAULT_FIELD_LENGTH) val lastName: String,

    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER, cascade = [CascadeType.ALL])
    val applications: MutableList<ApplicationEntity>,

    @Column(name = "email_address", nullable = false, unique = true, length = DEFAULT_FIELD_LENGTH)
    val emailAddress: String,

    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER, cascade = [CascadeType.ALL])
    val contacts: MutableList<ContactEntity>
) {
  override fun toString() =
      "User type with id: $id, firstName: $firstName, lastName: $lastName, email: $emailAddress"
}
