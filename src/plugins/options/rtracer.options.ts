import type { IFastifyOptions } from 'cls-rtracer';

import { requestIdHeader } from 'src/config/constants';

export const rTracerOptions: Readonly<IFastifyOptions> = {
  echoHeader: true,
  headerName: requestIdHeader,
  useFastifyRequestId: true,
};
