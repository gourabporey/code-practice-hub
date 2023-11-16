package com.step.tw.kotlin

import com.step.tw.kotlin.repository.DBClient

fun main() {
    TicketBookingService(BookingRepository(DBClient()), PaymentService(DBClient(), NotificationService(DBClient())))
}
