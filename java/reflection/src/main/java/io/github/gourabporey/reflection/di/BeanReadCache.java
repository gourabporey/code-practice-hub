package io.github.gourabporey.reflection.di;

import java.lang.reflect.InvocationTargetException;

public interface BeanReadCache {
    @SuppressWarnings("unchecked")
    <T> T getBean(Class<T> beanClass) throws InstantiationException, IllegalAccessException, IllegalArgumentException, InvocationTargetException, BeanCreationException;
}
