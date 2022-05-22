package pl.podwikagrzegorz.gamezone.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import pl.podwikagrzegorz.gamezone.model.Game

@Repository
interface GameRepository: JpaRepository<Game, Long>