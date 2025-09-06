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

// 追加のアニメーション機能

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

// すべてのアニメーションの初期化
document.addEventListener('DOMContentLoaded', function() {
    // 既存のコード...
    
    // 新しいアニメーション機能を初期化
    createScrollProgress();
    initScrollAnimations();
    createParticles();
    animateCounters();
    addRippleEffect();
    initBackgroundAnimation();
    initParallax();
    init3DCards();
    
    // ページロード完了後の追加効果
    setTimeout(() => {
        document.body.style.overflow = 'visible';
    }, 1000);
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