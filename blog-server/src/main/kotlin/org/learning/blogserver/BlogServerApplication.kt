package org.learning.blogserver

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class BlogServerApplication

fun main(args: Array<String>) {
  runApplication<BlogServerApplication>(*args)
}
