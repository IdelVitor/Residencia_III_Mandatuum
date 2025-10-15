package com.sedem.api.controllers;

import com.sedem.api.models.RegistroFinanceiro;
import com.sedem.api.services.RegistroFinanceiroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/registros-financeiros")
public class RegistroFinanceiroController {

    @Autowired
    private RegistroFinanceiroService registroFinanceiroService;

    @PostMapping
    public RegistroFinanceiro create(@RequestBody RegistroFinanceiro registro) {
        return registroFinanceiroService.create(registro);
    }

    @GetMapping
    public List<RegistroFinanceiro> findAll() {
        return registroFinanceiroService.findAll();
    }

    @GetMapping("/{id}")
    public RegistroFinanceiro findById(@PathVariable Long id) {
        return registroFinanceiroService.findById(id)
                .orElseThrow(() -> new RuntimeException("Registro financeiro não encontrado"));
    }

    @PutMapping("/{id}")
    public RegistroFinanceiro update(@PathVariable Long id, @RequestBody RegistroFinanceiro registro) {
        return registroFinanceiroService.update(id, registro);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        registroFinanceiroService.delete(id);
    }
}
