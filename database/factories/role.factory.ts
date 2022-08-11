import { setSeederFactory } from 'typeorm-extension';
import { RoleEntity } from '../../src/roles/entities/role.entity';
import { RoleEnum } from '../../src/roles/enums/role.enum';

let roleEnumValueCount = 0;

export default setSeederFactory(RoleEntity, (faker) => {
  const role = new RoleEntity();
  const values = Object.keys(RoleEnum);

  if (roleEnumValueCount > values.length) {
    roleEnumValueCount = 0;
  }

  const enumKey = values[roleEnumValueCount];

  role.name = RoleEnum[enumKey];
  role.description = faker.lorem.text();

  roleEnumValueCount++;

  return role;
});
