package pl.podwikagrzegorz.gamezone.exception

class UsernameAlreadyTakenException: Exception() {
    override val message: String
        get() = "Username is already taken!"
}