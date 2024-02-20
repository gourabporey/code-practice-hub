package io.github.gourabporey.reflection.di;

import org.burningwave.core.assembler.ComponentContainer;
import org.burningwave.core.classes.ClassCriteria;
import org.burningwave.core.classes.ClassHunter;
import org.burningwave.core.classes.SearchConfig;

import java.util.Collection;
import java.util.HashMap;

public class ApplicationContext implements BeanReadCache {
    private static ApplicationContext applicationContext;
    private final HashMap<Class<?>, Object> beanCache;
    private final ReflectionUtil reflectionUtil;

    private ApplicationContext() {
        this.beanCache = new HashMap<>();
        this.reflectionUtil = new ReflectionUtil(this);
    }

    public static ApplicationContext init(Class<?> mainClass) throws BeanCreationException {
        if (ApplicationContext.applicationContext == null) {
            ApplicationContext applicationContext = new ApplicationContext();
            ApplicationContext.applicationContext = applicationContext;
            applicationContext.createComponents(mainClass);
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
            throw new BeanCreationException(beanClass.getName(), t);
        }
    }

    private void createComponents(Class<?> mainClass) throws BeanCreationException {
        String mainClassPackageName = mainClass.getPackageName();
        ComponentContainer componentContainer = ComponentContainer.getInstance();
        ClassHunter classHunter = componentContainer.getClassHunter();
        ClassCriteria componentAnnotationCriteria = ClassCriteria
                .create()
                .allThoseThatMatch(cls -> cls.isAnnotationPresent(Component.class));
        SearchConfig searchConfig = SearchConfig
                .forResources(mainClassPackageName.replaceAll("\\.", "/"))
                .by(componentAnnotationCriteria);
        ClassHunter.SearchResult searchResult = classHunter.findBy(searchConfig);
        Collection<Class<?>> componentClasses = searchResult.getClasses();

        for (Class<?> componentClass : componentClasses) {
            getBean(componentClass);
        }
    }
}