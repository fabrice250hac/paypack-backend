const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// TUZAKORESHA ENV (ntushyire secret hano)
const APP_ID = process.env.APP_ID;
const APP_SECRET = process.env.APP_SECRET;

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Payment endpoint
app.post("/pay", async (req, res) => {
  const { phone, amount } = req.body;

  try {
    await axios.post(
      "https://payments.paypack.rw/api/transactions/cashin",
      {
        amount: amount,
        number: phone
      },
      {
        headers: {
          "Authorization":
            "Basic " +
            Buffer.from(APP_ID + ":" + APP_SECRET).toString("base64"),
          "Content-Type": "application/json"
        }
      }
    );

    res.json({ message: "Payment initiated! Check your phone 📲" });

  } catch (err) {
    res.json({ message: "Payment failed ❌", error: err.message });
  }
});

app.listen(3000, () => console.log("Server running"));
