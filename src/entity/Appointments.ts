import { Studio } from './Studio';
import { User } from './User';
import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinColumn, JoinTable} from "typeorm";

@Entity()
export class Appoitments {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "date"})
    date: Date;

    @ManyToMany(type => User, (userId: User) => userId.appointment)
    @JoinTable({name: "appointments_user"})
    userId: User[]

    @ManyToMany(type => Studio, (studioId : Studio) => studioId.appointment)
    @JoinTable({name: "appointments_studio"})
    studioId: Studio[]

    @Column()
    room: string;

    @Column()
    name: string;

    @Column()
    initial : string;

    @Column()
    end : string;

}
