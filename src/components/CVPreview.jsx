import React from 'react'
import { Mail, Phone, MapPin, Globe, Award, Briefcase, GraduationCap, Sparkles } from 'lucide-react'

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
    <div id="cv-preview-container" style={{ ...paperStyles, padding: '45px', color: textColor, fontFamily: 'Inter', display: 'flex', flexDirection: 'column' }}>
      <header style={{ borderBottom: `2.5px solid ${primaryColor}`, paddingBottom: '20px', marginBottom: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '32px', color: textColor, marginBottom: '6px', fontFamily: 'Outfit', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: '1' }}>{personalInfo.name || 'Your Name'}</h1>
          <h2 style={{ fontSize: '16px', color: primaryColor, fontWeight: 600, marginBottom: '15px', fontFamily: 'Outfit', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{personalInfo.title || 'Professional Title'}</h2>
          <div style={{ display: 'flex', gap: '15px', fontSize: '11px', color: textColor, opacity: 0.9, flexWrap: 'wrap', fontWeight: 500 }}>
            {personalInfo.email && <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Mail size={12} color={primaryColor} /> {personalInfo.email}</span>}
            {personalInfo.phone && <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Phone size={12} color={primaryColor} /> {personalInfo.phone}</span>}
            {personalInfo.location && <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><MapPin size={12} color={primaryColor} /> {personalInfo.location}</span>}
          </div>
        </div>
        {personalInfo.photo && (
          <div style={{ padding: '4px', background: `${primaryColor}11`, borderRadius: '1rem', border: `1px solid ${primaryColor}33` }}>
            <img src={personalInfo.photo} alt="Profile" style={{ width: '85px', height: '85px', borderRadius: '0.9rem', objectFit: 'cover' }} />
          </div>
        )}
      </header>
 
      {personalInfo.summary && (
        <section style={{ marginBottom: '25px' }}>
          <h3 style={{ fontSize: '12px', marginBottom: '10px', textTransform: 'uppercase', color: primaryColor, fontWeight: 800, letterSpacing: '0.1em', fontFamily: 'Outfit' }}>Profile Summary</h3>
          <p style={{ fontSize: '12.5px', lineHeight: '1.6', color: textColor, opacity: 0.9 }}>{personalInfo.summary}</p>
        </section>
      )}
 
      {experience.length > 0 && (
        <section style={{ marginBottom: '25px' }}>
          <h3 style={{ fontSize: '12px', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px', marginBottom: '15px', textTransform: 'uppercase', color: primaryColor, fontWeight: 800, letterSpacing: '0.1em', fontFamily: 'Outfit' }}>Experience</h3>
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 700, fontFamily: 'Outfit' }}>{exp.role || 'Role'}</h4>
                <span style={{ fontSize: '11px', fontWeight: 600, opacity: 0.7 }}>{exp.duration}</span>
              </div>
              <p style={{ fontSize: '12.5px', fontWeight: 600, color: primaryColor, marginBottom: '6px' }}>{exp.company || 'Company Name'}</p>
              <p style={{ fontSize: '11.5px', lineHeight: '1.6', color: textColor, opacity: 0.85, whiteSpace: 'pre-wrap' }}>{exp.description}</p>
            </div>
          ))}
        </section>
      )}
 
      {education.length > 0 && (
        <section style={{ marginBottom: '25px' }}>
          <h3 style={{ fontSize: '12px', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px', marginBottom: '15px', textTransform: 'uppercase', color: primaryColor, fontWeight: 800, letterSpacing: '0.1em', fontFamily: 'Outfit' }}>Education</h3>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 700, fontFamily: 'Outfit' }}>{edu.degree || 'Degree'}</h4>
                <span style={{ fontSize: '11px', fontWeight: 600, opacity: 0.7 }}>{edu.year}</span>
              </div>
              <p style={{ fontSize: '12.5px', fontWeight: 600, color: primaryColor }}>{edu.school || 'School Name'}</p>
            </div>
          ))}
        </section>
      )}
 
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '30px', marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #f1f5f9' }}>
        {skills.length > 0 && skills[0] !== '' && (
          <section>
            <h3 style={{ fontSize: '11px', marginBottom: '10px', textTransform: 'uppercase', color: primaryColor, fontWeight: 800, letterSpacing: '0.1em', fontFamily: 'Outfit' }}>Expertise</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {skills.map((skill, index) => (
                <span key={index} style={{ padding: '3px 8px', backgroundColor: `${primaryColor}08`, border: `1px solid ${primaryColor}15`, borderRadius: '4px', fontSize: '10px', fontWeight: 600, color: textColor }}>
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}
        {languages.length > 0 && languages[0] !== '' && (
          <section>
            <h3 style={{ fontSize: '11px', marginBottom: '10px', textTransform: 'uppercase', color: primaryColor, fontWeight: 800, letterSpacing: '0.1em', fontFamily: 'Outfit' }}>Languages</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {languages.map((lang, index) => (
                <div key={index} style={{ fontSize: '11px', color: textColor, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: primaryColor }}></div>
                  {lang}
                </div>
              ))}
            </div>
          </section>
        )}
        {interests.length > 0 && interests[0] !== '' && (
          <section>
            <h3 style={{ fontSize: '11px', marginBottom: '10px', textTransform: 'uppercase', color: primaryColor, fontWeight: 800, letterSpacing: '0.1em', fontFamily: 'Outfit' }}>Interests</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {interests.map((interest, index) => (
                <div key={index} style={{ fontSize: '11px', color: textColor, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: primaryColor }}></div>
                  {interest}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )

  const renderProfessional = () => (
    <div id="cv-preview-container" style={{ ...paperStyles, display: 'grid', gridTemplateColumns: '270px 1fr', fontFamily: 'Inter', color: textColor }}>
      {/* Sidebar */}
      <div style={{ backgroundColor: '#fcfcfc', padding: '50px 35px', borderRight: '1px solid #f1f5f9' }}>
        {personalInfo.photo && (
          <div style={{ marginBottom: '30px', position: 'relative' }}>
            <div style={{ width: '120px', height: '120px', margin: '0 auto', borderRadius: '50%', border: `4px solid white`, boxShadow: '0 4px 15px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
              <img src={personalInfo.photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        )}
        
        <section style={{ marginBottom: '30px' }}>
          <h3 style={{ fontSize: '11px', color: primaryColor, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '15px', fontWeight: 800 }}>Contact Info</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {personalInfo.email && <div style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '8px' }}><Mail size={12} /> {personalInfo.email}</div>}
            {personalInfo.phone && <div style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '8px' }}><Phone size={12} /> {personalInfo.phone}</div>}
            {personalInfo.location && <div style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin size={12} /> {personalInfo.location}</div>}
          </div>
        </section>
 
        {skills.length > 0 && skills[0] !== '' && (
          <section style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '11px', color: primaryColor, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '15px', fontWeight: 800 }}>Expertise</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {skills.map((s, i) => <div key={i} style={{ fontSize: '12px', fontWeight: 500 }}>{s}</div>)}
            </div>
          </section>
        )}
  
        {languages.length > 0 && languages[0] !== '' && (
          <section style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '11px', color: primaryColor, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '15px', fontWeight: 800 }}>Languages</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {languages.map((l, i) => <div key={i} style={{ fontSize: '11.5px', color: textColor }}>{l}</div>)}
            </div>
          </section>
        )}
  
        {interests.length > 0 && interests[0] !== '' && (
          <section>
            <h3 style={{ fontSize: '11px', color: primaryColor, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '15px', fontWeight: 800 }}>Interests</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {interests.map((it, i) => <div key={i} style={{ fontSize: '11.5px', color: textColor }}>{it}</div>)}
            </div>
          </section>
        )}
      </div>
 
      {/* Main Content */}
      <div style={{ padding: '50px 40px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '50px', left: '0', width: '3px', height: '100px', background: primaryColor }}></div>
        <header style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '38px', fontFamily: 'Playfair Display', fontWeight: 700, margin: 0, lineHeight: '1.2' }}>{personalInfo.name || 'Your Name'}</h1>
          <p style={{ fontSize: '16px', color: primaryColor, fontWeight: 600, marginTop: '8px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{personalInfo.title}</p>
        </header>

        <section style={{ marginBottom: '35px' }}>
          <h3 style={{ fontSize: '13px', color: primaryColor, marginBottom: '12px', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.1em' }}>Profile</h3>
          <p style={{ fontSize: '13px', lineHeight: '1.7', color: textColor, opacity: 0.9 }}>{personalInfo.summary}</p>
        </section>
 
        <section style={{ marginBottom: '35px' }}>
          <h3 style={{ fontSize: '13px', color: primaryColor, marginBottom: '15px', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.1em' }}>Professional Experience</h3>
          {experience.map(exp => (
            <div key={exp.id} style={{ marginBottom: '22px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                <h4 style={{ fontSize: '15px', fontWeight: 700, fontFamily: 'Playfair Display' }}>{exp.role}</h4>
                <span style={{ fontSize: '11px', fontWeight: 600, opacity: 0.7 }}>{exp.duration}</span>
              </div>
              <p style={{ fontSize: '13px', color: primaryColor, fontWeight: 600, marginBottom: '8px' }}>{exp.company}</p>
              <p style={{ fontSize: '12px', color: textColor, lineHeight: '1.7', opacity: 0.85 }}>{exp.description}</p>
            </div>
          ))}
        </section>
 
        <section>
          <h3 style={{ fontSize: '13px', color: primaryColor, marginBottom: '15px', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.1em' }}>Education</h3>
          {education.map(edu => (
            <div key={edu.id} style={{ marginBottom: '15px' }}>
              <h4 style={{ fontSize: '15px', fontWeight: 700, fontFamily: 'Playfair Display' }}>{edu.degree}</h4>
              <p style={{ fontSize: '13px', color: textColor, opacity: 0.8, marginTop: '2px' }}>{edu.school} | {edu.year}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  )

  const renderCreative = () => (
    <div id="cv-preview-container" style={{ ...paperStyles, padding: '0', fontFamily: 'Outfit' }}>
      <header style={{ 
        background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}dd)`, 
        padding: '50px 40px', 
        color: 'white', 
        display: 'flex', 
        gap: '30px', 
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle decorative circles */}
        <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }}></div>
        <div style={{ position: 'absolute', bottom: '-20%', left: '10%', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)' }}></div>

        {personalInfo.photo && (
          <div style={{ position: 'relative', zIndex: 1 }}>
            <img src={personalInfo.photo} alt="Profile" style={{ width: '110px', height: '110px', borderRadius: '2rem', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.4)', boxShadow: '0 8px 20px rgba(0,0,0,0.2)' }} />
          </div>
        )}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontSize: '36px', margin: 0, fontWeight: 900, lineHeight: '1.1', letterSpacing: '-0.02em' }}>{personalInfo.name}</h1>
          <p style={{ fontSize: '16px', opacity: 0.95, marginTop: '8px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{personalInfo.title}</p>
          <div style={{ display: 'flex', gap: '15px', fontSize: '11px', marginTop: '15px', opacity: 0.9, flexWrap: 'wrap' }}>
            {personalInfo.email && <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Mail size={12} /> {personalInfo.email}</span>}
            {personalInfo.phone && <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Phone size={12} /> {personalInfo.phone}</span>}
          </div>
        </div>
      </header>
      
      <div style={{ padding: '40px', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '40px' }}>
        <div>
          <section style={{ marginBottom: '35px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
              <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: `${primaryColor}11`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sparkles size={16} color={primaryColor} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 900, margin: 0, color: primaryColor, textTransform: 'uppercase' }}>About Me</h3>
            </div>
            <p style={{ fontSize: '13px', lineHeight: '1.7', color: textColor, opacity: 0.9 }}>{personalInfo.summary}</p>
          </section>
 
          <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
              <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: `${primaryColor}11`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Briefcase size={16} color={primaryColor} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 900, margin: 0, color: primaryColor, textTransform: 'uppercase' }}>The Journey</h3>
            </div>
            {experience.map(exp => (
              <div key={exp.id} style={{ marginBottom: '25px', position: 'relative', paddingLeft: '20px' }}>
                <div style={{ position: 'absolute', left: 0, top: '6px', width: '8px', height: '8px', borderRadius: '50%', background: primaryColor }}></div>
                <div style={{ position: 'absolute', left: '3.5px', top: '14px', bottom: '-20px', width: '1px', background: `${primaryColor}22` }}></div>
                <h4 style={{ fontSize: '15px', fontWeight: 800, margin: 0 }}>{exp.role}</h4>
                <p style={{ fontSize: '13px', color: primaryColor, fontWeight: 700, margin: '4px 0' }}>{exp.company} • {exp.duration}</p>
                <p style={{ fontSize: '12.5px', color: textColor, lineHeight: '1.6', opacity: 0.85 }}>{exp.description}</p>
              </div>
            ))}
          </section>
        </div>
 
        <div>
          <section style={{ backgroundColor: '#fcfcfc', border: '1px solid #f1f5f9', padding: '30px', borderRadius: '24px', marginBottom: '35px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 900, marginBottom: '15px', textTransform: 'uppercase' }}>Contact</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <p style={{ fontSize: '13px', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}><Mail size={14} color={primaryColor} /> {personalInfo.email}</p>
              <p style={{ fontSize: '13px', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}><Phone size={14} color={primaryColor} /> {personalInfo.phone}</p>
              <p style={{ fontSize: '13px', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}><MapPin size={14} color={primaryColor} /> {personalInfo.location}</p>
            </div>
          </section>

          <section style={{ marginBottom: '35px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 900, marginBottom: '20px', color: primaryColor, textTransform: 'uppercase' }}>Mastery</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {skills.map((s, i) => <span key={i} style={{ padding: '8px 16px', background: `${primaryColor}08`, color: primaryColor, borderRadius: '12px', fontSize: '12px', fontWeight: 800, border: `1.5px solid ${primaryColor}15` }}>{s}</span>)}
            </div>
          </section>
          
          <section style={{ marginBottom: '35px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 900, marginBottom: '15px', color: primaryColor, textTransform: 'uppercase' }}>Education</h3>
            {education.map(edu => (
              <div key={edu.id} style={{ marginBottom: '15px' }}>
                <p style={{ fontSize: '14px', fontWeight: 800, margin: 0, color: textColor }}>{edu.degree}</p>
                <p style={{ fontSize: '13px', color: primaryColor, fontWeight: 600 }}>{edu.school}</p>
                <p style={{ fontSize: '11px', opacity: 0.6 }}>{edu.year}</p>
              </div>
            ))}
          </section>
 
          {languages.length > 0 && languages[0] !== '' && (
            <section style={{ marginBottom: '35px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 900, marginBottom: '12px', color: primaryColor, textTransform: 'uppercase' }}>Languages</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {languages.map((l, i) => <span key={i} style={{ fontSize: '12.5px', color: textColor, fontWeight: 500 }}>{l}</span>)}
              </div>
            </section>
          )}
 
          {interests.length > 0 && interests[0] !== '' && (
            <section>
              <h3 style={{ fontSize: '16px', fontWeight: 900, marginBottom: '12px', color: primaryColor, textTransform: 'uppercase' }}>Interests</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {interests.map((it, i) => <span key={i} style={{ fontSize: '12.5px', color: textColor, fontWeight: 500 }}>{it}</span>)}
              </div>
            </section>
          )}
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
