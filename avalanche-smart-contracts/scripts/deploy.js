async function main() {
    // 1. Получаем контракт factory (абстракцию контракта)
    const TestContract = await ethers.getContractFactory("TestContract");
    const [owner, addr1] = await ethers.getSigners();
  
  
    // 2. Разворачиваем контракт
    console.log("Развертывание контракта TestContract...");
    const testContract = await TestContract.deploy(); // Здесь не нужно никаких аргументов конструктора
    
    // 3. Ждем пока контракт будет развернут
    await testContract.waitForDeployment();
  
    // 4. Выводим адрес развернутого контракта
    console.log("Контракт TestContract развернут по адресу:", testContract.target);
    console.log(`Обновление времени...`)
    await testContract.updateTime();
    console.log(`Время обновлено`);
    console.log(`Вызов getRandomValue...`)
    await testContract.setRandomValue();
    console.log(`Случайное значение установлено`);
    console.log(`Случайное значение`, await testContract.getRandomValue());
    console.log(`Владелец контракта:`, await testContract.getOwner());
    console.log(`Время последнего обновления:`, await testContract.getLastUpdateTime());
  
  
     console.log(`Регистрация пользователя...`)
      await testContract.registerUser();
      console.log(`Пользователь зарегистрирован`);
  
      console.log(`Установка баланса для пользователя...`)
      await testContract.addBalance(5);
      console.log(`Баланс пользователя установлен.`);
      
      console.log(`Баланс текущего пользователя:`, await testContract.getBalance(owner.address));
  
     console.log("Список всех пользователей:", await testContract.getAllUsers())
  
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  