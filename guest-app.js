
(function() {
  'use strict';

  var tr = window.GuestI18n.text;

  /* ---- localStorage keys ---- */
  const K = {
    ROLE:     'tmk_role',
    G_PROG:   'tmk_guest_prog',   // { done, steps:[], startedAt }
    G_PROF:   'tmk_guest_prof',   // { name, org, phone, purpose, dt, sessionId }
    G_VID:    'tmk_video_ok',     // boolean — видеоинструктаж просмотрен
    E_PROF:   'tmk_emp_prof',
    E_DEPT:   'tmk_emp_dept',
    E_INST:   'tmk_emp_inst',
    E_DRAFTS: 'tmk_emp_drafts',
  };

  /* ================================================================
     SERVICE LAYER — API заглушка (заменить реальным API)
     ================================================================ */
  /* ================================================================
     SYNC STATUS — persists sync state to localStorage
     ================================================================ */
  var SyncStatus = {
    KEY: 'tmk_sync_status',
    // states: 'synced' | 'local' | 'error'
    set: function(state, msg) {
      lsS(SyncStatus.KEY, { state: state, msg: msg || '', ts: fmtDt(new Date()) });
    },
    get: function() {
      return lsG(SyncStatus.KEY, { state: 'local', msg: tr('Ещё не синхронизировано'), ts: '' });
    },
    // Render chip HTML
    chip: function() {
      var s = SyncStatus.get();
      var map = {
        synced: { cls:'sync-chip--ok',    icon:'✓', label:tr('Синхронизировано') },
        local:  { cls:'sync-chip--local', icon:'↑', label:tr('Сохранено локально') },
        error:  { cls:'sync-chip--error', icon:'!', label:tr('Ошибка синхронизации') }
      };
      var m = map[s.state] || map.local;
      return '<span class="sync-chip '+m.cls+'">'
        +'<span class="sync-chip-dot"></span>'
        + esc(m.label)
        +'</span>';
    }
  };

  /* ================================================================
     SERVICE LAYER — API stub (replace with real fetch() calls)
     Структура готова к подключению backend:
       POST /api/guest/sessions
       POST /api/guest/sessions/:id/complete
       POST /api/guest/sessions/:id/answers
       POST /api/guest/sessions/:id/progress
     ================================================================ */
  const ApiService = {
    _base: '/api',

    async createGuestSession(profile) {
      // STUB → replace with:
      // const r = await fetch(this._base+'/guest/sessions', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(profile)});
      // const data = await r.json(); return data;
      const sessionId = 'TMK-' + Math.random().toString(36).substr(2,4).toUpperCase() + '-' + Date.now().toString(36).substr(-4).toUpperCase();
      console.info('[API STUB] POST /api/guest/sessions', { profile, sessionId });
      SyncStatus.set('local', tr('Сессия создана локально'));
      return { sessionId, ok: true };
    },

    async completeGuestSession(sessionId, data) {
      // STUB → replace with real fetch
      console.info('[API STUB] POST /api/guest/sessions/'+sessionId+'/complete', data);
      // Simulate: randomly set synced or local to demonstrate UI
      // In production: set 'synced' on success, 'error' on catch
      SyncStatus.set('local', tr('Backend не подключён'));
      return { ok: true, verificationCode: sessionId };
    },

    async submitMicroCheck(sessionId, questionId, answer, correct) {
      console.info('[API STUB] POST /api/guest/sessions/'+sessionId+'/answers', { questionId, answer, correct });
      return { ok: true };
    },

    async saveProgress(sessionId, slideId) {
      console.info('[API STUB] POST /api/guest/sessions/'+sessionId+'/progress', { slideId });
      return { ok: true };
    }
  };

  /* ---- Utils ---- */
  function lsG(k, fb) {
    try { var v=localStorage.getItem(k); if(v===null)return(fb!==undefined?fb:null); return JSON.parse(v); } catch(e) { return(fb!==undefined?fb:null); }
  }
  function lsS(k,v) { try { localStorage.setItem(k,JSON.stringify(v)); } catch(e) {} }
  function lsD(k)   { try { localStorage.removeItem(k); } catch(e) {} }
  function esc(s) {
    return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }
  function $(sel)   { return document.querySelector(sel); }
  function pad(n)   { return String(n).padStart(2,'0'); }
  function fmtDt(d) { return pad(d.getDate())+'.'+pad(d.getMonth()+1)+'.'+d.getFullYear()+' '+pad(d.getHours())+':'+pad(d.getMinutes()); }
  function appEl()  { return $('#app'); }
  function scrollTop() { if (!S.switching) window.scrollTo({top:0,behavior:'smooth'}); }
  function shortLabel(str) { if(!str)return''; return str.length>22?str.slice(0,20)+'...':str; }
  function genId()  { return 'TMK-'+Math.random().toString(36).substr(2,4).toUpperCase()+'-'+Date.now().toString(36).substr(-4).toUpperCase(); }

  /* ---- Data getters ---- */
  function getIntro() { var data = window.GuestI18n.language() === 'en' ? window.GUEST_INTRO_EN : window.GUEST_INTRO; return Array.isArray(data) ? data : []; }
  function getDepts()     { return (window.DEPARTMENTS && Array.isArray(window.DEPARTMENTS)) ? window.DEPARTMENTS : []; }
  function getInstalls(d) { return (window.INSTALLATIONS && window.INSTALLATIONS[d]) ? window.INSTALLATIONS[d] : []; }
  function getInstById(id) {
    if(!window.INSTALLATIONS) return null;
    for(var d in window.INSTALLATIONS){var arr=window.INSTALLATIONS[d]; for(var i=0;i<arr.length;i++){if(arr[i]&&arr[i].id===id)return arr[i];}}
    return null;
  }

  /* ---- Icon map ---- */
  var ICONS = {
    'map':'📍','door':'🚪','walk':'🚶','car':'🚗','stairs':'🪜','phone-off':'📵',
    'zap':'⚡','tag':'🏷️','fence':'🚧',
    'power':'🔌','alert':'⚠️','check':'✅','bell':'🔔','hard-hat':'⛑️','ban':'🚫',
    'drop':'💧','fork':'🍽️','hand':'🤲','flask':'🧪','glasses':'🥽','headphones':'🎧',
    'vest':'🦺','glove':'🧤','ice':'🌨️','monitor':'🖥️','body':'🧍','eye':'👁️',
    'search':'🔍','heart':'❤️','phone':'📞','user':'👤','bulb':'💡','brush':'✨',
    'shield':'🛡️','fire':'🔥','burn':'🌡️','book':'📖','ok':'✅'
  };
  function getIcon(n) { return '<span class="card-emoji-wrap">'+(ICONS[n]||'•')+'</span>'; }

  function cardTypes() { return {
    'rule':{ label:tr('ПРАВИЛО'),  cls:'sc-rule' },
    'ban': { label:tr('ЗАПРЕТ'),   cls:'sc-ban'  },
    'warn':{ label:tr('ОПАСНОСТЬ'),cls:'sc-warn' },
    'ok':  { label:tr('ОК'),       cls:'sc-ok'   }
  }; }

  function renderSafetyCard(card) {
    var types = cardTypes();
    var t = types[card.type] || types.rule;
    var badgeSvg = card.type==='ban'
      ?'<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>'
      :card.type==='ok'
        ?'<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>'
        :card.type==='warn'
          ?'<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>'
          :'<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>';

    // fullText из Word — показываем если title сокращён (они отличаются)
    var hasFullText = card.fullText && card.fullText !== card.title;
    var expandHtml = '';
    if (hasFullText) {
      expandHtml = '<details class="card-fulltext-details">'
        +tr('<summary class="card-fulltext-toggle">Полный текст</summary>')
        +'<div class="card-fulltext-body">'+esc(card.fullText)+'</div>'
        +'</details>';
    }

    return '<div class="safety-card '+t.cls+'">'
      +'<div class="safety-card-icon">'+getIcon(card.icon)+'</div>'
      +'<div class="safety-card-title">'+esc(card.title)+'</div>'
      +'<div class="safety-card-sub">'+esc(card.sub)+'</div>'
      +expandHtml
      +'<div class="safety-card-badge '+t.cls+'-badge">'+badgeSvg+' '+t.label+'</div>'
      +'</div>';
  }

  /* ---- State ---- */
  var S = { screen:'home', guestStep:0, dept:null, inst:null, switching:false, quizDrafts:{}, landingDraft:null };
  var videoTimer = null, videoElapsed = 0, videoPlaying = false;
  function stopVideoTimer() { clearInterval(videoTimer); videoTimer = null; }

  /* ---- Top bar ---- */
  function updateTopBar() {
    var rb=$('#roleBadge'); var dt=$('#dtLabel');
    var role=lsG(K.ROLE);
    if(rb){ if(role){rb.textContent=role==='guest'?tr('Гость'):tr('Сотрудник'); rb.style.display='inline-flex';} else {rb.style.display='none';} }
    if(dt) dt.textContent = fmtDt(new Date());
  }

  /* ---- Breadcrumb ---- */
  function setBreadcrumb(crumbs) {
    var bar=$('#breadcrumbBar'); var inner=$('#breadcrumbInner');
    if(!bar||!inner) return;
    if(!crumbs||!crumbs.length){bar.classList.add('hidden');return;}
    bar.classList.remove('hidden');
    var html='';
    for(var i=0;i<crumbs.length;i++){
      var c=crumbs[i]; var isLast=i===crumbs.length-1;
      if(i>0) html+='<span class="bc-sep">/</span>';
      if(isLast) html+='<div class="bc-item active"><button>'+esc(c.label)+'</button></div>';
      else html+='<div class="bc-item"><button data-bc="'+i+'">'+esc(c.label)+'</button></div>';
    }
    inner.innerHTML=html;
    inner.querySelectorAll('[data-bc]').forEach(function(btn){
      var idx=parseInt(btn.dataset.bc,10);
      btn.addEventListener('click', crumbs[idx].onClick);
    });
  }
  function hideBreadcrumb() { var b=$('#breadcrumbBar'); if(b) b.classList.add('hidden'); }

  /* ================================================================
     FIRST AID renderer
     ================================================================ */
  function renderFirstAid() {
    var steps = [
      {n:'1',color:'#E8500A',icon:'⚠️',title:tr('Оцените обстановку'),      text:tr('Убедитесь в собственной безопасности. Устраните угрожающие факторы или эвакуируйтесь из опасной зоны.')},
      {n:'2',color:'#157A3E',icon:'❤️',title:tr('Проверьте пострадавшего'),  text:tr('Проверьте сознание (окликните), дыхание (10 сек), пульс. По результатам определите дальнейшие действия.')},
      {n:'3',color:'#E8500A',icon:'📞',title:tr('Вызовите скорую — 112'),   text:tr('Сообщите: что случилось, сколько пострадавших, точный адрес. Не кладите трубку — следуйте инструкциям диспетчера.')},
      {n:'4',color:'#157A3E',icon:'🩺',title:tr('Нет сознания и дыхания → СЛР'),text:tr('30 надавливаний на грудину (глубина 5–6 см, темп 100–120/мин) + 2 вдоха. Повторяйте до приезда медиков.')},
      {n:'5',color:'#B91C1C',icon:'🩸',title:tr('Кровотечение → остановить'),text:tr('Прижмите рану тканью. При сильном — наложите жгут выше раны, запишите время. При небольшом — давящая повязка.')},
      {n:'6',color:'#1654C0',icon:'🤕',title:tr('Устойчивое положение'),     text:tr('Если без сознания, но дышит — уложите на бок (восстановительное положение). Не давайте есть и пить.')},
      {n:'7',color:'#1654C0',icon:'👥',title:tr('Сообщите представителю'),   text:tr('Немедленно уведомите ответственного сотрудника организации. Оставайтесь с пострадавшим до приезда медицинской помощи.')}
    ];
    var html='<div class="fa-wrap">'
      +'<div class="fa-emergency"><span style="font-size:28px">📞</span>'
      +tr('<div><div class="fa-emergency-num">112</div><div class="fa-emergency-sub">Единый номер экстренных служб</div></div></div>');
    for(var i=0;i<steps.length;i++){
      var s=steps[i]; var isLast=i===steps.length-1;
      html+='<div class="fa-step">'
        +'<div class="fa-step-left">'
        +'<div class="fa-step-num" style="background:'+s.color+'">'+s.n+'</div>'
        +(isLast?'':'<div class="fa-step-line"></div>')
        +'</div>'
        +'<div class="fa-step-body">'
        +'<div class="fa-step-icon">'+s.icon+'</div>'
        +'<div class="fa-step-title">'+s.title+'</div>'
        +'<div class="fa-step-text">'+s.text+'</div>'
        +'</div></div>';
    }
    html+='</div>';
    return html;
  }

  /* ================================================================
     LANDING — Стартовый экран командированного
     ================================================================ */
  function showHome() { showLanding(); } // алиас для обратной совместимости

  function showLanding() {
    stopVideoTimer();
    S.screen = 'landing'; hideBreadcrumb(); updateTopBar();
    var savedProf = S.landingDraft || lsG(K.G_PROF, {});
    if (!savedProf || typeof savedProf !== 'object') savedProf = {};
    var purposeOptions = window.GuestI18n.purposes;
    var purposeHtml = purposeOptions.map(function(p) {
      return '<option value="'+esc(p)+'"'+(savedProf.purpose===p?' selected':'')+'>'+esc(tr(p))+'</option>';
    }).join('');

    appEl().innerHTML =
      '<div class="page">'
      // ── Hero block
      +'<div class="guest-id-hero">'
      +'<div class="guest-id-hero-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>'
      +tr('<div class="guest-id-hero-title">Вводный инструктаж по ТБ</div>')
      +tr('<div class="guest-id-hero-sub">Перед нахождением на территории организации необходимо ознакомиться с требованиями безопасности</div>')
      +'</div>'
      // ── Badges
      +'<div class="id-why-row">'
      +tr('<div class="id-why-card"><div class="id-why-icon" style="background:var(--brand-bg)">🎬</div><div class="id-why-label">Видеоинструктаж</div></div>')
      +'<div class="id-why-card"><div class="id-why-icon" style="background:var(--green-bg)">📋</div><div class="id-why-label">'+getIntro().length+tr(' разделов ТБ')+'</div></div>'
      +tr('<div class="id-why-card"><div class="id-why-icon" style="background:var(--blue-bg)">📄</div><div class="id-why-label">Подтверждение</div></div>')
      +'</div>'
      // ── Form
      +'<div class="form-block">'
      +tr('<div class="form-block-title">Ваши данные</div>')
      +'<div class="form-group">'
      +tr('<label class="form-label" for="gname">ФИО <span class="req">*</span></label>')
      +tr('<input class="form-input" id="gname" type="text" placeholder="Иванов Иван Иванович" value="')+esc(savedProf.name||'')+'" autocomplete="name">'
      +'<div class="form-hint" id="gname-hint"></div>'
      +'</div>'
      +'<div class="form-group">'
      +tr('<label class="form-label" for="gorg">Организация <span class="req">*</span></label>')
      +tr('<input class="form-input" id="gorg" type="text" placeholder="ООО «Название»" value="')+esc(savedProf.org||'')+'" autocomplete="organization">'
      +'<div class="form-hint" id="gorg-hint"></div>'
      +'</div>'
      +'<div class="form-group">'
      +tr('<label class="form-label" for="gpurpose">Цель визита</label>')
      +tr('<select class="form-select" id="gpurpose"><option value="">Выбрать...</option>')+purposeHtml+'</select>'
      +'</div>'
      +'<div class="form-group">'
      +tr('<label class="form-label" for="gphone">Телефон</label>')
      +'<input class="form-input" id="gphone" type="tel" placeholder="+7 (___) ___-__-__" value="'+esc(savedProf.phone||'')+'" data-phone="true" autocomplete="tel">'
      +'</div>'
      +'</div>'
      +tr('<div class="info-box"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>Данные используются только для подтверждения прохождения инструктажа</div>')
      +'<div class="page-bottom-spacer"></div></div>'
      +'<div class="sticky-bottom no-print"><div class="sticky-bottom-inner">'
      +tr('<button class="btn btn-primary btn-full" id="btnStart" type="button">Начать инструктаж <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button>')
      +'</div></div>';

    var phoneEl = $('#gphone');
    if (phoneEl) { phoneEl.addEventListener('input', function() { this.value = formatPhone(this.value); }); }

    $('#btnStart').addEventListener('click', function() {
      var nameEl = $('#gname'), nameHint = $('#gname-hint');
      var orgEl  = $('#gorg'),  orgHint  = $('#gorg-hint');
      var ok = true;
      if (!validateField(nameEl, nameHint, true, tr('ФИО'))) ok = false;
      if (!validateField(orgEl,  orgHint,  true, tr('организацию'))) ok = false;
      if (!ok) return;
      lsS(K.G_PROF, {
        name:      ($('#gname').value||'').trim(),
        org:       ($('#gorg').value||'').trim(),
        purpose:   ($('#gpurpose').value||'').trim(),
        phone:     ($('#gphone').value||'').trim(),
        dt:        fmtDt(new Date()),
        sessionId: genId()
      });
      S.landingDraft = null;
      lsS(K.ROLE, 'guest');
      showVideo();
    });
    scrollTop();
  }

  /* ================================================================
     VIDEO — Обязательный видеоролик
     ================================================================ */
  function showVideo() {
    stopVideoTimer();
    S.screen = 'video'; hideBreadcrumb(); updateTopBar();
    var intro = getIntro();
    var totalSlides = intro.length;
    var totalDots = '';
    for (var n = 1; n <= totalSlides; n++) {
      totalDots += tr('<div class="flow-dot" title="Раздел ')+n+'">'+n+'</div>';
    }

    appEl().innerHTML =
      '<div class="page">'
      // ── Progress stepper
      +'<div class="flow-stepper">'
      +tr('<div class="flow-stepper-top"><span class="flow-stepper-label">Шаг 1 из ')+(totalSlides+1)+tr(' — Видеоинструктаж</span><span class="flow-stepper-pct" id="vpPct">0%</span></div>')
      +'<div class="flow-bar-outer"><div class="flow-bar-inner" id="vpBar" style="width:0%"></div></div>'
      +tr('<div class="flow-dots"><div class="flow-dot active" id="vpDot" title="Видео">▶</div>')+totalDots+'</div>'
      +'</div>'
      // ── Video block
      +'<div class="slide-block">'
      +'<div class="slide-block-head">'
      +'<div class="slide-block-num" style="font-size:.85rem;letter-spacing:0">▶</div>'
      +tr('<div class="slide-block-title">Вводный видеоинструктаж</div>')
      +'</div>'
      +'<div class="video-placeholder">'
      +'<div class="vp-icon" id="vpIcon">▶</div>'
      +tr('<div class="vp-title">Система контроля соблюдения ТБ</div>')
      +tr('<div class="vp-sub">ООО «ИЦ ТМК» / АО «РусНИТИ» — обязательный вводный инструктаж</div>')
      +tr('<div class="vp-timer hidden" id="vpTimer"><div class="vp-timer-bar"><div class="vp-timer-fill" id="vpFill" style="width:0%"></div></div><span id="vpSec">8</span> сек.</div>')
      +tr('<button class="vp-play-btn" id="vpPlayBtn" type="button">▶&nbsp;&nbsp;Начать просмотр</button>')
      +tr('<div class="vp-note">Видеоролик будет подключён позже. Нажмите для демонстрации прохождения.</div>')
      +'</div>'
      +'<div class="slide-footer">'
      +tr('<div class="info-box" style="margin-bottom:0"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>Необходимо просмотреть видеоролик полностью перед переходом к разделам инструктажа</div>')
      +'</div></div>'
      +'<div class="page-bottom-spacer"></div></div>'
      +'<div class="sticky-bottom no-print"><div class="sticky-bottom-inner">'
      +tr('<button class="btn btn-secondary" id="btnBackV" type="button">← Назад</button>')
      +tr('<button class="btn btn-primary btn-grow" id="btnToSlides" type="button" disabled>К инструктажу →</button>')
      +'</div></div>';

    var playBtn    = $('#vpPlayBtn');
    var vpIcon     = $('#vpIcon');
    var vpTimer    = $('#vpTimer');
    var vpFill     = $('#vpFill');
    var vpSec      = $('#vpSec');
    var btnToSlides = $('#btnToSlides');
    var vpPct      = $('#vpPct');
    var vpBar      = $('#vpBar');
    var vpDot      = $('#vpDot');

    var duration = 8;
    if (lsG(K.G_VID, false)) videoElapsed = duration;
    function paintVideo() {
      var complete = videoElapsed >= duration;
      playBtn.style.display = (videoPlaying || complete) ? 'none' : '';
      vpIcon.textContent = complete ? '✓' : videoPlaying ? '⏵' : '▶';
      vpTimer.classList.toggle('hidden', !videoPlaying && !complete);
      if (complete) {
        vpTimer.innerHTML = tr('<span style="color:var(--green);font-weight:800;font-size:.85rem">✓ Просмотрено</span>');
        var finPct = Math.round(1 / (totalSlides + 1) * 100) + '%';
        vpPct.textContent = finPct;
        vpBar.style.width = finPct;
        vpDot.classList.remove('active'); vpDot.classList.add('done'); vpDot.textContent = '✓';
        btnToSlides.disabled = false;
      } else {
        vpFill.style.width = Math.round(videoElapsed / duration * 100) + '%';
        vpSec.textContent = duration - videoElapsed;
      }
    }
    function startVideoPreview() {
      if (videoElapsed >= duration || videoTimer !== null) return;
      videoPlaying = true;
      paintVideo();
      videoTimer = setInterval(function() {
        videoElapsed++;
        if (videoElapsed >= duration) {
          stopVideoTimer(); videoPlaying = false;
          lsS(K.G_VID, true);
        }
        paintVideo();
      }, 1000);
    }
    playBtn.addEventListener('click', startVideoPreview);
    paintVideo();
    if (videoPlaying && videoElapsed < duration) startVideoPreview();
    if ($('#btnToSlides')) $('#btnToSlides').addEventListener('click', function() { showGuestIntro(0); });
    if ($('#btnBackV'))    $('#btnBackV').addEventListener('click', showLanding);
    scrollTop();
  }

  /* ================================================================
     GUEST FLOW — вспомогательные функции ввода данных
     ================================================================ */
  /* ---- Phone mask helper ---- */
  function formatPhone(val) {
    var d = val.replace(/\D/g,'');
    if (!d) return '';
    if (d[0]==='7' || d[0]==='8') d = '7'+d.slice(1);
    else if (d[0]!=='7') d = '7'+d;
    var r = '+7';
    if (d.length>1) r += ' ('+d.slice(1,4);
    if (d.length>=4) r += ') '+d.slice(4,7);
    if (d.length>=7) r += '-'+d.slice(7,9);
    if (d.length>=9) r += '-'+d.slice(9,11);
    return r;
  }

  /* ---- Field validation helper ---- */
  function validateField(inputEl, hintEl, required, label) {
    var val = inputEl.value.trim();
    if (required && !val) {
      inputEl.classList.add('err'); inputEl.classList.remove('valid');
      if (hintEl) { hintEl.textContent = window.GuestI18n.language() === 'en' ? (inputEl.id === 'gname' ? 'Please enter your full name' : 'Please enter your organisation') : tr('Укажите ')+label; hintEl.className='form-hint err'; }
      return false;
    }
    inputEl.classList.remove('err'); inputEl.classList.add('valid');
    if (hintEl) { hintEl.textContent = ''; hintEl.className='form-hint'; }
    return true;
  }

  /* ================================================================
     GUEST FLOW — Step 1-N: INTRO WIZARD
     ================================================================ */
  function showGuestIntro(stepIdx) {
    stopVideoTimer();
    S.screen='guest-intro'; updateTopBar();
    var intro = getIntro();
    if (!intro.length) {
      appEl().innerHTML=tr('<div class="page"><div class="page-head"><div class="page-head-title">Ошибка загрузки</div></div></div>');
      return;
    }
    if (stepIdx < 0) stepIdx = 0;
    if (stepIdx >= intro.length) { finishBriefing(); return; }

    S.guestStep = stepIdx;
    var step  = intro[stepIdx];
    var total = intro.length;
    var prog  = lsG(K.G_PROG, { done:false, steps:[] });
    if (!prog || !Array.isArray(prog.steps)) prog = { done:false, steps:[] };
    var confirmed = prog.steps.indexOf(step.id) !== -1;
    var mcKey     = 'tmk_mc_' + step.id;
    var mcDone    = !step.microCheck || lsG(mcKey) === true;
    var canNext   = confirmed && mcDone;

    setBreadcrumb([
      {label:tr('Начало'), onClick:showLanding},
      {label:tr('Инструктаж')},
      {label:tr('Раздел ')+(stepIdx+1)+'/'+total}
    ]);

    // Progress dots: video (always done) + slides
    var pct = Math.min(100, Math.round((prog.steps.length + 1) / (total + 1) * 100));
    var dotsHtml = tr('<div class="flow-dot done" title="Видеоинструктаж">▶</div>');
    for (var di=0;di<intro.length;di++) {
      var isDone=prog.steps.indexOf(intro[di].id)!==-1;
      var isActive=di===stepIdx;
      dotsHtml+='<div class="flow-dot '+(isDone?'done':isActive?'active':'')+tr('" title="Раздел ')+(di+1)+'">'+(isDone?'✓':(di+1))+'</div>';
    }

    // Cards HTML
    var cardsHtml = '';
    if (step.firstAid) {
      cardsHtml = renderFirstAid();
    } else if (step.image) {
      cardsHtml = '<div class="step-image-wrap"><img src="'+esc(step.image)+'" alt="'+esc(step.imageAlt||'')+'" class="step-image"></div>';
    } else if (step.cards && step.cards.length) {
      cardsHtml = '<div class="slide-cards-grid">';
      for (var ci=0;ci<step.cards.length;ci++) { cardsHtml+=renderSafetyCard(step.cards[ci]); }
      cardsHtml += '</div>';
    }

    // Micro-check block HTML
    // — показываем сразу, если уже подтвердили; прячем до подтверждения
    var microHtml = '';
    if (step.microCheck) {
      if (confirmed) {
        microHtml = '<div id="microWrap" class="mt-wrap-16">'
          + buildMicroCheck(step.microCheck, stepIdx, prog)
          + '</div>';
      } else {
        microHtml = '<div id="microWrap" class="mt-wrap-16" style="display:none"></div>';
      }
    }

    appEl().innerHTML =
      '<div class="page">'
      +'<div class="page-head">'
      +tr('<div class="page-head-eyebrow">Вводный инструктаж · ')+total+tr(' разделов</div>')
      +'<div class="page-head-title">'+esc(step.title)+'</div>'
      +'</div>'
      +'<div class="flow-stepper">'
      +tr('<div class="flow-stepper-top"><span class="flow-stepper-label">Раздел <strong>')+(stepIdx+1)+tr('</strong> из ')+total+'</span><span class="flow-stepper-pct">'+pct+'%</span></div>'
      +'<div class="flow-bar-outer"><div class="flow-bar-inner" style="width:'+pct+'%"></div></div>'
      +'<div class="flow-dots">'+dotsHtml+'</div>'
      +'</div>'
      +'<div class="slide-block">'
      +'<div class="slide-block-head"><div class="slide-block-num">'+(stepIdx+1)+'</div><div class="slide-block-title">'+esc(step.title)+'</div></div>'
      +'<div>'+cardsHtml+'</div>'
      +'<div class="slide-footer">'
      +'<div class="confirm-row '+(confirmed?'':'locked')+'" id="confirmRow">'
      +'<input type="checkbox" class="confirm-check" id="confirmCheck"'+(confirmed?' checked':'')+(confirmed?'':' disabled')+'>'
      +tr('<label class="confirm-label" for="confirmCheck">Ознакомлен с разделом</label>')
      +'</div></div></div>'
      +microHtml
      +'<div style="height:80px"></div></div>'
      +'<div class="sticky-bottom no-print"><div class="sticky-bottom-inner">'
      +'<button class="btn btn-secondary" id="btnPrev" type="button">'
      +tr('<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="flex-shrink:0"><path d="M19 12H5M12 19l-7-7 7-7"/></svg> Назад')
      +'</button>'
      +'<button class="btn btn-primary btn-grow" id="btnNext"'+(canNext?'':' disabled')+' type="button">'
      +(stepIdx<total-1
        ?tr('Следующий раздел <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="flex-shrink:0"><path d="M5 12h14M12 5l7 7-7 7"/></svg>')
        :tr('Завершить инструктаж <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="flex-shrink:0"><polyline points="20 6 9 17 4 12"/></svg>'))
      +'</button></div></div>';

    var confirmRow=$('#confirmRow'); var confirmChk=$('#confirmCheck'); var btnNext=$('#btnNext');

    // Unlock confirm checkbox immediately (no scroll-gate)
    if (!confirmed) {
      confirmRow.classList.remove('locked');
      confirmChk.removeAttribute('disabled');
    } else {
      // Already confirmed — decide whether to enable btnNext or show micro-check
      if (canNext) {
        btnNext.removeAttribute('disabled');
      } else if (step.microCheck) {
        // Confirmed but quiz not passed yet — bind quiz events
        bindMicroCheck(step.microCheck, stepIdx, btnNext, step);
      }
    }

    confirmChk.addEventListener('change', function() {
      if (this.checked) {
        // Persist confirmation
        var p=lsG(K.G_PROG,{done:false,steps:[]});
        if(!p||!Array.isArray(p.steps)) p={done:false,steps:[]};
        if(p.steps.indexOf(step.id)===-1){ p.steps.push(step.id); lsS(K.G_PROG,p); }

        if (step.microCheck) {
          // Reveal and populate micro-check; keep btnNext disabled until correct answer
          var mw = $('#microWrap');
          mw.innerHTML = buildMicroCheck(step.microCheck, stepIdx, lsG(K.G_PROG,{}));
          mw.style.display = '';
          bindMicroCheck(step.microCheck, stepIdx, btnNext, step);
          setTimeout(function(){ mw.scrollIntoView({behavior:'smooth', block:'nearest'}); }, 80);
        } else {
          // No quiz — enable btnNext immediately
          btnNext.removeAttribute('disabled');
        }
      } else {
        var p = lsG(K.G_PROG, {done:false, steps:[]});
        p.steps = p.steps.filter(function(id) { return id !== step.id; });
        lsS(K.G_PROG, p);
        btnNext.setAttribute('disabled','');
        var mw = $('#microWrap'); if (mw) mw.style.display = 'none';
      }
    });

    $('#btnPrev').addEventListener('click', function(){
      if (stepIdx === 0) { showVideo(); }
      else { showGuestIntro(stepIdx-1); }
    });
    $('#btnNext').addEventListener('click', function(){
      if (stepIdx<total-1) { showGuestIntro(stepIdx+1); }
      else { finishBriefing(); }
    });
    scrollTop();
  }

  /* ---- Micro-check helpers ---- */

  /** Может ли пользователь перейти к следующему слайду? */
  function canProceed(step, prog) {
    if (!step.microCheck) return prog.steps.indexOf(step.id) !== -1;
    return prog.steps.indexOf(step.id) !== -1 && lsG('tmk_mc_' + step.id) === true;
  }

  /** Строит внутренность блока с вопросом (форма ответа) */
  function buildMicroCheckInner(mc, stepIdx) {
    var optHtml = mc.options.map(function(o, i) {
      return '<div class="micro-option" data-oi="'+i+'">'
        +'<div class="micro-radio"></div>'
        +'<span class="micro-option-text">'+esc(o)+'</span>'
        +'</div>';
    }).join('');
    return '<div class="micro-check-head">'
      +tr('<span class="micro-check-badge">Проверка</span>')
      +'<div class="micro-check-q">'+esc(mc.q)+'</div>'
      +'</div>'
      +'<div class="micro-check-body" id="mcOptions_'+stepIdx+'">'+optHtml+'</div>'
      +'<div class="micro-footer">'
      +'<button class="btn btn-primary btn-full btn-sm" id="mcSubmit_'+stepIdx+tr('" disabled type="button">Подтвердить ответ</button>')
      +'</div>';
  }

  /** Строит полный блок micro-check: форму или уже отвеченный результат */
  function buildMicroCheck(mc, stepIdx, prog) {
    var stepId = (window.GUEST_INTRO && window.GUEST_INTRO[stepIdx])
      ? window.GUEST_INTRO[stepIdx].id
      : stepIdx + 1;
    var mcKey = 'tmk_mc_' + stepId;
    if (lsG(mcKey) === true) {
      // Уже отвечено верно — показываем итог
      return '<div class="micro-check">'
        +'<div class="micro-check-head">'
        +tr('<span class="micro-check-badge" style="background:var(--green);color:#fff">Верно ✓</span>')
        +'<div class="micro-check-q">'+esc(mc.q)+'</div>'
        +'</div>'
        +'<div class="micro-check-body">'
        +'<div class="micro-feedback ok">✓ '+esc(mc.explanation)+'</div>'
        +'</div>'
        +'</div>';
    }
    return '<div class="micro-check">' + buildMicroCheckInner(mc, stepIdx) + '</div>';
  }

  /** Привязывает события к форме micro-check */
  function bindMicroCheck(mc, stepIdx, btnNext, step) {
    var mcKey = 'tmk_mc_' + step.id;
    if (lsG(mcKey) === true) { btnNext.removeAttribute('disabled'); return; }

    var draft = S.quizDrafts[step.id] || {selected:-1, failedUntil:0};
    S.quizDrafts[step.id] = draft;
    var body = document.getElementById('mcOptions_' + stepIdx);
    var submitBtn = document.getElementById('mcSubmit_' + stepIdx);
    if (!body || !submitBtn) return;
    var retryTimer = null;
    function paintAnswer() {
      clearTimeout(retryTimer);
      if (draft.failedUntil && draft.failedUntil <= Date.now()) {
        draft.selected = -1; draft.failedUntil = 0;
      }
      var waiting = draft.failedUntil > Date.now();
      body.querySelectorAll('.micro-feedback').forEach(function(el) { el.remove(); });
      body.querySelectorAll('.micro-option').forEach(function(el, i) {
        el.classList.toggle('selected', i === draft.selected);
        el.classList.toggle('correct-ans', waiting && i === mc.correct);
        el.classList.toggle('wrong-ans', waiting && i === draft.selected);
        el.style.pointerEvents = waiting ? 'none' : '';
        el.querySelector('.micro-radio').style.background = i === draft.selected ? 'var(--brand)' : '';
      });
      submitBtn.disabled = draft.selected < 0 || waiting;
      submitBtn.style.display = waiting ? 'none' : '';
      if (waiting) {
        var fb = document.createElement('div'); fb.className = 'micro-feedback err';
        fb.textContent = tr('⚠ Неверно. ') + mc.explanation; body.appendChild(fb);
        retryTimer = setTimeout(function() { if (body.isConnected) paintAnswer(); }, Math.max(1, draft.failedUntil - Date.now()));
      }
    }
    body.querySelectorAll('.micro-option').forEach(function(el) {
      el.addEventListener('click', function() {
        if (draft.failedUntil > Date.now()) return;
        draft.selected = parseInt(this.dataset.oi, 10); paintAnswer();
      });
    });
    submitBtn.addEventListener('click', function() {
      if (draft.selected < 0 || draft.failedUntil > Date.now()) return;
      if (draft.selected === mc.correct) {
        lsS(mcKey, true); delete S.quizDrafts[step.id];
        $('#microWrap').innerHTML = buildMicroCheck(mc, stepIdx, lsG(K.G_PROG, {}));
        btnNext.disabled = !$('#confirmCheck').checked;
      } else {
        draft.failedUntil = Date.now() + 2200; paintAnswer();
      }
    });
    paintAnswer();
  }

  /* ================================================================
     GUEST: Finish briefing → showGuestDone
     ================================================================ */
  function finishBriefing() {
    var p = lsG(K.G_PROG,{done:false,steps:[]});
    if(!p||!Array.isArray(p.steps)) p={done:false,steps:[]};
    p.done=true; p.completedAt=fmtDt(new Date());
    lsS(K.G_PROG,p);
    showGuestDone();
  }

  /* ================================================================
     GUEST: DONE SCREEN
     ================================================================ */
  /* ---- QR pseudo-placeholder: simple grid SVG ---- */
  function genQrSvg(text) {
    // Deterministic pseudo-QR from text hash — visual placeholder
    // Replace with real QR lib (qrcode.js) when available
    var hash = 0;
    for (var i = 0; i < text.length; i++) { hash = ((hash << 5) - hash) + text.charCodeAt(i); hash |= 0; }
    var cells = 13; var size = 78; var cell = size / cells;
    var rects = '';
    // Quiet zone + finder patterns hardcoded, data modules from hash
    for (var r = 0; r < cells; r++) {
      for (var c = 0; c < cells; c++) {
        var isFinder = (r < 3 && c < 3) || (r < 3 && c >= cells-3) || (r >= cells-3 && c < 3);
        var bit = isFinder ? 1 : (((hash >> ((r * cells + c) % 31)) & 1) ^ ((r + c) & 1) & 1);
        if (bit) rects += '<rect x="' + (c * cell).toFixed(1) + '" y="' + (r * cell).toFixed(1) + '" width="' + (cell - 0.5).toFixed(1) + '" height="' + (cell - 0.5).toFixed(1) + '" fill="#111"/>';
      }
    }
    // Finder pattern borders
    var fp = '<rect x="0" y="0" width="' + (3*cell) + '" height="' + (3*cell) + '" fill="none" stroke="#111" stroke-width="1.5"/>' +
             '<rect x="' + ((cells-3)*cell) + '" y="0" width="' + (3*cell) + '" height="' + (3*cell) + '" fill="none" stroke="#111" stroke-width="1.5"/>' +
             '<rect x="0" y="' + ((cells-3)*cell) + '" width="' + (3*cell) + '" height="' + (3*cell) + '" fill="none" stroke="#111" stroke-width="1.5"/>';
    return '<svg viewBox="0 0 '+size+' '+size+'" xmlns="http://www.w3.org/2000/svg" style="display:block">'+rects+fp+'</svg>';
  }

  function showGuestDone() {
    stopVideoTimer();
    S.screen='guest-done'; updateTopBar();
    var intro = getIntro();
    var prof  = lsG(K.G_PROF, {});
    if(!prof||typeof prof!=='object') prof={};
    var prog  = lsG(K.G_PROG, {});
    var dt    = (prog && prog.completedAt) || prof.dt || fmtDt(new Date());
    var sessionId = (prof.sessionId) || genId();
    var syncStatus = SyncStatus.chip();
    var sectionsTotal = intro.length;
    var sectionsDone  = prog && prog.steps ? prog.steps.length : sectionsTotal;

    setBreadcrumb([{label:tr('Начало'),onClick:showLanding},{label:tr('Инструктаж пройден')}]);

    var phoneRow = prof.phone
      ? tr('<div class="receipt-row"><span class="receipt-key">Телефон</span><span class="receipt-val">')+esc(prof.phone)+'</span></div>'
      : '';

    appEl().innerHTML =
      '<div class="page">'
      // ── Hero
      +'<div class="done-hero">'
      +'<div class="done-hero-ring"><svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg></div>'
      +tr('<div class="done-hero-title">Инструктаж пройден</div>')
      +tr('<div class="done-hero-sub">Все разделы вводного инструктажа изучены</div>')
      +'<div class="done-id-block">'
      +tr('<div><div class="done-id-label">ID прохождения</div><div class="done-id-value">')+esc(sessionId)+'</div></div>'
      +tr('<span class="done-synced-badge"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>Зафиксировано</span>')
      +'</div></div>'
      // ── Verification block
      +'<div class="verif-block">'
      +'<div class="verif-block-head">'
      +tr('<span class="verif-block-title">Подтверждение прохождения</span>')
      +syncStatus
      +'</div>'
      +'<div class="verif-block-body">'
      +tr('<div class="verif-qr" title="QR-код для верификации">')+genQrSvg(sessionId)+'</div>'
      +'<div class="verif-info">'
      +'<div class="verif-id-row">'
      +'<span class="verif-id-val">'+esc(sessionId)+'</span>'
      +tr('<button class="btn-copy" id="btnCopyId" type="button" title="Скопировать ID"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>Скопировать</button>')
      +'</div>'
      +tr('<div class="verif-sections-count"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>Пройдено: ')+sectionsDone+'/'+sectionsTotal+tr(' разделов</div>')
      +tr('<div class="verif-note">Предъявите этот ID ответственному лицу для оформления пропуска. QR-код содержит идентификатор прохождения.</div>')
      +'</div></div></div>'
      // ── Receipt
      +'<div class="receipt-card">'
      +tr('<div class="receipt-row"><span class="receipt-key">ФИО</span><span class="receipt-val">')+esc(prof.name||'—')+'</span></div>'
      +tr('<div class="receipt-row"><span class="receipt-key">Организация</span><span class="receipt-val">')+esc(prof.org||'—')+'</span></div>'
      +phoneRow
      +tr('<div class="receipt-row"><span class="receipt-key">Цель визита</span><span class="receipt-val">')+esc(tr(prof.purpose||'—'))+'</span></div>'
      +tr('<div class="receipt-row"><span class="receipt-key">Дата и время</span><span class="receipt-val">')+esc(dt)+'</span></div>'
      +tr('<div class="receipt-row receipt-row-status"><span class="receipt-key">Статус</span><span class="receipt-val receipt-status-val"><svg class="receipt-status-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>Инструктаж пройден полностью</span></div>')
      +'</div>'
      // ── Print / Share CTA
      +'<div class="done-print-cta">'
      +'<div class="done-print-cta-icon">📤</div>'
      +tr('<div class="done-print-cta-text"><strong>Распечатайте или отправьте подтверждение</strong> — оно потребуется для оформления пропуска на объект</div>')
      +'</div>'
      +'<div class="page-bottom-spacer"></div></div>'
      // ── Actions
      +'<div class="sticky-bottom no-print"><div class="sticky-bottom-inner">'
      +tr('<button class="btn btn-secondary" id="btnHomeG" type="button">На главную</button>')
      +'<button class="btn btn-secondary" id="btnShare" type="button">'
      +'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink:0"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>'
      +tr(' Поделиться')
      +'</button>'
      +'<button class="btn btn-primary btn-grow" id="btnPrint" type="button">'
      +'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink:0"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>'
      +tr(' Распечатать')
      +'</button>'
      +'</div></div>';

    $('#btnPrint').addEventListener('click', function(){ printGuestCert(prof, intro, sessionId, dt); });
    $('#btnShare').addEventListener('click', function(){ shareGuestCert(prof, intro, sessionId, dt); });
    $('#btnHomeG').addEventListener('click', showLanding);

    var copyBtn = $('#btnCopyId');
    if (copyBtn) {
      copyBtn.addEventListener('click', function() {
        var btn = this;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(sessionId).then(function() {
            btn.classList.add('copied');
            btn.innerHTML = tr('<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>Скопировано');
            setTimeout(function(){ btn.classList.remove('copied'); btn.innerHTML = tr('<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>Скопировать'); }, 2200);
          });
        } else {
          // Fallback для старых браузеров
          try {
            var ta = document.createElement('textarea');
            ta.value = sessionId; ta.style.position='fixed'; ta.style.opacity='0';
            document.body.appendChild(ta); ta.select(); document.execCommand('copy');
            document.body.removeChild(ta);
            btn.classList.add('copied');
            btn.innerHTML = tr('<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>Скопировано');
            setTimeout(function(){ btn.classList.remove('copied'); btn.innerHTML = tr('<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>Скопировать'); }, 2200);
          } catch(e) { alert(sessionId); }
        }
      });
    }
    scrollTop();
  }

  /* ================================================================
     PRINT: Guest Certificate
     ================================================================ */
  /* ---- Build print HTML content ---- */
  function buildPrintHtml(prof, intro, sessionId, dt) {
    var sections = intro.map(function(s, i){
      return '<tr><td style="text-align:center;color:#157A3E;font-weight:bold;width:28px;padding:5px 8px">✓</td><td style="padding:5px 8px;border:1px solid #eee;font-size:10pt">'+(i+1)+'. '+esc(s.title)+'</td></tr>';
    }).join('');
    var phoneRow = prof.phone
      ? tr('<tr><td>Телефон</td><td>')+esc(prof.phone)+'</td></tr>'
      : '';
    return '<!DOCTYPE html><html lang="'+window.GuestI18n.language()+'"><head>'
      +tr('<meta charset="UTF-8"><title>Подтверждение инструктажа — ИЦ ТМК</title>')
      +'<style>'
      +'@page{size:A4;margin:20mm 18mm 20mm 18mm}'
      +'*{box-sizing:border-box;margin:0;padding:0}'
      +'body{font-family:Arial,Helvetica,sans-serif;font-size:11pt;color:#111;line-height:1.6;-webkit-print-color-adjust:exact;print-color-adjust:exact}'
      +'.wrap{max-width:680px;margin:0 auto;padding:24px}'
      +'.hdr{display:flex;align-items:flex-start;justify-content:space-between;border-bottom:2.5px solid #111;padding-bottom:14px;margin-bottom:18px;gap:16px}'
      +'.org{font-size:15pt;font-weight:bold;margin:0 0 3px}'
      +'.doc-type{font-size:10pt;color:#555}'
      +'.status-badge{background:#e8f7ee;border:1px solid #157A3E;border-radius:5px;padding:5px 12px;font-size:9pt;color:#157A3E;font-weight:bold;white-space:nowrap;flex-shrink:0;align-self:flex-start}'
      +'.id-block{background:#f5f5f5;border:1.5px solid #ccc;border-radius:6px;padding:10px 16px;margin:14px 0;display:flex;align-items:flex-start;gap:20px}'
      +'.id-label{font-size:8pt;font-weight:bold;color:#888;text-transform:uppercase;letter-spacing:.05em;margin-bottom:3px}'
      +'.id-val{font-size:14pt;font-weight:bold;letter-spacing:.06em;color:#111}'
      +'.id-note{font-size:9pt;color:#888;flex:1;padding-top:6px}'
      +'.t{width:100%;border-collapse:collapse;margin:16px 0}'
      +'.t td{padding:7px 10px;border:1px solid #ddd;font-size:10.5pt}'
      +'.t td:first-child{background:#f9f9f9;font-weight:600;width:185px;color:#555;font-size:10pt}'
      +'.t .status-cell{color:#157A3E;font-weight:bold}'
      +'.sec-title{font-weight:bold;margin:16px 0 6px;font-size:11pt}'
      +'.sec-t{width:100%;border-collapse:collapse}'
      +'.sec-t tr:nth-child(even) td{background:#fafafa}'
      +'.sign-area{display:flex;gap:40px;margin-top:36px;page-break-inside:avoid}'
      +'.sign-box{flex:1;border-top:1.5px solid #111;padding-top:6px;font-size:9.5pt;color:#555;line-height:2.2}'
      +'.footer{margin-top:24px;font-size:8pt;color:#aaa;text-align:center;border-top:1px solid #eee;padding-top:10px}'
      +'@media print{body{padding:0}}.no-print{display:none}'
      +'</style></head><body><div class="wrap">'
      +'<div class="hdr">'
      +tr('<div><div class="org">ООО «ИЦ ТМК»</div><div class="doc-type">Подтверждение прохождения вводного инструктажа по охране труда</div></div>')
      +tr('<div class="status-badge">✓ Инструктаж пройден</div>')
      +'</div>'
      +'<div class="id-block">'
      +tr('<div><div class="id-label">ID прохождения</div><div class="id-val">')+esc(sessionId)+'</div></div>'
      +tr('<div class="id-note">Пройдено ')+intro.length+tr(' из ')+intro.length+tr(' разделов · Предъявите ID ответственному лицу</div>')
      +'</div>'
      +'<table class="t">'
      +tr('<tr><td>ФИО</td><td><strong>')+esc(prof.name||'—')+'</strong></td></tr>'
      +tr('<tr><td>Организация</td><td>')+esc(prof.org||'—')+'</td></tr>'
      +phoneRow
      +tr('<tr><td>Цель визита</td><td>')+esc(tr(prof.purpose||'—'))+'</td></tr>'
      +tr('<tr><td>Дата и время</td><td>')+esc(dt)+'</td></tr>'
      +tr('<tr><td>Инструктаж</td><td><strong>Вводный инструктаж по охране труда</strong></td></tr>')
      +tr('<tr><td class="status-cell">Статус</td><td class="status-cell">✓ Пройден в полном объёме (')+intro.length+tr(' разделов)</td></tr>')
      +'</table>'
      +tr('<div class="sec-title">Пройденные разделы инструктажа:</div>')
      +'<table class="sec-t"><tbody>'+sections+'</tbody></table>'
      +'<div class="sign-area">'
      +tr('<div class="sign-box">Подпись инструктируемого<br><br>___________________________</div>')
      +tr('<div class="sign-box">Подпись ответственного лица<br><br>___________________________</div>')
      +'</div>'
      +tr('<div class="footer">Документ сформирован автоматически · ООО «ИЦ ТМК» / АО «РусНИТИ» · Система обучения по охране труда</div>')
      +'</div></body></html>';
  }

  function printGuestCert(prof, intro, sessionId, dt) {
    var html = buildPrintHtml(prof, intro, sessionId, dt);

    // Primary: popup window print
    var w = null;
    try { w = window.open('', '_blank', 'width=860,height=760'); } catch(e) {}

    if (w && !w.closed) {
      w.document.write(html);
      w.document.close();
      w.focus();
      setTimeout(function(){ w.print(); }, 600);
      return;
    }

    // Fallback: hidden iframe print (if popup blocked)
    try {
      var iframe = document.createElement('iframe');
      iframe.style.cssText = 'position:fixed;top:-9999px;left:-9999px;width:800px;height:600px;border:none';
      document.body.appendChild(iframe);
      iframe.contentDocument.write(html);
      iframe.contentDocument.close();
      iframe.contentWindow.focus();
      setTimeout(function(){
        try { iframe.contentWindow.print(); } catch(e2) {}
        setTimeout(function(){ document.body.removeChild(iframe); }, 2000);
      }, 800);
    } catch(e) {
      // Last resort: open data URI
      var blob = new Blob([html], {type:'text/html'});
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url; a.target = '_blank'; a.click();
      setTimeout(function(){ URL.revokeObjectURL(url); }, 5000);
    }
  }

  /* ================================================================
     SHARE: Поделиться подтверждением (Web Share API → mailto fallback)
     ================================================================ */
  function shareGuestCert(prof, intro, sessionId, dt) {
    var name    = prof.name    || '—';
    var org     = prof.org     || '—';
    var purpose = tr(prof.purpose || '—');
    var total   = intro.length;

    var lines = [
      tr('✅ Вводный инструктаж по охране труда пройден'),
      '',
      tr('ФИО: ')              + name,
      tr('Организация: ')      + org,
      tr('Цель визита: ')      + purpose,
      tr('Дата и время: ')     + dt,
      tr('Разделов пройдено: ')+ total + tr(' из ') + total,
      tr('ID прохождения: ')   + sessionId,
      '',
      tr('ООО «ИЦ ТМК» / АО «РусНИТИ»'),
      tr('Система контроля соблюдения ТБ')
    ];
    var text    = lines.join('\n');
    var title   = tr('Подтверждение инструктажа — ') + name;
    var subject = tr('Подтверждение прохождения вводного инструктажа — ') + name;

    // ── 1. Нативный Web Share API (мобайл: WhatsApp, Telegram, почта и др.) ──
    if (navigator.share) {
      navigator.share({ title: title, text: text })
        .then(function() { /* shared */ })
        .catch(function(err) {
          // Пользователь закрыл шторку — не считаем ошибкой
          if (err && err.name !== 'AbortError') { _shareViaEmail(subject, text); }
        });
      return;
    }

    // ── 2. Fallback: открыть почтовый клиент ────────────────────────────────
    _shareViaEmail(subject, text);
  }

  function _shareViaEmail(subject, text) {
    var mailtoUrl = 'mailto:?subject=' + encodeURIComponent(subject)
                  + '&body='    + encodeURIComponent(text);
    // Пробуем открыть почтовый клиент
    var a = document.createElement('a');
    a.href   = mailtoUrl;
    a.target = '_blank';
    a.rel    = 'noopener';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  /* ================================================================
     SETTINGS MENU
     ================================================================ */
  function initSettings() {
    var btn=$('#settingsBtn'); var menu=$('#settingsMenu'); var overlay=$('#menuOverlay');
    if(!btn||!menu||!overlay) return;
    function open()  { menu.classList.remove('hidden'); overlay.classList.remove('hidden'); }
    function close() { menu.classList.add('hidden');    overlay.classList.add('hidden');    }
    btn.addEventListener('click', function(e){ e.stopPropagation(); menu.classList.contains('hidden')?open():close(); });
    overlay.addEventListener('click', close);
    var brg=$('#btnResetGuest'), bra=$('#btnResetAll');
    if(brg) brg.addEventListener('click', function(){
      if(!confirm(tr('Начать заново? Весь прогресс будет сброшен.'))) return;
      lsD(K.G_PROG); lsD(K.G_PROF); lsD(K.G_VID); lsD(K.ROLE);
      // Очистить ответы на проверочные вопросы
      window.GUEST_INTRO && window.GUEST_INTRO.forEach(function(s){ try{ localStorage.removeItem('tmk_mc_'+s.id); }catch(e){} });
      stopVideoTimer(); videoElapsed = 0; videoPlaying = false; S.quizDrafts = {}; S.landingDraft = null;
      close(); showLanding();
    });
    if(bra) bra.addEventListener('click', function(){
      if(!confirm(tr('Сбросить ВСЕ данные приложения?'))) return;
      Object.keys(K).forEach(function(k){lsD(K[k]);});
      window.GUEST_INTRO && window.GUEST_INTRO.forEach(function(s){ try{ localStorage.removeItem('tmk_mc_'+s.id); }catch(e){} });
      stopVideoTimer(); videoElapsed = 0; videoPlaying = false; S.quizDrafts = {}; S.landingDraft = null;
      close(); showLanding();
    });
  }

  /* ================================================================
     INIT
     ================================================================ */
  function initLanguage() {
    function switchLanguage(language) {
      if (window.GuestI18n.language() === language) return;
      var scrollY = window.scrollY;
      if (S.screen === 'landing') {
        var prof = Object.assign({}, lsG(K.G_PROF, {}) || {});
        ['name','org','purpose','phone'].forEach(function(key) { var el = $('#g' + key); if (el) prof[key] = el.value; });
        S.landingDraft = prof;
      }
      window.GuestI18n.setLanguage(language);
      S.switching = true;
      try {
        if (S.screen === 'guest-intro') showGuestIntro(S.guestStep);
        else if (S.screen === 'guest-done') showGuestDone();
        else if (S.screen === 'video') showVideo();
        else showLanding();
      } finally { S.switching = false; }
      window.scrollTo({top:scrollY, behavior:'instant'});
    }
    $('#languageRu').addEventListener('click', function() { switchLanguage('ru'); });
    $('#languageEn').addEventListener('click', function() { switchLanguage('en'); });
    window.GuestI18n.applyStatic();
  }

  function init() {
    initLanguage(); initSettings(); updateTopBar(); setInterval(updateTopBar, 60000);
    var prog    = lsG(K.G_PROG, {done:false, steps:[]});
    var prof    = lsG(K.G_PROF, {});
    var videoOk = lsG(K.G_VID, false);
    var role    = lsG(K.ROLE);
    if (role === 'guest' && prof && prof.name) {
      if (prog && prog.done) {
        showGuestDone();
      } else if (videoOk) {
        var resume = getIntro().findIndex(function(step) { return !canProceed(step, prog && Array.isArray(prog.steps) ? prog : {steps:[]}); });
        showGuestIntro(resume < 0 ? getIntro().length - 1 : resume);
      } else {
        showVideo();
      }
    } else {
      showLanding();
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();
