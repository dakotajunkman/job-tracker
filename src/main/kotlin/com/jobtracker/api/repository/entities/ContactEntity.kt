package com.jobtracker.api.repository.entities

import java.util.UUID
import javax.persistence.*

@Entity
@Table(name = "contacts")
data class ContactEntity(
    @Id
    @Column(name = "id", nullable = false)
    val id: UUID,

    @ManyToOne(fetch = FetchType.LAZY)
    // Not sure how to set get this as the company's name rather than ID.
    // Citation: https://www.baeldung.com/jpa-one-to-one section 3.2
    // Ommitted from Company because assuming this is unidrectional relationship
    @JoinColumn(name = "company_name", referencedColumnName = "id") 
    val company: CompanyEntity

    @Column(name = "full_name", nullable = false, length = DEFAULT_FIELD_LENGTH) val fullName: String,
    @Column(name = "position_title", nullable = false, length = DEFAULT_FIELD_LENGTH) val positionTitle: String,
    @Column(name = "email_address", nullable = false, length = DEFAULT_FIELD_LENGTH) val emailAddress: String
    @Column(name = "phone_number", nullable = true, length = DEFAULT_FIELD_LENGTH) val phoneNumber: String?,
    @Column(name = "comments", nullable = true, length = DEFAULT_NOTES_LENGTH) val comments: String?,
) {
  override fun toString() =
      "Contact type with id: $id, fullName: $fullName, positionTitle: $positionTitle, emailAddress: $emailAddress, phoneNumber: $phoneNumber, comments: $comments"
}
