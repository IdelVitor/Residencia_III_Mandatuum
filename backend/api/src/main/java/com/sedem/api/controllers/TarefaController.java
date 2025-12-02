package com.sedem.api.controllers;

import com.sedem.api.dto.DashboardDTO;
import com.sedem.api.models.Tarefa;
import com.sedem.api.services.TarefaService;
import com.sedem.api.dto.TarefaListDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/tarefas")
public class TarefaController {

    @Autowired
    private TarefaService tarefaService;

    // --- NOVO ENDPOINT DO DASHBOARD ---
    @GetMapping("/dashboard")
    public ResponseEntity<DashboardDTO> getDashboard() {
        DashboardDTO dashboardData = tarefaService.getDashboardMetrics();
        return ResponseEntity.ok(dashboardData);
    }
    // ----------------------------------

    @PostMapping
    public Tarefa create(@RequestBody Tarefa tarefa) {
        return tarefaService.create(tarefa);
    }

    @GetMapping
    public List<Tarefa> findAll() {
        return tarefaService.findAll();
    }

    @GetMapping("/list")
    public List<TarefaListDTO> list() {
        return tarefaService.listLite();
    }

    // --- AQUI ESTÁ A CORREÇÃO MÁGICA ---
    // O [0-9]+ é uma Regex que obriga o ID a ser numérico.
    // Assim, "dashboard" não entra aqui e vai para o método certo.
    @GetMapping("/{id:[0-9]+}")
    public Tarefa findById(@PathVariable Long id) {
        return tarefaService.findById(id)
                .orElseThrow(() -> new RuntimeException("Tarefa não encontrada"));
    }

    // Aplique a mesma lógica no Update e Delete para ficar seguro
    @PutMapping("/{id:[0-9]+}")
    public Tarefa update(@PathVariable Long id, @RequestBody Tarefa tarefa) {
        return tarefaService.update(id, tarefa);
    }

    @PatchMapping("/{id:[0-9]+}/status")
    public Tarefa updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String novo = body.get("status");
        return tarefaService.updateStatus(id, novo);
    }

    @DeleteMapping("/{id:[0-9]+}")
    public void delete(@PathVariable Long id) {
        tarefaService.delete(id);
    }
}