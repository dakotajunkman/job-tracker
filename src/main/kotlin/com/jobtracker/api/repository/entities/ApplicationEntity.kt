package com.jobtracker.api.repository.entities


import DEFAULT_FIELD_LENGTH
import DEFAULT_NOTES_LENGTH
import ApplicationStatus
import java.util.Date
import java.util.UUID
import javax.persistence.*

@Entity
@Table(name = "applications")
data class ApplicationEntity(
    @Id
    @Column(name = "id", nullable = false)
    val id: UUID,
    @Column(name = "position_title", nullable = false, length = DEFAULT_FIELD_LENGTH) val positionTitle: String,
    @Temporal(TemporalType.DATE)
    @Column(name = "submit_date", nullable = false)
    val submitDate: Date,
    @Enumerated
    @Column(name = "status", nullable = false) val status: ApplicationStatus,
    @Column(name = "skills", length = DEFAULT_FIELD_LENGTH) var skills: String?,
    @Column(name = "notes", length = DEFAULT_NOTES_LENGTH) var notes: String?,

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    val user: UserEntity,
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "company_id", referencedColumnName = "id")
    val company: CompanyEntity,

    @ManyToMany
    @JoinTable(
        name = "application_contacts",
        joinColumns = [JoinColumn(name = "application_id")]
    )
    val contacts: MutableList<ContactEntity>
) {
  override fun toString() =
      "Application type with id: $id, positionTitle: $positionTitle, submitDate: $submitDate, status: $status, skills: $skills, notes: $notes"
}
