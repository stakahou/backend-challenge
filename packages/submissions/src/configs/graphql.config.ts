import { GqlModuleOptions } from '@nestjs/graphql';
import * as config from 'config';
import { join } from 'path';

const configs = config.get('graphql');

export default {
  ...configs,
  autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
} as GqlModuleOptions;
