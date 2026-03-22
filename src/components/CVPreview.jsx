import React from 'react'

function CVPreview({ data }) {
  const { personalInfo, education, experience, skills, languages, interests, design } = data
  const { theme, primaryColor, textColor = '#1e293b', paperSize = 'a4' } = design || { theme: 'modern', primaryColor: '#6366f1', textColor: '#1e293b', paperSize: 'a4' }
  const [scale, setScale] = React.useState(1)
  const wrapperRef = React.useRef(null)

  const getPaperDimensions = (size) => {
    switch(size) {
      case 'a3': return { w: 297, h: 420 }
      case 'a4': return { w: 210, h: 297 }
      case 'a5': return { w: 148, h: 210 }
      case 'letter': return { w: 215.9, h: 279.4 }
      case 'legal': return { w: 215.9, h: 355.6 }
      case 'tabloid': return { w: 279.4, h: 431.8 }
      default: return { w: 210, h: 297 }
    }
  }

  const dimensions = getPaperDimensions(paperSize)
  const mmToPx = 3.78 // approx 96 DPI

  React.useEffect(() => {
    const updateScale = () => {
      if (wrapperRef.current) {
        const parentWidth = wrapperRef.current.offsetWidth
        const paperPxWidth = dimensions.w * mmToPx
        if (parentWidth < paperPxWidth) {
          setScale(parentWidth / paperPxWidth)
        } else {
          setScale(1)
        }
      }
    }

    const observer = new ResizeObserver(updateScale)
    if (wrapperRef.current) observer.observe(wrapperRef.current)
    updateScale()
    window.addEventListener('resize', updateScale)
    
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', updateScale)
    }
  }, [paperSize, dimensions.w])

  const paperStyles = {
    width: `${dimensions.w}mm`,
    minWidth: `${dimensions.w}mm`,
    minHeight: `${dimensions.h}mm`,
    margin: '0 auto',
    boxShadow: '0 0 20px rgba(0,0,0,0.1)',
    backgroundColor: 'white',
    overflow: 'hidden',
    transition: 'transform 0.2s ease'
  }

  const renderModern = () => (
    <div id="cv-preview-container" style={{ ...paperStyles, padding: '40px', color: textColor, fontFamily: 'Inter', display: 'flex', flexDirection: 'column' }}>
      <header style={{ borderBottom: `1px solid ${primaryColor}`, paddingBottom: '12px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: '22px', color: textColor, marginBottom: '4px', textTransform: 'uppercase', letterSpacing: 'normal', lineHeight: '1.2' }}>{personalInfo.name || 'Your Name'}</h1>
          <h2 style={{ fontSize: '13px', color: primaryColor, fontWeight: 500, marginBottom: '10px', letterSpacing: 'normal' }}>{personalInfo.title || 'Professional Title'}</h2>
          <div style={{ display: 'flex', gap: '12px', fontSize: '11px', color: textColor, opacity: 0.8, flexWrap: 'wrap' }}>
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
          </div>
        </div>
        {personalInfo.photo && (
          <img src={personalInfo.photo} alt="Profile" style={{ width: '70px', height: '70px', borderRadius: '0.5rem', objectFit: 'cover', border: `1px solid ${primaryColor}22` }} />
        )}
      </header>

      {personalInfo.summary && (
        <section style={{ marginBottom: '20px' }}>
          <h3 style={{ fontSize: '11px', borderBottom: '1px solid #e2e8f0', paddingBottom: '3px', marginBottom: '8px', textTransform: 'uppercase', color: primaryColor, letterSpacing: 'normal' }}>Professional Summary</h3>
          <p style={{ fontSize: '12px', lineHeight: '1.5', wordSpacing: '0.3px' }}>{personalInfo.summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section style={{ marginBottom: '20px' }}>
          <h3 style={{ fontSize: '11px', color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '3px', marginBottom: '12px', textTransform: 'uppercase', color: primaryColor, letterSpacing: 'normal' }}>Experience</h3>
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                <h4 style={{ fontSize: '13px', fontWeight: 700 }}>{exp.role || 'Role'}</h4>
                <span style={{ fontSize: '11px' }}>{exp.duration}</span>
              </div>
              <p style={{ fontSize: '12px', fontStyle: 'italic', color: primaryColor, marginBottom: '4px' }}>{exp.company || 'Company Name'}</p>
              <p style={{ fontSize: '11px', lineHeight: '1.5', whiteSpace: 'pre-wrap', wordSpacing: '0.3px' }}>{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section style={{ marginBottom: '20px' }}>
          <h3 style={{ fontSize: '11px', color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '3px', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.4px', color: primaryColor }}>Education</h3>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1px' }}>
                <h4 style={{ fontSize: '13px', fontWeight: 700, color: textColor }}>{edu.degree || 'Degree'}</h4>
                <span style={{ fontSize: '11px', color: textColor, opacity: 0.8 }}>{edu.year}</span>
              </div>
              <p style={{ fontSize: '12px', color: primaryColor }}>{edu.school || 'School Name'}</p>
            </div>
          ))}
        </section>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        {skills.length > 0 && skills[0] !== '' && (
          <section>
            <h3 style={{ fontSize: '11px', borderBottom: '1px solid #e2e8f0', paddingBottom: '3px', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.4px', color: primaryColor }}>Skills</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {skills.map((skill, index) => (
                <span key={index} style={{ padding: '1px 5px', backgroundColor: `${textColor}11`, borderRadius: '2px', fontSize: '10px', color: textColor }}>
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}
        {languages.length > 0 && languages[0] !== '' && (
          <section>
            <h3 style={{ fontSize: '11px', borderBottom: '1px solid #e2e8f0', paddingBottom: '3px', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.4px', color: primaryColor }}>Languages</h3>
            <ul style={{ paddingLeft: '11px', margin: 0 }}>
              {languages.map((lang, index) => (
                <li key={index} style={{ fontSize: '11px', color: textColor }}>{lang}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  )

  const renderProfessional = () => (
    <div id="cv-preview-container" style={{ ...paperStyles, display: 'grid', gridTemplateColumns: '250px 1fr', fontFamily: 'Inter', color: textColor }}>
      {/* Sidebar */}
      <div style={{ backgroundColor: '#f8fafc', padding: '40px 30px', borderRight: '1px solid #e2e8f0' }}>
        {personalInfo.photo && (
          <div style={{ marginBottom: '20px', textAlign: 'center' }}>
            <img src={personalInfo.photo} alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: `2px solid ${primaryColor}` }} />
          </div>
        )}
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ fontSize: '18px', color: textColor, marginBottom: '3px', fontWeight: 800, letterSpacing: '0.8px' }}>{personalInfo.name || 'Your Name'}</h1>
          <p style={{ fontSize: '12px', color: primaryColor, fontWeight: 500, letterSpacing: '0.3px' }}>{personalInfo.title}</p>
        </div>
 
        <section style={{ marginBottom: '20px' }}>
          <h3 style={{ fontSize: '10px', color: textColor, opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '6px', fontWeight: 700 }}>Contact</h3>
          <p style={{ fontSize: '10px', color: textColor, marginBottom: '3px' }}>{personalInfo.email}</p>
          <p style={{ fontSize: '10px', color: textColor, marginBottom: '3px' }}>{personalInfo.phone}</p>
          <p style={{ fontSize: '10px', color: textColor }}>{personalInfo.location}</p>
        </section>

        {skills.length > 0 && (
          <section style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '12px', color: textColor, opacity: 0.6, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px', fontWeight: 700 }}>Skills</h3>
            <ul style={{ padding: 0, listStyle: 'none' }}>
              {skills.map((s, i) => <li key={i} style={{ fontSize: '12px', color: textColor, marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: primaryColor }}></span> {s}
              </li>)}
            </ul>
          </section>
        )}
      </div>

      {/* Main Content */}
      <div style={{ padding: '32px 24px' }}>
        <section style={{ marginBottom: '28px' }}>
          <h3 style={{ fontSize: '13px', color: '#0f172a', marginBottom: '10px', borderBottom: `2px solid ${primaryColor}`, display: 'inline-block', letterSpacing: '0.8px' }}>Profile</h3>
          <p style={{ fontSize: '12px', lineHeight: '1.5', color: textColor, letterSpacing: '0.2px', wordSpacing: '0.3px' }}>{personalInfo.summary}</p>
        </section>

        <section style={{ marginBottom: '28px' }}>
          <h3 style={{ fontSize: '13px', color: '#0f172a', marginBottom: '12px', borderBottom: `2px solid ${primaryColor}`, display: 'inline-block' }}>Experience</h3>
          {experience.map(exp => (
            <div key={exp.id} style={{ marginBottom: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h4 style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.4px' }}>{exp.role}</h4>
                <span style={{ fontSize: '10px', letterSpacing: '0.2px' }}>{exp.duration}</span>
              </div>
              <p style={{ fontSize: '12px', color: primaryColor, marginBottom: '5px', letterSpacing: '0.2px' }}>{exp.company}</p>
              <p style={{ fontSize: '11px', color: textColor, lineHeight: '1.5', letterSpacing: '0.2px', wordSpacing: '0.3px' }}>{exp.description}</p>
            </div>
          ))}
        </section>

        <section>
          <h3 style={{ fontSize: '16px', color: textColor, marginBottom: '20px', borderBottom: `2px solid ${primaryColor}`, display: 'inline-block' }}>Education</h3>
          {education.map(edu => (
            <div key={edu.id} style={{ marginBottom: '15px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 700, color: textColor }}>{edu.degree}</h4>
              <p style={{ fontSize: '13px', color: textColor, opacity: 0.8 }}>{edu.school} | {edu.year}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  )

  const renderCreative = () => (
    <div id="cv-preview-container" style={{ ...paperStyles, padding: '0', fontFamily: 'Outfit' }}>
      <div style={{ backgroundColor: primaryColor, padding: '40px 28px', color: 'white', display: 'flex', gap: '20px', alignItems: 'center' }}>
        {personalInfo.photo && (
          <img src={personalInfo.photo} alt="Profile" style={{ width: '85px', height: '85px', borderRadius: '1rem', objectFit: 'cover', border: '2px solid rgba(255,255,255,0.3)' }} />
        )}
        <div>
          <h1 style={{ fontSize: '24px', margin: 0, fontWeight: 900, lineHeight: '1.2' }}>{personalInfo.name}</h1>
          <p style={{ fontSize: '14px', opacity: 0.9, marginTop: '6px' }}>{personalInfo.title}</p>
        </div>
      </div>
      
      <div style={{ padding: '28px', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '28px' }}>
        <div>
          <section style={{ marginBottom: '28px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '10px', color: primaryColor }}>About Me</h3>
            <p style={{ fontSize: '12px', lineHeight: '1.5', color: textColor }}>{personalInfo.summary}</p>
          </section>
 
          <section>
            <h3 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '12px', color: primaryColor }}>The Journey</h3>
            {experience.map(exp => (
              <div key={exp.id} style={{ marginBottom: '20px', borderLeft: `2px solid ${primaryColor}22`, paddingLeft: '14px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 700, margin: 0 }}>{exp.role}</h4>
                <p style={{ fontSize: '12px', color: primaryColor, margin: '3px 0' }}>{exp.company} • {exp.duration}</p>
                <p style={{ fontSize: '12px', color: textColor, lineHeight: '1.5' }}>{exp.description}</p>
              </div>
            ))}
          </section>
        </div>
 
        <div>
          <section style={{ backgroundColor: '#f1f5f9', padding: '30px', borderRadius: '20px', marginBottom: '30px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '15px' }}>Contact</h3>
            <p style={{ fontSize: '14px', marginBottom: '8px' }}>{personalInfo.email}</p>
            <p style={{ fontSize: '14px', marginBottom: '8px' }}>{personalInfo.phone}</p>
            <p style={{ fontSize: '14px' }}>{personalInfo.location}</p>
          </section>

          <section style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '15px', color: primaryColor }}>Skills</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {skills.map((s, i) => <span key={i} style={{ padding: '6px 12px', background: `${primaryColor}11`, color: primaryColor, borderRadius: 'full', fontSize: '12px', fontWeight: 600, border: `1px solid ${primaryColor}33`, borderRadius: '20px' }}>{s}</span>)}
            </div>
          </section>
          
          <section>
            <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '15px', color: primaryColor }}>Education</h3>
            {education.map(edu => (
              <div key={edu.id} style={{ marginBottom: '15px' }}>
                <p style={{ fontSize: '14px', fontWeight: 700, margin: 0, color: textColor }}>{edu.degree}</p>
                <p style={{ fontSize: '13px', color: textColor, opacity: 0.7 }}>{edu.school}</p>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  )

  return (
    <div ref={wrapperRef} style={{ width: '100%', overflow: 'hidden', padding: '1rem 0', display: 'flex', justifyContent: 'center' }}>
      <div style={{ 
        width: `${Math.min(wrapperRef.current?.offsetWidth || 0, dimensions.w * mmToPx * scale)}px`,
        height: `${dimensions.h * mmToPx * scale}px`, 
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ 
          ...paperStyles,
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: `translateX(-50%) scale(${scale})`,
          transformOrigin: 'top center',
          boxShadow: '0 0 20px rgba(0,0,0,0.1)'
        }}>
          {theme === 'professional' ? renderProfessional() : 
           theme === 'creative' ? renderCreative() : 
           renderModern()}
        </div>
      </div>
    </div>
  )
}

export default CVPreview
