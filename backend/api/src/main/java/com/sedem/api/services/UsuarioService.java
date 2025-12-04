package com.sedem.api.services;

import com.sedem.api.models.Usuario;
import com.sedem.api.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Criar usuário
    public Usuario create(Usuario usuario) {
        // 🔑 encodar senha antes de salvar
        usuario.setSenhaHash(passwordEncoder.encode(usuario.getSenhaHash()));
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

    // Atualizar usuário (Update genérico)
    public Usuario update(Long id, Usuario usuarioAtualizado) {
        return usuarioRepository.findById(id).map(usuario -> {
            usuario.setNome(usuarioAtualizado.getNome());
            usuario.setEmail(usuarioAtualizado.getEmail());

            // 🔑 só encoda se vier uma nova senha no update geral (Cuidado: aqui não valida a antiga)
            if (usuarioAtualizado.getSenhaHash() != null && !usuarioAtualizado.getSenhaHash().isEmpty()) {
                usuario.setSenhaHash(passwordEncoder.encode(usuarioAtualizado.getSenhaHash()));
            }

            usuario.setRole(usuarioAtualizado.getRole());
            return usuarioRepository.save(usuario);
        }).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }

    // --- NOVO MÉTODO: Alterar Senha com Validação ---
    public void alterarSenha(Long id, String senhaAtual, String novaSenha) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        // Verifica se a senha atual informada bate com o hash no banco
        if (!passwordEncoder.matches(senhaAtual, usuario.getSenhaHash())) {
            throw new RuntimeException("A senha atual está incorreta.");
        }

        // Se estiver correta, criptografa a nova e salva
        usuario.setSenhaHash(passwordEncoder.encode(novaSenha));
        usuarioRepository.save(usuario);
    }

    // Remover usuário
    public void delete(Long id) {
        usuarioRepository.deleteById(id);
    }
}