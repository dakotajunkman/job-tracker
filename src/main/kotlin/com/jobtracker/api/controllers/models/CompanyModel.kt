package com.jobtracker.api.controllers.models

import com.jobtracker.api.repository.entities.CompanyEntity
import java.util.UUID

data class CompanyModel(val name: String, var companyId: UUID = UUID.randomUUID()) {
  fun toCompanyEntity() = CompanyEntity(companyId, name, mutableListOf(), mutableListOf())
}

data class MultipleCompanyModel(val companies: MutableList<CompanyModel>)
