import React, { useState, useEffect } from 'react';
import {
    Users,
    CreditCard,
    CheckCircle2,
    MapPin,
    ArrowUpRight,
    Search,
    Filter,
    Plus,
    Send,
    MoreVertical,
    ChevronRight,
    ShieldCheck,
    Wallet,
    History,
    QrCode,
    ArrowDownLeft,
    ShoppingBag,
    RefreshCcw,
    AlertCircle,
    Database,
    Layers,
    BarChart2,
    PieChart,
    Globe,
    PlayCircle,
    X
} from 'lucide-react';

// --- SHARED COMPONENTS ---

const StatCard = ({ title, value, subValue, icon: Icon, trend }) => (
    <div className="card stat-card">
        <div className="stat-header">
            <div className="stat-icon-wrapper">
                <Icon size={24} className="stat-icon" />
            </div>
            {trend && <span className={`trend ${trend > 0 ? 'trend-up' : 'trend-down'}`}>
                {trend > 0 ? '+' : ''}{trend}%
            </span>}
        </div>
        <div className="stat-body">
            <h3 className="stat-value">{value}</h3>
            <p className="stat-title">{title}</p>
            {subValue && <p className="stat-sub">{subValue}</p>}
        </div>
        <style>{`
      .stat-card {
        padding: 20px;
        position: relative;
        overflow: hidden;
      }
      .stat-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 12px;
      }
      .stat-icon-wrapper {
        background: #f0f4f8;
        padding: 10px;
        border-radius: 12px;
        color: var(--primary);
      }
      .stat-value {
        font-size: 24px;
        font-weight: 800;
        margin-bottom: 4px;
      }
      .stat-title {
        color: var(--text-muted);
        font-size: 13px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      .stat-sub {
        font-size: 11px;
        color: var(--primary);
        font-weight: 700;
        margin-top: 4px;
      }
      .trend {
        font-size: 12px;
        font-weight: 700;
        padding: 2px 8px;
        border-radius: 10px;
      }
      .trend-up { background: #e8f5e9; color: #2e7d32; }
      .trend-down { background: #ffebee; color: #c62828; }
    `}</style>
    </div>
);

// --- PAGES ---

import { Link } from 'react-router-dom';
import { useAccessibility } from '../App';

export const LandingPage = () => {
    const { speak, lang } = useAccessibility();

    useEffect(() => {
        speak('landing', lang === 'yo' ? "E kaabo si oju opo wẹẹbu Agrismart. Eto ti ṣetan." : "Welcome to the Agrismart platform. System ready.");
    }, []);
    return (
        <div className="landing-page fade-in">
            <div className="hero-section">
                <div className="hero-content">
                    <span className="hero-badge">NATIONAL SUBSIDY INFRASTRUCTURE</span>
                    <h1>Empowering Farmers with <br /><span className="text-highlight">Digital Transparency</span></h1>
                    <p>Agrismart Connect + Safefarm360 provides a secure, traceable, and offline-capable ledger for national agricultural subsidy distribution.</p>
                    <div className="hero-btns">
                        <Link to="/register"><button className="btn-primary">Get Started</button></Link>
                        <Link to="/impact"><button className="btn-secondary">Platform Overview</button></Link>
                    </div>
                </div>
                <div className="hero-image">
                    <div className="mock-dashboard">
                        <div className="mock-card"></div>
                        <div className="mock-card"></div>
                        <div className="mock-card lg"></div>
                    </div>
                </div>
            </div>
            <style>{`
        .landing-page { padding: 40px; }
        .hero-section {
          display: flex;
          align-items: center;
          gap: 60px;
          min-height: 60vh;
        }
        .hero-content { flex: 1; }
        .hero-badge {
          background: #e8f5e9;
          color: var(--primary);
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 800;
          margin-bottom: 20px;
          display: inline-block;
        }
        .hero-content h1 {
          font-size: 48px;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 20px;
        }
        .text-highlight { color: var(--primary); }
        .hero-content p {
          font-size: 18px;
          color: var(--text-muted);
          margin-bottom: 30px;
          max-width: 500px;
        }
        .hero-btns { display: flex; gap: 15px; }
        .hero-image { flex: 1; display: flex; justify-content: center; }
        .mock-dashboard {
          width: 100%;
          max-width: 450px;
          height: 350px;
          position: relative;
        }
        .mock-card {
          position: absolute;
          background: white;
          border-radius: 12px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          border: 1px solid var(--border);
        }
        .mock-card:nth-child(1) { width: 200px; height: 120px; top: 0; left: 0; z-index: 3; border-top: 5px solid var(--primary); }
        .mock-card:nth-child(2) { width: 180px; height: 180px; bottom: 0; right: 0; z-index: 2; border-top: 5px solid var(--secondary); }
        .mock-card.lg { width: 100%; height: 80%; top: 10%; left: 10%; z-index: 1; }
        @media (max-width: 768px) {
          .landing-page { padding: 20px; }
          .hero-section { flex-direction: column; text-align: center; gap: 40px; }
          .hero-content p { margin: 0 auto 30px auto; }
          .hero-btns { justify-content: center; flex-direction: column; width: 100%; }
          .hero-btns button { width: 100%; }
          .hero-content h1 { font-size: 32px; }
        }
      `}</style>
        </div>
    );
};

