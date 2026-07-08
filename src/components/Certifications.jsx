import { useState, useEffect, useRef } from 'react';


// Animated Counter Component for statistics
const AnimatedCounter = ({ value, title }) => {
  const target = parseInt(value.toString().replace(/[^0-9]/g, ''), 10);
  const isNumeric = !isNaN(target);

  const [count, setCount] = useState(() => (isNumeric ? 0 : value));
  const elementRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }
    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted || !isNumeric) return;

    let start = 0;
    const duration = 1500;
    const increment = target / (duration / 16);

    const counterInterval = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(counterInterval);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(counterInterval);
  }, [hasStarted, isNumeric, target]);

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-slate-900/30 border border-slate-800/40 rounded-2xl backdrop-blur-md">
      <span ref={elementRef} className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 font-mono">
        {count}
        {value.toString().includes('+') ? '+' : value.toString().includes('%') ? '%' : ''}
      </span>
      <span className="text-xs uppercase tracking-wider text-slate-500 font-medium font-mono mt-2">{title}</span>
    </div>
  );
};

// 3D Flip Card Component matching Awwwards requirements
const CertificateCard = ({ cert }) => {
  const cardRef = useRef(null);
  const [isHoveredCard, setIsHoveredCard] = useState(false);
  const pointerStartX = useRef(0);
  const pointerStartY = useRef(0);

  const handlePointerDown = (e) => {
    pointerStartX.current = e.clientX;
    pointerStartY.current = e.clientY;
  };

  const handlePointerUp = (e) => {
    const dragDistanceX = Math.abs(e.clientX - pointerStartX.current);
    const dragDistanceY = Math.abs(e.clientY - pointerStartY.current);
    
    // If movement is small (click/tap) and the card is hovered, open the file in new tab
    if (dragDistanceX < 6 && dragDistanceY < 6 && isHoveredCard) {
      window.open(cert.file, '_blank', 'noopener,noreferrer');
    }
  };

  const handleMouseEnter = () => {
    setIsHoveredCard(true);
    const card = cardRef.current;
    if (card) {
      card.style.transform = 'perspective(1000px) scale3d(1.03, 1.03, 1.03) translateY(-4px)';
    }
  };

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;

    const rotateX = -(y / (box.height / 2)) * 3;
    const rotateY = (x / (box.width / 2)) * 3;

    card.style.transform = `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale3d(1.03, 1.03, 1.03) translateY(-4px)`;

    const glow = card.querySelector('.shine-sweep');
    if (glow) {
      const shineX = ((e.clientX - box.left) / box.width) * 100;
      const shineY = ((e.clientY - box.top) / box.height) * 100;
      glow.style.background = `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(16, 185, 129, 0.12) 0%, transparent 65%)`;
    }
  };

  const handleMouseLeave = () => {
    setIsHoveredCard(false);
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translateY(0px)';

    const glow = card.querySelector('.shine-sweep');
    if (glow) {
      glow.style.background = 'transparent';
    }
  };

  const isSec = cert.category === 'Cybersecurity';
  const isCloud = cert.category === 'Cloud & DevOps';
  const isAI = cert.category === 'AI & Data Science';
  const isProg = cert.category === 'Programming';
  const isIntern = cert.category === 'Virtual Internships';
  const isRes = cert.category === 'Research';

  const categoryColorClass = isSec ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5' :
                              isCloud ? 'text-cyan-400 border-cyan-500/20 bg-cyan-500/5' :
                              isAI ? 'text-indigo-400 border-indigo-500/20 bg-indigo-500/5' :
                              isProg ? 'text-amber-400 border-amber-500/20 bg-amber-500/5' :
                              isIntern ? 'text-purple-400 border-purple-500/20 bg-purple-500/5' :
                              isRes ? 'text-blue-400 border-blue-500/20 bg-blue-500/5' :
                              'text-slate-400 border-slate-700/20 bg-slate-700/5';

  const glowShadowColor = isSec ? 'shadow-emerald-500/5 hover:border-emerald-500/30' :
                           isCloud ? 'shadow-cyan-500/5 hover:border-cyan-500/30' :
                           isAI ? 'shadow-indigo-500/5 hover:border-indigo-500/30' :
                           'shadow-slate-800/10 hover:border-slate-700/50';

  return (
    <div 
      className="w-[320px] h-[220px] perspective-1000 cursor-pointer shrink-0"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      <div 
        ref={cardRef}
        className={`relative w-full h-full duration-600 transition-transform ease-out border border-slate-800/80 rounded-[24px] shadow-2xl bg-slate-950/60 backdrop-blur-xl ${glowShadowColor} overflow-hidden`}
      >
        {/* Shine sweep radial reflection */}
        <div className="shine-sweep absolute inset-0 pointer-events-none rounded-[24px] transition-all duration-300 z-10" />

        {/* FRONT SIDE */}
        <div className="absolute inset-0 w-full h-full p-5 flex flex-col justify-between z-20">
          {/* Top Panel */}
          <div className="flex justify-between items-start">
            <span className={`px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase border ${categoryColorClass}`}>
              {cert.category}
            </span>

            {/* Glowing verification status */}
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-900/60 border border-slate-800">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[8px] font-mono text-slate-400 font-bold uppercase tracking-wider">VERIFIED</span>
            </div>
          </div>

          {/* Center */}
          <div className="my-auto">
            <h3 className="text-sm font-extrabold text-white leading-snug font-mono tracking-wide line-clamp-2">
              {cert.title}
            </h3>
            <p className="text-[10px] text-slate-400 font-medium font-mono mt-1">
              <span>Issuer: </span>
              <span className="text-slate-300 font-semibold">{cert.issuer}</span>
            </p>
          </div>

          {/* Bottom */}
          <div className="flex justify-between items-center border-t border-slate-900/60 pt-3">
            <span className="text-[9px] font-mono font-bold text-emerald-400 flex items-center gap-1">
              &lt; HOVER TO VERIFY &gt;
            </span>
            <span className="text-[9px] font-mono text-slate-500 font-semibold">ID: {cert.code}</span>
          </div>
        </div>

        {/* PREMIUM GLASS CTA OVERLAY (Fades/Slides in on hover) */}
        <div 
          className={`absolute inset-0 bg-[#050816]/90 backdrop-blur-md rounded-[24px] z-30 flex flex-col justify-between p-6 border border-emerald-500/20 transition-all duration-500 ${
            isHoveredCard ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-2 pointer-events-none'
          }`}
        >
          {/* Top: 🛡️ Verified Credential */}
          <div className="flex flex-col items-center pt-2">
            <span className="text-xl mb-1 filter drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]">🛡️</span>
            <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-emerald-400 uppercase">
              Verified Credential
            </span>
          </div>

          {/* Separator line */}
          <div className="border-t border-slate-800/65 w-full" />

          {/* Center: 📄 View Certificate (Pulsing glass CTA) */}
          <div className="flex flex-col items-center py-2">
            <div className="px-5 py-2.5 rounded-xl bg-slate-900/40 border border-slate-850 text-white font-mono font-extrabold text-[11px] uppercase tracking-wider flex items-center gap-2 hover:border-emerald-500/30 hover:bg-slate-900/60 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.4)] animate-pulse">
              <span>📄</span>
              <span>View Certificate</span>
            </div>
          </div>

          {/* Separator line */}
          <div className="border-t border-slate-800/65 w-full" />

          {/* Bottom: Helper click prompt */}
          <div className="text-center pb-2">
            <span className="text-[8px] font-mono text-slate-500 font-bold uppercase tracking-widest block">
              Click to open the official verified certificate
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

const Certifications = () => {
  const [filterCategory, setFilterCategory] = useState('All');

  const [isDraggingState, setIsDraggingState] = useState(false);

  const carouselContainerRef = useRef(null);
  const trackRef = useRef(null);

  const x = useRef(0); // Current conveyor scroll translation offset
  const isHovered = useRef(false);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartOffset = useRef(0);
  const dragVelocity = useRef(0);
  const lastDragX = useRef(0);
  const lastDragTime = useRef(0);
  const animationMode = useRef('auto'); // 'auto', 'drag', 'inertia', 'spring'
  const springTarget = useRef(0);

  // Curated prominent certificates for the 3D slider (24 cards)
  const sliderCertificates = [
    { id: 82, title: "AWS Academy Graduate - Cloud Foundations", issuer: "AWS Academy / EduSkills", category: "Cloud & DevOps", file: "/certificates/Srinivasulu  Kamarthi  994219 AWS eduskills cohert 8.pdf", code: "AWS-CF-08", date: "Jul 2025" },
    { id: 83, title: "Data Analyst Associate", issuer: "Power BI", category: "AI & Data Science", file: "/certificates/Data Analysis & Decision Making - III.pdf", code: "PBI-DA-03", date: "Aug 2024" },
    { id: 84, title: "GitHub Foundations", issuer: "GitHub Academy", category: "Cloud & DevOps", file: "/certificates/nexus swarm certificate.pdf", code: "GH-FND-01", date: "Dec 2024" },
    { id: 85, title: "Microsoft Azure: Hands-On (AZ-900, 104, 305)", issuer: "Microsoft / AICTE", category: "Cloud & DevOps", file: "/certificates/KAMARTHI SRINIVASULU 470499 google cloud foundations certification.pdf", code: "AZ-EXP-02", date: "Nov 2024" },
    { id: 86, title: "Cyber Security Cohort-7 Virtual Intern", issuer: "AICTE", category: "Cybersecurity", file: "/certificates/kamarthi srinivasulu  436718 cyber security cohert-7.pdf", code: "SEC-CS-07", date: "Oct 2024" },
    { id: 87, title: "AI & ML Geodata Analysis Course", issuer: "ISRO / IIRS", category: "AI & Data Science", file: "/certificates/isro-iirs aiml geodata analysis course by deheradun.pdf", code: "ISRO-ML-09", date: "Jan 2025" },
    { id: 88, title: "DevOps Professional Certification", issuer: "EduSkills", category: "Cloud & DevOps", file: "/certificates/Devops certification.jpg", code: "DO-CERT-05", date: "Jul 2025" },
    { id: 89, title: "Deep Learning in Ecological Studies", issuer: "ISRO / IIRS", category: "AI & Data Science", file: "/certificates/deep learning in ecological studies.pdf", code: "ISRO-DL-12", date: "Dec 2024" },
    { id: 90, title: "Zero Trust Architecture (ZTA) Elements", issuer: "Security Web Academy", category: "Cybersecurity", file: "/certificates/seven-elements-of-highly-successful-zta.pdf", code: "SEC-ZT-01", date: "Feb 2025" },
    { id: 91, title: "RPA Virtual Intern Cohort-6", issuer: "AICTE / Blue Prism", category: "Programming", file: "/certificates/kamarthi srinivasulu  130951 AICTE RPA virtual intern cohert-6.pdf", code: "RPA-BP-06", date: "Nov 2024" },
    { id: 92, title: "Encrypix Security Internship", issuer: "Encrypix", category: "Cybersecurity", file: "/certificates/Srinivasulu Kamarthi encrypix.pdf", code: "SEC-EP-22", date: "Sep 2024" },
    { id: 93, title: "IIT Bombay - edX Systems Course", issuer: "IIT Bombay (via edX)", category: "Programming", file: "/certificates/srinivasulu iit r bobay.edx.pdf", code: "IITB-EDX-04", date: "May 2024" },
    { id: 94, title: "Smart Interviews Participation", issuer: "Smart Interviews", category: "Programming", file: "/certificates/smart Interviews particiapation certificate.jpg", code: "SI-PART-01", date: "Apr 2024" },
    { id: 95, title: "Raman Spectroscopy Earth Observation", issuer: "ISRO / IIRS", category: "Research", file: "/certificates/Raman Spectroscopy and its Applications in Earth Observation  certificate.pdf", code: "ISRO-RS-02", date: "Nov 2024" },
    { id: 96, title: "Foundation Course on IR 4.0 Technologies", issuer: "AICTE", category: "Others", file: "/certificates/KAMARTHI SRINIVASULU_Foundation course on IR4.0 Technologies_.pdf", code: "IR-4.0-01", date: "Oct 2024" },
    { id: 97, title: "ISRO Geoweb Services & Geodata", issuer: "ISRO / IIRS", category: "Research", file: "/certificates/Open Geodata Repositories & ISRO Geoweb Services for thematic applications by Shri. Kamal Pandey.pdf", code: "ISRO-GW-03", date: "Jan 2025" },
    { id: 98, title: "AICTE RPA Virtual Intern Cohort-6", issuer: "AICTE / Blue Prism", category: "Virtual Internships", file: "/certificates/kamarthi srinivasulu  766364 new cetrificate blue prism cohert-6.pdf", code: "RPA-BP-07", date: "Sep 2024" },
    { id: 99, title: "EduSkills Certification (Jul-Sep 2025)", issuer: "EduSkills", category: "Virtual Internships", file: "/certificates/EduSkills(jul-sep 2025).pdf", code: "ES-CERT-25", date: "Sep 2025" },
    { id: 100, title: "Bolblitz Technologies Internship Certificate", issuer: "Bolblitz Technologies", category: "Virtual Internships", file: "/certificates/_BOLBLITZ TECHNOLGIES CERTIFICATED (srinu).pdf", code: "BB-INT-02", date: "Jul 2024" },
    { id: 101, title: "MiracleSoft Internship", issuer: "MiracleSoft", category: "Virtual Internships", file: "/certificates/internship certificate from miraclesoft .pdf", code: "MS-INT-01", date: "Aug 2024" },
    { id: 102, title: "Octanet Internship Completion", issuer: "Octanet", category: "Virtual Internships", file: "/certificates/octnaent certificate.pdf", code: "OCT-INT-05", date: "Jun 2024" },
    { id: 103, title: "Geospatial Technology IIRS", issuer: "ISRO / IIRS", category: "Research", file: "/certificates/geospacial technology fro iirs certificate.pdf", code: "ISRO-GT-01", date: "Jul 2024" },
    { id: 104, title: "InternPe Completion Certificate", issuer: "Virtual Internships", file: "/certificates/intern pe completion certificate.pdf", code: "IP-COMP-01", date: "Jun 2024" },
    { id: 105, title: "TechnoHacks Data Science Internship", issuer: "TechnoHacks", category: "Virtual Internships", file: "/certificates/techno hacks data science intern certificate.pdf", code: "TH-DS-01", date: "Jul 2024" }
  ];

  // Full flat list of all 42 files inside e:\Portfolio_Sri\Certificaties
  const allCertificates = [
    { name: "AWS Academy Graduate - Cloud Foundations", file: "Srinivasulu  Kamarthi  994219 AWS eduskills cohert 8.pdf", category: "Cloud & DevOps", type: "PDF", date: "2025-07", id: "SRN-AWS-CF8" },
    { name: "Power BI Data Analyst Associate Certification", file: "Data Analysis & Decision Making - III.pdf", category: "AI & Data Science", type: "PDF", date: "2024-08", id: "SRN-PBI-DA3" },
    { name: "GitHub Foundations Certification", file: "nexus swarm certificate.pdf", category: "Cloud & DevOps", type: "PDF", date: "2024-12", id: "SRN-GH-FND" },
    { name: "Microsoft Azure: Hands-On (AZ-900, 104, 305)", file: "KAMARTHI SRINIVASULU 470499 google cloud foundations certification.pdf", category: "Cloud & DevOps", type: "PDF", date: "2024-11", id: "SRN-AZ-EXP" },
    { name: "AICTE Cyber Security Cohort-7 Virtual Intern", file: "kamarthi srinivasulu  436718 cyber security cohert-7.pdf", category: "Cybersecurity", type: "PDF", date: "2024-10", id: "SRN-SEC-CS7" },
    { name: "ISRO-IIRS AI & ML Geodata Analysis Course", file: "isro-iirs aiml geodata analysis course by deheradun.pdf", category: "AI & Data Science", type: "PDF", date: "2025-01", id: "SRN-ISR-ML9" },
    { name: "DevOps Professional Certification", file: "Devops certification.jpg", category: "Cloud & DevOps", type: "Image", date: "2025-07", id: "SRN-DO-CERT" },
    { name: "Deep Learning in Ecological Studies (ISRO)", file: "deep learning in ecological studies.pdf", category: "AI & Data Science", type: "PDF", date: "2024-12", id: "SRN-ISR-DL1" },
    { name: "Zero Trust Architecture (ZTA) Core Elements", file: "seven-elements-of-highly-successful-zta.pdf", category: "Cybersecurity", type: "PDF", date: "2025-02", id: "SRN-SEC-ZT1" },
    { name: "AICTE RPA Virtual Intern Cohort-6", file: "kamarthi srinivasulu  130951 AICTE RPA virtual intern cohert-6.pdf", category: "Programming", type: "PDF", date: "2024-11", id: "SRN-RPA-BP6" },
    { name: "Encrypix Security Internship Certificate", file: "Srinivasulu Kamarthi encrypix.pdf", category: "Cybersecurity", type: "PDF", date: "2024-09", id: "SRN-SEC-EP2" },
    { name: "IIT Bombay - edX Systems Programming", file: "srinivasulu iit r bobay.edx.pdf", category: "Programming", type: "PDF", date: "2024-05", id: "SRN-IITB-ED" },
    { name: "Smart Interviews Participation Certificate", file: "smart Interviews particiapation certificate.jpg", category: "Programming", type: "Image", date: "2024-04", id: "SRN-SI-PART" },
    { name: "Raman Spectroscopy Earth Observation", file: "Raman Spectroscopy and its Applications in Earth Observation  certificate.pdf", category: "Research", type: "PDF", date: "2024-11", id: "SRN-ISR-RS2" },
    { name: "Foundation Course on IR 4.0 Technologies", file: "KAMARTHI SRINIVASULU_Foundation course on IR4.0 Technologies_.pdf", category: "Others", type: "PDF", date: "2024-10", id: "SRN-IR-4.0" },
    { name: "ISRO Geoweb Services & Thematic Mapping", file: "Open Geodata Repositories & ISRO Geoweb Services for thematic applications by Shri. Kamal Pandey.pdf", category: "Research", type: "PDF", date: "2025-01", id: "SRN-ISR-GW3" },
    { name: "AICTE Blue Prism virtual intern cohert-6", file: "kamarthi srinivasulu  766364 new cetrificate blue prism cohert-6.pdf", category: "Virtual Internships", type: "PDF", date: "2024-09", id: "SRN-RPA-BP7" },
    { name: "EduSkills Certification (Jul-Sep 2025)", file: "EduSkills(jul-sep 2025).pdf", category: "Virtual Internships", type: "PDF", date: "2025-09", id: "SRN-ES-CRT2" },
    { name: "Bolblitz Technologies Internship Certificate", file: "_BOLBLITZ TECHNOLGIES CERTIFICATED (srinu).pdf", category: "Virtual Internships", type: "PDF", date: "2024-07", id: "SRN-BB-INT2" },
    { name: "MiracleSoft Internship Certificate", file: "internship certificate from miraclesoft .pdf", category: "Virtual Internships", type: "PDF", date: "2024-08", id: "SRN-MS-INT1" },
    { name: "Octanet Internship Completion Certificate", file: "octnaent certificate.pdf", category: "Virtual Internships", type: "PDF", date: "2024-06", id: "SRN-OCT-INT" },
    { name: "Geospatial Technology from IIRS", file: "geospacial technology fro iirs certificate.pdf", category: "Research", type: "PDF", date: "2024-07", id: "SRN-ISR-GT1" },
    { name: "InternPe Completion Certificate", file: "intern pe completion certificate.pdf", category: "Virtual Internships", type: "PDF", date: "2024-06", id: "SRN-IP-COMP" },
    { name: "TechnoHacks Data Science Internship", file: "techno hacks data science intern certificate.pdf", category: "Virtual Internships", type: "PDF", date: "2024-07", id: "SRN-TH-DS1" },
    { name: "AICTE Virtual Internship Offer Letter", file: "Aicte -KAMARTHI  SRINIVASULU_INTERNSHIP_1733138870674d99b64cb4b_offer_letter.pdf", category: "Virtual Internships", type: "PDF", date: "2024-12", id: "SRN-AIC-OFR" },
    { name: "AICTE Internship Certificate (ID: 620294)", file: "KAMARTHI  SRINIVASULU 620294.pdf", category: "Others", type: "PDF", date: "2024-09", id: "SRN-AIC-620" },
    { name: "KAMARTHI SRINIVASULU AICTE Document", file: "KAMARTHI SRINIVASULU    aicte.pdf", category: "Others", type: "PDF", date: "2024-09", id: "SRN-AIC-GEN" },
    { name: "Letter Of Recommendation - InternPe Team", file: "Letter Of Recommendation of internpe.pdf", category: "Virtual Internships", type: "PDF", date: "2024-06", id: "SRN-IP-LOR" },
    { name: "SRINIVASULU KAMARTHI - Certification", file: "SRINIVASULU KAMARTHI.pdf", category: "Others", type: "PDF", date: "2024-08", id: "SRN-GEN-CRT" },
    { name: "Shadowfox Internship Offer Letter", file: "SRINIVASULU KAMARTHI.shadowfox offer letter.pdf", category: "Virtual Internships", type: "PDF", date: "2024-08", id: "SRN-SF-OFR" },
    { name: "Srinivasulu Certificate (ID: 816305)", file: "Srinivasulu   SRINIVASULU 816305.pdf", category: "Others", type: "PDF", date: "2024-11", id: "SRN-AIC-816" },
    { name: "Generic Certificate (Image)", file: "certificate.jpg", category: "Others", type: "Image", date: "2024-03", id: "SRN-GEN-IMG" },
    { name: "Generic Certificate (PDF)", file: "certificate.pdf", category: "Others", type: "PDF", date: "2024-03", id: "SRN-GEN-PDF" },
    { name: "Credential Certificate 2024104", file: "certificate_202410412601637.pdf", category: "Others", type: "PDF", date: "2024-10", id: "SRN-CRT-104" },
    { name: "Credential Certificate 2024151", file: "certificate_20241512610894.pdf", category: "Others", type: "PDF", date: "2024-11", id: "SRN-CRT-151" },
    { name: "Credential Certificate 2024152", file: "certificate_20241522605712.pdf", category: "Others", type: "PDF", date: "2024-11", id: "SRN-CRT-152" },
    { name: "Credential Certificate 2025156", file: "certificate_20251562680534.pdf", category: "Others", type: "PDF", date: "2025-03", id: "SRN-CRT-156" },
    { name: "Credential Certificate 2025161", file: "certificate_20251612746242.pdf", category: "Others", type: "PDF", date: "2025-03", id: "SRN-CRT-161" },
    { name: "Codesoft Offer Letter", file: "srinu kanna codesoft offer letter.pdf", category: "Virtual Internships", type: "PDF", date: "2024-05", id: "SRN-CS-OFR" },
    { name: "Workshop Participation Certificate", file: "workshop certificate.pdf", category: "Others", type: "PDF", date: "2024-03", id: "SRN-WK-PART" },
    { name: "Remote Sensing Course Certification", file: "remote senssing course certification.pdf", category: "Research", type: "PDF", date: "2024-07", id: "SRN-RS-CRT" },
    { name: "AICTE Certificate of Crop Rotation", file: "sri aicte certificate of croprotation  and fertilization .pdf", category: "Others", type: "PDF", date: "2024-09", id: "SRN-CR-AIC" }
  ];

  const categories = ['All', 'Cybersecurity', 'Cloud & DevOps', 'AI & Data Science', 'Programming', 'Virtual Internships', 'Research', 'Others'];

  const filteredSlider = filterCategory === 'All'
    ? sliderCertificates
    : sliderCertificates.filter(c => c.category === filterCategory);


  // Infinite Scroll setup (loop logic duplicating cards list 3 times)
  const infiniteSliderCertificates = [...filteredSlider, ...filteredSlider, ...filteredSlider];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const cardsCount = filteredSlider.length;
    if (cardsCount === 0) return;

    // Card width (320px) + Gap (24px) = 344px
    const singleBlockWidth = cardsCount * 344;
    
    let animFrameId;
    const speed = 0.65; // continuous loop constant velocity
    const friction = 0.95; // momentum friction
    const stiffness = 0.085; // Spring ease stiffness for Next/Prev button snaps

    const tick = () => {
      // infinite loop boundary wrapping snaps
      if (x.current >= singleBlockWidth * 2) {
        x.current -= singleBlockWidth;
        if (animationMode.current === 'spring') {
          springTarget.current -= singleBlockWidth;
        }
      } else if (x.current <= singleBlockWidth) {
        x.current += singleBlockWidth;
        if (animationMode.current === 'spring') {
          springTarget.current += singleBlockWidth;
        }
      }

      if (animationMode.current === 'auto') {
        if (!isHovered.current) {
          x.current += speed;
        }
      } else if (animationMode.current === 'inertia') {
        x.current += dragVelocity.current;
        dragVelocity.current *= friction;

        if (Math.abs(dragVelocity.current) < 0.1) {
          animationMode.current = 'auto';
        }
      } else if (animationMode.current === 'spring') {
        const dx = springTarget.current - x.current;
        x.current += dx * stiffness;

        if (Math.abs(dx) < 0.2) {
          x.current = springTarget.current;
          animationMode.current = 'auto';
        }
      }

      // 60FPS GPU Accelerated translate3d
      track.style.transform = `translate3d(${-x.current}px, 0, 0)`;

      animFrameId = requestAnimationFrame(tick);
    };

    // Begin in middle repeat loop
    x.current = singleBlockWidth;
    springTarget.current = singleBlockWidth;

    animFrameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrameId);
  }, [filteredSlider.length]);

  // converts vertical mouse wheel scroll into horizontal scroll over the carousel
  const handleWheel = (e) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      if (animationMode.current !== 'spring') {
        springTarget.current = x.current;
      }
      animationMode.current = 'spring';
      springTarget.current += e.deltaY * 0.7; // Dampened vertical-to-horizontal conversion
    }
  };

  // Drag controls
  const handleMouseDown = (e) => {
    animationMode.current = 'drag';
    isDragging.current = true;
    setIsDraggingState(true);
    dragStartX.current = e.clientX;
    dragStartOffset.current = x.current;
    lastDragX.current = e.clientX;
    lastDragTime.current = performance.now();
    dragVelocity.current = 0;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const dx = e.clientX - dragStartX.current;
    x.current = dragStartOffset.current - dx;

    // Calculate drag velocity for inertia momentum
    const now = performance.now();
    const dt = now - lastDragTime.current;
    if (dt > 0) {
      const deltaX = e.clientX - lastDragX.current;
      dragVelocity.current = -(deltaX / dt) * 16.6;
    }

    lastDragX.current = e.clientX;
    lastDragTime.current = now;
  };

  const handleMouseUpOrLeave = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    setIsDraggingState(false);

    // momentum velocity damping threshold
    const maxVel = 20;
    dragVelocity.current = Math.max(-maxVel, Math.min(maxVel, dragVelocity.current));

    if (Math.abs(dragVelocity.current) > 1.2) {
      animationMode.current = 'inertia';
    } else {
      // spring snap to nearest slot
      const slideWidth = 344;
      const currentCardIndex = Math.round(x.current / slideWidth);
      springTarget.current = currentCardIndex * slideWidth;
      animationMode.current = 'spring';
    }
  };

  const handlePrev = () => {
    const slideWidth = 344;
    if (animationMode.current !== 'spring') {
      springTarget.current = Math.round(x.current / slideWidth) * slideWidth;
    }
    springTarget.current -= slideWidth;
    animationMode.current = 'spring';
  };

  const handleNext = () => {
    const slideWidth = 344;
    if (animationMode.current !== 'spring') {
      springTarget.current = Math.round(x.current / slideWidth) * slideWidth;
    }
    springTarget.current += slideWidth;
    animationMode.current = 'spring';
  };




  return (
    <section id="certifications" className="relative w-full bg-[#050816] py-24 overflow-hidden border-t border-slate-900 font-sans select-none">
      
      {/* Perspective, Backface, and Carousel scroll styling */}
      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Cyberpunk micro grid pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-25 bg-[linear-gradient(to_right,#00ff6603_1px,transparent_1px),linear-gradient(to_bottom,#00ff6603_1px,transparent_1px)] bg-[size:30px_30px]" />
      
      {/* Animated dynamic gradient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-emerald-500/5 via-teal-500/5 to-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Upper Header and Floating Previous/Next Controls */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-12">
          
          {/* Header Texts */}
          <div data-aos="fade-up">
            <div className="mb-3">
              <span className="inline-block text-[10px] font-bold text-emerald-400/90 uppercase tracking-[0.2em] px-3.5 py-1.5 bg-slate-950 border border-slate-800 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.05)]">
                System Badges
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-none mb-4">
              Professional Credentials
            </h2>

            <p className="text-slate-400 text-sm max-w-xl font-normal leading-relaxed">
              A curated collection of verified certifications, cloud credentials, internships and professional achievements.
            </p>
          </div>

          {/* Floating Next/Previous upper controls */}
          <div className="flex items-center gap-3 self-end md:self-auto bg-slate-950/40 p-1.5 rounded-full border border-slate-800/65 backdrop-blur-md shadow-lg shadow-black/10">
            <button
              onClick={handlePrev}
              aria-label="Previous card"
              className="w-10 h-10 rounded-full bg-slate-950 hover:bg-slate-900 border border-slate-800/80 hover:border-emerald-500/30 text-slate-400 hover:text-emerald-400 flex items-center justify-center transition-all duration-300 active:scale-95 group hover:shadow-[0_0_15px_rgba(16,185,129,0.15)]"
            >
              <svg className="w-5 h-5 transform group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              aria-label="Next card"
              className="w-10 h-10 rounded-full bg-slate-950 hover:bg-slate-900 border border-slate-800/80 hover:border-emerald-500/30 text-slate-400 hover:text-emerald-400 flex items-center justify-center transition-all duration-300 active:scale-95 group hover:shadow-[0_0_15px_rgba(16,185,129,0.15)]"
            >
              <svg className="w-5 h-5 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>

        {/* Category Filter Pills (Pill selections filters the slider & database list) */}
        <div className="flex flex-wrap gap-2.5 mb-10 pb-6 border-b border-slate-900/60">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setFilterCategory(cat); }}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all duration-300 ${
                filterCategory === cat
                  ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.3)] border-transparent'
                  : 'bg-slate-900/40 border border-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800/60 hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sliding Infinite Conveyor Carousel */}
        <div className="relative w-full overflow-hidden mb-6">
          <div 
            ref={carouselContainerRef}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={() => { handleMouseUpOrLeave(); isHovered.current = false; }}
            onMouseEnter={() => { isHovered.current = true; }}
            className="overflow-x-hidden pb-10 pt-4"
            style={{ cursor: isDraggingState ? 'grabbing' : 'grab' }}
          >
            <div 
              ref={trackRef}
              className="flex gap-6 w-max select-none will-change-transform"
              style={{ transform: `translate3d(0px, 0, 0)` }}
            >
              {infiniteSliderCertificates.map((cert, idx) => (
                <CertificateCard
                  key={`${cert.id}-${idx}`}
                  cert={cert}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Subtitle helper */}
        <p className="text-center font-mono text-xs text-slate-500 mb-16">
          Hover a card to freeze and verify • Total of {allCertificates.length} certificates running.
        </p>

        {/* Statistics count indicators */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-20">
          <AnimatedCounter value="42+" title="Certificates" />
          <AnimatedCounter value="8+" title="Virtual Internships" />
          <AnimatedCounter value="12+" title="Cybersecurity" />
          <AnimatedCounter value="6+" title="Cloud Credentials" />
          <AnimatedCounter value="100%" title="Verified Authenticity" />
        </div>



      </div>
    </section>
  );
};

export default Certifications;
