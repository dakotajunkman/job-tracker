package com.jobtracker.api.business

import com.jobtracker.api.repository.UserRepository
import com.jobtracker.api.repository.entities.UserEntity
import org.springframework.security.oauth2.jwt.JwtDecoder
import java.time.LocalDate
import java.time.ZoneId
import java.util.*

object Helpers{
    fun tryConvertStringToDate(dateString: String): Date {
        val resultingDate : Date?
        val resultingLocalDate: LocalDate = LocalDate.parse(dateString)
            resultingDate = Date.from(resultingLocalDate.atStartOfDay()
                .atZone(ZoneId.systemDefault())
                .toInstant());

        return resultingDate
    }

    fun convertStringArrToUUID(startArr: MutableList<String>): MutableList<UUID> {
        return startArr.map {
            UUID.fromString(it)
        }.toMutableList()
    }

    fun getUserIDByJWT(jwt: String, decoder: JwtDecoder, userRepository: UserRepository): UUID?{
        val decoded = decoder.decode(jwt.substring(7))
        val claim = decoded.getClaimAsString("email")
        val user = userRepository.findByEmail(claim)
            ?: return null
        return user.id
    }

    fun getUserByJWT(jwt: String, decoder: JwtDecoder, userRepository: UserRepository): UserEntity? {
        val decoded = decoder.decode(jwt.substring(7))
        val claim = decoded.getClaimAsString("email")
        return userRepository.findByEmail(claim)
    }
}