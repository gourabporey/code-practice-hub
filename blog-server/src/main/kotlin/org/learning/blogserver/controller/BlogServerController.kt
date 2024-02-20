package org.learning.blogserver.controller

import org.springframework.http.MediaType
import org.springframework.http.MediaType.*
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Flux
import java.net.URI
import java.time.Duration
import kotlin.time.DurationUnit
import kotlin.time.DurationUnit.*

data class Greeting(val message: String)
data class Blog(val content: String)

@RestController
class BlogServerController() {
  private final val blogs: ArrayList<Blog>  = ArrayList<Blog>()

  @GetMapping("/")
  fun serveHomePage(): ResponseEntity<Greeting> {
    return ResponseEntity.ok().body(Greeting("Hello world"))
  }

  @PostMapping("/blog")
  fun createBlog(@RequestBody blog: Blog): ResponseEntity<Blog> {
    this.blogs.add(blog)
    return ResponseEntity.created(URI.create("/blog")).body(blog);
  }

  @GetMapping(value = ["/blogs"], produces = ["application/json; stream=true"],)
  fun getAllBlogs(): Flux<Any> {
    return Flux.just(*this.blogs.toArray()).delayElements(Duration.ofSeconds(2))
  }
}