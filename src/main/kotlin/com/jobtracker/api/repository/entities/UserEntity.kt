package com.jobtracker.api.repository.entities

import java.util.UUID
import javax.persistence.*

@Entity
@Table(name = "users")
data class UserEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    val id: UUID,
    @Column(name = "first_name", nullable = false) val firstName: String,
    @Column(name = "last_name", nullable = false) val lastName: String,
    @Column(name = "email_address", nullable = false) val emailAddress: String

    @OneToMany(mappedBy = "user")
    var applications: List<ApplicationEntity>
) {
  override fun toString() =
      "User type with id: $id, firstName: $firstName, lastName: $lastName, email: $emailAddress"
}
