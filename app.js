const newsData = [
  {
    category: 'games',
    tag: 'Games',
    tagClass: 'tag-games',
    time: 'há 32 min',
    title: 'O MMORPG do ano promete transformar a rotina em uma aventura infinita.',
    excerpt: 'Com pisos de mundo dinâmicos, quests que mudam conforme suas escolhas e sistemas de guilda em tempo real, o jogo está sendo comparado aos maiores clássicos do gênero.',
    author: 'Marina Nogueira',
    readTime: '8 min de leitura',
    initials: 'MN',
    initialsClass: 'purple',
    likes: 248,
    comments: 32,
    image: 'thumb-one',
    imageText: 'LIVE'
  },
  {
    category: 'tech',
    tag: 'Tecnologia',
    tagClass: 'tag-tech',
    time: 'há 1h',
    title: 'IA e privacidade: as plataformas que querem te conhecer em tempo real.',
    excerpt: 'Desde ferramentas de criação até assistentes da produtividade, a era da hyperpersonalização está redefinindo a relação entre usuário, dados e inteligência artificial.',
    author: 'Tech Lab',
    readTime: '6 min de leitura',
    initials: 'TL',
    initialsClass: 'beige',
    likes: 189,
    comments: 18,
    image: 'thumb-two',
    imageText: 'AI'
  },
  {
    category: 'anime',
    tag: 'Anime',
    tagClass: 'tag-anime',
    time: 'há 2h',
    title: 'As melhores histórias de anime continuam sendo aquelas que mexem com a mente.',
    excerpt: 'Entre estética, drama e filosofia, a nova leva de títulos revela que a cultura pop mais adulta está sendo construída com raciocínio, emoção e referências profundas.',
    author: 'Akira Yamato',
    readTime: '5 min de leitura',
    initials: 'AY',
    initialsClass: 'rose',
    likes: 427,
    comments: 54,
    image: 'thumb-three',
    imageText: 'OVA'
  },
  {
    category: 'rpg',
    tag: 'RPG / TCG',
    tagClass: 'tag-rpg',
    time: 'há 3h',
    title: 'Cartas, fichas e narrativas: o TCG está voltando a ser o centro da conversa geek.',
    excerpt: 'As coleções premium, estratégias de mesa e competições digitais estão devolvendo prestígio ao formato, que se reinventa para públicos de todas as idades.',
    author: 'Jeferson R.',
    readTime: '4 min de leitura',
    initials: 'JR',
    initialsClass: 'violet',
    likes: 301,
    comments: 42,
    image: 'thumb-four',
    imageText: 'TCG'
  }
];

const newsList = document.getElementById('newsList');
const searchToggle = document.querySelector('.search-toggle');
const searchBox = document.getElementById('searchBox');
const searchInput = document.getElementById('searchInput');
const toast = document.getElementById('toast');
const filterButtons = document.querySelectorAll('.mini-filter, .category-button');
const mobileTabs = document.querySelectorAll('.mobile-tab');

function renderNews(items = newsData) {
  if (!newsList) return;

  newsList.innerHTML = items.map(item => `
    <article class="news-card" data-category="${item.category}">
      <div class="news-meta">
        <span class="tag ${item.tagClass}">${item.tag}</span>
        <span class="time">${item.time}</span>
      </div>

      <div class="news-layout">
        <div class="news-text">
          <h3>${item.title}</h3>
          <p>${item.excerpt}</p>
        </div>
        <div class="thumbnail ${item.image}" aria-hidden="true"><span>${item.imageText}</span></div>
      </div>

      <div class="news-footer">
        <div class="author-box">
          <div class="mini-avatar ${item.initialsClass}">${item.initials}</div>
          <div>
            <strong>${item.author}</strong>
            <small>${item.readTime}</small>
          </div>
        </div>

        <div class="emoji-actions">
          <button class="action-button like-button" aria-label="Curtir">♡ <span>${item.likes}</span></button>
          <button class="action-button comment-button" aria-label="Comentar">◌ <span>${item.comments}</span></button>
          <button class="action-button share-button" aria-label="Compartilhar">↗</button>
          <button class="action-button save-button" aria-label="Salvar">▣</button>
        </div>
      </div>
    </article>
  `).join('');

  bindInteractions();
}

