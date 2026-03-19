// ═══════════════════════════════════════════════════════════════════
// UNIT TOOLS — core.js
// All parsing, soldier building, and shared data. No server needed.
// ═══════════════════════════════════════════════════════════════════

const EQUIP_MAP = {
  'AT422T':'CRANE','D7RII WIN':'DOZER','JD240D LCR':'HYEX',
  'M1075A1':'PLS','M1076':'PLS TRAILER',
  'M1078A1':'LMTV','M1078A1P2WOW':'LMTV','M1078A1WW':'LMTV','M1085A1P2WOW':'LMTV',
  'M1097':'HMMV','M1097A2':'HMMV','M1152A1':'HMMV','M1165A1':'HMMV',
  'M15':'BAP','M1975':'DSB','M1977A4':'CBT',
  'M1977A2WW':'PLS','M1977A2R1WOW':'PLS','M1977A2R1WW':'PLS','M1977A2WOW':'PLS','M1977A2RWW':'PLS',
  'M400W':'SKD STR','M7FRS':'FRS','M870':'40 FT LOW BED',
  'M978A2':'FUELER',
  'M983A4LET':'LET','M984A4WOW':'WRECKER','M984A4WO/W':'WRECKER',
  'M985A4WOW':'HEMTT CARGO','MK2':'BEB','M30':'BEB',
  'REPW R6BT':'BEB','REPWR6BT':'BRIDGE PIECE',
  'TPI HMEE-I':'I HMEE','TP I HMEE-I':'I HMEE',
  'ACVCII1202':'GSA','ACVCIJ1101':'GSA','ACVCIB0201':'GSA',
  'M1101':'HMMV/LMTV TRAILER',
};

const RANK_ORDER = {
  'PVT':1,'PV2':2,'PFC':3,'SPC':4,'CPL':5,'SGT':6,'SSG':7,
  'SFC':8,'MSG':9,'1SG':9,'SGM':10,'CSM':10,
  'WO1':10,'WO2':11,'WO3':12,'WO4':13,'WO5':14,
  '2LT':10,'1LT':11,'CPT':12,'MAJ':13,'LTC':14,'COL':15,'CSR':10,
};

const PLATOON_ORDER = { 'HQ':0,'1ST':1,'2ND':2,'SUPPORT':3 };

const PLATOON_LIST = ['HQ','1ST','2ND','SUPPORT'];

const ANSWER_KEYS = {
  'HMMV':    ['B','D','C','A','A','C','B','B','B','C','C','B','A','C','B','B','C','B','D','A'],
  'HMMWV':   ['B','D','C','A','A','C','B','B','B','C','C','B','A','C','B','B','C','B','D','A'],
  'CBT':     ['C','D','C','C','B','C','A','C','C','C','C','C','D','B','C','D','B','C','D','B',
              'FALSE','TRUE','FALSE','TRUE','TRUE','TRUE','FALSE','TRUE','TRUE'],
  'LMTV':    ['C','C','B','D','A','D','C','B','C','C','D','C','D','B','D','B','C','B','D','D'],
  'GSA':     ['A','A','C','B','B','B','A','A','D','A','A','A','B','B','A','B','D','B','D','C'],
  'HEMTT':   ['A','B','D','C','C','B','B','C','A','A','D','A','C','C','C','A','D','A','D','A'],
  'LET':     ['C','C','B','A','A','B','C','A','B','A','D','C','D','C','B','C','C','B','C','A'],
  'PLS':     ['B','B','B','D','D','C','B','C','A','B','A','C','D','C','A','B','C','B','D','D'],
  'PLS_TRL': ['D','B','C','B','B','C','D','D','C','B','B','D','A','A','A','B','B','D','A','D'],
  'BAP':     ['D','D','C','A','A','C','C','A','C','D','B','D','A','C','B','A','C','B','B','C'],
  'BEB':     ['B','A','C','D','A','A','C','C','B','A','B','A','A','D','A','B','B','D','B','C'],
  'WRECKER': ['D','B','B','C','D','C','D','D','A','B','B','A','C','A','B','B','A','A','A','B'],
  'FUELER':  ['A','A','C','A','B','C','D','B','B','D','B','D','D','B','A','A','D','C','D','D'],
  'DOZER':   ['D','A','A','A','D','C','A','B','B','B','D','B','D','B','C','D','B','A','D','A'],
  'CRANE':   ['A','A','A','B','B','D','D','D','B','D','A','B','D','A','D','C','D','C','D','D'],
  'HMEE':    ['B','B','C','B','A','A','C','A','A','D','B','A','A','B','A','A','B','D','A','B'],
  'SKD_STR': ['A','A','D','C','C','B','C','B','C','D','B','C','D','C','A','A','D','A','A','B'],
  'LOWBED':  ['C','B','C','A','B','C','C','B','D','C','A','C','A','B','C','A','A','B','C','C'],
  'BRIDGE':  ['B','C','B','C','D','C','A','A','D','C','A','A','C','B','C','B','D','D','A','A'],
  'HMV_TRL': ['A','B','A','C','B','D','B','A','C','C','A','C','B','B','A','C','D','B','B','B'],
};

