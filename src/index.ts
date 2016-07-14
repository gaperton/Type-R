import * as tools from './objectplus/tools.ts'
import { Record as Model } from './record/index.ts'

import { Events } from './objectplus/events.ts'
export const { on, off, trigger, once, listenTo, stopListening, listenToOnce } = Events;

//import { Collection } from './collection'

export * from './objectplus/mixins.ts'
export * from './objectplus/events.ts'

export {
    tools,
    Model,
    //Collection,
}; 