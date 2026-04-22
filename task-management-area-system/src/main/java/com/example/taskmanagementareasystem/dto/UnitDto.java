package com.example.taskmanagementareasystem.dto;

import jakarta.validation.constraints.NotBlank;

import java.util.ArrayList;
import java.util.List;

public class UnitDto extends BaseModelDto{

    private Long id;
    @NotBlank(message = "Birim adı boş olamaz")
    private String name;
    @NotBlank(message = "Hız bilgisi boş olamaz")
    private String speed;
    @NotBlank(message = "Açı bilgisi boş olamaz")
    private String course;
    private List<UnitPositionDto> unitPositions;

    @Override
    public Long getId() {
        return id;
    }

    @Override
    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSpeed() {
        return speed;
    }

    public void setSpeed(String speed) {
        this.speed = speed;
    }

    public String getCourse() {
        return course;
    }

    public void setCourse(String course) {
        this.course = course;
    }

    public List<UnitPositionDto> getUnitPositions() {
        return unitPositions;
    }

    public void setUnitPositions(List<UnitPositionDto> unitPositions) {
        this.unitPositions = unitPositions;
    }
}
