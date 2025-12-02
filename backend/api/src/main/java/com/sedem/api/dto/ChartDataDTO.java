package com.sedem.api.dto;

public class ChartDataDTO {
    private String name;
    private Long value;

    // CONSTRUTOR PADRONIZADO PARA STRING
    public ChartDataDTO(String name, Long value) {
        this.name = name;
        this.value = value;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Long getValue() { return value; }
    public void setValue(Long value) { this.value = value; }
}