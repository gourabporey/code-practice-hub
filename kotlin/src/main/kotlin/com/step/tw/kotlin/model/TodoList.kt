package com.step.tw.kotlin.model

import java.util.*

class TodoList {
    private val todos: LinkedList<Todo> = LinkedList()
    fun addTodo(todo: Todo) {
        this.todos.add(todo)
    }

    fun getAllTodos(): Array<out Any> {
        return this.todos.toArray()
    }
}
