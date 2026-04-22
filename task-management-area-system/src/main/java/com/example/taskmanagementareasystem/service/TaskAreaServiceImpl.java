package com.example.taskmanagementareasystem.service;

import com.example.taskmanagementareasystem.dto.TaskAreaDto;
import com.example.taskmanagementareasystem.mapper.TaskAreaMapper;
import com.example.taskmanagementareasystem.repository.TaskAreaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskAreaServiceImpl implements TaskAreaService{

    private final TaskAreaRepository taskAreaRepository;
    private final TaskAreaMapper mapper;
    TaskAreaServiceImpl(TaskAreaRepository taskAreaRepository, TaskAreaMapper mapper){
        this.taskAreaRepository = taskAreaRepository;
        this.mapper = mapper;
    }

    @Override
    public TaskAreaDto save(TaskAreaDto taskAreaDto){
        if(taskAreaDto.getStartDate().isAfter(taskAreaDto.getEndDate())){
            throw new RuntimeException("Bitiş tarihi başlangıç tarihinden önce olamaz!");
        }
        if (taskAreaDto.getCoordinates() == null && taskAreaDto.getCoordinates().size() < 3){
            throw new RuntimeException("En az üç koordinat noktası girilmelidir!");
        }
       return mapper.toDto(taskAreaRepository.save(mapper.toEntity(taskAreaDto)));
    }

    @Override
    public List<TaskAreaDto> getAllTasks(){
        return mapper.toDtoList(taskAreaRepository.findAll());
    }

}
