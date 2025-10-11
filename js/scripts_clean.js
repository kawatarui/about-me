// filepath: /Users/ktc/Documents/GitHub/about-me/js/scripts.js

// ハンバーガーメニューの機能
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburgerMenu && navMenu) {
        hamburgerMenu.addEventListener('click', function() {
            hamburgerMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // アクセシビリティのためのaria-label更新
            if (navMenu.classList.contains('active')) {
                hamburgerMenu.setAttribute('aria-label', 'メニューを閉じる');
                document.body.style.overflow = 'hidden'; // スクロール防止
            } else {
                hamburgerMenu.setAttribute('aria-label', 'メニューを開く');
                document.body.style.overflow = ''; // スクロール復活
            }
        });
        
        // メニューリンクをクリックした時にメニューを閉じる
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburgerMenu.classList.remove('active');
                navMenu.classList.remove('active');
                hamburgerMenu.setAttribute('aria-label', 'メニューを開く');
                document.body.style.overflow = '';
            });
        });
        
        // オーバーレイクリックでメニューを閉じる
        navMenu.addEventListener('click', function(e) {
            if (e.target === navMenu) {
                hamburgerMenu.classList.remove('active');
                navMenu.classList.remove('active');
                hamburgerMenu.setAttribute('aria-label', 'メニューを開く');
                document.body.style.overflow = '';
            }
        });
        
        // ESCキーでメニューを閉じる
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                hamburgerMenu.classList.remove('active');
                navMenu.classList.remove('active');
                hamburgerMenu.setAttribute('aria-label', 'メニューを開く');
                document.body.style.overflow = '';
            }
        });
    }
});

// ページ読み込み時のフェードインアニメーション
document.addEventListener('DOMContentLoaded', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease-in-out';
    
    setTimeout(function() {
        document.body.style.opacity = '1';
    }, 100);
});

// ナビゲーションリンクにクリックイベントを追加
document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // 外部リンクでない場合のみアニメーション適用
        if (href && !href.startsWith('http') && !href.startsWith('mailto')) {
            e.preventDefault();
            
            // フェードアウトしてからページ遷移
            document.body.style.opacity = '0';
            
            setTimeout(function() {
                window.location.href = href;
            }, 300);
        }
    });
});

// スクロールプログレスバーの作成
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// スクロール時のフェードインアニメーション
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // 要素に fade-in-on-scroll クラスを追加
    const sections = document.querySelectorAll('.hobby-section, .location-section, .profile');
    sections.forEach((section, index) => {
        section.classList.add('fade-in-on-scroll');
        section.classList.add(`animate-delay-${(index % 5) + 1}`);
        observer.observe(section);
    });
}

// パーティクル効果の作成
function createParticles() {
    if (window.innerWidth <= 768) return; // モバイルでは無効
    
    const container = document.createElement('div');
    container.className = 'particle-container';
    document.body.appendChild(container);
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const startX = Math.random() * window.innerWidth;
        const endX = startX + (Math.random() - 0.5) * 200;
        const size = Math.random() * 4 + 2;
        const duration = Math.random() * 3 + 5;
        
        particle.style.left = startX + 'px';
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.animationDuration = duration + 's';
        particle.style.setProperty('--endX', endX + 'px');
        
        container.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    }
    
    // パーティクルを定期的に生成
    setInterval(createParticle, 300);
}

// カウンターアニメーション
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    counter.textContent = Math.floor(current);
                }, 16);
                
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

