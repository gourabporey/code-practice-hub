package io.github.gourabporey.collections;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import java.util.Objects;

import static org.junit.jupiter.api.Assertions.*;

class PersonTest {

  @Test
  void testHashCode() {
    int gourabHashCode = Objects.hash(22, "gourab");
    Person gourab = new Person("gourab", 22);
    Assertions.assertEquals(gourabHashCode, gourab.hashCode());
  }

  @Test
  void testToString() {
  }

  @Nested
  class testEquals {
    Person gourab;
    Person sourov;
    Person anotherGourab;

    @BeforeEach
    void setUp() {
      gourab = new Person("gourab", 22);
      anotherGourab = new Person("gourab", 22);
      sourov = new Person("sourov", 22);
    }

    @Test
    void shouldBeEqualForSameReferences() {
      assertTrue(gourab.equals(gourab));
    }

    @Test
    void shouldBeEqualForSameAgeAndName() {
      assertEquals(true, gourab.equals(anotherGourab));
    }

    @Test
    void shouldNotBeEqualForDifferentAgeOrName() {
      assertNotEquals(gourab, sourov);
    }
  }
}