import { downloadVideo, deleteVideo } from "./videoTools.mjs";
import { generateTranscript, generateSummary } from "./openAI.mjs";

async function outputTranscript(url, words) {
  const id = url.split("?")[1].split("=")[1];
  // 1. Download video from YouTube
  await downloadVideo(url, id);
  // 2. Generate transcript
  const transcript = await generateTranscript(id);

  // make deleteVideo and generateSummary run in parallel, so it doesnt have to wait for one to finish before starting the other
  const [_, summary] = await Promise.all([
    // 3. Delete video
    deleteVideo(id),
    // 4. Generate summary
    generateSummary(transcript, words),
  ]);

  return summary;
}

export default outputTranscript;
