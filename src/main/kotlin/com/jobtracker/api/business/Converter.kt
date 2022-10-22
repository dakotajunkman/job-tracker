package com.jobtracker.api.business

import com.jobtracker.api.repository.ApplicationRepository
import com.jobtracker.api.repository.CompanyRepository
import com.jobtracker.api.repository.ContactRepository
import com.jobtracker.api.repository.UserRepository
import com.jobtracker.api.repository.entities.ApplicationEntity
import com.jobtracker.api.repository.entities.CompanyEntity
import com.jobtracker.api.repository.entities.ContactEntity
import com.jobtracker.api.repository.entities.UserEntity
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Component
import java.util.*

@Component
class Converter(
    @Autowired
    val companyRepository: CompanyRepository,
    @Autowired
    val applicationRepository: ApplicationRepository,
    @Autowired
    val contactRepository: ContactRepository,
    @Autowired
    val userRepository: UserRepository
) {

    fun convertCompany(companyID: UUID) = companyRepository.findByIdOrNull(companyID)
    fun convertApplication(applicationID: UUID) = applicationRepository.findByIdOrNull(applicationID)
    fun convertContact(contactID: UUID) = applicationRepository.findByIdOrNull(contactID)
    fun convertUser(userID: UUID) = applicationRepository.findByIdOrNull(userID)

    // ------ MultiConversions ------

    fun convertCompanyList(companyIDs: MutableList<UUID>): MutableList<CompanyEntity> =
        companyRepository.findAllById(companyIDs)
    fun convertApplicationList(applicationIDs: MutableList<UUID>): MutableList<ApplicationEntity> =
        applicationRepository.findAllById(applicationIDs)
    fun convertContactList(contactIDs: MutableList<UUID>): MutableList<ContactEntity> =
        contactRepository.findAllById(contactIDs)
    fun convertUserList(userIDs: MutableList<UUID>): MutableList<UserEntity> =
        userRepository.findAllById(userIDs)


}