export const AdminDashboard = ({ isOnline }) => {
    const [metrics, setMetrics] = useState(null);
    const [farmers, setFarmers] = useState([]);
    const [filterState, setFilterState] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const { speak, lang } = useAccessibility();

    useEffect(() => {
        fetch('http://localhost:3001/api/metrics').then(r => r.json()).then(setMetrics);
        fetch('http://localhost:3001/api/farmers').then(r => r.json()).then(setFarmers);

        speak('admin', lang === 'yo' ? "Oju-iwe iṣakoso orilẹ-ede. E n ṣakoso awọn agbe." : "National Admin Dashboard. Monitoring farmer activity.");
    }, []);

    return (
        <div className="admin-dashboard fade-in">
            <div className="page-header">
                <div>
                    <h1 className="page-title">National Admin Console</h1>
                    <p className="page-subtitle">Monitoring subsidy distribution across 36 states.</p>
                </div>
                <div className="header-actions">
                    <div style={{ position: 'relative' }}>
                        <button className="btn-secondary" onClick={() => setShowFilters(!showFilters)}>
                            <Filter size={18} /> Filters {filterState && `(${filterState})`}
                        </button>
                        {showFilters && (
                            <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '8px', background: 'white', border: '1px solid var(--border)', borderRadius: '8px', boxShadow: 'var(--shadow)', padding: '15px', zIndex: 10, minWidth: '180px' }}>
                                <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', color: 'var(--text-muted)' }}>FILTER BY STATE</div>
                                <select
                                    value={filterState}
                                    onChange={(e) => { setFilterState(e.target.value); setShowFilters(false); }}
                                    style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border)' }}
                                >
                                    <option value="">All States</option>
                                    <option value="Kano">Kano</option>
                                    <option value="Oyo">Oyo</option>
                                    <option value="Benue">Benue</option>
                                    <option value="Lagos">Lagos</option>
                                    <option value="Abuja">Abuja</option>
                                </select>
                            </div>
                        )}
                    </div>
                    <Link to="/dealer"><button className="btn-primary"><Plus size={18} /> Disburse Subsidy</button></Link>
                </div>
            </div>

            <div className="dashboard-grid">
                <StatCard
                    title="Total Farmers Registered"
                    value={metrics?.totalFarmers.toLocaleString() || "8,540"}
                    icon={Users}
                    trend={12}
                />
                <StatCard
                    title="Total Subsidy Distributed"
                    value={"₦" + (metrics?.totalSubsidyDistributed / 1000000).toFixed(0) + "M"}
                    subValue="Fiscal Year 2026"
                    icon={CreditCard}
                />
                <StatCard
                    title="Dealer Redemption Rate"
                    value={(metrics?.redemptionRate || 86) + "%"}
                    icon={CheckCircle2}
                    trend={5}
                />
                <StatCard
                    title="Regions Covered"
                    value={(metrics?.regionsCovered || 22) + " LGAs"}
                    icon={MapPin}
                />
            </div>

            <div className="card">
                <div className="card-header">
                    <h2>Recent Farmer Registrations</h2>
                    <button className="text-btn">View All <ChevronRight size={16} /></button>
                </div>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>FARMER ID</th>
                            <th>NAME</th>
                            <th>LOCATION</th>
                            <th>CROP</th>
                            <th>FARM SIZE</th>
                            <th>STATUS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(filterState ? farmers.filter(f => f.state === filterState) : farmers).map(f => (
                            <tr key={f.id}>
                                <td className="id-cell">{f.id}</td>
                                <td>
                                    <div className="name-cell">
                                        <span className="name-val">{f.name}</span>
                                        <span className="phone-val">{f.phone}</span>
                                    </div>
                                </td>
                                <td>{f.lga}, {f.state}</td>
                                <td>{f.cropType}</td>
                                <td>{f.farmSize}</td>
                                <td><span className="badge badge-success">Verified</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <style>{`
        .admin-dashboard { padding: 30px; }
        .page-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 30px; }
        .page-title { font-size: 28px; font-weight: 800; color: var(--text-main); }
        .page-subtitle { color: var(--text-muted); font-size: 15px; }
        .header-actions { display: flex; gap: 12px; }
        .header-actions button { display: flex; align-items: center; gap: 8px; font-size: 14px; }
        .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .id-cell { font-weight: 800; color: var(--primary); font-family: monospace; font-size: 14px; }
        .name-cell { display: flex; flex-direction: column; }
        .name-val { font-weight: 700; color: var(--text-main); }
        .phone-val { font-size: 12px; color: var(--text-muted); }
        .text-btn { background: none; color: var(--primary); font-weight: 700; padding: 0; display: flex; align-items: center; }
        @media (max-width: 768px) {
          .admin-dashboard { padding: 15px; }
          .page-header { flex-direction: column; align-items: flex-start; gap: 15px; }
          .header-actions { width: 100%; flex-direction: column; }
          .header-actions > div, .header-actions button { width: 100%; }
          .data-table { display: block; overflow-x: auto; white-space: nowrap; }
        }
      `}</style>
        </div>
    );
};

