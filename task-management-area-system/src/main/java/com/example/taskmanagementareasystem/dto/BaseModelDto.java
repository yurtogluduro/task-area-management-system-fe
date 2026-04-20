package com.example.taskmanagementareasystem.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public abstract class BaseModelDto {

    private Long id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
