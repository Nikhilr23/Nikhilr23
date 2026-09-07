import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

const nav = ['Story', 'Jobs', 'Message']
const socials = ['Instagram', 'TikTok', 'YouTube']

const FadeLink = ({ label, delay }: { label: string; delay: number }) => (
  <a className="anim-fade-up transition-opacity duration-300 hover:opacity-60" style={{ animationDelay: `${delay}ms` }} href="#">{label}</a>
)

export default function App() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <section className="relative h-[100dvh] w-full overflow-hidden bg-black font-hn text-cream">
      <img className="anim-fade-in absolute inset-0 h-full w-full object-cover" src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260729_022513_486985a2-ac8c-4278-91a8-071dcd9fcaff.png&w=1280&q=85" alt="" />

      <div className="anim-fade-up absolute inset-x-0 top-[16vh] z-10 overflow-hidden sm:top-[14vh]" style={{ animationDelay: '500ms' }} aria-hidden="true">
        <div className="marquee flex w-max whitespace-nowrap font-hn text-[16vh] leading-none text-cream sm:text-[26vh]">
          <span className="pr-[6vw]">Marcus &mdash; Bennet&nbsp;</span>
          <span className="pr-[6vw]">Marcus &mdash; Bennet&nbsp;</span>
        </div>
      </div>

      <div className="anim-line absolute inset-x-6 bottom-[5.5rem] z-10 h-0.5 origin-left bg-cream sm:inset-x-10 sm:bottom-28" style={{ animationDelay: '1200ms' }} />

      <img className="anim-rise-in pointer-events-none absolute inset-0 z-20 h-full w-full object-cover" style={{ animationDelay: '300ms' }} src="https://stone-expand-60400629.figma.site/_assets/v11/8da570354e86aa0d44ac3e4aa335a72c8e750d68.png" alt="Portrait" />

      <header className="absolute inset-x-0 top-0 z-30 flex items-start justify-between px-6 pt-6 sm:px-10 sm:pt-8">
        <a className="anim-fade-up font-hn text-lg tracking-wide" style={{ animationDelay: '800ms' }} href="#">Marcus</a>
        <div className="hidden items-start gap-16 sm:flex lg:gap-24">
          <span className="anim-fade-up text-sm" style={{ animationDelay: '900ms' }}>2025</span>
          <nav className="flex flex-col gap-0.5 text-sm" aria-label="Site Index">{nav.map((item, i) => <FadeLink key={item} label={item} delay={1000 + i * 80} />)}</nav>
          <nav className="flex flex-col gap-0.5 text-sm" aria-label="Find Me">{socials.map((item, i) => <FadeLink key={item} label={item} delay={1150 + i * 80} />)}</nav>
        </div>
        <button className="anim-fade-up relative z-50 flex h-10 w-10 items-center justify-center sm:hidden" style={{ animationDelay: '900ms' }} onClick={() => setOpen(v => !v)} aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'}>
          <span className="relative h-4 w-6">
            <i className={`absolute left-0 top-0 block h-px w-6 bg-cream transition-all duration-500 ease-drawer ${open ? 'translate-y-[7.5px] rotate-45' : ''}`} />
            <i className={`absolute left-0 top-[7.5px] block h-px w-6 bg-cream transition-opacity duration-300 ${open ? 'opacity-0' : ''}`} />
            <i className={`absolute bottom-0 left-0 block h-px w-6 bg-cream transition-all duration-500 ease-drawer ${open ? '-translate-y-[7.5px] -rotate-45' : ''}`} />
          </span>
        </button>
      </header>

      <footer className="absolute inset-x-0 bottom-0 z-30 flex items-end justify-between px-6 pb-5 text-xs leading-relaxed sm:z-10 sm:px-10 sm:pb-8 sm:text-sm">
        <p className="anim-fade-up" style={{ animationDelay: '1400ms' }}>Visuals Composer<br />Digital Crafter<br />Obsessed by The Office</p>
        <p className="anim-fade-up text-right" style={{ animationDelay: '1550ms' }}>A homage to<br />Marcus Holloway</p>
      </footer>

      <div className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-500 sm:hidden ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`} onClick={() => setOpen(false)} aria-hidden="true" />
      <aside className={`fixed inset-y-0 right-0 z-40 w-[80%] max-w-sm bg-[#141414] px-8 py-10 transition-transform duration-[600ms] ease-drawer sm:hidden ${open ? 'translate-x-0' : 'translate-x-full'}`} aria-hidden={!open}>
        <button className={`absolute right-6 top-6 z-50 transition-all duration-500 ${open ? 'rotate-0 opacity-100 delay-300' : 'rotate-90 opacity-0'}`} onClick={() => setOpen(false)} aria-label="Close menu"><X size={26} strokeWidth={1.5} /></button>
        <div className="flex h-full flex-col justify-center">
          <p className={`mb-7 text-xs uppercase tracking-[0.2em] text-cream/50 transition-all duration-500 ${open ? 'translate-y-0 opacity-100 delay-[250ms]' : 'translate-y-4 opacity-0'}`}>Site Index</p>
          <nav className="flex flex-col">{nav.map((item, i) => <a key={item} href="#" className={`text-4xl leading-[1.15] transition-all duration-500 ${open ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`} style={{ transitionDelay: open ? `${300 + i * 80}ms` : '0ms' }}>{item}</a>)}</nav>
          <p className={`mb-5 mt-16 text-xs uppercase tracking-[0.2em] text-cream/50 transition-all duration-500 ${open ? 'translate-y-0 opacity-100 delay-500' : 'translate-y-4 opacity-0'}`}>Find Me</p>
          <nav className="flex flex-wrap gap-x-6 gap-y-2">{socials.map((item, i) => <a key={item} href="#" className={`text-sm transition-all duration-500 ${open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: open ? `${550 + i * 60}ms` : '0ms' }}>{item}</a>)}</nav>
        </div>
      </aside>
    </section>
  )
}
