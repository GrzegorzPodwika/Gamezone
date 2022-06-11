package pl.podwikagrzegorz.gamezone.model

import com.fasterxml.jackson.annotation.JsonProperty
import javax.validation.constraints.NotBlank

data class GameDTO(
    @field:NotBlank @JsonProperty("title")
    val title: String,
    @field:NotBlank @JsonProperty("type")
    val type: String,
    @field:NotBlank @JsonProperty("platform")
    val platform: String,
    @field:NotBlank @JsonProperty("date")
    val date: String,
    val url: String? = null
)
