import Review from "../entities/review.js";
import { uploadPic } from "../services/r2Connection.js";
import { reviewMapper } from "../mappers/reviewMapper.js";
import { v4 as uuidv4 } from 'uuid';
// TODO: FInish the image sizing and also the image dimensions
// import sizeOf from 'image-size';

const supportedImageFileType = ['image/jpg', 'image/webp'];

const imageUrlBuilder = (urlPath) => {
    const bucketName = 'new-bucket';
    return `http://localhost:9000/${bucketName}/${urlPath}`;
}

export const createReviewController = async (req, res) => {
    try {
        const { title, latitude, longitude, description } = req.body;
        const fileContent = req.file.buffer;
        const sizeInKb = fileContent.length / 1024;
        if(sizeInKb.toFixed(2) > 400) {
            throw new Error('Image size should be less than 400 KiB');
        }

        const urlPath = `reviews/${uuidv4()}`;
        const mimeType = req.file.mimetype;
        if(!req.file || !supportedImageFileType.includes(mimeType)) {
            throw new Error('Unsupported type');
        }

        // TODO: pensar si tiene más sentido hacer el upload del pic primero o la inserción en la bbdd
        // De cara a la corrección de posibles errores de ejecución
        await uploadPic(fileContent, urlPath, mimeType);

        const review = await Review.create({
            publisher: req.user._id,
            title,
            description,
            location: {
                coordinates: [longitude, latitude]
            },
            imageUrl: imageUrlBuilder(urlPath),
        });

        const response = reviewMapper(review);
        res.status(201).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export const getReviewController = async (req, res) => {
    try {
        const { _id } = req.params;
        const review = await Review.findOne({
            _id,
        });
        const prettyResponse = reviewMapper(review);
          
        res.status(201).json(prettyResponse);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getReviewsInArea = async (req, res) => {
    try {
        const query = req.query;
        const bottomLeftLng = parseFloat(query.bottomLeftLng);
        const bottomLeftLat = parseFloat(query.bottomLeftLat);
        const topRightLng = parseFloat(query.topRightLng);
        const topRightLat = parseFloat(query.topRightLat);
        const reviewList = await Review.find({
            location: {
                $geoWithin: {
                    $box: [
                        [bottomLeftLng, bottomLeftLat],
                        [topRightLng, topRightLat],
                    ]
                }
            }
        });
        const prettyResponse = reviewList.map((review) => reviewMapper(review));

        res.status(200).json(prettyResponse); 
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
}