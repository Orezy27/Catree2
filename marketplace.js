document.addEventListener('DOMContentLoaded', () => {
    // Fungsionalitas Hamburger Menu
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Fungsionalitas Filter Kategori
    const categoryButtons = document.querySelectorAll('.category-btn');
    const productCards = document.querySelectorAll('.product-card');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Hapus kelas 'active' dari semua tombol
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Tambahkan kelas 'active' ke tombol yang diklik
            button.classList.add('active');

            const selectedCategory = button.dataset.category;

            productCards.forEach(card => {
                const cardCategories = card.dataset.category.split(' '); // Misal: "all lunch dinner"

                if (selectedCategory === 'all' || cardCategories.includes(selectedCategory)) {
                    card.style.display = 'flex'; // Tampilkan kartu
                } else {
                    card.style.display = 'none'; // Sembunyikan kartu
                }
            });
        });
    });
});
