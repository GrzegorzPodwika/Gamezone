package pl.podwikagrzegorz.gamezone.service

import org.springframework.data.repository.findByIdOrNull
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.stereotype.Service
import pl.podwikagrzegorz.gamezone.exception.UserNotFoundException
import pl.podwikagrzegorz.gamezone.exception.UsernameAlreadyTakenException
import pl.podwikagrzegorz.gamezone.model.User
import pl.podwikagrzegorz.gamezone.model.UserDTO
import pl.podwikagrzegorz.gamezone.repository.UserRepository
import javax.persistence.EntityExistsException

@Service
class UserService(val userRepository: UserRepository) : UserDetailsService {

    fun findUser(username: String, password: String): ResponseEntity<User> {
        return userRepository.findByUsernameAndPassword(username, password)?.let {
            ResponseEntity.ok(it)
        } ?: throw UserNotFoundException()
    }

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
        val searchUser = userRepository.findByUsername(userDTO.username)

        if (searchUser.isEmpty)
            return userRepository.save(user)
        else
            throw UsernameAlreadyTakenException()
    }

    fun update(user: User): ResponseEntity<User> {
        return userRepository.findByIdOrNull(user.id)?.let {
            userRepository.save(user)
            ResponseEntity.ok(user)
        } ?: throw UserNotFoundException()
    }

    fun deleteUser(user: User): ResponseEntity<List<User>> {
        return userRepository.findByIdOrNull(user.id)?.let {
            user.games.clear()
            userRepository.save(user)

            userRepository.delete(user)

            ResponseEntity(getAllUsers(), HttpStatus.OK)
        } ?: throw UserNotFoundException()
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
}