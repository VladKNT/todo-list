import { PubSub } from 'apollo-server';

import * as TODO_EVENTS from './todo';
import * as TODO_ITEM_EVENTS from './todoItem';

export const EVENTS = {
  TODO: TODO_EVENTS,
  TODO_ITEM: TODO_ITEM_EVENTS
};

export default new PubSub();
