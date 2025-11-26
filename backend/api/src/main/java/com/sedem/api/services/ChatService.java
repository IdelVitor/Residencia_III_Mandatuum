package com.sedem.api.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ChatService {

    private final RegistroFinanceiroService financeiroService;
    private final RestClient restClient;

    @Value("${gemini.api-key}")
    private String apiKey;

    public ChatService(RegistroFinanceiroService financeiroService) {
        this.financeiroService = financeiroService;
        this.restClient = RestClient.create();
    }

    public String responderPergunta(String perguntaUsuario) {
        // ---------------------------------------------------------
        // 1. Contexto (Busca dados do banco)
        // ---------------------------------------------------------
        var registros = financeiroService.listar();

        String dadosContexto = registros.stream()
                .map(r -> String.format("- Data: %s | Total: R$ %s | Tipo: Financeiro", r.dataRegistro(), r.total()))
                .collect(Collectors.joining("\n"));

        // ---------------------------------------------------------
        // 2. Prompt (Instrução para a IA)
        // ---------------------------------------------------------
        String prompt = String.format("""
                Você é um assistente financeiro do sistema SEDEM.
                Analise os dados abaixo para responder à pergunta do usuário.
                
                DADOS DO SISTEMA:
                %s
                
                PERGUNTA DO USUÁRIO:
                %s
                
                Responda de forma resumida e direta.
                """, dadosContexto, perguntaUsuario);

        // ---------------------------------------------------------
        // 3. Montar o JSON (Igual ao do Google AI Studio)
        // ---------------------------------------------------------
        Map<String, Object> requestBody = Map.of(
                "contents", List.of(
                        Map.of("parts", List.of(
                                Map.of("text", prompt)
                        ))
                )
        );

        // ---------------------------------------------------------
        // 4. Configuração da URL e Chamada (Baseado no seu CURL)
        // ---------------------------------------------------------

        String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

        try {
            System.out.println("Enviando requisição para Gemini 2.0...");

            Map response = restClient.post()
                    .uri(url)
                    // MUDANÇA 2: Enviando a chave no Header (X-goog-api-key), igual ao curl
                    .header("X-goog-api-key", apiKey.trim())
                    .header("Content-Type", "application/json")
                    .body(requestBody)
                    .retrieve()
                    .body(Map.class);

            // ---------------------------------------------------------
            // 5. Ler a resposta
            // ---------------------------------------------------------
            List<Map<String, Object>> candidates = (List<Map<String, Object>>) response.get("candidates");
            Map<String, Object> content = (Map<String, Object>) candidates.get(0).get("content");
            List<Map<String, Object>> parts = (List<Map<String, Object>>) content.get("parts");

            return (String) parts.get(0).get("text");

        } catch (Exception e) {
            e.printStackTrace();
            return "Erro ao consultar o Gemini: " + e.getMessage();
        }
    }
}