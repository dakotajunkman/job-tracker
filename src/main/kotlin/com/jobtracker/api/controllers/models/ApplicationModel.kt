package com.jobtracker.api.controllers.models

import com.jobtracker.api.repository.entities.ApplicationEntity
import com.jobtracker.api.repository.entities.CompanyEntity
import com.jobtracker.api.repository.entities.UserEntity
import StatusConverter
import com.jobtracker.api.repository.entities.ContactEntity
import java.util.UUID
import java.util.Date

class ApplicationModel(
    var companyID: UUID,
    val position_title: String,
    val submit_date: Date,
    val status: String,
    val skills: MutableList<String>?,
    val notes: String?,
    var applicationID: UUID = UUID.randomUUID()
){

    fun toApplicationEntity(companyEntity: CompanyEntity, userEntity: UserEntity, contactEntities: MutableList<ContactEntity>)
    = ApplicationEntity(applicationID, position_title, submit_date, StatusConverter.tryConvertStatus(status),
        skills, notes, userEntity, companyEntity, contactEntities)
}

data class MultipleApplicationModel(val applications: MutableList<ApplicationModel>)