// ── Helpers ────────────────────────────────────────────────────────

function normalizeName(name) {
  if (!name) return '';
  return String(name).trim().toUpperCase().replace(/\s+/g, ' ');
}

function simplifyQual(qualString) {
  if (!qualString) return 'UNKNOWN';
  const model = qualString.split(':')[0].trim();
  return EQUIP_MAP[model] || model;
}

// Convert Excel serial date number to JS Date
function excelSerialToDate(serial) {
  if (!serial || typeof serial !== 'number') return null;
  // Excel epoch is Dec 30 1899
  const msPerDay = 86400000;
  const excelEpoch = new Date(1899, 11, 30).getTime();
  return new Date(excelEpoch + serial * msPerDay);
}

function formatDate(d) {
  if (!d || !(d instanceof Date) || isNaN(d)) return '';
  return d.toLocaleDateString('en-US', { month:'2-digit', day:'2-digit', year:'numeric' });
}

function today() { return new Date(); }

// ── GCSS Parsing ───────────────────────────────────────────────────

function parseGCSS(workbook) {
  // Use first sheet (raw GCSS export)
  const sheetName = workbook.SheetNames[0];
  const ws = workbook.Sheets[sheetName];
  const raw = XLSX.utils.sheet_to_json(ws, { header:1, raw:true, defval:null });

  const rows = [];
  for (let i = 1; i < raw.length; i++) {
    const row = raw[i];
    if (!row[3]) continue; // no name = skip
    const name = normalizeName(row[3]);
    const qual = row[6] ? String(row[6]).trim() : '';
    const prof = row[7] ? String(row[7]).trim().toUpperCase() : 'STANDARD';

    // End date — may be serial number or already a Date
    let endDate = null;
    const rawEnd = row[9];
    if (rawEnd instanceof Date) {
      endDate = rawEnd;
    } else if (typeof rawEnd === 'number') {
      endDate = excelSerialToDate(rawEnd);
    }

    rows.push({
      soldierID:  row[2] ? String(row[2]).trim() : '',
      name,
      eic:        row[5] || '',
      qual,
      proficiency: prof,
      endDate,
      simplified: simplifyQual(qual),
    });
  }
  return rows;
}

// ── Troop Info Parsing ─────────────────────────────────────────────

function parseTroopInfo(workbook) {
  // Prefer "TROOP INFO" sheet, fall back to first
  let sheetName = workbook.SheetNames.find(n => n.toUpperCase() === 'TROOP INFO')
                  || workbook.SheetNames[0];
  const ws = workbook.Sheets[sheetName];
  const raw = XLSX.utils.sheet_to_json(ws, { header:1, raw:true, defval:null });

  const troops = {};
  for (let i = 1; i < raw.length; i++) {
    const row = raw[i];
    if (!row[0]) continue;
    const platoon = row[0] ? String(row[0]).trim().toUpperCase() : '';
    const rank    = row[1] ? String(row[1]).trim() : '';
    const last    = row[2] ? String(row[2]).trim().toUpperCase() : '';
    const first   = row[3] ? String(row[3]).trim().toUpperCase() : '';
    const fullName = normalizeName(`${first} ${last}`);
    if (fullName.trim()) {
      troops[fullName] = { platoon, rank, last, first };
    }
  }
  return troops;
}

// ── Build Soldiers ─────────────────────────────────────────────────

