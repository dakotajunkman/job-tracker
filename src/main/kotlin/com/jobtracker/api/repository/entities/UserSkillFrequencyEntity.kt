package com.jobtracker.api.repository.entities

import java.util.UUID
import javax.persistence.*
import DEFAULT_FIELD_LENGTH

@Entity
@Table(name = "user_skill_frequencies")
data class UserSkillFrequencyEntity(
    @Id
    @Column(name = "id", nullable = false)
    val id: UUID,
    @Column(name = "skill_name", nullable = false, length = DEFAULT_FIELD_LENGTH) val skillName: String,
    @Column(name = "frequency", nullable = false) val frequency: Int,

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    val user: UserEntity
) {
  override fun toString() =
      "Skill type with id: $id, skillName: $skillName, frequency: $frequency"
}
