package com.sedem.api.controllers;

import com.sedem.api.dto.AcaoListDTO;
import com.sedem.api.models.Acao;
import com.sedem.api.services.AcaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/acoes")
public class AcaoController {

    @Autowired
    private AcaoService acaoService;

    @PostMapping
    public Acao create(@RequestBody Acao acao) {
        return acaoService.create(acao);
    }

    @GetMapping
    public List<Acao> findAll() {
        return acaoService.findAll();
    }

    @GetMapping("/{id}")
    public Acao findById(@PathVariable Long id) {
        return acaoService.findById(id)
                .orElseThrow(() -> new RuntimeException("Ação não encontrada"));
    }

    @GetMapping("/list")
    public List<AcaoListDTO> list() {
        return acaoService.listLite();
    }

    @PutMapping("/{id}")
    public Acao update(@PathVariable Long id, @RequestBody Acao acao) {
        return acaoService.update(id, acao);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        acaoService.delete(id);
    }
}
