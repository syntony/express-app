import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm'
import { IsNotEmpty, Length } from 'class-validator'

import { Store } from './Store'
import { Offer } from './Offer'

@Entity()
export class Hookah {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', nullable: false, unique: true })
  @IsNotEmpty()
  @Length(4, 20)
  name: string

  @Column({ type: 'varchar', nullable: true })
  description: string

  @Column({ type: 'tinyint', nullable: false })
  pipes: number

  @Column({ nullable: true })
  image: string

  @Column()
  @CreateDateColumn()
  createdAt: Date

  @Column()
  @UpdateDateColumn()
  updatedAt: Date

  @Column({ type: 'boolean', default: 1 })
  isPublished: boolean

  @Column('uuid')
  storeId: string

  @ManyToOne((type) => Store, (store) => store.hookahs)
  @JoinColumn({ name: 'storeId', referencedColumnName: 'id' })
  store: Store

  @OneToMany((type) => Offer, (offer) => offer.hookah)
  offers: Offer[]
}
