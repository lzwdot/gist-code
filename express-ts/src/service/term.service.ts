import { In } from 'typeorm';
import appDataSource from '../config/database.config';
import { TermEntity } from '../entity/term.entity';
import { TermTypeEnum } from '../config/enum.config';

export class TermService {
  public termRepository = appDataSource.getRepository(TermEntity);

  /**
   * update tags
   */
  async tags(data: string[]) {
    const slugs = data.map((item: AnyType) => item.value || item);
    const terms = await this.termRepository.findBy({ termSlug: In(slugs) });

    data.forEach((item: AnyType) => {
      const tag = item.value || item;
      const term = this.termRepository.create({
        termName: tag,
        termSlug: tag,
        termType: TermTypeEnum.Tag,
      });

      const exist = terms.find((item) => item.termSlug === term.termSlug);
      if (!exist) {
        terms.push(term);
      }
    });

    return terms;
  }
}
