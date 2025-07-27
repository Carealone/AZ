// Initialize Lucide icons
lucide.createIcons();

// Product data
const products = [
  {
    id: 1,
    name: "ครีมหน้าใสสูตรไวท์เทนนิ่ง",
    category: "ผิวหน้า",
    price: "฿1,290",
    rating: 4.8,
    features: ["เพิ่มความกระจ่างใส", "ลดจุดด่างดำ", "ส่วนผสมธรรมชาติ"],
    image: "https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=300&h=300"
  },
  {
    id: 2,
    name: "ครีมกันแดด SPF50+",
    category: "กันแดด",
    price: "฿890",
    rating: 4.9,
    features: ["ปกป้อง UV", "ไม่เหนียวเหนอะ", "กันน้ำ"],
    image: "https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=300&h=300"
  },
  {
    id: 3,
    name: "เซรั่มลดริ้วรอย",
    category: "ผิวหน้า",
    price: "฿1,590",
    rating: 4.7,
    features: ["ลดเลือนริ้วรอย", "เพิ่มความชุ่มชื้น", "ซึมซาบเร็ว"],
    image: "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=300&h=300"
  },
  {
    id: 4,
    name: "มาสก์หน้าสูตรคอลลาเจน",
    category: "มาสก์",
    price: "฿690",
    rating: 4.6,
    features: ["บำรุงผิวล้ำลึก", "เพิ่มความยืดหยุ่น", "กลิ่นหอมผ่อนคลาย"],
    image: "https://images.pexels.com/photos/3764541/pexels-photo-3764541.jpeg?auto=compress&cs=tinysrgb&w=300&h=300"
  },
  {
    id: 5,
    name: "ครีมบำรุงกลางคืน",
    category: "ผิวหน้า",
    price: "฿1,190",
    rating: 4.8,
    features: ["ซ่อมแซมผิวขณะนอน", "เพิ่มความชุ่มชื้น", "ลดการอักเสบ"],
    image: "https://images.pexels.com/photos/3373711/pexels-photo-3373711.jpeg?auto=compress&cs=tinysrgb&w=300&h=300"
  },
  {
    id: 6,
    name: "โทนเนอร์สูตรอ่อนโยน",
    category: "ผิวหน้า",
    price: "฿790",
    rating: 4.5,
    features: ["ปรับสมดุลผิว", "ไม่มีแอลกอฮอล์", "เหมาะผิวแพ้ง่าย"],
    image: "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=300&h=300"
  }
];

// Global variables
let currentIndex = 0;
const visibleCount = 4;

// DOM elements
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.getElementById('mobileMenu');
const productsGrid = document.getElementById('productsGrid');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const prevBtnMobile = document.getElementById('prevBtnMobile');
const nextBtnMobile = document.getElementById('nextBtnMobile');

// Mobile menu functionality
function toggleMobileMenu() {
  mobileMenu.classList.toggle('active');
}

// Product carousel functionality
function getVisibleProducts() {
  const result = [];
  for (let i = 0; i < visibleCount; i++) {
    result.push(products[(currentIndex + i) % products.length]);
  }
  return result;
}

function nextProduct() {
  currentIndex = (currentIndex + 1) % products.length;
  renderProducts();
}

function prevProduct() {
  currentIndex = (currentIndex - 1 + products.length) % products.length;
  renderProducts();
}

// Create product card HTML
function createProductCard(product) {
  const featuresHTML = product.features.map(feature => 
    `<span class="product-feature">${feature}</span>`
  ).join('');

  return `
    <div class="product-card">
      <div class="product-image-container">
        <img 
          src="${product.image}" 
          alt="${product.name}" 
          class="product-image"
        />
        <span class="product-category">${product.category}</span>
      </div>
      
      <div class="product-content">
        <h3 class="product-name">${product.name}</h3>
        
        <div class="product-rating">
          <i data-lucide="star"></i>
          <span>${product.rating}</span>
        </div>
        
        <div class="product-features">
          ${featuresHTML}
        </div>
        
        <div class="product-footer">
          <span class="product-price">${product.price}</span>
          <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
            เพิ่มลงตะกร้า
          </button>
        </div>
      </div>
    </div>
  `;
}

// Render products
function renderProducts() {
  const visibleProducts = getVisibleProducts();
  const productsHTML = visibleProducts.map(product => createProductCard(product)).join('');
  productsGrid.innerHTML = productsHTML;
  
  // Re-initialize Lucide icons for new elements
  lucide.createIcons();
}

// Add to cart functionality
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (product) {
    // You can implement cart functionality here
    console.log(`Added to cart: ${product.name}`);
    
    // Show a simple notification
    showNotification(`เพิ่ม ${product.name} ลงตะกร้าแล้ว`);
  }
}

// Show notification
function showNotification(message) {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  
  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: var(--primary);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    box-shadow: var(--shadow-medium);
    z-index: 1000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    font-weight: 500;
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
  const navLinks = document.querySelectorAll('a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (mobileMenu.classList.contains('active')) {
          mobileMenu.classList.remove('active');
        }
      }
    });
  });
}

// Header scroll effect
function initHeaderScrollEffect() {
  let lastScrollTop = 0;
  
  window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      header.style.transform = 'translateY(-100%)';
    } else {
      // Scrolling up
      header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
  });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize mobile menu
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  }
  
  // Initialize product carousel
  if (prevBtn) prevBtn.addEventListener('click', prevProduct);
  if (nextBtn) nextBtn.addEventListener('click', nextProduct);
  if (prevBtnMobile) prevBtnMobile.addEventListener('click', prevProduct);
  if (nextBtnMobile) nextBtnMobile.addEventListener('click', nextProduct);
  
  // Render initial products
  renderProducts();
  
  // Initialize smooth scrolling
  initSmoothScrolling();
  
  // Initialize header scroll effect
  initHeaderScrollEffect();
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.remove('active');
    }
  });
  
  // Close mobile menu on window resize
  window.addEventListener('resize', function() {
    if (window.innerWidth >= 768) {
      mobileMenu.classList.remove('active');
    }
  });
});

// Add some additional interactive features

// Hero button click handler
document.addEventListener('DOMContentLoaded', function() {
  const heroButton = document.querySelector('.hero .btn');
  if (heroButton) {
    heroButton.addEventListener('click', function() {
      const productsSection = document.querySelector('#products');
      if (productsSection) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = productsSection.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  }
});

// Add loading animation for images
function initImageLoading() {
  const images = document.querySelectorAll('img');
  
  images.forEach(img => {
    img.addEventListener('load', function() {
      this.style.opacity = '1';
    });
    
    img.addEventListener('error', function() {
      this.style.opacity = '0.5';
      this.style.filter = 'grayscale(100%)';
    });
    
    // Set initial opacity
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
  });
}

// Initialize image loading
document.addEventListener('DOMContentLoaded', initImageLoading);

// Add keyboard navigation for product carousel
document.addEventListener('keydown', function(e) {
  if (e.key === 'ArrowLeft') {
    prevProduct();
  } else if (e.key === 'ArrowRight') {
    nextProduct();
  }
});

// Add touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
  touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;
  
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // Swipe left - next product
      nextProduct();
    } else {
      // Swipe right - previous product
      prevProduct();
    }
  }
} 