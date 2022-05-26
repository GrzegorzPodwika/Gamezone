package pl.podwikagrzegorz.gamezone.model

data class UserDTO(
    val username: String,
    val email: String,
    val firstName: String,
    val lastName: String,
    val phone: String,
    val password: String,
    val role: String = Role.USER
)