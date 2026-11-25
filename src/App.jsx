import React, { useState, useEffect, useRef } from "react";
import {
  ShieldCheck, Phone, Menu, X, Video, Siren, Radio, Users, ShieldAlert, Landmark,
  Cpu, Antenna, MonitorSmartphone, Clock, MapPin, Mail, MessageCircle, AtSign,
  CheckCircle2, ChevronDown, ArrowRight, Image as ImageIcon, Flame, Home, Building2,
  Store, BadgePercent, Gift, Send, Zap, Eye, Layers, Cable, Wifi,
} from "lucide-react";
/* Фото лежат в assets/ в двух размерах: -800 для телефонов и -1600 для больших экранов */
const SIZES = { "4x3": [800, 597], "16x9": [960, 536], "3x4": [600, 804] };
function Photo({ name, ratio = "4x3", wide = 1600, alt, className = "", sizes, eager = false }) {
  const [small] = SIZES[ratio];
  const [, h] = SIZES[ratio];
  return (
    <img
      src={`assets/${name}-${small}.webp`}
      srcSet={`assets/${name}-${small}.webp ${small}w, assets/${name}-${wide}.webp ${wide}w`}
      sizes={sizes || "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
      alt={alt}
      width={small}
      height={h}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className={className}
    />
  );
}

/* ───────── Данные компании (источник: старый сайт bastionk.kg) ───────── */
const COMPANY = {
  name: "Бастион К",
  since: 2010,
  phones: [
    { display: "+996 555 78-04-46", tel: "+996555780446" },
    { display: "+996 705 15-15-81", tel: "+996705151581" },
  ],
  whatsapp: { display: "+996 555 32-16-63", wa: "996555321663" },
  email: "m.ohrana.kg@gmail.com",
  instagram: "@bastion_kb",
  address: "г. Кара-Балта, ул. Ленина 22/3",
};

const NAV = [
  { href: "#services", label: "Услуги" },
  { href: "#equipment", label: "Оборудование" },
  { href: "#advantages", label: "Преимущества" },
  { href: "#faq", label: "Вопросы" },
  { href: "#contacts", label: "Контакты" },
];

const SERVICES = [
  {
    icon: Radio,
    title: "Пультовая охрана",
    photo: "monitoring",
    photoAlt: "Оператор станции мониторинга за несколькими экранами с картой и камерами",
    h3: "Пультовая охрана квартир, домов и офисов",
    text: "Круглосуточный приём сигналов с вашего объекта на собственной станции мониторинга. Тревога видна дежурному сразу, группа реагирования выезжает на адрес.",
    featured: true,
  },
  {
    icon: Siren,
    title: "Охранная и пожарная сигнализация",
    photo: "alarm",
    photoAlt: "Датчик движения «Гранат» на стене в вечерней квартире",
    h3: "Установка и обслуживание сигнализации",
    text: "Оповещение о незаконном проникновении и возгорании. Проектируем, монтируем и обслуживаем системы под ваш объект.",
  },
  {
    icon: Video,
    title: "Видеонаблюдение",
    photo: "cctv",
    photoAlt: "Уличная камера видеонаблюдения на стене здания над вечерним городом",
    h3: "Системы видеонаблюдения для дома и бизнеса",
    text: "Видеонаблюдение как часть общей системы безопасности: камеры, запись, обзор объекта в нужный момент.",
  },
  {
    icon: ShieldAlert,
    title: "Группа быстрого реагирования",
    photo: "gbr",
    photoAlt: "Автомобиль группы быстрого реагирования «Бастион К» на вечерней улице Бишкека",
    h3: "Оперативная группа с выездом на объект",
    text: "Выезд на адрес при срабатывании тревоги. Сотрудники работают в связке с пультом и знают объекты клиентов.",
  },
  {
    icon: Users,
    title: "Физическая охрана",
    photo: "guards-4x3",
    photoAlt: "Трое сотрудников охраны в форме у входа в бизнес-центр",
    h3: "Физическая охрана объектов на посту",
    text: "Контроль объекта сотрудниками на специально оборудованном посту. Для предприятий, складов, магазинов и площадок.",
  },
  {
    icon: Landmark,
    title: "Инкассация",
    photo: "cash",
    photoAlt: "Сотрудники инкассации у бронированного автомобиля возле банка",
    h3: "Инкассация денежных средств",
    text: "Сбор и перевозка наличных между организациями и подразделениями. Сохранность при сдаче в кассу и зачислении на счёт.",
  },
];

/* Технические описания ниже обобщённые. Уточните у производителя перед публикацией. */
const EQUIPMENT = [
  {
    key: "granat",
    icon: Wifi,
    name: "Гранат",
    badge: "Беспроводная",
    kind: "Радиосистема охраны без проводов",
    text: "Датчики и контроллер связываются по радиоканалу. Монтаж без штроб и протяжки кабеля, поэтому подходит для квартиры с готовым ремонтом, офиса и торговой точки.",
    points: [
      "Установка за один визит без ремонта стен",
      "Контроль связи с датчиками и их состояния",
      "Наращивание системы без переделки проводки",
    ],
    photo: "granat",
    alt: "Стартовый комплект «Гранат»: контроллер, брелок, датчик движения и датчики открытия",
  },
  {
    key: "lun",
    icon: Cable,
    name: "Лунь",
    badge: "Проводная",
    kind: "Проводная система охраны",
    text: "Датчики соединены с прибором проводами. Сигнал идёт по кабелю, а не по воздуху, поэтому система надёжнее всего там, где нужна максимальная стабильность: в новостройке, при ремонте, на большом объекте.",
    points: [
      "Защита от радиопомех и глушения сигнала",
      "Датчики питаются от прибора, батарейки менять не нужно",
      "Проводка скрыта в стенах и работает годами",
    ],
    photo: "lun",
    alt: "Оборудование «Лунь»: прибор, клавиатура, сенсорный экран и ключи на тёмной тумбе",
  },
];

const CHOOSE_POINTS = [
  "Бесплатный расчёт под ваш объект",
  "Подберём систему под ремонт и бюджет",
  "Стоимость назовём до подписания договора",
];

const CHAIN = [
  { icon: Eye, anim: "glance", title: "Датчик", text: "Фиксирует проникновение, дым или тревожную кнопку" },
  { icon: Cpu, anim: "redraw", title: "«Гранат» или «Лунь»", text: "Принимает сигнал датчика и передаёт тревогу на пульт" },
  { icon: Radio, anim: "redraw", title: "Пульт охраны «Бастион К»", text: "Дежурный оператор круглосуточно получает событие и адрес объекта" },
  { icon: ShieldAlert, anim: "redraw", title: "Группа реагирования", text: "Выезжает на объект и сообщает результат" },
];

const ADVANTAGES = [
  { icon: Clock, anim: "clock", title: "Быстрое реагирование", text: "Пульт принимает тревогу круглосуточно, группа выезжает на объект сразу после сигнала." },
  { icon: Layers, anim: "layers", title: "Система под ваш объект", text: "«Гранат» без проводов для готового ремонта, «Лунь» по кабелю для максимальной надёжности. Подберём то, что подходит именно вам." },
  { icon: Cable, anim: "redraw", title: "Надёжная связь с датчиками", text: "Проводная «Лунь» не боится радиопомех, а «Гранат» постоянно контролирует связь с датчиками и их состояние." },
  { icon: ShieldCheck, anim: "check", title: "Собственная станция мониторинга", text: "Сигналы с охраняемых объектов принимаем сами, без посредников и передачи заказа третьим лицам." },
  { icon: Home, anim: "door", title: "Полный комплекс услуг", text: "Сигнализация, видеонаблюдение, пульт, физическая охрана и инкассация у одного подрядчика." },
  { icon: Users, anim: "redraw", title: "Работаем с 2010 года", text: "Более 100 сотрудников и более 150 клиентов, в том числе банки и крупные компании региона." },
];

const FAQ = [
  { q: "Сколько стоит пультовая охрана в Бишкеке?", a: "Цена зависит от типа объекта, количества датчиков и адреса. Оставьте заявку, мы рассчитаем стоимость бесплатно и назовём её до подписания договора." },
  { q: "Вы охраняете только Бишкек и Кара-Балту?", a: "Основные регионы работы: Бишкек и Кара-Балта. Если объект находится рядом с ними, уточните адрес у менеджера, и мы скажем, возможна ли охрана." },
  { q: "Нужен ли ремонт для установки сигнализации?", a: "Зависит от системы. Беспроводной «Гранат» ставится без ремонта: датчики крепятся на месте, кабель не нужен. Проводной «Лунь» требует прокладки проводов, поэтому его удобнее монтировать при ремонте или строительстве. Точный план назовёт специалист после осмотра." },
  { q: "Что выбрать: «Гранат» или «Лунь»?", a: "«Гранат» подойдёт, если ремонт уже сделан и ломать стены не хочется. «Лунь» лучше для новостроек, ремонта и больших объектов, где важна максимальная стабильность и защита от радиопомех. Мы осмотрим объект и посоветуем." },
  { q: "Что происходит, когда срабатывает сигнализация?", a: "Сигнал приходит на пульт, дежурный оператор видит объект и событие, затем направляет на адрес группу реагирования." },
];

const OBJECT_TYPES = [
  { id: "home", label: "Квартира или дом", icon: Home },
  { id: "office", label: "Офис", icon: Building2 },
  { id: "shop", label: "Магазин или склад", icon: Store },
  { id: "fire", label: "Пожарная сигнализация", icon: Flame },
];

/* ───────── Мелкие компоненты ───────── */
/* ───────── Логотип: векторный файл bastion-k.svg, контуры чёрные, фон прозрачный ───────── */
function LogoMark({ className = "" }) {
  /* Логотип в фирменных цветах: серебряная рамка и зелёное поле #0b4d3f */
  return (
    <svg viewBox="455 145 790 1125" className={className} role="img" aria-label="Бастион К">
      <defs>
        <linearGradient id="bk-silver" gradientUnits="userSpaceOnUse" x1="470" y1="0" x2="1230" y2="0">
          <stop offset="0" stopColor="#f4f4f3" /><stop offset="0.499" stopColor="#dedede" />
          <stop offset="0.5" stopColor="#c9cac9" /><stop offset="1" stopColor="#a8a9a8" />
        </linearGradient>
      </defs>
      <g fill="url(#bk-silver)">
        <path d="M471.7,257.5 L633.3,203.3 L642.5,203.3 L642.5,238.3 L755,198.3 L768.3,160 L931.7,160 L945,198.3 L1057.5,238.3 L1057.5,203.3 L1066.7,203.3 L1228.3,257.5 L1228.3,574.2 L471.7,574.2 Z" />
      </g>
      <path fill="#0b4d3f" d="M508.3,286.7 L592.5,268.3 L592.5,303.7 L798.3,254.3 L798.3,193.3 L901.7,193.3 L901.7,254.3 L1107.5,303.7 L1107.5,268.3 L1191.7,286.7 L1191.7,536.7 L508.3,536.7 Z" />
      <g fill="url(#bk-silver)">
        <path d="M823.3,246.7 L823.3,235 Q823.3,210 850,210 Q876.7,210 876.7,235 L876.7,246.7 Z" /><path d="M523.3,300 L546.7,300 L546.7,321.7 L523.3,321.7 Z" /><path d="M1153.3,300 L1176.7,300 L1176.7,321.7 L1153.3,321.7 Z" />
      </g>
      <g fill="url(#bk-silver)">
        <path d="M531.7,338.3 L551.7,333.5 L551.7,500 L531.7,500 Z" />
        <path d="M531.7,338.3 L596.7,322.7 L596.7,342.7 L531.7,358.3 Z" />
        <path d="M531.7,390 L596.7,390 L596.7,410 L531.7,410 Z" />
        <path d="M531.7,480 L596.7,480 L596.7,500 L531.7,500 Z" />
        <path d="M576.7,390 L596.7,390 L596.7,500 L576.7,500 Z" />
        <path d="M610,319.5 L630,314.7 L630,500 L610,500 Z" />
        <path d="M655,308.7 L675,303.9 L675,500 L655,500 Z" />
        <path d="M610,319.5 L675,303.9 L675,323.9 L610,339.5 Z" />
        <path d="M610,411.7 L675,411.7 L675,431.7 L610,431.7 Z" />
        <path d="M688.3,300.7 L708.3,295.9 L708.3,500 L688.3,500 Z" />
        <path d="M688.3,300.7 L753.3,285.1 L753.3,305.1 L688.3,320.7 Z" />
        <path d="M688.3,480 L753.3,480 L753.3,500 L688.3,500 Z" />
        <path d="M733.3,285.1 L753.3,285.1 L753.3,328.5 L733.3,328.5 Z" />
        <path d="M733.3,456.7 L753.3,456.7 L753.3,500 L733.3,500 Z" />
        <path d="M766.7,281.9 L831.7,273.3 L831.7,293.3 L766.7,301.9 Z" />
        <path d="M789.2,276.5 L809.2,273.3 L809.2,500 L789.2,500 Z" />
        <path d="M845,273.3 L865,273.3 L865,500 L845,500 Z" />
        <path d="M890,273.3 L910,276.3 L910,500 L890,500 Z" />
        <path d="M845,500 L870,500 L910,278 L885,278 Z" />
        <path d="M923.3,279.5 L943.3,284.3 L943.3,500 L923.3,500 Z" />
        <path d="M968.3,290.3 L988.3,295.1 L988.3,500 L968.3,500 Z" />
        <path d="M923.3,279.5 L988.3,295.1 L988.3,315.1 L923.3,299.5 Z" />
        <path d="M923.3,480 L988.3,480 L988.3,500 L923.3,500 Z" />
        <path d="M1001.7,298.3 L1021.7,303.1 L1021.7,500 L1001.7,500 Z" />
        <path d="M1046.7,309.1 L1066.7,313.9 L1066.7,500 L1046.7,500 Z" />
        <path d="M1001.7,401.7 L1066.7,401.7 L1066.7,421.7 L1001.7,421.7 Z" />
        <path d="M1100,321.9 L1120,326.7 L1120,500 L1100,500 Z" />
        <path d="M1118.3,410 L1142.3,405 L1165,337.5 L1141,337.5 Z" />
        <path d="M1118.3,393.3 L1142.3,393.3 L1165,500 L1141,500 Z" />
      </g>
      <path fill="url(#bk-silver)" d="M470,620 H1230 V880 C1225 1030 1030 1165 850 1255 C670 1165 475 1030 470 880 Z" />
      <path fill="#0b4d3f" d="M518,665 H1182 V880 C1182 1015 1015 1130 850 1208 C685 1130 518 1015 518 880 Z" />
      <path fill="url(#bk-silver)" d="M712,732 L748,766 L836,766 L836,744 L860,744 L860,766 L948,766 L984,732 L984,810 L712,810 Z M745,838 L780,856 L762,974 L934,974 L916,856 L951,838 L1004,1022 L692,1022 Z" />
    </svg>
  );
}

function Logo({ className = "" }) {
  return (
    <a href="#top" className={`flex shrink-0 items-center gap-2.5 max-[400px]:gap-2 ${className}`} aria-label="Бастион К, на главную">
      <span className="logo-tile grid h-11 place-items-center rounded-xl px-1.5 max-[400px]:h-10">
        <LogoMark className="h-10 w-auto max-[400px]:h-9" />
      </span>
      <span className="whitespace-nowrap font-display text-[22px] font-semibold uppercase leading-none tracking-wide max-[400px]:text-[20px]">
        Бастион <span className="text-accent">К</span>
        <span className="mt-1 block font-body text-[10px] font-medium normal-case tracking-[0.18em] text-muted max-[400px]:text-[9px] max-[400px]:tracking-[0.1em]">
          ОХРАННОЕ АГЕНТСТВО
        </span>
      </span>
    </a>
  );
}

/* Кнопка Shiny: тонкая рамка и блик, который периодически пробегает по тексту и контуру */
function ShinyButton({ href, onClick, type = "button", size = "md", className = "", children }) {
  const Tag = href ? "a" : "button";
  const props = href ? { href, onClick } : { type, onClick };
  return (
    <Tag {...props} className={`shiny ${className}`} data-size={size}>
      <span className="shiny-text">{children}</span>
      <span className="shiny-edge" aria-hidden="true" />
    </Tag>
  );
}

/* Контейнер, который один раз запускает анимацию значков, когда попадает в экран */
function Reveal({ as: Tag = "div", className, children }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    el.querySelectorAll("svg *").forEach((n) => n.setAttribute("pathLength", "1"));
    if (!("IntersectionObserver" in window)) { setOn(true); return undefined; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <Tag ref={ref} className={className} data-inview={on ? "true" : "false"}>{children}</Tag>;
}

function PhotoPlaceholder({ icon: Icon, label }) {
  return (
    <div
      className="relative grid aspect-[4/3] w-full place-items-center overflow-hidden rounded-2xl border border-dashed border-accent/40 bg-bg/60"
      role="img"
      aria-label={`Место под фото. ${label}`}
    >
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="relative flex flex-col items-center gap-3 px-6 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent/10 text-accent ring-1 ring-accent/30">
          <Icon size={28} strokeWidth={1.8} />
        </span>
        <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.14em] text-accent">
          <ImageIcon size={14} /> Место под фото
        </span>
        <span className="text-sm text-muted">{label}</span>
      </div>
    </div>
  );
}


/* Hero-видео: один ролик из двух клипов, стык с началом уже сделан в самом файле, поэтому он просто крутится по кругу */
function useHeroVideo() {
  const ref = useRef(null);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saver = navigator.connection && navigator.connection.saveData;
    if (reduce || saver) { setStill(true); return; }
    v.src = "assets/hero.mp4";
    v.load();
    const p = v.play();
    if (p && p.catch) p.catch(() => setStill(true));
  }, []);

  return { ref, still };
}

