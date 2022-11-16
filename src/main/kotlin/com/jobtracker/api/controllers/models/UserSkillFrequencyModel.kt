package com.jobtracker.api.controllers.models

import com.jobtracker.api.repository.entities.UserSkillFrequencyEntity

data class MultipleUserSkillFrequencyModel(val skills: List<UserSkillFrequencyEntity>)
