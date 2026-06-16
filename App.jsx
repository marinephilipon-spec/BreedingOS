import React, { useState, useEffect } from 'react';
import {
  Home, Calendar as CalIcon, Heart, FileText, Plus, ChevronRight,
  ChevronLeft, MessageSquare, Sparkles, Clock, Activity, Syringe, Stethoscope,
  Hammer, Baby, Circle, CheckCircle2, AlertCircle, Loader2, Send, BookOpen, Layers, Bell, MoreHorizontal,
  Settings, Wifi, Signal, BatteryFull, X, ChevronDown,
} from 'lucide-react';

const C = {
  bg: '#F4F1E8', bgDeep: '#EBE6D6', surface: '#FFFFFF',
  ink: '#1A1814', inkSoft: '#3D3935', muted: '#807769', mutedSoft: '#A89F90',
  hairline: '#DDD5C2', hairlineSoft: '#E8E2D1',
  oxblood: '#6B2737', oxbloodSoft: '#8C3D4F',
  forest: '#2C3E2D', forestSoft: '#4A5F4B',
  sage: '#8A9A7B', brass: '#A87544', warn: '#B8860B', success: '#5C7A4A',
};

const today = () => new Date().toISOString().slice(0, 10);
const daysAgo = (n) => { const d = new Date(); d.setDate(d.getDate() - n); return d.toISOString().slice(0, 10); };
const daysAhead = (n) => { const d = new Date(); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); };

function formatDate(d, opts = {}) {
  const date = new Date(d);
  return date.toLocaleDateString('en-US', { month: opts.month || 'short', day: 'numeric', year: opts.year, ...opts });
}
function relativeDate(d) {
  const date = new Date(d); const now = new Date();
  now.setHours(0,0,0,0); date.setHours(0,0,0,0);
  const diff = Math.round((date - now) / 86400000);
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Tomorrow';
  if (diff === -1) return 'Yesterday';
  if (diff > 0 && diff < 7) return `In ${diff} days`;
  if (diff < 0 && diff > -7) return `${-diff} days ago`;
  return formatDate(d, { year: undefined });
}

const SAMPLE_HORSES = [
  { id: 'h1', name: 'Bella di Venezia', barnName: 'Bella', nickname: 'Bel', sex: 'mare', breed: 'KWPN', yob: 2018, color: 'Bay', height: '16.2 hh', discipline: 'Show Jumping', sire: 'Comme Il Faut', dam: 'Vita La Bella', damSire: 'Vivaldi', status: 'pregnant', breedingStatus: 'Heartbeat confirmed', breedingStatusDate: daysAgo(18), plannedStallion: 'Diamant de Semilly', inFoalTo: 'Diamant de Semilly', breedListYear: 2026, sireSire: 'Cornet Obolensky', sireDam: 'Ratina Z', damDam: 'Karina', damDamSire: 'Carthago', notes: 'Proven broodmare.', glyph: '◐' },
  { id: 'h3', name: 'Veronique', barnName: 'Roni', nickname: 'Ron', sex: 'mare', breed: 'KWPN', yob: 2020, color: 'Chestnut', height: '16.0 hh', discipline: 'Eventing', sire: 'Vivaldi', dam: 'Petite Fleur', damSire: 'Sandro Hit', status: 'active', breedingStatus: 'Waiting for cycle', breedingStatusDate: null, plannedStallion: 'Comet\'s Whisper', inFoalTo: null, breedListYear: 2026, sireSire: 'Krack C', sireDam: 'Renate Utopia', damDam: 'Fleur de Lis', damDamSire: 'Florencio', notes: 'Young mare.', glyph: '◓' },
  { id: 'h4', name: 'Aurelio', barnName: 'Reli', nickname: 'Aur', sex: 'foal', breed: 'KWPN', yob: 2025, color: 'Bay', height: '14.1 hh', discipline: 'Show Jumping', sire: 'Comet\'s Whisper', dam: 'Bella di Venezia', damSire: 'Vivaldi', status: 'active', breedingStatus: 'Foal', breedingStatusDate: daysAgo(140), plannedStallion: null, inFoalTo: null, breedListYear: null, sireSire: 'Cornet Obolensky', sireDam: 'Whisperwind', damDam: 'Vita La Bella', damDamSire: 'Comme Il Faut', notes: 'Promising mover.', glyph: '◒' },
  { id: 'h5', name: 'Francesca', barnName: 'Frankie', nickname: 'Fran', sex: 'mare', breed: 'KWPN', yob: 2019, color: 'Chestnut', height: '16.1 hh', discipline: 'Dressage', sire: 'Vivaldi', dam: 'Bella di Venezia', damSire: 'Comme Il Faut', status: 'active', breedingStatus: 'Inseminated', breedingStatusDate: daysAgo(5), plannedStallion: 'Comme Il Faut', inFoalTo: null, breedListYear: null, sireSire: 'Krack C', sireDam: 'Renate Utopia', damDam: 'Vita La Bella', damDamSire: 'Comme Il Faut', notes: 'Recently bred.', glyph: '◐' },
];

const SAMPLE_EVENTS = [
  { id: 'e1', horseId: 'h1', date: daysAgo(47), type: 'breeding', title: 'Bred to Diamant de Semilly', detail: 'Frozen AI · Dose 1 of 3 · Dr. Hansen' },
  { id: 'e2', horseId: 'h1', date: daysAgo(33), type: 'ultrasound', title: 'Pregnancy confirmed', detail: '14-day check, viable' },
  { id: 'e3', horseId: 'h1', date: daysAgo(18), type: 'ultrasound', title: 'Heartbeat detected', detail: '28-day check, normal' },
  { id: 'e4', horseId: 'h1', date: daysAgo(4), type: 'vet', title: 'Wellness check', detail: 'Vitals normal' },
  { id: 'e5', horseId: 'h2', date: daysAgo(12), type: 'collection', title: 'Semen collection', detail: '4 doses — 2 frozen, 2 shipped' },
  { id: 'e6', horseId: 'h2', date: daysAgo(60), type: 'vaccination', title: 'Spring vaccinations', detail: 'EWT, WNV, Rabies' },
  { id: 'e7', horseId: 'h3', date: daysAgo(8), type: 'farrier', title: 'Trim', detail: 'Six-week cycle' },
  { id: 'e8', horseId: 'h4', date: daysAgo(2), type: 'medical', title: 'Weaning complete', detail: 'Adjusting well' },
  { id: 'e9', horseId: 'h4', date: daysAgo(140), type: 'foaling', title: 'Born — colt', detail: 'Foaled 11:42 PM' },
];

const SAMPLE_REMINDERS = [
  { id: 'r1', horseId: 'h1', date: daysAhead(13), title: '60-day ultrasound', kind: 'ultrasound' },
  { id: 'r2', horseId: 'h3', date: daysAhead(2), title: 'Farrier — Pete Donnelly', kind: 'farrier' },
  { id: 'r3', horseId: 'h2', date: daysAhead(5), title: 'Semen shipment to Vermont', kind: 'logistics' },
  { id: 'r4', horseId: 'h4', date: daysAhead(21), title: 'Yearling vaccinations', kind: 'vet' },
];

const SAMPLE_SEMEN = [
  { id: 's1', stallion: "Comet's Whisper", type: 'Frozen', total: 12, used: 4, contract: 'Multi-Dose', location: 'My Tank' },
  { id: 's2', stallion: 'Diamant de Semilly', type: 'Frozen', total: 3, used: 1, contract: 'LFG', location: 'Vet' },
  { id: 's3', stallion: 'Comme Il Faut', type: 'Frozen', total: 1, used: 0, contract: 'Single', location: 'Not Yet Shipped' },
];

const SAMPLE_ACTIONS = [
  { id: 'a1', horseId: 'h1', title: 'Check follicle development', note: '50 mm follicle, good vascularity', dueDate: today(), priority: 'high', done: false },
  { id: 'a2', horseId: 'h3', title: 'Recheck for ovulation', note: '', dueDate: daysAhead(1), priority: 'high', done: false },
  { id: 'a3', horseId: 'h5', title: 'Ultrasound before breeding', note: 'Schedule with Dr. Hansen', dueDate: today(), priority: 'medium', done: false },
];

