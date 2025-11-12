package com.sedem.api.controllers;

import com.sedem.api.dto.RegistroFinanceiroCreateDTO;
import com.sedem.api.dto.RegistroFinanceiroListDTO;
import com.sedem.api.services.RegistroFinanceiroService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/registros-financeiros")
@RequiredArgsConstructor
public class RegistroFinanceiroController {

    private final RegistroFinanceiroService service;

    @PostMapping
    public ResponseEntity<RegistroFinanceiroListDTO> criar(
            @Valid @RequestBody RegistroFinanceiroCreateDTO dto) {
        RegistroFinanceiroListDTO resp = service.criar(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(resp);
    }

    @GetMapping
    public List<RegistroFinanceiroListDTO> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public RegistroFinanceiroListDTO buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id);
    }

    @PutMapping("/{id}")
    public RegistroFinanceiroListDTO atualizar(
            @PathVariable Long id,
            @Valid @RequestBody RegistroFinanceiroCreateDTO dto) {
        return service.atualizar(id, dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletar(@PathVariable Long id) {
        service.deletar(id);
    }
}
