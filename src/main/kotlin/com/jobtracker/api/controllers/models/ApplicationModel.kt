package com.jobtracker.api.controllers.models

import com.jobtracker.api.repository.entities.ApplicationEntity
import com.jobtracker.api.repository.entities.CompanyEntity
import com.jobtracker.api.repository.entities.UserEntity
import StatusConverter
import com.jobtracker.api.business.Helpers
import com.jobtracker.api.repository.entities.ContactEntity
import java.util.UUID

class ApplicationModel(
    var companyID: String,
    val positionTitle: String,
    val submitDate: String,
    val status: String,
    val skills: MutableList<String>,
    val notes: String?,
    var applicationID: UUID = UUID.randomUUID()
){

    fun toApplicationEntity(companyEntity: CompanyEntity, userEntity: UserEntity, contactEntities: MutableList<ContactEntity>)
    = ApplicationEntity(applicationID, positionTitle, Helpers.tryConvertStringToDate(submitDate), StatusConverter.tryConvertStatus(status),
        skills, notes, userEntity, companyEntity, contactEntities)
    fun toUpdateApplicationEntity(companyEntity: CompanyEntity, userEntity: UserEntity, contactEntities: MutableList<ContactEntity>, existingId: UUID)
            = ApplicationEntity(existingId, positionTitle, Helpers.tryConvertStringToDate(submitDate), StatusConverter.tryConvertStatus(status),
        skills, notes, userEntity, companyEntity, contactEntities)
}

data class MultipleApplicationModel(val applications: MutableList<ApplicationModel>)