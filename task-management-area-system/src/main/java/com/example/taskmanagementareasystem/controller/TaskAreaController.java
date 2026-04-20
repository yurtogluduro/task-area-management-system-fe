package com.example.taskmanagementareasystem.controller;

import com.example.taskmanagementareasystem.dto.TaskAreaDto;
import com.example.taskmanagementareasystem.service.TaskAreaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/taskArea")
@CrossOrigin(origins = "http://localhost:3000")
public class TaskAreaController {

    private final TaskAreaService taskAreaService;

    public TaskAreaController(TaskAreaService taskAreaService) {
        this.taskAreaService = taskAreaService;
    }

    @PostMapping
    public ResponseEntity<TaskAreaDto> create(@RequestBody @Valid TaskAreaDto taskAreaDto) {
        TaskAreaDto savedTask = taskAreaService.save(taskAreaDto);
        return new ResponseEntity<>(savedTask, HttpStatus.CREATED);
    }


    @GetMapping
    public ResponseEntity<List<TaskAreaDto>> getAll() {
        return ResponseEntity.ok(taskAreaService.getAllTasks());
    }
    /*
    @GetMapping("/{id}")
    public ResponseEntity<TaskAreaDto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(taskAreaService.getById(id));
    }
    */
}