const searchToggle = document.querySelector('.search-toggle');
const searchBox = document.getElementById('searchBox');
const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.filter-button');
const categoryButtons = document.querySelectorAll('.category-item');
const newsCards = document.querySelectorAll('.news-card');
const likeButtons = document.querySelectorAll('.like-button');
const saveButtons = document.querySelectorAll('.save-button');
const shareButtons = document.querySelectorAll('.share-button');
const toast = document.getElementById('toast');

searchToggle.addEventListener('click', () => {
  searchBox.classList.toggle('open');
  if (searchBox.classList.contains('open')) {
    setTimeout(() => searchInput.focus(), 120);
  }
});

searchInput.addEventListener('input', (event) => {
  const query = event.target.value.trim().toLowerCase();

  newsCards.forEach((card) => {
    const text = card.textContent.toLowerCase();
    card.style.display = text.includes(query) ? 'block' : 'none';
  });
});

const setFilter = (selected) => {
  filterButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.filter === selected);
  });

  newsCards.forEach((card) => {
    const category = card.dataset.category;
    card.style.display = selected === 'all' || category === selected ? 'block' : 'none';
  });
};

filterButtons.forEach((button) => {
  button.addEventListener('click', () => setFilter(button.dataset.filter));
});

categoryButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    setFilter(filter);
    filterButtons.forEach((fb) => {
      fb.classList.toggle('active', fb.dataset.filter === filter);
    });
  });
});

likeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const countEl = button.querySelector('span');
    const current = Number(countEl.textContent);
    const liked = button.classList.toggle('active');
    countEl.textContent = liked ? current + 1 : current - 1;
    button.innerHTML = `${liked ? '♥' : '♡'} <span>${countEl.textContent}</span>`;
  });
});

saveButtons.forEach((button) => {
  button.addEventListener('click', () => {
    button.classList.toggle('active');
    button.textContent = button.classList.contains('active') ? '▣' : '▣';
    showToast('Post salvo para ler depois.');
  });
});

shareButtons.forEach((button) => {
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast('Link copiado para compartilhamento.');
    } catch (error) {
      showToast('Compartilhamento pronto.');
    }
  });
});

const showToast = (message) => {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timeoutId);
  showToast.timeoutId = setTimeout(() => toast.classList.remove('show'), 1700);
};

document.querySelector('.newsletter-box .primary-button')?.addEventListener('click', () => {
  const emailInput = document.querySelector('.newsletter-box input');
  if (emailInput.value.trim()) {
    emailInput.value = '';
    showToast('Você entrou na newsletter Tech Nerds!');
  } else {
    emailInput.focus();
  }
});

document.querySelector('.chat-input-box button')?.addEventListener('click', () => {
  const input = document.querySelector('.chat-input-box input');
  if (!input.value.trim()) return;
  const message = document.createElement('div');
  message.className = 'chat-message';
  message.innerHTML = `<strong>Você:</strong><p>${input.value.trim()}</p>`;
  document.querySelector('.chat-panel').insertBefore(message, document.querySelector('.chat-input-box'));
  input.value = '';
  showToast('Mensagem enviada ao chat nerd.');
});

const stories = document.querySelectorAll('.story');
stories.forEach((story) => {
  story.addEventListener('click', () => {
    showToast('Story atualizado na sua comunidade nerd.');
  });
});
