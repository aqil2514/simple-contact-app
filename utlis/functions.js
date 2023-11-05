const fs = require("fs");

const path = "./data";
if (!fs.existsSync(path)) {
  fs.mkdirSync(path);
}

const jsonPath = "./data/contact.json";
if (!fs.existsSync(jsonPath)) {
  fs.writeFileSync(jsonPath, "[]", "utf-8");
}

function loadContact() {
  const fileBuffer = fs.readFileSync(jsonPath, "utf-8");
  const contact = JSON.parse(fileBuffer);

  return contact;
}

function findContact(nama) {
  const contacts = loadContact();
  const contact = contacts.find((contact) => contact.nama === nama);

  return contact || null;
}

function addData(nama, email, noHP) {
  const contact = { nama, email, noHP };
  const contacts = loadContact();

  const duplicate = contacts.find((contact) => contact.nama === nama);
  if (duplicate) {
    return false;
  }

  contacts.push(contact);

  fs.writeFileSync(jsonPath, JSON.stringify(contacts, null, 2));
}

function deleteData(nama, res) {
  const contacts = loadContact();
  const contact = contacts.findIndex((contact) => contact.nama === nama);

  contacts.splice(contact, 1);
  fs.writeFileSync(jsonPath, JSON.stringify(contacts, null, 2));
  return;
}

module.exports = { loadContact, findContact, addData, deleteData };
