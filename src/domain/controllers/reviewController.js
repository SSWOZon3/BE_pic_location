import Review from "../entities/review.js";
import multer from "multer";
import { uploadFile } from "../services/r2Connection.js";
import { reviewMapper } from "../mappers/reviewMapper.js";

const upload = multer({ dest: 'uploads/' });

export const createReviewController = async (req, res) => {

    // upload.single('image')
    try {
        // TODO: AAddd multer 
        const { title, latitude, longitude, description } = req.body;
        const fileContent = fs.readFileSync(req.file.path);


        console.log(req.body);

        const review = await Review.create({
            description,
            location: {
                coordinates: [longitude, latitude]
            },
            title,
        });
        const prettyResponse = {
            _id: review._id,
            title: review.title,
            description: review.description,
            longitude: review.location.coordinates[0],
            latitude: review.location.coordinates[1]
        }

        const data = await uploadFile(fileContent, `${prettyResponse._id}`);
        console.log(data);

        res.status(201).json(prettyResponse);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getReviewController = async (req, res) => {
    try {
        const { _id } = req.params;
        const review = await Review.findOne({
            _id,
        });

        const prettyResponse = {
            _id: review._id,
            title: review.title,
            description: review.description,
            longitude: review.location.coordinates[0],
            latitude: review.location.coordinates[1],
            imageUrl: review.imageUrl,
            publisherId: review.publisher,
        }

        console.log(prettyResponse);
          
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