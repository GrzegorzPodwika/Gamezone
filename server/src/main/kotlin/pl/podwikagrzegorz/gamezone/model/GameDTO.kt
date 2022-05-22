package pl.podwikagrzegorz.gamezone.model

data class GameDTO(
    val title: String,
    val type: String,
    val platform: String,
    val url: String? = null,
    val date: String
)
