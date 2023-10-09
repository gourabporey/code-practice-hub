package io.github.gourabporey.exceptions;

public class StackOverflowException extends Throwable {
  public StackOverflowException(Object element) {
    super("StackOverflowException: Unable to push " + element);
  }
}
