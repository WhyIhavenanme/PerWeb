
        // 当DOM内容加载完成后，开始执行脚本
        document.addEventListener('DOMContentLoaded', () => {
            // 获取元素
            const themeToggleButton = document.getElementById('theme-toggle-button');
            const githubIcon = document.getElementById('github-icon');
        
            // 检测系统颜色模式并应用相应的主题
            function applyTheme() {
                const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (isDarkMode) {
                    document.documentElement.classList.add('dark-theme');
                    document.documentElement.classList.remove('light-theme');
                    githubIcon.src = 'icons/github-mark-white.png'; // 设置为白色图标
                } else {
                    document.documentElement.classList.add('light-theme');
                    document.documentElement.classList.remove('dark-theme');
                    githubIcon.src = 'icons/github-mark.png'; // 设置为默认图标
                }
            }
        
            // 初始应用主题
            applyTheme();
        
            // 监听系统颜色模式变化
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme);
        
            // 切换图标
            function updateIcon() {
                if (document.documentElement.classList.contains('dark-theme')) {
                    githubIcon.src = 'icons/github-mark-white.png';
                } else {
                    githubIcon.src = 'icons/github-mark.png';
                }
            }
        
            // 初始设置图标
            updateIcon();
        
            // 监听主题切换按钮的变化
            themeToggleButton.addEventListener('click', () => {
                if (document.documentElement.classList.contains('dark-theme')) {
                    document.documentElement.classList.remove('dark-theme');
                    document.documentElement.classList.add('light-theme');
                } else {
                    document.documentElement.classList.remove('light-theme');
                    document.documentElement.classList.add('dark-theme');
                }
                updateIcon();
            });
        });