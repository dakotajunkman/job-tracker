package com.jobtracker.api.controllers.models

import com.jobtracker.api.repository.entities.CompanyEntity
import java.util.UUID

data class CompanyModel(val name: String, var companyId: UUID? = null) {
  init {
    if (companyId == null) companyId = UUID.randomUUID()
  }
  fun toCompanyEntity() = CompanyEntity(companyId!!, name)
}

data class MultipleCompanyModel(val companies: MutableList<CompanyModel>)
