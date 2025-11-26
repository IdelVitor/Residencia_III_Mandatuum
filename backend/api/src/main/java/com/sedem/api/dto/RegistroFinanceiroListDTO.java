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
) {
    public BigDecimal total() {
        return zeroIfNull(valorLocacaoImovel)
                .add(zeroIfNull(valorAssessoriaJuridica))
                .add(zeroIfNull(valorAssessoriaComunicacao))
                .add(zeroIfNull(valorCombustivel))
                .add(zeroIfNull(despesasDebito))
                .add(zeroIfNull(despesasCredito))
                .add(zeroIfNull(outrasDespesas));
    }

    // Auxiliar para evitar erro se o valor for nulo
    private BigDecimal zeroIfNull(BigDecimal val) {
        return val == null ? BigDecimal.ZERO : val;
    }
}