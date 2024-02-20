package io.github.gourabporey.reflection.ticket;

import io.github.gourabporey.reflection.di.Component;

@Component
public class PaymentService {
  public void makePayment() {
    System.out.println("Completing payment");
  }
}
