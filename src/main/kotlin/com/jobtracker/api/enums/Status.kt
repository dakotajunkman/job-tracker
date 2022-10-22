enum class ApplicationStatus {
    NONE,       // Debug purposes. If something is NONE something went wrong.
    APPLIED,
    ASSIGNED_OA,
    COMPLETED_OA,
    PHONE_SCREEN_SCHEDULED,
    PHONE_SCREEN_COMPLETE,
    INTERVIEW_SCHEDULED,
    INTERVIEW_COMPLETE,
    RECEIVED_OFFER,
    ACCEPTED_OFFER,
    REJECTED_OFFER,
    REJECTED_BY_COMPANY,
    POSITION_CANCELLED
}

// I hope this is ok lol
// Citation: https://stackoverflow.com/questions/40352684/what-is-the-equivalent-of-java-static-methods-in-kotlin
class StatusConverter{
    companion object{
        fun tryConvertStatus(status: String): ApplicationStatus {
            var resultingEnum: ApplicationStatus
            try {
                resultingEnum = ApplicationStatus.valueOf(status.uppercase())
            } catch(e: IllegalArgumentException) {
                resultingEnum = ApplicationStatus.NONE
            }
            return resultingEnum
        }
    }
}