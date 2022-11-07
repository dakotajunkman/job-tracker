package com.jobtracker.api.repository.entities


import DEFAULT_FIELD_LENGTH
import DEFAULT_NOTES_LENGTH
import ApplicationStatus
import com.fasterxml.jackson.annotation.JsonIgnore
import java.time.LocalDate
import java.util.UUID
import javax.persistence.*

@Entity
@Table(name = "applications")
data class ApplicationEntity(
    @Id
    @Column(name = "id", nullable = false)
    val id: UUID,
    @Column(name = "position_title", nullable = false, length = DEFAULT_FIELD_LENGTH) val positionTitle: String,
    @Column(name = "submit_date", nullable = false)
    val submitDate: LocalDate,
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false) val status: ApplicationStatus,
    @ElementCollection
    @Column(name = "skills", length = DEFAULT_FIELD_LENGTH)
    val skills: List<String>?,
    @Column(name = "notes", length = DEFAULT_NOTES_LENGTH) var notes: String?,

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false, updatable = false)
    val user: UserEntity,

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "company_id", referencedColumnName = "id", nullable = false, updatable = false)
    val company: CompanyEntity,

    @JsonIgnore
    @ManyToMany(fetch = FetchType.EAGER, cascade = [CascadeType.ALL])
    @JoinTable(
        name = "application_contacts",
        joinColumns = [JoinColumn(name = "application_id")],
        inverseJoinColumns = [JoinColumn(name = "contact_id")]
    )
    val contacts: MutableList<ContactEntity>
) {
  override fun toString() =
      "Application type with id: $id, positionTitle: $positionTitle, submitDate: $submitDate, status: $status, skills: $skills, notes: $notes"
}
