// ═══════════════════════════════════════════════════════════════════
// UNIT TOOLS — core.js
// All parsing, soldier building, and shared data. No server needed.
// ═══════════════════════════════════════════════════════════════════

const EQUIP_MAP = {

  // ── HMMWV — Cargo / Troop Carriers ───────────────────────────────
  'M998':'HMMWV (Cargo/Troop)',
  'M998A1':'HMMWV (Cargo/Troop)',
  'M998A2':'HMMWV (Cargo/Troop)',
  'M1038':'HMMWV (Cargo/Troop w/ Winch)',
  'M1038A1':'HMMWV (Cargo/Troop w/ Winch)',
  'M1097':'HMMWV (Heavy Cargo)',
  'M1097A1':'HMMWV (Heavy Cargo)',
  'M1097A2':'HMMWV (Heavy Cargo)',
  'M1123':'HMMWV (Heavy Cargo/Troop)',
  // HMMWV — Ambulance
  'M997':'HMMWV (Ambulance)',
  'M997A1':'HMMWV (Ambulance)',
  'M997A2':'HMMWV (Ambulance)',
  'M997A3':'HMMWV (Ambulance)',
  'M1035':'HMMWV (Soft-Top Ambulance)',
  'M1035A1':'HMMWV (Soft-Top Ambulance)',
  'M1035A2':'HMMWV (Soft-Top Ambulance)',
  // HMMWV — Armament Carriers
  'M1025':'HMMWV (Armament Carrier)',
  'M1025A1':'HMMWV (Armament Carrier)',
  'M1025A2':'HMMWV (Armament Carrier)',
  'M1026':'HMMWV (Armament Carrier w/ Winch)',
  'M1026A1':'HMMWV (Armament Carrier w/ Winch)',
  'M1043':'HMMWV (Armament Carrier, Armor)',
  'M1043A1':'HMMWV (Armament Carrier, Armor)',
  'M1043A2':'HMMWV (Armament Carrier, Armor)',
  'M1044':'HMMWV (Armament Carrier, Armor w/ Winch)',
  'M1044A1':'HMMWV (Armament Carrier, Armor w/ Winch)',
  // HMMWV — TOW Carriers
  'M966':'HMMWV (TOW Carrier)',
  'M966A1':'HMMWV (TOW Carrier)',
  'M1045':'HMMWV (TOW Carrier, Armor)',
  'M1045A1':'HMMWV (TOW Carrier, Armor)',
  'M1045A2':'HMMWV (TOW Carrier, Armor)',
  'M1046':'HMMWV (TOW Carrier, Armor w/ Winch)',
  'M1046A1':'HMMWV (TOW Carrier, Armor w/ Winch)',
  // HMMWV — ECV / Up-Armored
  'M1113':'HMMWV (ECV Shelter Carrier)',
  'M1114':'HMMWV (Up-Armored)',
  'M1116':'HMMWV (Up-Armored/USAF)',
  'M1151':'HMMWV (Armament Carrier ECV)',
  'M1151A1':'HMMWV (Armament Carrier ECV)',
  'M1152':'HMMWV (Cargo/Troop ECV)',
  'M1152A1':'HMMWV (Cargo/Troop ECV)',
  'M1165':'HMMWV (Special Ops/GSSV)',
  'M1165A1':'HMMWV (Special Ops)',
  'M1167':'HMMWV (TOW Carrier ECV)',
  // HMMWV — Trailers
  'M1101':'HMMWV Trailer (Light)',
  'M1102':'HMMWV Trailer (Heavy)',

  // ── JLTV (Joint Light Tactical Vehicle) ──────────────────────────
  'M1278':'JLTV (Heavy Guns Carrier)',
  'M1278A1':'JLTV (Heavy Guns Carrier)',
  'M1279':'JLTV (Utility)',
  'M1279A1':'JLTV (Utility)',
  'M1280':'JLTV (General Purpose)',
  'M1280A1':'JLTV (General Purpose)',
  'M1281':'JLTV (Close Combat Weapons Carrier)',
  'M1281A1':'JLTV (Close Combat Weapons Carrier)',
  'M1282':'JLTV Trailer',

  // ── LMTV (2.5-ton 4x4) ───────────────────────────────────────────
  'M1078':'LMTV (Cargo)',
  'M1078A1':'LMTV (Cargo)',
  'M1078A1R':'LMTV (Cargo)',
  'M1078A1P2':'LMTV (Cargo)',
  'M1078A1P2WOW':'LMTV (Cargo)',
  'M1078A1WW':'LMTV (Cargo)',
  'M1078A2':'LMTV (Cargo)',
  'M1079':'LMTV (Van)',
  'M1079A1':'LMTV (Van)',
  'M1079A1R':'LMTV (Van)',
  'M1079A2':'LMTV (Van)',
  'M1080':'LMTV (Chassis)',
  'M1080A2':'LMTV (Chassis)',
  'M1081':'LMTV (Cargo, Airdrop)',
  'M1082':'LMTV Trailer',
  'M1082A1':'LMTV Trailer',

  // ── MTV (5-ton 6x6) ───────────────────────────────────────────────
  'M1083':'MTV (Cargo)',
  'M1083A1':'MTV (Cargo)',
  'M1083A1P2':'MTV (Cargo)',
  'M1083A2':'MTV (Cargo)',
  'M1084':'MTV (Cargo w/ Crane)',
  'M1084A1':'MTV (Cargo w/ Crane)',
  'M1084A1P2':'MTV (Cargo w/ Crane)',
  'M1084A2':'MTV (Cargo w/ Crane)',
  'M1085':'MTV (LWB Cargo)',
  'M1085A1':'MTV (LWB Cargo)',
  'M1085A1P2':'MTV (LWB Cargo)',
  'M1085A1P2WOW':'MTV (LWB Cargo)',
  'M1085A2':'MTV (LWB Cargo)',
  'M1086':'MTV (LWB Cargo w/ Crane)',
  'M1086A1':'MTV (LWB Cargo w/ Crane)',
  'M1086A2':'MTV (LWB Cargo w/ Crane)',
  'M1087':'MTV (Expansible Van)',
  'M1087A1':'MTV (Expansible Van)',
  'M1087A2':'MTV (Expansible Van)',
  'M1088':'MTV (Tractor)',
  'M1088A1':'MTV (Tractor)',
  'M1088A2':'MTV (Tractor)',
  'M1089':'MTV (Wrecker)',
  'M1089A1':'MTV (Wrecker)',
  'M1089A2':'MTV (Wrecker)',
  'M1090':'MTV (Dump)',
  'M1090A2':'MTV (Dump)',
  'M1092':'MTV (Chassis)',
  'M1092A2':'MTV (Chassis)',
  'M1093':'MTV (Cargo, Airdrop)',
  'M1094':'MTV (Dump, Airdrop)',
  'M1095':'MTV Trailer',
  'M1096':'MTV (LWB Chassis)',
  'M1096A2':'MTV (LWB Chassis)',
  'M1147':'MTV (LHST Trailer)',
  'M1148':'MTV (Load Handling System)',
  'M1148A2':'MTV (Load Handling System)',
  'M1157':'MTV (10-Ton Dump)',
  'M1157A2':'MTV (10-Ton Dump)',
  'M1273':'MTV (10-Ton Dump Chassis)',
  'M1273A2':'MTV (10-Ton Dump Chassis)',

  // ── M939 Series (Legacy 5-ton 6x6) ───────────────────────────────
  'M923':'M939 (Cargo)',
  'M923A1':'M939 (Cargo)',
  'M923A2':'M939 (Cargo)',
  'M924':'M939 (Cargo, Fixed Sides)',
  'M924A1':'M939 (Cargo, Fixed Sides)',
  'M925':'M939 (Cargo w/ Winch)',
  'M925A1':'M939 (Cargo w/ Winch)',
  'M925A2':'M939 (Cargo w/ Winch)',
  'M926':'M939 (Flatbed)',
  'M926A1':'M939 (Flatbed)',
  'M927':'M939 (LWB Cargo)',
  'M927A1':'M939 (LWB Cargo)',
  'M927A2':'M939 (LWB Cargo)',
  'M928':'M939 (LWB Cargo w/ Winch)',
  'M928A1':'M939 (LWB Cargo w/ Winch)',
  'M928A2':'M939 (LWB Cargo w/ Winch)',
  'M929':'M939 (Dump)',
  'M929A1':'M939 (Dump)',
  'M929A2':'M939 (Dump)',
  'M930':'M939 (Dump w/ Winch)',
  'M930A1':'M939 (Dump w/ Winch)',
  'M930A2':'M939 (Dump w/ Winch)',
  'M931':'M939 (Tractor)',
  'M931A1':'M939 (Tractor)',
  'M931A2':'M939 (Tractor)',
  'M932':'M939 (Tractor w/ Winch)',
  'M932A1':'M939 (Tractor w/ Winch)',
  'M932A2':'M939 (Tractor w/ Winch)',
  'M934':'M939 (Expansible Van)',
  'M934A1':'M939 (Expansible Van)',
  'M934A2':'M939 (Expansible Van)',
  'M935':'M939 (Expansible Van w/ Lift Gate)',
  'M935A1':'M939 (Expansible Van w/ Lift Gate)',
  'M935A2':'M939 (Expansible Van w/ Lift Gate)',
  'M936':'M939 (Wrecker)',
  'M936A1':'M939 (Wrecker)',
  'M936A2':'M939 (Wrecker)',

  // ── M35 Series (Deuce and a Half, Legacy 2.5-ton) ─────────────────
  'M35':'M35 (Cargo 2.5-Ton)',
  'M35A1':'M35 (Cargo 2.5-Ton)',
  'M35A2':'M35 (Cargo 2.5-Ton)',
  'M35A3':'M35 (Cargo 2.5-Ton)',
  'M36':'M35 (Cargo w/ Winch)',
  'M36A1':'M35 (Cargo w/ Winch)',
  'M36A2':'M35 (Cargo w/ Winch)',
  'M342':'M35 (Dump)',
  'M342A2':'M35 (Dump)',
  'M49':'M35 (Fuel Tanker 1,200 Gal)',
  'M49A2C':'M35 (Fuel Tanker 1,200 Gal)',
  'M50':'M35 (Water Tanker 1,000 Gal)',
  'M50A2':'M35 (Water Tanker 1,000 Gal)',
  'M109':'M35 (Expansible Van)',
  'M109A2':'M35 (Expansible Van)',
  'M109A3':'M35 (Expansible Van)',

  // ── HEMTT (Heavy Expanded Mobility Tactical Truck) ────────────────
  'M977':'HEMTT (Cargo)',
  'M977A2':'HEMTT (Cargo)',
  'M977A4':'HEMTT (Cargo)',
  'M978':'HEMTT (Fueler)',
  'M978A2':'HEMTT (Fueler)',
  'M978A2 ':'HEMTT (Fueler)',
  'M978A4':'HEMTT (Fueler)',
  'M983':'HEMTT (Tractor/MLRS Prime Mover)',
  'M983A2':'HEMTT (Tractor)',
  'M983A4LET':'LET (Light Equipment Transporter)',
  'M984':'HEMTT (Wrecker)',
  'M984A2':'HEMTT (Wrecker)',
  'M984A4WOW':'HEMTT (Wrecker)',
  'M984A4WO/W':'HEMTT (Wrecker)',
  'M985':'HEMTT (Cargo w/ Crane)',
  'M985A2':'HEMTT (Cargo w/ Crane)',
  'M985A4WOW':'HEMTT (Cargo w/ Crane)',
  'M1142':'HEMTT (Fire Fighting Truck)',
  'M1158':'HEMTT (Water Tender)',

  // ── PLS (Palletized Load System) ──────────────────────────────────
  'M1074':'PLS (Truck)',
  'M1074A1':'PLS (Truck)',
  'M1075':'PLS (Truck)',
  'M1075A1':'PLS (Truck)',
  'M1076':'PLS Trailer',
  'M1076A1':'PLS Trailer',
  'M1977A2WW':'PLS (Truck)',
  'M1977A2R1WOW':'PLS (Truck)',
  'M1977A2R1WW':'PLS (Truck)',
  'M1977A2WOW':'PLS (Truck)',
  'M1977A2RWW':'PLS (Truck)',

  // ── HET (Heavy Equipment Transporter) ────────────────────────────
  'M1070':'HET (Tractor)',
  'M1070A1':'HET (Tractor)',
  'M1000':'HET Semi-Trailer (70-Ton)',
  'M911':'C-HET (Tractor, Legacy)',
  'M747':'C-HET Semi-Trailer (60-Ton, Legacy)',
  'M1300':'EHETS (Tractor)',
  'M1302':'EHETS Semi-Trailer',

  // ── M915 Family (Line Haul / Engineer) ───────────────────────────
  'M915':'M915 (Line Haul Tractor)',
  'M915A1':'M915 (Line Haul Tractor)',
  'M915A2':'M915 (Line Haul Tractor)',
  'M915A3':'M915 (Line Haul Tractor)',
  'M915A5':'M915 (Line Haul Tractor)',
  'M916':'M916 (LET Tractor)',
  'M916A1':'M916 (LET Tractor)',
  'M916A2':'M916 (LET Tractor)',
  'M917':'M917 (20-Ton Dump)',
  'M917A1':'M917 (20-Ton Dump)',
  'M917A2':'M917 (20-Ton Dump)',
  'M917A3':'M917 (20-Ton Dump)',
  'M918':'M918 (Bituminous Distributor)',
  'M919':'M919 (Concrete Mixer)',
  'M920':'M920 (MET Tractor)',
  'M920A1':'M920 (MET Tractor)',

  // ── Semitrailers ──────────────────────────────────────────────────
  'M871':'Semitrailer (22.5-Ton Break-Bulk)',
  'M871A1':'Semitrailer (22.5-Ton Break-Bulk)',
  'M871A2':'Semitrailer (22.5-Ton Break-Bulk)',
  'M872':'Semitrailer (Flatbed)',
  'M872A1':'Semitrailer (Flatbed)',
  'M872A2':'Semitrailer (Flatbed)',
  'M872A3':'Semitrailer (Flatbed)',
  'M969':'Semitrailer (5,000-Gal Fuel)',
  'M969A1':'Semitrailer (5,000-Gal Fuel)',
  'M969A2':'Semitrailer (5,000-Gal Fuel)',
  'M970':'Semitrailer (5,000-Gal Aviation Fuel)',
  'M970A1':'Semitrailer (5,000-Gal Aviation Fuel)',
  'M972':'Semitrailer (5,000-Gal Water)',

  // ── Water / Fuel Trailers ─────────────────────────────────────────
  'M149':'Water Trailer (400 Gal)',
  'M149A1':'Water Trailer (400 Gal)',
  'M149A2':'Water Trailer (400 Gal)',
  'M1112':'Water Trailer (400 Gal)',
  'M131':'Fuel Semitrailer (5,000 Gal)',

  // ── CBT / DSB / PLS / BAP ─────────────────────────────────────────
  'M1977A4':'CBT (Common Bridge Transporter)',
  'M1975':'DSB (Dry Support Bridge)',
  'M15':'BAP (Bridge Adapter Pallet)',
  'M15A2':'BAP (Bridge Adapter Pallet)',

  // ── BEB / Bridge ──────────────────────────────────────────────────
  'MK2':'BEB (Bridge Erection Boat)',
  'M30':'BEB (Bridge Erection Boat)',
  'REPW R6BT':'BEB (Bridge Erection Boat)',
  'REPWR6BT':'Bridge Piece',
  'M400W':'SKD STR (Straddle Carrier)',
  'M945':'M939 Chassis (Ribbon Bridge Transporter)',

  // ── MRAP Family ───────────────────────────────────────────────────
  'M1224':'MRAP (MaxxPro)',
  'M1224A1':'MRAP (MaxxPro)',
  'M1235':'MRAP (MaxxPro Dash)',
  'M1235A1':'MRAP (MaxxPro Dash DXM)',
  'M1230':'MRAP (Cougar 4x4)',
  'M1231':'MRAP (Cougar 6x6)',
  'M1233':'MRAP (RG-33)',
  'M1240':'MRAP (RG-33L)',
  'M1277':'MRAP (MaxxPro MEAP)',

  // ── AMPV (Armored Multi-Purpose Vehicle) ─────────────────────────
  'M1283':'AMPV (General Purpose)',
  'M1284':'AMPV (Mission Command)',
  'M1285':'AMPV (Medical Treatment)',
  'M1286':'AMPV (Medical Evacuation)',
  'M1287':'AMPV (Mortar Carrier)',

  // ── Engineer / Construction Equipment ────────────────────────────
  'AT422T':'CRANE',
  'D7RII WIN':'DOZER (D7)',
  'D7RII':'DOZER (D7)',
  'D7G':'DOZER (D7G)',
  'D8R':'DOZER (D8)',
  'JD240D LCR':'EXCAVATOR (John Deere 240D)',
  'CAT330':'EXCAVATOR (CAT 330)',
  'TPI HMEE-I':'HMEE (Engineer Excavator)',
  'TP I HMEE-I':'HMEE (Engineer Excavator)',
  'M9':'ACE (Armored Combat Earthmover)',
  'M9ACE':'ACE (Armored Combat Earthmover)',
  'D9R':'DOZER (D9, Armored)',
  'M7FRS':'FRS (Forward Repair System)',
  'M7A1':'FRS (Forward Repair System)',
  'M7A2':'FRS (Forward Repair System)',

  // ── Forklifts ─────────────────────────────────────────────────────
  'RTFL':'RTFL (Rough Terrain Forklift)',
  'ATLAS':'ATLAS (All Terrain Lifter)',
  'MCRS':'RTFL (Rough Terrain Forklift)',
  'RT636C':'RTFL (Rough Terrain Forklift)',
  'RT4000':'RTFL (Rough Terrain Forklift)',
  'JD544':'Wheel Loader (John Deere 544)',
  'CAT950':'Wheel Loader (CAT 950)',
  'CAT966':'Wheel Loader (CAT 966)',

  // ── GSA / Administrative Vehicles ────────────────────────────────
  'ACVCII1202':'GSA (Admin Vehicle)',
  'ACVCIJ1101':'GSA (Admin Vehicle)',
  'ACVCIB0201':'GSA (Admin Vehicle)',

  // ── CUCV (Commercial Utility Cargo Vehicle) ───────────────────────
  'M1008':'CUCV (Pickup)',
  'M1008A1':'CUCV (Pickup)',
  'M1009':'CUCV (Blazer/SUV)',
  'M1010':'CUCV (Ambulance)',
  'M1028':'CUCV (Utility)',
  'M1028A1':'CUCV (Utility)',
  'M1028A2':'CUCV (Utility)',

  // ── Motorcycles / ATVs ────────────────────────────────────────────
  'M1030':'Motorcycle (Military)',
  'M1030A1':'Motorcycle (Military)',
  'M1030M1':'Motorcycle (Military)',
  'LTATV':'LTATV (Light Tactical ATV)',
  'MULE':'MULE (Ground Tactical Vehicle)',

  // ── Miscellaneous Trailers ────────────────────────────────────────
  'M1061':'Generator Trailer',
  'M200A1':'Generator Trailer',
  'M105':'Cargo Trailer (1.5-Ton)',
  'M105A2':'Cargo Trailer (1.5-Ton)',
  'M116':'Cargo Trailer (3/4-Ton)',
  'M101':'Cargo Trailer (3/4-Ton)',
  'M101A2':'Cargo Trailer (3/4-Ton)',
  'M101A3':'Cargo Trailer (3/4-Ton)',
  'M1095':'MTV Trailer',
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
  const parts = qualString.split(':');
  const model = parts[0].trim();
  
  // Layer 1 — check the map first
  if (EQUIP_MAP[model]) return EQUIP_MAP[model];
  
  // Layer 2 — not in map, clean up the raw GCSS string
  if (parts.length > 1) {
    const nomenclature = parts[1].trim();
    return `${model} — ${nomenclature}`;
  }
  return model;
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
