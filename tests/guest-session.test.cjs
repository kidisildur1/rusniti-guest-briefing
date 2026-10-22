const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const initialProfile = {
  name: 'First Guest', org: 'Test Company', phone: '+44 20 7946 0958',
  purpose: 'Деловой визит', sessionId: 'TMK-ORIGINAL', dt: '20.10.2026 09:00'
};
const completed = { done: true, steps: [1, 2, 3, 4, 5, 6, 7], completedAt: '20.10.2026 09:10' };

// Run the real application event handlers in an isolated browser-state stub.
// This never reads or modifies a visitor's browser data.
function app(seed = {}) {
  const storage = new Map(Object.entries(seed).map(([key, value]) => [key, JSON.stringify(value)]));
  const nodes = new Map();
  const documentEvents = {};
  function element(selector) {
    if (!nodes.has(selector)) nodes.set(selector, {
      value: '', innerHTML: '', textContent: '', style: {}, dataset: {}, listeners: {},
      classList: { add() {}, remove() {}, toggle() {} },
      addEventListener(name, callback) { this.listeners[name] = callback; },
      removeEventListener(name) { delete this.listeners[name]; },
      setAttribute(name, value) { this[name] = value; },
      removeAttribute(name) { delete this[name]; },
      querySelectorAll() { return []; },
      pause() {}, load() {}, currentTime: 0, duration: 0
    });
    return nodes.get(selector);
  }
  const context = {
    console, performance, setTimeout, clearTimeout, setInterval() {},
    localStorage: {
      getItem: key => storage.get(key) ?? null,
      setItem: (key, value) => storage.set(key, value),
      removeItem: key => storage.delete(key)
    },
    document: {
      documentElement: {}, querySelector: element,
      getElementById: id => element('#' + id),
      addEventListener: (name, callback) => { documentEvents[name] = callback; }
    },
    window: { addEventListener() {}, scrollTo() {}, scrollY: 0 }
  };
  vm.createContext(context);
  for (const file of ['guest_intro.js', 'guest_intro.en.js', 'guest-i18n.js', 'guest-app.js']) {
    vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context, { filename: file });
  }
  documentEvents.DOMContentLoaded();
  return {
    element,
    read: key => storage.has(key) ? JSON.parse(storage.get(key)) : null,
    click(id) { element(id).listeners.click.call(element(id), { stopPropagation() {} }); },
    fill(profile) {
      for (const key of ['name', 'org', 'purpose', 'phone']) element('#g' + key).value = profile[key] || '';
    }
  };
}

function returningGuest(language = 'en') {
  const seed = {
    tmk_lang: language, tmk_role: 'guest', tmk_guest_prof: initialProfile,
    tmk_guest_prog: completed, tmk_guest_video_v1_ok: true,
    tmk_guest_video_v1_progress: { en: { time: 167, maxTime: 167 } },
    tmk_sync_status: { state: 'local' }
  };
  for (let id = 1; id <= 5; id++) seed['tmk_mc_' + id] = true;
  const instance = app(seed);
  instance.click('#btnHomeG');
  return instance;
}

test('another visitor cannot inherit a completed video, quizzes or confirmation', () => {
  for (const changed of [{ name: 'Second Guest' }, { org: 'Other Company' }, { phone: '+1 202 555 0199' }]) {
    const instance = returningGuest();
    const next = { ...initialProfile, ...changed };
    instance.fill(next);
    instance.click('#btnStart');
    assert.notEqual(instance.read('tmk_guest_prof').sessionId, initialProfile.sessionId);
    assert.equal(instance.read('tmk_guest_prog'), null);
    assert.equal(instance.read('tmk_guest_video_v1_ok'), null);
    assert.equal(instance.read('tmk_guest_video_v1_progress'), null);
    for (let id = 1; id <= 5; id++) assert.equal(instance.read('tmk_mc_' + id), null);
    assert.equal(instance.read('tmk_sync_status'), null);
    assert.equal(instance.element('#btnToSlides').disabled, true);
    assert.match(instance.element('#app').innerHTML, /id="guestVideo"/);
  }
});

test('the same visitor keeps their original session and progress after editing formatting or purpose', () => {
  const instance = returningGuest();
  instance.fill({ ...initialProfile, name: ' first  guest ', org: 'TEST COMPANY', phone: '+44 (20) 7946-0958', purpose: 'Другое' });
  instance.click('#btnStart');
  assert.equal(instance.read('tmk_guest_prof').sessionId, initialProfile.sessionId);
  assert.equal(instance.read('tmk_guest_prof').dt, initialProfile.dt);
  assert.deepEqual(instance.read('tmk_guest_prog'), completed);
  assert.equal(instance.read('tmk_mc_1'), true);
  assert.match(instance.element('#app').innerHTML, /Induction completed/);
  assert.doesNotMatch(instance.element('#app').innerHTML, /verif-qr|Verification QR|QR-код/);
});

test('changing RU/EN on the profile does not reset the active visitor session', () => {
  const instance = returningGuest('ru');
  instance.fill(initialProfile);
  instance.click('#languageEn');
  assert.match(instance.element('#app').innerHTML, /First Guest/);
  assert.equal(instance.read('tmk_guest_prof').sessionId, initialProfile.sessionId);
  instance.click('#languageRu');
  instance.click('#btnStart');
  assert.equal(instance.read('tmk_guest_prof').sessionId, initialProfile.sessionId);
  assert.deepEqual(instance.read('tmk_guest_prog'), completed);
});

test('international phone numbers survive input and saving in both languages', () => {
  for (const language of ['ru', 'en']) {
    for (const phone of ['+44 20 7946 0958', '+1 202 555 0199', '+7 (999) 123-45-67', '']) {
      const instance = app({ tmk_lang: language });
      instance.fill({ name: 'New Guest', org: 'Test', phone });
      const phoneInput = instance.element('#gphone');
      if (phoneInput.listeners.input) phoneInput.listeners.input.call(phoneInput);
      assert.equal(phoneInput.value, phone);
      instance.click('#btnStart');
      assert.equal(instance.read('tmk_guest_prof').phone, phone);
    }
  }
});
