import {Entity,PrimaryColumn,Column} from 'typeorm'
import {v1 as uuid} from 'uuid'

@Entity('users')
class User{

    @PrimaryColumn('uuid')
    readonly id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    created_at: Date;

    constructor(){
        if(!this.id){
            this.id = uuid()
        }
    }
}

export default User;