import User from "../entities/user.js";

export const registerUser = async (username, encryptedPassword) => {
    return User.create({
        username,
        password: encryptedPassword,
    });
}

export const getUserById = async (userId) => {
    return User.findById(userId);
}

export const getUserByEmail = async (email) => {
    return User.findOne({
        email,
    });
}

export const getUserLogin = async (username) => {
    return User.findOne({
        username,
    }).populate('favorites');
}

export const getUserInfoById = async (userId) => {
    return User.findById(userId).populate('favorites');
}

export const addToFavoritesByUserId = async (userId, reviewId) => {
    return User.findOneAndUpdate({
        _id: userId,
    },
    {
        $addToSet: { favorites: reviewId }
    },
    {
        new: true,
    }).populate('favorites');
}

export const removeFromFavoritesByUserId = async (userId, reviewId) => {
    return User.findOneAndUpdate({
        _id: userId,
    },
    {
        $pull: { favorites: reviewId }
    },
    {
        new: true,
    }).populate('favorites');
}