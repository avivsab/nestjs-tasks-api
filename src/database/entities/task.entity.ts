import { Entity, Column } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';

@Entity()
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    taskName: string;

    @Column('json', { nullable: true })
    result: number;

    @Column()
    status: string;

    @Column('simple-array', { nullable: true, array: true })
    parameters: number[];

    @Column('varchar', { nullable: true })
    parametersString: string;
}
