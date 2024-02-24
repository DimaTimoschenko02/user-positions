import { DataSource, EntityRepository, Repository } from 'typeorm';
import { Position } from '../entities/position.entity';

@EntityRepository()
export class PositionRepository extends Repository<Position> {
  constructor(dataSource: DataSource) {
    super(Position, dataSource.createEntityManager());
  }
}
