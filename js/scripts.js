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

// マウス追跡効果
function initMouseTracker() {
    if (window.innerWidth <= 768) return; // モバイルでは無効
    
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(139, 92, 246, 0.8), transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    // ホバー可能な要素での効果
    const hoverElements = document.querySelectorAll('a, button, .hobby-section, .location-section');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            cursor.style.background = 'radial-gradient(circle, rgba(168, 85, 247, 0.6), transparent)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'radial-gradient(circle, rgba(139, 92, 246, 0.8), transparent)';
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
    initMouseTracker();
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
    // モバイルでパーティクルとマウストラッカーを無効化
    if (window.innerWidth <= 768) {
        const particles = document.querySelector('.particle-container');
        const cursor = document.querySelector('.custom-cursor');
        if (particles) particles.style.display = 'none';
        if (cursor) cursor.style.display = 'none';
    } else {
        const particles = document.querySelector('.particle-container');
        const cursor = document.querySelector('.custom-cursor');
        if (particles) particles.style.display = 'block';
        if (cursor) cursor.style.display = 'block';
    }
});

// BGM Player Functionality
class BGMPlayer {
    constructor() {
        this.audio = document.getElementById('bgm-audio');
        this.toggleButton = document.getElementById('bgm-toggle');
        this.volumeSlider = document.getElementById('volume-slider');
        this.volumeButton = document.getElementById('volume-button');
        this.trackTitle = document.getElementById('track-title');
        this.isPlaying = false;
        this.isMuted = false;
        this.previousVolume = 50;
        
        this.init();
    }
    
    init() {
        if (!this.audio) return;
        
        // 初期設定
        this.audio.volume = 0.5;
        this.setTrackTitle();
        
        // イベントリスナーの設定
        this.setupEventListeners();
        
        // ローカルストレージから設定を復元
        this.loadSettings();
        
        // ユーザーインタラクション後の自動再生準備
        this.setupAutoPlay();
    }
    
    setupEventListeners() {
        // 再生/停止ボタン
        if (this.toggleButton) {
            this.toggleButton.addEventListener('click', () => {
                this.toggle();
            });
        }
        
        // 音量スライダー
        if (this.volumeSlider) {
            this.volumeSlider.addEventListener('input', (e) => {
                this.setVolume(e.target.value);
            });
        }
        
        // 音量ボタン（ミュート/アンミュート）
        if (this.volumeButton) {
            this.volumeButton.addEventListener('click', () => {
                this.toggleMute();
            });
        }
        
        // オーディオイベント
        this.audio.addEventListener('ended', () => {
            this.stop();
        });
        
        this.audio.addEventListener('error', (e) => {
            console.warn('BGM loading error:', e);
            this.handleError();
        });
        
        this.audio.addEventListener('canplaythrough', () => {
            console.log('BGM loaded successfully');
        });
    }
    
    setupAutoPlay() {
        // ユーザーが最初にページと相互作用したときにBGMを開始
        const enableAutoPlay = () => {
            const autoPlay = localStorage.getItem('bgm-autoplay');
            if (autoPlay === 'true' && !this.isPlaying) {
                this.play();
            }
            // イベントリスナーを削除（一度だけ実行）
            document.removeEventListener('click', enableAutoPlay);
            document.removeEventListener('keydown', enableAutoPlay);
            document.removeEventListener('touchstart', enableAutoPlay);
        };
        
        document.addEventListener('click', enableAutoPlay);
        document.addEventListener('keydown', enableAutoPlay);
        document.addEventListener('touchstart', enableAutoPlay);
    }
    
    async play() {
        try {
            await this.audio.play();
            this.isPlaying = true;
            this.updateUI();
            this.saveSettings();
            console.log('BGM started playing');
        } catch (error) {
            console.warn('BGM autoplay prevented:', error);
            this.handleError();
        }
    }
    
    pause() {
        this.audio.pause();
        this.isPlaying = false;
        this.updateUI();
        this.saveSettings();
    }
    
    stop() {
        this.audio.pause();
        this.audio.currentTime = 0;
        this.isPlaying = false;
        this.updateUI();
        this.saveSettings();
    }
    
