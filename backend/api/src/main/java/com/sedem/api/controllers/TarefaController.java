package com.sedem.api.controllers;

import com.sedem.api.models.Tarefa;
import com.sedem.api.services.TarefaService;
import com.sedem.api.dto.TarefaListDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/tarefas")
public class TarefaController {

    @Autowired
    private TarefaService tarefaService;

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

    @GetMapping("/{id}")
    public Tarefa findById(@PathVariable Long id) {
        return tarefaService.findById(id)
                .orElseThrow(() -> new RuntimeException("Tarefa não encontrada"));
    }

    @PutMapping("/{id}")
    public Tarefa update(@PathVariable Long id, @RequestBody Tarefa tarefa) {
        return tarefaService.update(id, tarefa);
    }

    // TarefaController.java
    @PatchMapping("/{id}/status")
    public Tarefa updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String novo = body.get("status");
        return tarefaService.updateStatus(id, novo);
    }


    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        tarefaService.delete(id);
    }
}
