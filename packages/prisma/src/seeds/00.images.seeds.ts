import { minio } from "@aaw/minio";
import { readdir } from "node:fs/promises";
import path from "node:path";
import { createId } from "@paralleldrive/cuid2";

export async function imagesSeeds() {
  const bucketName = process.env.MINIO_IMAGES_BUCKET_NAME as string;
  const region = process.env.MINIO_REGION as string;
  const imageDir = path.join(__dirname, "../../../../", "images-samples");

  if (!(await minio.bucketExists(bucketName))) {
    console.log(
      `Bucket ${bucketName} doesn't exist. Creating bucket ${bucketName} in region ${region}...`
    );
    await minio.makeBucket(bucketName, "france");
  } else {
    console.log(`Bucket ${bucketName} exist. Skipping creation...`);
  }

  const currentObjects = await minio.listObjectsAsync(bucketName);

  if (currentObjects.length === 0) {
    console.log(`Adding sample objects to ${bucketName}`);

    const images = await readdir(imageDir);

    images.map((image) => {
      const objectName = createId();
      const file = `${imageDir}/${image}`;

      minio.fPutObject(bucketName, objectName, file, {}, (err, etag) => {
        if (err) return console.error(err);
        console.log(
          `File ${file} renamed ${objectName} and uploaded successfully.`
        );
      });
    });
  } else {
    console.log(
      `Bucket ${bucketName} already contains some objects, skipping...`
    );
  }
}
