// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract TestContract {
    uint256 public lastUpdateTime;
    uint256 public randomValue;
    
    // Модификатор для проверки владельца
    address public owner;

    // Массив для хранения адресов
    address[] public registeredUsers;

     // Мапа для связи адресов с числами
    mapping(address => uint256) public userBalances;


    constructor() {
        owner = msg.sender;
        lastUpdateTime = block.timestamp; // текущий момент времени (для работы с временем)
    }

    // Метод с доступом только для владельца
    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    // Метод для установки случайного числа (псевдорандом)
    function setRandomValue() public {
        randomValue = uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty))) % 100;
    }

    // Метод для получения случайного числа
    function getRandomValue() public view returns (uint256) {
        return randomValue;
    }

    // payable метод для получения эфира
    function deposit() external payable {}

    // nonpayable метод для получения времени последнего обновления
    function getLastUpdateTime() external view returns (uint256) {
        return lastUpdateTime;
    }

    // view метод для получения текущего владельца
    function getOwner() public view returns (address) {
        return owner;
    }

    // Метод для обновления времени
    function updateTime() external onlyOwner {
        lastUpdateTime = block.timestamp;
    }

    // Метод для регистрации пользователя
     function registerUser() public {
        registeredUsers.push(msg.sender);
        userBalances[msg.sender] = 0;
    }

    // Метод для добавления баланса пользователю
    function addBalance(uint256 amount) external {
        userBalances[msg.sender] += amount;
    }

      // Метод для получения баланса пользователя
    function getBalance(address user) external view returns(uint256){
            return userBalances[user];
        }
    function getAllUsers() external view returns (address[] memory) {
        return registeredUsers;
    }
}
