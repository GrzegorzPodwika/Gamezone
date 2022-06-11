package pl.podwikagrzegorz.gamezone.controller

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import pl.podwikagrzegorz.gamezone.model.User
import pl.podwikagrzegorz.gamezone.model.UserDTO
import pl.podwikagrzegorz.gamezone.service.UserService

@RestController
@CrossOrigin(origins = ["http://localhost:3000"])
class UserController(var userService: UserService) {

    @PostMapping("/login")
    fun login(
        @RequestParam("username") username: String,
        @RequestParam("password") password: String
    ): ResponseEntity<User> {
        val user = userService.findUser(username, password)

        return if (user == null)
            ResponseEntity.notFound().build()
        else {
            ResponseEntity.ok(user)
        }
    }

    @PostMapping("/editUser")
    fun editUser(@RequestBody user: User): ResponseEntity<User> {
        val response = userService.save(user)
        return ResponseEntity(response, HttpStatus.OK)
    }

    @PostMapping("/deleteUser")
    fun deleteUser(@RequestBody user: User): ResponseEntity<List<User>> {
        return userService.deleteUser(user)
    }

    @GetMapping("/getUsers")
    fun getUsers(): List<User> {
        return userService.getAllUsers()
    }

    @PostMapping("/register")
    fun register(@RequestBody userDTO: UserDTO): Boolean {
        userService.register(userDTO)

        return true
    }
}