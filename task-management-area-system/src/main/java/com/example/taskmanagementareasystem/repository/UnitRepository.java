package com.example.taskmanagementareasystem.repository;

import com.example.taskmanagementareasystem.entity.UnitEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UnitRepository extends JpaRepository<UnitEntity, Long> {
}
