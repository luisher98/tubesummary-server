export default function validateUrl(req, res, next) {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ error: "URL parameter is required" });
  }

  next();
}
