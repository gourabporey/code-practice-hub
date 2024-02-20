package org.learning.blogserver.controller

import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.test.web.reactive.server.WebTestClient

@SpringBootTest
@AutoConfigureWebTestClient
class BlogServerControllerTest ( @Autowired private val webTestClient: WebTestClient) {
  @Test
  fun `should serve the homepage`() {
    webTestClient.get().uri("/")
      .accept(MediaType.APPLICATION_JSON)
      .exchange()
  }

  @Test
  fun `POST blog should create a new blog`() {
    webTestClient.post().uri("/blog").bodyValue(hashMapOf("content" to "blog post"))
      .accept(MediaType.APPLICATION_JSON)
      .exchange()
      .expectStatus()
      .isCreated()
  }

  @Test
  fun `should get all blogs in a stream`() {

  }
}