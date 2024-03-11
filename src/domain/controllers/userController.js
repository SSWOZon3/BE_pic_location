import { addToFavoritesByUserId, getUserInfoById, getUserLogin, registerUser, removeFromFavoritesByUserId } from "../repository/userRepository.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { userMapper } from "../mappers/userMapper.js";

export const register = async (req, res) => {
    try {
        // TODO: meter validadores con Joi
        const salt = await bcrypt.genSalt(Number(10));
        const encryptedPassword = await bcrypt.hash(req.body.password, salt);

        await registerUser(req.body.username, encryptedPassword);
  
        res.status(201).send('Usuario creado');
      } catch (error) {
        res.status(400).send(error);
      }
}

export const login = async (req, res) => {
    try {
        const user = await getUserLogin(req.body.username);
        if(!user) return res.status(400).send('Invalid email or password');
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password,
        );

        if(!validPassword) return res.status(400).send('Invalid email or password');

        // TODO: add process.env.JWTPRIVATEKEY
        const token = jwt.sign({ _id: user._id }, 'random_private_key');

        const userMap = userMapper(user);
        
        const response = {
            ...userMap,
            accessToken: token,
        }
        res.status(200).json(response);
    } catch(error) {
        res.status(400).send(error);
    }
}

export const getUserInfo = async (req, res) => {
    try {
        const user = await getUserInfoById(req.user._id);
        const response = userMapper(user);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).send(error);
    }
}

export const getFavorites = async (req, res) => {
    try {
        const user = await getUserWithFavorites(req.user._id);
        res.status(200).json(user.favorites);
    } catch (error) {
        res.status(400).send(error);
    }
}

export const addToFavorites = async (req, res) => {
    try {
        const user = await addToFavoritesByUserId(req.user._id, req.params.reviewId);
        const response = userMapper(user);
        res.status(201).json(response);
    } catch (error) {
        res.status(400).send(error);
    }
}

export const removeFromFavorites = async (req, res) => {
    try {
        const user = await removeFromFavoritesByUserId(req.user._id, req.params.reviewId);
        const response = userMapper(user);
        res.status(200).json(response);
    } catch(error) {
        res.status(400).send(error);
    }
}
