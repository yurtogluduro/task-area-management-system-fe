package com.example.taskmanagementareasystem.service;

import com.example.taskmanagementareasystem.dto.UnitDto;
import com.example.taskmanagementareasystem.mapper.UnitMapper;
import com.example.taskmanagementareasystem.repository.UnitRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UnitServiceImpl implements UnitService{

    private final UnitRepository unitRepository;
    private final UnitMapper unitMapper;

    public UnitServiceImpl(UnitRepository unitRepository, UnitMapper unitMapper){
        this.unitRepository = unitRepository;
        this.unitMapper = unitMapper;
    }

    @Override
    public UnitDto save(UnitDto unitDtoModel){
        return unitMapper.toDto(unitRepository.save(unitMapper.toEntity(unitDtoModel)));
    }

    @Override
    public List<UnitDto> getAllTasks(){
        return unitMapper.toDtoList(unitRepository.findAll());
    }

}
