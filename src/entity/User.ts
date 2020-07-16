import { Appoitments } from './Appointments';
import { Studio } from './Studio';
import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, JoinColumn, ManyToOne} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({unique: true})
    email: string;

    protected password: string;

    @Column()
    password_hash: string;

    @Column({default: 0})
    deleted: number;

    @Column({nullable: true})
    image: string;

    @ManyToMany(type => Appoitments, (appoitment: Appoitments) => appoitment.userId)
    appointment: Appoitments[]

}
