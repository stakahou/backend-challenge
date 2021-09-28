import { ClientOptions } from '@nestjs/microservices';
import * as config from 'config';
import { copyObjectAsMutable } from '../helpers/utils';

const kafka = config.get('kafka');

export default {
  ...copyObjectAsMutable(kafka),
} as ClientOptions;
