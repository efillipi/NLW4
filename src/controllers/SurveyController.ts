import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import SurveyRepository from '../repositories/SurveyRepository';
import * as yup from 'yup'
import AppError from '../errors/AppError';


class SurveyController {

    async create(request: Request, response: Response) {


        const current_date = new Date();

        const { title, description } = request.body

        const surveyRepository = getCustomRepository(SurveyRepository)

        const schema = yup.object().shape({
            title: yup.string().required("title is Mandatory"),
            description: yup.string().required("description is Mandatory"),
        })

        try {
            await schema.validate(request.body, { abortEarly: false })

        } catch (error) {
            throw new AppError(error, 422)
        }

        const survey = surveyRepository.create({
            title,
            description,
            created_at: current_date
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