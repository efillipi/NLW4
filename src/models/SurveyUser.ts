import {Entity,PrimaryColumn,Column} from 'typeorm'
import {v1 as uuid} from 'uuid'

@Entity('surveys_users')
class SurveyUser{

    @PrimaryColumn('uuid')
    readonly id: string;

    @Column()
    user_id: string;


    @Column()
    survey_id: string;

    @Column()
    value: number;

    @Column()
    created_at: Date;

    constructor(){
        if(!this.id){
            this.id = uuid()
        }
    }
}

export default SurveyUser;