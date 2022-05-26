package pl.podwikagrzegorz.gamezone.service

import org.springframework.data.repository.findByIdOrNull
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.stereotype.Service
import pl.podwikagrzegorz.gamezone.model.User
import pl.podwikagrzegorz.gamezone.model.UserDTO
import pl.podwikagrzegorz.gamezone.repository.UserRepository
import javax.persistence.EntityExistsException

@Service
class UserService(val userRepository: UserRepository): UserDetailsService {

    fun findUser(login: String, password: String) = userRepository.findByUsernameAndPassword(login, password)

    fun findUserById(id: Long): User? = userRepository.findByIdOrNull(id)

    fun register(userDTO: UserDTO) {
        val user = User(
            username = userDTO.username,
            email = userDTO.email,
            firstName = userDTO.firstName,
            lastName = userDTO.lastName,
            phone = userDTO.phone,
            password = userDTO.password,
            role = userDTO.role
        )

        userRepository.save(user)
    }
    fun save(user: User): User = userRepository.save(user)

    fun remove(user: User) {
        userRepository.delete(user)
    }

    fun getAllUsers(): List<User> = userRepository.findAll()

    override fun loadUserByUsername(username: String): UserDetails {
        println("dupa loadUserByUsername '$username' ")

        return userRepository.findByUsername(username)
            .map { user -> org.springframework.security.core.userdetails.User(
                user.username,
                user.password,
                listOf(SimpleGrantedAuthority(user.role))
            ) }.orElseThrow{EntityExistsException("User $username doesn't exist in database.")}
    }
}