package com.step.tw.kotlin

fun main() {
    val provider = BasicInfoProvider()
    val provider2 = SomeInfoProvider()

    provider.printInfo(Person())
    provider.getSessionId()

}

fun checkTypes(provider: PersonInfoProvider) {
    if(provider is SessionInfoProvider) {
        println("Session Info Provider")
    }
}
