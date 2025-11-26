package com.sedem.api.controllers;

import com.sedem.api.services.ChatService;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/chat")
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping
    public Map<String, String> conversar(@RequestBody Map<String, String> payload) {
        String pergunta = payload.get("pergunta");
        String resposta = chatService.responderPergunta(pergunta);
        return Map.of("resposta", resposta);
    }
}