// ============================================================
// Frontend Logic - Supply Chain UI
// File: web/app.js
// ============================================================

const API_URL = "http://localhost:3000";

// ---------- CREATE PRODUCT ----------
async function createProduct() {
    const id = document.getElementById("c_id").value.trim();
    const name = document.getElementById("c_name").value.trim();
    const owner = document.getElementById("c_owner").value.trim();
    const msgEl = document.getElementById("create_msg");

    if (!id || !name || !owner) {
        msgEl.textContent = "Please fill in all fields.";
        msgEl.className = "msg error";
        return;
    }

    try {
        const res = await fetch(`${API_URL}/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, name, owner })
        });
        const text = await res.text();
        msgEl.textContent = text;
        msgEl.className = res.ok ? "msg" : "msg error";
    } catch (err) {
        msgEl.textContent = "Server error: " + err.message;
        msgEl.className = "msg error";
    }
}

// ---------- TRANSFER PRODUCT ----------
async function transferProduct() {
    const id = document.getElementById("t_id").value.trim();
    const newOwner = document.getElementById("t_owner").value.trim();
    const msgEl = document.getElementById("transfer_msg");

    if (!id || !newOwner) {
        msgEl.textContent = "Please fill in all fields.";
        msgEl.className = "msg error";
        return;
    }

    try {
        const res = await fetch(`${API_URL}/transfer`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, newOwner })
        });
        const text = await res.text();
        msgEl.textContent = text;
        msgEl.className = res.ok ? "msg" : "msg error";
    } catch (err) {
        msgEl.textContent = "Server error: " + err.message;
        msgEl.className = "msg error";
    }
}

// ---------- QUERY PRODUCT ----------
async function queryProduct() {
    const id = document.getElementById("q_id").value.trim();
    const resultEl = document.getElementById("result");

    if (!id) {
        resultEl.textContent = "Please enter a Product ID.";
        return;
    }

    try {
        const res = await fetch(`${API_URL}/query/${id}`);
        const text = await res.text();
        resultEl.textContent = text;
    } catch (err) {
        resultEl.textContent = "Server error: " + err.message;
    }
}
