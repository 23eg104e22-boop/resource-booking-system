
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ResourceBookingSystemApplication {

    public static void main(String[] args) {

        // IMPORTANT: Railway PORT fix
        String port = System.getenv("PORT");
        if (port != null) {
            System.setProperty("server.port", port);
        }

        SpringApplication.run(ResourceBookingSystemApplication.class, args);
    }
}