function parseEntry(text, horses) {
  if (!text.trim()) return null;
  const lower = text.toLowerCase();
  const horse = horses.find(h => 
    lower.includes(h.name.toLowerCase()) || 
    lower.includes(h.barnName.toLowerCase()) ||
    (h.nickname && lower.includes(h.nickname.toLowerCase()))
  );
  let date = today();
  if (lower.includes('yesterday')) date = daysAgo(1);
  else if (lower.includes('tomorrow')) date = daysAhead(1);
  else if (/\blast\s+week\b/.test(lower)) date = daysAgo(7);
  else { const m = lower.match(/(\d{1,2})\s+days?\s+ago/); if (m) date = daysAgo(parseInt(m[1])); }
  
  let type = 'note', title = text.trim(), detail = '';
  
  // Breeding-specific commands
  if (/\b(tease|teased)\b/.test(lower)) { 
    type = 'breeding'; 
    title = horse ? `${horse.barnName} teased` : 'Tease'; 
    detail = text.trim(); 
  }
  else if (/\b(follicle|follicles)\b/.test(lower)) { 
    type = 'breeding'; 
    const m = text.match(/(\d+)\s*mm/);
    title = m ? `Follicle ${m[1]}mm` : 'Follicle check'; 
    detail = text.trim(); 
  }
  else if (/\b(14[\s-]?day|16[\s-]?day|pregnancy.?check|twin)\b/.test(lower)) { 
    type = 'ultrasound'; 
    title = '14-day pregnancy check'; 
    detail = text.trim(); 
  }
  else if (/\b(28[\s-]?day|30[\s-]?day|heartbeat|viability|viable)\b/.test(lower)) { 
    type = 'ultrasound'; 
    title = '28-day viability check'; 
    detail = text.trim(); 
  }
  else if (/\b(status|change)\b/.test(lower)) {
    // Status change: "Bella status: inseminated" or "Frankie change to: heartbeat confirmed"
    const statuses = ['Waiting for cycle', 'Irregular cycle', 'Ready to breed', 'Inseminated', '14-day pregnancy check', 'Viability confirmed', 'Confirmed in foal', 'Lost - back open', 'Foal'];
    for (const status of statuses) {
      if (lower.includes(status.toLowerCase())) {
        return { horse, date, type: 'statusChange', status, title: `${horse?.barnName || 'Mare'} — ${status}`, detail: text.trim() };
      }
    }
  }
  else if (/\b(bred|breeding|inseminated|covered|insemination|to|breed to)\b/.test(lower)) { 
    type = 'breeding'; 
    const m = text.match(/(?:to|with)\s+([A-Z][a-zA-Z'\s-]+?)(?:\s+(?:today|yesterday|on|using|\.|,|$))/); 
    title = m ? `Bred to ${m[1].trim()}` : 'Breeding event'; 
    detail = text.trim(); 
  }
  else if (/\b(ultrasound|scan|pregnan|in foal|preg check)\b/.test(lower)) { 
    type = 'ultrasound'; 
    title = 'Ultrasound'; 
    detail = text.trim(); 
  }
  else if (/\b(vacc|shot|booster|west nile|ewt|rabies)\b/.test(lower)) { 
    type = 'vaccination'; 
    title = 'Vaccination'; 
    detail = text.trim(); 
  }
  else if (/\b(vet|veterinar|wellness|exam|colic|lameness|palpation)\b/.test(lower)) { 
    type = 'vet'; 
    title = 'Vet visit'; 
    detail = text.trim(); 
  }
  else if (/\b(farrier|trim|shoe|hoof|hooves)\b/.test(lower)) { 
    type = 'farrier'; 
    title = 'Farrier'; 
    detail = text.trim(); 
  }
  else if (/\b(foal(ed)?|born|delivered|colt|filly)\b/.test(lower)) { 
    type = 'foaling'; 
    title = 'Foaling'; 
    detail = text.trim(); 
  }
  else if (/\b(collect|collection|semen)\b/.test(lower)) { 
    type = 'collection'; 
    title = 'Collection'; 
    detail = text.trim(); 
  }
  else if (/\b(remind|schedule|book|appointment)\b/.test(lower)) { 
    type = 'reminder'; 
    title = text.trim(); 
  }
  
  return { horse, date, type, title, detail };
}

function Eyebrow({ children, style }) { return <div style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 500, color: C.muted, ...style }}>{children}</div>; }

function EventIcon({ type, size = 16 }) {
  const map = { breeding: Heart, ultrasound: Activity, vaccination: Syringe, vet: Stethoscope, farrier: Hammer, foaling: Baby, collection: Layers, medical: Stethoscope, note: MessageSquare, reminder: Bell, logistics: Heart };
  const Icon = map[type] || Circle;
  return <Icon size={size} strokeWidth={1.5} />;
}
function eventColor(type) {
  const map = { breeding: C.oxblood, ultrasound: C.forest, vaccination: C.brass, vet: C.forest, farrier: C.brass, foaling: C.oxblood, collection: C.forest, medical: C.forest, note: C.muted, reminder: C.oxblood, logistics: C.brass };
  return map[type] || C.muted;
}

function Tag({ children, color = C.muted }) {
  return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: 10.5, color, fontWeight: 500, padding: '2px 7px', background: 'white', border: `1px solid ${C.hairline}`, borderRadius: 100 }}>{children}</span>;
}

function Empty({ title, body }) {
  return (
    <div style={{ padding: '40px 20px', textAlign: 'center', border: `1px dashed ${C.hairline}` }}>
      <div style={{ fontSize: 16, fontStyle: 'italic', color: C.ink, fontFamily: 'Fraunces, Georgia, serif' }}>{title}</div>
      {body && <div style={{ fontSize: 12, color: C.muted, marginTop: 6 }}>{body}</div>}
    </div>
  );
}

function AppHeader({ title, eyebrow, action, onBack, large }) {
  if (large) {
    return (
      <div style={{ padding: '8px 20px 16px' }}>
        {onBack && (
          <button onClick={onBack} style={{
            background: 'transparent', border: 'none', color: C.muted,
            display: 'flex', alignItems: 'center', gap: 4, fontSize: 13,
            cursor: 'pointer', padding: '6px 0', marginBottom: 6, marginLeft: -4,
          }}>
            <ChevronLeft size={18} /> Back
          </button>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            <h1 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 30, fontWeight: 400, margin: '4px 0 0', letterSpacing: '-0.02em', lineHeight: 1.05 }}>{title}</h1>
          </div>
          {action}
        </div>
      </div>
    );
  }
  return (
    <div style={{
      padding: '10px 20px 12px', display: 'flex', alignItems: 'center', gap: 8,
      borderBottom: `1px solid ${C.hairlineSoft}`, background: C.bg,
      flexShrink: 0,
    }}>
      {onBack && (
        <button onClick={onBack} style={{
          background: 'transparent', border: 'none', color: C.ink,
          display: 'flex', alignItems: 'center', cursor: 'pointer', padding: 4,
          marginLeft: -4,
        }}>
          <ChevronLeft size={22} />
        </button>
      )}
      <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 17, fontWeight: 500, flex: 1, textAlign: onBack ? 'center' : 'left', marginRight: onBack ? 28 : 0 }}>{title}</div>
      {action}
    </div>
  );
}

