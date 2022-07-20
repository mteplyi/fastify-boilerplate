import './bootstrap';

import { getLogger } from 'src/logger';
import { start } from 'src/server';

const log = getLogger(__filename);

process.on('uncaughtException', (e) => {
  log.error(e, 'Uncaught Exception');
});

process.on('unhandledRejection', (reason: Object) => {
  log.error(reason, 'Unhandled Rejection');
});

start().catch((e: Error) => {
  log.error(e, 'Failed to start server');
});
