package com.sedem.api.repositories;

import com.sedem.api.models.Contato;
import com.sedem.api.models.Tarefa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TarefaRepository extends JpaRepository<Tarefa, Long> {
    Optional<Tarefa> findById(Long id);

    List<Tarefa> findAll();

    void deleteById(Long id);
}
