package io.github.gourabporey.reflection.di;

import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.Optional;

public class ApplicationContext implements BeanReadCache {
  private static ApplicationContext applicationContext;
  private final HashMap<Class<?>, Object> beanCache;
  private final ReflectionUtil reflectionUtil;

  private ApplicationContext() {
    this.beanCache = new HashMap<>();
    this.reflectionUtil = new ReflectionUtil(this);
  }

  public static ApplicationContext init() {
    if (ApplicationContext.applicationContext == null) {
      ApplicationContext.applicationContext = new ApplicationContext();
    }

    return ApplicationContext.applicationContext;
  }

  @SuppressWarnings("unchecked")
  @Override
  public <T> T getBean(Class<T> beanClass) throws BeanCreationException {
    if (this.beanCache.containsKey(beanClass)) {
      return (T) this.beanCache.get(beanClass);
    }

    try {
      T newInstance = this.reflectionUtil.createInstanceOf(beanClass);
      this.reflectionUtil.invokePostConstruct(newInstance);
      this.beanCache.put(beanClass, newInstance);

      return newInstance;
    } catch (Exception t) {
      t.printStackTrace();
      throw new BeanCreationException(beanClass.getName(), t);
    }
  }
}