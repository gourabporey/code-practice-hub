package io.github.gourabporey.collections;

import java.util.Objects;

public class Person {
  final int age;
  final String name;

  public Person(String name, int age) {
    this.age = age;
    this.name = name;
  }

  @Override
  public int hashCode() {
    return Objects.hash(age, name);
  }

  @Override
  public boolean equals(Object obj) {
    if (obj == this) return true;
    if (obj == null) return false;
    if (!(obj instanceof Person)) return false;

    Person other = (Person) obj;

    return this.age == other.age && this.name.equals(other.name);
  }

  @Override
  public String toString() {
    return "Intern {" +
        "name='" + name + '\'' +
        ", age=" + age +
        '}';
  }
}
