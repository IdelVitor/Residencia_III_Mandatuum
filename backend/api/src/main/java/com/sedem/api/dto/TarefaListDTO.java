// src/main/java/com/sedem/api/dto/TarefaListDTO.java
package com.sedem.api.dto;

import com.sedem.api.models.StatusTarefa;

public record TarefaListDTO(Long id, String titulo, String descricao, StatusTarefa status) {}
