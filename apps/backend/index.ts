import express from 'express';
import { TrainModel, GenerateImage, GenerateImagesFromPack } from 'common/types';
import { prismaClient } from 'db';
import { S3Client, s3, write } from 'bun';
import { FalAIModel } from './models/FalAIModel';

const USER_ID = "123";
const PORT = process.env.PORT || 8080;

const falAiModal = new FalAIModel();

const app = express();
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/pre-signed-url", async(req, res) => {
    const key = `models/${Date.now()}_${Math.random()}.zip`
    const url = S3Client.presign(key, {
         bucket: process.env.BUCKET_NAME,
         accessKeyId: process.env.S3_ACCESS_KEY,
         secretAccessKey: process.env.S3_SECRET_KEY,
         expiresIn: 60 * 5
    })
    res.json({
        url,
        key
    })
})


app.get('/', (req, res) => {
    res.send('Hello World');
    });

app.post('/ai/training', async (req, res) => {
    const parsedBody = TrainModel.safeParse(req.body);
    if(!parsedBody.success) {
        res.status(411).send({
            message: 'Invalid request body',
            errors: parsedBody?.error?.errors,
        });
        return;
    } 

    const {request_id, response_url} = await falAiModal.trainModel(parsedBody.data.zipUrl, parsedBody.data.name)
    // Train model
    const data = await prismaClient.model.create({
        data: {
            name: parsedBody.data.name,
            type: parsedBody.data.type,
            age: parsedBody.data.age,
            ethinicity: parsedBody.data.ethinicity,
            eyeColor: parsedBody.data.eyeColor,
            hairColor: parsedBody.data.hairColor,
            bald: parsedBody.data.bald,
            userId: USER_ID,
            zipUrl: parsedBody.data.zipUrl,
            falAiRequestId: request_id
        },
    });
    res.json({
        modelId: data.id,
    })
    
});

app.post('/ai/generate', async (req, res) => {
    const parsedBody = GenerateImage.safeParse(req.body);
    if (!parsedBody.success) {
        res.status(411).send({
            message: 'Invalid request body',
            errors: parsedBody?.error?.errors,
        });
        return;
    }
    const model = await prismaClient.model.findUnique({
        where: {
            id: parsedBody.data.modelId
        }
    })
    if(!model || !model.tensorPath) {
        res.status(411).json({
            message: "Model not found"
        })
        return;
    }
    // Generate image
    const {request_id, response_url } = await falAiModal.generateImage(parsedBody.data.prompt, model?.tensorPath)
    const image = await prismaClient.outputImages.create({
        data: {
            modelId: parsedBody.data.modelId,
            prompt: parsedBody.data.prompt,
            userId: USER_ID,
            imageUrl: "",
            falAiRequestId: request_id
        },
    });
    res.json({
        imageId: image.id,
    });
});

app.post('/pack/generate', async(req, res) => {
    const parsedBody = GenerateImagesFromPack.safeParse(req.body);
    if (!parsedBody.success) {
        res.status(411).send({
            message: 'Invalid request body',
            errors: parsedBody?.error?.errors,
        });
        return;
    }

    // Get ALl the image from the pack
    const prompts = await prismaClient.packPrompts.findMany({
        where: {
            packId: parsedBody.data.packId,
        },
    });

    let request_ids: { request_id: string }[] = await Promise.all(prompts.map((prompt) => falAiModal.generateImage(prompt.prompt, parsedBody.data.modelId)))

    // Generate images
    const images = await prismaClient.outputImages.createManyAndReturn({
        data: prompts.map((prompt, index ) => ({
            modelId: parsedBody.data.modelId,
            prompt: prompt.prompt,
            userId: USER_ID,
            imageUrl: "",
            falAiRequestId: request_ids[index].request_id
        })),
    });
    
    res.json({
        imageIds: images.map((image) => image.id),
    });
    
}); 

app.get('/pack/bulk', async (req, res) => {
    const parsedBody = GenerateImagesFromPack.safeParse(req.body);
    if (!parsedBody.success) {
        res.status(411).send({
            message: 'Invalid request body',
            errors: parsedBody?.error?.errors,
        });
        return;
    }
    const packs = await prismaClient.packs.findMany({});

    res.json({
        packs
    });

});

app.post("/fal-ai/webhook/train", async (req, res) => {
    console.log(req.body);
    const request_id = req.body.request_id

    await prismaClient.model.updateMany({
        where: {
            falAiRequestId: request_id
        },
        data: {
            trainingStatus: "Generated",
            tensorPath: req.body.tensor_path
        }
    })
    // update the status of the image in the DB
    res.json({
        message: "Webhook received",
    })
}
);

app.post("/fal-ai/webhook/image", async (req, res) => {
    console.log(req.body);
    const request_id = req.body.request_id;

    await prismaClient.outputImages.updateMany({
        where: {
            falAiRequestId: request_id
        },
        data: {
            status: "Generated",
            imageUrl: req.body.image_url

        }
    })

    // update the status of the image in the DB
    res.json({
        message: "Webhook received",
    })
}
);

app.get('/images/bulk', async(req, res) => {
    const ids = req.query.images as string[];
    const limit = req.query.limit as string;
    const offset = req.query.offset as string;

    console.log(ids);
    
    const imagesData = await prismaClient.outputImages.findMany({
        where: {
            id: {
                in: ids,
            },
            userId: USER_ID,
        },
        skip: offset ? parseInt(offset) : 0,
        take: limit ? parseInt(limit) : 10,
    });

    res.json({
        images: imagesData,
    });

});