/* =============================================================
   Basse Immo — jeu d'icônes SVG
   Style trait 24x24, injecté une seule fois dans le document.
   Usage : <svg class="ico" aria-hidden="true"><use href="#i-home"></use></svg>
   ============================================================= */
(function () {
  'use strict';

  var ICONS = {
    /* --- interface --- */
    'menu': '<path d="M4 7h16M4 12h16M4 17h16"/>',
    'close': '<path d="M18 6 6 18M6 6l12 12"/>',
    'chevron-down': '<path d="m6 9 6 6 6-6"/>',
    'chevron-right': '<path d="m9 18 6-6-6-6"/>',
    'chevron-left': '<path d="m15 18-6-6 6-6"/>',
    'arrow-right': '<path d="M4 12h15M13 6l6 6-6 6"/>',
    'arrow-left': '<path d="M20 12H5M11 18l-6-6 6-6"/>',
    'arrow-up-right': '<path d="M7 17 17 7M8 7h9v9"/>',
    'plus': '<path d="M12 5v14M5 12h14"/>',
    'minus': '<path d="M5 12h14"/>',
    'check': '<path d="M20 6 9 17l-5-5"/>',
    'check-circle': '<circle cx="12" cy="12" r="9"/><path d="m8.2 12.2 2.6 2.6 5-5.4"/>',
    'search': '<circle cx="11" cy="11" r="7"/><path d="m20.5 20.5-4-4"/>',
    'filter': '<path d="M3 5h18l-7 8v6l-4 2v-8z"/>',
    'sliders': '<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h10M18 18h2"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="16" cy="18" r="2"/>',
    'grid': '<rect x="3.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.5"/>',
    'list': '<path d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01"/>',
    'sun': '<circle cx="12" cy="12" r="4"/><path d="M12 2v2.2M12 19.8V22M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M2 12h2.2M19.8 12H22M4.2 19.8l1.6-1.6M18.2 5.8l1.6-1.6"/>',
    'moon': '<path d="M20.5 14.3A8.6 8.6 0 0 1 9.7 3.5a8.6 8.6 0 1 0 10.8 10.8z"/>',
    'external-link': '<path d="M14 4h6v6"/><path d="M20 4 11 13"/><path d="M18 13.5V19a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 19V8a1.5 1.5 0 0 1 1.5-1.5H11"/>',
    'download': '<path d="M12 3v12"/><path d="m7.5 11 4.5 4 4.5-4"/><path d="M4 17v2.5A1.5 1.5 0 0 0 5.5 21h13a1.5 1.5 0 0 0 1.5-1.5V17"/>',
    'share': '<circle cx="18" cy="5.5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="18.5" r="2.5"/><path d="m8.3 10.8 7.4-4M8.3 13.2l7.4 4"/>',
    'eye': '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
    'refresh': '<path d="M20.5 11A8.5 8.5 0 0 0 6 6.3L3.5 8.8"/><path d="M3.5 4v4.8h4.8"/><path d="M3.5 13a8.5 8.5 0 0 0 14.5 4.7l2.5-2.5"/><path d="M20.5 20v-4.8h-4.8"/>',
    'copy': '<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"/>',

    /* --- habitat & construction --- */
    'home': '<path d="M3 10.6 12 3l9 7.6"/><path d="M5.2 9.2V19a2 2 0 0 0 2 2h9.6a2 2 0 0 0 2-2V9.2"/><path d="M9.6 21v-5.4a1 1 0 0 1 1-1h2.8a1 1 0 0 1 1 1V21"/>',
    'building': '<path d="M4 21V5.5A1.5 1.5 0 0 1 5.5 4h9A1.5 1.5 0 0 1 16 5.5V21"/><path d="M16 10h2.5A1.5 1.5 0 0 1 20 11.5V21"/><path d="M2.5 21h19"/><path d="M7.5 8h1.5M11 8h1.5M7.5 12h1.5M11 12h1.5M7.5 16h1.5M11 16h1.5"/>',
    'villa': '<path d="M2.5 11.5 8 7l5.5 4.5"/><path d="M4.5 10.5V20h16v-6.5h-7"/><path d="M2.5 20h19"/><path d="M7 20v-4h2.5v4"/><path d="M15.5 16.5h1.5M15.5 13.5h.01"/>',
    'key': '<circle cx="8" cy="15.5" r="4.2"/><path d="m11.1 12.5 8.4-8.4"/><path d="m16.2 7.4 2.3 2.3"/><path d="m14 9.6 2.3 2.3"/>',
    'door': '<path d="M4 21h16"/><path d="M6.5 21V4.5A1.5 1.5 0 0 1 8 3h8a1.5 1.5 0 0 1 1.5 1.5V21"/><circle cx="14.2" cy="12.5" r="1"/>',
    'bed': '<path d="M3 18v-7.5A1.5 1.5 0 0 1 4.5 9H20a1 1 0 0 1 1 1v8"/><path d="M3 14.5h18"/><path d="M6.5 9V7a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1v2"/><path d="M3 18v2M21 18v2"/>',
    'bath': '<path d="M3 11.5h18v2.5a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z"/><path d="M6 11.5V5.8A1.8 1.8 0 0 1 7.8 4c1 0 1.8.8 1.8 1.8"/><path d="M7 18v2M17 18v2"/>',
    'car': '<path d="M3.5 16v-3.2L5.8 7A1.5 1.5 0 0 1 7.2 6h9.6a1.5 1.5 0 0 1 1.4 1l2.3 5.8V16"/><path d="M3.5 12.8h17"/><circle cx="7.5" cy="16.5" r="1.8"/><circle cx="16.5" cy="16.5" r="1.8"/><path d="M3.5 16h1.9M18.6 16h1.9"/>',
    'stairs': '<path d="M3 20h4v-4h4v-4h4V8h4V4"/><path d="M3 20V4"/>',
    'layers': '<path d="m12 3 9 4.8-9 4.8-9-4.8z"/><path d="m3 12.6 9 4.8 9-4.8"/><path d="m3 17.2 9 4.8 9-4.8"/>',
    'ruler': '<path d="m15.8 2.6 5.6 5.6a1.4 1.4 0 0 1 0 2l-11.2 11.2a1.4 1.4 0 0 1-2 0l-5.6-5.6a1.4 1.4 0 0 1 0-2L13.8 2.6a1.4 1.4 0 0 1 2 0z"/><path d="m6.5 13.5 1.8 1.8M9.5 10.5l1.8 1.8M12.5 7.5l1.8 1.8"/>',
    'pen-tool': '<path d="M12 2.5 20 8l-8 13.5L4 8z"/><path d="M4.4 8h15.2"/><circle cx="12" cy="8" r="2.1"/>',
    'hard-hat': '<path d="M3.5 17.5a8.5 8.5 0 0 1 17 0"/><path d="M8.6 16V7.8A1.8 1.8 0 0 1 10.4 6h3.2a1.8 1.8 0 0 1 1.8 1.8V16"/><rect x="2" y="17.5" width="20" height="3.2" rx="1.6"/>',
    'brick': '<rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="M3 9.7h18M3 14.3h18"/><path d="M9 5v4.7M15 9.7v4.6M9 14.3V19"/>',
    'truck': '<path d="M2.5 16.5V7a1 1 0 0 1 1-1h9.5v10.5"/><path d="M13 9.5h3.7a1.5 1.5 0 0 1 1.3.8l2.5 4.4v1.8"/><path d="M2.5 16.5h1.8M9.2 16.5h5.4M19.8 16.5h1.7"/><circle cx="6.5" cy="17.5" r="2"/><circle cx="17" cy="17.5" r="2"/>',
    'crane': '<path d="M4 21h6"/><path d="M7 21V5"/><path d="M3 5h18"/><path d="m7 5 4 5M7 5 3.5 10"/><path d="M16 5v5.5"/><path d="M14.2 10.5h3.6l-1.8 3z"/>',
    'compass': '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5.2-5.2 2 2-5.2z"/>',
    'maximize': '<path d="M3.5 9V4.5A1 1 0 0 1 4.5 3.5H9"/><path d="M15 3.5h4.5a1 1 0 0 1 1 1V9"/><path d="M20.5 15v4.5a1 1 0 0 1-1 1H15"/><path d="M9 20.5H4.5a1 1 0 0 1-1-1V15"/>',
    'map-pin': '<path d="M12 21.2s7-5.7 7-11.2a7 7 0 1 0-14 0c0 5.5 7 11.2 7 11.2z"/><circle cx="12" cy="10" r="2.6"/>',
    'map': '<path d="m2.8 6.6 6-2.6 6.4 2.6 6-2.6v14l-6 2.6L9 18l-6.2 2.6z"/><path d="M9 4v14M15.2 6.6v14"/>',
    'waves': '<path d="M2.5 8.5c1.6 0 1.6 1.4 3.2 1.4s1.6-1.4 3.2-1.4 1.6 1.4 3.2 1.4 1.6-1.4 3.2-1.4 1.6 1.4 3.2 1.4 1.6-1.4 3.2-1.4"/><path d="M2.5 13.2c1.6 0 1.6 1.4 3.2 1.4s1.6-1.4 3.2-1.4 1.6 1.4 3.2 1.4 1.6-1.4 3.2-1.4 1.6 1.4 3.2 1.4 1.6-1.4 3.2-1.4"/><path d="M2.5 17.9c1.6 0 1.6 1.4 3.2 1.4s1.6-1.4 3.2-1.4 1.6 1.4 3.2 1.4 1.6-1.4 3.2-1.4 1.6 1.4 3.2 1.4 1.6-1.4 3.2-1.4"/>',
    'droplet': '<path d="M12 3.2s6 6 6 9.8a6 6 0 0 1-12 0c0-3.8 6-9.8 6-9.8z"/>',
    'solar': '<path d="M12 2v2.5M4.6 5.1l1.8 1.8M2.5 12.5H5M19 12.5h2.5M19.4 5.1l-1.8 1.8"/><circle cx="12" cy="10.5" r="3.2"/><path d="m5 21 1.6-5h10.8L19 21z"/><path d="M6.2 18.5h11.6M12 16v5"/>',
    'leaf': '<path d="M4 20c-1.5-6 1.5-13.5 9.5-15C18 4.3 20 5 20 5s.6 9-5 13c-4 2.8-8.5 1.5-8.5 1.5"/><path d="M4.5 19.5C8 16 11.5 12.5 16.5 9.5"/>',
    'palm': '<path d="M12 21c0-4.5-.5-8-1.5-10.5"/><path d="M11 10.5C9 8 5.5 7.5 3.5 9.5"/><path d="M11 10.5C10.5 7 12 4 15 3.5"/><path d="M11 10.5c2-2 5.5-2.2 7.5-.2"/><path d="M11 10.5c1.5 1 2.5 3 2.5 5.5"/><path d="M9 21h7"/>',
    'thermometer': '<path d="M13.5 14.2V5.2a2.2 2.2 0 1 0-4.4 0v9a4 4 0 1 0 4.4 0z"/><circle cx="11.3" cy="17.5" r="1.6"/>',
    'wind': '<path d="M3 8.5h10.5a2.8 2.8 0 1 0-2.8-2.8"/><path d="M3 12.5h14a2.8 2.8 0 1 1-2.8 2.8"/><path d="M3 16.5h6.5"/>',

    /* --- finance & dossier --- */
    'calculator': '<rect x="4" y="2.5" width="16" height="19" rx="2.2"/><rect x="7.2" y="5.8" width="9.6" height="3.4" rx="1"/><path d="M8 13h.01M12 13h.01M16 13h.01M8 17.2h.01M12 17.2h.01M16 17.2h.01"/>',
    'wallet': '<path d="M3 8.5A2.5 2.5 0 0 1 5.5 6H19a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5.5A2.5 2.5 0 0 1 3 16.5z"/><path d="M3 8.5v-3A2.5 2.5 0 0 1 5.5 3h10a1.5 1.5 0 0 1 1.5 1.5V6"/><circle cx="16.8" cy="12.5" r="1.3"/>',
    'coins': '<ellipse cx="9" cy="6.5" rx="6" ry="3"/><path d="M3 6.5v4c0 1.7 2.7 3 6 3s6-1.3 6-3v-4"/><path d="M15 10.8c3 .3 6 1.5 6 3.2v3.5c0 1.7-2.7 3-6 3s-6-1.3-6-3v-3.4"/>',
    'credit-card': '<rect x="2.5" y="5" width="19" height="14" rx="2.2"/><path d="M2.5 9.8h19"/><path d="M6.5 14.8h3"/>',
    'bank': '<path d="m3 9.5 9-5.5 9 5.5"/><path d="M4.5 9.5h15"/><path d="M6.5 12v6M10.2 12v6M13.8 12v6M17.5 12v6"/><path d="M3.5 20.5h17"/>',
    'trending-up': '<path d="m3.5 16.5 5.5-5.5 3.5 3.5 7-7"/><path d="M14.5 7.5h5v5"/>',
    'pie-chart': '<path d="M12 3a9 9 0 1 0 9 9h-9z"/><path d="M15 3.6A9 9 0 0 1 20.4 9H15z"/>',
    'bar-chart': '<path d="M3.5 20.5h17"/><rect x="5" y="11" width="3.4" height="7" rx="1"/><rect x="10.3" y="6.5" width="3.4" height="11.5" rx="1"/><path d="M15.6 18v-4.5a1 1 0 0 1 1-1h1.4a1 1 0 0 1 1 1V18"/>',
    'percent': '<path d="m6 18 12-12"/><circle cx="7.5" cy="7.5" r="2.5"/><circle cx="16.5" cy="16.5" r="2.5"/>',
    'target': '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.8"/><circle cx="12" cy="12" r="1.3"/>',
    'file-text': '<path d="M13.5 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8.5z"/><path d="M13.5 3v5.5H19"/><path d="M8.5 13h7M8.5 16.5h5"/>',
    'file-check': '<path d="M13.5 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8.5z"/><path d="M13.5 3v5.5H19"/><path d="m8.8 14.6 2 2 4-4.2"/>',
    'clipboard-check': '<path d="M9 4.5H7.5a1.5 1.5 0 0 0-1.5 1.5v13.5A1.5 1.5 0 0 0 7.5 21h9a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H15"/><rect x="9" y="2.8" width="6" height="3.4" rx="1.2"/><path d="m9.5 13.5 2 2 3.8-4"/>',
    'shield-check': '<path d="M12 2.8 4.5 5.8v6c0 4.5 3.2 7.8 7.5 9.4 4.3-1.6 7.5-4.9 7.5-9.4v-6z"/><path d="m8.8 12 2.3 2.3 4.2-4.5"/>',
    'scale': '<path d="M12 3.5v17"/><path d="M7 5.8h10"/><path d="M6.5 20.5h11"/><path d="m4 14 2.8-7L9.6 14a2.9 2.9 0 0 1-5.6 0z"/><path d="m14.4 14 2.8-7L20 14a2.9 2.9 0 0 1-5.6 0z"/>',
    'stamp': '<path d="M5 20.5h14"/><path d="M4.5 17.5h15v-1.6a1.4 1.4 0 0 0-1.4-1.4H5.9a1.4 1.4 0 0 0-1.4 1.4z"/><path d="M9 14.5V11a3 3 0 1 1 6 0v3.5"/>',
    'lock': '<rect x="4.5" y="10.5" width="15" height="10.5" rx="2"/><path d="M8 10.5V7.8a4 4 0 1 1 8 0v2.7"/><circle cx="12" cy="15.8" r="1.2"/>',

    /* --- temps --- */
    'calendar': '<rect x="3.5" y="5" width="17" height="16" rx="2.2"/><path d="M8 3v4M16 3v4M3.5 10h17"/>',
    'clock': '<circle cx="12" cy="12" r="9"/><path d="M12 7v5.2l3.4 2"/>',
    'timer': '<circle cx="12" cy="13.5" r="7.7"/><path d="M12 9.8v3.7l2.6 1.6"/><path d="M9.5 2.5h5"/>',
    'history': '<path d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1L3.5 8.4"/><path d="M3.5 4v4.5H8"/><path d="M12 8v4.3l3 1.8"/>',

    /* --- contact --- */
    'phone': '<path d="M5.2 3h3.1a1 1 0 0 1 .94.66l1.3 3.5a1 1 0 0 1-.4 1.18l-1.66 1.03a12.3 12.3 0 0 0 5.15 5.15l1.03-1.66a1 1 0 0 1 1.18-.4l3.5 1.3a1 1 0 0 1 .66.94v3.1a2 2 0 0 1-2.2 2A16.8 16.8 0 0 1 3.2 5.2a2 2 0 0 1 2-2.2z"/>',
    'mail': '<rect x="2.8" y="5" width="18.4" height="14" rx="2.2"/><path d="m3.6 7.2 8.4 5.8 8.4-5.8"/>',
    'whatsapp': '<path stroke="none" fill="currentColor" d="M12.04 2.2c-5.42 0-9.83 4.4-9.83 9.83 0 1.73.46 3.43 1.33 4.92L2.1 21.9l5.09-1.33a9.8 9.8 0 0 0 4.85 1.24h.01c5.42 0 9.83-4.41 9.83-9.83a9.77 9.77 0 0 0-2.88-6.95 9.74 9.74 0 0 0-6.95-2.88zm0 18.01h-.01a8.16 8.16 0 0 1-4.16-1.14l-.3-.18-3.09.81.82-3.02-.19-.31a8.13 8.13 0 0 1-1.25-4.34c0-4.5 3.67-8.17 8.18-8.17a8.13 8.13 0 0 1 8.17 8.18c0 4.5-3.67 8.17-8.17 8.17zm4.49-6.11c-.25-.13-1.46-.72-1.68-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.78.97-.14.16-.29.18-.53.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.22-1.46-1.37-1.7-.14-.25-.01-.38.11-.5.11-.12.25-.29.37-.44.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.83-.2-.48-.4-.41-.56-.42l-.47-.01c-.17 0-.43.06-.65.31-.23.25-.86.84-.86 2.05s.88 2.39 1.01 2.55c.12.17 1.74 2.65 4.2 3.72.59.25 1.04.4 1.4.52.59.19 1.12.16 1.54.1.47-.07 1.46-.6 1.66-1.17.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.47-.29z"/>',
    'message': '<path d="M21 11.8a8.6 8.6 0 0 1-12.4 7.7L3 21.3l1.8-5.5A8.6 8.6 0 1 1 21 11.8z"/><path d="M8.8 11.8h.01M12 11.8h.01M15.2 11.8h.01"/>',
    'send': '<path d="M21 3.5 10.5 14"/><path d="M21 3.5 14.4 21l-3.9-7-7-3.9z"/>',
    'headset': '<path d="M4 15v-3a8 8 0 1 1 16 0v3"/><path d="M4 14.5h1.8a1.5 1.5 0 0 1 1.5 1.5v2.5a1.5 1.5 0 0 1-1.5 1.5H5.5A1.5 1.5 0 0 1 4 18.5z"/><path d="M20 14.5h-1.8a1.5 1.5 0 0 0-1.5 1.5v2.5a1.5 1.5 0 0 0 1.5 1.5h.3a1.5 1.5 0 0 0 1.5-1.5z"/>',
    'globe': '<circle cx="12" cy="12" r="9"/><path d="M3.2 9.5h17.6M3.2 14.5h17.6"/><path d="M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z"/>',
    'plane': '<path d="M10.5 3.5a1.5 1.5 0 0 1 3 0V9l7.5 4.3v2.3l-7.5-2.2v3.9l2.5 1.9v1.6L12 19.9l-4 1.8v-1.6l2.5-1.9v-3.9L3 16.5v-2.3L10.5 9z"/>',
    'languages': '<path d="M3 5.5h8.5"/><path d="M7.2 3.5v2"/><path d="M9.5 5.5c0 3.4-2.8 6.5-6.5 7.5"/><path d="M5 9.8c1.2 1.8 3 3 5.5 3.7"/><path d="m12.5 20.5 4-10 4 10"/><path d="M13.9 17.2h5.2"/>',

    /* --- social --- */
    'users': '<circle cx="9" cy="8" r="3.5"/><path d="M2.8 20c0-3.4 2.8-6.2 6.2-6.2s6.2 2.8 6.2 6.2"/><path d="M16.2 5.2a3.5 3.5 0 0 1 0 6.6"/><path d="M17.5 14.2c2.2.7 3.7 2.7 3.7 5.1"/>',
    'user-check': '<circle cx="10" cy="8" r="3.8"/><path d="M3 20.2c0-3.9 3.1-7 7-7 1 0 2 .2 2.8.6"/><path d="m15 17.5 2 2 4-4.3"/>',
    'award': '<circle cx="12" cy="9.5" r="6"/><path d="m8.5 14.8-1.3 6.2 4.8-2.6 4.8 2.6-1.3-6.2"/><path d="m12 6.6 1 2 2.2.3-1.6 1.6.4 2.2-2-1-2 1 .4-2.2L8.8 9l2.2-.3z"/>',
    'star': '<path d="m12 3.2 2.7 5.6 6.1.85-4.4 4.3 1.05 6.1L12 17.2l-5.45 2.85L7.6 13.95 3.2 9.65l6.1-.85z"/>',
    'quote': '<path d="M9.5 6.5c-3 1-4.5 3.4-4.5 6.5v4.5h5.5V13H7.8c0-2 .8-3.4 2.6-4.2z"/><path d="M19 6.5c-3 1-4.5 3.4-4.5 6.5v4.5H20V13h-2.7c0-2 .8-3.4 2.6-4.2z"/>',
    'heart': '<path d="M12 20.3S3.5 15.5 3.5 9.6a4.8 4.8 0 0 1 8.5-3 4.8 4.8 0 0 1 8.5 3c0 5.9-8.5 10.7-8.5 10.7z"/>',
    'facebook': '<path d="M14.5 8.5h2.8V5h-2.8c-2.3 0-4 1.9-4 4.2V11H8v3.5h2.5V21H14v-6.5h2.8l.5-3.5H14V9.3c0-.5.3-.8.5-.8z"/>',
    'instagram': '<rect x="3.5" y="3.5" width="17" height="17" rx="4.6"/><circle cx="12" cy="12" r="4"/><circle cx="17" cy="7" r="1.1" fill="currentColor" stroke="none"/>',
    'linkedin': '<rect x="3.5" y="3.5" width="17" height="17" rx="3"/><path d="M7.5 10.5V17"/><circle cx="7.5" cy="7.4" r="1.2" fill="currentColor" stroke="none"/><path d="M11.5 17v-6.5"/><path d="M11.5 13.2c0-1.6 1.1-2.8 2.6-2.8s2.4 1.2 2.4 2.8V17"/>',
    'youtube': '<rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="m10.3 9.4 5.2 2.6-5.2 2.6z"/>',
    'tiktok': '<path d="M15 3.5c.4 2.2 1.9 3.8 4.2 4v3c-1.6 0-3.1-.5-4.2-1.4v6.3a5.8 5.8 0 1 1-5.8-5.8c.3 0 .6 0 .9.1v3.1a2.8 2.8 0 1 0 2 2.7V3.5z"/>',

    /* --- média --- */
    'camera': '<path d="M3 8.8A1.8 1.8 0 0 1 4.8 7h2.4l1.3-2.2h7l1.3 2.2h2.4A1.8 1.8 0 0 1 21 8.8v9.4a1.8 1.8 0 0 1-1.8 1.8H4.8A1.8 1.8 0 0 1 3 18.2z"/><circle cx="12" cy="13" r="3.8"/>',
    'image': '<rect x="3" y="4.5" width="18" height="15" rx="2.2"/><circle cx="8.6" cy="9.8" r="1.8"/><path d="m3.5 17.5 5-4.5 3.5 3 3.5-3 5 4.2"/>',
    'video': '<rect x="2.5" y="6" width="13" height="12" rx="2.2"/><path d="m15.5 10.5 6-3v9l-6-3z"/>',
    'play': '<circle cx="12" cy="12" r="9"/><path d="m10 8.5 6 3.5-6 3.5z"/>',

    /* --- signaux --- */
    'sparkles': '<path d="m12 3 1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9z"/><path d="m18.5 15.5.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9z"/>',
    'lightbulb': '<path d="M9 17.5a6 6 0 1 1 6 0v1.2a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 18.7z"/><path d="M9.8 20.8h4.4"/><path d="M10.5 17.5h3"/>',
    'info': '<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5"/><path d="M12 7.8h.01"/>',
    'alert': '<path d="M10.3 3.9 2.6 17.4A1.9 1.9 0 0 0 4.3 20.3h15.4a1.9 1.9 0 0 0 1.7-2.9L13.7 3.9a1.9 1.9 0 0 0-3.4 0z"/><path d="M12 9.5v4"/><path d="M12 16.8h.01"/>',
    'zap': '<path d="M13.5 2.5 4 14h7l-.5 7.5L20 10h-7z"/>',
    'flag': '<path d="M5 21V4"/><path d="M5 4.5h11.5l-2 3.5 2 3.5H5"/>'
  };

  function build() {
    var parts = ['<svg xmlns="http://www.w3.org/2000/svg" style="position:absolute;width:0;height:0;overflow:hidden" aria-hidden="true" focusable="false">'];
    for (var name in ICONS) {
      if (Object.prototype.hasOwnProperty.call(ICONS, name)) {
        parts.push('<symbol id="i-' + name + '" viewBox="0 0 24 24">' + ICONS[name] + '</symbol>');
      }
    }
    parts.push('</svg>');
    return parts.join('');
  }

  function inject() {
    if (document.getElementById('bi-icon-sprite')) return;
    var holder = document.createElement('div');
    holder.id = 'bi-icon-sprite';
    holder.setAttribute('aria-hidden', 'true');
    holder.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
    holder.innerHTML = build();
    document.body.insertBefore(holder, document.body.firstChild);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }

  window.BI_ICONS = Object.keys(ICONS);
})();
