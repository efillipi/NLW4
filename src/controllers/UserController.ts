import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import UserRepository from '../repositories/UserRepository';

class UserController {

    async create(request: Request, response: Response) {

        const data_atual = new Date();

        const { name, email } = request.body

        const userRepository = getCustomRepository(UserRepository)

        const userAlreadyExists = await userRepository.findOne({ email })

        if (userAlreadyExists) {
            return response.status(409).json({ mensagem: "Email ja cadastrado" })
        }

        const user = userRepository.create({
            name,
            email,
            created_at: data_atual
        })

        await userRepository.save(user)

        return response.status(201).json(user)
    }

    async getall(request: Request, response: Response) {

        const userRepository = getCustomRepository(UserRepository)

        const userAlreadyExists = await userRepository.find()

        return response.status(200).json(userAlreadyExists)

    }
}


export default UserController;