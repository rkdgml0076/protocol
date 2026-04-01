import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = 3000;

// CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// 특정 Wi-Fi IP만 허용
const ALLOWED_IP_REGEX = /^192\.168\.0\.\d{1,3}$/;

app.use((req, res, next) => {
  const clientIp = req.ip.replace("::ffff:", "");
  if (!ALLOWED_IP_REGEX.test(clientIp)) {
    return res.status(403).json({ error: "Forbidden: Only specific Wi-Fi allowed" });
  }
  next();
});

// API 프록시
app.get("/api", async (req, res) => {
  const { grtId, siteId } = req.query;

  if (!grtId || !siteId) {
    return res.status(400).json({ error: "Missing grtId or siteId" });
  }

  const url = `http://211.34.194.70:9000/sampledata?grtId=${grtId}&siteId=${siteId}`;

  try {
    const response = await fetch(url);
    const text = await response.text();

    console.log("STATUS:", response.status);
    console.log("RAW:", text);

    res.send(text);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 서버 실행 (모든 인터페이스)
app.listen(PORT, "0.0.0.0", () => {
  console.log(`? Server running on http://0.0.0.0:${PORT}`);
});