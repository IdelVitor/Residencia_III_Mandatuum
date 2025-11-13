package com.sedem.api.models;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "registros_financeiros")
public class RegistroFinanceiro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @Column(name = "data_registro")
    private LocalDateTime dataRegistro;

    @Column(name = "valor_locacao_imovel", precision = 18, scale = 2)
    private BigDecimal valorLocacaoImovel;

    @Column(name = "valor_assessoria_juridica", precision = 18, scale = 2)
    private BigDecimal valorAssessoriaJuridica;

    @Column(name = "valor_assessoria_comunicacao", precision = 18, scale = 2)
    private BigDecimal valorAssessoriaComunicacao;

    @Column(name = "valor_combustivel", precision = 18, scale = 2)
    private BigDecimal valorCombustivel;

    @Column(name = "despesas_debito", precision = 18, scale = 2)
    private BigDecimal despesasDebito;

    @Column(name = "despesas_credito", precision = 18, scale = 2)
    private BigDecimal despesasCredito;

    @Column(name = "outras_despesas", precision = 18, scale = 2)
    private BigDecimal outrasDespesas;

//    private LocalDateTime data;
//    private String descricao;
//    private String tipo;
//    private String categoria;
//
//    private BigDecimal valor;

    @Column(name = "criado_em")
    private LocalDateTime criadoEm = LocalDateTime.now();
}
