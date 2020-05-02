import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Unique } from 'typeorm'
import { IsNotEmpty, Length } from 'class-validator'

@Entity()
@Unique(['name'])
export class Store {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', nullable: false, unique: true })
  @IsNotEmpty()
  @Length(4, 20)
  name: string

  @Column({ type: 'varchar', nullable: true })
  description: string

  @Column({ type: 'boolean', default: true })
  isPublished: boolean

  @Column({ nullable: true })
  image: string

  @Column()
  @CreateDateColumn()
  createdAt: Date

  @Column()
  @UpdateDateColumn()
  updatedAt: Date
}
