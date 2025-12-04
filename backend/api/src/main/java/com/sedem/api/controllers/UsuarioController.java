package com.sedem.api.controllers;

import com.sedem.api.dto.AlterarSenhaDTO; // <--- Importe o DTO que criamos
import com.sedem.api.models.Usuario;
import com.sedem.api.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity; // <--- Importante para retornar status HTTP
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping
    public Usuario create(@RequestBody Usuario usuario) {
        return usuarioService.create(usuario);
    }

    @GetMapping
    public List<Usuario> findAll() {
        return usuarioService.findAll();
    }

    @GetMapping("/{id}")
    public Usuario findById(@PathVariable Long id) {
        return usuarioService.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }

    @PutMapping("/{id}")
    public Usuario update(@PathVariable Long id, @RequestBody Usuario usuario) {
        return usuarioService.update(id, usuario);
    }

    // --- NOVO ENDPOINT: Alterar Senha ---
    @PatchMapping("/{id}/alterar-senha")
    public ResponseEntity<?> alterarSenha(@PathVariable Long id, @RequestBody AlterarSenhaDTO dto) {
        try {
            usuarioService.alterarSenha(id, dto.getSenhaAtual(), dto.getNovaSenha());
            return ResponseEntity.ok("Senha alterada com sucesso!");
        } catch (RuntimeException e) {
            // Retorna erro 400 (Bad Request) se a senha atual estiver errada
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        usuarioService.delete(id);
    }
}