function buildSoldiers(gcssRows, troopMap) {
  const now = today();
  const WARN_DAYS = 90;

  // Aggregate per soldier
  const gcssAgg = {};
  for (const row of gcssRows) {
    if (!gcssAgg[row.name]) {
      gcssAgg[row.name] = { soldierID: row.soldierID, licenses: [], vehicles: new Set() };
    }
    gcssAgg[row.name].soldierID = row.soldierID;
    gcssAgg[row.name].licenses.push(row);
    gcssAgg[row.name].vehicles.add(row.simplified);
  }

  const gcssNames = new Set(Object.keys(gcssAgg));
  const troopNames = new Set(Object.keys(troopMap));

  const soldiers = {};
  const expired = [];
  const expiringSoon = [];
  const restricted = [];
  const notInTroop = [];
  const notInGCSS = [];

  for (const [name, data] of Object.entries(gcssAgg)) {
    const info = troopMap[name] || {};
    const flags = [];

    for (const lic of data.licenses) {
      const end  = lic.endDate;
      const prof = lic.proficiency;
      const veh  = lic.simplified;

      // Dummy dates far in future (year > 2050) mean no real expiry
      const isDummy = end && end.getFullYear() > 2050;

      if (end && !isDummy && !isNaN(end)) {
        const daysLeft = Math.floor((end - now) / 86400000);
        if (daysLeft < 0) {
          expired.push({ name, rank: info.rank || '', platoon: info.platoon || 'UNKNOWN',
                         vehicle: veh, endDate: formatDate(end) });
          flags.push(`${veh}:EXPIRED`);
        } else if (daysLeft <= WARN_DAYS) {
          expiringSoon.push({ name, rank: info.rank || '', platoon: info.platoon || 'UNKNOWN',
                              vehicle: veh, endDate: formatDate(end), daysLeft });
          flags.push(`${veh}:EXPIRES ${formatDate(end)}`);
        }
      }

      if (prof === 'LEARNER' || prof === 'LIMITED') {
        restricted.push({ name, rank: info.rank || '', platoon: info.platoon || 'UNKNOWN',
                          vehicle: veh, proficiency: prof });
        flags.push(`${veh}:${prof}`);
      }
    }

    // Deduplicate flags
    const seenFlags = new Set();
    const dedupedFlags = flags.filter(f => { if (seenFlags.has(f)) return false; seenFlags.add(f); return true; });

    const inTroop = troopNames.has(name);
    if (!inTroop) notInTroop.push(name);

    soldiers[name] = {
      name,
      soldierID: data.soldierID,
      rank:     info.rank    || '',
      rankVal:  RANK_ORDER[info.rank] || 0,
      platoon:  inTroop ? (info.platoon || 'UNKNOWN') : 'UNKNOWN',
      last:     info.last  || (name.includes(' ') ? name.split(' ').slice(-1)[0] : name),
      first:    info.first || (name.includes(' ') ? name.split(' ')[0] : ''),
      vehicles: [...data.vehicles].sort(),
      flags:    dedupedFlags,
    };
  }

  for (const name of troopNames) {
    if (!gcssNames.has(name)) {
      const info = troopMap[name];
      notInGCSS.push({ name, rank: info.rank, platoon: info.platoon });
    }
  }

  const matchReport = {
    totalGCSS:    Object.keys(gcssAgg).length,
    totalTroop:   Object.keys(troopMap).length,
    matched:      [...gcssNames].filter(n => troopNames.has(n)).length,
    notInTroop,
    notInGCSS,
    expired,
    expiringSoon,
    restricted,
  };

  return { soldiers, matchReport };
}

// ── Roster Diff ────────────────────────────────────────────────────

