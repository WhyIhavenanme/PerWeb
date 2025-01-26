// 当DOM内容加载完成后，开始执行脚本
document.addEventListener('DOMContentLoaded', () => {
    // 获取元素
    const fireworksButton = document.getElementById('fireworks-button');
    // 监听按钮点击事件
    fireworksButton.addEventListener('click', () => {
        // 创建一个烟花效果
        const duration = 1 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 15, spread: 360, ticks: 120, zIndex: 0 };
        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }
        const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) {
                return clearInterval(interval);
            }
            const particleCount = 50 * (timeLeft / duration);
            // since particles fall down, start a bit higher than random
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            });
        }, 150);
    });
});