export const RegistrationPage = ({ isOnline }) => {
    const [formData, setFormData] = useState({ name: '', phone: '', state: '', lga: '', farmSize: '', cropType: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(null);
    const { speak, lang } = useAccessibility();

    const lgaMap = {
        Kano: ['Dala', 'Fagge', 'Gwale', 'Kano Municipal', 'Nassarawa', 'Tarauni', 'Ungogo'],
        Oyo: ['Ibadan North', 'Ibadan North-East', 'Ibadan North-West', 'Ibadan South-East', 'Ibadan South-West', 'Ibarapa Central'],
        Benue: ['Makurdi', 'Gboko', 'Otukpo', 'Katsina-Ala', 'Guma', 'Logo'],
        Lagos: ['Ikeja', 'Surulere', 'Eti-Osa', 'Lagos Mainland', 'Lagos Island', 'Alimosho', 'Ikorodu'],
        Abuja: ['Abaji', 'Bwari', 'Gwagwalada', 'Kuje', 'Kwali', 'AMAC']
    };

    const handleStateChange = (e) => {
        setFormData({ ...formData, state: e.target.value, lga: '' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        fetch('http://localhost:3001/api/farmers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        }).then(r => r.json()).then(data => {
            setSuccess(data);
            speak('reg_success', lang === 'yo' ? `Iforukosile ti n ṣaṣeyọri. ID rẹ ni ${data.id}` : `Registration successful. Your ID is ${data.id}`);
            setFormData({ name: '', phone: '', state: '', lga: '', farmSize: '', cropType: '' });
            setIsSubmitting(false);
        });
    };

    return (
        <div className="registration-page fade-in">
            <div className="form-container">
                <div className="form-sidebar">
                    <div className="sidebar-content">
                        <span className="reg-badge">SECURE ENROLLMENT</span>
                        <h1>Digital Identity For Every Farmer</h1>
                        <p>Onboard farmers into the national subsidy ecosystem. Verified identity ensures direct value delivery.</p>

                        <div className="feature-list" style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--primary)', fontWeight: '600' }}>
                                <ShieldCheck size={18} /> Multi-modal Biometrics
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--primary)', fontWeight: '600' }}>
                                <MapPin size={18} /> GPS Coordinate Logging
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-main">
                    {success ? (
                        <div className="success-view card fade-in">
                            <div className="success-icon"><CheckCircle2 size={60} /></div>
                            <h2>Registration Successful!</h2>
                            <div className="id-card">
                                <span className="id-label">FARMER ID</span>
                                <span className="id-value">{success.id}</span>
                            </div>
                            <button className="btn-secondary" onClick={() => setSuccess(null)}>Register Another</button>
                        </div>
                    ) : (
                        <form className="card reg-form" onSubmit={handleSubmit}>
                            <div className="form-grid">
                                <div className="form-group full"><label>Full Name</label><input required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} /></div>
                                <div className="form-group"><label>Phone Number</label><input required value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} /></div>
                                <div className="form-group">
                                    <label>State</label>
                                    <select required value={formData.state} onChange={handleStateChange}>
                                        <option value="">Select State</option>
                                        <option value="Kano">Kano</option>
                                        <option value="Oyo">Oyo</option>
                                        <option value="Benue">Benue</option>
                                        <option value="Lagos">Lagos</option>
                                        <option value="Abuja">Abuja</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>LGA</label>
                                    <select required value={formData.lga} onChange={e => setFormData({ ...formData, lga: e.target.value })} disabled={!formData.state}>
                                        <option value="">Select LGA</option>
                                        {formData.state && lgaMap[formData.state]?.map(lga => (
                                            <option key={lga} value={lga}>{lga}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group"><label>Farm Size (Hectares)</label><input required type="number" value={formData.farmSize} onChange={e => setFormData({ ...formData, farmSize: e.target.value })} /></div>
                                <div className="form-group full">
                                    <label>Main Crop Type</label>
                                    <select required value={formData.cropType} onChange={e => setFormData({ ...formData, cropType: e.target.value })}>
                                        <option value="">Select Crop</option>
                                        <option value="Maize">Maize</option><option value="Cassava">Cassava</option><option value="Rice">Rice</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group full biometric-placeholder">
                                <label>Biometric Verification</label>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                    <div className="placeholder-box">
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'var(--text-muted)' }}>
                                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12Z" /><path d="M9 10C9 10 10.5 8 12 8C13.5 8 15 10 15 10" /><path d="M8 14H16" /><path d="M12 11.5V14" /></svg>
                                            <span style={{ fontSize: '13px', marginTop: '8px', fontWeight: '600' }}>Capture Face ID</span>
                                        </div>
                                    </div>
                                    <div className="placeholder-box">
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'var(--text-muted)' }}>
                                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" /><path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" /><path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" /></svg>
                                            <span style={{ fontSize: '13px', marginTop: '8px', fontWeight: '600' }}>Scan Fingerprint</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button className="btn-primary submit-btn" disabled={isSubmitting}>{isSubmitting ? 'Processing...' : 'Register Farmer'}</button>
                        </form>
                    )}
                </div>
            </div>
            <style>{`
        .registration-page { padding: 40px; }
        .form-container { display: flex; gap: 40px; max-width: 1000px; margin: 0 auto; }
        .form-sidebar { flex: 1; padding: 30px; background: #f8fafc; border-radius: 20px; }
        .form-main { flex: 1.5; }
        .reg-form { padding: 30px; }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
        .form-group.full { grid-column: span 2; }
        .submit-btn { width: 100%; margin-top: 25px; padding: 14px; font-size: 16px; font-weight: 700; }
        .placeholder-box {
            border: 2px dashed var(--border);
            border-radius: 12px;
            padding: 20px;
            text-align: center;
            cursor: pointer;
            transition: all 0.2s;
            background: #fafafa;
            height: 100px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .placeholder-box:hover {
            border-color: var(--primary);
            background: #f0fdf4;
            color: var(--primary);
        }
        .placeholder-box:hover svg { color: var(--primary); }
        @media (max-width: 768px) {
            .registration-page { padding: 15px; }
            .form-container { flex-direction: column; gap: 20px; }
            .form-grid { grid-template-columns: 1fr; }
            .form-group.full { grid-column: auto; }
            .biometric-placeholder > div { grid-template-columns: 1fr; }
        }
      `}</style>
        </div>
    );
};

