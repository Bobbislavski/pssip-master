package com.rentify.rentify.service;

import com.rentify.rentify.repository.BookingRepository;
import com.rentify.rentify.repository.Bookings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class BookingService {
    private final BookingRepository bookingRepository;

    @Autowired
    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    public List<Bookings> findAll() {
        return bookingRepository.findAll();
    }

    public long count() {
        return bookingRepository.count();
    }

    public double calculateTotalRevenue() {
        List<Bookings> bookings = bookingRepository.findAll();
        return bookings.stream()
                .filter(booking -> booking.getProperty() != null)
                .mapToDouble(booking -> booking.getProperty().getPrice())
                .sum();
    }
}