import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  UserPlus,
  Wallet,
  Store,
  ClipboardList,
  RefreshCw,
  BarChart3,
  Home,
  Wifi,
  WifiOff,
  User,
  Bell,
  Volume2,
  VolumeX,
  Globe,
  HelpCircle,
  PlayCircle
} from 'lucide-react';

// --- ACCESSIBILITY CONTEXT ---
const AccessibilityContext = React.createContext();

export const useAccessibility = () => React.useContext(AccessibilityContext);

const AccessibilityProvider = ({ children }) => {
  const [lang, setLang] = useState('en'); // en, yo, ig, ha, fr
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [activeVoiceMsg, setActiveVoiceMsg] = useState(null);

  const translations = {
    en: { welcome: "Welcome to AgriSmart", reg: "Farmer Registration", wallet: "Digital Wallet", sync: "Offline Sync" },
    yo: { welcome: "E kaabo si AgriSmart", reg: "Iforukosile Agbe", wallet: "Apo Iwe Digital", sync: "Siki Offline" },
    ig: { welcome: "Nnọọ na AgriSmart", reg: "Ndebanye aha onye ọrụ ugbo", wallet: "Akpa ego Digital", sync: "Mmekọrịta Offline" },
    ha: { welcome: "Barka da zuwa AgriSmart", reg: "Rijistar Manoma", wallet: "Wallet na Dijitalụ", sync: "Sync na Offline" },
    fr: { welcome: "Bienvenue sur AgriSmart", reg: "Enregistrement des agriculteurs", wallet: "Portefeuille numérique", sync: "Sync hors ligne" }
  };

  const speak = (key, text) => {
    if (!voiceEnabled) return;

    // Add native tone hint based on language for the visual overlay
    const toneHints = {
      yo: "[Native Yoruba Tone] ",
      ig: "[Native Igbo Tone] ",
      ha: "[Native Hausa Tone] ",
      fr: "[French Accent] ",
      en: "[English Assistant] "
    };

    setActiveVoiceMsg({ key, text: (toneHints[lang] || "") + text, lang });

    // --- ACTUAL AUDIO OUTPUT (Web Speech API) ---
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);

      // Load available voices
      const voices = window.speechSynthesis.getVoices();

      let selectedVoice = null;

      // Attempt to find native voices or Nigerian English as fallback
      if (lang === 'yo') {
        selectedVoice = voices.find(v => v.lang.includes('yo') || v.name.toLowerCase().includes('yoruba')) ||
          voices.find(v => v.lang === 'en-NG' || v.name.toLowerCase().includes('nigeria'));
      } else if (lang === 'ig') {
        selectedVoice = voices.find(v => v.lang.includes('ig') || v.name.toLowerCase().includes('igbo')) ||
          voices.find(v => v.lang === 'en-NG' || v.name.toLowerCase().includes('nigeria'));
      } else if (lang === 'ha') {
        selectedVoice = voices.find(v => v.lang.includes('ha') || v.name.toLowerCase().includes('hausa')) ||
          voices.find(v => v.lang === 'en-NG' || v.name.toLowerCase().includes('nigeria'));
      } else if (lang === 'fr') {
        selectedVoice = voices.find(v => v.lang.startsWith('fr'));
      }

      if (selectedVoice) {
        // If we found a specific native or local voice, use it
        utterance.voice = selectedVoice;
      } else {
        // Ultimate fallbacks
        const voiceMap = { en: 'en-US', fr: 'fr-FR', yo: 'en-NG', ig: 'en-NG', ha: 'en-NG' };
        utterance.lang = voiceMap[lang] || 'en-US';
      }

      // Adjust tone to sound more natural for African languages when using a synthesizer
      utterance.rate = 0.85; // Slightly slower for clarity
      utterance.pitch = lang === 'fr' || lang === 'en' ? 1.0 : 0.9;

      window.speechSynthesis.speak(utterance);
    }

    // Simulate overlay duration
    setTimeout(() => setActiveVoiceMsg(null), 5000);
  };

  return (
    <AccessibilityContext.Provider value={{ lang, setLang, voiceEnabled, setVoiceEnabled, speak, t: translations[lang] }}>
      {children}
      {activeVoiceMsg && (
        <div className="voice-overlay fade-in">
          <div className="voice-wave">
            <span></span><span></span><span></span>
          </div>
          <div className="voice-text">
            <span className="voice-lang-tag">{activeVoiceMsg.lang.toUpperCase()}</span>
            <p>{activeVoiceMsg.text}</p>
          </div>
        </div>
      )}
    </AccessibilityContext.Provider>
  );
};

