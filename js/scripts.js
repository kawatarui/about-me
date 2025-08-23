// filepath: /Users/ktc/Documents/GitHub/about-me/js/scripts.js

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