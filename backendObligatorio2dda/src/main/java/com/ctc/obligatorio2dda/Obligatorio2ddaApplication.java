package com.ctc.obligatorio2dda;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.ctc.obligatorio2dda."})
public class Obligatorio2ddaApplication {
	public static void main(String[] args) {
		SpringApplication.run(Obligatorio2ddaApplication.class, args);
	}

}
