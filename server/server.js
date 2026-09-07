import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";
import Razorpay from "razorpay";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check environment variables
console.log("Razorpay Key ID loaded:", !!process.env.RAZORPAY_KEY_ID);
console.log("Razorpay Secret loaded:", !!process.env.RAZORPAY_KEY_SECRET);

if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  console.error("❌ Razorpay keys are missing from .env");
}

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Temporary verified download tokens
const downloadTokens = new Map();

// --------------------------------------------------
// TEST BACKEND
// --------------------------------------------------

app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "Backend is working",
  });
});

// --------------------------------------------------
// CREATE ₹99 RAZORPAY ORDER
// --------------------------------------------------

app.post("/api/create-order", async (req, res) => {
  try {
    console.log("Creating Razorpay order...");

    const order = await razorpay.orders.create({
      amount: 9900,
      currency: "INR",
      receipt: `fresher_kit_${Date.now()}`,
    });

    console.log("✅ Razorpay order created:", order.id);

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("❌ CREATE ORDER ERROR");
    console.error("Status:", error?.statusCode);
    console.error("Message:", error?.message);
    console.error("Description:", error?.error?.description);
    console.error("Full error:", error);

    res.status(500).json({
      success: false,
      message:
        error?.error?.description ||
        error?.message ||
        "Unable to create payment order",
    });
  }
});

// --------------------------------------------------
// VERIFY PAYMENT
// --------------------------------------------------

app.post("/api/verify-payment", (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing payment details",
      });
    }

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    console.log("✅ Payment signature verified:", razorpay_payment_id);

    const token = crypto.randomBytes(32).toString("hex");

    downloadTokens.set(token, {
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      createdAt: Date.now(),
    });

    res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.error("❌ VERIFICATION ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Payment verification error",
    });
  }
});

// --------------------------------------------------
// PROTECTED ZIP DOWNLOAD
// --------------------------------------------------

app.get("/api/download", (req, res) => {
  const { token } = req.query;

  if (!token || !downloadTokens.has(token)) {
    return res.status(403).send("Payment required.");
  }

  const payment = downloadTokens.get(token);

  // 30 minute expiry
  if (Date.now() - payment.createdAt > 30 * 60 * 1000) {
    downloadTokens.delete(token);

    return res.status(403).send("Download link expired.");
  }

  const zipPath = path.resolve(
    __dirname,
    "../product/RESOURCES.zip"
  );

  console.log("Sending ZIP:", zipPath);

  res.download(
    zipPath,
    "IT-Fresher-Job-Launch-Kit.zip",
    (error) => {
      if (error) {
        console.error("❌ Download error:", error);
      }
    }
  );
});

// --------------------------------------------------
// START SERVER
// --------------------------------------------------

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});