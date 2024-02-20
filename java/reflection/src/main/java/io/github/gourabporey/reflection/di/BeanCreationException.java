package io.github.gourabporey.reflection.di;

public class BeanCreationException extends Throwable {
    public BeanCreationException(String beanClassName, Throwable t) {
        super(String.format("Error creating bean of %s", beanClassName), t);
    }
}
