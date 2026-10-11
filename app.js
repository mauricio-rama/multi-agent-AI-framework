const STORAGE_KEY = 'diario-estudio-sesiones';

const form = document.querySelector('#session-form');
const dateInput = document.querySelector('#session-date');
const topicInput = document.querySelector('#session-topic');
const minutesInput = document.querySelector('#session-minutes');
const sessionList = document.querySelector('#session-list');
const emptyState = document.querySelector('#empty-state');
const sessionCount = document.querySelector('#session-count');
const streakValue = document.querySelector('#streak-value');
const streakDays = document.querySelector('#streak-days');
const bestStreakValue = document.querySelector('#best-streak-value');
const bestStreakDays = document.querySelector('#best-streak-days');
const weeklyMinutes = document.querySelector('#weekly-minutes');
const monthlyDays = document.querySelector('#monthly-days');

function getLocalDate(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function loadSessions() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    if (!Array.isArray(saved)) return [];

    return saved.filter((session) =>
      session &&
      typeof session.date === 'string' &&
      typeof session.topic === 'string' &&
      Number.isFinite(Number(session.minutes)) &&
      Number(session.minutes) > 0
    );
  } catch {
    return [];
  }
}

let sessions = loadSessions();

function saveSessions() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

function formatDate(dateString) {
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return new Intl.DateTimeFormat('es', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

function renderSessions() {
  sessionList.replaceChildren();
  const sortedSessions = [...sessions].sort((a, b) => b.date.localeCompare(a.date));

  for (const session of sortedSessions) {
    const item = document.createElement('li');
    item.className = 'session-item';

    const icon = document.createElement('span');
    icon.className = 'session-date-icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = '✎';

    const info = document.createElement('div');
    info.className = 'session-info';

    const topic = document.createElement('p');
    topic.className = 'session-topic';
    topic.textContent = session.topic;

    const date = document.createElement('p');
    date.className = 'session-date';
    date.textContent = formatDate(session.date);

    const minutes = document.createElement('span');
    minutes.className = 'session-minutes';
    minutes.textContent = `${session.minutes} min`;

    info.append(topic, date);
    item.append(icon, info, minutes);
    sessionList.append(item);
  }

  sessionCount.textContent = String(sessions.length);
  emptyState.hidden = sessions.length > 0;
  updateStreak();
  updateWeeklyMinutes();
  updateMonthlyDays();
}

function updateStreak() {
  const studiedDates = new Set(sessions.map((session) => session.date));
  const today = getLocalDate();
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterday = getLocalDate(yesterdayDate);

  // Una sesión de hoy o ayer mantiene la racha activa hasta que termine hoy.
  let cursor = studiedDates.has(today) ? today : studiedDates.has(yesterday) ? yesterday : null;
  let streak = 0;

  while (cursor && studiedDates.has(cursor)) {
    streak += 1;
    const [year, month, day] = cursor.split('-').map(Number);
    const previousDay = new Date(year, month - 1, day);
    previousDay.setDate(previousDay.getDate() - 1);
    cursor = getLocalDate(previousDay);
  }

  streakValue.textContent = String(streak);
  streakDays.textContent = streak === 1 ? 'día' : 'días';

  const pastAndPresentDates = [...studiedDates]
    .filter((date) => date <= today)
    .sort();
  let bestStreak = 0;
  let currentRun = 0;
  let previousDate = null;

  for (const date of pastAndPresentDates) {
    if (previousDate && date === addLocalDays(previousDate, 1)) {
      currentRun += 1;
    } else {
      currentRun = 1;
    }
    bestStreak = Math.max(bestStreak, currentRun);
    previousDate = date;
  }

  bestStreakValue.textContent = String(bestStreak);
  bestStreakDays.textContent = bestStreak === 1 ? 'día' : 'días';
}

function addLocalDays(dateString, days) {
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() + days);
  return getLocalDate(date);
}

function updateWeeklyMinutes() {
  const today = new Date();
  const daysSinceMonday = (today.getDay() + 6) % 7;
  today.setDate(today.getDate() - daysSinceMonday);
  const weekStart = getLocalDate(today);
  const todayString = getLocalDate();

  const total = sessions.reduce((sum, session) => {
    if (session.date >= weekStart && session.date <= todayString) {
      return sum + Number(session.minutes);
    }
    return sum;
  }, 0);

  weeklyMinutes.textContent = String(total);
}

function updateMonthlyDays() {
  const today = getLocalDate();
  const currentMonth = today.slice(0, 7);
  const studiedDays = new Set(
    sessions
      .map((session) => session.date)
      .filter((date) => date.startsWith(currentMonth) && date <= today)
  );

  monthlyDays.textContent = String(studiedDays.size);
}

dateInput.value = getLocalDate();
renderSessions();

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;

  const minutes = Number(minutesInput.value);
  if (!Number.isFinite(minutes) || minutes <= 0) return;

  sessions.push({
    date: dateInput.value,
    topic: topicInput.value.trim(),
    minutes,
  });
  saveSessions();
  form.reset();
  dateInput.value = getLocalDate();
  renderSessions();
});
