// Comprehensive Blog Manager - Handles pagination, filtering, search, and category switching
document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const blogContainer = document.getElementById('blog-container');
  const searchInput = document.getElementById('search-input');
  const categoryTabs = document.querySelectorAll('.blog-tab');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const pageNumbersContainer = document.getElementById('page-numbers');
  const noResults = document.getElementById('no-results');

  if (!blogContainer || !searchInput) return;

  // Configuration
  const POSTS_PER_PAGE = 6;
  const allArticles = Array.from(blogContainer.querySelectorAll('article'));
  const allBlogs = window.ALL_BLOGS || [];

  // State
  let activeCategory = 'all';
  let currentPage = 1;
  let filteredArticles = [...allArticles];

  // ============================================================
  // CATEGORY TAB HANDLING
  // ============================================================
  function updateActivTab() {
    categoryTabs.forEach(tab => {
      const isActive = tab.getAttribute('data-category') === activeCategory;
      if (isActive) {
        tab.classList.add('font-semibold', 'text-textblack', 'border-b-2', 'border-primary');
        tab.classList.remove('text-gray-400', 'border-transparent');
        tab.setAttribute('aria-pressed', 'true');
      } else {
        tab.classList.remove('font-semibold', 'text-textblack', 'border-b-2', 'border-primary');
        tab.classList.add('text-gray-400', 'border-transparent');
        tab.setAttribute('aria-pressed', 'false');
      }
    });
  }

  categoryTabs.forEach(tab => {
    tab.addEventListener('click', function () {
      const category = this.getAttribute('data-category');
      if (category !== activeCategory) {
        activeCategory = category;
        currentPage = 1;
        updateActivTab();
        
        // Add smooth transition when filtering
        blogContainer.style.minHeight = blogContainer.offsetHeight + 'px';
        filterAndPaginate();
        
        // Reset min-height after transition
        setTimeout(() => {
          blogContainer.style.minHeight = '';
        }, 500);
      }
    });
  });

  // ============================================================
  // FILTERING BY CATEGORY
  // ============================================================
  function filterByCategory() {
    if (activeCategory === 'all') {
      return allArticles;
    }

    return allArticles.filter(article => {
      const categories = (article.getAttribute('data-categories') || '').toLowerCase();
      return categories.includes(activeCategory.toLowerCase());
    });
  }

  // ============================================================
  // SEARCH ACROSS ALL BLOGS
  // ============================================================
  function applySearch(articles) {
    const searchTerm = (searchInput.value || '').toLowerCase().trim();
    if (!searchTerm) {
      return articles;
    }

    return articles.filter(article => {
      const titleEl = article.querySelector('h3');
      const descEl = article.querySelector('p');
      const categories = (article.getAttribute('data-categories') || '').toLowerCase();

      const title = titleEl ? titleEl.textContent.toLowerCase() : '';
      const description = descEl ? descEl.textContent.toLowerCase() : '';

      return (
        title.includes(searchTerm) ||
        description.includes(searchTerm) ||
        categories.includes(searchTerm)
      );
    });
  }

  // ============================================================
  // PAGINATION WITH ARRAY SLICING
  // ============================================================
  function renderPageNumbers() {
    pageNumbersContainer.innerHTML = '';

    const totalPages = Math.ceil(filteredArticles.length / POSTS_PER_PAGE);
    if (totalPages <= 1) {
      prevBtn.disabled = true;
      nextBtn.disabled = true;
      return;
    }

    // Calculate page range to display
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    // First page
    if (start > 1) {
      const firstBtn = document.createElement('button');
      firstBtn.textContent = '1';
      firstBtn.className = 'px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:border-primary hover:text-primary transition-all';
      firstBtn.addEventListener('click', () => goToPage(1));
      pageNumbersContainer.appendChild(firstBtn);

      if (start > 2) {
        const dots = document.createElement('span');
        dots.textContent = '...';
        dots.className = 'px-2';
        pageNumbersContainer.appendChild(dots);
      }
    }

    // Page numbers in range
    for (let i = start; i <= end; i++) {
      const btn = document.createElement('button');
      btn.textContent = i;
      btn.className = `px-4 py-2 rounded-lg border transition-all ${
        currentPage === i
          ? 'bg-primary text-white border-primary'
          : 'border-gray-200 text-gray-700 hover:border-primary hover:text-primary'
      }`;
      btn.disabled = currentPage === i;
      btn.addEventListener('click', () => goToPage(i));
      pageNumbersContainer.appendChild(btn);
    }

    // Last page
    if (end < totalPages) {
      if (end < totalPages - 1) {
        const dots = document.createElement('span');
        dots.textContent = '...';
        dots.className = 'px-2';
        pageNumbersContainer.appendChild(dots);
      }

      const lastBtn = document.createElement('button');
      lastBtn.textContent = totalPages;
      lastBtn.className = 'px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:border-primary hover:text-primary transition-all';
      lastBtn.addEventListener('click', () => goToPage(totalPages));
      pageNumbersContainer.appendChild(lastBtn);
    }

    // Update prev/next buttons
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
  }

  function displayPage() {
    const totalPages = Math.ceil(filteredArticles.length / POSTS_PER_PAGE);
    const startIdx = (currentPage - 1) * POSTS_PER_PAGE;
    const endIdx = startIdx + POSTS_PER_PAGE;

    let visibleCount = 0;
    
    // First, fade out all articles
    allArticles.forEach(article => {
      article.style.opacity = '0';
      article.style.transform = 'translateY(10px)';
    });

    // After a short delay, update visibility and fade in visible articles
    setTimeout(() => {
      allArticles.forEach(article => {
        const index = filteredArticles.indexOf(article);
        if (index >= startIdx && index < endIdx) {
          article.classList.remove('hidden');
          visibleCount++;
          // Stagger the fade-in effect
          setTimeout(() => {
            article.style.opacity = '1';
            article.style.transform = 'translateY(0)';
          }, (index - startIdx) * 50);
        } else {
          article.classList.add('hidden');
        }
      });

      // Show/hide no results message
      if (visibleCount === 0) {
        noResults.classList.remove('hidden');
      } else {
        noResults.classList.add('hidden');
      }
    }, 150);

    renderPageNumbers();
  }

  function goToPage(pageNum) {
    const totalPages = Math.ceil(filteredArticles.length / POSTS_PER_PAGE);
    if (pageNum >= 1 && pageNum <= totalPages) {
      currentPage = pageNum;
      displayPage();
    }
  }

  // ============================================================
  // COMBINED FILTER AND PAGINATE
  // ============================================================
  function filterAndPaginate() {
    // Filter by category
    filteredArticles = filterByCategory();

    // Apply search to filtered results
    filteredArticles = applySearch(filteredArticles);

    // Reset to page 1 if needed
    const maxPages = Math.ceil(filteredArticles.length / POSTS_PER_PAGE);
    if (currentPage > maxPages && maxPages > 0) {
      currentPage = 1;
    }

    // Display current page
    displayPage();
  }

  // ============================================================
  // EVENT LISTENERS
  // ============================================================
  searchInput.addEventListener('input', () => {
    currentPage = 1;
    filterAndPaginate();
  });

  prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  });

  nextBtn.addEventListener('click', () => {
    const totalPages = Math.ceil(filteredArticles.length / POSTS_PER_PAGE);
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  });

  // ============================================================
  // INITIAL LOAD
  // ============================================================
  updateActivTab();
  displayPage();
});
