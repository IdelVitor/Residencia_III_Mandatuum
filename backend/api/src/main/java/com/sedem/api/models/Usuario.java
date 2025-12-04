package com.sedem.api.models;

import com.fasterxml.jackson.annotation.JsonIgnore; // <--- Importante
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false, name = "senha_hash")
    private String senhaHash;

    @Enumerated(EnumType.STRING)
    private Role role = Role.USER;

    @Column(name = "criado_em")
    private LocalDateTime criadoEm = LocalDateTime.now();

    @Column(name = "atualizado_em")
    private LocalDateTime atualizadoEm;

    @PrePersist
    public void prePersist() {
        if (this.atualizadoEm == null) {
            this.atualizadoEm = LocalDateTime.now();
        }
    }

    @PreUpdate
    public void preUpdate() {
        this.atualizadoEm = LocalDateTime.now();
    }

    // --- RELACIONAMENTOS ---
    // @JsonIgnore evita que o Java tente serializar tudo isso ao listar usuários,
    // prevenindo erros de memória e loop infinito.

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Acao> acoes;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Contato> contatos;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Tarefa> tarefas;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<CoordenadaBairro> coordenadasBairros;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<RegistroFinanceiro> registrosFinanceiros;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<UserPermission> userPermissions;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<UserAccessLog> userAccessLogs;
}