/* Guest briefing localization. Profile data and storage IDs are never translated. */
(function() {
  'use strict';
  var english = {
  "Ещё не синхронизировано": "Not synced yet",
  "Синхронизировано": "Synced",
  "Сохранено локально": "Saved locally",
  "Ошибка синхронизации": "Sync error",
  "Сессия создана локально": "Session created locally",
  "Backend не подключён": "Backend not connected",
  "ПРАВИЛО": "RULE",
  "ЗАПРЕТ": "PROHIBITED",
  "ОПАСНОСТЬ": "HAZARD",
  "ОК": "OK",
  "<summary class=\"card-fulltext-toggle\">Полный текст</summary>": "<summary class=\"card-fulltext-toggle\">Full text</summary>",
  "Гость": "Guest",
  "Сотрудник": "Employee",
  "Оцените обстановку": "Assess the situation",
  "Убедитесь в собственной безопасности. Устраните угрожающие факторы или эвакуируйтесь из опасной зоны.": "Make sure you are safe. Remove any hazards or leave the danger zone.",
  "Проверьте пострадавшего": "Check the casualty",
  "Проверьте сознание (окликните), дыхание (10 сек), пульс. По результатам определите дальнейшие действия.": "Check for consciousness (call out), breathing (10 seconds) and a pulse. Decide what to do next based on your findings.",
  "Вызовите скорую — 112": "Call an ambulance — 112",
  "Сообщите: что случилось, сколько пострадавших, точный адрес. Не кладите трубку — следуйте инструкциям диспетчера.": "Tell the dispatcher what happened, how many people are injured and the exact address. Stay on the line and follow the dispatcher's instructions.",
  "Нет сознания и дыхания → СЛР": "Unconscious and not breathing → CPR",
  "30 надавливаний на грудину (глубина 5–6 см, темп 100–120/мин) + 2 вдоха. Повторяйте до приезда медиков.": "Give 30 chest compressions (5–6 cm deep, at 100–120 per minute) followed by 2 rescue breaths. Repeat until medical help arrives.",
  "Кровотечение → остановить": "Bleeding → stop the bleeding",
  "Прижмите рану тканью. При сильном — наложите жгут выше раны, запишите время. При небольшом — давящая повязка.": "Press a cloth against the wound. For severe bleeding, apply a tourniquet above the wound and record the time. For minor bleeding, apply a pressure dressing.",
  "Устойчивое положение": "Recovery position",
  "Если без сознания, но дышит — уложите на бок (восстановительное положение). Не давайте есть и пить.": "If unconscious but breathing, place the casualty on their side in the recovery position. Do not give them anything to eat or drink.",
  "Сообщите представителю": "Notify a company representative",
  "Немедленно уведомите ответственного сотрудника организации. Оставайтесь с пострадавшим до приезда медицинской помощи.": "Immediately notify the responsible company employee. Stay with the casualty until medical help arrives.",
  "<div><div class=\"fa-emergency-num\">112</div><div class=\"fa-emergency-sub\">Единый номер экстренных служб</div></div></div>": "<div><div class=\"fa-emergency-num\">112</div><div class=\"fa-emergency-sub\">Emergency services number</div></div></div>",
  "Командировка": "Business trip",
  "Деловой визит": "Business visit",
  "Поставка / получение": "Delivery / collection",
  "Технический осмотр": "Technical inspection",
  "Другое": "Other",
  "<div class=\"guest-id-hero-title\">Вводный инструктаж по ТБ</div>": "<div class=\"guest-id-hero-title\">Safety induction</div>",
  "<div class=\"guest-id-hero-sub\">Перед нахождением на территории организации необходимо ознакомиться с требованиями безопасности</div>": "<div class=\"guest-id-hero-sub\">You must read the safety requirements before entering the company premises</div>",
  "<div class=\"id-why-card\"><div class=\"id-why-icon\" style=\"background:var(--brand-bg)\">🎬</div><div class=\"id-why-label\">Видеоинструктаж</div></div>": "<div class=\"id-why-card\"><div class=\"id-why-icon\" style=\"background:var(--brand-bg)\">🎬</div><div class=\"id-why-label\">Video briefing</div></div>",
  "<div class=\"id-why-card\"><div class=\"id-why-icon\" style=\"background:var(--green-bg)\">📋</div><div class=\"id-why-label\">8 разделов ТБ</div></div>": "<div class=\"id-why-card\"><div class=\"id-why-icon\" style=\"background:var(--green-bg)\">📋</div><div class=\"id-why-label\">8 safety sections</div></div>",
  "<div class=\"id-why-card\"><div class=\"id-why-icon\" style=\"background:var(--blue-bg)\">📄</div><div class=\"id-why-label\">Подтверждение</div></div>": "<div class=\"id-why-card\"><div class=\"id-why-icon\" style=\"background:var(--blue-bg)\">📄</div><div class=\"id-why-label\">Confirmation</div></div>",
  "<div class=\"form-block-title\">Ваши данные</div>": "<div class=\"form-block-title\">Your details</div>",
  "<label class=\"form-label\" for=\"gname\">ФИО <span class=\"req\">*</span></label>": "<label class=\"form-label\" for=\"gname\">Full name <span class=\"req\">*</span></label>",
  "<input class=\"form-input\" id=\"gname\" type=\"text\" placeholder=\"Иванов Иван Иванович\" value=\"": "<input class=\"form-input\" id=\"gname\" type=\"text\" placeholder=\"John Smith\" value=\"",
  "<label class=\"form-label\" for=\"gorg\">Организация <span class=\"req\">*</span></label>": "<label class=\"form-label\" for=\"gorg\">Organisation <span class=\"req\">*</span></label>",
  "<input class=\"form-input\" id=\"gorg\" type=\"text\" placeholder=\"ООО «Название»\" value=\"": "<input class=\"form-input\" id=\"gorg\" type=\"text\" placeholder=\"Company name\" value=\"",
  "<label class=\"form-label\" for=\"gpurpose\">Цель визита</label>": "<label class=\"form-label\" for=\"gpurpose\">Purpose of visit</label>",
  "<select class=\"form-select\" id=\"gpurpose\"><option value=\"\">Выбрать...</option>": "<select class=\"form-select\" id=\"gpurpose\"><option value=\"\">Select...</option>",
  "<label class=\"form-label\" for=\"gphone\">Телефон</label>": "<label class=\"form-label\" for=\"gphone\">Phone</label>",
  "<div class=\"info-box\"><svg width=\"15\" height=\"15\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><line x1=\"12\" y1=\"8\" x2=\"12\" y2=\"12\"/><line x1=\"12\" y1=\"16\" x2=\"12.01\" y2=\"16\"/></svg>Данные используются только для подтверждения прохождения инструктажа</div>": "<div class=\"info-box\"><svg width=\"15\" height=\"15\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><line x1=\"12\" y1=\"8\" x2=\"12\" y2=\"12\"/><line x1=\"12\" y1=\"16\" x2=\"12.01\" y2=\"16\"/></svg>Your details are used only to confirm completion of the induction</div>",
  "<button class=\"btn btn-primary btn-full\" id=\"btnStart\" type=\"button\">Начать инструктаж <svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\"><path d=\"M5 12h14M12 5l7 7-7 7\"/></svg></button>": "<button class=\"btn btn-primary btn-full\" id=\"btnStart\" type=\"button\">Start induction <svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\"><path d=\"M5 12h14M12 5l7 7-7 7\"/></svg></button>",
  "ФИО": "Full name",
  "организацию": "your organisation",
  "<div class=\"flow-dot\" title=\"Раздел ": "<div class=\"flow-dot\" title=\"Section ",
  "<div class=\"flow-stepper-top\"><span class=\"flow-stepper-label\">Шаг 1 из ": "<div class=\"flow-stepper-top\"><span class=\"flow-stepper-label\">Step 1 of ",
  " — Видеоинструктаж</span><span class=\"flow-stepper-pct\" id=\"vpPct\">0%</span></div>": " — Video briefing</span><span class=\"flow-stepper-pct\" id=\"vpPct\">0%</span></div>",
  "<div class=\"flow-dots\"><div class=\"flow-dot active\" id=\"vpDot\" title=\"Видео\">▶</div>": "<div class=\"flow-dots\"><div class=\"flow-dot active\" id=\"vpDot\" title=\"Video\">▶</div>",
  "<div class=\"slide-block-title\">Вводный видеоинструктаж</div>": "<div class=\"slide-block-title\">Safety induction video</div>",
  "<div class=\"vp-title\">Система контроля соблюдения ТБ</div>": "<div class=\"vp-title\">Safety compliance system</div>",
  "<div class=\"vp-sub\">ООО «ИЦ ТМК» / АО «РусНИТИ» — обязательный вводный инструктаж</div>": "<div class=\"vp-sub\">TMK Research Centre LLC / RusNITI JSC — mandatory safety induction</div>",
  "<div class=\"vp-timer hidden\" id=\"vpTimer\"><div class=\"vp-timer-bar\"><div class=\"vp-timer-fill\" id=\"vpFill\" style=\"width:0%\"></div></div><span id=\"vpSec\">8</span> сек.</div>": "<div class=\"vp-timer hidden\" id=\"vpTimer\"><div class=\"vp-timer-bar\"><div class=\"vp-timer-fill\" id=\"vpFill\" style=\"width:0%\"></div></div><span id=\"vpSec\">8</span> sec.</div>",
  "<button class=\"vp-play-btn\" id=\"vpPlayBtn\" type=\"button\">▶&nbsp;&nbsp;Начать просмотр</button>": "<button class=\"vp-play-btn\" id=\"vpPlayBtn\" type=\"button\">▶&nbsp;&nbsp;Start watching</button>",
  "<div class=\"vp-note\">Видеоролик будет подключён позже. Нажмите для демонстрации прохождения.</div>": "<div class=\"vp-note\">The video will be added later. Click to try the completion demo.</div>",
  "<div class=\"info-box\" style=\"margin-bottom:0\"><svg width=\"15\" height=\"15\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><line x1=\"12\" y1=\"8\" x2=\"12\" y2=\"12\"/><line x1=\"12\" y1=\"16\" x2=\"12.01\" y2=\"16\"/></svg>Необходимо просмотреть видеоролик полностью перед переходом к разделам инструктажа</div>": "<div class=\"info-box\" style=\"margin-bottom:0\"><svg width=\"15\" height=\"15\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><line x1=\"12\" y1=\"8\" x2=\"12\" y2=\"12\"/><line x1=\"12\" y1=\"16\" x2=\"12.01\" y2=\"16\"/></svg>You must watch the entire video before continuing to the induction sections</div>",
  "<button class=\"btn btn-secondary\" id=\"btnBackV\" type=\"button\">← Назад</button>": "<button class=\"btn btn-secondary\" id=\"btnBackV\" type=\"button\">← Back</button>",
  "<button class=\"btn btn-primary btn-grow\" id=\"btnToSlides\" type=\"button\" disabled>К инструктажу →</button>": "<button class=\"btn btn-primary btn-grow\" id=\"btnToSlides\" type=\"button\" disabled>Continue to induction →</button>",
  " сек.": " sec.",
  "<span style=\"color:var(--green);font-weight:800;font-size:.85rem\">✓ Просмотрено</span>": "<span style=\"color:var(--green);font-weight:800;font-size:.85rem\">✓ Watched</span>",
  "Укажите ": "Please enter ",
  "<div class=\"page\"><div class=\"page-head\"><div class=\"page-head-title\">Ошибка загрузки</div></div></div>": "<div class=\"page\"><div class=\"page-head\"><div class=\"page-head-title\">Loading error</div></div></div>",
  "Начало": "Home",
  "Инструктаж": "Induction",
  "Раздел ": "Section ",
  "<div class=\"flow-dot done\" title=\"Видеоинструктаж\">▶</div>": "<div class=\"flow-dot done\" title=\"Video briefing\">▶</div>",
  "\" title=\"Раздел ": "\" title=\"Section ",
  "<div class=\"page-head-eyebrow\">Вводный инструктаж · ": "<div class=\"page-head-eyebrow\">Safety induction · ",
  " разделов</div>": " sections</div>",
  "<div class=\"flow-stepper-top\"><span class=\"flow-stepper-label\">Раздел <strong>": "<div class=\"flow-stepper-top\"><span class=\"flow-stepper-label\">Section <strong>",
  "</strong> из ": "</strong> of ",
  "<label class=\"confirm-label\" for=\"confirmCheck\">Ознакомлен с разделом</label>": "<label class=\"confirm-label\" for=\"confirmCheck\">I have read this section</label>",
  "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" style=\"flex-shrink:0\"><path d=\"M19 12H5M12 19l-7-7 7-7\"/></svg> Назад": "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" style=\"flex-shrink:0\"><path d=\"M19 12H5M12 19l-7-7 7-7\"/></svg> Back",
  "Следующий раздел <svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" style=\"flex-shrink:0\"><path d=\"M5 12h14M12 5l7 7-7 7\"/></svg>": "Next section <svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" style=\"flex-shrink:0\"><path d=\"M5 12h14M12 5l7 7-7 7\"/></svg>",
  "Завершить инструктаж <svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" style=\"flex-shrink:0\"><polyline points=\"20 6 9 17 4 12\"/></svg>": "Complete induction <svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" style=\"flex-shrink:0\"><polyline points=\"20 6 9 17 4 12\"/></svg>",
  "<span class=\"micro-check-badge\">Проверка</span>": "<span class=\"micro-check-badge\">Knowledge check</span>",
  "\" disabled type=\"button\">Подтвердить ответ</button>": "\" disabled type=\"button\">Submit answer</button>",
  "<span class=\"micro-check-badge\" style=\"background:var(--green);color:#fff\">Верно ✓</span>": "<span class=\"micro-check-badge\" style=\"background:var(--green);color:#fff\">Correct ✓</span>",
  "⚠ Неверно. ": "⚠ Incorrect. ",
  "Инструктаж пройден": "Induction completed",
  "<div class=\"receipt-row\"><span class=\"receipt-key\">Телефон</span><span class=\"receipt-val\">": "<div class=\"receipt-row\"><span class=\"receipt-key\">Phone</span><span class=\"receipt-val\">",
  "<div class=\"done-hero-title\">Инструктаж пройден</div>": "<div class=\"done-hero-title\">Induction completed</div>",
  "<div class=\"done-hero-sub\">Все разделы вводного инструктажа изучены</div>": "<div class=\"done-hero-sub\">All safety induction sections have been reviewed</div>",
  "<div><div class=\"done-id-label\">ID прохождения</div><div class=\"done-id-value\">": "<div><div class=\"done-id-label\">Completion ID</div><div class=\"done-id-value\">",
  "<span class=\"done-synced-badge\"><svg width=\"10\" height=\"10\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\"><polyline points=\"20 6 9 17 4 12\"/></svg>Зафиксировано</span>": "<span class=\"done-synced-badge\"><svg width=\"10\" height=\"10\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\"><polyline points=\"20 6 9 17 4 12\"/></svg>Recorded</span>",
  "<span class=\"verif-block-title\">Подтверждение прохождения</span>": "<span class=\"verif-block-title\">Confirmation of completion</span>",
  "<div class=\"verif-qr\" title=\"QR-код для верификации\">": "<div class=\"verif-qr\" title=\"Verification QR code\">",
  "<button class=\"btn-copy\" id=\"btnCopyId\" type=\"button\" title=\"Скопировать ID\"><svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><rect x=\"9\" y=\"9\" width=\"13\" height=\"13\" rx=\"2\"/><path d=\"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1\"/></svg>Скопировать</button>": "<button class=\"btn-copy\" id=\"btnCopyId\" type=\"button\" title=\"Copy ID\"><svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><rect x=\"9\" y=\"9\" width=\"13\" height=\"13\" rx=\"2\"/><path d=\"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1\"/></svg>Copy</button>",
  "<div class=\"verif-sections-count\"><svg width=\"11\" height=\"11\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\"><polyline points=\"20 6 9 17 4 12\"/></svg>Пройдено: ": "<div class=\"verif-sections-count\"><svg width=\"11\" height=\"11\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\"><polyline points=\"20 6 9 17 4 12\"/></svg>Completed: ",
  "<div class=\"verif-note\">Предъявите этот ID ответственному лицу для оформления пропуска. QR-код содержит идентификатор прохождения.</div>": "<div class=\"verif-note\">Show this ID to the responsible person to obtain your site pass. The QR code contains your completion ID.</div>",
  "<div class=\"receipt-row\"><span class=\"receipt-key\">ФИО</span><span class=\"receipt-val\">": "<div class=\"receipt-row\"><span class=\"receipt-key\">Full name</span><span class=\"receipt-val\">",
  "<div class=\"receipt-row\"><span class=\"receipt-key\">Организация</span><span class=\"receipt-val\">": "<div class=\"receipt-row\"><span class=\"receipt-key\">Organisation</span><span class=\"receipt-val\">",
  "<div class=\"receipt-row\"><span class=\"receipt-key\">Цель визита</span><span class=\"receipt-val\">": "<div class=\"receipt-row\"><span class=\"receipt-key\">Purpose of visit</span><span class=\"receipt-val\">",
  "<div class=\"receipt-row\"><span class=\"receipt-key\">Дата и время</span><span class=\"receipt-val\">": "<div class=\"receipt-row\"><span class=\"receipt-key\">Date and time</span><span class=\"receipt-val\">",
  "<div class=\"receipt-row receipt-row-status\"><span class=\"receipt-key\">Статус</span><span class=\"receipt-val receipt-status-val\"><svg class=\"receipt-status-icon\" width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\"><polyline points=\"20 6 9 17 4 12\"/></svg>Инструктаж пройден полностью</span></div>": "<div class=\"receipt-row receipt-row-status\"><span class=\"receipt-key\">Status</span><span class=\"receipt-val receipt-status-val\"><svg class=\"receipt-status-icon\" width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\"><polyline points=\"20 6 9 17 4 12\"/></svg>Induction completed in full</span></div>",
  "<div class=\"done-print-cta-text\"><strong>Распечатайте или отправьте подтверждение</strong> — оно потребуется для оформления пропуска на объект</div>": "<div class=\"done-print-cta-text\"><strong>Print or share your confirmation</strong> — you will need it to obtain a site pass</div>",
  "<button class=\"btn btn-secondary\" id=\"btnHomeG\" type=\"button\">На главную</button>": "<button class=\"btn btn-secondary\" id=\"btnHomeG\" type=\"button\">Home</button>",
  " Поделиться": " Share",
  " Распечатать": " Print",
  "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\"><polyline points=\"20 6 9 17 4 12\"/></svg>Скопировано": "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\"><polyline points=\"20 6 9 17 4 12\"/></svg>Copied",
  "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><rect x=\"9\" y=\"9\" width=\"13\" height=\"13\" rx=\"2\"/><path d=\"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1\"/></svg>Скопировать": "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><rect x=\"9\" y=\"9\" width=\"13\" height=\"13\" rx=\"2\"/><path d=\"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1\"/></svg>Copy",
  "<tr><td>Телефон</td><td>": "<tr><td>Phone</td><td>",
  "<meta charset=\"UTF-8\"><title>Подтверждение инструктажа — ИЦ ТМК</title>": "<meta charset=\"UTF-8\"><title>Induction confirmation — TMK Research Centre</title>",
  "<div><div class=\"org\">ООО «ИЦ ТМК»</div><div class=\"doc-type\">Подтверждение прохождения вводного инструктажа по охране труда</div></div>": "<div><div class=\"org\">TMK Research Centre LLC</div><div class=\"doc-type\">Confirmation of safety induction completion</div></div>",
  "<div class=\"status-badge\">✓ Инструктаж пройден</div>": "<div class=\"status-badge\">✓ Induction completed</div>",
  "<div><div class=\"id-label\">ID прохождения</div><div class=\"id-val\">": "<div><div class=\"id-label\">Completion ID</div><div class=\"id-val\">",
  "<div class=\"id-note\">Пройдено ": "<div class=\"id-note\">Completed ",
  " из ": " of ",
  " разделов · Предъявите ID ответственному лицу</div>": " sections · Show your ID to the responsible person</div>",
  "<tr><td>ФИО</td><td><strong>": "<tr><td>Full name</td><td><strong>",
  "<tr><td>Организация</td><td>": "<tr><td>Organisation</td><td>",
  "<tr><td>Цель визита</td><td>": "<tr><td>Purpose of visit</td><td>",
  "<tr><td>Дата и время</td><td>": "<tr><td>Date and time</td><td>",
  "<tr><td>Инструктаж</td><td><strong>Вводный инструктаж по охране труда</strong></td></tr>": "<tr><td>Induction</td><td><strong>Safety induction</strong></td></tr>",
  "<tr><td class=\"status-cell\">Статус</td><td class=\"status-cell\">✓ Пройден в полном объёме (": "<tr><td class=\"status-cell\">Status</td><td class=\"status-cell\">✓ Completed in full (",
  " разделов)</td></tr>": " sections)</td></tr>",
  "<div class=\"sec-title\">Пройденные разделы инструктажа:</div>": "<div class=\"sec-title\">Completed induction sections:</div>",
  "<div class=\"sign-box\">Подпись инструктируемого<br><br>___________________________</div>": "<div class=\"sign-box\">Participant's signature<br><br>___________________________</div>",
  "<div class=\"sign-box\">Подпись ответственного лица<br><br>___________________________</div>": "<div class=\"sign-box\">Responsible person's signature<br><br>___________________________</div>",
  "<div class=\"footer\">Документ сформирован автоматически · ООО «ИЦ ТМК» / АО «РусНИТИ» · Система обучения по охране труда</div>": "<div class=\"footer\">Automatically generated document · TMK Research Centre LLC / RusNITI JSC · Occupational safety training system</div>",
  "✅ Вводный инструктаж по охране труда пройден": "✅ Safety induction completed",
  "ФИО: ": "Full name: ",
  "Организация: ": "Organisation: ",
  "Цель визита: ": "Purpose of visit: ",
  "Дата и время: ": "Date and time: ",
  "Разделов пройдено: ": "Sections completed: ",
  "ID прохождения: ": "Completion ID: ",
  "ООО «ИЦ ТМК» / АО «РусНИТИ»": "TMK Research Centre LLC / RusNITI JSC",
  "Система контроля соблюдения ТБ": "Safety compliance system",
  "Подтверждение инструктажа — ": "Induction confirmation — ",
  "Подтверждение прохождения вводного инструктажа — ": "Confirmation of safety induction completion — ",
  "Начать заново? Весь прогресс будет сброшен.": "Start again? All progress will be reset.",
  "Сбросить ВСЕ данные приложения?": "Reset ALL application data?",
  " разделов ТБ": " safety sections"
};
  var current = 'ru';
  try { current = JSON.parse(localStorage.getItem('tmk_lang')) === 'en' ? 'en' : 'ru'; } catch(e) {}
  var purposes = ['Командировка','Деловой визит','Поставка / получение','Технический осмотр','Другое'];
  function text(value) {
    return current === 'en' && Object.prototype.hasOwnProperty.call(english, value) ? english[value] : value;
  }
  function applyStatic() {
    var en = current === 'en';
    document.documentElement.lang = current;
    document.title = en ? 'Safety Induction — TMK Research Centre / RusNITI' : 'Система контроля соблюдения ТБ — ИЦ ТМК / РусНИТИ';
    var description = document.querySelector('meta[name="description"]');
    if (description) description.content = en ? 'TMK Research Centre LLC / RusNITI JSC — introductory safety briefing for visiting employees and visitors.' : 'ООО «ИЦ ТМК» / АО «РусНИТИ» — Система контроля соблюдения ТБ. Вводный инструктаж для командированных сотрудников и посетителей.';
    var labels = {
      '.top-bar-title': en ? 'TMK Research Centre / RusNITI' : 'ИЦ ТМК / РусНИТИ',
      '.top-bar-sub': en ? 'Safety compliance system' : 'Система контроля соблюдения ТБ',
      '.settings-menu-header': en ? 'Settings' : 'Настройки',
      '[data-i18n="restart"]': en ? 'Start again' : 'Начать заново',
      '[data-i18n="reset"]': en ? 'Reset all data' : 'Сбросить все данные'
    };
    Object.keys(labels).forEach(function(selector) { var el = document.querySelector(selector); if (el) el.textContent = labels[selector]; });
    var settings = document.getElementById('settingsBtn');
    if (settings) settings.setAttribute('aria-label', en ? 'Settings' : 'Настройки');
    var group = document.querySelector('.language-switch');
    if (group) group.setAttribute('aria-label', en ? 'Briefing language' : 'Язык инструктажа');
    ['ru','en'].forEach(function(language) {
      var button = document.getElementById(language === 'ru' ? 'languageRu' : 'languageEn');
      if (button) button.setAttribute('aria-pressed', String(current === language));
    });
  }
  window.GuestI18n = {
    text: text,
    purposes: purposes,
    language: function() { return current; },
    setLanguage: function(language) {
      if (language !== 'ru' && language !== 'en') return;
      current = language;
      try { localStorage.setItem('tmk_lang', JSON.stringify(current)); } catch(e) {}
      applyStatic();
    },
    applyStatic: applyStatic
  };
})();
