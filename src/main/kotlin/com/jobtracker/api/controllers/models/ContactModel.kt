package com.jobtracker.api.controllers.models

import com.jobtracker.api.repository.entities.ApplicationEntity
import com.jobtracker.api.repository.entities.ContactEntity
import com.jobtracker.api.business.Converter
import com.jobtracker.api.repository.entities.CompanyEntity
import org.apache.commons.lang3.mutable.Mutable
import org.springframework.beans.factory.annotation.Autowired
import java.util.UUID

data class ContactModel(
  var companyId: UUID,
  val fullName: String,
  val positionTitle: String,
  val emailAddress: String,
  val phoneNumber: String,
  val notes: String,
  val applications: MutableList<UUID>,
  var contactId: UUID = UUID.randomUUID()
  ) {

  fun toContactEntity(companyEntity: CompanyEntity, applicationEntities: MutableList<ApplicationEntity>)
  = ContactEntity(contactId,companyEntity, fullName, positionTitle, emailAddress, phoneNumber, notes, applicationEntities)
}

data class MultipleContactModel(val contacts: MutableList<ContactModel>)
