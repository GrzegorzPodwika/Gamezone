package pl.podwikagrzegorz.gamezone.security

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.web.cors.CorsConfiguration
import pl.podwikagrzegorz.gamezone.model.Role


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
            .cors().disable()
            .authorizeRequests()
                .antMatchers(HttpMethod.OPTIONS,"/**").permitAll()
                .antMatchers("/", "/logout", "/register", "/getAllGames", "/login").permitAll()
                .antMatchers("/deleteUser", "/getUsers", "/addGame", "/editGame", "/deleteGame").hasAuthority(Role.ADMIN)
                .anyRequest().authenticated()
            .and()
            .logout()
            .and()
            .httpBasic()

        http.csrf().disable()
    }

    override fun configure(auth: AuthenticationManagerBuilder) {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder)
    }
}

