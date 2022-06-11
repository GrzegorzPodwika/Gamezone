package pl.podwikagrzegorz.gamezone.controller

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import pl.podwikagrzegorz.gamezone.model.User
import pl.podwikagrzegorz.gamezone.model.UserDTO
import pl.podwikagrzegorz.gamezone.service.UserService
import javax.validation.Valid

@RestController
@CrossOrigin(origins = ["http://localhost:3000"])
class UserController(var userService: UserService) {

    @PostMapping("/login")
    fun login(
        @RequestParam("username") username: String,
        @RequestParam("password") password: String
    ): ResponseEntity<User> = userService.findUser(username, password)

    @PostMapping("/editUser")
    fun editUser(@Valid @RequestBody user: User): ResponseEntity<User> {
        return userService.update(user)
    }

    @PostMapping("/deleteUser")
    fun deleteUser(@Valid @RequestBody user: User): ResponseEntity<List<User>> {
        return userService.deleteUser(user)
    }

    @GetMapping("/getUsers")
    fun getUsers(): List<User> {
        return userService.getAllUsers()
    }

    @PostMapping("/register")
    fun register(@Valid @RequestBody userDTO: UserDTO): Boolean {
        userService.register(userDTO)

        return true
    }
}