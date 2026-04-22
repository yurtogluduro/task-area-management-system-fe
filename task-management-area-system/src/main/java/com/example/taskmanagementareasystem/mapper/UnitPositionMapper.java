package com.example.taskmanagementareasystem.mapper;

import com.example.taskmanagementareasystem.dto.UnitPositionDto;
import com.example.taskmanagementareasystem.entity.UnitPositionEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UnitPositionMapper extends BaseMapper<UnitPositionDto, UnitPositionEntity>{

}
