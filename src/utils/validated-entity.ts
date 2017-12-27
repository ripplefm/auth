import { BaseEntity, BeforeInsert, BeforeUpdate } from 'typeorm';
import { validate } from 'class-validator';

export default abstract class ValidatedEntity extends BaseEntity {
  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    const errors = await validate(this);
    if (errors.length > 0) {
      throw errors[0];
    }
  }
}
