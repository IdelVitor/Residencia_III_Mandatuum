// src/main/java/com/sedem/api/dto/AcaoListDTO.java
package com.sedem.api.dto;

import java.time.LocalDateTime;
public record AcaoListDTO(Long id, String titulo, String descricao,
                          String tipo, LocalDateTime data,
                          String cidade, String bairro) {}
