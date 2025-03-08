import {number, z} from 'zod';

export const TrainModel = z.object({
    name: z.string(),
    type: z.enum(['Man', 'Women', "Kids", "Others"]),
    age: z.number(),
    ethinicity: z.enum([
      "White",
      'Black', 
      'Asian_American', 
      'East_Asian', 
      'Hispanic', 
      'Middle_Eastern', 
      'South_Asian', 
      "South_East_Asian", 
      "Pacific_Islander", 
      "Others"
    ]),
    eyeColor: z.enum(['Black', 'Brown', 'Blue', 'Green', 'Hazel', 'Amber', 'Gray', 'Red', 'Others']),
    hairColor: z.enum(['Black', 'Brown', 'Blonde', 'Red', 'Gray', 'White', 'Others']),
    bald: z.boolean(),
    images: z.array(z.string()),
    zipUrl: z.string()
  });
  

export const GenerateImage = z.object({
    name: z.string(),
    modelId: z.string(),
    numberOfImages: z.number(),
    prompt: z.string()
});

export const GenerateImagesFromPack = z.object({
    modelId: z.string(),
    packId: z.string()
});