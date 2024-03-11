export const userMapper = (user) => ({
    username: user.username,
    email: user.email,
    favorites: user.favorites.map((review) => reviewMapper(review)),
});