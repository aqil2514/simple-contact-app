const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const { findContact, loadContact, addData, deleteData } = require("./utlis/functions");
const app = express();
const port = 3000;

app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  const data = {
    title: "Halaman Home",
    layout: "layout/main-layout",
    contacts: loadContact(),
  };
  res.render("index", data);
});

app.get("/add", (req, res) => {
  const data = {
    title: "Halaman Tambah",
    layout: "layout/main-layout",
  };
  res.render("add", data);
});

app.get("/details/nama/:nama", (req, res) => {
  const data = {
    title: "Halaman Detail",
    layout: "layout/main-layout",
    nama: findContact(req.params.nama),
  };
  res.render("details", data);
});

app.get("/delete/nama/:nama", (req, res) => {
  const nama = req.params.nama;

  deleteData(nama);
  res.redirect("/");
});

app.post("/add", (req, res) => {
  const { nama, noHP, email } = req.body;

  addData(nama, email, noHP);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Localhost is listening on ${port}`);
});
