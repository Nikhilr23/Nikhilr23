import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu, Play, X } from 'lucide-react'
import portrait from './assets/nikhil-hero-cutout.webp'

type Panel = 'ABOUT' | 'PROCESS' | 'PROJECTS' | 'TOOLKIT'
const panels: Panel[] = ['ABOUT', 'PROCESS', 'PROJECTS', 'TOOLKIT']
const links = [...panels, 'GITHUB', 'CONTACT'] as const
const github = 'https://github.com/Nikhilr23'
const linkedin = 'https://www.linkedin.com/in/nikhil-reddy-chitkula/'
const projects = [
  { name: 'NoShowCalc', type: 'Healthcare operations', description: 'Estimate the annual cost of missed appointments from practice-level assumptions.', live: 'https://nikhilr23.github.io/noshowcalc/', source: 'https://github.com/Nikhilr23/noshowcalc' },
  { name: 'ProfitQuote', type: 'Pricing tool', description: 'See job cost, projected profit, margin, and the quote needed to meet a target margin.', live: 'https://nikhilr23.github.io/profitquote/', source: 'https://github.com/Nikhilr23/profitquote' },
  { name: 'ConvertLab', type: 'Browser utility', description: 'Convert supported image and data formats locally in the browser.', live: 'https://nikhilr23.github.io/convertlab/', source: 'https://github.com/Nikhilr23/convertlab' },
  { name: 'MindSync', type: 'Health informatics', description: 'A digital wellness prototype with mood tracking, resources, and a guided companion.', source: 'https://github.com/Nikhilr23/MindSync-Demo' },
]

