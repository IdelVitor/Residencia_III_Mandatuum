package com.sedem.api.controllers;

import com.sedem.api.models.Usuario;
import com.sedem.api.repositories.UsuarioRepository;
import com.sedem.api.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    // 🚀 Login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario usuario) {
        Usuario usuarioExistente = usuarioRepository.findByEmail(usuario.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        if (!passwordEncoder.matches(usuario.getSenhaHash(), usuarioExistente.getSenhaHash())) {
            return ResponseEntity.badRequest().body("Senha inválida");
        }

        String token = jwtUtil.generateToken(
                usuarioExistente.getEmail(),
                usuarioExistente.getRole().name(),
                usuarioExistente.getId()
        );

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("userId", usuarioExistente.getId());
        response.put("email", usuarioExistente.getEmail());
        response.put("role", usuarioExistente.getRole());

        return ResponseEntity.ok(response);
    }

    // 🚀 Registro
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Usuario usuario) {
        if (usuarioRepository.findByEmail(usuario.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("E-mail já cadastrado");
        }

        usuario.setSenhaHash(passwordEncoder.encode(usuario.getSenhaHash()));
        Usuario novoUsuario = usuarioRepository.save(usuario);

        String token = jwtUtil.generateToken(
                novoUsuario.getEmail(),
                novoUsuario.getRole().name(),
                novoUsuario.getId()
        );

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("userId", novoUsuario.getId());
        response.put("email", novoUsuario.getEmail());
        response.put("role", novoUsuario.getRole());

        return ResponseEntity.ok(response);
    }
}
