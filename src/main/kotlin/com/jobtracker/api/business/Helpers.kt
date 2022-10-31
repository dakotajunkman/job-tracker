package com.jobtracker.api.business

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
}