function Logo() {
  return <span className="inline-flex h-8 w-8 items-center justify-center border border-white text-[11px] font-semibold tracking-[-.14em]" aria-label="Nikhil Reddy">NR</span>
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [panel, setPanel] = useState<Panel | null>(null)

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') { setMenuOpen(false); setPanel(null) } }
    window.addEventListener('keydown', onEscape)
    return () => window.removeEventListener('keydown', onEscape)
  }, [])

  const navigate = (link: typeof links[number]) => {
    setMenuOpen(false)
    if (panels.includes(link as Panel)) setPanel(link as Panel)
    else window.open(link === 'GITHUB' ? github : linkedin, '_blank', 'noopener,noreferrer')
  }

  return <div className="relative h-screen w-full overflow-x-hidden overflow-y-auto bg-black text-white lg:overflow-hidden">
    <img className="pointer-events-none absolute bottom-[15%] left-1/2 h-[55%] w-auto max-w-none -translate-x-1/2 object-contain md:bottom-[12%] md:h-[65%]" src={portrait} alt="" aria-hidden="true" />
    <div className="relative z-10 flex min-h-full flex-col px-5 sm:px-6 md:px-10 lg:h-full lg:min-h-0 lg:px-14">
      <header className="flex items-center justify-between py-6">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm tracking-wide md:flex" aria-label="Main navigation">
          {links.map(link => <button key={link} type="button" onClick={() => navigate(link)} className="transition-opacity hover:opacity-70">{link}</button>)}
        </nav>
        <button className="p-2 transition-opacity hover:opacity-70 md:hidden" type="button" aria-label="Open menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}><Menu size={24} /></button>
      </header>

      <div className="mt-4 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-8">
        <div>
          <h2 className="text-lg font-normal leading-tight tracking-wide md:text-xl">NIKHIL<br /><span className="font-pixel text-2xl md:text-3xl">REDDY</span></h2>
          <div className="mt-3 text-[10px] text-white/50">*</div>
          <p className="font-pixel mt-1 text-xs leading-relaxed text-white/60">Healthcare systems,<br />secure access, data,<br />and practical software<br />built around people.</p>
        </div>
        <div className="text-right lg:text-left">
          <h2 className="text-lg font-normal leading-tight tracking-wide md:text-xl">HEALTHCARE<br /><span className="font-pixel text-2xl md:text-3xl">SYSTEMS</span></h2>
        </div>
        <div>
          <h3 className="font-pixel mb-3 text-base uppercase tracking-widest text-white/50">What I Do</h3>
          <p className="max-w-[220px] text-sm leading-relaxed text-white/90">I turn complex workflows and data into clearer tools and decisions.</p>
        </div>
        <div className="text-right lg:text-left">
          <h3 className="font-pixel mb-3 text-base uppercase tracking-widest text-white/50">Focus Areas</h3>
          <ul className="space-y-0.5 text-sm leading-relaxed text-white/90">
            <li>Healthcare IT &amp; EHR Support</li><li>Identity &amp; Access</li><li>Clinical Workflows</li><li>HL7 / FHIR</li><li>SQL &amp; Analytics</li><li>Browser-Based Products</li>
          </ul>
        </div>
      </div>

      <div className="flex-1" />
      <div className="pb-4">
        <div className="grid grid-cols-1 items-end gap-4 sm:gap-6 lg:grid-cols-2">
          <h1 className="text-3xl font-normal uppercase tracking-wide sm:text-4xl md:text-5xl lg:text-[3.75rem] xl:text-[4.25rem]" style={{ lineHeight: 0.82 }}>
            I MAKE COMPLEX<br /><span className="font-pixel inline-block text-[1.25em] leading-none align-baseline">SYSTEMS</span> FEEL<br />CLEARER FOR<br /><span className="font-pixel inline-block text-[1.25em] leading-none align-baseline">PEOPLE.</span>
          </h1>
          <div className="flex flex-col justify-end gap-4 sm:gap-6">
            <button className="flex items-center gap-3 self-start border border-white/30 bg-white/5 px-6 py-3 backdrop-blur-sm transition-colors hover:bg-white/10" type="button" onClick={() => setPanel('PROJECTS')}><Play size={14} fill="white" /><span className="text-sm tracking-wider">VIEW SELECTED WORK</span></button>
            <div className="flex flex-wrap items-stretch gap-2 self-start text-sm text-white/80 sm:gap-3 lg:self-end">
              <div className="flex items-center gap-2 bg-[#0B0B0B] px-3 py-2 sm:px-4"><b className="text-sm tracking-tight sm:text-base">EHR</b><span className="text-xs text-white/50">WORKFLOWS</span></div>
              <div className="flex items-center gap-2 bg-[#0B0B0B] px-3 py-2 sm:px-4"><b className="text-lg sm:text-xl">IAM</b><span className="text-xs text-white/50">ACCESS</span></div>
              <div className="flex items-center gap-2 bg-[#0B0B0B] px-3 py-2 sm:px-4"><b className="text-[10px] tracking-tight sm:text-xs">HL7 / FHIR</b><span className="text-xs text-white/50">DATA</span></div>
            </div>
          </div>
        </div>
        <footer className="mt-4 grid grid-cols-1 gap-2 pt-4 text-xs text-white/60 sm:mt-5 sm:grid-cols-2 sm:gap-4">
          <p>Open to healthcare IT opportunities. <a className="text-red-500 transition-colors hover:text-red-400" href={linkedin} target="_blank" rel="noreferrer">Connect on LinkedIn</a></p>
          <p className="sm:text-right">Healthcare IT &bull; Identity &amp; Access &bull; Useful Software</p>
        </footer>
      </div>
    </div>

    <div className={`fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${menuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`} aria-hidden={!menuOpen}>
      <div className="flex items-center justify-between px-6 py-6"><Logo /><button type="button" className="p-2 transition-opacity hover:opacity-70" aria-label="Close menu" onClick={() => setMenuOpen(false)}><X size={24} /></button></div>
      <nav className="flex flex-1 flex-col items-center justify-center gap-8" aria-label="Mobile navigation">
        {links.map((link, i) => <button key={link} type="button" onClick={() => navigate(link)} className={`text-2xl tracking-widest transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: menuOpen ? `${100 + i * 60}ms` : '0ms' }}>{link}</button>)}
      </nav>
    </div>

    {panel && <section className="fixed inset-0 z-[60] overflow-y-auto bg-[#0B0B0B]/95 px-5 py-6 text-white backdrop-blur-xl sm:px-10 lg:px-14" role="dialog" aria-modal="true" aria-label={panel}>
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between"><Logo /><button type="button" onClick={() => setPanel(null)} className="p-2 transition-opacity hover:opacity-70" aria-label="Close section"><X size={24} /></button></div>
        <p className="font-pixel mt-14 text-sm tracking-widest text-white/50">NIKHIL REDDY / {panel}</p>
        <h2 className="mt-4 text-4xl font-normal uppercase tracking-tight sm:text-6xl">{panel === 'PROJECTS' ? 'SELECTED WORK.' : panel === 'ABOUT' ? 'WORKFLOW FIRST.' : panel === 'PROCESS' ? 'HOW I BUILD.' : 'MY TOOLKIT.'}</h2>
        {panel === 'PROJECTS' && <div className="mt-10 grid gap-3 md:grid-cols-2">{projects.map((project, index) => <article key={project.name} className="border border-white/20 bg-black/40 p-6"><p className="font-pixel text-xs text-white/50">0{index + 1} / {project.type}</p><h3 className="mt-6 text-2xl">{project.name}</h3><p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">{project.description}</p><div className="mt-8 flex gap-6 text-sm">{project.live && <a className="inline-flex items-center gap-1 hover:text-red-400" href={project.live} target="_blank" rel="noreferrer">Live project <ArrowUpRight size={14} /></a>}<a className="inline-flex items-center gap-1 hover:text-red-400" href={project.source} target="_blank" rel="noreferrer">Source <ArrowUpRight size={14} /></a></div></article>)}</div>}
        {panel === 'ABOUT' && <div className="mt-10 max-w-2xl space-y-5 text-lg leading-relaxed text-white/80"><p>I work across healthcare operations, application support, identity, data, and product thinking. I start with what people need to accomplish, then make the technology clearer.</p><p>My M.S. in Health Informatics informs how I think about clinical workflows, usable software, and responsible use of data.</p><a className="inline-flex items-center gap-2 text-red-400" href={linkedin} target="_blank" rel="noreferrer">Connect on LinkedIn <ArrowUpRight size={16} /></a></div>}
        {panel === 'PROCESS' && <ol className="mt-10 grid gap-4 md:grid-cols-3">{[['01','Understand the workflow','Start with the decision someone needs to make.'],['02','Make the logic visible','Show assumptions, steps, and tradeoffs clearly.'],['03','Ship a focused tool','Build a small useful version, then learn from feedback.']].map(step => <li key={step[0]} className="border-t border-white/40 py-5"><span className="font-pixel text-white/50">{step[0]}</span><h3 className="mt-8 text-xl">{step[1]}</h3><p className="mt-3 text-sm leading-relaxed text-white/70">{step[2]}</p></li>)}</ol>}
        {panel === 'TOOLKIT' && <div className="mt-10 grid gap-4 md:grid-cols-2">{[['EHR & workflows','Epic exposure, clinical application support, HL7, FHIR'],['Identity & security','RBAC, Active Directory, Entra ID, Okta, ServiceNow'],['Data','SQL, Power BI, Excel'],['Product building','React, TypeScript, browser-based tools']].map(item => <div key={item[0]} className="border-t border-white/40 py-5"><h3 className="text-xl">{item[0]}</h3><p className="mt-3 text-sm text-white/70">{item[1]}</p></div>)}</div>}
      </div>
    </section>}
  </div>
}
