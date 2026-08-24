document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('book-search');
    const categoryButtons = document.querySelectorAll('.cat-btn');
    const bookCards = document.querySelectorAll('.book-card');

    let currentCategory = 'all';
    let searchQuery = '';

    function filterBooks() {
        bookCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            const cardTitle = card.querySelector('h3').textContent.toLowerCase();
            const cardText = card.querySelector('p').textContent.toLowerCase();

            const matchesCategory = (currentCategory === 'all' || cardCategory === currentCategory);

            const matchesSearch = cardTitle.includes(searchQuery) || cardText.includes(searchQuery);

            if (matchesCategory && matchesSearch) {
                card.style.display = 'flex';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(10px)';
                card.style.display = 'none';
            }
        });
    }

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            currentCategory = button.getAttribute('data-category');
            filterBooks();
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase().trim();
            filterBooks();
        });
    }
});