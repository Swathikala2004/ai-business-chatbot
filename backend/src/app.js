import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import leadRoutes from "./routes/leadRoutes.js";
import handoffRoutes from "./routes/handoffRoutes.js";
import urlTrainingRoutes from "./routes/urlTrainingRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";


const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend Working 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/handoff", handoffRoutes);
app.use("/api/train-url", urlTrainingRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/payments", paymentRoutes);

export default app;