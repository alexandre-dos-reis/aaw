import { Client as MinioClient, ClientOptions } from "minio";
import * as dotenv from "dotenv";

dotenv.config();

class MinioExtended extends MinioClient {
  constructor(options: ClientOptions) {
    super(options);
  }

  async listObjectsAsync(bucketName: string) {
    return await new Promise<string[]>((resolve, reject) => {
      const objectsListTemp: string[] = [];
      const stream = this.listObjectsV2(bucketName, "", true, "");
      stream.on("data", (obj) => objectsListTemp.push(obj.name));
      stream.on("error", reject);
      stream.on("end", () => {
        resolve(objectsListTemp);
      });
    });
  }
}

const minio = new MinioExtended({
  endPoint: process.env.MINIO_ACCESS_ENDPOINT as string,
  port: parseInt(process.env.MINIO_PORT as string),
  useSSL: false,
  accessKey: process.env.MINIO_ACCESS_KEY as string,
  secretKey: process.env.MINIO_SECRET_KEY as string,
});

export { minio };
