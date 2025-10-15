package com.sedem.api.models;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "contatos")
public class Contato {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    private String nomeCompleto;
    private Integer idade;

    private String email;
    private String celular;
    private String endereco;
    private String escolaridade;
    private String assessor;
    private String assunto;
    private String observacao;
    private String cidade;
    private String bairro;
    private String tag;

    @Enumerated(EnumType.STRING)
    private Sexo sexo;

    @Column(name = "tag_equipe")
    private String tagEquipe;

    private Double latitude;
    private Double longitude;

    @Column(name = "criado_em")
    private LocalDateTime criadoEm = LocalDateTime.now();

    // Relações
    @OneToMany(mappedBy = "contato", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Tarefa> tarefas;

    @OneToMany(mappedBy = "contato", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Acao> acoes;
}
