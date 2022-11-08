package com.jobtracker.api.business

import com.jobtracker.api.repository.*
import com.jobtracker.api.repository.entities.*
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
    val userRepository: UserRepository,
    @Autowired
    val userSkillFrequencyRepository: UserSkillFrequencyRepository
) {

    fun convertCompany(companyID: UUID) = companyRepository.findByIdOrNull(companyID)
    fun convertApplication(applicationID: UUID) = applicationRepository.findByIdOrNull(applicationID)
    fun convertContact(contactID: UUID) = contactRepository.findByIdOrNull(contactID)
    fun convertUser(userID: UUID) = userRepository.findByIdOrNull(userID)

    // ------ MultiConversions ------

    fun convertCompanyList(companyIDs: MutableList<UUID>): MutableList<CompanyEntity> =
        companyRepository.findAllById(companyIDs)
    fun convertApplicationList(applicationIDs: MutableList<UUID>): MutableList<ApplicationEntity> =
        applicationRepository.findAllById(applicationIDs)
    fun convertContactList(contactIDs: MutableList<UUID>): MutableList<ContactEntity> =
        contactRepository.findAllById(contactIDs)
    fun convertUserList(userIDs: MutableList<UUID>): MutableList<UserEntity> =
        userRepository.findAllById(userIDs)

    // Other shit that needs a home
    fun createOrUpdateSkills(skills: MutableList<String>, user: UserEntity) {
        val skillMap = hashMapOf<String, UserSkillFrequencyEntity>()

        // throw a hash map at it!
        userSkillFrequencyRepository.findByUser(user.id).forEach {
            skillMap[it.skillName] = it
        }
        val skillsToSave = mutableListOf<UserSkillFrequencyEntity>()

        skills.forEach { skillName ->
            val curEntity = skillMap.getOrDefault(skillName.lowercase(), null)

            // update already existing skill to increment it
            val entityToSave = if (curEntity != null) {
                UserSkillFrequencyEntity(
                    curEntity.id,
                    curEntity.skillName,
                    curEntity.frequency + 1,
                    curEntity.user
                )
                // create a new one
            } else {
                UserSkillFrequencyEntity(
                    UUID.randomUUID(),
                    skillName.lowercase(),
                    1,
                    user
                )
            }
            skillsToSave.add(entityToSave)
        }
        userSkillFrequencyRepository.saveAll(skillsToSave)
    }
}
