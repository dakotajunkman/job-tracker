package com.jobtracker.api.controllers.models

import com.jobtracker.api.repository.entities.ApplicationEntity
import com.jobtracker.api.repository.entities.ContactEntity
import com.jobtracker.api.repository.entities.CompanyEntity
import java.util.UUID

data class ContactModel(
  var companyId: String,
  val fullName: String,
  val positionTitle: String,
  val emailAddress: String,
  val phoneNumber: String?,
  val notes: String?,
  val applications: MutableList<UUID>,
  var contactId: UUID = UUID.randomUUID()
  ) {

  fun toContactEntity(companyEntity: CompanyEntity, applicationEntities: MutableList<ApplicationEntity>)
  = ContactEntity(contactId, companyEntity, fullName, positionTitle, emailAddress, phoneNumber, notes, applicationEntities)
}

data class MultipleContactModel(val contacts: MutableList<ContactModel>)
