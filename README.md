# Tech Nerds

Portal editorial e comunidade sobre tecnologia, anime, mangá, games, MMORPG, RPG e TCG.

## Frontend
Abra `index.html` no navegador. O site é responsivo, sem dependências de build, e inclui:
- Feed editorial com categorias, busca, likes, salvar e compartilhar;
- Stories, tendências, newsletter e navegação inspirada em redes sociais;
- Visual minimalista com roxo, preto e bege.

## Java
`src/java/NewsApi.java` contém uma API HTTP mínima usando apenas o JDK. Para executar com JDK 17+:

```bash
javac -d out src/java/NewsApi.java && java -cp out com.technerds.NewsApi
```

## C++
`src/cpp/trending.cpp` contém o módulo inicial de ranking/curadoria:

```bash
g++ -std=c++17 src/cpp/trending.cpp -o trending && ./trending
```

Para publicação diária real, conecte a API Java a um banco de dados ou agregador RSS com moderação editorial, autenticação e persistência de interações.