function bindInteractions() {
  const likeButtons = document.querySelectorAll('.like-button');
  const saveButtons = document.querySelectorAll('.save-button');
  const shareButtons = document.querySelectorAll('.share-button');
  const storyItems = document.querySelectorAll('.story-item');

  likeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const count = button.querySelector('span');
      const current = Number(count.textContent);
      const isLiked = button.classList.toggle('active');
      count.textContent = isLiked ? current + 1 : current - 1;
      button.innerHTML = `${isLiked ? '♥' : '♡'} <span>${count.textContent}</span>`;
    });
  });

  saveButtons.forEach(button => {
    button.addEventListener('click', () => {
      button.classList.toggle('active');
      showToast('Post salvo para ler depois.');
    });
  });

  shareButtons.forEach(button => {
    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(window.location.href);
      } catch (error) {}
      showToast('Link copiado para compartilhar.');
    });
  });

  storyItems.forEach(item => {
    item.addEventListener('click', () => showToast('Story atualizado na comunidade nerd.'));
  });
}

function setFilter(selected) {
  const allCards = document.querySelectorAll('.news-card');
  allCards.forEach(card => {
    const category = card.dataset.category;
    const visible = selected === 'all' || selected === category;
    card.style.display = visible ? 'block' : 'none';
  });

  filterButtons.forEach(button => {
    const selectedFilter = button.dataset.filter || 'all';
    const active = selectedFilter === selected;
    button.classList.toggle('active', active);
  });
}

searchToggle?.addEventListener('click', () => {
  searchBox.classList.toggle('open');
  if (searchBox.classList.contains('open')) {
    setTimeout(() => searchInput.focus(), 120);
  }
});

searchInput?.addEventListener('input', (event) => {
  const query = event.target.value.trim().toLowerCase();
  const filtered = newsData.filter(item =>
    item.title.toLowerCase().includes(query) ||
    item.excerpt.toLowerCase().includes(query) ||
    item.author.toLowerCase().includes(query) ||
    item.tag.toLowerCase().includes(query)
  );

  renderNews(filtered);
});

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter || 'all';
    setFilter(filter);
  });
});

mobileTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.target;
    mobileTabs.forEach(item => item.classList.toggle('active', item === tab));

    if (target === 'feed') {
      document.getElementById('feed')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (target === 'stories') {
      document.getElementById('stories')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (target === 'chat') {
      document.getElementById('chat')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (target === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
});

const newsletterButton = document.querySelector('.newsletter-box .primary-button');
newsletterButton?.addEventListener('click', () => {
  const emailInput = document.querySelector('.newsletter-box input');
  if (emailInput.value.trim()) {
    emailInput.value = '';
    showToast('Você entrou na newsletter Tech Nerds!');
  } else {
    emailInput.focus();
  }
});

const chatButton = document.querySelector('.chat-input-row button');
chatButton?.addEventListener('click', () => {
  const input = document.querySelector('.chat-input-row input');
  if (!input.value.trim()) return;
  const thread = document.querySelector('.chat-thread');
  const message = document.createElement('div');
  message.className = 'chat-message';
  message.innerHTML = `<strong>Você:</strong><p>${input.value.trim()}</p>`;
  thread.appendChild(message);
  input.value = '';
  showToast('Mensagem enviada ao chat nerd.');
});

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 1700);
}

renderNews();

const authTabs = document.querySelectorAll('.auth-tab');
const authForms = document.querySelectorAll('.auth-form');

authTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    authTabs.forEach(item => item.classList.toggle('active', item === tab));
    authForms.forEach(form => form.classList.toggle('active', form.id === `${tab.dataset.auth}Form`));
  });
});

const composerForm = document.getElementById('composerForm');
composerForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  showToast('Rascunho salvo com sucesso.');
});

const loginForm = document.getElementById('loginForm');
loginForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  showToast('Login realizado com sucesso.');
  setTimeout(() => window.location.href = 'index.html', 700);
});

const registerForm = document.getElementById('registerForm');
registerForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  showToast('Conta criada com sucesso!');
  setTimeout(() => window.location.href = 'index.html', 800);
});

const miniFilters = document.querySelectorAll('.mini-filter');
miniFilters.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.dataset.filter;
    setFilter(value);
  });
});

const newsButtons = document.querySelectorAll('.category-button');
newsButtons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.dataset.filter;
    setFilter(value);
  });
});

if (window.innerWidth <= 860) {
  const mobileHome = document.querySelector('.mobile-tab[data-target="home"]');
  if (mobileHome) mobileHome.classList.add('active');
}

window.addEventListener('resize', () => {
  if (window.innerWidth > 860) {
    document.querySelectorAll('.mobile-tab').forEach(item => item.classList.remove('active'));
  }
});






















































































































































































































































































































































































































































































































































































































































































































































n
