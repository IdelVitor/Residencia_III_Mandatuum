package com.sedem.api.services;

import com.sedem.api.dto.ChartDataDTO;    // <--- NOVO IMPORT
import com.sedem.api.dto.DashboardDTO;   // <--- NOVO IMPORT
import com.sedem.api.models.StatusTarefa;
import com.sedem.api.models.Tarefa;
import com.sedem.api.dto.TarefaListDTO;
import com.sedem.api.repositories.TarefaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TarefaService {

    @Autowired
    private TarefaRepository tarefaRepository;

    // ... seus métodos existentes ...

    public Tarefa create(Tarefa tarefa) {
        return tarefaRepository.save(tarefa);
    }

    public List<Tarefa> findAll() {
        return tarefaRepository.findAll();
    }

    public Optional<Tarefa> findById(Long id) {
        return tarefaRepository.findById(id);
    }

    public List<TarefaListDTO> listLite() {
        return tarefaRepository.findAll().stream()
                .map(t -> new TarefaListDTO(t.getId(), t.getTitulo(), t.getDescricao(), t.getStatus()))
                .toList();
    }

    public Tarefa update(Long id, Tarefa tarefaAtualizada) {
        return tarefaRepository.findById(id).map(tarefa -> {
            tarefa.setTitulo(tarefaAtualizada.getTitulo());
            tarefa.setDescricao(tarefaAtualizada.getDescricao());
            tarefa.setStatus(tarefaAtualizada.getStatus());
            tarefa.setPrioridade(tarefaAtualizada.getPrioridade());
            tarefa.setResponsavel(tarefaAtualizada.getResponsavel());
            return tarefaRepository.save(tarefa);
        }).orElseThrow(() -> new RuntimeException("Tarefa não encontrada"));
    }

    public Tarefa updateStatus(Long id, String novoStatus) {
        return tarefaRepository.findById(id).map(t -> {
            t.setStatus(StatusTarefa.valueOf(novoStatus));
            return tarefaRepository.save(t);
        }).orElseThrow(() -> new RuntimeException("Tarefa não encontrada"));
    }

    public void delete(Long id) {
        tarefaRepository.deleteById(id);
    }

    // --- NOVO MÉTODO PARA O DASHBOARD ---
    public DashboardDTO getDashboardMetrics() {
        // Pega as listas de DTOs já formatadas pelo Repository (Passo 2)
        List<ChartDataDTO> statusData = tarefaRepository.countTotalByStatus();
        List<ChartDataDTO> responsibleData = tarefaRepository.countTotalByResponsible();

        // Agrupa e retorna o objeto completo que o Frontend espera
        return new DashboardDTO(statusData, responsibleData);
    }
    // ----------------------------------
}