// AURINZA Website JavaScript

// Product data
const products = [
    {
        id: 1,
        name: "SET 1 ก้อน",
        price: "139.-",
        originalPrice: null,
        image: "public/images/persimmon-promotion.jpg",
        description: "Persimmon Deodorant Soap ช่วยลดกลิ่นกาย",
        badge: null,
    },
    {
        id: 2,
        name: "Duo Deo Set (2 ก้อน)",
        price: "259.-",
        originalPrice: "278.-",
        image: "public/images/persimmon-promotion.jpg",
        description: "ซื้อคู่ประหยัดกว่า เหมาะสำหรับครอบครัว",
        badge: "ประหยัด",
    },
    {
        id: 3,
        name: "Family Fresh Set (4 ก้อน)",
        price: "500.-",
        originalPrice: "556.-",
        image: "public/images/persimmon-promotion.jpg",
        description: "ซื้อครอบครัว ประหยัดสุด",
        badge: "ขายดี",
    },
    {
        id: 4,
        name: "Gentle Glow Set",
        price: "500.-",
        originalPrice: null,
        image: "public/images/gentle-glow-set.jpg",
        description: "เซ็ตบำรุงผิว สำโกลว์",
        badge: "แนะนำ",
    },
    {
        id: 5,
        name: "Bright Detox Set",
        price: "595.-",
        originalPrice: null,
        image: "public/images/bright-detox-set.jpg",
        description: "เซ็ตบำรุงผิวใสรัก ออร่า",
        badge: "ใหม่",
    },
    {
        id: 6,
        name: "Clear Radiance Cleanser",
        price: "350.-",
        originalPrice: null,
        image: "public/images/clear-radiance.jpg",
        description: "เปิดประสบการณ์ผิวสำ กับคลีนเซอร์ที่ความสะอาดผิวหน้า",
        badge: null,
    },
];

// DOM Elements
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const productsGrid = document.getElementById('products-grid');

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializeMobileMenu();
    loadProducts();
    initializeScrollAnimations();
    initializeSmoothScrolling();
    initializeContactButtons();
    initializeStatsCounter();
});

// Mobile menu functionality
function initializeMobileMenu() {
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });
    }
}

// Load products into the grid
function loadProducts() {
    if (!productsGrid) return;

    productsGrid.innerHTML = products.map((product, index) => `
        <div class="product-card loading" style="animation-delay: ${index * 0.1}s">
            <div class="product-image h-64 overflow-hidden">
                <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover">
                ${product.badge ? `<div class="badge">${product.badge}</div>` : ''}
            </div>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-2">${product.name}</h3>
                <p class="text-gray-600 text-sm mb-4 line-clamp-2">${product.description}</p>
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <span class="text-2xl font-bold text-blue-600">฿${product.price}</span>
                        ${product.originalPrice ? `<span class="text-sm text-gray-500 line-through">฿${product.originalPrice}</span>` : ''}
                    </div>
                    <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-300 text-sm">
                        สั่งซื้อ
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    // Add loaded class after a short delay for animation
    setTimeout(() => {
        const productCards = productsGrid.querySelectorAll('.product-card');
        productCards.forEach(card => {
            card.classList.add('loaded');
        });
    }, 100);
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.animate-fade-in-up');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Contact buttons functionality
function initializeContactButtons() {
    // Phone button
    const phoneBtn = document.querySelector('button:contains("โทรเลย")');
    if (phoneBtn) {
        phoneBtn.addEventListener('click', function() {
            window.open('tel:0986164264', '_self');
        });
    }

    // LINE button
    const lineBtn = document.querySelector('button:contains("LINE Chat")');
    if (lineBtn) {
        lineBtn.addEventListener('click', function() {
            window.open('https://line.me/ti/p/@acaurinza', '_blank');
        });
    }

    // Shop buttons
    const shopButtons = document.querySelectorAll('button:contains("ช้อปเลย"), button:contains("สั่งซื้อ")');
    shopButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // You can add your shopping cart logic here
            alert('กำลังพัฒนา ระบบสั่งซื้อออนไลน์');
        });
    });
}

// Stats counter animation
function initializeStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                const isPercentage = finalValue.includes('%');
                const numericValue = parseInt(finalValue.replace(/[^\d]/g, ''));
                
                animateCounter(target, 0, numericValue, isPercentage);
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => {
        statsObserver.observe(stat);
    });
}

// Counter animation function
function animateCounter(element, start, end, isPercentage) {
    const duration = 2000;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (end - start) * progress);
        element.textContent = isPercentage ? `${current}%` : current;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('nav');
    if (window.scrollY > 100) {
        navbar.classList.add('bg-white/95', 'shadow-md');
    } else {
        navbar.classList.remove('bg-white/95', 'shadow-md');
    }
});

// Add loading animation to images
function preloadImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
    });
}

// Initialize image preloading
preloadImages();

// Add hover effects to product cards
document.addEventListener('mouseover', function(e) {
    if (e.target.closest('.product-card')) {
        const card = e.target.closest('.product-card');
        card.classList.add('card-hover');
    }
});

document.addEventListener('mouseout', function(e) {
    if (e.target.closest('.product-card')) {
        const card = e.target.closest('.product-card');
        card.classList.remove('card-hover');
    }
});

// Form validation (if you add forms later)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('border-red-500');
            isValid = false;
        } else {
            input.classList.remove('border-red-500');
        }
    });
    
    return isValid;
}

// Utility function to check if element contains text
Element.prototype.contains = function(text) {
    return this.textContent.includes(text);
};

// Add this to the Element prototype if it doesn't exist
if (!Element.prototype.contains) {
    Element.prototype.contains = function(text) {
        return this.textContent.includes(text);
    };
}

// Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Initialize lazy loading
initializeLazyLoading();

// Add some interactive features
console.log('AURINZA Website loaded successfully! 🎉'); 
