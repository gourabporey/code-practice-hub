package io.github.gourabporey.reflection.ticket;

import io.github.gourabporey.reflection.di.Component;
import io.github.gourabporey.reflection.di.PostConstruct;

@Component
public class NotificationService {
  @PostConstruct
  public void startNotificationService() {
    System.out.println("Started notification service");
  }

  public void sendBookingNotification() {
    System.out.println("Sending booking notification...");
  }
}