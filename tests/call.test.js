import {
  afterEach, beforeEach, expect, test,
} from '@jest/globals';
import {
  getPrompt, handleEvents, removePrompt, settings,
} from '../app/index.js';
import config from '../config/index.js';
import { SETTING_AI_ACTIVATED } from '../constants/setting.js';
import storage from '../storage/index.js';
import { createEvents, TIMEOUT, USER_ID } from './utils.js';

beforeEach(() => {
  storage.setItem(SETTING_AI_ACTIVATED, false);
});

afterEach(() => {
  removePrompt(USER_ID);
});

test('COMMAND_CALL', async () => {
  const events = [
    ...createEvents([`${config.SETTING_AI_NAME} 你好`]),
  ];
  let results;
  try {
    results = await handleEvents(events);
  } catch (err) {
    console.error(err);
  }
  expect(getPrompt(USER_ID).lines.length).toEqual(3 * 2);
  const replies = results.map(({ messages }) => messages.map(({ text }) => text));
  expect(replies).toEqual(
    [
      ['OK!'],
    ],
  );
}, TIMEOUT);
