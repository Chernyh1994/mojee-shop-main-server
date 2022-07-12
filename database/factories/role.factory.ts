import { setSeederFactory } from 'typeorm-extension';
import { Role } from '../../src/roles/entities/role.entity';
import { RoleValues } from '../../src/roles/types/roles.type';

let roleEnumValueCount = 0;

export default setSeederFactory(Role, (faker) => {
  const role = new Role();
  const values = Object.keys(RoleValues);

  if (roleEnumValueCount > values.length) {
    roleEnumValueCount = 0;
  }

  const enumKey = values[roleEnumValueCount];

  role.name = RoleValues[enumKey];
  role.description = faker.lorem.text();

  roleEnumValueCount++;

  return role;
});
