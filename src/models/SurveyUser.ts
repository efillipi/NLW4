import {Entity,PrimaryColumn,Column, ManyToOne, JoinColumn} from 'typeorm'
import {v1 as uuid} from 'uuid'
import User from './User';
import Survey from './Survey';

@Entity('surveys_users')
class SurveyUser{

    @PrimaryColumn('uuid')
    readonly id: string;

    @Column()
    user_id: string;

    @ManyToOne(()=> User)
    @JoinColumn({name:"user_id"})
    user: User

    @Column()
    survey_id: string;

    @ManyToOne(()=> Survey)
    @JoinColumn({name:"survey_id"})
    survey: Survey

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