    toggle() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }
    
    setVolume(value) {
        const volume = Math.max(0, Math.min(100, value)) / 100;
        this.audio.volume = volume;
        this.volumeSlider.value = value;
        
        // ミュート状態の更新
        if (volume === 0) {
            this.isMuted = true;
        } else {
            this.isMuted = false;
            this.previousVolume = value;
        }
        
        this.updateVolumeUI();
        this.saveSettings();
    }
    
    toggleMute() {
        if (this.isMuted) {
            this.setVolume(this.previousVolume);
        } else {
            this.previousVolume = this.volumeSlider.value;
            this.setVolume(0);
        }
    }
    
    updateUI() {
        if (!this.toggleButton) return;
        
        if (this.isPlaying) {
            this.toggleButton.classList.add('playing');
            this.toggleButton.setAttribute('aria-label', 'BGMを停止');
        } else {
            this.toggleButton.classList.remove('playing');
            this.toggleButton.setAttribute('aria-label', 'BGMを再生');
        }
    }
    
    updateVolumeUI() {
        if (!this.volumeButton) return;
        
        const volume = this.audio.volume;
        let icon = '🔊';
        
        if (volume === 0 || this.isMuted) {
            icon = '🔇';
        } else if (volume < 0.3) {
            icon = '🔈';
        } else if (volume < 0.7) {
            icon = '🔉';
        }
        
        this.volumeButton.textContent = icon;
    }
    
    setTrackTitle() {
        if (!this.trackTitle) return;
        
        // オーディオファイルのパスから曲名を取得
        const src = this.audio.currentSrc || this.audio.src;
        if (src) {
            const filename = src.split('/').pop().split('.')[0];
            this.trackTitle.textContent = this.formatTrackName(filename);
        } else {
            this.trackTitle.textContent = 'BGM';
        }
    }
    
    formatTrackName(filename) {
        // ファイル名を読みやすい形式に変換
        return filename
            .replace(/bgm-/gi, '')
            .replace(/[-_]/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ') || 'BGM';
    }
    
    handleError() {
        console.warn('BGM could not be loaded or played');
        if (this.trackTitle) {
            this.trackTitle.textContent = 'BGM (無効)';
        }
        if (this.toggleButton) {
            this.toggleButton.style.opacity = '0.5';
            this.toggleButton.style.cursor = 'not-allowed';
        }
    }
    
    saveSettings() {
        try {
            localStorage.setItem('bgm-volume', this.volumeSlider.value);
            localStorage.setItem('bgm-muted', this.isMuted);
            localStorage.setItem('bgm-autoplay', this.isPlaying);
        } catch (error) {
            console.warn('Could not save BGM settings:', error);
        }
    }
    
    loadSettings() {
        try {
            const volume = localStorage.getItem('bgm-volume');
            const muted = localStorage.getItem('bgm-muted') === 'true';
            
            if (volume !== null) {
                this.setVolume(parseInt(volume));
            }
            
            if (muted) {
                this.toggleMute();
            }
        } catch (error) {
            console.warn('Could not load BGM settings:', error);
        }
    }
}

// BGMプレイヤーの初期化
let bgmPlayer;

// ページロード時にBGMプレイヤーを初期化
document.addEventListener('DOMContentLoaded', () => {
    // 既存の初期化コードは保持
    
    // BGMプレイヤーの初期化
    if (document.getElementById('bgm-audio')) {
        bgmPlayer = new BGMPlayer();
    }
});

// ページ離脱時にBGM設定を保存
window.addEventListener('beforeunload', () => {
    if (bgmPlayer) {
        bgmPlayer.saveSettings();
    }
});

// ページ可視性変更時の処理（他のタブに移動した時など）
document.addEventListener('visibilitychange', () => {
    if (bgmPlayer && bgmPlayer.isPlaying) {
        if (document.hidden) {
            // ページが非表示になった時の処理
            console.log('Page hidden, BGM continues playing');
        } else {
            // ページが表示された時の処理
            console.log('Page visible, BGM continues playing');
        }
    }
});