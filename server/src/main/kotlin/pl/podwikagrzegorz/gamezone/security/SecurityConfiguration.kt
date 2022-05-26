package pl.podwikagrzegorz.gamezone.security

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.Customizer
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.CorsConfigurationSource
import org.springframework.web.cors.UrlBasedCorsConfigurationSource
import pl.podwikagrzegorz.gamezone.model.Role
import java.util.*


@Configuration
@EnableWebSecurity
class SecurityConfiguration: WebSecurityConfigurerAdapter() {

    @Autowired
    lateinit var passwordEncoder: PasswordEncoder

    @Qualifier("userService")
    @Autowired
    lateinit var userDetailsService: UserDetailsService

    override fun configure(http: HttpSecurity) {
        http
            .cors().configurationSource{ CorsConfiguration().applyPermitDefaultValues()}
                .and()
            .csrf().disable()
            .authorizeRequests()
                .antMatchers("/", "/logout", "/register", "/getAllGames", "/login").permitAll()
                .antMatchers("/deleteUser", "/getUsers", "/addGame", "/editGame", "/deleteGame").hasRole(Role.ADMIN)
                .anyRequest().authenticated()
                .and()
            .formLogin(Customizer.withDefaults())
            .httpBasic()

    }

    override fun configure(auth: AuthenticationManagerBuilder) {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder)
    }

    @Bean
    fun corsConfigurationSource(): CorsConfigurationSource {
        val configuration = CorsConfiguration()
        configuration.allowedOrigins = listOf("*")
        configuration.allowedMethods = listOf("GET", "POST", "OPTIONS", "DELETE", "PUT", "PATCH")
        configuration.allowedHeaders = listOf("X-Requested-With", "Origin", "Content-Type", "Accept", "Authorization")
        configuration.allowCredentials = false
        val source = UrlBasedCorsConfigurationSource()
        source.registerCorsConfiguration("/**", configuration)
        return source
    }
}