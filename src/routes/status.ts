import express from "express";

const router = express();
router.post("/whatsapp/status", (req, res) => {
  console.log("STATUS CALLBACK", req.body);
});

export { router as StatusCallback };
