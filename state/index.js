
import Flow from './Flow';
import Config from './Config';
import persist from './persist';

export const config = Config.create();
export const flow = Flow.create();

persist('config', config);
persist('flow', flow);