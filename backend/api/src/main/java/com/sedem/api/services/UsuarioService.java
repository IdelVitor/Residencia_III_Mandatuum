package com.sedem.api.services;

import com.sedem.api.models.Usuario;
import com.sedem.api.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    // Criar usuário
    public Usuario create(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    // Listar todos
    public List<Usuario> findAll() {
        return usuarioRepository.findAll();
    }

    // Buscar por ID
    public Optional<Usuario> findById(Long id) {
        return usuarioRepository.findById(id);
    }

    // Atualizar usuário
    public Usuario update(Long id, Usuario usuarioAtualizado) {
        return usuarioRepository.findById(id).map(usuario -> {
            usuario.setNome(usuarioAtualizado.getNome());
            usuario.setEmail(usuarioAtualizado.getEmail());
            usuario.setSenhaHash(usuarioAtualizado.getSenhaHash());
            usuario.setRole(usuarioAtualizado.getRole());
            return usuarioRepository.save(usuario);
        }).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }

    // Remover usuário
    public void delete(Long id) {
        usuarioRepository.deleteById(id);
    }
}
