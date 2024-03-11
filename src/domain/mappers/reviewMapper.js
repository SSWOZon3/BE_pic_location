export const reviewMapper = (review) => ({
    _id: review._id,
    title: review.title,
    description: review.description,
    longitude: review.location.coordinates[0],
    latitude: review.location.coordinates[1],
    imageUrl: review.imageUrl,
    publisherId: review.publisher,
});