package com.example.taskmanagementareasystem.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaskAreaCoordinateDto extends BaseModelDto{

    public TaskAreaCoordinateDto(){
        super();
    }
    private Double latitude;
    private Double longitude;
    private Double altitude;
    private Integer orderIndex;
}
