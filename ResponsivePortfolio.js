import React, { useState } from 'react';

const MenuIcon = (props) => (
    <svg {...props} className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
);
const XIcon = (props) => (
    <svg {...props} className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);
const MailIcon = (props) => (
    <svg {...props} className="contact-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);
const CodeIcon = (props) => (
    <svg {...props} className="project-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLineline join="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
);
const BriefcaseIcon = (props) => (
    <svg {...props} className="contact-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 2a2 2 0 0 0-2 2v3h-4V4a2 2 0 0 0-2-2"/></svg>
);


const portfolioData = {
    logoName: "lineauno",
    name: "Andrea Pauline Monis",
    title: "Full Stack Developer",
    tagline: "Building clean, responsive web experiences.",
    email: "andreapaulinemonis@gmail.com",
    phone: "09123456789",
    about: "I specialize in modern JavaScript frameworks, primarily React. My goal is to create intuitive and performance-driven user interfaces. I have practical experience connecting frontend applications to Laravel.",
    skills: [
        "React", "JavaScript", "HTML5", "Standard CSS", "Git", "Laravel API Integration"
    ],
    projects: [
        { title: "Escapism Tracker", description: "A website displaying all the list of diverse media consumed by me." },
        { title: "Upcoming: Course Reviewers", description: "Responsive display of available reviewers for each course I'm taking as a BSCS student." },
    ]
};

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navItems = ["About", "Skills", "Projects", "Contact"];

    return (
        <header className="header">
            <div className="header-container">
                <a href="#about" className="logo">
                    {portfolioData.logoName}
                </a>
                
                <nav className="nav-desktop">
                    {navItems.map(item => (
                        <a key={item} href={`#${item.toLowerCase()}`} className="nav-item-link">
                            {item}
                        </a>
                    ))}
                </nav>

                <button 
                    className="menu-button"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle navigation"
                >
                    {isOpen ? <XIcon /> : <MenuIcon />}
                </button>
            </div>

            {isOpen && (
                <div className="nav-mobile-wrapper">
                    <nav className="nav-mobile">
                        {navItems.map(item => (
                            <a key={item} href={`#${item.toLowerCase()}`}
                               onClick={() => setIsOpen(false)}
                            >
                                {item}
                            </a>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
};

const Section = ({ id, title, children }) => (
    <section id={id} className={`section ${id}`}>
        <div className="container">
            {title && <h2 className="section-title">{title}</h2>}
            {children}
        </div>
    </section>
);

const App = () => {
    return (
        <div className="main-app">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=IM+Fell+English+SC&display=swap');

                :root {
                    --color-parchment: #f9f4e2;
                    --color-dark-parchment: #ede4d1;
                    --color-ink: #3c2f2f;
                    --color-primary: #556b2f;
                    --color-accent: #b8860b;
                    --font-title: 'Cinzel', serif;
                    --font-body: 'IM Fell English SC', serif;
                    --box-shadow-parchment: 0 4px 6px rgba(0, 0, 0, 0.1);
                    --box-shadow-deep: 0 6px 12px rgba(0, 0, 0, 0.25);
                }

                body {
                    margin: 0;
                    padding: 0;
                    font-family: var(--font-body);
                    background-color: var(--color-parchment);
                    color: var(--color-ink);
                    line-height: 1.8;
                }

                .main-app {
                    min-height: 100vh;
                }

                .header {
                    position: sticky;
                    top: 0;
                    z-index: 50;
                    background-color: var(--color-dark-parchment);
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    border-bottom: 3px double var(--color-accent);
                }

                .header-container {
                    max-width: 900px;
                    margin: 0 auto;
                    padding: 1rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .logo {
                    font-family: var(--font-title);
                    font-size: 1.8rem;
                    font-weight: 700;
                    color: var(--color-primary);
                    text-decoration: none;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    text-shadow: 1px 1px 0 var(--color-accent);
                }

                .nav-desktop {
                    display: none;
                    gap: 2rem;
                    
                }

                .nav-desktop a {
                    color: var(--color-ink);
                    text-decoration: none;
                    font-family: var(--font-title);
                    font-weight: 700;
                    text-transform: uppercase;
                    font-size: 0.9rem;
                    padding: 0.5rem 0;
                    transition: color 0.3s, text-shadow 0.3s;
                }

                .nav-desktop a:hover {
                    color: var(--color-primary);
                    text-shadow: 0 0 5px var(--color-accent);
                }
                
                .nav-item-link {
                    position: relative;
                }
                .nav-item-link::after {
                    content: '';
                    position: absolute;
                    width: 0;
                    height: 2px;
                    bottom: 0;
                    left: 0;
                    background-color: var(--color-accent);
                    transition: width 0.3s ease-out;
                }
                .nav-item-link:hover::after {
                    width: 100%;
                }


                .menu-button {
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: 0.5rem;
                    display: block;
                    color: var(--color-primary);
                }

                .nav-mobile-wrapper {
                    position: absolute;
                    width: 100%;
                    background-color: var(--color-dark-parchment);
                    box-shadow: var(--box-shadow-deep);
                    border-top: 1px solid var(--color-accent);
                }
                
                .nav-mobile {
                    display: flex;
                    flex-direction: column;
                    padding: 1rem;
                    max-width: 900px;
                    margin: 0 auto;
                }

                .nav-mobile a {
                    padding: 0.75rem 0;
                    color: var(--color-ink);
                    text-decoration: none;
                    font-family: var(--font-body);
                    transition: background-color 0.3s, color 0.3s;
                }

                .nav-mobile a:hover {
                    background-color: rgba(85, 107, 47, 0.1);
                    color: var(--color-primary);
                    padding-left: 0.75rem;
                    border-radius: 4px;
                }


                .section {
                    padding: 5rem 0;
                    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                }

                .container {
                    max-width: 900px;
                    margin: 0 auto;
                    padding: 0 1rem;
                }

                .section-title {
                    font-family: var(--font-title);
                    font-size: 2.5rem;
                    font-weight: 700;
                    text-align: center;
                    color: var(--color-primary);
                    margin-bottom: 3rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    border-bottom: 2px solid var(--color-accent);
                    display: inline-block;
                    padding-bottom: 0.5rem;
                    width: fit-content;
                    margin-left: auto;
                    margin-right: auto;
                }

                .hero-content {
                    text-align: center;
                    padding-top: 2rem;
                }

                .hero-name {
                    font-family: var(--font-title);
                    font-size: 4rem;
                    font-weight: 700;
                    color: var(--color-ink);
                    margin-bottom: 0.5rem;
                    text-shadow: 2px 2px 0 var(--color-accent);
                }

                .hero-title {
                    font-family: var(--font-body);
                    font-size: 1.5rem;
                    font-weight: 400;
                    color: var(--color-primary);
                    margin-bottom: 1.5rem;
                    font-style: italic;
                }

                .hero-tagline {
                    font-size: 1.2rem;
                    color: var(--color-ink);
                    font-style: italic;
                    max-width: 700px;
                    margin: 0 auto 3rem;
                }

                .about-card {
                    background-color: var(--color-dark-parchment);
                    padding: 2.5rem;
                    border-radius: 4px;
                    box-shadow: var(--box-shadow-parchment);
                    margin-top: 3rem;
                    border: 1px solid var(--color-accent);
                }

                .about-card h3 {
                    font-family: var(--font-title);
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: var(--color-primary);
                    margin-bottom: 1.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-transform: uppercase;
                }
                
                .about-card h3 svg {
                    margin-right: 0.75rem;
                    color: var(--color-accent);
                    width: 24px;
                    height: 24px;
                }


                .about-card p {
                    line-height: 1.8;
                    font-size: 1.1rem;
                }

                .skills-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 1rem;
                    justify-content: center;
                }

                .skill-tag {
                    padding: 0.75rem 1.5rem;
                    background-color: var(--color-primary); 
                    color: var(--color-parchment);
                    border-radius: 4px;
                    font-weight: 700;
                    font-family: var(--font-title);
                    text-transform: uppercase;
                    box-shadow: 2px 2px 0 var(--color-accent);
                    transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;
                    border: 1px solid var(--color-accent);
                }

                .skill-tag:hover {
                    background-color: #6b8849;
                    transform: translateY(-2px);
                    box-shadow: 4px 4px 0 var(--color-accent);
                }

                .projects-grid {
                    display: grid;
                    gap: 2.5rem;
                }

                .project-card {
                    background-color: var(--color-dark-parchment);
                    padding: 2rem;
                    border-radius: 4px;
                    box-shadow: var(--box-shadow-parchment);
                    border-left: 5px solid var(--color-accent);
                    transition: box-shadow 0.3s, transform 0.3s;
                    position: relative;
                }
                
                .project-card::before {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: -1px;
                    bottom: 0;
                    width: 5px;
                    background: repeating-linear-gradient(-45deg, var(--color-accent), var(--color-accent) 5px, var(--color-dark-parchment) 5px, var(--color-dark-parchment) 10px);
                }

                .project-card:hover {
                    box-shadow: var(--box-shadow-deep);
                    transform: translateX(0);
                }

                .project-card h3 {
                    font-family: var(--font-title);
                    font-size: 1.4rem;
                    font-weight: 700;
                    color: var(--color-ink);
                    margin-bottom: 0.75rem;
                    display: flex;
                    align-items: center;
                }

                .project-card p {
                    color: var(--color-ink);
                    font-style: italic;
                    line-height: 1.6;
                    padding-left: 2rem;
                }

                .project-icon {
                    width: 24px;
                    height: 24px;
                    color: var(--color-primary);
                    margin-right: 0.75rem;
                }
                
                .contact-card {
                    background-color: var(--color-dark-parchment);
                    padding: 3rem;
                    border-radius: 8px;
                    box-shadow: var(--box-shadow-deep);
                    text-align: center;
                    border: 3px double var(--color-primary);
                }
                
                .contact-card p {
                    font-size: 1.1rem;
                    color: var(--color-ink);
                    margin-bottom: 2rem;
                }

                .contact-info {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                    justify-content: center;
                    align-items: center;
                }

                .contact-item {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--color-parchment);
                    font-weight: 700;
                    text-decoration: none;
                    padding: 0.75rem 1.5rem;
                    border: 2px solid var(--color-accent);
                    border-radius: 4px;
                    background-color: var(--color-primary);
                    transition: all 0.3s;
                    box-shadow: 2px 2px 0 var(--color-accent);
                    font-family: var(--font-body);
                    text-transform: uppercase;
                }
                
                .contact-item:last-child {
                    background-color: var(--color-accent);
                    color: var(--color-ink);
                    border-color: var(--color-primary);
                    box-shadow: 2px 2px 0 var(--color-primary);
                }
                
                .contact-item:first-child:hover {
                    background-color: #6b8849;
                    box-shadow: 4px 4px 0 var(--color-accent);
                }
                .contact-item:last-child:hover {
                    background-color: #c9a33d;
                    box-shadow: 4px 4px 0 var(--color-primary);
                }


                .contact-icon {
                    width: 20px;
                    height: 20px;
                    margin-right: 0.5rem;
                    stroke: var(--color-parchment);
                }
                
                .contact-item:last-child .contact-icon {
                    stroke: var(--color-ink);
                }


                .footer {
                    background-color: var(--color-ink);
                    color: var(--color-dark-parchment);
                    padding: 1.5rem 0;
                    text-align: center;
                    font-size: 0.9rem;
                    border-top: 3px double var(--color-accent);
                }


                @media (min-width: 768px) {
                    .nav-desktop {
                        display: flex;
                    }
                    .menu-button {
                        display: none;
                    }
                    .projects-grid {
                        grid-template-columns: 1fr 1fr;
                    }
                    .contact-info {
                        flex-direction: row;
                        gap: 2rem;
                    }
                }
            `}</style>

            <Header />
            <main>
                
                <Section id="about">
                    <div className="hero-content">
                        <h1 className="hero-name">{portfolioData.name}</h1>
                        <p className="hero-title">{portfolioData.title}</p>
                        <p className="hero-tagline">{portfolioData.tagline}</p>
                    </div>

                    <div className="about-card">
                        <h3><BriefcaseIcon />About Me</h3>
                        <p>{portfolioData.about}</p>
                    </div>
                </Section>

                
                <Section id="skills" title="Technical Skills">
                    <div className="skills-list">
                        {portfolioData.skills.map(skill => (
                            <div key={skill} className="skill-tag">
                                {skill}
                            </div>
                        ))}
                    </div>
                </Section>

                <Section id="projects" title="Featured Projects">
                    <div className="projects-grid">
                        {portfolioData.projects.map((project, index) => (
                            <div key={index} className="project-card">
                                <h3>
                                    <CodeIcon />
                                    {project.title}
                                </h3>
                                <p>{project.description}</p>
                            </div>
                        ))}
                    </div>
                </Section>

                <Section id="contact" title="Get In Touch">
                    <div className="contact-card">
                        <p className="text-lg text-gray-700 mb-6">I am currently available for new opportunities. Feel free to connect!</p>
                        <div className="contact-info">
                            <a href={`mailto:${portfolioData.email}`} className="contact-item">
                                <MailIcon />
                                {portfolioData.email}
                            </a>
                            <div className="contact-item">
                                <BriefcaseIcon />
                                {portfolioData.phone}
                            </div>
                        </div>
                    </div>
                </Section>

            </main>
            
            
            <footer className="footer">
                <div className="container">
                    &copy; {new Date().getFullYear()} {portfolioData.name}. Final Lab Activity 1 for CCS112.
                </div>
            </footer>
        </div>
    );
};

export default App;