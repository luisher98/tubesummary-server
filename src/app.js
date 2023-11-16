import express from "express";
import bodyParser from "body-parser";

import outputSummary from "./summary/outputSummary.mjs";
import videoInfo from "./info/videoInfo.mjs";

import validateUrl from "./utils/validateUrl.mjs";
import createRateLimiter from "./utils/rateLimiter.mjs";

const port = 5000;

const app = express();

app.use(bodyParser.json());
app.use('/api/some-route', createRateLimiter(5, 1));

app.get("/api/summary", validateUrl, async (req, res) => {
  const inputUrl = req.query.url;
  const words = req.query.words;

  try {
    const summary = await outputSummary(inputUrl, words);
    res.json({ content: summary });
    console.log("Summary generated successfully.");
  } catch (error) {
    console.error(error);
    // code 500 is internal server error
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/api/info", validateUrl, async (req, res) => {
  const inputUrl = req.query.url;
  
  try {
    const { id, title, mediumThumbnail, trimmedDescription, channelTitle } = await videoInfo(
      inputUrl
    );
    res.json({
      info: {
        id: id,
        title: title,
        description: trimmedDescription,
        thumbnail: mediumThumbnail,
        channel: channelTitle,
      },
    });
    console.log("Youtube info generated successfully.");
  } catch (error) {
    console.error(error);
    // code 500 is internal server error
    res.status(500).json({ error: "An error occurred" });
  }
});



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
