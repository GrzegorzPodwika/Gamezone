package pl.podwikagrzegorz.gamezone.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import pl.podwikagrzegorz.gamezone.model.Game
import pl.podwikagrzegorz.gamezone.model.User
import java.util.*

@Repository
interface UserRepository: JpaRepository<User, Long> {
    fun findByUsernameAndPassword(login: String, password: String): User?
    fun findByUsername(login: String): Optional<User>
    fun findAllByGamesContains(game: Game): List<User>
}