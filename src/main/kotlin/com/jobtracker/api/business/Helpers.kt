package com.jobtracker.api.business

import java.time.LocalDate
import java.time.ZoneId
import java.util.Date

class Helpers{
    companion object{
        fun tryConvertStringToDate(dateString: String): Date {
            var resultingLocalDate: LocalDate
            var resultingDate : Date?
                resultingLocalDate = LocalDate.parse(dateString)
                resultingDate = Date.from(resultingLocalDate.atStartOfDay()
                    .atZone(ZoneId.systemDefault())
                    .toInstant());

            return resultingDate
        }
    }
}