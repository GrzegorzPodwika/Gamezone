package pl.podwikagrzegorz.gamezone.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import pl.podwikagrzegorz.gamezone.model.User
import java.util.*

@Repository
interface UserRepository: JpaRepository<User, Long> {
    fun findByLoginAndPassword(login: String, password: String): User?
    fun findByLogin(login: String): Optional<User>
}