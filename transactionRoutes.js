
const express = require("express");
const Transaction = require("../models/Transaction");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, async (req, res) => {
  const tx = await Transaction.create({ ...req.body, userId: req.user.id });
  res.json(tx);
});

router.get("/", protect, async (req, res) => {
  const txs = await Transaction.find({ userId: req.user.id }).sort({ date: -1 });
  res.json(txs);
});

router.put("/:id", protect, async (req, res) => {
  const updated = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete("/:id", protect, async (req, res) => {
  await Transaction.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
