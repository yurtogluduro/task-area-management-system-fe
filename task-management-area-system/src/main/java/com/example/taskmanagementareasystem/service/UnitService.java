package com.example.taskmanagementareasystem.service;

import com.example.taskmanagementareasystem.dto.UnitDto;

import java.util.List;

public interface UnitService {
    UnitDto save(UnitDto unitDtoModel);

    List<UnitDto> getAllTasks();
}
