package com.rentify.rentify;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class RentifyApplication {

	public static void main(String[] args) {
		SpringApplication.run(RentifyApplication.class, args);
	}
}




