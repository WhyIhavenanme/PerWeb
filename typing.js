/**
 * 为指定元素添加打字效果
 * @param {HTMLElement} element - 需要添加打字效果的元素
 * @returns {Promise} - 返回一个Promise，在打字效果完成时解决
 */
function typeText(element) {
    return new Promise((resolve) => {
        const text = element.textContent;
        const printonebyone = element.dataset.printonebyone === 'true';
        const iInterval = parseInt(element.dataset.iinterval) || 100;

        if (!printonebyone) {
            resolve();
            return;
        }

        element.textContent = '';
        element.style.visibility = 'visible';
        let index = 0;

        function addLetter() {
            if (index >= text.length) {
                resolve();
                return;
            }

            const span = document.createElement('span');
            span.textContent = text[index];
            span.className = 'fade-in';
            element.appendChild(span);
            setTimeout(() => span.style.opacity = '1', iInterval);
            index++;
            setTimeout(addLetter, iInterval);
        }

        addLetter();
    });
}

/**
 * 为所有具有.typing类的元素添加打字效果
 */
async function typeAllText() {
    const typingElements = document.querySelectorAll('.typing'); // 获取所有.typing元素
    for (const element of typingElements) {
        await typeText(element); // 为每个元素添加打字效果，并等待完成
    }
}

// 当DOM内容加载完成后，开始执行打字效果
document.addEventListener('DOMContentLoaded', typeAllText);
