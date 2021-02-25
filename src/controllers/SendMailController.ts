import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import SurveyRepository from '../repositories/SurveyRepository';
import SurveyUserRepository from '../repositories/SurveyUserRepository';
import UserRepository from '../repositories/UserRepository';

class SendMailController {

    async execute(request: Request, response: Response) {

        const data_atual = new Date();

        const { email, survey_id } = request.body

        const userRepository = getCustomRepository(UserRepository)
        const surveyRepository = getCustomRepository(SurveyRepository)
        const surveyUserRepository = getCustomRepository(SurveyUserRepository)

        const userAlreadtExists = await userRepository.findOne({
            email
        })

        if (!userAlreadtExists) {
            return response.status(400).json({
                error: "User does not exists"
            })
        }

        const surveyAlreadtExists = await surveyRepository.findOne({
            id: survey_id
        })


        if (!surveyAlreadtExists) {
            return response.status(400).json({
                error: "Survey does not exists"
            })
        }

        const surveyUsers = surveyUserRepository.create({
            user_id: userAlreadtExists.id,
            survey_id: survey_id,
            created_at: data_atual
        })

        await surveyUserRepository.save(surveyUsers)

        return response.status(201).json(surveyUsers)
    }

    async getall(request: Request, response: Response) {

        const surveyUserRepository = getCustomRepository(SurveyUserRepository)

        const surveys = await surveyUserRepository.find()

        return response.status(200).json(surveys)

    }
}


export default SendMailController;