export const FarmerDashboard = ({ isOnline }) => {
    const [farmer, setFarmer] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const mockFarmer = {
            id: 'FRM-7822-NG',
            name: 'Amina Bello',
            phone: '+234 803 123 4567',
            walletBalance: 125000,
            totalSubsidy: 250000,
            redemptionHistory: [
                { date: '2026-03-01', item: 'NPK Fertilizer (2 Bags)', dealer: 'Kano Agro Supply', amount: 35000 },
                { date: '2026-02-15', item: 'Maize Seed (10kg)', dealer: 'Bello Seeds', amount: 15000 }
            ]
        };

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 1500); // 1.5s timeout

        fetch('http://localhost:3001/api/farmers', { signal: controller.signal })
            .then(r => {
                if (!r.ok) throw new Error('API fetch failed');
                return r.json();
            })
            .then(data => {
                clearTimeout(timeoutId);
                if (data && data.length > 0) {
                    setFarmer(data[0]);
                } else {
                    setFarmer(mockFarmer); // Fallback to mock if API is empty
                }
            })
            .catch(err => {
                console.warn('Backend not accessible, falling back to mock data:', err.message);
                setFarmer(mockFarmer);
            })
            .finally(() => {
                setLoading(false);
            });

        return () => clearTimeout(timeoutId);
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="farmer-dashboard fade-in">
            <div className="dashboard-grid">
                <div className="card wallet-card primary">
                    <div className="wallet-header">
                        <Wallet size={24} />
                        <h2>Subsidy Wallet</h2>
                    </div>
                    <div className="balance-section">
                        <span className="balance-label">Available Balance</span>
                        <span className="balance-value">₦{farmer.walletBalance.toLocaleString()}</span>
                    </div>
                    <div className="wallet-footer" style={{ display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div className="stat">
                            <span style={{ fontSize: '12px', opacity: 0.8, display: 'block' }}>Total Subsidy Received</span>
                            <strong style={{ fontSize: '20px' }}>₦{farmer.totalSubsidy.toLocaleString()}</strong>
                        </div>
                        <div style={{ height: '40px', width: '1px', background: 'rgba(255,255,255,0.2)' }}></div>
                        <div className="stat">
                            <span style={{ fontSize: '12px', opacity: 0.8, display: 'block' }}>Latest Program</span>
                            <strong style={{ fontSize: '15px' }}>2026 Wet Season Core</strong>
                        </div>
                    </div>
                </div>

                <div className="card qr-card">
                    <QrCode size={120} className="qr-img" />
                    <div className="qr-info">
                        <span className="qr-id">{farmer.id}</span>
                        <span className="qr-name">{farmer.name}</span>
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="card-header">
                    <h2><History size={20} /> Redemption History</h2>
                </div>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>DATE</th>
                            <th>ITEM</th>
                            <th>DEALER</th>
                            <th>AMOUNT</th>
                        </tr>
                    </thead>
                    <tbody>
                        {farmer.redemptionHistory.map((h, i) => (
                            <tr key={i}>
                                <td>{h.date}</td>
                                <td><span className="item-label">{h.item}</span></td>
                                <td>{h.dealer}</td>
                                <td className="amount-neg">-₦{h.amount.toLocaleString()}</td>
                            </tr>
                        ))}
                        {farmer.redemptionHistory.length === 0 && (
                            <tr><td colSpan="4" style={{ textAlign: 'center', color: '#94a3b8' }}>No transactions yet</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            <style>{`
        .farmer-dashboard { padding: 30px; }
        .wallet-card.primary { background: var(--primary); color: white; border: none; }
        .wallet-header { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; opacity: 0.9; }
        .balance-label { display: block; font-size: 14px; opacity: 0.8; margin-bottom: 8px; }
        .balance-value { font-size: 36px; font-weight: 800; display: block; }
        .wallet-footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.2); }
        .qr-card { display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; }
        .qr-img { color: var(--primary); margin-bottom: 15px; }
        .qr-id { font-weight: 800; display: block; color: var(--primary); font-family: monospace; }
        .qr-name { font-size: 14px; color: var(--text-muted); }
        .item-label { font-weight: 700; color: var(--text-main); }
        .amount-neg { color: var(--error); font-weight: 700; }
        @media (max-width: 768px) {
          .farmer-dashboard { padding: 15px; }
          .wallet-footer { flex-direction: column; gap: 20px; align-items: flex-start !important; }
          .wallet-footer > div[style*="1px"] { display: none; }
          .data-table { display: block; overflow-x: auto; white-space: nowrap; width: 100%; }
        }
      `}</style>
        </div>
    );
};

export const DealerPortal = ({ isOnline, addToQueue }) => {
    const [farmerId, setFarmerId] = useState('');
    const [farmer, setFarmer] = useState(null);
    const [amount, setAmount] = useState('');
    const [item, setItem] = useState('');
    const [status, setStatus] = useState(null);

    const verifyFarmer = () => {
        fetch('http://localhost:3001/api/farmers').then(r => r.json()).then(data => {
            const found = data.find(f => f.id === farmerId);
            if (found) setFarmer(found);
            else alert('Farmer ID not found');
        });
    };

    const handleRedeem = (e) => {
        e.preventDefault();
        const txnData = {
            farmerId: farmer.id,
            farmerName: farmer.name,
            amount: Number(amount),
            dealer: 'Kano Agro Supply',
            item,
            location: 'Ungogo, Kano',
            program: 'Fertilizer Support 2026',
            timestamp: new Date().toISOString()
        };

        if (!isOnline) {
            addToQueue(txnData);
            setStatus('Queued');
            setFarmer(null);
            setFarmerId('');
            setAmount('');
            setItem('');
            return;
        }

        fetch('http://localhost:3001/api/transactions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(txnData)
        }).then(r => r.json()).then(data => {
            setStatus('Success');
            setFarmer(null);
            setFarmerId('');
            setAmount('');
            setItem('');
        });
    };

    return (
        <div className="dealer-portal fade-in">
            <div className="portal-grid">
                <div className="card verify-section">
                    <h2>Verify Farmer Identity</h2>
                    <div className="verify-input">
                        <input placeholder="Enter Farmer ID (e.g. FRM-1023)" value={farmerId} onChange={e => setFarmerId(e.target.value)} />
                        <button className="btn-primary" onClick={verifyFarmer}><QrCode size={18} /> Verify</button>
                    </div>

                    {farmer && (
                        <div className="farmer-profile card fade-in">
                            <div className="profile-top">
                                <div className="avatar"><Users size={24} /></div>
                                <div>
                                    <h3>{farmer.name}</h3>
                                    <span className="id-badge">{farmer.id}</span>
                                </div>
                            </div>
                            <div className="profile-stats">
                                <div className="stat">
                                    <span>Balance</span>
                                    <strong>₦{farmer.walletBalance.toLocaleString()}</strong>
                                </div>
                                <div className="stat">
                                    <span>Crop</span>
                                    <strong>{farmer.cropType}</strong>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="card redeem-section">
                    <h2>Process Redemption</h2>
                    <form onSubmit={handleRedeem}>
                        <div className="form-group">
                            <label>Select Item</label>
                            <select required value={item} onChange={e => setItem(e.target.value)}>
                                <option value="">Select Farm Input</option>
                                <option value="Fertilizer">Fertilizer (NPK 20:10:10)</option>
                                <option value="Improved Seeds">Improved Seeds (Maize)</option>
                                <option value="Agrochemicals">Agrochemicals</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Redemption Value (₦)</label>
                            <input required type="number" placeholder="5000" value={amount} onChange={e => setAmount(e.target.value)} />
                        </div>
                        <button className="btn-primary redeem-btn" disabled={!farmer}><ShoppingBag size={18} /> Confirm Redemption</button>
                    </form>
                    {status && <div className="badge badge-success" style={{ marginTop: '20px', display: 'block', textAlign: 'center' }}>Redemption Processed Successfully!</div>}
                </div>
            </div>
            <style>{`
        .dealer-portal { padding: 30px; }
        .portal-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 30px; }
        .verify-input { display: flex; gap: 10px; margin: 20px 0; }
        .farmer-profile { margin-top: 20px; border-left: 5px solid var(--primary); }
        .profile-top { display: flex; gap: 15px; align-items: center; margin-bottom: 20px; }
        .avatar { background: #f0f4f8; color: var(--primary); padding: 10px; border-radius: 12px; }
        .id-badge { font-family: monospace; font-weight: 800; font-size: 14px; color: var(--primary); }
        .profile-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
        .redeem-btn { width: 100%; margin-top: 20px; display: flex; align-items: center; justify-content: center; gap: 10px; }
        @media (max-width: 768px) {
          .dealer-portal { padding: 15px; }
          .portal-grid { grid-template-columns: 1fr; }
          .verify-input { flex-direction: column; }
          .verify-input button { width: 100%; }
        }
      `}</style>
        </div>
    );
};

export const LedgerPage = ({ isOnline }) => {
    const [txns, setTxns] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('http://localhost:3001/api/transactions').then(r => r.json()).then(setTxns);
    }, []);

    const filteredTxns = txns.filter(t =>
        t.farmerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.dealer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="ledger-page fade-in">
            <div className="card">
                <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <h2>AgriTrace National Ledger</h2>
                        <div className="badge badge-success"><ShieldCheck size={14} /> Immutable History</div>
                    </div>
                    <div className="search-box" style={{ position: 'relative', width: '300px' }}>
                        <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                            type="text"
                            placeholder="Search by ID, Name or Dealer..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ paddingLeft: '40px', width: '100%', borderRadius: '20px', border: '1px solid var(--border)' }}
                        />
                    </div>
                </div>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>TXN ID</th>
                            <th>FARMER</th>
                            <th>DEALER</th>
                            <th>PROGRAM</th>
                            <th>VALUE</th>
                            <th>TIME</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTxns.map(t => (
                            <tr key={t.id}>
                                <td className="id-cell">{t.id}</td>
                                <td>{t.farmerName} ({t.farmerId})</td>
                                <td>{t.dealer}</td>
                                <td>{t.program}</td>
                                <td className="amount-val">₦{t.value.toLocaleString()}</td>
                                <td>{new Date(t.timestamp).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <style>{`
        .ledger-page { padding: 30px; }
        .amount-val { font-weight: 800; color: var(--primary); }
        @media (max-width: 768px) {
          .ledger-page { padding: 15px; }
          .card-header { flex-direction: column !important; align-items: stretch !important; gap: 15px; }
          .search-box { width: 100% !important; }
          .data-table { display: block; overflow-x: auto; white-space: nowrap; width: 100%; }
        }
      `}</style>
        </div>
    );
};

export const SyncQueuePage = () => {
    const [queue, setQueue] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem('agri_sync_queue');
        if (saved) setQueue(JSON.parse(saved));
    }, []);

    const clearQueue = () => {
        localStorage.removeItem('agri_sync_queue');
        setQueue([]);
    };

    return (
        <div className="sync-page fade-in">
            <div className="card">
                <div className="card-header">
                    <h2>Offline Sync Queue</h2>
                    {queue.length > 0 && <button className="btn-primary" onClick={clearQueue}><RefreshCcw size={16} /> Sync All</button>}
                </div>
                {queue.length === 0 ? (
                    <div className="empty-state">
                        <Database size={48} />
                        <p>Queue is empty. All transactions are synced.</p>
                    </div>
                ) : (
                    <table className="data-table">
                        <thead>
                            <tr><th>FARMER ID</th><th>AMOUNT</th><th>STATUS</th></tr>
                        </thead>
                        <tbody>
                            {queue.map((item, i) => (
                                <tr key={i}><td>{item.farmerId}</td><td>₦{item.amount}</td><td><span className="badge badge-warning">Pending Sync</span></td></tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            <style>{`
        .sync-page { padding: 30px; }
        .empty-state { padding: 80px; text-align: center; color: var(--text-muted); opacity: 0.5; }
        @media (max-width: 768px) {
          .sync-page { padding: 15px; }
          .data-table { display: block; overflow-x: auto; white-space: nowrap; width: 100%; }
          .empty-state { padding: 40px 20px; }
        }
      `}</style>
        </div>
    );
};

export const ImpactDashboard = ({ isOnline }) => {
    return (
        <div className="impact-dashboard fade-in">
            <div className="dashboard-grid">
                <StatCard title="Farmers Supported" value="12,400" icon={Users} />
                <StatCard title="Total Subsidy Value" value="₦620.5M" icon={Layers} />
                <StatCard title="Regions Covered" value="22 LGAs" icon={MapPin} />
                <StatCard title="Food Security Index" value="+14%" icon={Globe} />
            </div>
            <div className="dashboard-grid" style={{ gridTemplateColumns: '1.5fr 1fr' }}>
                <div className="card">
                    <h2>Regional Distribution</h2>
                    <div style={{ padding: '40px', textAlign: 'center', opacity: 0.5 }}>
                        <BarChart2 size={100} style={{ margin: '0 auto' }} />
                        <p>Visual representation of subsidy impact per state.</p>
                    </div>
                </div>
                <div className="card">
                    <h2>Input categories</h2>
                    <div style={{ padding: '40px', textAlign: 'center', opacity: 0.5 }}>
                        <PieChart size={100} style={{ margin: '0 auto' }} />
                        <p>Fertilizer vs Seeds vs Chemicals</p>
                    </div>
                </div>
            </div>
            <style>{`
        .impact-dashboard { padding: 30px; }
        @media (max-width: 768px) {
          .impact-dashboard { padding: 15px; }
          .dashboard-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </div>
    );
};

export const AgriSmartAcademy = ({ onClose }) => {
    const [step, setStep] = useState(0);
    const { speak, lang, voiceEnabled } = useAccessibility();

    const lessons = [
        {
            title: "What is AgriSmart?",
            desc: "AgriSmart helps you get fertilizers and seeds from the government easily. It's like a digital farm bank!",
            voice: {
                en: "AgriSmart helps you get fertilizers and seeds from the government easily. It's like a digital farm bank!",
                yo: "AgriSmart n ran ọ lọwọ lati gba ajile ati awọn irugbin lọwọ ijọba ni irọrun. O dabi banki oko lori foonu rẹ.",
                ig: "AgriSmart na-enyere gị aka ịnweta fatịlaịza na mkpụrụ n'aka gọọmentị n'ụzọ dị mfe.",
                ha: "AgriSmart yana taimaka muku samun takin zamani da iri daga gwamnati cikin sauki.",
                fr: "AgriSmart vous aide à obtenir facilement des engrais et des semences du gouvernement."
            }
        },
        {
            title: "Your Identity",
            desc: "Every farmer gets a special ID. This ID is yours alone. Keep it safe to get your farm gifts!",
            voice: {
                en: "Every farmer gets a special ID. This ID is yours alone. Keep it safe to get your farm gifts!",
                yo: "Gbogbo agbe lo ni ID pataki kan. ID yii jẹ tirẹ nikan. Tọju rẹ daradara lati gba ẹbun oko rẹ.",
                ig: "Onye ọrụ ugbo ọ bụla na-enweta ID pụrụ iche. Debe ya n'enweghị nsogbu.",
                ha: "Kowane manomi yana samun lambar shaida ta musamman. Kiyaye ta da kyau.",
                fr: "Chaque agriculteur reçoit un identifiant spécial. Gardez-le en sécurité."
            }
        },
        {
            title: "The Wallet",
            desc: "Your phone has a 'Wallet'. This is where your subsidy money stays until you buy seeds at a dealer.",
            voice: {
                en: "Your phone has a 'Wallet'. This is where your subsidy money stays until you buy seeds at a dealer.",
                yo: "Foonu rẹ ni 'Apo Iwe Digital'. Eyi ni ibi ti owo iranlọwọ rẹ n gbe titi di igba ti o ba ra irugbin.",
                ig: "Ekwentị gị nwere 'Wallet'. Nke a bụ ebe ego gọọmentị gị na-adị.",
                ha: "Wayarka tana da 'Walat'. Anan ne asusun tallafi yake.",
                fr: "Votre téléphone dispose d'un portefeuille. C'est là que reste votre argent de subvention."
            }
        },
        {
            title: "Redeeming Inputs",
            desc: "Go to any 'Agro Dealer', show your ID, and get your farm inputs. No middlemen, no stress!",
            voice: {
                en: "Go to any 'Agro Dealer', show your ID, and get your farm inputs. No middlemen, no stress!",
                yo: "Lọ si ọdọ olupese ajile eyikeyi, fi ID rẹ han wọn, ki o gba awọn nkan oko rẹ. Ko si wahala, ko si ayederu.",
                ig: "Gaa na onye na-ere ọrụ ugbo ọ bụla, gosi ID gị, nweta mkpụrụ gị.",
                ha: "Je wurin kowane mai sayar da kayan gona, nuna lambarka, sannan ka karbi kayan gonarka.",
                fr: "Allez chez n'importe quel revendeur, montrez votre identité et obtenez vos intrants."
            }
        }
    ];

    useEffect(() => {
        if (voiceEnabled) {
            speak('academy_step', lessons[step].voice[lang] || lessons[step].voice.en);
        }
    }, [step, voiceEnabled, lang]);

    return (
        <div className="academy-overlay fade-in" onClick={onClose}>
            <div className="academy-container card modal-pop" onClick={e => e.stopPropagation()}>
                <button className="close-academy" onClick={onClose}><X size={24} /></button>
                <div className="academy-header">
                    <div className="academy-badge">ACADEMY</div>
                    <h1>Learn AgriSmart in 2 Minutes</h1>
                    <p>Easy steps to master your digital farm tools.</p>
                </div>

                <div className="lesson-card">
                    <div className="lesson-icon pulse">
                        <PlayCircle size={64} color="var(--primary)" />
                    </div>
                    <div className="lesson-content">
                        <h3>Lesson {step + 1}: {lessons[step].title}</h3>
                        <p>{lessons[step].desc}</p>
                    </div>
                </div>

                <div className="academy-controls">
                    <div className="progress-dots">
                        {lessons.map((_, i) => (
                            <span key={i} className={`dot ${i === step ? 'active' : ''}`} />
                        ))}
                    </div>
                    <div className="btn-group">
                        <button
                            className="btn-secondary"
                            disabled={step === 0}
                            onClick={() => setStep(step - 1)}
                        >
                            Back
                        </button>
                        {step < lessons.length - 1 ? (
                            <button className="btn-primary" onClick={() => setStep(step + 1)}>Next Lesson</button>
                        ) : (
                            <button className="btn-primary" onClick={onClose}>Finish Training</button>
                        )}
                    </div>
                </div>
            </div>
            <style>{`
                .academy-overlay {
                    position: fixed;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: rgba(15, 23, 42, 0.8);
                    backdrop-filter: blur(8px);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                    padding: 20px;
                }
                .academy-container {
                    max-width: 600px;
                    width: 100%;
                    text-align: center;
                    padding: 40px;
                    position: relative;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                }
                .close-academy {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    background: none;
                    color: var(--text-muted);
                }
                .close-academy:hover { color: var(--error); }
                .academy-badge { background: #e8f5e9; color: var(--primary); font-weight: 800; padding: 4px 12px; border-radius: 20px; display: inline-block; margin-bottom: 15px; font-size: 12px; }
                .lesson-card { margin: 40px 0; display: flex; flex-direction: column; align-items: center; gap: 20px; padding: 30px; background: #f8fafc; border-radius: 24px; border: 1px solid var(--border); }
                .lesson-content h3 { font-size: 24px; margin-bottom: 10px; color: var(--text-main); font-weight: 800; }
                .lesson-content p { font-size: 16px; color: var(--text-muted); line-height: 1.6; }
                .academy-controls { display: flex; justify-content: space-between; align-items: center; margin-top: 30px; }
                .progress-dots { display: flex; gap: 8px; }
                .dot { width: 8px; height: 8px; border-radius: 50%; background: var(--border); transition: all 0.3s; }
                .dot.active { background: var(--primary); width: 24px; border-radius: 4px; }
                .btn-group { display: flex; gap: 10px; }
                .pulse { animation: pulse 2s infinite; }
                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                    100% { transform: scale(1); }
                }
                .modal-pop { animation: modalPop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
                @keyframes modalPop {
                    from { transform: scale(0.9); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
            `}</style>
        </div>
    );
};
