package pl.podwikagrzegorz.gamezone.exception

class GameNotFoundException: Exception() {
    override val message: String
        get() = "Game not found!"
}