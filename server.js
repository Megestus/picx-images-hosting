const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// 静态文件服务
app.use('/img', express.static(path.join(__dirname, 'img')));

// 获取文件夹内的图片及其元数据
app.get('/img/?dir=true', (req, res) => {
    const directory = path.join(__dirname, 'img');

    fs.readdir(directory, (err, files) => {
        if (err) {
            res.status(500).send('Error reading directory');
            return;
        }

        const images = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file)).map(file => ({
            name: file,
            path: path.join(directory, file),
            createdAt: fs.statSync(path.join(directory, file)).birthtime
        }));

        res.json(images);
    });
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});