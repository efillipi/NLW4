import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import SurveyUserRepository from '../repositories/SurveyUserRepository';

class AnswersController {

    // http://localhost:3333/answers/10?u=10d8df90-77b0-11eb-859c-63bbc3497515
    async execute(request: Request, response: Response) {

        const { value } = request.params;
        const { u } = request.query;

        const surveyUserRepository = getCustomRepository(SurveyUserRepository)

        // ----------------------------------------------------------------------------------------------------

        const surveyUser = await surveyUserRepository.findOne({
            id: String(u)
        })

        if (!surveyUser) {
            return response.status(400).json({
                error: "surveyUser does not exists"
            })
        }

        // ----------------------------------------------------------------------------------------------------

        surveyUser.value = Number(value);

        // ----------------------------------------------------------------------------------------------------
        await surveyUserRepository.save(surveyUser)

        return response.status(200).json({ surveyUser })

    }

    async getall(request: Request, response: Response) {
    }


}

export default AnswersController