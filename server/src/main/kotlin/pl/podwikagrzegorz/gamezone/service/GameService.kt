package pl.podwikagrzegorz.gamezone.service

import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import pl.podwikagrzegorz.gamezone.model.Game
import pl.podwikagrzegorz.gamezone.model.GameDTO
import pl.podwikagrzegorz.gamezone.repository.GameRepository
import pl.podwikagrzegorz.gamezone.repository.UserRepository

@Service
class GameService(
    val gameRepository: GameRepository,
    val userRepository: UserRepository
) {
    fun addGame(gameDTO: GameDTO): Game {
        val game = Game(
            title = gameDTO.title,
            type = gameDTO.type,
            platform = gameDTO.platform,
            url = gameDTO.url,
            date = gameDTO.date
        )
        return gameRepository.save(game)
    }

    fun editGame(game: Game): Game? {
        return gameRepository.findByIdOrNull(game.id)?.let {
            gameRepository.save(game)
        }
    }

    fun deleteGame(game: Game): List<Game>? {
        return gameRepository.findByIdOrNull(game.id)?.let {
            gameRepository.delete(game)
            gameRepository.findAll()
        }
    }

    fun filterGames(): List<Game> {
        //TODO
        return emptyList()
    }

    fun getAllGames(): List<Game> {
        return gameRepository.findAll()
    }

    fun getUserGames(userId: Long): List<Game>? {
        return userRepository.findByIdOrNull(userId)?.games?.toList()
    }

    fun addUserGame(userId: Long, game: Game): List<Game>? {
        return userRepository.findByIdOrNull(userId)?.let { user ->
            return if(user.games.toMutableSet().add(game)) {
                userRepository.save(user)
                user.games.toList()
            } else
                null
        }
    }

    fun deleteUserGame(userId: Long, game: Game): List<Game>? {
        return userRepository.findByIdOrNull(userId)?.let { user ->
            return if(user.games.toMutableSet().remove(game)) {
                userRepository.save(user)
                user.games.toList()
            } else
                null
        }
    }
}