import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import SurveyRepository from '../repositories/SurveyRepository';
import SurveyUserRepository from '../repositories/SurveyUserRepository';
import UserRepository from '../repositories/UserRepository';
import SendMailServices from '../services/SendMailServices';
import patch from 'path'
import AppError from '../errors/AppError';
import * as yup from 'yup'

class SendMailController {

    async execute(request: Request, response: Response) {

        const data_atual = new Date();

        const { email, survey_id } = request.body

        const userRepository = getCustomRepository(UserRepository)
        const surveyRepository = getCustomRepository(SurveyRepository)
        const surveyUserRepository = getCustomRepository(SurveyUserRepository)

        const npsPatch = patch.resolve(__dirname, "..", "views", "emails", "npsMail.hbs")

        const schema = yup.object().shape({
            survey_id: yup.string().required("survey_id é Obrigatorio"),
            email: yup.string().email().required("Email incorreto"),
        })

        try {
            await schema.validate(request.body, { abortEarly: false })

        } catch (error) {
            throw new AppError(error, 422)
        }


        // ----------------------------------------------------------------------------------------------------

        const user = await userRepository.findOne({
            email
        })

        if (!user) {
            throw new AppError("User does not exists")
        }

        // ----------------------------------------------------------------------------------------------------

        const survey = await surveyRepository.findOne({
            id: survey_id
        })

        if (!survey) {
            throw new AppError("Survey does not exists")
        }

        // ----------------------------------------------------------------------------------------------------


        const surveyUserAlreadyExists = await surveyUserRepository.findOne({
            where: [
                {
                    user_id: user.id,
                    survey_id: survey.id,
                }
            ],
            relations: ['user', 'survey'],
        })

        // ----------------------------------------------------------------------------------------------------

        const variables = {
            name: user.name,
            title: survey.title,
            description: survey.description,
            id: "",
            link: process.env.URL_MAIL,
        }

        // ----------------------------------------------------------------------------------------------------

        if (surveyUserAlreadyExists) {

            variables.id = surveyUserAlreadyExists.id

            await SendMailServices.execute({
                to: email,
                subject: survey.title,
                variables,
                patch: npsPatch
            })

            return response.status(201).json(surveyUserAlreadyExists)
        }

        // ----------------------------------------------------------------------------------------------------

        const surveyUsers = surveyUserRepository.create({
            user_id: user.id,
            survey_id: survey_id,
            created_at: data_atual
        })

        await surveyUserRepository.save(surveyUsers)

        variables.id = surveyUsers.id;

        await SendMailServices.execute({
            to: email,
            subject: survey.title,
            variables,
            patch: npsPatch
        })


        // ----------------------------------------------------------------------------------------------------

        return response.status(201).json(surveyUsers)

    }

    async getall(request: Request, response: Response) {

        const surveyUserRepository = getCustomRepository(SurveyUserRepository)

        const surveys = await surveyUserRepository.find({
            relations: ['user', 'survey'],
        })

        return response.status(200).json(surveys)

    }
}


export default SendMailController;