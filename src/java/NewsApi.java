package com.technerds;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpServer;
import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.util.List;

/** API mínima para servir notícias; conecte a um banco/RSS em produção. */
public final class NewsApi {
  record News(String category, String title, String excerpt) {}
  private static final List<News> NEWS = List.of(
    new News("games", "O próximo grande mundo aberto quer fazer você esquecer da vida real", "Desenvolvedores revelam detalhes do novo RPG."),
    new News("tech", "A internet está mudando — e a gente ainda está tentando acompanhar", "IA, privacidade e a nova era dos dispositivos pessoais."),
    new News("anime", "Por que as melhores histórias ainda começam em uma página em branco", "Uma conversa sobre arte, memória e mangá.")
  );

  public static void main(String[] args) throws IOException {
    HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);
    server.createContext("/api/news", NewsApi::handleNews);
    server.start();
    System.out.println("Tech Nerds API em http://localhost:8080/api/news");
  }

  private static void handleNews(HttpExchange exchange) throws IOException {
    if (!"GET".equals(exchange.getRequestMethod())) { exchange.sendResponseHeaders(405, -1); return; }
    String json = NEWS.stream().map(n -> String.format("{\"category\":\"%s\",\"title\":\"%s\",\"excerpt\":\"%s\"}", n.category(), n.title(), n.excerpt())).toList().toString().replace("=", ":");
    byte[] body = json.getBytes(StandardCharsets.UTF_8);
    exchange.getResponseHeaders().set("Content-Type", "application/json; charset=UTF-8");
    exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
    exchange.sendResponseHeaders(200, body.length);
    try (var output = exchange.getResponseBody()) { output.write(body); }
  }
}
