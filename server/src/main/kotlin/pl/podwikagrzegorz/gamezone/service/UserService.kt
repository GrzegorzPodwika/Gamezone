package pl.podwikagrzegorz.gamezone.service

import org.springframework.data.repository.findByIdOrNull
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.stereotype.Service
import pl.podwikagrzegorz.gamezone.model.User
import pl.podwikagrzegorz.gamezone.model.UserDTO
import pl.podwikagrzegorz.gamezone.repository.UserRepository
import javax.persistence.EntityExistsException

@Service
class UserService(val userRepository: UserRepository) : UserDetailsService {

    fun findUser(username: String, password: String): ResponseEntity<User> {
        return userRepository.findByUsernameAndPassword(username, password)?.let {
            ResponseEntity.ok(it)
        } ?: ResponseEntity.notFound().build()
    }


    fun findUserById(id: Long): User? = userRepository.findByIdOrNull(id)

    fun register(userDTO: UserDTO): User {
        val user = User(
            username = userDTO.username,
            email = userDTO.email,
            firstName = userDTO.firstName,
            lastName = userDTO.lastName,
            phone = userDTO.phone,
            password = userDTO.password,
            role = userDTO.role
        )

        return userRepository.save(user)
    }

    fun update(user: User): ResponseEntity<User> {
        return findUserById(user.id)?.let {
            userRepository.save(user)
            ResponseEntity.ok(user)
        } ?: ResponseEntity.notFound().build()
    }

    fun getAllUsers(): List<User> = userRepository.findAll()

    override fun loadUserByUsername(username: String): UserDetails {
        return userRepository.findByUsername(username)
            .map { user ->
                org.springframework.security.core.userdetails.User(
                    user.username,
                    user.password,
                    listOf(SimpleGrantedAuthority(user.role))
                )
            }.orElseThrow { EntityExistsException("User $username doesn't exist in database.") }
    }

    fun deleteUser(user: User): ResponseEntity<List<User>> {
        return findUserById(user.id)?.let {
            remove(it)
            ResponseEntity(getAllUsers(), HttpStatus.OK)
        } ?: ResponseEntity.notFound().build()
    }

    private fun remove(user: User) {
        user.games.clear()
        userRepository.save(user)

        userRepository.delete(user)
    }
}