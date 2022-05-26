package pl.podwikagrzegorz.gamezone.model

import javax.persistence.*
import javax.validation.constraints.NotBlank

@Entity(name = "users")
data class User(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @get: NotBlank
    @Column(nullable = false, unique = true)
    val username: String = "",

    @get: NotBlank
    val email: String = "",

    @get: NotBlank
    val firstName: String = "",

    @get: NotBlank
    val lastName: String = "",

    @get: NotBlank
    val phone: String = "",

    @get: NotBlank
    val password: String = "",

    @get: NotBlank
    val role: String = Role.USER,

    @OneToMany(targetEntity = Game::class)
    var games: Set<Game> = emptySet()
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as User

        if (id != other.id) return false

        return true
    }

    override fun hashCode(): Int {
        return id.hashCode()
    }

}
