import { Appoitments } from './Appointments';
import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne, JoinColumn} from "typeorm";

@Entity()
export class Studio {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name: string;

    @Column({nullable: true})
    site: string;

    @Column({nullable: true})
    image: string;

    @Column()
    description: string;

    @ManyToMany(type => Appoitments, (appointment: Appoitments) => appointment.studioId)
    appointment: Appoitments[]
}
