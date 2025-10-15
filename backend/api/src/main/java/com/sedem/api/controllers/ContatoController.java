package com.sedem.api.controllers;

import com.sedem.api.models.Contato;
import com.sedem.api.services.ContatoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/contatos")
public class ContatoController {

    @Autowired
    private ContatoService contatoService;

    @PostMapping
    public Contato create(@RequestBody Contato contato) {
        return contatoService.create(contato);
    }

    @GetMapping
    public List<Contato> findAll() {
        return contatoService.findAll();
    }

    @GetMapping("/{id}")
    public Contato findById(@PathVariable Long id) {
        return contatoService.findById(id)
                .orElseThrow(() -> new RuntimeException("Contato não encontrado"));
    }

    @PutMapping("/{id}")
    public Contato update(@PathVariable Long id, @RequestBody Contato contato) {
        return contatoService.update(id, contato);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        contatoService.delete(id);
    }
}
