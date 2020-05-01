import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Store {
  @PrimaryGeneratedColumn('uuid') id: string
  @Column({ type: 'varchar', nullable: false, unique: true }) name: string
  @Column({ type: 'varchar', nullable: true }) description: string
  @Column({ default: false }) isPublished: boolean
}
