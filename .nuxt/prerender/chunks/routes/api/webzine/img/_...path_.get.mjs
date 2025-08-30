import { defineEventHandler, getRouterParam, createError, setHeader } from 'file:///home/zohardus/www/frontendv2/node_modules/h3/dist/index.mjs';

const ____path__get = defineEventHandler(async (event) => {
  const path = getRouterParam(event, "path");
  if (!path) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid image path"
    });
  }
  const imagePath = Array.isArray(path) ? path.join("/") : path;
  const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
  const hasValidExtension = allowedExtensions.some(
    (ext) => imagePath.toLowerCase().endsWith(ext)
  );
  if (!hasValidExtension) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid file type"
    });
  }
  if (imagePath.includes("..")) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid file path"
    });
  }
  const filename = imagePath.split("/").pop() || imagePath;
  try {
    const localImagePath = `/home/zohardus/www/ak9project/frontendv2/public/images/webzine/img/${filename}`;
    const fs = await import('node:fs/promises');
    await fs.access(localImagePath);
    const imageBuffer = await fs.readFile(localImagePath);
    let contentType = "image/jpeg";
    if (filename.toLowerCase().endsWith(".png")) contentType = "image/png";
    else if (filename.toLowerCase().endsWith(".gif")) contentType = "image/gif";
    else if (filename.toLowerCase().endsWith(".webp")) contentType = "image/webp";
    setHeader(event, "Content-Type", contentType);
    setHeader(event, "Cache-Control", "public, max-age=86400");
    setHeader(event, "Content-Length", imageBuffer.length.toString());
    return imageBuffer;
  } catch (error) {
    console.error("Error serving webzine image:", error);
    throw createError({
      statusCode: 404,
      statusMessage: "Image not found"
    });
  }
});

export { ____path__get as default };
//# sourceMappingURL=_...path_.get.mjs.map
