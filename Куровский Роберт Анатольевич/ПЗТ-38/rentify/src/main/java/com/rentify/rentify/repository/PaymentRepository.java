package com.rentify.rentify.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.math.BigDecimal;

@Repository
public interface PaymentRepository extends JpaRepository<Payments, Long> {
    @Query("SELECT COALESCE(SUM(p.amount), 0) FROM Payments p WHERE p.paymentStatus = 'COMPLETED'")
    BigDecimal sumTotalRevenue();
}