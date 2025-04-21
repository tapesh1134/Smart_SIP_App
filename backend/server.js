import app from "./app.js";
import cloudinary from "cloudinary";
import { server } from "./app.js";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});