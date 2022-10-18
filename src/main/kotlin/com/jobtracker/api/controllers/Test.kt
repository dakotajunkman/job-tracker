package com.jobtracker.api.controllers

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

data class Ping(val message: String)

@RestController
@RequestMapping("/api")
class TestController {
    @GetMapping("/ping")
    fun message(): ResponseEntity<Ping> {
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(Ping("Hi Bubba"))
    }
}
