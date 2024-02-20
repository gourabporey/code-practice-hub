package com.step.tw.kotlin.controller

import com.step.tw.kotlin.model.Todo
import com.step.tw.kotlin.model.TodoList
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class TodoListController(val todoList: TodoList) {
  @PostMapping("/todo/create")
  fun add(todo: Todo) {
    this.todoList.addTodo(todo);
  }

  @GetMapping("/todos")
  fun getAllTodos(): Array<out Any> {
    return this.todoList.getAllTodos();
  }
}
