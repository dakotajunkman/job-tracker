package com.jobtracker

import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

data class Test(val message: String)

@RestController
class TestController {
    @RequestMapping("/")
    fun message(): Test {
        return Test("Hello")
    }
}
