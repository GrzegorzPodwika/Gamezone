package pl.podwikagrzegorz.gamezone.model

import com.fasterxml.jackson.annotation.JsonProperty
import javax.validation.constraints.NotBlank

data class UserDTO(
    @field:NotBlank @JsonProperty("username")
    val username: String,
    @field:NotBlank @JsonProperty("email")
    val email: String,
    @field:NotBlank @JsonProperty("firstName")
    val firstName: String,
    @field:NotBlank @JsonProperty("lastName")
    val lastName: String,
    @field:NotBlank @JsonProperty("phone")
    val phone: String,
    @field:NotBlank @JsonProperty("password")
    val password: String,
    @field:NotBlank @JsonProperty("role")
    val role: String = Role.USER
)