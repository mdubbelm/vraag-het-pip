/**
 * Hoofdapplicatie voor Vraag het Pip
 */

(function() {
    'use strict';

    const SESSION_KEY = 'pip_authenticated';

    // Check of ingelogd
    if (sessionStorage.getItem(SESSION_KEY) !== 'true') {
        window.location.href = 'index.html';
        return;
    }

    // Categorie configuratie met SVG icons
    const CATEGORY_CONFIG = {
        liefde: {
            label: 'Liefde',
            svg: '<svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>'
        },
        werk: {
            label: 'Werk',
            svg: '<svg viewBox="0 0 24 24"><path d="M8.5 4A2.5 2.5 0 0 0 6 6.5c0 .56.19 1.08.5 1.5a2.5 2.5 0 0 0 0 4 2.5 2.5 0 0 0 .5 4A2.5 2.5 0 0 0 8.5 20a2.5 2.5 0 0 0 2.45-2h2.1a2.5 2.5 0 0 0 2.45 2 2.5 2.5 0 0 0 1.5-4.5 2.5 2.5 0 0 0 0-4 2.5 2.5 0 0 0-.5-5A2.5 2.5 0 0 0 15.5 4a2.5 2.5 0 0 0-2.45 2h-2.1A2.5 2.5 0 0 0 8.5 4z"/></svg>'
        },
        leven: {
            label: 'Leven',
            svg: '<svg viewBox="0 0 24 24"><path d="M8.35 3C9.53 2.83 10.78 4.12 11.14 5.9c.36 1.77-.29 3.35-1.47 3.53-1.17.18-2.43-1.11-2.8-2.89C6.5 4.76 7.17 3.18 8.35 3M15.5 3c1.17.18 1.85 1.76 1.47 3.54-.37 1.78-1.63 3.07-2.8 2.89-1.18-.18-1.83-1.76-1.47-3.53.36-1.78 1.61-3.07 2.8-2.9M3 8.5c1.11-.55 2.56.11 3.25 1.47.68 1.36.41 2.9-.7 3.45s-2.56-.11-3.25-1.47c-.68-1.36-.41-2.9.7-3.45M21 8.5c1.11.55 1.38 2.09.7 3.45-.69 1.36-2.14 2.02-3.25 1.47-1.11-.55-1.38-2.09-.7-3.45.69-1.36 2.14-2.02 3.25-1.47M12 11.5c1.93 0 3.5 1.57 3.5 3.5 0 2.21-1.57 4.5-3.5 6-1.93-1.5-3.5-3.79-3.5-6 0-1.93 1.57-3.5 3.5-3.5z"/></svg>'
        }
    };

    // State
    let currentCategory = null;
    let usedAdvice = {
        liefde: [],
        werk: [],
        leven: []
    };

    // DOM elementen
    const categoryScreen = document.getElementById('category-screen');
    const adviceScreen = document.getElementById('advice-screen');
    const categoryButtons = document.querySelectorAll('.btn-category');
    const pipPhoto = document.getElementById('pip-photo');
    const adviceText = document.getElementById('advice-text');
    const badgeIcon = document.getElementById('badge-icon');
    const badgeText = document.getElementById('badge-text');
    const anotherAdviceBtn = document.getElementById('another-advice');
    const backToCategoriesBtn = document.getElementById('back-to-categories');

    // Haal seizoen op voor foto matching
    function getCurrentSeason() {
        const month = new Date().getMonth(); // 0-11
        if (month >= 2 && month <= 4) return 'lente';
        if (month >= 5 && month <= 7) return 'zomer';
        if (month >= 8 && month <= 10) return 'herfst';
        return 'winter';
    }

    // Check of het december is (voor kerstfoto's)
    function isDecember() {
        return new Date().getMonth() === 11;
    }

    // Kies een random foto die past bij seizoen
    function getRandomPhoto() {
        const december = isDecember();

        // Filter foto's op seizoen
        let availablePhotos = window.PIP_PHOTOS.filter(photo => {
            // Kerstfoto's alleen in december
            if (photo.season === 'kerst' && !december) return false;
            return true;
        });

        // Als geen foto's beschikbaar, gebruik alle
        if (availablePhotos.length === 0) {
            availablePhotos = window.PIP_PHOTOS;
        }

        // Random selectie
        const randomIndex = Math.floor(Math.random() * availablePhotos.length);
        return availablePhotos[randomIndex];
    }

    // Kies een random advies uit categorie
    function getRandomAdvice(category) {
        const adviceList = window.PIP_ADVICE[category];
        if (!adviceList || adviceList.length === 0) return null;

        // Probeer een ongebruikt advies te vinden
        const unusedAdvice = adviceList.filter((_, index) =>
            !usedAdvice[category].includes(index)
        );

        let selectedIndex;

        if (unusedAdvice.length > 0) {
            // Kies uit ongebruikte adviezen
            const randomUnused = Math.floor(Math.random() * unusedAdvice.length);
            selectedIndex = adviceList.indexOf(unusedAdvice[randomUnused]);
        } else {
            // Alle adviezen gebruikt, reset en kies random
            usedAdvice[category] = [];
            selectedIndex = Math.floor(Math.random() * adviceList.length);
        }

        usedAdvice[category].push(selectedIndex);
        return adviceList[selectedIndex];
    }

    // Toon advies scherm
    function showAdvice(category) {
        currentCategory = category;

        // Haal advies en foto op
        const advice = getRandomAdvice(category);
        const photo = getRandomPhoto();
        const config = CATEGORY_CONFIG[category];

        if (!advice) {
            console.error('Geen advies gevonden voor:', category);
            return;
        }

        // Update UI
        pipPhoto.src = photo.src;
        pipPhoto.alt = photo.alt || 'Pip kijkt je wijselijk aan';
        adviceText.textContent = advice;
        badgeIcon.innerHTML = config.svg;
        badgeText.textContent = config.label;

        // Update badge kleur
        const badge = document.querySelector('.category-badge');
        badge.classList.remove('liefde', 'werk', 'leven');
        badge.classList.add(category);

        // Update kaart kleur
        const card = document.querySelector('.wisdom-card');
        card.classList.remove('liefde', 'werk', 'leven');
        card.classList.add(category);

        // Wissel schermen
        categoryScreen.classList.remove('active');
        adviceScreen.classList.add('active');
    }

    // Toon categorie scherm
    function showCategories() {
        adviceScreen.classList.remove('active');
        categoryScreen.classList.add('active');
        currentCategory = null;
    }

    // Event listeners
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.category;
            showAdvice(category);
        });
    });

    anotherAdviceBtn.addEventListener('click', function() {
        if (currentCategory) {
            showAdvice(currentCategory);
        }
    });

    backToCategoriesBtn.addEventListener('click', showCategories);

    // Info scherm toggle
    const infoBtn = document.getElementById('info-btn');
    const infoBackBtn = document.getElementById('info-back-btn');
    const infoScreen = document.getElementById('info-screen');
    let previousScreen = null;

    infoBtn.addEventListener('click', function() {
        // Onthoud welk scherm actief was
        if (categoryScreen.classList.contains('active')) {
            previousScreen = 'category';
        } else if (adviceScreen.classList.contains('active')) {
            previousScreen = 'advice';
        }

        // Verberg huidige schermen, toon info
        categoryScreen.classList.remove('active');
        adviceScreen.classList.remove('active');
        infoScreen.classList.add('active');
    });

    infoBackBtn.addEventListener('click', function() {
        infoScreen.classList.remove('active');

        // Ga terug naar vorige scherm
        if (previousScreen === 'advice') {
            adviceScreen.classList.add('active');
        } else {
            categoryScreen.classList.add('active');
        }
    });

    // Service Worker registratie
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('sw.js')
                .then(function(registration) {
                    console.log('SW registered:', registration.scope);
                })
                .catch(function(error) {
                    console.log('SW registration failed:', error);
                });
        });
    }
})();
