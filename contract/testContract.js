// ============================================================
// Test Script for SupplyChainContract
// File: contract/testContract.js
// Run with:  node contract/testContract.js
// ============================================================

const SupplyChainContract = require("./supplychainContract");
const contract = new SupplyChainContract();

console.log("===========================================");
console.log("   FreshFarm Smart Contract Test");
console.log("===========================================\n");

try {
    // ---- TEST 1: Create a product ----
    console.log("[TEST 1] Create Product");
    console.log(contract.createProduct("P1001", "Fresh Mango", "Farm A"));
    console.log("");

    // ---- TEST 2: Create another product ----
    console.log("[TEST 2] Create Another Product");
    console.log(contract.createProduct("P1002", "Fresh Salmon", "Farm B"));
    console.log("");

    // ---- TEST 3: Transfer ownership ----
    console.log("[TEST 3] Transfer Product P1001 to Distributor A");
    console.log(contract.transferProduct("P1001", "Distributor A"));
    console.log("");

    // ---- TEST 4: Transfer again ----
    console.log("[TEST 4] Transfer Product P1001 to Retailer X");
    console.log(contract.transferProduct("P1001", "Retailer X"));
    console.log("");

    // ---- TEST 5: Query product ----
    console.log("[TEST 5] Query Product P1001");
    console.log(contract.readProduct("P1001"));
    console.log("");

    // ---- TEST 6: Query second product ----
    console.log("[TEST 6] Query Product P1002");
    console.log(contract.readProduct("P1002"));
    console.log("");

    // ---- TEST 7: Try to create duplicate (should fail) ----
    console.log("[TEST 7] Attempt duplicate creation (should fail)");
    try {
        contract.createProduct("P1001", "Duplicate", "Farm A");
    } catch (err) {
        console.log("Expected error caught: " + err.message);
    }
    console.log("");

    // ---- TEST 8: Try to query non-existent product (should fail) ----
    console.log("[TEST 8] Query non-existent product (should fail)");
    try {
        contract.readProduct("P9999");
    } catch (err) {
        console.log("Expected error caught: " + err.message);
    }

    console.log("\n===========================================");
    console.log("   All tests completed successfully!");
    console.log("===========================================");

} catch (err) {
    console.error("UNEXPECTED ERROR:", err.message);
}
