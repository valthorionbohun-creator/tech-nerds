const searchToggle = document.querySelector('#searchToggle');
const searchbar = document.querySelector('#searchbar');
const searchInput = document.querySelector('#searchInput');
searchToggle.addEventListener('click', () => { searchbar.classList.toggle('open'); if (searchbar.classList.contains('open')) searchInput.focus(); });

document.querySelectorAll('.action.like').forEach(button => button.addEventListener('click', () => {
  button.classList.toggle('liked');
  button.firstChild.textContent = button.classList.contains('liked') ? '♥ ' : '♡ ';
  const count = button.querySelector('span');
  count.textContent = Number(count.textContent) + (button.classList.contains('liked') ? 1 : -1);
}));
document.querySelectorAll('.action.save').forEach(button => button.addEventListener('click', () => {
  button.classList.toggle('saved');
  button.textContent = button.classList.contains('saved') ? '▣' : '▱';
  button.title = button.classList.contains('saved') ? 'Salvo' : 'Salvar';
}));
document.querySelectorAll('.action.share').forEach(button => button.addEventListener('click', async () => {
  const message = 'Link copiado! Compartilhe com a sua comunidade nerd.';
  try { await navigator.clipboard.writeText(window.location.href); } catch (_) {}
  const original = button.textContent; button.textContent = '✓';
  setTimeout(() => button.textContent = original, 1400);
  window.alert(message);
}));

document.querySelectorAll('.filter').forEach(filter => filter.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach(item => item.classList.remove('active'));
  filter.classList.add('active');
  const category = filter.textContent.toLowerCase();
  document.querySelectorAll('.post').forEach(post => { post.style.display = category === 'tudo' || post.dataset.category === category.replace('tecnologia','tech') ? '' : 'none'; });
}));
searchInput.addEventListener('input', () => { const query = searchInput.value.toLowerCase(); document.querySelectorAll('.post').forEach(post => { post.style.display = post.innerText.toLowerCase().includes(query) ? '' : 'none'; }); });
document.querySelector('.newsletter .primary').addEventListener('click', () => { const email = document.querySelector('.newsletter input'); if (email.value && email.checkValidity()) { email.value = ''; window.alert('Inscrição confirmada! Bem-vindo à Tech Nerds.'); } else email.focus(); });
