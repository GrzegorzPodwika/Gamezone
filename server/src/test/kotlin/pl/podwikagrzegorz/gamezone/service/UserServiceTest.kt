package pl.podwikagrzegorz.gamezone.service

import io.mockk.every
import io.mockk.mockk
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.springframework.data.repository.findByIdOrNull
import pl.podwikagrzegorz.gamezone.exception.UserNotFoundException
import pl.podwikagrzegorz.gamezone.exception.UsernameAlreadyTakenException
import pl.podwikagrzegorz.gamezone.model.User
import pl.podwikagrzegorz.gamezone.model.UserDTO
import pl.podwikagrzegorz.gamezone.repository.UserRepository
import java.util.*

class UserServiceTest {

    val userRepository: UserRepository = mockk()

    val testedObject: UserService = UserService(userRepository)

    private val user = User(
        username = "test",
        email = "test",
        firstName = "test",
        lastName = "test",
        phone = "test",
        password = "test",
        role = "test"
    )

    @Test
    fun `login of not existing user throws exception`() {
        every { userRepository.findByUsernameAndPassword(any(), any()) }.returns(null)

        assertThrows<UserNotFoundException> {
            testedObject.findUser("test", "test")
        }
    }

    @Test
    fun `registration of user with already taken username throws exception`() {
        every { userRepository.findByUsername(any()) }.returns(Optional.of(user))
        val userDTO = UserDTO(
            username = "test",
            email = "test",
            firstName = "test",
            lastName = "test",
            phone = "test",
            password = "test",
            role = "test"
        )

        assertThrows<UsernameAlreadyTakenException> {
            testedObject.register(userDTO)
        }
    }

    @Test
    fun `update of not existing user throws exception`() {
        every { userRepository.findByIdOrNull(any()) }.returns(null)

        assertThrows<UserNotFoundException> {
            testedObject.update(user)
        }
    }

    @Test
    fun `deletion of not existing user throws exception`() {
        every { userRepository.findByIdOrNull(any()) }.returns(null)

        assertThrows<UserNotFoundException> {
            testedObject.deleteUser(user)
        }
    }
}