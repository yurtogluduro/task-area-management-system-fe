package com.example.taskmanagementareasystem.mapper;

import com.example.taskmanagementareasystem.dto.TaskAreaCoordinateDto;
import com.example.taskmanagementareasystem.entity.TaskAreaCoordinateEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TaskAreaCoordinateMapper extends BaseMapper<TaskAreaCoordinateDto, TaskAreaCoordinateEntity> {
}