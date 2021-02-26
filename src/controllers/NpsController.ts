import { Request, Response } from 'express';
import { getCustomRepository, Not, IsNull } from 'typeorm';

import SurveyUserRepository from '../repositories/SurveyUserRepository';


class NpsController {


    async execute(request: Request, response: Response) {

        const { survey_id } = request.params

        const surveyUserRepository = getCustomRepository(SurveyUserRepository)

        const surveyUsers = await surveyUserRepository.find({
            survey_id,
            value: Not(IsNull()),
        })

        const detractor = surveyUsers.filter(
            (survey) => survey.value >= 0 && survey.value <= 6
        ).length

        const promoters = surveyUsers.filter(
            (survey) => survey.value >= 9 && survey.value <= 10
        ).length

        const passive = surveyUsers.filter(
            (survey) => survey.value >= 7 && survey.value <= 8
        ).length

        const totalAnsers = surveyUsers.length

        const calculate = Number(((promoters - detractor) / totalAnsers) * 100).toFixed(2)

        return response.status(200).json({
            detractor,
            promoters,
            totalAnsers,
            NPS: calculate
        })

    }

    async getall(request: Request, response: Response) {
    }

}

export default NpsController