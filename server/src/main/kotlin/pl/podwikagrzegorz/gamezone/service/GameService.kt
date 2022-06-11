package pl.podwikagrzegorz.gamezone.service

import org.springframework.data.repository.findByIdOrNull
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import pl.podwikagrzegorz.gamezone.exception.GameAlreadyAssignedToUserException
import pl.podwikagrzegorz.gamezone.exception.GameNotFoundException
import pl.podwikagrzegorz.gamezone.exception.UserNotFoundException
import pl.podwikagrzegorz.gamezone.model.Game
import pl.podwikagrzegorz.gamezone.model.GameDTO
import pl.podwikagrzegorz.gamezone.repository.GameRepository
import pl.podwikagrzegorz.gamezone.repository.UserRepository

@Service
class GameService(
    val gameRepository: GameRepository,
    val userRepository: UserRepository
) {
    fun addGame(gameDTO: GameDTO): ResponseEntity<Game> {
        val game = Game(
            title = gameDTO.title,
            type = gameDTO.type,
            platform = gameDTO.platform,
            url = gameDTO.url,
            date = gameDTO.date
        )
        return ResponseEntity.ok(gameRepository.save(game))
    }

    fun editGame(game: Game): ResponseEntity<List<Game>> {
        return gameRepository.findByIdOrNull(game.id)?.let {
            gameRepository.save(game)
            ResponseEntity(gameRepository.findAll(), HttpStatus.OK)
        } ?: throw GameNotFoundException()
    }

    fun deleteGame(game: Game): ResponseEntity<List<Game>> {
        return gameRepository.findByIdOrNull(game.id)?.let {
            val users = userRepository.findAllByGamesContains(it)
            users.forEach { user ->
                if (user.games.contains(it)) {
                    user.games.remove(game)
                    userRepository.save(user)
                }
            }
            gameRepository.delete(game)

            ResponseEntity(gameRepository.findAll(), HttpStatus.OK)
        } ?: throw GameNotFoundException()
    }

    fun getAllGames(): List<Game> {
        return gameRepository.findAll()
    }

    fun getUserGames(userId: Long): ResponseEntity<List<Game>> {
        return userRepository.findByIdOrNull(userId)?.games?.let {
            ResponseEntity.ok(it.toList())
        } ?: throw UserNotFoundException()
    }

    fun addUserGame(userId: Long, game: Game): ResponseEntity<List<Game>> {
        return userRepository.findByIdOrNull(userId)?.let { user ->
            return if (user.games.add(game)) {
                userRepository.save(user)

                ResponseEntity.ok(user.games.toList())
            } else
                throw GameAlreadyAssignedToUserException()
        } ?: throw UserNotFoundException()
    }

    fun deleteUserGame(userId: Long, game: Game): ResponseEntity<List<Game>> {
        return userRepository.findByIdOrNull(userId)?.let { user ->

            return if (user.games.remove(game)) {
                userRepository.save(user)

                ResponseEntity.ok(user.games.toList())
            } else
                throw GameNotFoundException()
        } ?: throw UserNotFoundException()
    }
}