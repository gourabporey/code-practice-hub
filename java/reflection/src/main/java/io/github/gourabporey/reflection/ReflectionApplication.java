package io.github.gourabporey.reflection;

import io.github.gourabporey.reflection.di.ApplicationContext;
import io.github.gourabporey.reflection.di.BeanCreationException;
import io.github.gourabporey.reflection.ticket.NotificationService;
import io.github.gourabporey.reflection.ticket.PaymentService;

import java.lang.reflect.InvocationTargetException;
import java.util.Optional;

public class ReflectionApplication {
  public static void main(String[] args) throws BeanCreationException {
    ApplicationContext applicationContext = ApplicationContext.init();

    NotificationService notificationService = applicationContext.getBean(NotificationService.class);
    PaymentService paymentService = applicationContext.getBean(PaymentService.class);

    notificationService.sendBookingNotification();
    paymentService.makePayment();
  }
}
