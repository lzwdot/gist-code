import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
  MongoQuery,
} from '@casl/ability';
import { User } from '../types/interface';
import { PostEntity } from '../entity/post.entity';
import { UserEntity } from '../entity/user.entity';
import { ActionEnum, RoleEnum } from '../config/enum.config';

type Subjects = InferSubjects<typeof PostEntity | typeof UserEntity> | 'all';
type AppAbility = Ability<[ActionEnum, Subjects]>;

let ANONYMOUS_ABILITY: AnyType;

export class CasService {
  public builder: AbilityBuilder<Ability<[ActionEnum, Subjects]>>;

  defineAbilityFor(user: AnyType) {
    if (user) {
      return this.defineRulesFor(user);
    }

    ANONYMOUS_ABILITY =
      ANONYMOUS_ABILITY || this.defineRulesFor({ group: 'anonymous' });
    return ANONYMOUS_ABILITY;
  }

  defineRulesFor(user: AnyType) {
    this.builder = new AbilityBuilder<Ability<[ActionEnum, Subjects]>>(
      Ability as AbilityClass<AppAbility>,
    );

    switch (user.group || user.userGroup) {
      case RoleEnum.Admin:
        this.defineAdminRules();
        break;
      case RoleEnum.User:
        this.defineCreateRules(user);
        this.defineDeleteRules(user);
        this.defineUpdateRules(user);
        this.defineReadRules(user);
        break;
      default:
        this.defineAnonymousRules();
        break;
    }
    return this.builder.build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }

  // admin rule
  defineAdminRules() {
    const { can, cannot } = this.builder;

    can(ActionEnum.Manage, 'all');
  }

  // anonymous rule
  defineAnonymousRules() {
    const { can, cannot } = this.builder;

    can(ActionEnum.Read, 'all');
  }

  // create rule
  defineCreateRules(user: AnyType) {
    const { can, cannot } = this.builder;

    can(ActionEnum.Create, PostEntity);
  }

  // delete rule
  defineDeleteRules(user: AnyType) {
    const { can, cannot } = this.builder;

    // post
    cannot(ActionEnum.Delete, PostEntity, { postStatus: 'publish' });
    can(ActionEnum.Delete, PostEntity, { postAuthor: user.sub });
  }

  // update rule
  defineUpdateRules(user: AnyType) {
    const { can, cannot } = this.builder;

    // post
    can(ActionEnum.Update, PostEntity, { postAuthor: user.sub });
  }

  // read rule
  defineReadRules(user: AnyType) {
    const { can, cannot } = this.builder;

    can(ActionEnum.Read, 'all');
  }
}
