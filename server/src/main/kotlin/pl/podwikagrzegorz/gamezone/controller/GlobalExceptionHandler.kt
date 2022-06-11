package pl.podwikagrzegorz.gamezone.controller

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.context.request.WebRequest
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler
import pl.podwikagrzegorz.gamezone.exception.GameAlreadyAssignedToUserException
import pl.podwikagrzegorz.gamezone.exception.GameNotFoundException
import pl.podwikagrzegorz.gamezone.exception.UserNotFoundException
import java.time.LocalDateTime
import java.util.*


@ControllerAdvice
class GlobalExceptionHandler: ResponseEntityExceptionHandler() {

    @ExceptionHandler(UserNotFoundException::class)
    fun handleUserNotFoundException(
        ex: UserNotFoundException,
        request: WebRequest
    ) : ResponseEntity<Any> {
        val body = LinkedHashMap<String, Any>()
        body["timestamp"] = LocalDateTime.now()
        body["message"] = ex.message

        return ResponseEntity(body, HttpStatus.NOT_FOUND)
    }

    @ExceptionHandler(GameNotFoundException::class)
    fun handleGameNotFoundException(
        ex: GameNotFoundException,
        request: WebRequest
    ) : ResponseEntity<Any> {
        val body = LinkedHashMap<String, Any>()
        body["timestamp"] = LocalDateTime.now()
        body["message"] = ex.message

        return ResponseEntity(body, HttpStatus.NOT_FOUND)
    }

    @ExceptionHandler(GameAlreadyAssignedToUserException::class)
    fun handleGameAlreadyAssignedToUserException(
        ex: GameAlreadyAssignedToUserException,
        request: WebRequest
    ) : ResponseEntity<Any> {
        val body = LinkedHashMap<String, Any>()
        body["timestamp"] = LocalDateTime.now()
        body["message"] = ex.message

        return ResponseEntity(body, HttpStatus.CONFLICT)
    }
}