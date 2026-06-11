'use client';

import { ExternalLink, Play } from 'lucide-react';

function GithubIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export default function HomePage() {
  const scrollTo = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header className="border-b border-brandSilver/10 bg-brandBlack/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center">
          <a href="/" className="mr-auto">
            <img src="/logo.svg" alt="GripShift" className="h-9 w-auto" />
          </a>

          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-8 font-oswald text-sm tracking-wider uppercase">
              <a href="#concept" onClick={scrollTo('concept')} className="text-brandSilver hover:text-brandWhite transition-colors">The Concept</a>
              <a href="#how-it-works" onClick={scrollTo('how-it-works')} className="text-brandSilver hover:text-brandWhite transition-colors">How It Works</a>
              <a href="#inspiration" onClick={scrollTo('inspiration')} className="text-brandSilver hover:text-brandWhite transition-colors">Inspiration</a>
            </nav>

            <a href="https://github.com/l4ur4oliveira/gripshift" target="_blank" rel="noopener noreferrer" className="text-brandCrimson hover:text-red-500 transition-colors" aria-label="GitHub">
              <GithubIcon className="w-6 h-6" />
            </a>

            <a href="/app" className="bg-brandCrimson hover:bg-red-700 text-brandWhite text-sm font-oswald font-semibold uppercase tracking-wider px-5 h-11 rounded transition-all shadow-lg shadow-brandCrimson/10 hover:shadow-brandCrimson/25 flex items-center gap-2">
              Start Practice <Play className="w-4 h-4 fill-current" />
            </a>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <section className="max-w-6xl mx-auto px-6 pt-16 pb-24 md:py-32 grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-brandCard border border-brandSilver/10 text-xs text-brandCrimson font-oswald uppercase tracking-wider">
              <span className="flex h-2 w-2 rounded-full bg-brandCrimson animate-pulse"></span>
              100% Free & No Sign-up
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-oswald font-bold uppercase tracking-tight text-brandWhite leading-none">
              Master guitar chord <span className="text-brandCrimson">transitions</span>.
            </h1>

            <p className="text-lg text-brandSilver leading-relaxed max-w-xl">
              A minimalist tool designed for guitar players to accelerate muscle memory. Based on the proven 1-minute chord change exercise.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a href="/app" className="bg-brandCrimson hover:bg-red-700 text-brandWhite font-oswald uppercase tracking-wider font-bold px-8 py-4 rounded text-base transition-all shadow-xl shadow-brandCrimson/15 hover:shadow-brandCrimson/25 flex items-center justify-center gap-3">
                Open Practice App <Play className="w-5 h-5 fill-current" />
              </a>
              <a href="#concept" onClick={scrollTo('concept')} className="bg-brandCard hover:bg-brandBlack text-brandSilver hover:text-brandWhite border border-brandSilver/10 font-oswald uppercase tracking-wider font-medium px-8 py-4 rounded text-base transition-all flex items-center justify-center gap-2">
                Learn More
              </a>
            </div>
          </div>

          <div className="md:col-span-5 relative">
            <div className="absolute -inset-1 rounded bg-gradient-to-tr from-brandCrimson to-red-900 opacity-20 blur-xl"></div>
            <div className="relative bg-brandCard border border-brandSilver/10 rounded overflow-hidden shadow-2xl">
              <div className="aspect-[3/2] flex items-center justify-center bg-brandBlack/50 p-8">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-brandCard border border-brandSilver/10 flex items-center justify-center mx-auto">
                    <svg className="w-8 h-8 text-brandCrimson fill-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                  </div>
                  <p className="text-brandSilver text-sm font-oswald uppercase tracking-wider">App Preview</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="concept" className="border-y border-brandSilver/10 bg-brandCard/40 py-24">
          <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
            <h2 className="text-xs font-oswald text-brandCrimson uppercase tracking-widest font-bold">The Motivation Behind the Project</h2>
            <p className="text-2xl sm:text-3xl font-oswald font-bold text-brandWhite uppercase tracking-tight leading-relaxed">
              "Why are my chord changes so slow?"
            </p>
            <p className="text-brandSilver leading-relaxed max-w-3xl mx-auto">
              If you&rsquo;ve ever asked this question, you know it&rsquo;s the #1 obstacle for beginner guitarists. Your mind knows where to put your fingers, but your fingers don&rsquo;t respond in time. The answer to overcoming this barrier is to focus purely on <span className="text-brandWhite font-semibold">building mechanical muscle memory</span>.
            </p>
            <p className="text-brandSilver leading-relaxed max-w-xl mx-auto">
              <strong>GripShift</strong> removes all the visual clutter of a typical app. No slow animations, no annoying ads, no login screens. Just you, your chords, and the timer.
            </p>
          </div>
        </section>

        <section id="how-it-works" className="max-w-6xl mx-auto px-6 py-24 space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-oswald font-bold uppercase tracking-wider text-brandWhite">The 1-Minute Practice</h2>
            <p className="text-brandSilver max-w-xl mx-auto">Simple steps to transform your finger speed with the ideal study method.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: '01', title: 'Choose Two Chords', desc: <>Select two chords you want to master today. For example: <span className="text-brandWhite font-semibold">A Major</span> and <span className="text-brandWhite font-semibold">D Major</span>.</> },
              { num: '02', title: 'Start GripShift', desc: 'Start the 1-minute timer. Focus on transitioning between chords, strumming to ensure every note rings out clearly.' },
              { num: '03', title: 'Beat Your Score', desc: <>Count how many clean transitions you complete in 1 minute. Track your personal best. The recommended target is <span className="text-brandCrimson font-semibold">30 transitions per minute</span>.</> },
            ].map((step) => (
              <div key={step.num} className="bg-brandCard/30 border border-brandSilver/10 rounded p-8 hover:border-brandCrimson/30 transition-all group space-y-6">
                <div className="w-12 h-12 rounded bg-brandBlack border border-brandSilver/10 flex items-center justify-center text-brandCrimson font-oswald text-lg font-bold group-hover:bg-brandCrimson group-hover:text-brandWhite transition-colors">
                  {step.num}
                </div>
                <h3 className="text-xl font-oswald font-bold uppercase text-brandWhite">{step.title}</h3>
                <p className="text-brandSilver text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="inspiration" className="relative bg-gradient-to-b from-brandBlack to-brandCard border-t border-brandSilver/10 py-24 overflow-hidden">
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="grid md:grid-cols-12 gap-12 items-center">
              <div className="md:col-span-7 space-y-6">
                <div className="text-xs font-oswald text-brandCrimson uppercase tracking-widest font-bold">
                  Inspiration & Pedagogy
                </div>
                <h2 className="text-3xl font-oswald font-bold uppercase text-brandWhite tracking-tight">
                  A Homage to the JustinGuitar Course
                </h2>
                <p className="text-brandSilver leading-relaxed">
                  This tool is directly motivated by the highly effective <strong>"One Minute Changes"</strong> exercise created by <strong>Justin Sandercoe</strong> (JustinGuitar), a living legend of free guitar education worldwide.
                </p>
                <p className="text-brandSilver leading-relaxed">
                  We strongly recommend that every beginner follows the structured curriculum on his official website to understand proper posture, pivot fingers, and economy of motion.
                </p>
                <div className="pt-2">
                  <a href="https://www.justinguitar.com" target="_blank" rel="noopener noreferrer" className="text-brandCrimson hover:text-red-500 font-oswald font-bold text-sm inline-flex items-center gap-2 uppercase tracking-wider group">
                    Visit JustinGuitar.com <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden md:block absolute top-0 right-0 w-1/2 h-full">
            <div className="w-full h-full" style={{
              backgroundImage: 'url(/bg-acoustic.avif)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              maskImage: 'linear-gradient(to right, transparent 0%, black 50%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 50%)',
            }} />
          </div>
        </section>

        <section className="bg-brandBlack py-24 border-t border-brandSilver/10 text-center">
          <div className="max-w-3xl mx-auto px-6 space-y-8">
            <h2 className="text-3xl sm:text-4xl font-oswald font-bold uppercase text-brandWhite tracking-wider">
              Ready to start improving?
            </h2>
            <p className="text-brandSilver max-w-lg mx-auto">
              Take just 1 minute a day. Your fingers will thank you when playing your favorite songs.
            </p>
            <a href="/app" className="bg-brandCrimson hover:bg-red-700 text-brandWhite font-oswald font-bold uppercase tracking-wider px-10 py-5 rounded text-lg transition-all shadow-xl shadow-brandCrimson/10 hover:shadow-brandCrimson/20 inline-flex items-center gap-3">
              Enter GripShift <Play className="w-5 h-5 fill-current" />
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-brandSilver/10 bg-brandBlack py-4 text-center text-brandSilver text-xs">
        <div className="max-w-6xl mx-auto space-y-2">
          <p>
            Inspired by the "One Minute Changes" exercise by <a href="https://www.justinguitar.com" target="_blank" rel="noopener noreferrer" className="hover:text-brandCrimson underline">JustinGuitar</a>.
          </p>
          <p>
            Made with 🎸 by <a href="https://oliveilaura.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-brandCrimson underline">l4uOliveira</a>
          </p>
        </div>
      </footer>
    </>
  );
}
