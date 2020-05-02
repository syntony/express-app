import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { IsNotEmpty, Length } from 'class-validator'

import { Store } from './Store'
import { Hookah } from './Hookah'

@Entity()
export class Offer {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: false })
  @IsNotEmpty()
  @Length(4, 20)
  guest: string

  @Column({ nullable: false })
  @IsNotEmpty()
  guestsNumber: number

  @Column({ type: 'date', nullable: false })
  reservedFrom: Date

  @Column({ type: 'date', nullable: false })
  reservedUntil: Date

  @Column('uuid')
  storeId: string

  @Column('uuid')
  hookahId: string

  @Column()
  @CreateDateColumn()
  createdAt: Date

  @Column()
  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne((type) => Store, (store) => store.offers)
  @JoinColumn({ name: 'storeId', referencedColumnName: 'id' })
  store: Store

  @ManyToOne((type) => Hookah, (hookah) => hookah.offers)
  @JoinColumn({ name: 'hookahId', referencedColumnName: 'id' })
  hookah: Hookah
}
