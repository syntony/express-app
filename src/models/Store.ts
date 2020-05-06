import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Unique, OneToMany } from 'typeorm'
import { IsNotEmpty, Length } from 'class-validator'

import { Hookah } from './Hookah'
import { Offer } from './Offer'

@Entity('store')
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

  @Column({ nullable: true })
  image: string

  @Column()
  @CreateDateColumn()
  createdAt: Date

  @Column()
  @UpdateDateColumn()
  updatedAt: Date

  @Column({ type: 'boolean', default: true })
  isPublished: boolean

  @OneToMany(() => Hookah, (hookah) => hookah.store)
  hookahs: Hookah[]

  @OneToMany(() => Offer, (offer) => offer.store)
  offers: Offer[]
}
