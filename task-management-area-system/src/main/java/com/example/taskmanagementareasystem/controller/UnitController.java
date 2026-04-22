package com.example.taskmanagementareasystem.controller;

import com.example.taskmanagementareasystem.dto.TaskAreaDto;
import com.example.taskmanagementareasystem.dto.UnitDto;
import com.example.taskmanagementareasystem.service.UnitService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/unit")
@CrossOrigin(origins = "http://localhost:3000")
public class UnitController {

    private final UnitService service;

    public UnitController(UnitService service){
        this.service = service;
    }

    @PostMapping("/save")
    public ResponseEntity<UnitDto> create(@RequestBody @Valid UnitDto unitDto) {
        return new ResponseEntity<>(service.save(unitDto), HttpStatus.CREATED);
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<UnitDto>> getAll() {
        return ResponseEntity.ok(service.getAllTasks());
    }

}
