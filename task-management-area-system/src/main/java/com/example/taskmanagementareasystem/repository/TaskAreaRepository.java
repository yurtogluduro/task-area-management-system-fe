package com.example.taskmanagementareasystem.repository;

import com.example.taskmanagementareasystem.entity.TaskAreaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskAreaRepository extends JpaRepository<TaskAreaEntity, Long> {
}
