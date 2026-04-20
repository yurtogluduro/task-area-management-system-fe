package com.example.taskmanagementareasystem.common;

public enum TaskAreaTypeEnum {

    INTELLIGENCE("İstihbarat"),
    SURVEILLANCE("Gözetleme"),
    INTERVENTION("Müdahale"),
    PATROL("Devriye"),
    EMERGENCY("Acil Durum");

    private final String label;

    TaskAreaTypeEnum(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }

}
