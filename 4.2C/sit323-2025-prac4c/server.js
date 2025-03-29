const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// 提供静态文件（index.html、style.css）
app.use(express.static('public'));

/**
 * 验证输入是否是数字。
 * 可以接收若干参数(...nums)，只要有一个不是数字就抛出错误。
 */
function validateNumbers(...nums) {
  for (const n of nums) {
    if (isNaN(n)) {
      throw new Error('Invalid input: parameters must be valid numbers.');
    }
  }
}

// ======================
//  基础运算端点
// ======================
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

// ======================
//  高级运算端点
// ======================

// 幂运算
app.get('/power', (req, res) => {
  try {
    const base = parseFloat(req.query.num1);
    const exponent = parseFloat(req.query.num2);
    validateNumbers(base, exponent);
    res.json({ result: Math.pow(base, exponent) });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 平方根
app.get('/sqrt', (req, res) => {
  try {
    const value = parseFloat(req.query.num);
    if (isNaN(value)) {
      throw new Error('Invalid input: num must be a valid number.');
    }
    if (value < 0) {
      throw new Error('Invalid input: cannot take the square root of a negative number.');
    }
    res.json({ result: Math.sqrt(value) });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 取模
app.get('/mod', (req, res) => {
  try {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    validateNumbers(num1, num2);
    if (num2 === 0) {
      throw new Error('Modulo by zero is not allowed.');
    }
    res.json({ result: num1 % num2 });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 默认路由到 index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 全局错误处理
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// 启动服务器
app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
});
