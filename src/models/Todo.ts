import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm'

export enum statusType {
    IN_PROGRESS = 'in-progress',
    COMPLETED = 'completed',
    CREATED = 'created',
}

@Entity('todos')
export class Todo extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({
        type: 'enum',
        enum: statusType,
    })
    status: string

    @Column({
        default: true,
    })
    is_active: boolean

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}
