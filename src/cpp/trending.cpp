#include <iostream>
#include <string>
#include <vector>

// Domínio C++ para futuras rotinas de curadoria, ranking e feed.
struct News {
  std::string category;
  std::string title;
  int engagement;
};

std::vector<News> trending_news() {
  return {
    {"technology", "O que é computação quântica?", 12400},
    {"games", "O retorno triunfal dos RPGs clássicos", 8700},
    {"geek", "Cosplay: muito além da fantasia", 5200}
  };
}

int main() {
  for (const auto& item : trending_news())
    std::cout << item.category << ": " << item.title << " (" << item.engagement << " leituras)\n";
  return 0;
}
