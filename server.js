import express from "express";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

// ESM __dirname 처리
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// ? CORS (유지 가능)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});


// ? (선택) 내부망 + localhost 허용
// ? 외부 DNS 접속까지 허용하려면 이 블록 제거
const ALLOWED_IP_REGEX = /^(192\.168\.|10\.|127\.0\.0\.1|175\.125\.86\.)/;

app.use((req, res, next) => {
  const clientIp =
    (req.headers["x-forwarded-for"] || req.socket.remoteAddress || "")
      .replace("::ffff:", "");

  console.log("접속 IP:", clientIp);

  if (!ALLOWED_IP_REGEX.test(clientIp)) {
    return res.status(403).json({ error: "Forbidden" });
  }
  next();
});


// ? 정적 파일 제공 (현재 구조 그대로)
app.use(express.static(__dirname));


// ? 메인 페이지
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "new_api.html"));
});


// ? API 프록시
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

    // ? JSON 안전 처리
    try {
      const json = JSON.parse(text);
      res.json(json);
    } catch {
      res.send(text);
    }

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ? 서버 실행 (외부 접속 가능)
app.listen(PORT, "0.0.0.0", () => {
  console.log(`? Server running on http://0.0.0.0:${PORT}`);
});