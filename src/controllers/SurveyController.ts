import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import SurveyRepository from '../repositories/SurveyRepository';

class SurveyController {

    async create(request: Request, response: Response) {

        const data_atual = new Date();

        const { title, description } = request.body

        const surveyRepository = getCustomRepository(SurveyRepository)

        const survey = surveyRepository.create({
            title,
            description,
            created_at: data_atual
        })

        await surveyRepository.save(survey)

        return response.status(201).json(survey)
    }

    async getall(request: Request, response: Response) {

        const surveyRepository = getCustomRepository(SurveyRepository)

        const surveys = await surveyRepository.find()

        return response.json(surveys)

    }
}


export default SurveyController;