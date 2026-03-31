import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = 3000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/api", async (req, res) => {
  const { grtId, siteId } = req.query;

  if (!grtId || !siteId) {
    return res.status(400).json({
      error: "Missing grtId or siteId"
    });
  }

  const url = `http://211.34.194.70:9000/sampledata?grtId=${grtId}&siteId=${siteId}`;

  try {
    const response = await fetch(url);
    const text = await response.text();

    console.log("STATUS:", response.status);
    console.log("RAW:", text);

    res.send(text);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`? Server running on http://localhost:${PORT}`);
});