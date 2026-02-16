// Blog search functionality (category filtering now handled server-side)
document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('search-input');
  const blogContainer = document.getElementById('blog-container');
  const noResults = document.getElementById('no-results');

  if (!searchInput || !blogContainer || !noResults) return;

  const articles = Array.from(blogContainer.querySelectorAll('article'));

  function applySearch() {
    const searchTerm = (searchInput.value || '').toLowerCase().trim();
    let visibleCount = 0;

    articles.forEach((article) => {
      const titleEl = article.querySelector('h3');
      const descEl = article.querySelector('p');
      const tagsAttr = (article.getAttribute('data-categories') || '').toLowerCase();
      const title = titleEl ? titleEl.textContent.toLowerCase() : '';
      const description = descEl ? descEl.textContent.toLowerCase() : '';

      const matchesSearch = !searchTerm || 
        title.includes(searchTerm) || 
        description.includes(searchTerm) || 
        tagsAttr.includes(searchTerm);

      if (matchesSearch) {
        article.classList.remove('hidden');
        visibleCount++;
      } else {
        article.classList.add('hidden');
      }
    });

    if (visibleCount === 0) {
      noResults.classList.remove('hidden');
    } else {
      noResults.classList.add('hidden');
    }
  }

  // Search input
  searchInput.addEventListener('input', function () {
    applySearch();
  });
});
