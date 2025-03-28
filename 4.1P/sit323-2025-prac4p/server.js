const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// 解析 JSON 请求
app.use(express.json());
app.use(express.static('public'));

// 函数：验证输入是否为数字
const validateNumbers = (num1, num2) => {
    if (isNaN(num1) || isNaN(num2)) {
        throw new Error('Invalid input: Both num1 and num2 must be numbers.');
    }
};

// 计算器 API 端点
app.get('/add', (req, res) => {
    try {
        const num1 = parseFloat(req.query.num1);
        const num2 = parseFloat(req.query.num2);
        validateNumbers(num1, num2);
        res.json({ result: num1 + num2 });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/subtract', (req, res) => {
    try {
        const num1 = parseFloat(req.query.num1);
        const num2 = parseFloat(req.query.num2);
        validateNumbers(num1, num2);
        res.json({ result: num1 - num2 });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/multiply', (req, res) => {
    try {
        const num1 = parseFloat(req.query.num1);
        const num2 = parseFloat(req.query.num2);
        validateNumbers(num1, num2);
        res.json({ result: num1 * num2 });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/divide', (req, res) => {
    try {
        const num1 = parseFloat(req.query.num1);
        const num2 = parseFloat(req.query.num2);
        validateNumbers(num1, num2);
        if (num2 === 0) {
            throw new Error('Division by zero is not allowed.');
        }
        res.json({ result: num1 / num2 });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 提供网页
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 错误处理
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

// 启动服务器
app.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}`);
});
