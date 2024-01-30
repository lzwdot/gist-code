import { TermTaxonomyEnum } from '@/constant/enum';
import { Term, TermTaxonomy } from '@/entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTermDto } from './dto/create-term.dto';
import { UpdateTermDto } from './dto/update-term.dto';

@Injectable()
export class TermService {
  private termTable: string;
  private termTaxonomyTable: string;

  constructor(
    @InjectRepository(Term)
    private termRepository: Repository<Term>,
    @InjectRepository(TermTaxonomy)
    private termTaxonomyRepository: Repository<TermTaxonomy>,
  ) {
    this.termTable = this.termRepository.metadata.tableName;
    this.termTaxonomyTable = this.termTaxonomyRepository.metadata.tableName;
  }

  create(createTermDto: CreateTermDto) {
    return 'This action adds a new term';
  }

  findAll() {
    return `This action returns all term`;
  }

  findOne(id: number) {
    return `This action returns a #${id} term`;
  }

  update(id: number, updateTermDto: UpdateTermDto) {
    return `This action updates a #${id} term`;
  }

  remove(id: number) {
    return `This action removes a #${id} term`;
  }

  /**
   * 查找分类
   * @param value
   * @param field
   * @returns
   */
  async findCategory() {
    const term = await this.termRepository
      .createQueryBuilder(this.termTable)
      .innerJoin(
        this.termTaxonomyTable,
        this.termTaxonomyTable,
        `${this.termTable}.term_id=${this.termTaxonomyTable}.term_id`,
      )
      .where(`taxonomy='${TermTaxonomyEnum.category}'`)
      .orWhere(`term_group=1`)
      .getMany();

    return term;
  }
}
