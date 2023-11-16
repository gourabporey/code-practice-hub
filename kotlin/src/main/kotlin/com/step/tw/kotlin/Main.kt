package com.step.tw.kotlin

fun main() {

}

fun checkTypes(provider: PersonInfoProvider) {
    if(provider is SessionInfoProvider) {
        println("Session Info Provider")
    }
}
