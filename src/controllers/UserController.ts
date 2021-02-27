import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import UserRepository from '../repositories/UserRepository';
import * as yup from 'yup'

class UserController {

    async create(request: Request, response: Response) {

        const { name, email } = request.body
        const data_atual = new Date();

        const schema = yup.object().shape({
            name: yup.string().required("Nome é Obrigatorio"),
            email: yup.string().email().required("Email incorreto"),
        })

        try {
            await schema.validate(request.body, { abortEarly: false })
            const userRepository = getCustomRepository(UserRepository)
            const userAlreadyExists = await userRepository.findOne({ email })

            if (userAlreadyExists) {
                return response.status(409).json({ error: "Email ja cadastrado" })
            }

            const user = userRepository.create({
                name,
                email,
                created_at: data_atual
            })

            await userRepository.save(user)

            return response.status(201).json(user)

        } catch (error) {

            return response.status(422).json({ error: error })

        }
    }

    async getall(request: Request, response: Response) {

        const userRepository = getCustomRepository(UserRepository)

        const userAlreadyExists = await userRepository.find()

        return response.status(200).json(userAlreadyExists)

    }
}


export default UserController;