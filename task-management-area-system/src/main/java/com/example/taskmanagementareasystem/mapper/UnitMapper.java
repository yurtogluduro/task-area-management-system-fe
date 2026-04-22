package com.example.taskmanagementareasystem.mapper;

import com.example.taskmanagementareasystem.dto.UnitDto;
import com.example.taskmanagementareasystem.entity.UnitEntity;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring",uses = {UnitPositionMapper.class})
public interface UnitMapper extends BaseMapper<UnitDto, UnitEntity>{

    @AfterMapping
    default void linkCoordinates(@MappingTarget UnitEntity unit) {
        if (unit.getUnitPositions() != null) {
            unit.getUnitPositions().forEach(coordinate -> coordinate.setUnit(unit));
        }
    }

}
