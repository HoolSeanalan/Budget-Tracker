let db;

const request = window.indexedDB.open("budget", 1);

request.onupgradeneeded = function(event) {
  const db = event.target.result;
  db.createObjectStore("transaction", { autoIncrement: true });
};

request.onsuccess = function(event) {
    db = event.target.result;

    if (navigator.onLine) {
        updateBudget();
    }
};

request.onerror = function(event) {
    console.log(event.target.errorCode);
};

saveReceipt = (receipt) => {
    const transaction = db.transaction(["transaction"], "readwrite");
    const store = transaction.objectStore("transaction");
    store.add(receipt);
};

updateBudget = () => {
    const transaction = db.transaction(["transaction"], "readwrite");

    transaction.objectStore("transaction").getAll().onsuccess = function(event) {