package com.sedem.api.controllers;

import com.sedem.api.models.CoordenadaBairro;
import com.sedem.api.services.CoordenadaBairroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/coordenadas-bairros")
public class CoordenadaBairroController {

    @Autowired
    private CoordenadaBairroService coordenadaBairroService;

    @PostMapping
    public CoordenadaBairro create(@RequestBody CoordenadaBairro coordenada) {
        return coordenadaBairroService.create(coordenada);
    }

    @GetMapping
    public List<CoordenadaBairro> findAll() {
        return coordenadaBairroService.findAll();
    }

    @GetMapping("/{id}")
    public CoordenadaBairro findById(@PathVariable Long id) {
        return coordenadaBairroService.findById(id)
                .orElseThrow(() -> new RuntimeException("Coordenada não encontrada"));
    }

    @PutMapping("/{id}")
    public CoordenadaBairro update(@PathVariable Long id, @RequestBody CoordenadaBairro coordenada) {
        return coordenadaBairroService.update(id, coordenada);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        coordenadaBairroService.delete(id);
    }
}
