package pl.podwikagrzegorz.gamezone.exception

class UserNotFoundException: Exception() {
    override val message: String
        get() = "User not found!"
}