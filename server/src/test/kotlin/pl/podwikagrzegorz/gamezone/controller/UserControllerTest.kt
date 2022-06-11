package pl.podwikagrzegorz.gamezone.controller

import com.ninjasquad.springmockk.MockkBean
import io.mockk.every
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers
import pl.podwikagrzegorz.gamezone.model.User
import pl.podwikagrzegorz.gamezone.repository.GameRepository
import pl.podwikagrzegorz.gamezone.repository.UserRepository
import pl.podwikagrzegorz.gamezone.security.SecurityConfiguration
import pl.podwikagrzegorz.gamezone.service.GameService
import pl.podwikagrzegorz.gamezone.service.UserService

@WebMvcTest(excludeAutoConfiguration = [SecurityAutoConfiguration::class, SecurityConfiguration::class])
@AutoConfigureMockMvc(addFilters = false)
internal class UserControllerTest {
    @Autowired
    lateinit var mockMvc: MockMvc

    @MockkBean
    lateinit var gameService: GameService

    @MockkBean
    lateinit var gameRepository: GameRepository

    @MockkBean
    lateinit var userRepository: UserRepository

    @MockkBean
    lateinit var userService: UserService

    @MockkBean
    lateinit var passwordEncoder: PasswordEncoder

    @MockkBean
    @Qualifier("userService")
    lateinit var userDetailsService: UserDetailsService

    @Test
    fun `logging with valid username and password returns OK`() {
        every { userService.findUser(any(), any()) }.returns(ResponseEntity.ok(null))

        mockMvc.perform(
            MockMvcRequestBuilders.post("/login")
                .param("username", "test")
                .param("password", "test")
                .contentType(MediaType.MULTIPART_FORM_DATA)
        ).andExpect(MockMvcResultMatchers.status().isOk)
    }

    @Test
    fun `logging with invalid username and password returns Bad Request`() {
        every { userService.findUser(any(), any()) }.returns(ResponseEntity.ok(null))

        mockMvc.perform(
            MockMvcRequestBuilders.post("/login")
                .param("login", "test")
                .param("password", "test")
                .contentType(MediaType.MULTIPART_FORM_DATA)
        ).andExpect(MockMvcResultMatchers.status().isBadRequest)
    }

    @Test
    fun `editing valid user returns OK`() {
        every { userService.update(any()) }.returns(ResponseEntity.ok(null))

        val validUser = """
            {
            "id": 0,
            "username": "test",
            "email": "test",
            "firstName": "test",
            "lastName": "test",
            "phone": "test",
            "password": "test",
            "role": "USER"
            }
        """.trimIndent()

        mockMvc.perform(
            MockMvcRequestBuilders.post("/editUser")
                .content(validUser)
                .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(MockMvcResultMatchers.status().isOk)
    }

    @Test
    fun `editing invalid user returns Bad Request`() {
        every { userService.update(any()) }.returns(ResponseEntity.ok(null))

        val validUser = """
            {
            "id": 0,
            "firstName": "test",
            "lastName": "test",
            "phone": "test",
            "password": "test",
            "role": "USER"
            }
        """.trimIndent()

        mockMvc.perform(
            MockMvcRequestBuilders.post("/editUser")
                .content(validUser)
                .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(MockMvcResultMatchers.status().isBadRequest)
    }

    @Test
    fun `deleting valid user returns OK`() {
        every { userService.deleteUser(any()) }.returns(ResponseEntity.ok(null))

        val validUser = """
            {
            "id": 0,
            "username": "test",
            "email": "test",
            "firstName": "test",
            "lastName": "test",
            "phone": "test",
            "password": "test",
            "role": "USER"
            }
        """.trimIndent()

        mockMvc.perform(
            MockMvcRequestBuilders.post("/deleteUser")
                .content(validUser)
                .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(MockMvcResultMatchers.status().isOk)
    }

    @Test
    fun `deleting invalid user returns Bad Request`() {
        every { userService.deleteUser(any()) }.returns(ResponseEntity.ok(null))

        val validUser = """
            {
            "id": 0,
            "firstName": "test",
            "lastName": "test",
            "phone": "test",
            "password": "test",
            "role": "USER"
            }
        """.trimIndent()

        mockMvc.perform(
            MockMvcRequestBuilders.post("/deleteUser")
                .content(validUser)
                .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(MockMvcResultMatchers.status().isBadRequest)
    }

    @Test
    fun `registration of valid userDTO returns OK`() {
        val user = User(
            username = "test",
            email = "test",
            firstName = "test",
            lastName = "test",
            phone = "test",
            password = "test",
            role = "test"
        )
        every { userService.register(any()) }.returns(user)

        val validUserDTO = """
            {
            "username": "test",
            "email": "test",
            "firstName": "test",
            "lastName": "test",
            "phone": "test",
            "password": "test",
            "role": "USER"
            }
        """.trimIndent()

        mockMvc.perform(
            MockMvcRequestBuilders.post("/register")
                .content(validUserDTO)
                .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(MockMvcResultMatchers.status().isOk)
    }

    @Test
    fun `registration of valid userDTO returns Bad Request`() {
        val invalidUserDTO = """
            {
            "id": 0,
            "firstName": "test",
            "lastName": "test",
            "phone": "test",
            "password": "test",
            "role": "USER"
            }
        """.trimIndent()

        mockMvc.perform(
            MockMvcRequestBuilders.post("/register")
                .content(invalidUserDTO)
                .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(MockMvcResultMatchers.status().isBadRequest)
    }
}