// src/main/java/com/sedem/api/dto/financeiro/RegistroFinanceiroListDTO.java
package com.sedem.api.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public record RegistroFinanceiroListDTO(
        Long id,
        LocalDate dataRegistro,
        BigDecimal valorLocacaoImovel,
        BigDecimal valorAssessoriaJuridica,
        BigDecimal valorAssessoriaComunicacao,
        BigDecimal valorCombustivel,
        BigDecimal despesasDebito,
        BigDecimal despesasCredito,
        BigDecimal outrasDespesas
) {}
