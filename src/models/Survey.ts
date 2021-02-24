import {Entity,PrimaryColumn,Column} from 'typeorm'
import {v1 as uuid} from 'uuid'

@Entity('surveys')
class Surveys{

    @PrimaryColumn('uuid')
    readonly id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    created_at: Date;

    constructor(){
        if(!this.id){
            this.id = uuid()
        }
    }
}

export default Surveys;