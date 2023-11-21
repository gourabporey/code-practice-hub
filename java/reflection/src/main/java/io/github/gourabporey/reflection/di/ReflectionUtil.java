package io.github.gourabporey.reflection.di;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class ReflectionUtil {
  private final BeanReadCache beanReadCache;

  public ReflectionUtil(BeanReadCache beanReadCache) {
    this.beanReadCache = beanReadCache;
  }

  public <T> T createInstanceOf(Class<T> beanClass) throws InvocationTargetException, InstantiationException, IllegalAccessException, BeanCreationException {
    Constructor<?> primaryConstructor = getConstructor(beanClass);
    Class<?>[] constructorArgumentClasses = primaryConstructor.getParameterTypes();
    ArrayList<Object> constructorParams = new ArrayList<>(constructorArgumentClasses.length);

    for (Class<?> argType : constructorArgumentClasses) {
      constructorParams.add(beanReadCache.getBean(argType).getClass());
    }

    Object newInstance = primaryConstructor.newInstance(constructorParams.toArray());
    return(T) newInstance;
  }

  private static <T> Constructor<?> getConstructor(Class<T> beanClass) {
    Constructor<?>[] constructors = beanClass.getConstructors();
    if(constructors.length == 1) {
      return constructors[0];
    }

    List<Constructor<?>> constructorsWithAutowiredAnnotation = new ArrayList<>();
    for (Constructor<?> constructor : constructors) {
      if(constructor.isAnnotationPresent(Autowired.class)) {
        constructorsWithAutowiredAnnotation.add(constructor);
      }
    }

    if(constructorsWithAutowiredAnnotation.size() == 1) return constructorsWithAutowiredAnnotation.get(0);
    throw new RuntimeException("Unable to resolve autowired annotation");
  }

  public <T> void invokePostConstruct(T newInstance) throws InvocationTargetException, IllegalAccessException {
    Method[] methods = newInstance.getClass().getMethods();
    for (Method method : methods) {
      if (method.isAnnotationPresent(PostConstruct.class)) {
        method.invoke(newInstance);
      }
    }
  }
}
