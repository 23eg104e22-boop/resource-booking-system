package com.example.demo.controller;

import com.example.demo.entity.Booking;
import com.example.demo.entity.Resource;
import com.example.demo.repository.BookingRepository;
import com.example.demo.repository.ResourceRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/booking")
@CrossOrigin(origins = "*")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private ResourceRepository resourceRepository;

    // ✅ Add Resource
    @PostMapping("/addResource")
    public Resource addResource(@RequestBody Resource resource) {
        return resourceRepository.save(resource);
    }

    // ✅ Create Booking
    @PostMapping("/create")
    public Booking createBooking(@RequestBody Booking booking) {
        booking.setStatus("CONFIRMED"); // auto set status
        return bookingRepository.save(booking);
    }

    // ✅ Get All Bookings
    @GetMapping("/all")
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
}
