package pl.podwikagrzegorz.gamezone.controller

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import pl.podwikagrzegorz.gamezone.model.SessionState
import pl.podwikagrzegorz.gamezone.model.User
import pl.podwikagrzegorz.gamezone.model.UserDTO
import pl.podwikagrzegorz.gamezone.service.UserService

@RestController
@CrossOrigin("http://localhost:3000")
class UserController(val userService: UserService) {

    @PostMapping("/login")
    fun login(@RequestParam("login") login: String, @RequestParam("password") password: String): ResponseEntity<User> {
        println("dupa login $login password $password")
        val user = userService.findUser(login, password)

        return if(user == null)
            ResponseEntity(HttpStatus.BAD_REQUEST)
        else {
            SessionState.user = user
            ResponseEntity(user, HttpStatus.OK)
        }
    }

    @PostMapping("/editUser")
    fun editUser(@RequestBody user: User?): ResponseEntity<User> {
        return if(user == null)
            ResponseEntity(HttpStatus.BAD_REQUEST)
        else {
            val response = userService.save(user)
            ResponseEntity(response, HttpStatus.OK)
        }
    }

    @PostMapping("/deleteUser")
    fun deleteUser(@RequestBody id: Long): ResponseEntity<User> {
        val user = userService.findUserById(id)

        return if(user == null)
            ResponseEntity.notFound().build()
        else {
            userService.remove(user)
            ResponseEntity(user, HttpStatus.OK)
        }
    }

    @GetMapping("/getUsers")
    fun getUsers(): List<User> {
        return userService.getAllUsers()
    }

/*    @GetMapping("/logout")
    fun logout(): Boolean {
        SessionState.user = null

        return true
    }*/

    @PostMapping("/register")
    fun register(@RequestBody userDTO: UserDTO): Boolean {
        userService.register(userDTO)

        return true
    }
}