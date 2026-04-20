package com.example.taskmanagementareasystem.dto;

import com.example.taskmanagementareasystem.common.TaskAreaTypeEnum;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Getter
@Setter
public class TaskAreaDto extends BaseModelDto{

    public TaskAreaDto(){
        super();
    }
    @NotBlank(message = "Görev adı boş olamaz")
    private String taskName;
    private String description;
    private List<TaskAreaCoordinateDto> coordinates;
    @NotNull(message = "Alan tipi seçilmelidir")
    private TaskAreaTypeEnum areaType;
    @NotNull(message = "Başlangıç tarihi zorunludur")
    private LocalDateTime startDate;
    @NotNull(message = "Bitiş tarihi zorunludur")
    private LocalDateTime endDate;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public String getTaskName() {
        return taskName;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<TaskAreaCoordinateDto> getCoordinates() {
        return coordinates;
    }

    public void setCoordinates(List<TaskAreaCoordinateDto> coordinates) {
        this.coordinates = coordinates;
    }

    public TaskAreaTypeEnum getAreaType() {
        return areaType;
    }

    public void setAreaType(TaskAreaTypeEnum areaType) {
        this.areaType = areaType;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public LocalDateTime getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDateTime startDate) {
        this.startDate = startDate;
    }

    public LocalDateTime getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDateTime endDate) {
        this.endDate = endDate;
    }
}
