package pl.podwikagrzegorz.gamezone

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.data.jpa.repository.config.EnableJpaRepositories
import pl.podwikagrzegorz.gamezone.repository.GameRepository
import pl.podwikagrzegorz.gamezone.repository.UserRepository

@SpringBootApplication
@EnableJpaRepositories(basePackageClasses = [UserRepository::class, GameRepository::class] )
class GamezoneApplication

fun main(args: Array<String>) {
	runApplication<GamezoneApplication>(*args)
}
