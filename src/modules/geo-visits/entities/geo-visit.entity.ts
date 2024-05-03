import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class GeoVisit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  unitId: number;

  @Column({ type: 'varchar' })
  geofence: string;

  @Column({ type: 'datetime' })
  enterTime: string;

  @Column({ type: 'datetime' })
  exitTime: string;

  @Column({ type: 'datetime' })
  from: string;

  @Column({ type: 'datetime' })
  to: string;
}