// リップル効果
function addRippleEffect() {
    const buttons = document.querySelectorAll('button, .cta-button, .submit-btn');
    
    buttons.forEach(button => {
        button.classList.add('ripple-button');
        
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// 背景のグラデーションアニメーション
function initBackgroundAnimation() {
    const pages = document.querySelectorAll('.about-page, .contact-page');
    pages.forEach(page => {
        page.classList.add('gradient-animation');
    });
}

// 視差効果（パララックス）
function initParallax() {
    if (window.innerWidth <= 768) return; // モバイルでは無効
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        const parallaxElements = document.querySelectorAll('.floating-shapes');
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// 3Dカード効果の初期化
function init3DCards() {
    const container = document.querySelector('.container');
    if (container) {
        container.classList.add('card-3d');
    }
}

// 画像拡大モーダル機能
function initImageModal() {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const modalClose = document.getElementById('modalClose');
    
    if (!modal || !modalImage || !modalCaption || !modalClose) return;
    
    // クリック可能な画像を選択
    const clickableImages = document.querySelectorAll('.location-img, .hobby-img');
    
    // 各画像にクリックイベントを追加
    clickableImages.forEach(img => {
        img.addEventListener('click', function() {
            openModal(this);
        });
        
        // キーボードアクセシビリティ
        img.setAttribute('tabindex', '0');
        img.setAttribute('role', 'button');
        img.setAttribute('aria-label', 'クリックして画像を拡大表示');
        
        img.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openModal(this);
            }
        });
    });
    
    // モーダルを開く関数
    function openModal(imgElement) {
        modalImage.src = imgElement.src;
        modalImage.alt = imgElement.alt;
        modalCaption.textContent = imgElement.alt;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        modalClose.focus(); // アクセシビリティのためフォーカス
    }
    
    // モーダルを閉じる関数
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        modalImage.src = '';
        modalCaption.textContent = '';
    }
    
    // 閉じるボタンのクリックイベント
    modalClose.addEventListener('click', closeModal);
    
    // モーダル背景のクリックで閉じる
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // ESCキーで閉じる
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // 画像読み込みエラー時の処理
    modalImage.addEventListener('error', function() {
        modalCaption.textContent = '画像の読み込みに失敗しました';
    });
}

// 通知表示機能
function showNotification(message, type = 'info') {
    // 既存の通知を削除
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // 通知要素を作成
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span class="notification-message">${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // スタイル設定
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 400px;
        font-weight: 500;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // 閉じるボタンのスタイル
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
    `;
    
    // 閉じる機能
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // 自動で消える
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
    
    // DOMに追加
    document.body.appendChild(notification);
}

// フォームバリデーション強化
function enhanceFormValidation() {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearErrors);
    });
    
    function validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        
        // エラーメッセージをクリア
        clearFieldError(field);
        
        if (!value) {
            showFieldError(field, 'この項目は必須です');
            return false;
        }
        
        if (field.type === 'email' && !isValidEmail(value)) {
            showFieldError(field, '有効なメールアドレスを入力してください');
            return false;
        }
        
        return true;
    }
    
    function clearErrors(e) {
        clearFieldError(e.target);
    }
    
    function showFieldError(field, message) {
        field.style.borderColor = '#EF4444';
        
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: #EF4444;
            font-size: 0.9rem;
            margin-top: 0.5rem;
        `;
        
        field.parentNode.appendChild(errorElement);
    }
    
    function clearFieldError(field) {
        field.style.borderColor = '';
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }
    
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
}

// アニメーション初期化
document.addEventListener('DOMContentLoaded', function() {
    // 基本機能の初期化
    createScrollProgress();
    initScrollAnimations();
    initImageModal();
    enhanceFormValidation();
    addRippleEffect();
    initBackgroundAnimation();
    
    // デスクトップのみで有効化するエフェクト
    if (window.innerWidth > 768) {
        createParticles();
        animateCounters();
        initParallax();
        init3DCards();
    }
});

// ウィンドウリサイズ時の処理
window.addEventListener('resize', () => {
    // モバイルでパーティクルを無効化
    if (window.innerWidth <= 768) {
        const particles = document.querySelector('.particle-container');
        if (particles) particles.style.display = 'none';
    } else {
        const particles = document.querySelector('.particle-container');
        if (particles) particles.style.display = 'block';
    }
});
