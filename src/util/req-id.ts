import { randomUUID } from 'node:crypto';

import rTracer from 'cls-rtracer';

// import hyperId from 'hyperid';
// export const generateRequestId = hyperId({ urlSafe: true, fixedLength: true });

export const generateRequestId = () => randomUUID();

export const getRequestId = () => rTracer.id() as string | undefined;
