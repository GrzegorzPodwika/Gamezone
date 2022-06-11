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
import pl.podwikagrzegorz.gamezone.repository.GameRepository
import pl.podwikagrzegorz.gamezone.repository.UserRepository
import pl.podwikagrzegorz.gamezone.security.SecurityConfiguration
import pl.podwikagrzegorz.gamezone.service.GameService
import pl.podwikagrzegorz.gamezone.service.UserService

@WebMvcTest(excludeAutoConfiguration = [SecurityAutoConfiguration::class, SecurityConfiguration::class])
@AutoConfigureMockMvc(addFilters = false)
internal class GameControllerTest {

    @Autowired lateinit var mockMvc: MockMvc

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
    fun `adding valid gameDTO returns OK`() {
        every { gameService.addGame(any()) }.returns(ResponseEntity.ok(null))

        val validGameDTO = """
        {
            "title": "HOMM3",
            "type": "Strategiczne",
            "platform": "PC",
            "url": "https://heroes.thelazy.net/images/thumb/8/88/Homm3.jpg/290px-Homm3.jpg",
            "date": "1991-06-01"
        }
        """.trimIndent()

        mockMvc.perform(
            MockMvcRequestBuilders.post("/addGame")
                .content(validGameDTO)
                .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(MockMvcResultMatchers.status().isOk)
    }

    @Test
    fun `adding invalid gameDTO returns Bad Request`() {
        every { gameService.addGame(any()) }.returns(ResponseEntity.ok(null))

        val invalidGameDTO = """
        {
            "type": "Strategiczne",
            "platform": "PC",
            "url": "https://heroes.thelazy.net/images/thumb/8/88/Homm3.jpg/290px-Homm3.jpg",
            "date": "1991-06-01"
        }
        """.trimIndent()

        mockMvc.perform(
            MockMvcRequestBuilders.post("/addGame")
                .content(invalidGameDTO)
                .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(MockMvcResultMatchers.status().isBadRequest)
    }

    @Test
    fun `editing valid game returns OK`() {
        every { gameService.editGame(any()) }.returns(ResponseEntity.ok(null))

        val validGame = """
        {
            "id": 0,
            "title": "HOMM3",
            "type": "Strategiczne",
            "platform": "PC",
            "url": "https://heroes.thelazy.net/images/thumb/8/88/Homm3.jpg/290px-Homm3.jpg",
            "date": "1991-06-01"
        }
        """.trimIndent()

        mockMvc.perform(
            MockMvcRequestBuilders.post("/editGame")
                .content(validGame)
                .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(MockMvcResultMatchers.status().isOk)
    }

    @Test
    fun `editing invalid game returns Bad Request`() {
        every { gameService.editGame(any()) }.returns(ResponseEntity.ok(null))

        val invalidGame = """
        {
            "id": 0,
            "type": "Strategiczne",
            "platform": "PC",
            "url": "https://heroes.thelazy.net/images/thumb/8/88/Homm3.jpg/290px-Homm3.jpg",
            "date": "1991-06-01"
        }
        """.trimIndent()

        mockMvc.perform(
            MockMvcRequestBuilders.post("/editGame")
                .content(invalidGame)
                .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(MockMvcResultMatchers.status().isBadRequest)
    }

    @Test
    fun `deleting valid game returns OK`() {
        every { gameService.deleteGame(any()) }.returns(ResponseEntity.ok(null))

        val validGame = """
        {
            "id": 0,
            "title": "HOMM3",
            "type": "Strategiczne",
            "platform": "PC",
            "url": "https://heroes.thelazy.net/images/thumb/8/88/Homm3.jpg/290px-Homm3.jpg",
            "date": "1991-06-01"
        }
        """.trimIndent()

        mockMvc.perform(
            MockMvcRequestBuilders.post("/deleteGame")
                .content(validGame)
                .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(MockMvcResultMatchers.status().isOk)
    }

    @Test
    fun `deleting invalid game returns Bad Request`() {
        every { gameService.deleteGame(any()) }.returns(ResponseEntity.ok(null))

        val invalidGame = """
        {
            "id": 0,
            "type": "Strategiczne",
            "platform": "PC",
            "url": "https://heroes.thelazy.net/images/thumb/8/88/Homm3.jpg/290px-Homm3.jpg",
            "date": "1991-06-01"
        }
        """.trimIndent()

        mockMvc.perform(
            MockMvcRequestBuilders.post("/deleteGame")
                .content(invalidGame)
                .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(MockMvcResultMatchers.status().isBadRequest)
    }

    @Test
    fun `getting user games with valid id returns OK`() {
        every { gameService.getUserGames(any()) }.returns(ResponseEntity.ok(null))

        mockMvc.perform(
            MockMvcRequestBuilders.get("/getUserGames/0")
                .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(MockMvcResultMatchers.status().isOk)
    }

    @Test
    fun `getting user games with invalid id returns Bad Request`() {
        every { gameService.getUserGames(any()) }.returns(ResponseEntity.ok(null))

        mockMvc.perform(
            MockMvcRequestBuilders.get("/getUserGames/X")
                .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(MockMvcResultMatchers.status().isBadRequest)
    }

    @Test
    fun `adding valid user game returns OK`() {
        every { gameService.addUserGame(any(), any()) }.returns(ResponseEntity.ok(null))

        val validGame = """
        {
            "id": 0,
            "title": "HOMM3",
            "type": "Strategiczne",
            "platform": "PC",
            "url": "https://heroes.thelazy.net/images/thumb/8/88/Homm3.jpg/290px-Homm3.jpg",
            "date": "1991-06-01"
        }
        """.trimIndent()

        mockMvc.perform(
            MockMvcRequestBuilders.post("/addUserGame/0")
                .content(validGame)
                .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(MockMvcResultMatchers.status().isOk)
    }

    @Test
    fun `adding valid user game with invalid user id returns Bad Request`() {
        every { gameService.addUserGame(any(), any()) }.returns(ResponseEntity.ok(null))

        val validGame = """
        {
            "id": 0,
            "title": "HOMM3",
            "type": "Strategiczne",
            "platform": "PC",
            "url": "https://heroes.thelazy.net/images/thumb/8/88/Homm3.jpg/290px-Homm3.jpg",
            "date": "1991-06-01"
        }
        """.trimIndent()

        mockMvc.perform(
            MockMvcRequestBuilders.post("/addUserGame/X")
                .content(validGame)
                .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(MockMvcResultMatchers.status().isBadRequest)
    }

    @Test
    fun `adding invalid user game returns Bad Request`() {
        every { gameService.addUserGame(any(), any()) }.returns(ResponseEntity.ok(null))

        val invalidGame = """
        {
            "id": 0,
            "type": "Strategiczne",
            "platform": "PC",
            "url": "https://heroes.thelazy.net/images/thumb/8/88/Homm3.jpg/290px-Homm3.jpg",
            "date": "1991-06-01"
        }
        """.trimIndent()

        mockMvc.perform(
            MockMvcRequestBuilders.post("/addUserGame/0")
                .content(invalidGame)
                .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(MockMvcResultMatchers.status().isBadRequest)
    }

    @Test
    fun `deleting valid user game returns OK`() {
        every { gameService.deleteUserGame(any(), any()) }.returns(ResponseEntity.ok(null))

        val validGame = """
        {
            "id": 0,
            "title": "HOMM3",
            "type": "Strategiczne",
            "platform": "PC",
            "url": "https://heroes.thelazy.net/images/thumb/8/88/Homm3.jpg/290px-Homm3.jpg",
            "date": "1991-06-01"
        }
        """.trimIndent()

        mockMvc.perform(
            MockMvcRequestBuilders.post("/deleteUserGame/0")
                .content(validGame)
                .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(MockMvcResultMatchers.status().isOk)
    }

    @Test
    fun `deleting valid user game with invalid user id returns Bad Request`() {
        every { gameService.deleteUserGame(any(), any()) }.returns(ResponseEntity.ok(null))

        val validGame = """
        {
            "id": 0,
            "title": "HOMM3",
            "type": "Strategiczne",
            "platform": "PC",
            "url": "https://heroes.thelazy.net/images/thumb/8/88/Homm3.jpg/290px-Homm3.jpg",
            "date": "1991-06-01"
        }
        """.trimIndent()

        mockMvc.perform(
            MockMvcRequestBuilders.post("/deleteUserGame/X")
                .content(validGame)
                .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(MockMvcResultMatchers.status().isBadRequest)
    }

    @Test
    fun `deleting invalid user game returns Bad Request`() {
        every { gameService.deleteUserGame(any(), any()) }.returns(ResponseEntity.ok(null))

        val invalidGame = """
        {
            "id": 0,
            "type": "Strategiczne",
            "platform": "PC",
            "url": "https://heroes.thelazy.net/images/thumb/8/88/Homm3.jpg/290px-Homm3.jpg",
            "date": "1991-06-01"
        }
        """.trimIndent()

        mockMvc.perform(
            MockMvcRequestBuilders.post("/deleteUserGame/0")
                .content(invalidGame)
                .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(MockMvcResultMatchers.status().isBadRequest)
    }

}