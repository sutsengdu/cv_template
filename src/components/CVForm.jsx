import { Plus, Trash2, User, GraduationCap, Briefcase, Award, Globe, Sparkles } from 'lucide-react'

function CVForm({ data, setData }) {
  const handleChange = (section, field, value, id = null) => {
    if (id !== null) {
      setData(prev => ({
        ...prev,
        [section]: prev[section].map(item => item.id === id ? { ...item, [field]: value } : item)
      }))
    } else if (section === 'design') {
      setData(prev => ({
        ...prev,
        design: { ...prev.design, [field]: value }
      }))
    } else {
      setData(prev => ({
        ...prev,
        [section]: { ...prev[section], [field]: value }
      }))
    }
  }

  const addItem = (section) => {
    const newItem = section === 'education'
      ? { id: Date.now(), school: '', degree: '', year: '' }
      : { id: Date.now(), company: '', role: '', duration: '', description: '' }
    setData(prev => ({ ...prev, [section]: [...prev[section], newItem] }))
  }

  const removeItem = (section, id) => {
    setData(prev => ({ ...prev, [section]: prev[section].filter(item => item.id !== id) }))
  }

  const themes = [
    { id: 'modern', name: 'Modern', desc: 'Clean and contemporary' },
    { id: 'professional', name: 'Professional', desc: 'Classic corporate look' },
    { id: 'creative', name: 'Creative', desc: 'Bold and unique' }
  ]

  const colors = ['#6366f1', '#f43f5e', '#10b981', '#f59e0b']

  return (
    <div className="cv-form">
      {/* Design Settings */}
      <section className="form-section" style={{ marginBottom: '2rem', background: 'rgba(99, 102, 241, 0.05)', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
        <h3 className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)', marginBottom: '1rem' }}>
          <Sparkles size={18} className="text-primary" /> Design Settings
        </h3>

        <div className="input-group">
          <label className="input-label">Select Template</label>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', maxWidth: '100%' }}>
            {themes.map(t => (
              <button
                key={t.id}
                className={`btn ${data.design.theme === t.id ? 'btn-primary' : ''}`}
                style={{
                  flex: '1 1 100px',
                  fontSize: '0.7rem',
                  padding: '0.5rem',
                  background: data.design.theme === t.id ? 'var(--primary)' : 'rgba(255,255,255,0.05)'
                }}
                onClick={() => handleChange('design', 'theme', t.id)}
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>

        <div className="input-group" style={{ marginBottom: '1.5rem' }}>
          <label className="input-label">Accent Color</label>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
            {colors.map(c => (
              <div
                key={c}
                onClick={() => handleChange('design', 'primaryColor', c)}
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: c,
                  cursor: 'pointer',
                  border: data.design.primaryColor === c ? '2px solid white' : '2px solid transparent',
                  boxShadow: data.design.primaryColor === c ? '0 0 0 2px var(--primary)' : 'none'
                }}
              />
            ))}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: '0.5rem', paddingLeft: '1rem', borderLeft: '1px solid var(--border)' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Custom:</span>
              <input
                type="color"
                value={data.design.primaryColor}
                onChange={(e) => handleChange('design', 'primaryColor', e.target.value)}
                style={{ width: '30px', height: '30px', padding: 0, border: 'none', background: 'none', cursor: 'pointer' }}
              />
            </div>
          </div>
        </div>

        <div className="input-group" style={{ marginBottom: '1.5rem' }}>
          <label className="input-label">Text Color</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {['#1e293b', '#475569', '#0f172a', '#000000'].map(c => (
              <div
                key={c}
                onClick={() => handleChange('design', 'textColor', c)}
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '4px',
                  background: c,
                  cursor: 'pointer',
                  border: data.design.textColor === c ? '2px solid var(--primary)' : '1px solid rgba(255,255,255,0.1)'
                }}
              />
            ))}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: '0.5rem', paddingLeft: '1rem', borderLeft: '1px solid var(--border)' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Custom:</span>
              <input
                type="color"
                value={data.design.textColor}
                onChange={(e) => handleChange('design', 'textColor', e.target.value)}
                style={{ width: '30px', height: '30px', padding: 0, border: 'none', background: 'none', cursor: 'pointer' }}
              />
            </div>
          </div>
        </div>

        <div className="input-group" style={{ marginBottom: 0 }}>
          <label className="input-label">Paper Size</label>
          <select
            className="input-field"
            value={data.design.paperSize}
            onChange={(e) => handleChange('design', 'paperSize', e.target.value)}
            style={{
              appearance: 'none',
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 1rem center',
              paddingRight: '2.5rem',
              cursor: 'pointer',
              textTransform: 'uppercase'
            }}
          >
            <option value="a3">A3 (Large)</option>
            <option value="a4">A4 (Standard)</option>
            <option value="a5">A5 (Small)</option>
            <option value="letter">US Letter</option>
            <option value="legal">Legal</option>
            <option value="tabloid">Tabloid</option>
          </select>
        </div>
      </section>

      {/* Personal Info */}
      <section className="form-section">
        <h3 className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)', marginBottom: '1rem' }}>
          <User size={18} className="text-primary" /> Personal Information
        </h3>

        <div className="personal-info-grid" style={{ marginBottom: '1.5rem', background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ textAlign: 'center' }}>
            <div
              onClick={() => document.getElementById('photo-upload').click()}
              style={{
                width: '120px',
                height: '120px',
                margin: '0 auto',
                borderRadius: '1rem',
                background: 'rgba(255,255,255,0.05)',
                border: '2px dashed rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                overflow: 'hidden',
                transition: 'all 0.3s ease'
              }}
            >
              {data.personalInfo.photo ? (
                <img src={data.personalInfo.photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <Plus size={32} className="text-muted" />
              )}
            </div>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(e) => {
                const file = e.target.files[0]
                if (file) {
                  const reader = new FileReader()
                  reader.onloadend = () => {
                    handleChange('personalInfo', 'photo', reader.result)
                  }
                  reader.readAsDataURL(file)
                }
              }}
            />
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              {data.personalInfo.photo ? 'Change Photo' : 'Upload Photo'}
            </p>
          </div>

          <div style={{ flex: 1 }}>
            <div className="input-group">
              <label className="input-label">Full Name</label>
              <input className="input-field" type="text" value={data.personalInfo.name} onChange={(e) => handleChange('personalInfo', 'name', e.target.value)} />
            </div>
            <div className="input-group">
              <label className="input-label">Professional Title</label>
              <input className="input-field" type="text" value={data.personalInfo.title} onChange={(e) => handleChange('personalInfo', 'title', e.target.value)} />
            </div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="input-group">
            <label className="input-label">Email</label>
            <input className="input-field" type="email" value={data.personalInfo.email} onChange={(e) => handleChange('personalInfo', 'email', e.target.value)} />
          </div>
          <div className="input-group">
            <label className="input-label">Phone</label>
            <input className="input-field" type="text" value={data.personalInfo.phone} onChange={(e) => handleChange('personalInfo', 'phone', e.target.value)} />
          </div>
        </div>
        <div className="input-group">
          <label className="input-label">Summary</label>
          <textarea className="input-field" value={data.personalInfo.summary} onChange={(e) => handleChange('personalInfo', 'summary', e.target.value)} />
        </div>
      </section>

      {/* Experience */}
      <section className="form-section" style={{ marginTop: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)', margin: 0 }}>
            <Briefcase size={18} className="text-primary" /> Work Experience
          </h3>
          <button className="btn btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }} onClick={() => addItem('experience')}>
            <Plus size={14} /> Add
          </button>
        </div>
        {data.experience.map((exp) => (
          <div key={exp.id} style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '0.5rem', marginBottom: '1rem', position: 'relative' }}>
            <Trash2 size={16} className="text-accent" style={{ position: 'absolute', top: '1rem', right: '1rem', cursor: 'pointer' }} onClick={() => removeItem('experience', exp.id)} />
            <div className="input-group">
              <label className="input-label">Company</label>
              <input className="input-field" type="text" value={exp.company} onChange={(e) => handleChange('experience', 'company', e.target.value, exp.id)} />
            </div>
            <div className="input-group">
              <label className="input-label">Role</label>
              <input className="input-field" type="text" value={exp.role} onChange={(e) => handleChange('experience', 'role', e.target.value, exp.id)} />
            </div>
            <div className="input-group">
              <label className="input-label">Duration</label>
              <input className="input-field" type="text" value={exp.duration} onChange={(e) => handleChange('experience', 'duration', e.target.value, exp.id)} />
            </div>
            <div className="input-group">
              <label className="input-label">Description</label>
              <textarea className="input-field" value={exp.description} onChange={(e) => handleChange('experience', 'description', e.target.value, exp.id)} />
            </div>
          </div>
        ))}
      </section>

      {/* Education */}
      <section className="form-section" style={{ marginTop: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)', margin: 0 }}>
            <GraduationCap size={18} className="text-primary" /> Education
          </h3>
          <button className="btn btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }} onClick={() => addItem('education')}>
            <Plus size={14} /> Add
          </button>
        </div>
        {data.education.map((edu) => (
          <div key={edu.id} style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '0.5rem', marginBottom: '1rem', position: 'relative' }}>
            <Trash2 size={16} className="text-accent" style={{ position: 'absolute', top: '1rem', right: '1rem', cursor: 'pointer' }} onClick={() => removeItem('education', edu.id)} />
            <div className="input-group">
              <label className="input-label">School / University</label>
              <input className="input-field" type="text" value={edu.school} onChange={(e) => handleChange('education', 'school', e.target.value, edu.id)} />
            </div>
            <div className="input-group">
              <label className="input-label">Degree</label>
              <input className="input-field" type="text" value={edu.degree} onChange={(e) => handleChange('education', 'degree', e.target.value, edu.id)} />
            </div>
            <div className="input-group">
              <label className="input-label">Year</label>
              <input className="input-field" type="text" value={edu.year} onChange={(e) => handleChange('education', 'year', e.target.value, edu.id)} />
            </div>
          </div>
        ))}
      </section>

      {/* Skills */}
      <section className="form-section" style={{ marginTop: '2rem' }}>
        <h3 className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)', marginBottom: '1rem' }}>
          <Award size={18} className="text-primary" /> Skills (Comma separated)
        </h3>
        <textarea
          className="input-field"
          placeholder="e.g. React, Node.js, Design..."
          value={data.skills.join(', ')}
          onChange={(e) => setData(prev => ({ ...prev, skills: e.target.value.split(',').map(s => s.trim()) }))}
        />
      </section>

      {/* Languages and Interests */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '2rem' }}>
        <section className="form-section">
          <h3 className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)', marginBottom: '1rem' }}>
            <Globe size={18} className="text-primary" /> Languages
          </h3>
          <textarea
            className="input-field"
            placeholder="e.g. English (Native), French..."
            value={data.languages.join(', ')}
            onChange={(e) => setData(prev => ({ ...prev, languages: e.target.value.split(',').map(s => s.trim()) }))}
            style={{ minHeight: '80px' }}
          />
        </section>
        <section className="form-section">
          <h3 className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)', marginBottom: '1rem' }}>
            <Sparkles size={18} className="text-primary" /> Interests
          </h3>
          <textarea
            className="input-field"
            placeholder="e.g. Travel, Chess..."
            value={data.interests.join(', ')}
            onChange={(e) => setData(prev => ({ ...prev, interests: e.target.value.split(',').map(s => s.trim()) }))}
            style={{ minHeight: '80px' }}
          />
        </section>
      </div>
    </div>
  )
}

export default CVForm
