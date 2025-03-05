package com.rentify.rentify.service;

import com.rentify.rentify.repository.PaymentRepository;
import com.rentify.rentify.repository.Payments;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class PaymentService {
    private final PaymentRepository paymentRepository;

    public PaymentService(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    public List<Payments> getAllPayments() {
        return paymentRepository.findAll();
    }

    public BigDecimal sumTotalRevenue() {
        return paymentRepository.sumTotalRevenue();
    }
}
