package com.example.taskmanagementareasystem.service;

import com.example.taskmanagementareasystem.dto.TaskAreaDto;

import java.util.List;

public interface TaskAreaService {
    TaskAreaDto save(TaskAreaDto taskAreaDto);

    List<TaskAreaDto> getAllTasks();
}
