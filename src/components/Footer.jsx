const Footer = ({ openPrivacyModal }) => {
  return (
    <footer className="bg-[#111111] text-[#d4d4d4] py-16 px-6 md:px-12 w-full font-mono text-[10px] md:text-xs tracking-widest flex flex-col justify-between min-h-[50vh]">

      {/* Top Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 w-full font-medium">
        <div className="flex flex-col gap-1">
          <p>Offensive & Defensive Cybersecurity</p>
          <p>Linux Kernel & Systems Development</p>
          <p>Secure DevSecOps & Cloud Hardening</p>
        </div>


        <div className="flex flex-col gap-1 md:items-end">
          <p>Worldwide Available</p>
          <p>{new Date().getFullYear()}</p>
        </div>
      </div>

      {/* Middle Huge Text */}
      <div className="w-full flex justify-center items-center py-20 md:py-24 overflow-hidden">
        <h2 className="text-[18vw] md:text-[16vw] leading-none font-sans font-bold tracking-tighter lowercase select-none text-[#1e293b] w-full text-center">
          SRINIVASULU
        </h2>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 w-full items-end font-medium">
        <div className="flex flex-col gap-6">
          <a href="#contact" className="underline hover:text-white transition-colors underline-offset-4 decoration-1 font-bold">Contact</a>
          <p className="text-white/60 font-mono text-[9px] md:text-[10px]">
            &copy; {new Date().getFullYear()} Srinivasulu Kamrthi | Built with React
          </p>
        </div>

        <div className="flex flex-col gap-1 md:items-center">
          <a href="mailto:srinivasuluk211@gmail.com" className="underline hover:text-white transition-colors underline-offset-4 decoration-1 lowercase">srinivasuluk211@gmail.com</a>
        </div>

        <div className="flex flex-col gap-1 md:items-end">
          <button type="button" onClick={(e) => { e.preventDefault(); openPrivacyModal(); }} className="underline hover:text-white transition-colors underline-offset-4 decoration-1 cursor-pointer uppercase text-[10px] md:text-xs tracking-widest text-[#d4d4d4]">Privacy Policy</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
