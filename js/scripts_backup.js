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

// EmailJS設定（EmailJSを使用する場合）
function initEmailJS() {
    // EmailJSの初期化（実際のPublic Keyに置き換えてください）
    // emailjs.init("YOUR_PUBLIC_KEY");
    
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        // Netlify Formsを使用している場合はEmailJSは無効化
        if (contactForm.hasAttribute('data-netlify')) {
            return; // Netlify Formsに任せる
        }
        
        e.preventDefault();
        
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        // ローディング状態
        submitBtn.textContent = '送信中...';
        submitBtn.disabled = true;
        
        // EmailJSでメール送信（実際のService IDとTemplate IDに置き換えてください）
        /*
        emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                
                // 成功時の処理
                showNotification('メッセージが送信されました！', 'success');
                contactForm.reset();
                
                // ボタンを元に戻す
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
            }, function(error) {
                console.log('FAILED...', error);
                
                // エラー時の処理
                showNotification('送信に失敗しました。もう一度お試しください。', 'error');
                
                // ボタンを元に戻す
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        */
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

// 新しい動的エフェクト

// 量子パーティクル生成
function createQuantumParticles() {
    const container = document.createElement('div');
    container.className = 'quantum-particles';
    container.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    
    document.body.appendChild(container);
    
    function generateParticle() {
        const particle = document.createElement('div');
        particle.className = 'quantum-particle';
        
        const size = Math.random() * 4 + 2;
        const startX = Math.random() * window.innerWidth;
        const endX = startX + (Math.random() - 0.5) * 200;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            left: ${startX}px;
            width: ${size}px;
            height: ${size}px;
            animation: quantumFloat ${duration}s linear infinite;
            animation-delay: ${delay}s;
            background: radial-gradient(circle, 
                hsl(${Math.random() * 60 + 240}, 70%, 60%), 
                transparent);
        `;
        
        container.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, (duration + delay) * 1000);
    }
    
    // パーティクルを定期的に生成
    setInterval(generateParticle, 500);
}

// マウス追従エフェクト
function initMouseTrail() {
    const trail = [];
    const trailLength = 20;
    
    document.addEventListener('mousemove', (e) => {
        trail.push({
            x: e.clientX,
            y: e.clientY,
            time: Date.now()
        });
        
        if (trail.length > trailLength) {
            trail.shift();
        }
        
        updateTrail();
    });
    
    function updateTrail() {
        // 既存のトレイル要素を削除
        document.querySelectorAll('.mouse-trail').forEach(el => el.remove());
        
        trail.forEach((point, index) => {
            const trailElement = document.createElement('div');
            trailElement.className = 'mouse-trail';
            
            const opacity = index / trailLength;
            const size = (index / trailLength) * 10 + 2;
            
            trailElement.style.cssText = `
                position: fixed;
                left: ${point.x - size/2}px;
                top: ${point.y - size/2}px;
                width: ${size}px;
                height: ${size}px;
                background: radial-gradient(circle, 
                    rgba(139, 92, 246, ${opacity}), 
                    transparent);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9998;
                transform: scale(${opacity});
            `;
            
            document.body.appendChild(trailElement);
            
            setTimeout(() => {
                if (trailElement.parentNode) {
                    trailElement.remove();
                }
            }, 1000);
        });
    }
}

// テキストタイピングエフェクト
function initTypingEffect() {
    const typingElements = document.querySelectorAll('.typing-text');
    
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '2px solid #8b5cf6';
        
        let i = 0;
        const timer = setInterval(() => {
            element.textContent += text[i];
            i++;
            
            if (i >= text.length) {
                clearInterval(timer);
                setTimeout(() => {
                    element.style.borderRight = 'none';
                }, 1000);
            }
        }, 100);
    });
}

// グリッチエフェクト（クリック時）
function initGlitchEffect() {
    const glitchElements = document.querySelectorAll('h1, h2, h3');
    
    glitchElements.forEach(element => {
        element.addEventListener('click', () => {
            const originalText = element.textContent;
            element.setAttribute('data-text', originalText);
            element.classList.add('glitch');
            
            setTimeout(() => {
                element.classList.remove('glitch');
                element.removeAttribute('data-text');
            }, 1000);
        });
    });
}

// 磁気場エフェクト
function initMagneticEffect() {
    const magneticElements = document.querySelectorAll('.hobby-section, .location-section, .cta-button');
    
    magneticElements.forEach(element => {
        element.classList.add('magnetic-field');
        
        element.addEventListener('mouseenter', (e) => {
            element.style.transform = 'scale(1.02) rotate(1deg)';
        });
        
        element.addEventListener('mouseleave', (e) => {
            element.style.transform = 'scale(1) rotate(0deg)';
        });
        
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const rotateX = (y / rect.height) * 5;
            const rotateY = (x / rect.width) * -5;
            
            element.style.transform = `
                scale(1.02) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg)
                translateZ(10px)
            `;
        });
    });
}

// 液体ブロブエフェクト
function createLiquidBlobs() {
    const blobContainer = document.createElement('div');
    blobContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
        overflow: hidden;
    `;
    
    document.body.appendChild(blobContainer);
    
    for (let i = 0; i < 5; i++) {
        const blob = document.createElement('div');
        blob.className = 'liquid-blob';
        
        const size = Math.random() * 200 + 100;
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const duration = Math.random() * 20 + 10;
        
        blob.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            opacity: 0.1;
            animation: liquidMorph ${duration}s ease-in-out infinite,
                       liquidFloat ${duration * 2}s ease-in-out infinite;
        `;
        
        blobContainer.appendChild(blob);
    }
    
    // 液体フロートアニメーション用CSS追加
    const style = document.createElement('style');
    style.textContent = `
        @keyframes liquidFloat {
            0%, 100% { transform: translate(0, 0) scale(1); }
            25% { transform: translate(50px, -30px) scale(1.1); }
            50% { transform: translate(-30px, 50px) scale(0.9); }
            75% { transform: translate(30px, 30px) scale(1.05); }
        }
    `;
    document.head.appendChild(style);
}

// 画面分割エフェクト
function initScreenSplitEffect() {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach((section, index) => {
        section.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
        section.style.transition = 'clip-path 0.8s ease-in-out';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // ランダムな分割パターン
                    const patterns = [
                        'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                        'polygon(0 0, 100% 0, 95% 100%, 5% 100%)',
                        'polygon(5% 0, 100% 0, 100% 100%, 0 100%)',
                        'polygon(0 0, 95% 0, 100% 100%, 5% 100%)'
                    ];
                    
                    entry.target.style.clipPath = patterns[index % patterns.length];
                } else {
                    entry.target.style.clipPath = 'polygon(50% 0, 50% 0, 50% 100%, 50% 100%)';
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(section);
    });
}

// オーロラカーテンエフェクト
function createAuroraCurtain() {
    const aurora = document.createElement('div');
    aurora.className = 'aurora';
    aurora.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
        opacity: 0.3;
        mix-blend-mode: overlay;
    `;
    
    document.body.appendChild(aurora);
}

// 時空歪みエフェクト
function initSpacetimeWarp() {
    const warpElements = document.querySelectorAll('.hero, .about-page .section:first-of-type');
    
    warpElements.forEach(element => {
        element.classList.add('spacetime-warp');
        
        element.addEventListener('mouseenter', () => {
            element.style.transform = 'perspective(1000px) rotateX(5deg) rotateY(5deg)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
    });
}

// パララックス強化
function enhancedParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // 背景要素のパララックス
        const parallaxElements = document.querySelectorAll('.floating-shapes, .quantum-particles');
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
        
        // セクションの微細な動き
        const sections = document.querySelectorAll('.section');
        sections.forEach((section, index) => {
            const speed = (index + 1) * 0.1;
            section.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// 3D Transform エフェクト
function init3DTransforms() {
    const transform3DElements = document.querySelectorAll('.hobby-img, .location-img');
    
    transform3DElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.transform = `
                perspective(1000px) 
                rotateY(15deg) 
                rotateX(10deg) 
                translateZ(20px)
                scale(1.05)
            `;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px) scale(1)';
        });
    });
}

// すべてのアニメーションの初期化
document.addEventListener('DOMContentLoaded', function() {
    // 既存のコード...
    
    // 新しいエフェクトを初期化
    createScrollProgress();
    initScrollAnimations();
    createParticles();
    animateCounters();
    addRippleEffect();
    initBackgroundAnimation();
    initParallax();
    init3DCards();
    
    // 画像モーダル機能を初期化
    initImageModal();
    
    // フォーム機能を初期化
    initEmailJS();
    enhanceFormValidation();
    
    // 新しいエフェクトを初期化
    if (window.innerWidth > 768) { // デスクトップのみ
        createQuantumParticles();
        initMouseTrail();
        createLiquidBlobs();
        createAuroraCurtain();
    }
    
    initTypingEffect();
    initGlitchEffect();
    initMagneticEffect();
    initScreenSplitEffect();
    initSpacetimeWarp();
    enhancedParallax();
    init3DTransforms();
    
    // ページロード完了後の追加効果
    setTimeout(() => {
        document.body.style.overflow = 'visible';
        
        // ホログラフィック効果を見出しに適用
        const titles = document.querySelectorAll('h1, h2');
        titles.forEach(title => {
            if (!title.classList.contains('holographic')) {
                title.classList.add('holographic');
            }
        });
        
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