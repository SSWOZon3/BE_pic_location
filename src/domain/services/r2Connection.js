import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const client = new S3Client({
    // endpoint: "https://c9fe26d4988b3039627ab8622132c152.r2.cloudflarestorage.com/pic-test",
    endpoint: "http://localhost:9000",
    credentials: {
        // accessKeyId: "0e71cbbc3340d8671815b2bed212298a",
        // secretAccessKey: "3e1b201ce441b5c4656c9f3b08aac8f417cc33ae79fedf571e75b7693e65fb0f"
        accessKeyId: "minioadmin",
        secretAccessKey: "minioadmin"
    },
    region: "auto"
});

export const  uploadFile = async (fileContent, fileName) => {
    const uploadParams = {
        Bucket: 'images_test',
        Key: fileName,
        Body: fileContent
    };

    try {
        const data = await client.send(new PutObjectCommand(uploadParams));
        return data;
    } catch (err) {
        console.log("Error", err);
    }
}

// Llama a uploadFile con los parámetros adecuados
