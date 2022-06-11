package pl.podwikagrzegorz.gamezone.exception

class GameAlreadyAssignedToUserException: Exception() {
    override val message: String
        get() = "Game is already assigned to user!"
}