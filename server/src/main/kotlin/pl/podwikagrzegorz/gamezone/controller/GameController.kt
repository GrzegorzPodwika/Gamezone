package pl.podwikagrzegorz.gamezone.controller

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import pl.podwikagrzegorz.gamezone.model.Game
import pl.podwikagrzegorz.gamezone.model.GameDTO
import pl.podwikagrzegorz.gamezone.service.GameService
import javax.validation.Valid

@RestController
@CrossOrigin(origins = ["http://localhost:3000"])
class GameController(var gameService: GameService) {

    @PostMapping("/addGame")
    fun addGame(@Valid @RequestBody gameDTO: GameDTO): ResponseEntity<Game> = gameService.addGame(gameDTO)

    @PostMapping("/editGame")
    fun editGame(@Valid @RequestBody game: Game): ResponseEntity<List<Game>> = gameService.editGame(game)

    @PostMapping("/deleteGame")
    fun deleteGame(@Valid @RequestBody game: Game): ResponseEntity<List<Game>> = gameService.deleteGame(game)

    @GetMapping("/getAllGames")
    fun getAllGames(): List<Game> = gameService.getAllGames()

    @GetMapping("/getUserGames/{id}")
    fun getUserGames(@PathVariable(value = "id") userId: Long): ResponseEntity<List<Game>> =
        gameService.getUserGames(userId)

    @PostMapping("/addUserGame/{id}")
    fun addUserGame(
        @PathVariable(value = "id") userId: Long,
        @Valid @RequestBody game: Game
    ): ResponseEntity<List<Game>> = gameService.addUserGame(userId, game)

    @PostMapping("/deleteUserGame/{id}")
    fun deleteUserGame(
        @PathVariable(value = "id") userId: Long,
        @Valid @RequestBody game: Game
    ): ResponseEntity<List<Game>> = gameService.deleteUserGame(userId, game)
}