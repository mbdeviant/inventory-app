const express = require("express");
const router = express.Router();

router.get("/login", (req, res) => {
  res.render("login", { error: null });
});

router.post("/login", (req, res) => {
  const { password } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD || "admin";

  if (password === adminPassword) {
    req.session.isAdmin = true;
    return res.redirect("/");
  }

  res.render("login", { error: "Invalid password" });
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

module.exports = router;
