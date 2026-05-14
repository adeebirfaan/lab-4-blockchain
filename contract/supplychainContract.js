// ============================================================
// FreshFarm Supply Chain - Smart Contract (Simulated Fabric)
// File: contract/supplychainContract.js
// ============================================================

const fs = require("fs");
const path = require("path");

const LEDGER_PATH = path.join(__dirname, "..", "ledger.json");

class SupplyChainContract {

    // -------- Helper: Load ledger from JSON --------
    _loadLedger() {
        const raw = fs.readFileSync(LEDGER_PATH, "utf8");
        return JSON.parse(raw);
    }

    // -------- Helper: Save ledger to JSON --------
    _saveLedger(ledger) {
        fs.writeFileSync(LEDGER_PATH, JSON.stringify(ledger, null, 2));
    }

    // -------- Helper: Record a transaction (like Fabric tx log) --------
    _recordTransaction(ledger, type, payload) {
        ledger.transactions.push({
            txId: "TX" + Date.now() + Math.floor(Math.random() * 1000),
            type: type,
            payload: payload,
            timestamp: new Date().toISOString()
        });
    }

    // ============================================================
    // 1. createProduct(productID, name, owner)
    // ============================================================
    createProduct(productID, name, owner) {
        if (!productID || !name || !owner) {
            throw new Error("Product ID, Name, and Owner are required.");
        }

        const ledger = this._loadLedger();

        if (ledger.worldState[productID]) {
            throw new Error(`Product ${productID} already exists.`);
        }

        const product = {
            productID: productID,
            name: name,
            owner: owner,
            status: "CREATED",
            timestamp: new Date().toISOString(),
            history: [
                {
                    action: "CREATED",
                    owner: owner,
                    timestamp: new Date().toISOString()
                }
            ]
        };

        ledger.worldState[productID] = product;
        this._recordTransaction(ledger, "CREATE", product);
        this._saveLedger(ledger);

        return `Product ${productID} (${name}) created successfully. Owner: ${owner}`;
    }

    // ============================================================
    // 2. transferProduct(productID, newOwner)
    // ============================================================
    transferProduct(productID, newOwner) {
        if (!productID || !newOwner) {
            throw new Error("Product ID and New Owner are required.");
        }

        const ledger = this._loadLedger();
        const product = ledger.worldState[productID];

        if (!product) {
            throw new Error(`Product ${productID} does not exist.`);
        }

        const oldOwner = product.owner;
        product.owner = newOwner;
        product.status = "TRANSFERRED";
        product.timestamp = new Date().toISOString();
        product.history.push({
            action: "TRANSFERRED",
            from: oldOwner,
            to: newOwner,
            timestamp: new Date().toISOString()
        });

        ledger.worldState[productID] = product;
        this._recordTransaction(ledger, "TRANSFER", {
            productID: productID,
            from: oldOwner,
            to: newOwner
        });
        this._saveLedger(ledger);

        return `Product ${productID} ownership transferred from ${oldOwner} to ${newOwner}.`;
    }

    // ============================================================
    // 3. readProduct(productID)
    // ============================================================
    readProduct(productID) {
        if (!productID) {
            throw new Error("Product ID is required.");
        }

        const ledger = this._loadLedger();
        const product = ledger.worldState[productID];

        if (!product) {
            throw new Error(`Product ${productID} not found.`);
        }

        return JSON.stringify(product, null, 2);
    }
}

module.exports = SupplyChainContract;
