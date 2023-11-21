package io.github.gourabporey.reflection.ticket;

import io.github.gourabporey.reflection.di.Autowired;

public class TicketBookingService {
  private final PaymentService paymentService;
  private final NotificationService notificationService;

//  @Autowired
  public TicketBookingService(PaymentService paymentService, NotificationService notificationService) {
    this.paymentService = paymentService;
    this.notificationService = notificationService;
    System.out.println("Constructor of ticket booking service called");
  }

  public TicketBookingService(PaymentService paymentService) {
    this.paymentService = paymentService;
    this.notificationService = null;
  }

  public void bookTicket() {
    this.paymentService.makePayment();
    this.notificationService.sendBookingNotification();
  }
}