function BottomTabBar({ tab, setTab }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'horses', label: 'Horses', icon: BookOpen },
    { id: 'calendar', label: 'Calendar', icon: CalIcon },
    { id: 'breeding', label: 'Breeding', icon: Heart },
    { id: 'more', label: 'More', icon: MoreHorizontal },
  ];
  return (
    <div style={{
      borderTop: `1px solid ${C.hairline}`, background: 'rgba(244, 241, 232, 0.92)',
      paddingBottom: 18, paddingTop: 6, flexShrink: 0,
      display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)',
    }}>
      {tabs.map(t => {
        const Icon = t.icon;
        const active = tab === t.id;
        return (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            background: 'transparent', border: 'none',
            padding: '6px 4px 4px', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
            color: active ? C.oxblood : C.muted,
          }}>
            <Icon size={20} strokeWidth={active ? 2 : 1.5} />
            <span style={{ fontSize: 10, fontWeight: active ? 500 : 400 }}>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function CommandCenter({ horses, onSubmit }) {
  const [text, setText] = useState('');
  const [parsed, setParsed] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const [showMediaMenu, setShowMediaMenu] = useState(false);
  const fileInputRef = React.useRef(null);
  const cameraInputRef = React.useRef(null);

  useEffect(() => { setParsed(text.trim() ? parseEntry(text, horses) : null); }, [text, horses]);

  const handleSubmit = async () => {
    if ((!parsed || !text.trim()) && attachments.length === 0) return;
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 240));
    onSubmit(parsed, text, attachments);
    setText('');
    setAttachments([]);
    setShowMediaMenu(false);
    setSubmitting(false);
  };

  const handleFileSelect = (e, isCamera = false) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const attachment = {
          id: `att_${Date.now()}_${Math.random()}`,
          name: file.name,
          type: file.type,
          data: event.target.result,
          isCamera,
        };
        setAttachments(prev => [...prev, attachment]);
      };
      reader.readAsDataURL(file);
    });
    setShowMediaMenu(false);
  };

  const handleRemoveAttachment = (attId) => {
    setAttachments(prev => prev.filter(a => a.id !== attId));
  };

  const prompts = [
    'Bella teased today',
    'Roni follicle 50mm',
    'Frankie status: inseminated',
    '14-day ultrasound for Bella',
  ];

  return (
    <div style={{
      background: C.surface, border: `1px solid ${C.hairline}`,
      borderRadius: 8, overflow: 'hidden',
    }}>
      {/* Main Input Area */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '14px 14px' }}>
        <Sparkles size={17} strokeWidth={1.5} style={{ color: C.oxblood, marginTop: 3, flexShrink: 0 }} />
        <textarea
          value={text} onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(); } }}
          placeholder="What happened today…"
          rows={Math.min(4, text.split('\n').length || 1)}
          style={{
            flex: 1, border: 'none', resize: 'none', background: 'transparent',
            fontSize: 15, color: C.ink, lineHeight: 1.45, padding: 0,
            fontFamily: 'inherit', minHeight: 22,
          }}
        />
        
        {/* Media Button */}
        <div style={{ position: 'relative', zIndex: 100 }}>
          <button onClick={() => setShowMediaMenu(!showMediaMenu)} style={{
            background: showMediaMenu ? C.oxblood : C.bgDeep,
            color: showMediaMenu ? 'white' : C.muted,
            border: 'none', borderRadius: 6, width: 32, height: 32,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', flexShrink: 0, fontSize: 16,
            position: 'relative', zIndex: 101,
          }}>
            +
          </button>

          {/* Media Menu - Opens above button */}
          {showMediaMenu && (
            <div style={{
              position: 'absolute', bottom: 'calc(100% + 8px)', right: 0, background: C.surface,
              border: `1px solid ${C.hairline}`, borderRadius: 8, overflow: 'hidden',
              boxShadow: '0 -4px 12px rgba(0,0,0,0.15)', zIndex: 102,
              minWidth: 220,
            }}>
              <button onClick={() => fileInputRef.current?.click()} style={{
                width: '100%', padding: '12px 16px', background: 'transparent',
                border: 'none', textAlign: 'left', cursor: 'pointer',
                fontSize: 13, color: C.ink, borderBottom: `1px solid ${C.hairline}`,
                display: 'flex', alignItems: 'center', gap: 8,
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => e.target.style.background = C.bg}
              onMouseLeave={(e) => e.target.style.background = 'transparent'}>
                📁 Documents & Photos
              </button>
              <button onClick={() => cameraInputRef.current?.click()} style={{
                width: '100%', padding: '12px 16px', background: 'transparent',
                border: 'none', textAlign: 'left', cursor: 'pointer',
                fontSize: 13, color: C.ink,
                display: 'flex', alignItems: 'center', gap: 8,
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => e.target.style.background = C.bg}
              onMouseLeave={(e) => e.target.style.background = 'transparent'}>
                📷 Take Photo
              </button>
              <input
                ref={fileInputRef}
                type="file"
                onChange={(e) => handleFileSelect(e, false)}
                multiple
                accept="image/*,.pdf,.doc,.docx"
                style={{ display: 'none' }}
              />
              <input
                ref={cameraInputRef}
                type="file"
                onChange={(e) => handleFileSelect(e, true)}
                accept="image/*"
                capture="environment"
                style={{ display: 'none' }}
              />
            </div>
          )}
        </div>

        {/* Send Button */}
        <button onClick={handleSubmit} disabled={(!parsed || !text.trim()) && attachments.length === 0 || submitting} style={{
          background: (parsed || attachments.length > 0) ? C.oxblood : C.bgDeep,
          color: (parsed || attachments.length > 0) ? 'white' : C.muted,
          border: 'none', borderRadius: 6, width: 32, height: 32,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: (parsed || attachments.length > 0) ? 'pointer' : 'default', flexShrink: 0,
        }}>
          {submitting ? <Loader2 size={13} /> : <Send size={13} />}
        </button>
      </div>

      {/* Attachments Preview */}
      {attachments.length > 0 && (
        <div style={{
          padding: '10px 14px', borderTop: `1px solid ${C.hairlineSoft}`,
          background: C.bg, display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center',
        }}>
          {attachments.map(att => (
            <div key={att.id} style={{
              position: 'relative',
              width: 60, height: 60,
              borderRadius: 6,
              overflow: 'hidden',
              border: `1px solid ${C.hairline}`,
              background: C.surface,
            }}>
              {att.type.includes('image') ? (
                <>
                  <img src={att.data} alt={att.name} style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                  }} />
                  {att.isCamera && <div style={{
                    position: 'absolute', top: 2, right: 2, fontSize: 10, background: C.oxblood,
                    color: 'white', padding: '1px 4px', borderRadius: 3,
                  }}>📷</div>}
                </>
              ) : (
                <div style={{
                  width: '100%', height: '100%', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', fontSize: 20,
                }}>📄</div>
              )}
              <button onClick={() => handleRemoveAttachment(att.id)} style={{
                position: 'absolute', top: -6, right: -6,
                width: 20, height: 20, borderRadius: '50%',
                background: C.oxblood, color: 'white',
                border: 'none', cursor: 'pointer', fontSize: 12,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>✕</button>
            </div>
          ))}
        </div>
      )}

      {/* Parsed Preview & Prompts */}
      {(parsed || (!text && attachments.length === 0)) && (
        <>
          {parsed && (
            <div style={{
              padding: '10px 14px', borderTop: `1px solid ${C.hairlineSoft}`,
              background: C.bg, display: 'flex', gap: 6, flexWrap: 'wrap',
            }}>
              <Tag color={parsed.type === 'statusChange' ? C.oxblood : eventColor(parsed.type)}>
                {parsed.type === 'statusChange' ? <Heart size={10} /> : <EventIcon type={parsed.type} size={10} />}
                <span style={{ textTransform: 'capitalize' }}>{parsed.type === 'statusChange' ? 'Status' : parsed.type}</span>
              </Tag>
              {parsed.horse ? (
                <Tag color={C.ink}>
                  <span style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.oxblood }}>{parsed.horse.glyph}</span>
                  {parsed.horse.barnName}
                </Tag>
              ) : (
                <Tag color={C.warn}><AlertCircle size={10} /> No horse</Tag>
              )}
              <Tag color={C.muted}><Clock size={10} /> {relativeDate(parsed.date)}</Tag>
            </div>
          )}

          {!text && attachments.length === 0 && (
            <div style={{
              padding: '8px 14px 14px', display: 'flex', gap: 5, overflowX: 'auto',
              borderTop: `1px solid ${C.hairlineSoft}`,
            }}>
              {prompts.map((p, i) => (
                <button key={i} onClick={() => setText(p)} style={{
                  background: 'transparent', border: `1px solid ${C.hairlineSoft}`,
                  borderRadius: 100, padding: '4px 10px', fontSize: 11,
                  color: C.muted, cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0,
                }}>{p}</button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

function HomeScreen({ horses, events, reminders, actions, onCommand, goHorse, onToggleAction, onAddAction }) {
  const recent = [...events].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
  const openActions = actions.filter(a => !a.done);
  const todayActions = openActions.filter(a => a.dueDate === today());
  const overdueActions = openActions.filter(a => a.dueDate < today());
  const [showActionForm, setShowActionForm] = useState(false);
  const [actionForm, setActionForm] = useState({ horseId: '', title: '', note: '', dueDate: today(), priority: 'medium', attachments: [] });
  const [fileInputKey, setFileInputKey] = useState(0);
  const [actionFilter, setActionFilter] = useState('today'); // 'today', 'all', 'overdue'

  const handleAddAction = () => {
    if (!actionForm.horseId || !actionForm.title) return;
    onAddAction(actionForm);
    setActionForm({ horseId: '', title: '', note: '', dueDate: today(), priority: 'medium', attachments: [] });
    setShowActionForm(false);
    setFileInputKey(prev => prev + 1);
  };

  const handleFileAdd = (e) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const attachment = {
          id: `att_${Date.now()}_${Math.random()}`,
          name: file.name,
          type: file.type,
          data: event.target.result,
          size: file.size,
        };
        setActionForm(prev => ({
          ...prev,
          attachments: [...(prev.attachments || []), attachment]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveAttachment = (attId) => {
    setActionForm(prev => ({
      ...prev,
      attachments: (prev.attachments || []).filter(a => a.id !== attId)
    }));
  };

  const getFilteredActions = () => {
    if (actionFilter === 'today') return todayActions;
    if (actionFilter === 'overdue') return overdueActions;
    return openActions;
  };

  const filteredActions = getFilteredActions();

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <AppHeader large eyebrow={`${new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}`} title={`${todayActions.length} ${todayActions.length === 1 ? 'action' : 'actions'} today`} />

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
        {/* Command Center */}
        <CommandCenter horses={horses} onSubmit={onCommand} />

        {/* Actions Section */}
        <div style={{ marginTop: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 20, fontWeight: 400, margin: 0 }}>Actions</h2>
            <button onClick={() => setShowActionForm(!showActionForm)} style={{
              background: showActionForm ? C.bg : C.oxblood,
              color: showActionForm ? C.oxblood : 'white',
              border: `1px solid ${showActionForm ? C.hairline : C.oxblood}`,
              borderRadius: 6, padding: '6px 12px', fontSize: 11, cursor: 'pointer', fontWeight: 500,
            }}>+ Add</button>
          </div>

          {/* Filter Tabs */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 12, flexWrap: 'wrap' }}>
            {[
              { id: 'today', label: `Today (${todayActions.length})` },
              { id: 'all', label: `All (${openActions.length})` },
              { id: 'overdue', label: `Overdue (${overdueActions.length})` },
            ].map(f => (
              <button key={f.id} onClick={() => setActionFilter(f.id)} style={{
                background: actionFilter === f.id ? C.ink : 'transparent',
                color: actionFilter === f.id ? 'white' : C.inkSoft,
                border: `1px solid ${actionFilter === f.id ? C.ink : C.hairline}`,
                borderRadius: 100, padding: '5px 12px', fontSize: 11,
                cursor: 'pointer', fontWeight: actionFilter === f.id ? 500 : 400,
              }}>{f.label}</button>
            ))}
          </div>

          {/* Action Form */}
          {showActionForm && (
            <div style={{ background: C.surface, border: `1px solid ${C.hairline}`, borderRadius: 8, padding: '14px', marginBottom: 16 }}>
              <div style={{ marginBottom: 12 }}>
                <Eyebrow style={{ marginBottom: 6 }}>Mare</Eyebrow>
                <select value={actionForm.horseId} onChange={(e) => setActionForm({...actionForm, horseId: e.target.value})} style={{
                  width: '100%', fontSize: 13, padding: '8px', background: C.bg, border: `1px solid ${C.hairline}`, borderRadius: 5, color: C.ink,
                }}>
                  <option value="">Select mare…</option>
                  {horses.filter(h => h.sex === 'mare').map(h => <option key={h.id} value={h.id}>{h.barnName} ({h.name})</option>)}
                </select>
              </div>

              <div style={{ marginBottom: 12 }}>
                <Eyebrow style={{ marginBottom: 6 }}>Action</Eyebrow>
                <input value={actionForm.title} onChange={(e) => setActionForm({...actionForm, title: e.target.value})} placeholder="e.g. Check follicle, Vet appointment…" style={{
                  width: '100%', fontSize: 13, padding: '8px', background: C.bg, border: `1px solid ${C.hairline}`, borderRadius: 5, color: C.ink,
                }} />
              </div>

              <div style={{ marginBottom: 12 }}>
                <Eyebrow style={{ marginBottom: 6 }}>Notes</Eyebrow>
                <textarea value={actionForm.note} onChange={(e) => setActionForm({...actionForm, note: e.target.value})} placeholder="e.g. 50mm follicle, good vascularity…" rows={2} style={{
                  width: '100%', fontSize: 13, padding: '8px', background: C.bg, border: `1px solid ${C.hairline}`, borderRadius: 5, color: C.ink, fontFamily: 'inherit', resize: 'none',
                }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
                <div>
                  <Eyebrow style={{ marginBottom: 6 }}>Due date</Eyebrow>
                  <input type="date" value={actionForm.dueDate} onChange={(e) => setActionForm({...actionForm, dueDate: e.target.value})} style={{
                    width: '100%', fontSize: 13, padding: '8px', background: C.bg, border: `1px solid ${C.hairline}`, borderRadius: 5, color: C.ink,
                  }} />
                </div>
                <div>
                  <Eyebrow style={{ marginBottom: 6 }}>Priority</Eyebrow>
                  <select value={actionForm.priority} onChange={(e) => setActionForm({...actionForm, priority: e.target.value})} style={{
                    width: '100%', fontSize: 13, padding: '8px', background: C.bg, border: `1px solid ${C.hairline}`, borderRadius: 5, color: C.ink,
                  }}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              {/* File Upload */}
              <div style={{ marginBottom: 12 }}>
                <Eyebrow style={{ marginBottom: 6 }}>Attachments (passport, contract, ultrasound…)</Eyebrow>
                <label style={{
                  display: 'block', padding: '12px', background: C.bg, border: `2px dashed ${C.hairline}`, borderRadius: 6,
                  cursor: 'pointer', textAlign: 'center', fontSize: 11, color: C.muted,
                  marginBottom: actionForm.attachments?.length > 0 ? 10 : 0,
                }}>
                  <input key={fileInputKey} type="file" onChange={handleFileAdd} multiple accept="image/*,.pdf,.doc,.docx" style={{ display: 'none' }} />
                  📎 Click to add files
                </label>

                {actionForm.attachments?.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {actionForm.attachments.map(att => (
                      <div key={att.id} style={{
                        display: 'flex', alignItems: 'center', gap: 8, padding: '8px', background: C.bgDeep, borderRadius: 5, fontSize: 11,
                      }}>
                        <span>{att.type.includes('image') ? '🖼️' : '📄'}</span>
                        <div style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: C.ink }}>
                          {att.name}
                        </div>
                        <button onClick={() => handleRemoveAttachment(att.id)} style={{
                          background: 'transparent', color: C.muted, border: 'none', cursor: 'pointer', padding: 0, fontSize: 14,
                        }}>✕</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={handleAddAction} style={{
                  flex: 1, padding: '10px', background: C.oxblood, color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 500,
                }}>Save action</button>
                <button onClick={() => { setShowActionForm(false); setActionForm({ horseId: '', title: '', note: '', dueDate: today(), priority: 'medium', attachments: [] }); }} style={{
                  flex: 1, padding: '10px', background: C.bg, color: C.ink, border: `1px solid ${C.hairline}`, borderRadius: 6, cursor: 'pointer',
                }}>Cancel</button>
              </div>
            </div>
          )}

          {/* Actions List */}
          {filteredActions.length === 0 ? (
            <div style={{ padding: '16px', background: C.bg, borderRadius: 6, fontSize: 12, color: C.muted, textAlign: 'center', marginBottom: 24 }}>
              {actionFilter === 'today' && 'No actions today'}
              {actionFilter === 'overdue' && 'No overdue actions'}
              {actionFilter === 'all' && 'No pending actions'}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
              {filteredActions.map(a => <ActionCard key={a.id} action={a} horse={horses.find(h => h.id === a.horseId)} onToggle={onToggleAction} />)}
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div>
          <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 18, fontWeight: 400, margin: '0 0 12px 0' }}>Recent</h2>
          {recent.length === 0 ? (
            <Empty title="No activity yet" />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {recent.map(e => {
                const horse = horses.find(h => h.id === e.horseId);
                return (
                  <button key={e.id} onClick={() => horse && goHorse('horse', horse.id)} style={{
                    width: '100%', display: 'flex', gap: 10, padding: '11px 12px', alignItems: 'flex-start',
                    background: C.surface, border: `1px solid ${C.hairline}`, borderRadius: 6, cursor: 'pointer', textAlign: 'left',
                  }}>
                    <div style={{ color: eventColor(e.type), paddingTop: 2 }}><EventIcon type={e.type} size={13} /></div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12.5, color: C.ink, fontWeight: 500 }}>{e.title}</div>
                      <div style={{ fontSize: 10.5, color: C.muted, marginTop: 2 }}>
                        {horse && <>{horse.barnName} · </>}{relativeDate(e.date)}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ActionCard({ action, horse, onToggle }) {
  const [showAttachments, setShowAttachments] = useState(false);
  const priorityColor = { high: C.oxblood, medium: C.brass, low: C.muted }[action.priority] || C.muted;
  
  return (
    <div style={{
      background: C.surface,
      border: `1px solid ${C.hairline}`,
      borderRadius: 6,
      padding: '10px',
      borderLeft: `3px solid ${priorityColor}`,
    }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
        <button onClick={() => onToggle(action.id)} style={{
          width: 18, height: 18, borderRadius: '50%', border: `2px solid ${priorityColor}`,
          background: 'transparent', cursor: 'pointer', flexShrink: 0, marginTop: 2, padding: 0,
        }} title="Mark done" />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12.5, fontWeight: 500, color: C.ink, marginBottom: 2 }}>{action.title}</div>
          {action.note && <div style={{ fontSize: 11, color: C.inkSoft, marginBottom: 3 }}>{action.note}</div>}
          <div style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 9.5, color: C.muted, flexWrap: 'wrap' }}>
            {horse && <span>{horse.barnName}</span>}
            {horse && action.dueDate && <span>•</span>}
            {action.dueDate && <span>{relativeDate(action.dueDate)}</span>}
            {action.attachments?.length > 0 && (
              <>
                <span>•</span>
                <button onClick={() => setShowAttachments(!showAttachments)} style={{
                  background: 'transparent', border: 'none', cursor: 'pointer', color: C.oxblood, fontWeight: 600, padding: 0, fontSize: '9.5px',
                }}>
                  {action.attachments.length} 📎
                </button>
              </>
            )}
          </div>

          {/* Attachments Preview */}
          {showAttachments && action.attachments?.length > 0 && (
            <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.hairlineSoft}`, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {action.attachments.map(att => (
                <div key={att.id} style={{ background: C.bg, borderRadius: 4, overflow: 'hidden' }}>
                  {att.type.includes('image') ? (
                    <img src={att.data} alt={att.name} style={{
                      width: '100%', height: 'auto', maxHeight: 150, objectFit: 'cover',
                    }} />
                  ) : (
                    <div style={{
                      padding: '8px', background: C.bgDeep, display: 'flex', alignItems: 'center', gap: 6,
                    }}>
                      <span style={{ fontSize: 14 }}>📄</span>
                      <div style={{ fontSize: 10, color: C.muted, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
                        {att.name}
                      </div>
                    </div>
                  )}
                  <div style={{ padding: '4px 6px', background: C.surface, fontSize: 9, color: C.muted, borderTop: `1px solid ${C.hairline}` }}>
                    {att.name}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function HorsesScreen({ horses, goHorse, onToggleBreedList }) {
  const [filter, setFilter] = useState('all');
  const mares = horses.filter(h => h.sex === 'mare');
  const filtered = filter === 'all' ? horses : 
    filter === 'mare' ? mares :
    filter === 'foal' ? horses.filter(h => h.sex === 'foal') :
    filter === 'pregnant' ? horses.filter(h => h.status === 'pregnant') :
    horses;
  
  const filters = [
    { id: 'all', label: 'All' },
    { id: 'mare', label: 'Mares' },
    { id: 'foal', label: 'Foals' },
    { id: 'pregnant', label: 'In foal' },
  ];

  const getNextAction = (horse) => {
    if (horse.sex === 'foal') return { text: 'Foal', color: C.muted };
    if (horse.status === 'pregnant') {
      const statusDate = horse.breedingStatusDate;
      if (statusDate) {
        const daysPregnant = Math.floor((new Date() - new Date(statusDate)) / (1000 * 60 * 60 * 24));
        const foalingWindow = 340 - daysPregnant;
        if (foalingWindow > 0) {
          return { text: `Foal in ${foalingWindow} days`, color: C.oxblood };
        }
      }
      return { text: 'Ready to foal', color: C.oxblood };
    }
    if (horse.breedingStatus === 'Waiting for cycle') return { text: 'Waiting for heat', color: C.brass };
    if (horse.breedingStatus === 'Inseminated') return { text: 'Pregnancy check (14 days)', color: C.forest };
    if (horse.breedingStatus === 'Confirmed in foal') return { text: 'Monitor pregnancy', color: C.oxblood };
    return { text: horse.breedingStatus || 'Not breeding', color: C.muted };
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <AppHeader large eyebrow="All horses" title={`Horses (${horses.length})`} />

      <div style={{ display: 'flex', gap: 6, padding: '0 16px 12px', overflowX: 'auto', flexShrink: 0 }}>
        {filters.map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)} style={{
            background: filter === f.id ? C.ink : 'transparent',
            color: filter === f.id ? 'white' : C.inkSoft,
            border: `1px solid ${filter === f.id ? C.ink : C.hairline}`,
            borderRadius: 100, padding: '5px 12px', fontSize: 12,
            cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0,
            fontWeight: filter === f.id ? 500 : 400,
          }}>{f.label}</button>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filtered.map(h => {
            const nextAction = getNextAction(h);
            const currentYear = new Date().getFullYear();
            const onBreedList = h.breedListYear === currentYear;
            
            return (
              <div key={h.id} style={{
                background: C.surface, border: `1px solid ${C.hairline}`, borderRadius: 8,
                overflow: 'hidden',
              }}>
                <button onClick={() => goHorse('horse', h.id)} style={{
                  width: '100%', padding: '14px 14px', cursor: 'pointer', textAlign: 'left',
                  display: 'flex', gap: 12, alignItems: 'flex-start', background: 'transparent', border: 'none',
                }}>
                  <div style={{
                    width: 48, height: 48, background: C.bgDeep, borderRadius: 6,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <span style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 26, color: C.oxblood }}>{h.glyph}</span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                      <h3 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 15.5, margin: 0, fontWeight: 500, letterSpacing: '-0.01em', color: C.ink, flex: 1 }}>{h.name}</h3>
                      {onBreedList && <span style={{ fontSize: 10, background: C.oxblood, color: 'white', padding: '2px 6px', borderRadius: 3, whiteSpace: 'nowrap', fontWeight: 500 }}>Season 2026</span>}
                    </div>
                    <div style={{ fontSize: 11, color: C.muted, marginBottom: 6 }}>{h.sex === 'mare' ? 'Mare' : 'Foal'} · {h.breed} · {h.yob}</div>
                    <div style={{ fontSize: 12, color: nextAction.color, fontWeight: 500 }}>{nextAction.text}</div>
                  </div>
                  <ChevronRight size={16} color={C.mutedSoft} style={{ flexShrink: 0, marginTop: 2 }} />
                </button>

                {/* Breed List Toggle - Only for mares */}
                {h.sex === 'mare' && (
                  <button onClick={(e) => { e.stopPropagation(); onToggleBreedList(h.id); }} style={{
                    width: '100%', padding: '8px 14px', background: C.bg, border: 'none',
                    borderTop: `1px solid ${C.hairline}`, cursor: 'pointer', textAlign: 'left',
                    fontSize: 11, color: onBreedList ? C.oxblood : C.muted, fontWeight: onBreedList ? 500 : 400,
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={(e) => e.target.style.background = C.bgDeep}
                  onMouseLeave={(e) => e.target.style.background = C.bg}>
                    {onBreedList ? '✓ On 2026 breed list' : '+ Add to 2026 breed list'}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function HorseDetailScreen({ horse, events, actions, horses, onUpdateBreedingStatus, onUpdateStallion, onMarkInFoal, onUpdateNickname, onToggleBreedList, onBack }) {
  const [tab, setTab] = useState('timeline');
  const [editNickname, setEditNickname] = useState(false);
  const [nicknameText, setNicknameText] = useState(horse.nickname || '');
  const horseEvents = events.filter(e => e.horseId === horse.id).sort((a, b) => b.date.localeCompare(a.date));
  const horseActions = actions.filter(a => a.horseId === horse.id && !a.done).sort((a, b) => a.dueDate.localeCompare(b.dueDate));
  const nextAction = horseActions[0];
  
  const breedingStatuses = ['Waiting for cycle', 'Irregular cycle', 'Ready to breed', 'Inseminated', '14-day pregnancy check', 'Viability confirmed', 'Confirmed in foal', 'Lost - back open', 'Foal'];
  const stallionOptions = ['Comet\'s Whisper', 'Diamant de Semilly', 'Comme Il Faut', 'Other'];
  
  const isActivelyBreeding = ['Waiting for cycle', 'Irregular cycle', 'Ready to breed', 'Inseminated', '14-day pregnancy check', 'Viability confirmed', 'Confirmed in foal'].includes(horse.breedingStatus);

  const handleSaveNickname = () => {
    onUpdateNickname(horse.id, nicknameText);
    setEditNickname(false);
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <AppHeader title={horse.barnName} onBack={onBack} />

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
        {/* Breeding Status Card - EDITABLE */}
        <div style={{ background: C.surface, border: `1px solid ${C.hairline}`, borderRadius: 8, padding: '16px', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
            <div>
              <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 24, fontWeight: 400, letterSpacing: '-0.02em', marginBottom: 4 }}>{horse.name}</div>
              {horse.nickname && (
                <div style={{ fontSize: 12, color: C.muted, fontStyle: 'italic' }}>Also called "{horse.nickname}"</div>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 28, color: C.oxblood }}>{horse.glyph}</span>
            </div>
          </div>

          {/* Nickname Editor */}
          {editNickname ? (
            <div style={{ marginBottom: 14, padding: '10px 12px', background: C.bgDeep, borderRadius: 6, display: 'flex', gap: 6 }}>
              <input value={nicknameText} onChange={(e) => setNicknameText(e.target.value)} placeholder="e.g. Roma, Bel, Frankie…" style={{
                flex: 1,
                fontFamily: 'inherit',
                fontSize: 13,
                padding: '8px 10px',
                background: 'white',
                border: `1px solid ${C.hairline}`,
                borderRadius: 5,
                color: C.ink,
              }} />
              <button onClick={handleSaveNickname} style={{
                padding: '6px 10px',
                background: C.oxblood,
                color: 'white',
                border: 'none',
                borderRadius: 5,
                fontSize: 11,
                cursor: 'pointer',
                fontWeight: 500,
                whiteSpace: 'nowrap',
              }}>Save</button>
              <button onClick={() => { setEditNickname(false); setNicknameText(horse.nickname || ''); }} style={{
                padding: '6px 10px',
                background: C.bg,
                color: C.ink,
                border: `1px solid ${C.hairline}`,
                borderRadius: 5,
                fontSize: 11,
                cursor: 'pointer',
              }}>Cancel</button>
            </div>
          ) : (
            <div style={{ marginBottom: 14, padding: '10px 12px', background: C.bgDeep, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <Eyebrow style={{ marginBottom: 4 }}>Chat shortcut</Eyebrow>
                <div style={{ fontSize: 13, color: C.ink }}>
                  {horse.nickname ? `Use "${horse.nickname}" in chat` : 'Add a nickname to use in chat'}
                </div>
              </div>
              <button onClick={() => setEditNickname(true)} style={{
                padding: '6px 10px',
                background: 'transparent',
                color: C.oxblood,
                border: `1px solid ${C.oxblood}`,
                borderRadius: 5,
                fontSize: 11,
                cursor: 'pointer',
                fontWeight: 500,
                whiteSpace: 'nowrap',
              }}>Edit</button>
            </div>
          )}

          {/* Status Dropdown */}
          <div style={{ marginBottom: 14, padding: '10px 12px', background: isActivelyBreeding ? C.bgDeep : C.hairlineSoft, borderRadius: 6 }}>
            <Eyebrow style={{ marginBottom: 6 }}>Breeding status</Eyebrow>
            <select value={horse.breedingStatus} onChange={(e) => onUpdateBreedingStatus(horse.id, e.target.value)} style={{
              width: '100%',
              fontFamily: 'Fraunces, Georgia, serif',
              fontSize: 16,
              fontWeight: 500,
              padding: '8px 10px',
              background: 'white',
              border: `1px solid ${C.hairline}`,
              borderRadius: 5,
              color: isActivelyBreeding ? C.oxblood : C.muted,
            }}>
              {breedingStatuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            {horse.breedingStatusDate && (
              <div style={{ fontSize: 10.5, color: C.muted, marginTop: 6 }}>Since {formatDate(horse.breedingStatusDate, { year: undefined })}</div>
            )}
          </div>

          {/* Next Action */}
          {nextAction ? (
            <div style={{ padding: '10px 12px', background: C.bgDeep, borderRadius: 6, marginBottom: 14, borderLeft: `3px solid ${{ high: C.oxblood, medium: C.brass, low: C.muted }[nextAction.priority]}` }}>
              <Eyebrow style={{ marginBottom: 6 }}>Next action</Eyebrow>
              <div style={{ fontSize: 14, fontWeight: 500, color: C.ink, marginBottom: 4 }}>{nextAction.title}</div>
              {nextAction.note && <div style={{ fontSize: 12, color: C.inkSoft, marginBottom: 4 }}>{nextAction.note}</div>}
              <div style={{ fontSize: 10.5, color: C.muted }}>Due {relativeDate(nextAction.dueDate)}</div>
            </div>
          ) : (
            <div style={{ padding: '10px 12px', background: C.bgDeep, borderRadius: 6, marginBottom: 14 }}>
              <Eyebrow style={{ marginBottom: 4 }}>No pending actions</Eyebrow>
            </div>
          )}

          {/* Breeding Plan - Stallion Dropdown */}
          <div style={{ padding: '10px 12px', background: C.hairlineSoft, borderRadius: 6 }}>
            <Eyebrow style={{ marginBottom: 6 }}>Breeding plan</Eyebrow>
            {horse.inFoalTo ? (
              <div style={{ fontSize: 14, color: C.ink, fontWeight: 500, marginBottom: 8 }}>
                In foal to: <strong>{horse.inFoalTo}</strong>
              </div>
            ) : horse.sex === 'mare' ? (
              <div>
                <select value={horse.plannedStallion || ''} onChange={(e) => onUpdateStallion(horse.id, e.target.value)} style={{
                  width: '100%',
                  fontSize: 13,
                  padding: '8px 10px',
                  background: 'white',
                  border: `1px solid ${C.hairline}`,
                  borderRadius: 5,
                  marginBottom: 8,
                }}>
                  <option value="">Select stallion…</option>
                  {stallionOptions.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                {horse.plannedStallion && (
                  <button onClick={() => onMarkInFoal(horse.id, horse.plannedStallion)} style={{
                    width: '100%',
                    padding: '6px',
                    background: C.oxblood,
                    color: 'white',
                    border: 'none',
                    borderRadius: 5,
                    fontSize: 11,
                    cursor: 'pointer',
                    fontWeight: 500,
                  }}>Mark as inseminated</button>
                )}
              </div>
            ) : (
              <div style={{ fontSize: 14, color: C.muted, fontStyle: 'italic' }}>Not a mare</div>
            )}
          </div>

          {/* Breed List Toggle - Only for mares */}
          {horse.sex === 'mare' && (
            <div style={{ padding: '10px 12px', background: C.bgDeep, borderRadius: 6, cursor: 'pointer', border: `1px solid ${C.hairline}` }} onClick={() => handleToggleBreedList?.(horse.id)}>
              <Eyebrow style={{ marginBottom: 6 }}>2026 Season</Eyebrow>
              <div style={{ fontSize: 13, color: C.ink, fontWeight: 500 }}>
                {horse.breedListYear === 2026 ? '✓ On breed list' : '+ Add to breed list'}
              </div>
            </div>
          )}
        </div>

        {/* Tabs for Timeline, Pedigree, Medical */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 16, overflowX: 'auto' }}>
          {['timeline', 'pedigree', 'medical'].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              background: tab === t ? C.ink : 'transparent',
              color: tab === t ? 'white' : C.inkSoft,
              border: `1px solid ${tab === t ? C.ink : C.hairline}`,
              borderRadius: 100, padding: '5px 12px', fontSize: 11,
              cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0,
              textTransform: 'capitalize',
            }}>{t}</button>
          ))}
        </div>

        {/* Tab Content */}
        {tab === 'timeline' && (
          <div>
            {horseEvents.length === 0 ? <Empty title="No events yet" /> : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {horseEvents.map(e => (
                  <div key={e.id} style={{ background: C.surface, border: `1px solid ${C.hairline}`, borderRadius: 6, padding: '12px', borderLeft: `3px solid ${eventColor(e.type)}` }}>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                      <div style={{ color: eventColor(e.type), paddingTop: 2 }}><EventIcon type={e.type} size={14} /></div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, color: C.ink, fontWeight: 500 }}>{e.title}</div>
                        {e.detail && <div style={{ fontSize: 11, color: C.inkSoft, marginTop: 4 }}>{e.detail}</div>}
                        <div style={{ fontSize: 10, color: C.muted, marginTop: 4 }}>{formatDate(e.date)} · {relativeDate(e.date)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === 'pedigree' && (
          <div>
            <Eyebrow style={{ marginBottom: 10 }}>Four generations</Eyebrow>
            <div style={{ background: C.surface, border: `1px solid ${C.hairline}`, borderRadius: 6, overflow: 'hidden' }}>
              <PedRow label="Sire" value={horse.sire} />
              <PedRow label="Sire's Sire" value={horse.sireSire} />
              <PedRow label="Sire's Dam" value={horse.sireDam} />
              <PedRow label="Dam" value={horse.dam} />
              <PedRow label="Dam's Sire" value={horse.damSire} />
              <PedRow label="Dam's Dam" value={horse.damDam} last />
            </div>
          </div>
        )}

        {tab === 'medical' && (
          <div>
            {horseEvents.filter(e => ['vet', 'vaccination', 'medical', 'farrier'].includes(e.type)).length === 0 ? 
              <Empty title="No medical records" /> : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {horseEvents.filter(e => ['vet', 'vaccination', 'medical', 'farrier'].includes(e.type)).map(e => (
                  <div key={e.id} style={{ background: C.surface, border: `1px solid ${C.hairline}`, borderRadius: 6, padding: '12px', borderLeft: `3px solid ${eventColor(e.type)}` }}>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                      <div style={{ color: eventColor(e.type), paddingTop: 2 }}><EventIcon type={e.type} size={14} /></div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, color: C.ink, fontWeight: 500 }}>{e.title}</div>
                        {e.detail && <div style={{ fontSize: 11, color: C.inkSoft, marginTop: 4 }}>{e.detail}</div>}
                        <div style={{ fontSize: 10, color: C.muted, marginTop: 4 }}>{formatDate(e.date)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function PedRow({ label, value, last }) {
  return (
    <div style={{ padding: '11px 14px', borderBottom: last ? 'none' : `1px solid ${C.hairlineSoft}` }}>
      <Eyebrow style={{ fontSize: 9 }}>{label}</Eyebrow>
      <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 13, fontWeight: 400, color: C.ink, marginTop: 1 }}>
        {value || <span style={{ color: C.mutedSoft, fontStyle: 'italic' }}>Unknown</span>}
      </div>
    </div>
  );
}

function Detail({ label, value, cap }) {
  if (!value) return null;
  return (
    <div style={{ background: C.bg, border: `1px solid ${C.hairlineSoft}`, padding: '6px 10px', borderRadius: 4 }}>
      <div style={{ fontSize: 9.5, color: C.muted, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</div>
      <div style={{ fontSize: 12, color: C.ink, textTransform: cap ? 'capitalize' : 'none', marginTop: 1 }}>{value}</div>
    </div>
  );
}

function CalendarScreen({ events, reminders, horses }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month'); // 'day', 'week', 'month'
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const all = [
    ...events.map(e => ({ ...e, kind: 'event' })),
    ...reminders.map(r => ({ ...r, type: r.kind, kind: 'reminder' })),
  ];

  const getDayEvents = (date) => {
    const dateStr = date.toISOString().slice(0, 10);
    return all.filter(item => item.date === dateStr);
  };

  const eventColor = (type) => {
    const colors = {
      'breeding': C.oxblood,
      'ultrasound': C.forest,
      'vaccination': C.brass,
      'vet': C.forest,
      'farrier': C.brass,
      'foaling': C.oxblood,
      'collection': C.forest,
      'medical': C.forest,
      'note': C.muted,
      'reminder': C.oxblood,
      'logistics': C.brass,
    };
    return colors[type] || C.muted;
  };

  // Day View
  const DayView = () => {
    const dayEvents = getDayEvents(currentDate);
    const isToday = currentDate.toDateString() === new Date().toDateString();
    
    return (
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <button onClick={() => setCurrentDate(new Date(currentDate.getTime() - 86400000))} style={{
            background: 'transparent', border: 'none', cursor: 'pointer', color: C.muted, padding: 4
          }}><ChevronLeft size={24} /></button>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 26, fontWeight: 400, margin: '0 0 4px 0' }}>
              {currentDate.toLocaleDateString('en-US', { weekday: 'long' })}
            </h3>
            <div style={{ fontSize: 14, color: C.muted }}>
              {currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
          </div>
          <button onClick={() => setCurrentDate(new Date(currentDate.getTime() + 86400000))} style={{
            background: 'transparent', border: 'none', cursor: 'pointer', color: C.muted, padding: 4
          }}><ChevronRight size={24} /></button>
        </div>

        {dayEvents.length === 0 ? (
          <Empty title="No events today" />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {dayEvents.map(e => {
              const horse = horses.find(h => h.id === e.horseId);
              return (
                <div key={e.id} style={{ background: C.surface, border: `1px solid ${C.hairline}`, borderRadius: 6, padding: '14px', borderLeft: `3px solid ${eventColor(e.type)}` }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 8 }}>
                    <div style={{ color: eventColor(e.type) }}><EventIcon type={e.type} size={16} /></div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 500, color: C.ink }}>{e.title}</div>
                      {horse && <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{horse.barnName}</div>}
                    </div>
                  </div>
                  {e.detail && <div style={{ fontSize: 13, color: C.inkSoft, padding: '8px 12px', background: C.bg, borderRadius: 4 }}>{e.detail}</div>}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  // Week View
  const WeekView = () => {
    const weekStart = new Date(currentDate);
    weekStart.setDate(currentDate.getDate() - currentDate.getDay());
    const days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(weekStart);
      d.setDate(weekStart.getDate() + i);
      return d;
    });

    return (
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <button onClick={() => setCurrentDate(new Date(weekStart.getTime() - 604800000))} style={{
            background: 'transparent', border: 'none', cursor: 'pointer', color: C.muted, padding: 4
          }}><ChevronLeft size={24} /></button>
          <h3 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 22, fontWeight: 400, margin: 0 }}>
            Week of {days[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </h3>
          <button onClick={() => setCurrentDate(new Date(weekStart.getTime() + 604800000))} style={{
            background: 'transparent', border: 'none', cursor: 'pointer', color: C.muted, padding: 4
          }}><ChevronRight size={24} /></button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8 }}>
          {days.map((d, idx) => {
            const dayEvents = getDayEvents(d);
            const isToday = d.toDateString() === new Date().toDateString();
            return (
              <div key={idx} style={{
                background: isToday ? C.bgDeep : C.surface,
                border: `1px solid ${C.hairline}`,
                borderRadius: 6,
                padding: '8px',
                display: 'flex',
                flexDirection: 'column',
                minHeight: 140,
              }}>
                <div style={{
                  textAlign: 'center',
                  paddingBottom: 8,
                  borderBottom: `1px solid ${C.hairlineSoft}`,
                  marginBottom: 8,
                }}>
                  <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 14, fontWeight: 500, color: isToday ? C.oxblood : C.ink }}>
                    {d.getDate()}
                  </div>
                  <div style={{ fontSize: 9, color: C.muted }}>{d.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 3, flex: 1, minHeight: 0 }}>
                  {dayEvents.slice(0, 2).map((e, i) => (
                    <div key={i} style={{
                      fontSize: 8,
                      color: 'white',
                      background: eventColor(e.type),
                      padding: '2px 4px',
                      borderRadius: 2,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      fontWeight: 500,
                    }}>{e.title}</div>
                  ))}
                  {dayEvents.length > 2 && <div style={{ fontSize: 8, color: C.muted, fontWeight: 500, marginTop: 2 }}>+{dayEvents.length - 2}</div>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Month View
  const MonthView = () => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return (
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <button onClick={() => setCurrentDate(new Date(year, month - 1))} style={{
            background: 'transparent', border: 'none', cursor: 'pointer', color: C.muted, padding: 4
          }}><ChevronLeft size={24} /></button>
          <h3 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 26, fontWeight: 400, margin: 0 }}>
            {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h3>
          <button onClick={() => setCurrentDate(new Date(year, month + 1))} style={{
            background: 'transparent', border: 'none', cursor: 'pointer', color: C.muted, padding: 4
          }}><ChevronRight size={24} /></button>
        </div>

        <div style={{ border: `1px solid ${C.hairline}`, borderRadius: 8, overflow: 'hidden', background: C.surface }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 0 }}>
            {/* Headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d, i) => (
              <div key={`header-${d}`} style={{
                textAlign: 'center',
                fontSize: 12,
                color: C.muted,
                fontWeight: 600,
                padding: '10px 0',
                borderBottom: `1px solid ${C.hairline}`,
                borderRight: i < 6 ? `1px solid ${C.hairline}` : 'none',
              }}>{d}</div>
            ))}

            {/* Empty before */}
            {Array.from({ length: startingDayOfWeek }).map((_, i) => (
              <div key={`empty-before-${i}`} style={{
                background: C.bgDeep,
                height: 80,
                borderRight: i < startingDayOfWeek - 1 ? `1px solid ${C.hairline}` : `1px solid ${C.hairline}`,
                borderBottom: `1px solid ${C.hairline}`,
              }} />
            ))}

            {/* Days */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dateObj = new Date(year, month, day);
              const dayEvents = getDayEvents(dateObj);
              const isToday = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
              const cellIndex = startingDayOfWeek + i;
              const isLastInRow = cellIndex % 7 === 6;

              return (
                <div key={`day-${day}`} style={{
                  background: isToday ? C.bgDeep : C.surface,
                  padding: '6px 4px',
                  height: 80,
                  display: 'flex',
                  flexDirection: 'column',
                  borderRight: !isLastInRow ? `1px solid ${C.hairline}` : 'none',
                  borderBottom: `1px solid ${C.hairline}`,
                  overflow: 'hidden',
                }}>
                  <div style={{
                    fontFamily: 'Fraunces, Georgia, serif',
                    fontSize: 14,
                    fontWeight: 500,
                    color: isToday ? C.oxblood : C.ink,
                    marginBottom: 3,
                    lineHeight: 1,
                  }}>{day}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1, minHeight: 0, overflow: 'hidden' }}>
                    {dayEvents.slice(0, 1).map((e, idx) => (
                      <div key={idx} style={{
                        fontSize: 7.5,
                        color: 'white',
                        background: eventColor(e.type),
                        padding: '1px 3px',
                        borderRadius: 2,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        fontWeight: 500,
                      }}>{e.title}</div>
                    ))}
                    {dayEvents.length > 1 && (
                      <div style={{ fontSize: 7, color: C.muted, fontWeight: 500, marginTop: 1 }}>+{dayEvents.length - 1}</div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Empty after */}
            {Array.from({ length: 42 - (startingDayOfWeek + daysInMonth) }).map((_, i) => {
              const cellIndex = startingDayOfWeek + daysInMonth + i;
              const isLastInRow = cellIndex % 7 === 6;
              return (
                <div key={`empty-after-${i}`} style={{
                  background: C.bgDeep,
                  height: 80,
                  borderRight: !isLastInRow ? `1px solid ${C.hairline}` : 'none',
                }} />
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <AppHeader large eyebrow="Schedule" title="Calendar" />

      {/* View toggles */}
      <div style={{ display: 'flex', gap: 4, padding: '10px 16px', borderBottom: `1px solid ${C.hairline}`, flexShrink: 0 }}>
        {['day', 'week', 'month'].map(v => (
          <button key={v} onClick={() => setView(v)} style={{
            background: view === v ? C.ink : 'transparent',
            color: view === v ? 'white' : C.inkSoft,
            border: `1px solid ${view === v ? C.ink : C.hairline}`,
            borderRadius: 100,
            padding: '6px 14px',
            fontSize: 12,
            cursor: 'pointer',
            fontWeight: view === v ? 500 : 400,
            textTransform: 'capitalize',
          }}>{v}</button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, padding: '16px' }}>
        {view === 'day' && <DayView />}
        {view === 'week' && <WeekView />}
        {view === 'month' && <MonthView />}
      </div>
    </div>
  );
}

function BreedingScreen({ horses, events, onUpdateBreedingStatus, goHorse }) {
  const mares = horses.filter(h => h.sex === 'mare');
  const breedingStatuses = ['Waiting for cycle', 'Short cycling', 'Inseminated', '14 day pregnancy confirmed', 'Heartbeat confirmed', 'Confirmed in foal', 'Lost - back open'];

  const statusColor = (status) => {
    const colors = {
      'Waiting for cycle': C.brass,
      'Short cycling': C.warn,
      'Inseminated': C.forest,
      '14 day pregnancy confirmed': C.forest,
      'Heartbeat confirmed': C.oxblood,
      'Confirmed in foal': C.oxblood,
      'Lost - back open': C.muted,
    };
    return colors[status] || C.muted;
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <AppHeader large eyebrow="Active mares" title={`Breeding (${mares.length})`} />

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {mares.map(mare => (
            <div key={mare.id} style={{ background: C.surface, border: `1px solid ${C.hairline}`, borderRadius: 8, overflow: 'hidden' }}>
              <button onClick={() => goHorse('horse', mare.id)} style={{
                width: '100%', display: 'flex', gap: 12, padding: '14px', alignItems: 'flex-start',
                background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left',
              }}>
                <div style={{
                  width: 40, height: 40, background: C.bgDeep, borderRadius: 6,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <span style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 22, color: C.oxblood }}>{mare.glyph}</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 15, margin: '0 0 4px 0', fontWeight: 500, letterSpacing: '-0.01em' }}>{mare.name}</h3>
                  <div style={{ fontSize: 11, color: C.muted }}>{mare.barnName} · {mare.breed}</div>
                </div>
              </button>

              <div style={{ padding: '0 14px 12px', borderTop: `1px solid ${C.hairlineSoft}` }}>
                <Eyebrow style={{ marginBottom: 8 }}>Current status</Eyebrow>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 8, alignItems: 'center' }}>
                  <div style={{
                    background: statusColor(mare.breedingStatus),
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: 100,
                    fontSize: 12,
                    fontWeight: 500,
                    textAlign: 'center',
                  }}>
                    {mare.breedingStatus}
                  </div>
                  <button onClick={() => {
                    const nextStatus = breedingStatuses[(breedingStatuses.indexOf(mare.breedingStatus) + 1) % breedingStatuses.length];
                    onUpdateBreedingStatus(mare.id, nextStatus);
                  }} style={{
                    background: C.bgDeep, border: `1px solid ${C.hairline}`, borderRadius: 6,
                    padding: '6px 10px', fontSize: 11, cursor: 'pointer', color: C.ink,
                  }}>Change</button>
                </div>

                {mare.breedingStatusDate && (
                  <div style={{ fontSize: 10, color: C.muted, marginTop: 6 }}>
                    Since {formatDate(mare.breedingStatusDate, { year: undefined })}
                  </div>
                )}

                {['Heartbeat confirmed', 'Confirmed in foal'].includes(mare.breedingStatus) && (
                  <button onClick={() => onUpdateBreedingStatus(mare.id, 'Lost - back open')} style={{
                    marginTop: 8, width: '100%', padding: '6px',
                    background: 'transparent', border: `1px solid ${C.warn}`, borderRadius: 6,
                    fontSize: 11, color: C.warn, cursor: 'pointer', fontWeight: 500,
                  }}>
                    Flag lost pregnancy
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {mares.length === 0 && <Empty title="No mares" body="Add mares to track breeding cycles." />}
      </div>
    </div>
  );
}

function SemenScreen({ semen, onBack, onAdd }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ stallion: '', type: 'Frozen', total: '', contract: 'Multi-Dose', location: 'My Tank' });

  const handleAdd = () => {
    if (!form.stallion || !form.total) return;
    onAdd({ ...form, total: parseInt(form.total), used: 0 });
    setForm({ stallion: '', type: 'Frozen', total: '', contract: 'Multi-Dose', location: 'My Tank' });
    setShowForm(false);
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <AppHeader title="Semen inventory" onBack={onBack} />

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
        <button onClick={() => setShowForm(!showForm)} style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          padding: '12px', background: 'transparent', border: `2px dashed ${C.hairline}`,
          borderRadius: 6, cursor: 'pointer', fontSize: 13, color: C.muted, marginBottom: 16,
        }}>
          <Plus size={16} /> Add inventory
        </button>

        {showForm && (
          <div style={{ background: C.surface, border: `1px solid ${C.hairline}`, borderRadius: 8, padding: '16px', marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 16, fontWeight: 500 }}>New inventory</div>
              <button onClick={() => setShowForm(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: C.muted }}><X size={18} /></button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <FormField label="Stallion" value={form.stallion} onChange={(v) => setForm({...form, stallion: v})} placeholder="e.g. Diamant de Semilly" />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <FormField label="Type" value={form.type} onChange={(v) => setForm({...form, type: v})} options={['Frozen', 'Fresh', 'Fresh-Chilled']} isSelect />
                <FormField label="Total doses" value={form.total} onChange={(v) => setForm({...form, total: v})} placeholder="e.g. 5" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <FormField label="Contract" value={form.contract} onChange={(v) => setForm({...form, contract: v})} options={['Single', 'Multi-Dose', 'LFG']} isSelect />
                <FormField label="Location" value={form.location} onChange={(v) => setForm({...form, location: v})} options={['My Tank', 'Vet', 'Not Yet Shipped']} isSelect />
              </div>

              <button onClick={handleAdd} style={{
                marginTop: 8, padding: '12px', background: C.oxblood, color: 'white',
                border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 500,
              }}>Save inventory</button>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {semen.map(s => {
            const remaining = s.total - s.used;
            const pct = (s.used / s.total) * 100;
            return (
              <div key={s.id} style={{ background: C.surface, border: `1px solid ${C.hairline}`, borderRadius: 8, padding: '14px 16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 16, fontWeight: 500, letterSpacing: '-0.01em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.stallion}</div>
                    <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{s.type} · {s.contract}</div>
                  </div>
                  <div style={{ textAlign: 'right', marginLeft: 10 }}>
                    <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 22, fontWeight: 500, color: remaining > 0 ? C.ink : C.muted, lineHeight: 1, letterSpacing: '-0.01em' }}>
                      {remaining}<span style={{ fontSize: 12, color: C.muted, fontWeight: 400 }}>/{s.total}</span>
                    </div>
                    <Eyebrow style={{ marginTop: 4, fontSize: 8 }}>Remaining</Eyebrow>
                  </div>
                </div>
                <div style={{ height: 3, background: C.hairlineSoft, borderRadius: 2, marginBottom: 8 }}>
                  <div style={{ height: '100%', width: `${100 - pct}%`, background: C.forest, borderRadius: 2 }} />
                </div>
                <div style={{ fontSize: 11, color: C.inkSoft }}>Location: <strong>{s.location}</strong></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function FormField({ label, value, onChange, placeholder, options, isSelect }) {
  return (
    <label style={{ display: 'block' }}>
      <Eyebrow style={{ marginBottom: 6 }}>{label}</Eyebrow>
      {isSelect ? (
        <select value={value} onChange={(e) => onChange(e.target.value)} style={{
          width: '100%', padding: '9px 11px', fontSize: 13.5,
          background: C.bg, border: `1px solid ${C.hairline}`, color: C.ink, borderRadius: 5,
        }}>
          <option value="">{label}…</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} style={{
          width: '100%', padding: '9px 11px', fontSize: 13.5,
          background: C.bg, border: `1px solid ${C.hairline}`, color: C.ink, borderRadius: 5,
        }} />
      )}
    </label>
  );
}

function MoreScreen({ onReset }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <AppHeader large eyebrow="Account" title="More" />
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 20px' }}>
        <div style={{ background: C.surface, border: `1px solid ${C.hairline}`, borderRadius: 8, padding: '16px', display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: C.forest, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 500 }}>SH</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 16, fontWeight: 500 }}>Sarah Hartwell</div>
            <div style={{ fontSize: 11.5, color: C.muted }}>Maple Ridge Farm</div>
          </div>
        </div>

        <button onClick={onReset} style={{
          marginTop: 24, width: '100%', padding: '12px',
          background: 'transparent', border: `1px solid ${C.hairline}`, borderRadius: 8,
          color: C.muted, fontSize: 12.5, cursor: 'pointer',
        }}>Reset to sample data</button>

        <div style={{ textAlign: 'center', fontSize: 10.5, color: C.mutedSoft, marginTop: 18 }}>
          BreedingOS · v0.2
        </div>
      </div>
    </div>
  );
}

function StatusBar() {
  const [time, setTime] = useState(() => new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: false }));
  useEffect(() => {
    const id = setInterval(() => setTime(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: false })), 30000);
    return () => clearInterval(id);
  }, []);
  return (
    <div style={{
      height: 48, paddingTop: 14, paddingLeft: 28, paddingRight: 28,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      fontSize: 14, fontWeight: 600, color: C.ink, flexShrink: 0,
    }}>
      <span>{time}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <Signal size={14} />
        <Wifi size={14} />
        <BatteryFull size={18} />
      </div>
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState('home');
  const [stack, setStack] = useState([]);
  const [horses, setHorses] = useState(SAMPLE_HORSES);
  const [events, setEvents] = useState(SAMPLE_EVENTS);
  const [reminders, setReminders] = useState(SAMPLE_REMINDERS);
  const [semen, setSemen] = useState(SAMPLE_SEMEN);
  const [actions, setActions] = useState(SAMPLE_ACTIONS);
  const [toast, setToast] = useState(null);

  const flash = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2200); };

  const handleCommand = (parsed, rawText, attachments = []) => {
    if (parsed.type === 'statusChange') {
      // Handle breeding status changes
      if (parsed.horse) {
        handleUpdateBreedingStatus(parsed.horse.id, parsed.status);
      }
    } else if (parsed.type === 'reminder') {
      setReminders([...reminders, { id: `r_${Date.now()}`, horseId: parsed.horse?.id, date: parsed.date, title: parsed.title, kind: 'reminder' }]);
      flash(`Reminder saved${parsed.horse ? ` for ${parsed.horse.barnName}` : ''}`);
    } else {
      setEvents([...events, { id: `e_${Date.now()}`, horseId: parsed.horse?.id, date: parsed.date, type: parsed.type, title: parsed.title, detail: parsed.detail || rawText, attachments }]);
      flash(`Logged${parsed.horse ? ` for ${parsed.horse.barnName}` : ''}${attachments.length > 0 ? ` with ${attachments.length} file${attachments.length !== 1 ? 's' : ''}` : ''}`);
    }
  };

  const handleAddAction = (actionData) => {
    setActions([...actions, { ...actionData, id: `a_${Date.now()}`, done: false }]);
    const mare = horses.find(h => h.id === actionData.horseId);
    flash(`Action added${mare ? ` for ${mare.barnName}` : ''}`);
  };

  const handleToggleAction = (actionId) => {
    setActions(actions.map(a => a.id === actionId ? { ...a, done: !a.done } : a));
    const action = actions.find(a => a.id === actionId);
    flash(action?.done ? 'Action undone' : 'Action completed');
  };

  const handleReset = () => {
    if (!confirm('Reset all data?')) return;
    setHorses(SAMPLE_HORSES);
    setEvents(SAMPLE_EVENTS);
    setReminders(SAMPLE_REMINDERS);
    setSemen(SAMPLE_SEMEN);
    setActions(SAMPLE_ACTIONS);
    flash('Reset complete');
  };

  const goHorse = (screen, param) => setStack([{ screen, param }]);
  const pop = () => setStack([]);
  const handleTab = (t) => { setTab(t); setStack([]); };

  const handleAddSemen = (item) => {
    setSemen([...semen, { ...item, id: `s_${Date.now()}` }]);
    flash('Inventory added');
  };

  const handleUpdateBreedingStatus = (horseId, newStatus) => {
    setHorses(horses.map(h => 
      h.id === horseId ? { ...h, breedingStatus: newStatus, breedingStatusDate: today() } : h
    ));
    const mare = horses.find(h => h.id === horseId);
    flash(`${mare.barnName} — ${newStatus}`);
  };

  const handleUpdatePlannedStallion = (horseId, stallionName) => {
    setHorses(horses.map(h => 
      h.id === horseId ? { ...h, plannedStallion: stallionName } : h
    ));
    const mare = horses.find(h => h.id === horseId);
    flash(`${mare.barnName} planned for ${stallionName}`);
  };

  const handleMarkInFoal = (horseId, stallionName) => {
    setHorses(horses.map(h => 
      h.id === horseId ? { ...h, inFoalTo: stallionName, status: 'pregnant' } : h
    ));
    const mare = horses.find(h => h.id === horseId);
    flash(`${mare.barnName} in foal to ${stallionName}`);
  };

  const handleUpdateNickname = (horseId, nickname) => {
    setHorses(horses.map(h => 
      h.id === horseId ? { ...h, nickname } : h
    ));
    const mare = horses.find(h => h.id === horseId);
    flash(`Nickname saved${nickname ? ` (${nickname})` : ''}`);
  };

  const handleToggleBreedList = (horseId) => {
    const horse = horses.find(h => h.id === horseId);
    const currentYear = new Date().getFullYear();
    const newBreedListYear = horse.breedListYear === currentYear ? null : currentYear;
    setHorses(horses.map(h => 
      h.id === horseId ? { ...h, breedListYear: newBreedListYear } : h
    ));
    const mare = horses.find(h => h.id === horseId);
    flash(newBreedListYear ? `${mare.barnName} added to ${currentYear} breed list` : `${mare.barnName} removed from breed list`);
  };

  const top = stack[0];

  const screen = (() => {
    if (top?.screen === 'horse') {
      const horse = horses.find(h => h.id === top.param);
      return horse ? <HorseDetailScreen horse={horse} events={events} actions={actions} horses={horses} onUpdateBreedingStatus={handleUpdateBreedingStatus} onUpdateStallion={handleUpdatePlannedStallion} onMarkInFoal={handleMarkInFoal} onUpdateNickname={handleUpdateNickname} onToggleBreedList={handleToggleBreedList} onBack={pop} /> : null;
    }
    if (top?.screen === 'semen') {
      return <SemenScreen semen={semen} onBack={pop} onAdd={handleAddSemen} />;
    }

    switch (tab) {
      case 'home': return <HomeScreen horses={horses} events={events} reminders={reminders} actions={actions} onCommand={handleCommand} goHorse={goHorse} onToggleAction={handleToggleAction} onAddAction={handleAddAction} />;
      case 'horses': return <HorsesScreen horses={horses} goHorse={goHorse} onToggleBreedList={handleToggleBreedList} />;
      case 'calendar': return <CalendarScreen events={events} reminders={reminders} horses={horses} />;
      case 'breeding': return <BreedingScreen horses={horses} events={events} goHorse={goHorse} onUpdateBreedingStatus={handleUpdateBreedingStatus} />;
      case 'more': return <MoreScreen onReset={handleReset} />;
      default: return null;
    }
  })();

  return (
    <div style={{
      fontFamily: 'IBM Plex Sans, system-ui, sans-serif',
      width: '100%',
      height: '100%',
      background: C.bg,
      borderRadius: 8,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      color: C.ink,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700&family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap');
      `}</style>
      <StatusBar />
      {/* Main content - scrollable, with padding for bottom tab bar */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {screen}
      </div>
      {/* Pinned bottom tab bar */}
      {!top && <BottomTabBar tab={tab} setTab={handleTab} />}
      {toast && (
        <div style={{
          position: 'fixed', bottom: 90, left: '50%', transform: 'translateX(-50%)',
          background: C.ink, color: C.bg, padding: '8px 14px', borderRadius: 100,
          fontSize: 12, zIndex: 200, display: 'flex', alignItems: 'center', gap: 6,
          whiteSpace: 'nowrap',
        }}>
          <CheckCircle2 size={12} color={C.sage} /> {toast}
        </div>
      )}
    </div>
  );
}
