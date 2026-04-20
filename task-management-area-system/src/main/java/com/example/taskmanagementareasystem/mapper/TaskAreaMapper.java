package com.example.taskmanagementareasystem.mapper;

import com.example.taskmanagementareasystem.dto.TaskAreaDto;
import com.example.taskmanagementareasystem.entity.TaskAreaEntity;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring", uses = {TaskAreaCoordinateMapper.class})
public interface TaskAreaMapper extends BaseMapper<TaskAreaDto, TaskAreaEntity>{

    @AfterMapping
    default void linkCoordinates(@MappingTarget TaskAreaEntity taskArea) {
        if (taskArea.getCoordinates() != null) {
            taskArea.getCoordinates().forEach(coordinate -> coordinate.setTaskArea(taskArea));
        }
    }
}
