package com.sedem.api.repositories;

import com.sedem.api.dto.ChartDataDTO;
import com.sedem.api.models.Tarefa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TarefaRepository extends JpaRepository<Tarefa, Long> {

    Optional<Tarefa> findById(Long id);
    List<Tarefa> findAll();
    void deleteById(Long id);

    // --- CORREÇÃO 1: Adicionamos CAST(... AS string) ---
    // Isso resolve o erro "Missing constructor", pois agora enviamos String, não Enum.
    @Query("SELECT new com.sedem.api.dto.ChartDataDTO(CAST(t.status AS string), COUNT(t)) " +
            "FROM Tarefa t " +
            "GROUP BY t.status")
    List<ChartDataDTO> countTotalByStatus();

    // --- CORREÇÃO 2: Mantemos o responsável que já é String ---
    @Query("SELECT new com.sedem.api.dto.ChartDataDTO(t.responsavel, COUNT(t)) " +
            "FROM Tarefa t " +
            "WHERE t.responsavel IS NOT NULL " +
            "GROUP BY t.responsavel")
    List<ChartDataDTO> countTotalByResponsible();
}