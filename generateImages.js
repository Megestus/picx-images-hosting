const fs = require('fs');
const path = require('path');

// 读取 img 目录中的所有图片文件
const imgDir = './img';
const images = fs.readdirSync(imgDir);

let htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Image Gallery</title>
</head>
<body>
<h1>Gallery</h1>
<div id="gallery">
`;

// 为每个图片生成一个 <img> 标签
images.forEach(image => {
    const imagePath = path.join(imgDir, image);
    if (fs.statSync(imagePath).isFile()) { // 确保是文件
        htmlContent += `<img src="${image}" alt="${image}">`;
    }
});

htmlContent += `
</div>
</body>
</html>
`;

// 将生成的 HTML 内容写入 index.html
fs.writeFileSync('index.html', htmlContent);