package com.sedem.api.dto;

import lombok.Data; // Assumindo que usa Lombok, senão crie Getters/Setters

@Data
public class AlterarSenhaDTO {
    private String senhaAtual;
    private String novaSenha;
}