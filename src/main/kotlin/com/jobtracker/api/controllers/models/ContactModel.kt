package com.jobtracker.api.controllers.models

import com.jobtracker.api.repository.entities.ApplicationEntity
import com.jobtracker.api.repository.entities.ContactEntity
import com.jobtracker.api.repository.entities.CompanyEntity
import org.apache.commons.lang3.mutable.Mutable
import java.util.UUID

data class ContactModel(
  var contactId: UUID = UUID.randomUUID(),
  var companyObject: CompanyEntity,
  val fullName: String,
  val positionTitle: String,
  val emailAddress: String,
  val phoneNumber: String,
  val notes: String,
  val applications: MutableList<ApplicationEntity>
  ) {

  fun toContactEntity() = ContactEntity(contactId, companyObject, fullName,
      positionTitle, emailAddress, phoneNumber, notes, applications)
}

data class MultipleContactModel(val contacts: MutableList<ContactModel>)
