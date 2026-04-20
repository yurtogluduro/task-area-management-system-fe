package com.example.taskmanagementareasystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class TaskManagementAreaSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(TaskManagementAreaSystemApplication.class, args);
	}

}
