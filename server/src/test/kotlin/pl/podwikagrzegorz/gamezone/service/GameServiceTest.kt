package pl.podwikagrzegorz.gamezone.service

import io.mockk.every
import io.mockk.mockk

import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.springframework.data.repository.findByIdOrNull
import pl.podwikagrzegorz.gamezone.exception.GameAlreadyAssignedToUserException
import pl.podwikagrzegorz.gamezone.exception.GameNotFoundException
import pl.podwikagrzegorz.gamezone.exception.UserNotFoundException
import pl.podwikagrzegorz.gamezone.model.Game
import pl.podwikagrzegorz.gamezone.model.User
import pl.podwikagrzegorz.gamezone.repository.GameRepository
import pl.podwikagrzegorz.gamezone.repository.UserRepository

class GameServiceTest {
    val userRepository: UserRepository = mockk()
    val gameRepository: GameRepository = mockk()
    private val user = mockk<User>()
    private val game = Game(
        id = 0,
        title = "test",
        type = "test",
        platform = "test",
        url = "test",
        date = "test"
    )

    private val gameService = GameService(gameRepository, userRepository)

    @Test
    fun `edition of not existing game throws exception`() {
        every { gameRepository.findByIdOrNull(any()) }.returns(null)

        assertThrows<GameNotFoundException> {
            gameService.editGame(game)
        }
    }

    @Test
    fun `deletion of not existing game throws exception`() {
        every { gameRepository.findByIdOrNull(any()) }.returns(null)

        assertThrows<GameNotFoundException> {
            gameService.deleteGame(game)
        }
    }

    @Test
    fun `adding user game with invalid user throws exception`() {
        every { userRepository.findByIdOrNull(any()) }.returns(null)

        assertThrows<UserNotFoundException> {
            gameService.addUserGame(0, game)
        }
    }

    @Test
    fun `adding already assigned user game throws exception`() {
        val games = mutableSetOf(game)
        every { userRepository.findByIdOrNull(any()) }.returns(user)
        every { user.games }.returns(games)

        assertThrows<GameAlreadyAssignedToUserException> {
            gameService.addUserGame(0, game)
        }
    }

    @Test
    fun `deleting user game with invalid user throws exception`() {
        every { userRepository.findByIdOrNull(any()) }.returns(null)

        assertThrows<UserNotFoundException> {
            gameService.deleteUserGame(0, game)
        }
    }

    @Test
    fun `deleting not existing user game throws exception`() {
        val games = mutableSetOf<Game>()
        every { userRepository.findByIdOrNull(any()) }.returns(user)
        every { user.games }.returns(games)

        assertThrows<GameNotFoundException> {
            gameService.deleteUserGame(0, game)
        }
    }
}