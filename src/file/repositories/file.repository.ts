import { DataSource, EntityRepository, Repository } from 'typeorm';
import { File } from '../entities/file.entity';

@EntityRepository()
export class FileRepository extends Repository<File> {
  constructor(dataSource: DataSource) {
    super(File, dataSource.createEntityManager());
  }
}
