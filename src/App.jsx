import { useState } from 'react';
import Preloader from './components/Preloader'
import GlobalBackground from './components/GlobalBackground'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Expertise from './components/Expertise'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import Footer from './components/Footer'
import PrivacyModal from './components/PrivacyModal'
import { Toaster } from 'react-hot-toast'

function App() {
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  return (
    <>
      <Toaster 
        position="bottom-right" 
        toastOptions={{ 
          style: { 
            background: '#0f172a', 
            color: '#fff', 
            border: '1px solid #1e293b' 
          } 
        }} 
      />
      <GlobalBackground />
      <Preloader />
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Expertise />
      <Skills />
      <Projects />
      <Certifications />
      <Contact openPrivacyModal={() => setIsPrivacyModalOpen(true)} />
      <Footer openPrivacyModal={() => setIsPrivacyModalOpen(true)} />
      <PrivacyModal isOpen={isPrivacyModalOpen} onClose={() => setIsPrivacyModalOpen(false)} />
    </>
  )
}

export default App
