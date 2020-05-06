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
import { IsNotEmpty, Length, IsInt, Min, Max } from 'class-validator'

import { Store } from './Store'
import { Offer } from './Offer'

@Entity('hookah')
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
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(6)
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

  @Column({ type: 'uuid', nullable: false })
  @IsNotEmpty()
  storeId: string

  @ManyToOne(() => Store, (store) => store.hookahs)
  @JoinColumn({ name: 'storeId', referencedColumnName: 'id' })
  store: Store

  @OneToMany(() => Offer, (offer) => offer.hookah)
  offers: Offer[]
}
