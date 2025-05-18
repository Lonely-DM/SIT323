const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// MongoDB连接
const mongoUri = process.env.MONGO_URL || 'mongodb://localhost:27017/calculator-db';
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// 定义计算记录模型
const Calculation = mongoose.model('Calculation', {
  num1: Number,
  num2: Number,
  operation: String,
  result: Number,
  timestamp: { type: Date, default: Date.now }
});

// 静态文件
app.use(express.static('public'));

// 验证函数
function validateNumbers(...nums) {
  for (const n of nums) {
    if (isNaN(n)) {
      throw new Error('Invalid input: parameters must be valid numbers.');
    }
  }
}

// 基础运算
app.get('/add', async (req, res) => {
  try {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    validateNumbers(num1, num2);
    const result = num1 + num2;
    await Calculation.create({ num1, num2, operation: 'add', result });
    res.json({ result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/subtract', async (req, res) => {
  try {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    validateNumbers(num1, num2);
    const result = num1 - num2;
    await Calculation.create({ num1, num2, operation: 'subtract', result });
    res.json({ result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/multiply', async (req, res) => {
  try {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    validateNumbers(num1, num2);
    const result = num1 * num2;
    await Calculation.create({ num1, num2, operation: 'multiply', result });
    res.json({ result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/divide', async (req, res) => {
  try {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    validateNumbers(num1, num2);
    if (num2 === 0) {
      throw new Error('Division by zero is not allowed.');
    }
    const result = num1 / num2;
    await Calculation.create({ num1, num2, operation: 'divide', result });
    res.json({ result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 高级运算
app.get('/power', async (req, res) => {
  try {
    const base = parseFloat(req.query.num1);
    const exponent = parseFloat(req.query.num2);
    validateNumbers(base, exponent);
    const result = Math.pow(base, exponent);
    await Calculation.create({ num1: base, num2: exponent, operation: 'power', result });
    res.json({ result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/sqrt', async (req, res) => {
  try {
    const value = parseFloat(req.query.num);
    if (isNaN(value)) throw new Error('Invalid input: num must be a valid number.');
    if (value < 0) throw new Error('Invalid input: cannot take the square root of a negative number.');
    const result = Math.sqrt(value);
    await Calculation.create({ num1: value, operation: 'sqrt', result });
    res.json({ result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/mod', async (req, res) => {
  try {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    validateNumbers(num1, num2);
    if (num2 === 0) throw new Error('Modulo by zero is not allowed.');
    const result = num1 % num2;
    await Calculation.create({ num1, num2, operation: 'mod', result });
    res.json({ result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 历史记录
app.get('/history', async (req, res) => {
  try {
    const records = await Calculation.find().sort({ timestamp: -1 }).limit(10);
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

// 首页
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 错误处理
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
});
