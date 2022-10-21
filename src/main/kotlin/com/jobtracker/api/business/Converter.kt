package com.jobtracker.api.business

import com.jobtracker.api.repository.ApplicationRepository
import com.jobtracker.api.repository.CompanyRepository
import com.jobtracker.api.repository.entities.ApplicationEntity
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Component
import java.util.*

@Component
class Converter(
    @Autowired
    val companyRepository: CompanyRepository,
    @Autowired
    val applicationRepository: ApplicationRepository
) {

    fun convertCompany(companyID: UUID) = companyRepository.findByIdOrNull(companyID)

    // ------ MultiConversions ------

    fun convertApplication(applicationIDs: MutableList<UUID>): MutableList<ApplicationEntity> =
        applicationRepository.findAllById(applicationIDs)


}