import {
  LandingPage,
  RegistrationPage,
  FarmerDashboard,
  AdminDashboard,
  DealerPortal,
  LedgerPage,
  SyncQueuePage,
  ImpactDashboard,
  AgriSmartAcademy
} from './pages/Pages';

const SidebarItem = ({ to, icon: Icon, label, active }) => (
  <Link to={to} style={{ textDecoration: 'none' }}>
    <div className={`sidebar-item ${active ? 'active' : ''}`}>
      <Icon size={20} />
      <span>{label}</span>
    </div>
  </Link>
);

const Navbar = ({ isOnline, toggleMode, onOpenAcademy }) => {
  const { lang, setLang, voiceEnabled, setVoiceEnabled } = useAccessibility();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="logo">AS</div>
        <div className="brand-text">
          <span className="brand-name">AGRISMART</span>
          <span className="brand-sub">CONNECT + SAFEFARM360</span>
        </div>
      </div>

      <div className="nav-actions">
        <div className="nav-lang-picker">
          <Globe size={16} />
          <select value={lang} onChange={(e) => setLang(e.target.value)}>
            <option value="en">English</option>
            <option value="yo">Yoruba</option>
            <option value="ig">Igbo</option>
            <option value="ha">Hausa</option>
            <option value="fr">French</option>
          </select>
        </div>

        <button
          className={`nav-voice-toggle ${voiceEnabled ? 'active' : ''}`}
          onClick={() => setVoiceEnabled(!voiceEnabled)}
          title={voiceEnabled ? "Voice On" : "Voice Off"}
        >
          {voiceEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>

        <button className="nav-academy-btn" onClick={onOpenAcademy} title="AgriSmart Academy">
          <HelpCircle size={16} />
          <span>AgriSmart Academy</span>
        </button>

        <div className="v-divider"></div>

        <button
          onClick={toggleMode}
          className={`mode-toggle ${isOnline ? 'mode-online' : 'mode-offline'}`}
        >
          {isOnline ? <Wifi size={16} /> : <WifiOff size={16} />}
          {isOnline ? 'ONLINE MODE' : 'OFFLINE MODE'}
        </button>

        <div className="v-divider"></div>

        <div className="nav-icon"><Bell size={20} /></div>
        <div className="nav-profile">
          <div className="profile-img"><User size={18} /></div>
          <div className="profile-info">
            <span className="profile-name">Admin</span>
            <span className="profile-role">System Administrator</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

function AppContent() {
  const [isOnline, setIsOnline] = useState(true);
  const [syncQueue, setSyncQueue] = useState([]);
  const [showAcademy, setShowAcademy] = useState(false);
  const location = useLocation();
  const { speak, lang, voiceEnabled } = useAccessibility();

  // Handle screen summaries on route change
  useEffect(() => {
    if (!voiceEnabled) return;

    const summaries = {
      '/': {
        en: "Landing page. National subsidy infrastructure overview.",
        yo: "Oju opo ìbẹ̀rẹ̀. Akopọ amayederun iranlowo orilẹ-ede.",
        ig: "Ihu mbụ. Nchịkọta akụrụngwa gọọmentị.",
        ha: "Babban shafi. Bayanin tallafin kasa.",
        fr: "Page d'accueil. Aperçu de l'infrastructure nationale."
      },
      '/admin': {
        en: "Admin Dashboard. View national metrics and farmer list.",
        yo: "Oju-iwe iṣakoso. Wo awọn iṣiro orilẹ-ede.",
        ig: "Dashboard nchịkwa. Lelee ọnụ ọgụgụ gọọmentị.",
        ha: "Dashboard na Admin. Duba kididdigar kasa.",
        fr: "Tableau de bord administrateur. Voir les statistiques nationales."
      },
      '/register': {
        en: "Farmer Enrollment. Enter farmer details for registration.",
        yo: "Iforukọsilẹ Agbe. Tẹ alaye agbe fun iforukọsilẹ.",
        ig: "Ndebanye aha onye ọrụ ugbo. Tinye nkọwa.",
        ha: "Rijistar Manoma. Shigar da bayanai.",
        fr: "Inscription des agriculteurs. Saisissez les détails."
      },
      '/farmer': {
        en: "Your Digital Wallet. Check balance and subsidy history.",
        yo: "Apo Iwe Digital rẹ. Wo iwọntunwọnsi owo rẹ.",
        ig: "Wallet dijitalụ gị. Lelee ego gị.",
        ha: "Walat dinku na dijitalụ. Duba kudin ku.",
        fr: "Votre portefeuille numérique. Vérifiez votre solde."
      },
      '/dealer': {
        en: "Redemption Portal. Verify farmer and disburse inputs.",
        yo: "Oju opo irapada. Jẹrisi agbe ki o fun wọn ni ajile.",
        ig: "Portal nnapụta. Nyochaa onye ọrụ ugbo.",
        ha: "Dandalin karbar kayayyaki. Tabbatar da manomi.",
        fr: "Portail de rachat. Vérifiez l'agriculteur."
      },
      '/ledger': {
        en: "Public Ledger. Trace all subsidy transactions live.",
        yo: "AgriTrace Ledger. Wo gbogbo awọn iṣowo rẹ.",
        ig: "AgriTrace Ledger. Chọpụta azụmahịa gị.",
        ha: "AgriTrace Ledger. Duba duk ma'amaloli.",
        fr: "Grand livre public. Suivez toutes les transactions."
      }
    };

    const msg = summaries[location.pathname];
    if (msg) {
      speak('summary', msg[lang] || msg.en);
    }
  }, [location.pathname, voiceEnabled, lang]);


  const toggleMode = () => {
    if (isOnline) {
      if (window.confirm("Are you sure you want to switch to OFFLINE MODE? Transactions will be queued locally until connection is restored.")) {
        setIsOnline(false);
      }
    } else {
      if (syncQueue.length > 0) {
        // Simulate sync when coming back online
        console.log('Syncing transactions...', syncQueue);
        // In a real app, we'd send these to the server
        localStorage.removeItem('agri_sync_queue');
        setSyncQueue([]);
        alert(`Successfully synced ${syncQueue.length} queued transactions to the AgriTrace ledger!`);
      }
      setIsOnline(true);
    }
  };

  const addToQueue = (txn) => {
    const newQueue = [...syncQueue, txn];
    setSyncQueue(newQueue);
    localStorage.setItem('agri_sync_queue', JSON.stringify(newQueue));
  };

  return (
    <div className="app-container">
      <Navbar isOnline={isOnline} toggleMode={toggleMode} onOpenAcademy={() => setShowAcademy(true)} />

      <div className="main-layout">
        <aside className="sidebar">
          <div className="sidebar-group">
            <p className="group-label">OVERVIEW</p>
            <SidebarItem to="/" icon={Home} label="Home" active={location.pathname === '/'} />
          </div>

          <div className="sidebar-group">
            <p className="group-label">GOVERNMENT ADMIN</p>
            <SidebarItem to="/admin" icon={LayoutDashboard} label="Admin Dashboard" active={location.pathname === '/admin'} />
            <SidebarItem to="/impact" icon={BarChart3} label="Impact Dashboard" active={location.pathname === '/impact'} />
          </div>

          <div className="sidebar-group">
            <p className="group-label">OPERATIONS</p>
            <SidebarItem to="/register" icon={UserPlus} label="Farmer Registration" active={location.pathname === '/register'} />
            <SidebarItem to="/dealer" icon={Store} label="Dealer Portal" active={location.pathname === '/dealer'} />
          </div>

          <div className="sidebar-group">
            <p className="group-label">FARMER PORTAL</p>
            <SidebarItem to="/farmer" icon={Wallet} label="My Wallet" active={location.pathname === '/farmer'} />
          </div>

          <div className="sidebar-group">
            <p className="group-label">INFRASTRUCTURE</p>
            <SidebarItem to="/ledger" icon={ClipboardList} label="AgriTrace Ledger" active={location.pathname === '/ledger'} />
            <SidebarItem to="/sync" icon={RefreshCw} label="Sync Queue" active={location.pathname === '/sync'} />
          </div>
        </aside>

        <main className="content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/admin" element={<AdminDashboard isOnline={isOnline} />} />
            <Route path="/register" element={<RegistrationPage isOnline={isOnline} />} />
            <Route path="/farmer" element={<FarmerDashboard isOnline={isOnline} />} />
            <Route path="/dealer" element={<DealerPortal isOnline={isOnline} addToQueue={addToQueue} />} />
            <Route path="/ledger" element={<LedgerPage isOnline={isOnline} />} />
            <Route path="/sync" element={<SyncQueuePage />} />
            <Route path="/impact" element={<ImpactDashboard isOnline={isOnline} />} />
          </Routes>
        </main>
      </div>

      {showAcademy && <AgriSmartAcademy onClose={() => setShowAcademy(false)} />}

      <style>{`
        .app-container {
          display: flex;
          flex-direction: column;
          height: 100vh;
          overflow: hidden;
        }

        .navbar {
          height: 70px;
          background: white;
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          z-index: 100;
        }

        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .logo {
          background: var(--primary);
          color: white;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 18px;
        }

        .brand-text {
          display: flex;
          flex-direction: column;
        }

        .brand-name {
          font-weight: 800;
          font-size: 16px;
          color: var(--primary);
          letter-spacing: 0.5px;
        }

        .brand-sub {
          font-size: 10px;
          font-weight: 600;
          color: var(--text-muted);
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .v-divider {
          width: 1px;
          height: 30px;
          background: var(--border);
        }

        .nav-icon {
          color: var(--text-muted);
          cursor: pointer;
        }

        .nav-profile {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .profile-img {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #f0f4f8;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary);
        }

        .profile-info {
          display: flex;
          flex-direction: column;
        }

        .profile-name {
          font-size: 13px;
          font-weight: 700;
        }

        .profile-role {
          font-size: 11px;
          color: var(--text-muted);
        }

        .main-layout {
          display: flex;
          flex: 1;
          overflow: hidden;
        }

        .sidebar {
          width: 260px;
          background: white;
          border-right: 1px solid var(--border);
          padding: 24px 0;
          overflow-y: auto;
        }

        .sidebar-group {
          margin-bottom: 24px;
        }

        .group-label {
          padding: 0 24px;
          font-size: 11px;
          font-weight: 800;
          color: var(--text-muted);
          margin-bottom: 12px;
          letter-spacing: 1px;
        }

        .sidebar-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 24px;
          color: var(--text-muted);
          transition: all 0.2s;
          font-weight: 600;
          font-size: 14px;
        }

        .sidebar-item:hover {
          background: #f8fafc;
          color: var(--primary);
        }

        .sidebar-item.active {
          background: #e8f5e9;
          color: var(--primary);
          border-right: 4px solid var(--primary);
        }

        .content {
          flex: 1;
          overflow-y: auto;
          background: var(--background);
        }

        @media (max-width: 992px) {
          .sidebar { width: 80px; }
          .sidebar span, .group-label { display: none; }
          .sidebar-item { justify-content: center; padding: 15px 0; }
        }
      `}</style>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AccessibilityProvider>
        <AppContent />
      </AccessibilityProvider>
    </Router>
  );
}
