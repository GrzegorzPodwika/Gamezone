package pl.podwikagrzegorz.gamezone.model

import javax.persistence.*
import javax.validation.constraints.NotBlank

@Entity(name = "games")
data class Game(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @get: NotBlank
    val title: String = "",

    @get: NotBlank
    val type: String = "",

    @get: NotBlank
    val platform: String = "",

    @get: NotBlank
    val url: String? = null,

    @get: NotBlank
    val date: String = "",
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as Game

        if (id != other.id) return false

        return true
    }

    override fun hashCode(): Int {
        return id.hashCode()
    }
}


