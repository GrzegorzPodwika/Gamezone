package pl.podwikagrzegorz.gamezone.model

data class UserDTO(
    val login: String,
    val email: String,
    val firstName: String,
    val lastName: String,
    val phone: String,
    val password: String,
    val rule: String = Role.USER
)