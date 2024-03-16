import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';

const client = new S3Client({
    // ,
    endpoint: "http://minio:9000",
    credentials: {
        // accessKeyId: "",
        // secretAccessKey: ""
        accessKeyId: "minioadmin",
        secretAccessKey: "minioadmin",
    },
    forcePathStyle: true,
    region: "eu-central-1",
});

export const uploadPic = async (fileContent, fileName, mimeType) => {
    console.log(mimeType);
    const uploadParams = {
        Bucket: 'new-bucket',
        Key: fileName,
        Body: fileContent,
        ContentType: mimeType,
    };

    try {
        await client.send(new PutObjectCommand(uploadParams));
    } catch (err) {
        console.log("Error", err);
    }
}

export const getPic = async (fileName) => {
    const getPicParams = {
        Key: fileName,
        Bucket: 'new-bucket',
    }
    try {
        await client.send(new GetObjectCommand(getPicParams))
    } catch(err) {
        console.log("Error", err);
    }
}
