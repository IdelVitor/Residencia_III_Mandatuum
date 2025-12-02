package com.sedem.api.dto;

import java.util.List;

public class DashboardDTO {
    private List<ChartDataDTO> tasksByStatus;
    private List<ChartDataDTO> tasksByResponsible;
    // Adicione outros campos conforme a necessidade (ex: financeiro)

    // Construtor, Getters e Setters
    public DashboardDTO(List<ChartDataDTO> tasksByStatus, List<ChartDataDTO> tasksByResponsible) {
        this.tasksByStatus = tasksByStatus;
        this.tasksByResponsible = tasksByResponsible;
    }

    public List<ChartDataDTO> getTasksByStatus() { return tasksByStatus; }
    public List<ChartDataDTO> getTasksByResponsible() { return tasksByResponsible; }
}