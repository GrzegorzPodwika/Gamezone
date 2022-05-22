package pl.podwikagrzegorz.gamezone.controller

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import pl.podwikagrzegorz.gamezone.model.FilterParams
import pl.podwikagrzegorz.gamezone.model.Game
import pl.podwikagrzegorz.gamezone.model.GameDTO
import pl.podwikagrzegorz.gamezone.service.GameService

@RestController
class GameController(val gameService: GameService) {

    @PostMapping("/addGame")
    fun addGame(@RequestBody gameDTO: GameDTO): Game {
        return gameService.addGame(gameDTO)
    }

    @PostMapping("/editGame")
    fun editGame(@RequestBody game: Game): ResponseEntity<Game> {
        val updatedGame = gameService.editGame(game)
        return if (updatedGame == null)
            ResponseEntity.notFound().build()
        else
            ResponseEntity(updatedGame, HttpStatus.OK)
    }

    @PostMapping("/deleteGame")
    fun deleteGame(@RequestBody game: Game): ResponseEntity<List<Game>> {
        val updatedGames = gameService.deleteGame(game)
        return if (updatedGames == null)
            ResponseEntity.notFound().build()
        else
            ResponseEntity(updatedGames, HttpStatus.OK)
    }

    @PostMapping("/filterGames")
    fun filterGames(@RequestBody filterParams: FilterParams): List<Game> {
        return gameService.filterGames()
    }

    @GetMapping("/getAllGames")
    fun getAllGames(): List<Game> {
        return gameService.getAllGames()
    }

    @GetMapping("/getUserGames/{id}")
    fun getUserGames(@PathVariable(value = "id") userId: Long): ResponseEntity<List<Game>> {
        val userGames = gameService.getUserGames(userId)
        return if(userGames == null) {
            ResponseEntity.notFound().build()
        } else {
            ResponseEntity.ok(userGames)
        }
    }

    @PostMapping("/addUserGame/{id}")
    fun addUserGame(@PathVariable(value = "id") userId: Long,
                    @RequestBody game: Game): ResponseEntity<List<Game>> {
        val userGames = gameService.addUserGame(userId, game)
        return if (userGames == null)
            ResponseEntity.notFound().build()
        else
            ResponseEntity.ok(userGames)
    }

    @PostMapping("/deleteUserGame/{id}")
    fun deleteUserGame(@PathVariable(value = "id") userId: Long,
                    @RequestBody game: Game): ResponseEntity<List<Game>> {
        val userGames = gameService.deleteUserGame(userId, game)
        return if (userGames == null)
            ResponseEntity.notFound().build()
        else
            ResponseEntity.ok(userGames)
    }
}