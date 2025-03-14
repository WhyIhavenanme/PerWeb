document.addEventListener('DOMContentLoaded', () => {
    fetch('files.json')
        .then(response => response.json())
        .then(files => {
            const fileList = document.getElementById('files');
            files.forEach(file => {
                const listItem = document.createElement('md-list-item');
                listItem.setAttribute('type', 'link');
                listItem.setAttribute('href', `#`);
                listItem.classList.add('centered-item'); // 添加自定义类
                
                const headline = document.createElement('div');
                headline.setAttribute('slot', 'headline');
                headline.textContent = file;

                listItem.appendChild(headline);
                fileList.appendChild(listItem);

                listItem.addEventListener('click', (event) => {
                    event.preventDefault();
                    fetch(`blog/${file}`)
                        .then(response => response.text())
                        .then(markdown => {
                            const newWindow = window.open('', '_blank');
                            newWindow.document.write(`
                                <!DOCTYPE html>
                                <html lang="en">
                                <head>
                                    <meta charset="UTF-8">
                                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                    <title>${file}</title>
                                    <link rel="stylesheet" href="style.css">
                                    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
                                </head>
                                <body>
                                    <div id="markdown-container"></div>
                                    <script>
                                        fetch('blog/${file}')
                                        .then(response => response.text())
                                        .then(markdownText => {
                                          const html = marked.parse(markdownText);
                                          document.getElementById('markdown-container').innerHTML = html;
                                        });
                                    </script>
                                </body>
                                </html>
                            `);
                            newWindow.document.close();
                        })
                        .catch(error => console.error('Error fetching file:', error));
                });
            });
        })
        .catch(error => console.error('Error fetching files:', error));
});