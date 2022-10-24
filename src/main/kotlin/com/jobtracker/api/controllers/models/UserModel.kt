package com.jobtracker.api.controllers.models

import com.jobtracker.api.repository.entities.ApplicationEntity
import com.jobtracker.api.repository.entities.UserEntity
import java.util.UUID

data class UserModel(
  val firstName: String,
  val lastName: String,
  val emailAddress: String,
  var id: UUID = UUID.randomUUID()
  ) {

  // Couldn't figure out how to init this in line in creating UserEntity. Feel free to move there if you can
  val emptyMutableList : MutableList<ApplicationEntity> = arrayListOf()

  fun toUserEntity()
  = UserEntity(id, firstName, lastName, emptyMutableList,emailAddress)
}

// We might not need this - can't think of a use case
data class MultipleUserModel(val contacts: MutableList<ContactModel>)