package com.jobtracker.api.repository.entities

import java.util.UUID
import javax.persistence.*

@Entity
@Table(name = "applications")
data class ApplicationEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    val id: UUID,
    @Column(name = "position_title", nullable = false) val positionTitle: String,
    @Temporal(TemporalType.DATE)
    @Column(name = "submit_date", nullable = false)
    val submitDate: Date,
    @Enumerated
    @Column(name = "status", nullable = false) val status: Status
    @Column(name = "skills", nullable = true) var skills: String?,
    @Column(name = "notes", nullable = true) var notes: String?,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user", referencedColumnName = "id")
    var user: UserEntity
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company", referencedColumnName = "id")
    var company: CompanyEntity
) {
  override fun toString() =
      "Application type with id: $id, positionTitle: $positionTitle, submitDate: $submitDate, status: $status, skills: $skills, notes: $notes"
}
