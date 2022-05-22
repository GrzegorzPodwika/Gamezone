package pl.podwikagrzegorz.gamezone.model

data class FilterParams(
    val title: String? = null,
    val type: String? = null,
    val platform: String? = null,
    val dateFrom: String? = null,
    val dateTo: String? = null
)
