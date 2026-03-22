import { useState } from 'react'
import './App.css'
import { FileText, Download, Sparkles, Plus, Trash2 } from 'lucide-react'
import CVForm from './components/CVForm'
import CVPreview from './components/CVPreview'
import { exportToPDF } from './utils/exportPDF'

function App() {
  const [cvData, setCvData] = useState({
    personalInfo: {
      name: 'John Doe',
      title: 'Full Stack Developer',
      email: 'john@example.com',
      phone: '+1 234 567 890',
      location: 'New York, USA',
      summary: 'Experienced developer with a passion for building scalable web applications and intuitive user interfaces.',
      photo: ''
    },
    education: [
      { id: 1, school: 'Tech University', degree: 'B.S. Computer Science', year: '2016 - 2020' }
    ],
    experience: [
      { id: 1, company: 'Innovate Tech', role: 'Senior Developer', duration: '2020 - Present', description: 'Leading the frontend team to build high-performance React applications.' }
    ],
    skills: ['React', 'JavaScript', 'Node.js', 'CSS', 'UI Design'],
    languages: ['English (Native)', 'Spanish (Fluent)'],
    interests: ['Photography', 'Hiking', 'Open Source'],
    design: {
      theme: 'modern',
      primaryColor: '#6366f1',
      textColor: '#1e293b',
      paperSize: 'a4'
    }
  })

  const handleExport = async () => {
    const btn = document.getElementById('export-btn');
    btn.disabled = true;
    btn.innerHTML = 'Generating...';
    try {
      await exportToPDF('cv-preview-container', `${cvData.personalInfo.name || 'CV'}_Resume.pdf`, cvData.design.paperSize)
    } catch (error) {
      console.error('PDF generation failed', error);
    } finally {
      btn.disabled = false;
      btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" x2="12" y1="15" y2="3"></line></svg> Export PDF';
    }
  }

  return (
    <div className="app-container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
      <header style={{ gridColumn: '1 / -1', marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', animation: 'fadeInUp 0.6s ease-out' }}>
        <div>
          <h1 style={{ fontSize: '3rem', display: 'flex', alignItems: 'center', gap: '1rem', margin: 0 }}>
            <Sparkles className="text-primary" size={40} style={{ filter: 'drop-shadow(0 0 8px var(--primary-glow))' }} />
            <span style={{ background: 'linear-gradient(135deg, #fff 0%, var(--primary) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Auto-Designer
            </span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginTop: '0.5rem', fontWeight: 500 }}>
            Craft your professional story with AI-powered precision.
          </p>
        </div>
        <button id="export-btn" className="btn btn-primary" onClick={handleExport} style={{ fontSize: '1rem', padding: '1rem 2rem' }}>
          <Download size={22} />
          Export PDF
        </button>
      </header>

      <main className="glass-card animate-fade-in" style={{ padding: '2.5rem', border: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem' }}>
          <div style={{ padding: '0.75rem', background: 'rgba(129, 140, 248, 0.1)', borderRadius: '1rem' }}>
            <FileText size={28} className="text-primary" />
          </div>
          <h2 style={{ fontSize: '1.8rem', margin: 0 }}>Your Information</h2>
        </div>
        <CVForm data={cvData} setData={setCvData} />
      </main>

      <aside className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="preview-wrapper">
          <CVPreview data={cvData} />
        </div>
      </aside>

      <footer style={{ gridColumn: '1 / -1', marginTop: '4rem', textAlign: 'center', borderTop: '1px solid var(--border)', paddingTop: '2rem', color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <p style={{ fontWeight: 600, letterSpacing: '0.05em', color: 'rgba(255,255,255,0.7)' }}>
          "built for people, not for profit"
        </p>
        <p>© 2026 AI Resume Auto-Designer. All rights reserved.</p>
        <a href="https://www.sutsengdu.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 700, transition: 'all 0.3s ease', opacity: 0.8 }} 
           onMouseOver={e => e.currentTarget.style.opacity = '1'} 
           onMouseOut={e => e.currentTarget.style.opacity = '0.8'}>
          www.sutsengdu.com
        </a>
      </footer>
    </div>
  )
}

export default App
