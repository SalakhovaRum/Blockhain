const express = require("express");
const bodyParser = require("body-parser");
const { ethers } = require("ethers");
const abi = require("./abi.json"); // ABI контракта

const app = express();
app.use(express.static("public"));
app.use(bodyParser.json());

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545"); // Локальный блокчейн
const contractAddress = "0x2d1309Fde5D8c1ab2c8036c26FadfE9d933Ce9E4"; // Замените на адрес контракта
const privateKey = "0xde9be858da4a475276426320d5e9262ecfc3ba460bfac56360bfa6c4c28b4ee0"; // Приватный ключ владельца контракта
const wallet = new ethers.Wallet(privateKey, provider);
const contract = new ethers.Contract(contractAddress, abi, wallet);

// Получить случайное значение
app.get("/random", async (req, res) => {
  const randomValue = await contract.getRandomValue();
  res.json({ randomValue: randomValue.toString() });
});

// Установить случайное значение
app.post("/set-random", async (req, res) => {
  const tx = await contract.setRandomValue();
  await tx.wait();
  res.json({ status: "Random value updated" });
});

// Зарегистрировать пользователя
app.post("/register", async (req, res) => {
  const tx = await contract.registerUser();
  await tx.wait();
  res.json({ status: "User registered" });
});

// Получить баланс
app.get("/balance", async (req, res) => {
  const { address } = req.query;
  const balance = await contract.getBalance(address);
  res.json({ balance: balance.toString() });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});

// Получить всех зарегистрированных пользователей
app.get("/users", async (req, res) => {
    const users = await contract.getAllUsers();
    res.json({ users });
  });
  
  // Получить владельца контракта
  app.get("/owner", async (req, res) => {
    const owner = await contract.getOwner();
    res.json({ owner });
  });
  
  // Получить время последнего обновления
  app.get("/last-update", async (req, res) => {
    const lastUpdateTime = await contract.getLastUpdateTime();
    res.json({ lastUpdateTime: lastUpdateTime.toString() });
  });
  
  // Обновить время
  app.post("/update-time", async (req, res) => {
    const tx = await contract.updateTime();
    await tx.wait();
    res.json({ status: "Time updated" });
  });
  
  // Добавить баланс пользователю
  app.post("/add-balance", async (req, res) => {
    const { amount } = req.body;
    const tx = await contract.addBalance(amount);
    await tx.wait();
    res.json({ status: "Balance added" });
  });