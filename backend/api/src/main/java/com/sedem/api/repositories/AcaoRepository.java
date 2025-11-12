package com.sedem.api.repositories;

import com.sedem.api.models.Acao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface AcaoRepository extends JpaRepository<Acao, Long> {

    // 🔹 Contagem simples por bairro (já existente)
    @Query("SELECT a.bairro AS bairro, COUNT(a) AS qtd FROM Acao a GROUP BY a.bairro")
    List<Map<String, Object>> countByBairro();

    // 🔹 Novo: agrupamento por cidade e bairro
    @Query("SELECT a.cidade AS cidade, a.bairro AS bairro, COUNT(a) AS quantidade " +
            "FROM Acao a " +
            "WHERE a.cidade IS NOT NULL AND a.bairro IS NOT NULL " +
            "GROUP BY a.cidade, a.bairro " +
            "ORDER BY a.cidade ASC, a.bairro ASC")
    List<Map<String, Object>> contarPorCidadeEBairro();
}
