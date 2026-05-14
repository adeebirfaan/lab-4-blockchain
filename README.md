# FreshFarm Supply Chain — Lab Module 4

A mini blockchain application that simulates **Hyperledger Fabric** using a local JSON ledger.
It tracks agricultural products from **Farm → Distributor → Retailer**.

---

## Project Structure
```
supplychain-simulated/
├── ledger.json                       # Simulated blockchain (world state + tx log)
├── server.js                         # Backend API (Express)
├── package.json
├── contract/
│   ├── supplychainContract.js        # Smart contract (chaincode)
│   └── testContract.js               # Tests for the smart contract
└── web/
    ├── index.html                    # User Interface
    ├── style.css
    └── app.js                        # Frontend logic
```

---

## How to Run

### 1. Install dependencies
```bash
npm install
```

### 2. Test the smart contract (Task 2)
```bash
node contract/testContract.js
```
Take a screenshot of this output for your deliverables.

### 3. Reset the ledger (optional, for a clean demo)
```bash
echo '{"worldState":{},"transactions":[]}' > ledger.json
```

### 4. Start the backend server
```bash
node server.js
```
You will see:
```
FreshFarm Supply Chain Server Running
Open: http://localhost:3000/web/index.html
```

### 5. Open the UI in your browser
```
http://localhost:3000/web/index.html
```

---

## Demo Steps for Screenshots (Task 6)

1. **Create Product**
   - Product ID: `P1001`
   - Product Name: `Fresh Mango`
   - Owner: `Farm A`
   - Click **Create** → screenshot the success message.

2. **Transfer Product**
   - Product ID: `P1001`
   - New Owner: `Distributor A`
   - Click **Transfer** → screenshot the success message.

3. **Query Product**
   - Product ID: `P1001`
   - Click **Search** → screenshot the JSON result (showing status `TRANSFERRED`).

---

## Smart Contract Functions
| Function | Description |
|---|---|
| `createProduct(productID, name, owner)` | Adds a new product to the ledger with status `CREATED` |
| `transferProduct(productID, newOwner)` | Changes ownership and sets status to `TRANSFERRED` |
| `readProduct(productID)` | Returns full product record including history |

Every action is also appended to the `transactions` array in `ledger.json`, simulating the immutable transaction log of Hyperledger Fabric.
