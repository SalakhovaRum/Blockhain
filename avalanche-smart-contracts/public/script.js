document.getElementById("set-random").addEventListener("click", async () => {
    const response = await fetch("/set-random", { method: "POST" });
    const data = await response.json();
    document.getElementById("result").innerText = JSON.stringify(data);
  });
  
  document.getElementById("get-random").addEventListener("click", async () => {
    const response = await fetch("/random");
    const data = await response.json();
    document.getElementById("result").innerText = `Random Value: ${data.randomValue}`;
  });
  
  document.getElementById("register").addEventListener("click", async () => {
    const response = await fetch("/register", { method: "POST" });
    const data = await response.json();
    document.getElementById("result").innerText = JSON.stringify(data);
  });
  
  document.getElementById("add-balance-btn").addEventListener("click", async () => {
    const amount = document.getElementById("add-balance").value;
    const response = await fetch(`/add-balance`, { 
      method: "POST", 
      headers: { "Content-Type": "application/json" }, 
      body: JSON.stringify({ amount })
    });
    const data = await response.json();
    document.getElementById("result").innerText = JSON.stringify(data);
  });
  
  document.getElementById("get-balance").addEventListener("click", async () => {
    const address = document.getElementById("balance-address").value;
    const response = await fetch(`/balance?address=${address}`);
    const data = await response.json();
    document.getElementById("result").innerText = `Balance: ${data.balance}`;
  });
  
  document.getElementById("get-users").addEventListener("click", async () => {
    const response = await fetch("/users");
    const data = await response.json();
    document.getElementById("result").innerText = `Users: ${JSON.stringify(data.users)}`;
  });
  
  document.getElementById("get-owner").addEventListener("click", async () => {
    const response = await fetch("/owner");
    const data = await response.json();
    document.getElementById("result").innerText = `Owner: ${data.owner}`;
  });
  
  document.getElementById("get-last-update").addEventListener("click", async () => {
    const response = await fetch("/last-update");
    const data = await response.json();
    document.getElementById("result").innerText = `Last Update Time: ${data.lastUpdateTime}`;
  });
  
  document.getElementById("update-time").addEventListener("click", async () => {
    const response = await fetch("/update-time", { method: "POST" });
    const data = await response.json();
    document.getElementById("result").innerText = JSON.stringify(data);
  });
  