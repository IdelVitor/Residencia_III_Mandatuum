// src/main/java/com/sedem/api/dto/financeiro/RegistroFinanceiroCreateDTO.java
package com.sedem.api.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import java.math.BigDecimal;
import java.time.LocalDate;

public record RegistroFinanceiroCreateDTO(
        @NotNull LocalDate dataRegistro,

        @PositiveOrZero BigDecimal valorLocacaoImovel,
        @PositiveOrZero BigDecimal valorAssessoriaJuridica,
        @PositiveOrZero BigDecimal valorAssessoriaComunicacao,
        @PositiveOrZero BigDecimal valorCombustivel,
        @PositiveOrZero BigDecimal despesasDebito,
        @PositiveOrZero BigDecimal despesasCredito,
        @PositiveOrZero BigDecimal outrasDespesas,

        @NotNull Long usuarioId // vem do localStorage/front ou do token
) {}
