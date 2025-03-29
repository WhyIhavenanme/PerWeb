document.addEventListener('DOMContentLoaded', () => {
    fetch('blog-files.json')
        .then(response => response.json())
        .then(files => {
            const fileList = document.getElementById('files');
            files.forEach(file => {
                const listItem = document.createElement('md-list-item');
                listItem.setAttribute('type', 'link');
                listItem.setAttribute('href', '#');
                listItem.classList.add('centered-item');

                const headline = document.createElement('div');
                headline.setAttribute('slot', 'headline');  
                // 显示没有扩展名的文件名作为标题
                const displayName = file.split('/').pop().replace('.html', '');
                headline.textContent = displayName;

                listItem.appendChild(headline);
                fileList.appendChild(listItem);

                listItem.addEventListener('click', (event) => {
                    event.preventDefault();
                    // 直接跳转到对应的HTML文件
                    window.open(`/blog/${file}`, '_blank');
                });
            });
        })
        .catch(error => console.error('Error fetching files:', error));
});