function computeDiff(oldSoldiers, newSoldiers) {
  const oldNames = new Set(Object.keys(oldSoldiers));
  const newNames = new Set(Object.keys(newSoldiers));

  const added = [];
  const removed = [];
  const changed = [];
  let licensesGained = 0, licensesLost = 0, newExpirations = 0;

  for (const name of [...newNames].filter(n => !oldNames.has(n)).sort()) {
    const s = newSoldiers[name];
    added.push({ name, rank: s.rank, platoon: s.platoon, vehicles: [...s.vehicles] });
  }
  for (const name of [...oldNames].filter(n => !newNames.has(n)).sort()) {
    const s = oldSoldiers[name];
    removed.push({ name, rank: s.rank, platoon: s.platoon, vehicles: [...s.vehicles] });
  }
  for (const name of [...oldNames].filter(n => newNames.has(n)).sort()) {
    const oldS = oldSoldiers[name];
    const newS = newSoldiers[name];
    const oldVehs = new Set(oldS.vehicles);
    const newVehs = new Set(newS.vehicles);
    const gained = [...newVehs].filter(v => !oldVehs.has(v)).sort();
    const lost   = [...oldVehs].filter(v => !newVehs.has(v)).sort();
    const oldFlags = new Set(oldS.flags);
    const newFlags = new Set(newS.flags);
    const newExpired = [...newS.flags].filter(f => !oldFlags.has(f) && f.includes('EXPIRED')).sort();

    if (gained.length || lost.length || newExpired.length) {
      licensesGained += gained.length;
      licensesLost   += lost.length;
      newExpirations += newExpired.length;
      changed.push({ name, rank: newS.rank, platoon: newS.platoon, gained, lost, newExpired });
    }
  }

  return { added, removed, changed, licensesGained, licensesLost, newExpirations };
}

// ── Sort helpers ────────────────────────────────────────────────────

function sortSoldiers(soldiers) {
  return Object.values(soldiers).sort((a, b) => {
    const po = (PLATOON_ORDER[a.platoon] ?? 99) - (PLATOON_ORDER[b.platoon] ?? 99);
    if (po !== 0) return po;
    const ro = (b.rankVal || 0) - (a.rankVal || 0);
    if (ro !== 0) return ro;
    return a.name.localeCompare(b.name);
  });
}

// ── Saved Files (localStorage) ─────────────────────────────────────

const SAVED_KEYS = { gcss: 'unittools_saved_gcss', troop: 'unittools_saved_troop',
                     gcssName: 'unittools_saved_gcss_name', troopName: 'unittools_saved_troop_name',
                     gcssDate: 'unittools_saved_gcss_date', troopDate: 'unittools_saved_troop_date' };

function saveFile(type, file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        localStorage.setItem(SAVED_KEYS[type], e.target.result);
        localStorage.setItem(SAVED_KEYS[type + 'Name'], file.name);
        localStorage.setItem(SAVED_KEYS[type + 'Date'], new Date().toLocaleString());
        resolve();
      } catch(err) { reject(err); }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function getSavedFileInfo(type) {
  const data = localStorage.getItem(SAVED_KEYS[type]);
  if (!data) return null;
  return {
    data,
    name: localStorage.getItem(SAVED_KEYS[type + 'Name']) || 'saved_file.xlsx',
    date: localStorage.getItem(SAVED_KEYS[type + 'Date']) || '',
  };
}

function deleteSavedFile(type) {
  localStorage.removeItem(SAVED_KEYS[type]);
  localStorage.removeItem(SAVED_KEYS[type + 'Name']);
  localStorage.removeItem(SAVED_KEYS[type + 'Date']);
}

// Parse a base64 data URL into a SheetJS workbook
function workbookFromDataURL(dataURL) {
  const base64 = dataURL.split(',')[1];
  const binary = atob(base64);
  const bytes  = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return XLSX.read(bytes, { type: 'array', cellDates: false });
}

// Read a File object into a SheetJS workbook
function workbookFromFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const wb = XLSX.read(data, { type: 'array', cellDates: false });
        resolve(wb);
      } catch(err) { reject(err); }
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}

// Clock
function startClock(id) {
  function tick() {
    const n = new Date();
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = n.toLocaleDateString('en-US',{year:'numeric',month:'short',day:'2-digit'}).toUpperCase()
                   + '\n' + n.toTimeString().slice(0,8);
  }
  setInterval(tick, 1000);
  tick();
}

// Trigger file download in browser
function triggerDownload(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a   = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click();
  setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); }, 1000);
}

// Date stamp for filenames
function dateStamp() {
  const n = new Date();
  return n.toISOString().slice(0,10).replace(/-/g,'') + '_'
       + n.toTimeString().slice(0,8).replace(/:/g,'');
}

function reportDateStr() {
  return new Date().toLocaleDateString('en-US',{day:'2-digit',month:'short',year:'numeric'}).toUpperCase();
}
