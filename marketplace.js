document.addEventListener('DOMContentLoaded', () => {
    // Fungsionalitas Hamburger Menu (untuk navigasi utama)
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Fungsionalitas Filter Kategori Utama
    const categoryButtons = document.querySelectorAll('.category-btn');
    const productCards = document.querySelectorAll('.product-card');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const selectedCategory = button.dataset.category;
            applyFilters(selectedCategory); // Panggil applyFilters dengan kategori utama
        });
    });

    // Fungsionalitas Filter Panel (terkait dengan tombol hamburger filter)
    const filterToggleButton = document.querySelector('.filter-toggle-btn'); // Ini sekarang adalah ikon hamburger filter
    const filterPanel = document.getElementById('filterPanel');
    const applyFilterBtn = document.querySelector('.apply-filter-btn');
    const resetFilterBtn = document.querySelector('.reset-filter-btn');
    const priceRangeSlider = document.getElementById('priceRange');
    const currentPriceDisplay = document.getElementById('currentPrice');

    // Update harga saat slider digeser
    priceRangeSlider.addEventListener('input', () => {
        currentPriceDisplay.textContent = `Rp${new Intl.NumberFormat('id-ID').format(priceRangeSlider.value)}`;
    });

    // Toggle filter panel
    filterToggleButton.addEventListener('click', (event) => {
        event.stopPropagation(); // Mencegah event klik menyebar ke document dan langsung menutup panel
        filterPanel.classList.toggle('active');
    });

    // Tutup filter panel jika klik di luar
    document.addEventListener('click', (event) => {
        // Pastikan klik tidak berasal dari dalam panel atau dari tombol filter itu sendiri
        if (!filterPanel.contains(event.target) && !filterToggleButton.contains(event.target)) {
            filterPanel.classList.remove('active');
        }
    });

    // Apply Filter Button
    applyFilterBtn.addEventListener('click', () => {
        const activeCategory = document.querySelector('.category-btn.active').dataset.category;
        applyFilters(activeCategory);
        filterPanel.classList.remove('active'); // Tutup panel setelah apply
    });

    // Reset Filter Button
    resetFilterBtn.addEventListener('click', () => {
        // Reset checkboxes dan radio buttons
        document.querySelectorAll('.filter-panel input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);
        document.querySelectorAll('.filter-panel input[type="radio"]').forEach(radio => radio.checked = false);
        
        // Reset price slider
        priceRangeSlider.value = priceRangeSlider.max; // Set ke nilai maksimum
        currentPriceDisplay.textContent = `Rp${new Intl.NumberFormat('id-ID').format(priceRangeSlider.max)}`;

        const activeCategory = document.querySelector('.category-btn.active').dataset.category;
        applyFilters(activeCategory); // Terapkan filter setelah reset
    });

    // Fungsi untuk menerapkan semua filter
    function applyFilters(mainCategory) {
        const selectedDietary = Array.from(document.querySelectorAll('input[name="dietary"]:checked')).map(cb => cb.value);
        const selectedRating = document.querySelector('input[name="rating"]:checked')?.value;
        const maxPrice = parseInt(priceRangeSlider.value);

        productCards.forEach(card => {
            const cardMainCategories = card.dataset.category.split(' ');
            const cardDietary = card.dataset.dietary;
            const cardRating = parseInt(card.dataset.rating);
            const cardPrice = parseInt(card.dataset.price);

            let isVisible = true;

            // Filter by Main Category (All, Breakfast, Lunch, etc.)
            if (mainCategory !== 'all' && !cardMainCategories.includes(mainCategory)) {
                isVisible = false;
            }

            // Filter by Dietary
            if (isVisible && selectedDietary.length > 0) {
                let hasSelectedDietary = false;
                for (let i = 0; i < selectedDietary.length; i++) {
                    if (cardDietary === selectedDietary[i]) {
                        hasSelectedDietary = true;
                        break;
                    }
                }
                if (!hasSelectedDietary) {
                    isVisible = false;
                }
            }

            // Filter by Rating
            if (isVisible && selectedRating) {
                if (selectedRating === '4-plus' && cardRating < 4) {
                    isVisible = false;
                } else if (selectedRating === '3-plus' && cardRating < 3) {
                    isVisible = false;
                }
            }

            // Filter by Price Range
            if (isVisible && cardPrice > maxPrice) {
                isVisible = false;
            }

            card.style.display = isVisible ? 'flex' : 'none';
        });
    }

    // Panggil filter awal saat halaman dimuat (untuk kategori 'All' secara default)
    applyFilters('all');
});
