package com.jobtracker.api.repository.entities

import java.util.UUID
import javax.persistence.*

@Entity
@Table(name = "user_skill_frequencies")
data class UserSkillFrequencyEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    val id: UUID,
    @Column(name = "skill_name", nullable = false) val skillName: String,
    @Column(name = "frequency", nullable = false) val frequency: Int,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user", referencedColumnName = "id")
    var user: User
) {
  override fun toString() =
      "Skill type with id: $id, skillName: $skillName, frequency: $frequency"
}
