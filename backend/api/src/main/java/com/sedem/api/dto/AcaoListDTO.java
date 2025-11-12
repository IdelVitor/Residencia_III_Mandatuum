package com.sedem.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AcaoListDTO {
    private Long id;
    private String titulo;
    private String descricao;
    private String cidade;
    private String bairro;
}
