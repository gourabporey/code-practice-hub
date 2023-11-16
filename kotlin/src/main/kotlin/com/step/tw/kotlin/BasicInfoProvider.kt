package com.step.tw.kotlin

class BasicInfoProvider: PersonInfoProvider, SessionInfoProvider {
  override fun printInfo(person: Person) {
    person.printInfo()
  }

  override fun getSessionId(): String {
    return "00001"
  }
}
