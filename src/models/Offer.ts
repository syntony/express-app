import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { IsInt, Min, IsNotEmpty, Length, IsDateString } from 'class-validator'

import { Store } from './Store'
import { Hookah } from './Hookah'

@Entity('Offer')
export class Offer {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: false })
  @IsNotEmpty({ groups: ['offers-queries'] })
  @Length(4, 20, { groups: ['offers-queries'] })
  guest: string

  @Column({ nullable: false })
  @IsNotEmpty({ groups: ['offers-queries', 'hookahs-queries'] })
  @IsInt({ groups: ['offers-queries', 'hookahs-queries'] })
  @Min(1)
  guestsNumber: number

  @Column({ type: 'date', nullable: false })
  @IsNotEmpty({ groups: ['offers-queries', 'hookahs-queries'] })
  @IsDateString({ groups: ['offers-queries', 'hookahs-queries'] })
  reservedFrom: string

  @Column({ type: 'date', nullable: false })
  @IsNotEmpty({ groups: ['offers-queries', 'hookahs-queries'] })
  @IsDateString({ groups: ['offers-queries', 'hookahs-queries'] })
  reservedUntil: string

  @Column({ type: 'uuid', nullable: false })
  @IsNotEmpty({ groups: ['offers-queries'] })
  storeId: string

  @Column({ type: 'uuid', nullable: false })
  @IsNotEmpty({ groups: ['offers-queries'] })
  hookahId: string

  @Column()
  @CreateDateColumn()
  createdAt: Date

  @Column()
  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(() => Store, (store) => store.offers)
  @JoinColumn({ name: 'storeId', referencedColumnName: 'id' })
  store: Store

  @ManyToOne(() => Hookah, (hookah) => hookah.offers)
  @JoinColumn({ name: 'hookahId', referencedColumnName: 'id' })
  hookah: Hookah
}