function HeroMedia({ vid }) {
  const { ref, still } = vid;
  return (
    <div className="absolute inset-x-0 top-0 h-[340px] sm:h-[460px] lg:inset-0 lg:h-full" aria-hidden="true">
      {still ? (
        <Photo name="hero-end" ratio="16x9" wide={1280} eager sizes="100vw" className="h-full w-full object-cover object-[72%_50%] lg:object-[50%_82%]" />
      ) : (
        <>
          <img src="assets/hero-start-960.webp" srcSet="assets/hero-start-960.webp 960w, assets/hero-start-1280.webp 1280w" sizes="100vw" alt="" className="absolute inset-0 h-full w-full object-cover object-[72%_50%] lg:object-[50%_82%]" />
          <video
            ref={ref}
            className={`absolute inset-0 h-full w-full object-cover object-[72%_50%] lg:object-[50%_82%]`}
            muted loop playsInline preload="auto"
          />
        </>
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-bg/30 via-transparent to-bg lg:bg-gradient-to-r lg:from-bg lg:via-bg/70 lg:to-transparent lg:to-[68%]" />
      <div className="absolute inset-x-0 bottom-0 hidden h-10 bg-gradient-to-t from-bg/80 to-transparent lg:block" />
    </div>
  );
}

function LeadForm({ variant = "hero", idPrefix }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("Бишкек");
  const [type, setType] = useState("home");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const typeLabel = OBJECT_TYPES.find((t) => t.id === type)?.label;
  const waText = encodeURIComponent(
    `Здравствуйте! Хочу рассчитать охрану. Город: ${city}. Объект: ${typeLabel}. Имя: ${name || "—"}. Телефон: ${phone || "—"}.`
  );

  const submit = (e) => {
    e.preventDefault();
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 9) {
      setError("Введите номер телефона полностью, например 0555 78 04 46");
      return;
    }
    setError("");
    // TODO: отправить заявку на бэкенд / в Telegram-бот / CRM.
    // Сейчас форма только показывает состояние «заявка принята».
    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex min-h-[340px] flex-col items-start justify-center gap-4" role="status">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-ok/15 text-ok">
          <CheckCircle2 size={28} />
        </span>
        <p className="font-display text-2xl font-semibold uppercase tracking-wide">Заявка принята</p>
        <p className="text-muted">
          Менеджер свяжется с вами по номеру <span className="text-fg">{phone}</span> и рассчитает охрану для объекта.
        </p>
        <a
          href={`https://wa.me/${COMPANY.whatsapp.wa}?text=${waText}`}
          target="_blank"
          rel="noreferrer"
          className="btn-ghost"
        >
          <MessageCircle size={18} /> Продублировать в WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-4">
      <fieldset>
        <legend className="label">Что охраняем</legend>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {OBJECT_TYPES.map(({ id, label, icon: Icon }) => (
            <label
              key={id}
              htmlFor={`${idPrefix}-type-${id}`}
              className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2.5 text-sm transition focus-within:ring-2 focus-within:ring-accent ${
                type === id
                  ? "border-accent bg-accent/10 text-fg"
                  : "border-line bg-surface2/60 text-muted hover:border-accent/50"
              }`}
            >
              <input
                id={`${idPrefix}-type-${id}`}
                type="radio"
                name={`${idPrefix}-type`}
                value={id}
                checked={type === id}
                onChange={() => setType(id)}
                className="sr-only"
              />
              <Icon size={16} className={type === id ? "text-accent" : ""} />
              <span className="leading-tight">{label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="label">Город</legend>
        <div className="mt-2 grid grid-cols-2 gap-1 rounded-xl border border-line bg-surface2/60 p-1">
          {["Бишкек", "Кара-Балта"].map((c) => (
            <label
              key={c}
              htmlFor={`${idPrefix}-city-${c}`}
              className={`cursor-pointer rounded-lg py-2 text-center text-sm font-medium transition focus-within:ring-2 focus-within:ring-accent ${
                city === c ? "bg-accent text-accentink" : "text-muted hover:text-fg"
              }`}
            >
              <input
                id={`${idPrefix}-city-${c}`}
                type="radio"
                name={`${idPrefix}-city`}
                value={c}
                checked={city === c}
                onChange={() => setCity(c)}
                className="sr-only"
              />
              {c}
            </label>
          ))}
        </div>
      </fieldset>

      <div className={variant === "wide" ? "grid gap-4 sm:grid-cols-2" : "flex flex-col gap-4"}>
        <div>
          <label htmlFor={`${idPrefix}-name`} className="label">Ваше имя</label>
          <input
            id={`${idPrefix}-name`}
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Как к вам обращаться"
            className="input mt-2"
          />
        </div>
        <div>
          <label htmlFor={`${idPrefix}-phone`} className="label">Телефон</label>
          <input
            id={`${idPrefix}-phone`}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+996 ___ __ __ __"
            aria-invalid={!!error}
            aria-describedby={error ? `${idPrefix}-err` : undefined}
            className="input mt-2"
          />
        </div>
      </div>

      {error && (
        <p id={`${idPrefix}-err`} className="text-sm text-alert" role="alert">{error}</p>
      )}

      {variant === "hero" ? (
        <button type="submit" className="btn-primary w-full">
          Рассчитать стоимость <ArrowRight size={18} />
        </button>
      ) : (
        <ShinyButton type="submit" className="w-full">
          Оставить заявку <ArrowRight size={16} />
        </ShinyButton>
      )}
      <p className="text-xs leading-relaxed text-muted">
        Расчёт бесплатный и ни к чему не обязывает. Нажимая кнопку, вы соглашаетесь на обработку контактных данных для связи по заявке.
      </p>
    </form>
  );
}

function FaqItem({ q, a }) {
  return (
    <details className="group rounded-2xl border border-paperline bg-paper2 px-5 py-4 open:shadow-card">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink [&::-webkit-details-marker]:hidden">
        <h3 className="text-base font-semibold">{q}</h3>
        <ChevronDown size={20} className="shrink-0 text-papermuted transition group-open:rotate-180" />
      </summary>
      <p className="mt-3 leading-relaxed text-papermuted">{a}</p>
    </details>
  );
}

/* ───────── Страница ───────── */
export default function App() {
  const [open, setOpen] = useState(false);
  const heroVid = useHeroVideo();

  return (
    <div id="top" className="min-h-screen bg-bg font-body text-fg antialiased">
      {/* HEADER */}
      <header className="site-header sticky z-40 border-b border-line bg-bg/90 backdrop-blur">
        <div className="wrap flex h-[68px] items-center justify-between gap-4">
          <Logo />
          <nav aria-label="Основное меню" className="hidden items-center gap-7 lg:flex">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="text-sm font-medium text-muted transition hover:text-accent">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <a href={`tel:${COMPANY.phones[0].tel}`} className="hidden items-center gap-2 text-sm font-semibold hover:text-accent md:flex">
              <Phone size={16} className="text-accent" />
              <span className="tabular-nums">{COMPANY.phones[0].display}</span>
            </a>
            <div className="hidden sm:block">
              <ShinyButton href="#request" size="sm">
                Оставить заявку
              </ShinyButton>
            </div>
            <a
              href={`tel:${COMPANY.phones[0].tel}`}
              className="grid h-11 w-11 place-items-center rounded-xl border border-line text-accent md:hidden"
              aria-label={`Позвонить: ${COMPANY.phones[0].display}`}
            >
              <Phone size={20} />
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="grid h-11 w-11 place-items-center rounded-xl border border-line lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Закрыть меню" : "Открыть меню"}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        {open && (
          <div id="mobile-menu" className="border-t border-line bg-bg lg:hidden">
            <nav aria-label="Мобильное меню" className="wrap flex flex-col py-3">
              {NAV.map((n) => (
                <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="border-b border-line/60 py-3.5 text-base font-medium">
                  {n.label}
                </a>
              ))}
              <a href={`tel:${COMPANY.phones[0].tel}`} className="flex items-center gap-2 py-3.5 font-semibold">
                <Phone size={18} className="text-accent" /> <span className="tabular-nums">{COMPANY.phones[0].display}</span>
              </a>
              <ShinyButton href="#request" onClick={() => setOpen(false)} className="mt-3 mb-1 w-full">Оставить заявку</ShinyButton>
            </nav>
          </div>
        )}
      </header>

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden" aria-labelledby="hero-title">
          <HeroMedia vid={heroVid} />
          <div className="wrap relative pb-12 pt-[300px] sm:pt-[400px] lg:flex lg:min-h-[max(620px,min(52vw,calc(100svh-72px)))] lg:items-center lg:pb-28 lg:pt-16">
            <div className="lg:max-w-[560px]">
              <p className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-bg/40 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-accent backdrop-blur">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                Охранное агентство · с {COMPANY.since} года
              </p>
              <h1 id="hero-title" className="mt-5 text-balance font-display text-[40px] font-bold uppercase leading-[1.04] tracking-wide sm:text-6xl lg:text-[64px]">
                Надёжная охрана в <span className="text-accent">Бишкеке</span> и <span className="text-accent">Кара-Балте</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg/80">
                Пультовая охрана квартир, домов и бизнеса: беспроводная система «Гранат» и проводная «Лунь». Тревогу принимает наш пульт круглосуточно, на адрес выезжает группа реагирования.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="#request" className="btn-primary">Рассчитать стоимость <ArrowRight size={18} /></a>
                <a href={`tel:${COMPANY.phones[0].tel}`} className="btn-ghost !py-3.5 !text-base"><Phone size={16} /> {COMPANY.phones[0].display}</a>
              </div>
              <p className="mt-4 flex items-center gap-2 text-sm font-medium text-accent">
                <BadgePercent size={16} /> Скидка 50% на первый месяц охраны
              </p>
            </div>
          </div>
        </section>

        {/* ЦИФРЫ */}
        <section className="border-y border-line bg-surface" aria-label="Агентство в цифрах">
          <dl className="wrap grid grid-cols-2 gap-x-6 gap-y-6 py-8 sm:grid-cols-4">
            {[["2010", "год основания"], ["100+", "сотрудников"], ["150+", "клиентов"], ["24/7", "приём сигналов"]].map(([v, l]) => (
              <div key={l}>
                <dt className="font-display text-4xl font-semibold text-fg tabular-nums">{v}</dt>
                <dd className="mt-1 text-xs uppercase tracking-wider text-muted">{l}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* КЛИЕНТЫ */}
        <section className="border-b border-line bg-surface" aria-label="Нам доверяют">
          <div className="wrap flex flex-col items-start gap-4 py-7 md:flex-row md:items-center md:gap-10">
            <p className="shrink-0 text-xs font-semibold uppercase tracking-[0.16em] text-muted">Нам доверяют</p>
            <ul className="flex flex-wrap gap-x-9 gap-y-3 font-display text-xl font-medium uppercase tracking-wider text-fg/70">
              {["Finca", "Айыл Банк", "Бакай", "Глобус", "Мегаком", "Айболит"].map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* УСЛУГИ */}
        <section id="services" className="scroll-mt-20 bg-paper text-ink" aria-labelledby="services-title">
          <div className="wrap py-16 sm:py-24">
            <p className="eyebrow text-papermuted">Услуги</p>
            <h2 id="services-title" className="mt-3 max-w-3xl text-balance font-display text-4xl font-semibold uppercase leading-[1.08] tracking-wide sm:text-5xl">
              Охранные услуги в Бишкеке и Кара-Балте: от сигнализации до физической охраны
            </h2>
            <p className="mt-5 max-w-2xl text-lg text-papermuted">
              Полный комплекс безопасности для частных лиц, малого, среднего и крупного бизнеса. Отвечаем за результат на каждом этапе.
            </p>

            <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map(({ title, h3, text, featured, photo, photoAlt }) => (
                <article
                  key={title}
                  className={`group relative flex flex-col rounded-3xl p-7 transition hover:-translate-y-1 ${
                    featured
                      ? "bg-ink text-fg shadow-lift lg:row-span-1"
                      : "border border-paperline bg-paper2 shadow-card hover:shadow-lift"
                  }`}
                >
                  <div className="aspect-[16/10] w-full overflow-hidden rounded-2xl bg-ink">
                    <Photo name={photo} alt={photoAlt} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
                  </div>
                  <h3 className="mt-6 font-display text-[26px] font-semibold uppercase leading-tight tracking-wide">{title}</h3>
                  <p className={`mt-1 text-sm font-medium ${featured ? "text-accent" : "text-papermuted"}`}>{h3}</p>
                  <p className={`mt-4 flex-1 leading-relaxed ${featured ? "text-muted" : "text-papermuted"}`}>{text}</p>
                  <a
                    href="#request"
                    className={`mt-6 inline-flex items-center gap-2 text-sm font-semibold ${featured ? "text-accent" : "text-ink"} group-hover:gap-3 transition-all`}
                  >
                    Рассчитать стоимость <ArrowRight size={16} />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ФИЗИЧЕСКАЯ ОХРАНА */}
        <section className="border-b border-line" aria-labelledby="guard-title">
          <div className="wrap py-16 sm:py-24">
            <div className="relative overflow-hidden rounded-3xl border border-line bg-surface shadow-lift">
              <Photo
                name="guards-16x9" ratio="16x9" wide={1920}
                alt="Трое сотрудников охраны в форме у входа в бизнес-центр вечером"
                sizes="(min-width: 1280px) 1200px, 100vw"
                className="aspect-[4/3] w-full object-cover object-[30%_50%] sm:aspect-[16/9] sm:object-center"
              />
              <div className="absolute inset-0 hidden bg-gradient-to-l from-bg/95 via-bg/60 to-transparent sm:block" aria-hidden="true" />
              <div className="p-6 sm:absolute sm:inset-y-0 sm:right-0 sm:flex sm:w-[48%] sm:flex-col sm:justify-center sm:p-10 lg:p-14">
                <p className="eyebrow text-accent">Физическая охрана</p>
                <h2 id="guard-title" className="mt-3 text-balance font-display text-3xl font-semibold uppercase leading-[1.08] tracking-wide sm:text-4xl lg:text-5xl">
                  Физическая охрана в Бишкеке: сотрудники на вашем объекте
                </h2>
                <p className="mt-5 max-w-md text-lg leading-relaxed text-muted sm:text-fg/85">
                  Контроль объекта сотрудниками на специально оборудованном посту. Для предприятий, складов, магазинов и площадок.
                </p>
                <a href="#request" className="btn-primary mt-7 self-start">
                  Рассчитать стоимость <ArrowRight size={18} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ОБОРУДОВАНИЕ */}
        <section id="equipment" className="scroll-mt-20 relative overflow-hidden border-b border-line" aria-labelledby="equipment-title">
          <div className="absolute inset-0 grid-bg opacity-40" aria-hidden="true" />
          <div className="wrap relative py-16 sm:py-24">
            <p className="eyebrow text-accent">Наше оборудование</p>
            <h2 id="equipment-title" className="mt-3 max-w-4xl text-balance font-display text-4xl font-semibold uppercase leading-[1.08] tracking-wide sm:text-5xl">
              Беспроводная «Гранат» и проводная «Лунь»: система под ваш объект
            </h2>
            <p className="mt-5 max-w-2xl text-lg text-muted">
              Две системы для разных задач. «Гранат» работает по радиоканалу и ставится без ремонта. «Лунь» соединяет датчики проводами и даёт максимальную надёжность.
            </p>

            <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
              {EQUIPMENT.map(({ key, icon: Icon, name, badge, kind, text, points, photo, alt }) => (
                <article key={key} className="flex flex-col rounded-3xl border border-line bg-surface p-5 shadow-card sm:p-6">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-surface2">
                    <Photo name={photo} alt={alt} sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw" className="absolute inset-0 h-full w-full object-cover" />
                  </div>
                  <div className="mt-6 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-2">
                    <h3 className="font-display text-4xl font-semibold uppercase tracking-wide">{name}</h3>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent">
                      <Icon size={13} /> {badge}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-accent">{kind}</p>
                  <p className="mt-4 leading-relaxed text-muted">{text}</p>
                  <ul className="mt-5 flex flex-col gap-2.5 border-t border-line pt-5 text-[15px]">
                    {points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5">
                        <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-ok" /> <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}

              {/* Помощь с выбором */}
              <article className="flex flex-col rounded-3xl bg-accent p-6 text-accentink shadow-lift sm:p-8">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accentink">
                  <ShieldCheck size={26} className="!text-accent" />
                </span>
                <h3 className="mt-6 font-display text-4xl font-semibold uppercase leading-[1.08] tracking-wide">Не знаете, что выбрать?</h3>
                <p className="mt-4 leading-relaxed">
                  Подскажем сами. Специалист уточнит, есть ли в помещении ремонт, сколько там комнат и входов, и предложит подходящую систему.
                </p>
                <ul className="mt-6 flex flex-col gap-2.5 border-t border-accentink/25 pt-5 text-[15px] font-medium">
                  {CHOOSE_POINTS.map((p) => (
                    <li key={p} className="flex items-start gap-2.5">
                      <CheckCircle2 size={18} className="mt-0.5 shrink-0" /> <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <a href="#request" className="mt-8 inline-flex items-center justify-center gap-2 self-start rounded-xl bg-accentink px-6 py-3.5 text-base font-bold !text-accent transition hover:brightness-125 lg:mt-auto">
                  Подобрать систему <ArrowRight size={18} />
                </a>
              </article>
            </div>

            {/* Как это работает */}
            <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start">
              <div>
                <h2 className="max-w-xl text-balance font-display text-3xl font-semibold uppercase leading-tight tracking-wide sm:text-4xl">
                  Как тревога доходит от датчика до группы реагирования
                </h2>
                <Reveal as="ol" className="mt-8 flex flex-col">
                  {CHAIN.map(({ icon: Icon, anim, title, text }, i) => (
                    <li key={title} data-anim={anim} className="ico-item relative flex gap-4 pb-7 last:pb-0">
                      {i < CHAIN.length - 1 && <span className="absolute left-[23px] top-12 h-[calc(100%-2rem)] w-px bg-line" aria-hidden="true" />}
                      <span style={{ "--i": i }} className="ico-tile relative grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-surface2 text-accent ring-1 ring-line">
                        <Icon size={22} />
                      </span>
                      <div className="pt-1">
                        <p className="text-lg font-semibold">{title}</p>
                        <p className="mt-0.5 text-muted">{text}</p>
                      </div>
                    </li>
                  ))}
                </Reveal>
              </div>

              <figure className="overflow-hidden rounded-3xl border border-line bg-surface shadow-lift">
                <Photo
                  name="gbr"
                  alt="Автомобиль группы быстрого реагирования «Бастион К» с надписью и логотипом на дверях"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="aspect-[4/3] w-full object-cover"
                />
                <figcaption className="flex items-start gap-3 border-t border-line px-5 py-4">
                  <ShieldAlert size={20} className="mt-0.5 shrink-0 text-accent" />
                  <span>
                    <span className="block font-semibold">Группа быстрого реагирования</span>
                    <span className="text-sm text-muted">Выезжает на адрес сразу после сигнала с пульта</span>
                  </span>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* ПРЕИМУЩЕСТВА */}
        <section id="advantages" className="scroll-mt-20 bg-surface" aria-labelledby="adv-title">
          <div className="wrap py-16 sm:py-24">
            <p className="eyebrow text-accent">Преимущества</p>
            <h2 id="adv-title" className="mt-3 max-w-3xl text-balance font-display text-4xl font-semibold uppercase leading-[1.08] tracking-wide sm:text-5xl">
              Почему бизнес и семьи выбирают «Бастион К»
            </h2>
            <Reveal className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {ADVANTAGES.map(({ icon: Icon, anim, title, text }, i) => (
                <div key={title} data-anim={anim} className="ico-item flex gap-4">
                  <span style={{ "--i": i }} className="ico-tile grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent/10 text-accent ring-1 ring-accent/25">
                    <Icon size={22} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold leading-snug">{title}</h3>
                    <p className="mt-2 leading-relaxed text-muted">{text}</p>
                  </div>
                </div>
              ))}
            </Reveal>

            <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2">
              <article className="relative overflow-hidden rounded-3xl bg-accent p-8 text-accentink shadow-lift">
                <BadgePercent size={34} />
                <p className="mt-4 font-display text-6xl font-bold leading-none">−50%</p>
                <h3 className="mt-3 font-display text-2xl font-semibold uppercase tracking-wide">На первый месяц охраны</h3>
                <p className="mt-2 max-w-sm font-medium opacity-80">Подключите пультовую охрану со скидкой. Условия уточняйте у менеджера.</p>
                <a href="#request" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-accentink px-5 py-3 text-sm font-semibold !text-accent">
                  Получить скидку <ArrowRight size={16} />
                </a>
              </article>
              <article className="relative overflow-hidden rounded-3xl border border-line bg-forest p-8 shadow-card">
                <Gift size={34} className="text-accent" />
                <p className="mt-4 font-display text-6xl font-bold leading-none text-fg">1 месяц</p>
                <h3 className="mt-3 font-display text-2xl font-semibold uppercase tracking-wide text-fg">Бесплатной охраны на пульте</h3>
                <p className="mt-2 max-w-sm text-muted">Приведите друга, который подключит охрану, и получите 1 месяц бесплатной охраны на пульте. Условия уточняйте у менеджера.</p>
                <a href="#request" className="btn-ghost mt-6">Привести друга <ArrowRight size={16} /></a>
              </article>
            </div>
          </div>
        </section>

        {/* ЗАЯВКА */}
        <section id="request" className="scroll-mt-20 relative overflow-hidden border-y border-line" aria-labelledby="request-title">
          <div className="absolute inset-0 grid-bg opacity-50" aria-hidden="true" />
          <div className="wrap relative py-16 sm:py-24">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
              <div>
                <p className="eyebrow text-accent">Заявка на охрану</p>
                <h2 id="request-title" className="mt-3 text-balance font-display text-4xl font-semibold uppercase leading-[1.08] tracking-wide sm:text-5xl">
                  Оставьте заявку, рассчитаем охрану под ваш объект
                </h2>
              </div>
              <div>
                <p className="max-w-md text-lg text-muted">
                  Менеджер перезвонит, уточнит детали и назовёт стоимость. Хотите быстрее, напишите в WhatsApp.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                  <a href={`https://wa.me/${COMPANY.whatsapp.wa}`} target="_blank" rel="noreferrer" className="btn-ghost">
                    <MessageCircle size={18} /> Написать в WhatsApp
                  </a>
                  <p className="text-sm text-muted tabular-nums">{COMPANY.whatsapp.display}</p>
                </div>
              </div>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
              <div className="relative hidden aspect-[16/9] overflow-hidden rounded-3xl border border-line shadow-lift sm:block lg:aspect-auto lg:min-h-[420px]">
                <Photo
                  name="operator" ratio="3x4" wide={1200}
                  alt="Оператор «Бастион К» в гарнитуре отвечает на звонок"
                  sizes="(min-width:1024px) 40vw, 90vw"
                  className="absolute inset-0 h-full w-full object-cover object-[50%_30%]"
                />
              </div>
              <div className="flex flex-col justify-center rounded-3xl border border-line bg-surface p-6 shadow-lift sm:p-8 lg:p-10">
                <LeadForm idPrefix="req" variant="wide" />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="scroll-mt-20 bg-paper text-ink" aria-labelledby="faq-title">
          <div className="wrap grid grid-cols-1 gap-10 py-16 sm:py-24 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="eyebrow text-papermuted">Вопросы</p>
              <h2 id="faq-title" className="mt-3 text-balance font-display text-4xl font-semibold uppercase leading-[1.08] tracking-wide sm:text-5xl">
                Частые вопросы об охране
              </h2>
            </div>
            <div className="flex flex-col gap-3">
              {FAQ.map((f) => <FaqItem key={f.q} {...f} />)}
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer id="contacts" className="scroll-mt-20 bg-bg" aria-labelledby="contacts-title">
        <div className="wrap py-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <Logo />
              <h2 id="contacts-title" className="mt-8 font-display text-3xl font-semibold uppercase tracking-wide">
                Контакты охранного агентства
              </h2>
              <p className="mt-3 max-w-sm text-muted">
                Работаем по Бишкеку и Чуйской области. Станция мониторинга принимает сигналы круглосуточно.
              </p>
            </div>
            <address className="grid grid-cols-1 gap-6 not-italic sm:grid-cols-2">
              <div className="flex gap-3">
                <MapPin className="mt-1 shrink-0 text-accent" size={20} />
                <div><p className="label">Адрес</p><p className="mt-1">{COMPANY.address}</p></div>
              </div>
              <div className="flex gap-3">
                <Phone className="mt-1 shrink-0 text-accent" size={20} />
                <div>
                  <p className="label">Телефоны</p>
                  {COMPANY.phones.map((p) => (
                    <a key={p.tel} href={`tel:${p.tel}`} className="mt-1 block tabular-nums hover:text-accent">{p.display}</a>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <MessageCircle className="mt-1 shrink-0 text-accent" size={20} />
                <div>
                  <p className="label">WhatsApp</p>
                  <a href={`https://wa.me/${COMPANY.whatsapp.wa}`} target="_blank" rel="noreferrer" className="mt-1 block tabular-nums hover:text-accent">{COMPANY.whatsapp.display}</a>
                </div>
              </div>
              <div className="flex gap-3">
                <Mail className="mt-1 shrink-0 text-accent" size={20} />
                <div><p className="label">E-mail</p><a href={`mailto:${COMPANY.email}`} className="mt-1 block break-all hover:text-accent">{COMPANY.email}</a></div>
              </div>
              <div className="flex gap-3">
                <AtSign className="mt-1 shrink-0 text-accent" size={20} />
                <div><p className="label">Instagram</p><p className="mt-1">{COMPANY.instagram}</p></div>
              </div>
              <div className="flex gap-3">
                <Clock className="mt-1 shrink-0 text-accent" size={20} />
                <div><p className="label">Пульт</p><p className="mt-1">Круглосуточно, 24/7</p></div>
              </div>
            </address>
          </div>

          {/* SEO-текст */}
          <div className="mt-14 border-t border-line pt-8 text-[12px] leading-relaxed text-muted/80">
            <h2 className="text-[13px] font-semibold text-muted">Охранное агентство в Бишкеке и Кара-Балте: пультовая охрана, сигнализация, видеонаблюдение</h2>
            <p className="mt-3">
              ОсОО Охранное агентство «Бастион К» с 2010 года охраняет объекты в Бишкеке, Кара-Балте и Чуйской области. Мы предлагаем пультовую охрану квартир, частных домов, офисов, магазинов и складов, установку и обслуживание охранной и пожарной сигнализации, системы видеонаблюдения, физическую охрану на посту, группу быстрого реагирования и инкассацию.
            </p>
            <p className="mt-3">
              Для связи объекта с пультом используем беспроводную систему «Гранат» и проводную систему «Лунь». Тревожные события принимает собственная станция мониторинга. Это позволяет подобрать охрану под любой объект в Бишкеке и Кара-Балте: без прокладки кабеля, если ремонт уже сделан, или проводную установку для максимальной надёжности, и быстро направлять группу реагирования на адрес.
            </p>
            <p className="mt-3">
              Закажите охрану квартиры в Бишкеке, охрану офиса или магазина, сигнализацию для дома в Кара-Балте: оставьте заявку на сайте или позвоните, и мы бесплатно рассчитаем стоимость.
            </p>
          </div>
          <p className="mt-8 text-xs text-muted">© {COMPANY.since}–2026 ОсОО Охранное агентство «Бастион К». Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}
