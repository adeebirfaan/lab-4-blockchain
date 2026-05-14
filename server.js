// ============================================================
// Backend API Server
// File: server.js
// Run with:  node server.js
// ============================================================

const express = require("express");
const path = require("path");
const SupplyChainContract = require("./contract/supplychainContract");

const app = express();
const contract = new SupplyChainContract();

// ---------- Middleware ----------
app.use(express.json());

// Allow the HTML page (if opened from file://) to call the API
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    if (req.method === "OPTIONS") return res.sendStatus(200);
    next();
});

// Serve the frontend (so http://localhost:3000/web/index.html works)
app.use("/web", express.static(path.join(__dirname, "web")));

// ---------- API ROUTES ----------

// CREATE
app.post("/create", (req, res) => {
    try {
        const { id, name, owner } = req.body;
        res.send(contract.createProduct(id, name, owner));
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// TRANSFER
app.post("/transfer", (req, res) => {
    try {
        const { id, newOwner } = req.body;
        res.send(contract.transferProduct(id, newOwner));
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// QUERY
app.get("/query/:id", (req, res) => {
    try {
        res.send(contract.readProduct(req.params.id));
    } catch (err) {
        res.status(404).send(err.message);
    }
});

// Root redirect
app.get("/", (req, res) => {
    res.redirect("/web/index.html");
});

// ---------- START ----------
app.listen(3000, () => {
    console.log("===========================================");
    console.log("  FreshFarm Supply Chain Server Running");
    console.log("  Open: http://localhost:3000/web/index.html");
    console.log("===========================================");
});
