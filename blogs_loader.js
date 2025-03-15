document.addEventListener('DOMContentLoaded', () => {
    fetch('files.json')
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
                headline.textContent = file;

                listItem.appendChild(headline);
                fileList.appendChild(listItem);

                listItem.addEventListener('click', (event) => {
                    event.preventDefault();
                    if (file.endsWith('.md')) {
                        displayMarkdownInNewWindow(`blog/${file}`, file);
                    } else {
                        window.open(`blog/${file}`, '_blank');
                    }
                });
            });
        })
        .catch(error => console.error('Error fetching files:', error));
});

function displayMarkdownInNewWindow(filePath, fileName) {
    fetch(filePath)
        .then(response => response.text())
        .then(markdown => {
            const newWindow = window.open('', '_blank');
            newWindow.document.write(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>${fileName}</title>
                    <link rel="stylesheet" href="style.css">
                    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
                </head>
                <body>
                    <div id="markdown-container"></div>
                    <script>
                        const markdownText = \`${markdown}\`;
                        const html = marked.parse(markdownText);
                        document.getElementById('markdown-container').innerHTML = html;
                    </script>
                </body>
                </html>
            `);
            newWindow.document.close();
        })
        .catch(error => {
            console.error('Error fetching file:', error);
            alert(`Failed to load ${fileName}. Please check the console.`);
        });
}