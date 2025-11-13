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
    <svg {...props} className="project-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
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
                
                {}
                <nav className="nav-desktop">
                    {navItems.map(item => (
                        <a key={item} href={`#${item.toLowerCase()}`}>
                            {item}
                        </a>
                    ))}
                </nav>

                {}
                <button 
                    className="menu-button"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle navigation"
                >
                    {isOpen ? <XIcon /> : <MenuIcon />}
                </button>
            </div>

            {}
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
    <section id={id} className="section">
        <div className="container">
            {title && <h2 className="section-title">{title}</h2>}
            {children}
        </div>
    </section>
);

const App = () => {
    return (
        <div className="main-app">
             {}
             <style>{`
                /* Global Reset and Typography */
                body {
                    margin: 0;
                    padding: 0;
                    font-family: 'Inter', sans-serif;
                    background-color: #f8f8f8;
                    color: #333;
                }

                .main-app {
                    min-height: 100vh;
                }

                .header {
                    position: sticky;
                    top: 0;
                    z-index: 50;
                    background-color: #fff;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: #007bff;
                    text-decoration: none;
                }

                .nav-desktop {
                    display: none;
                    gap: 1.5rem;
                }

                .nav-desktop a {
                    color: #555;
                    text-decoration: none;
                    transition: color 0.3s;
                }

                .nav-desktop a:hover {
                    color: #007bff;
                }

                .menu-button {
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: 0.5rem;
                    display: block;
                }

                .nav-mobile-wrapper {
                    position: absolute;
                    width: 100%;
                    background-color: #fff;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
                
                .nav-mobile {
                    display: flex;
                    flex-direction: column;
                    padding: 1rem;
                    border-top: 1px solid #eee;
                    max-width: 900px;
                    margin: 0 auto;
                }

                .nav-mobile a {
                    padding: 0.5rem 0;
                    color: #555;
                    text-decoration: none;
                    transition: background-color 0.3s;
                }

                .nav-mobile a:hover {
                    background-color: #f5f5f5;
                    color: #007bff;
                    padding-left: 0.5rem;
                    border-radius: 4px;
                }


                .section {
                    padding: 4rem 0;
                    border-bottom: 1px solid #e0e0e0;
                }

                .container {
                    max-width: 900px;
                    margin: 0 auto;
                    padding: 0 1rem;
                }

                .section-title {
                    font-size: 2rem;
                    font-weight: bold;
                    text-align: center;
                    color: #333;
                    margin-bottom: 2.5rem;
                }

                .hero-content {
                    text-align: center;
                    padding-top: 2rem;
                }

                .hero-name {
                    font-size: 3rem;
                    font-weight: 800;
                    color: #1a1a1a;
                    margin-bottom: 0.5rem;
                }

                .hero-title {
                    font-size: 1.5rem;
                    font-weight: 500;
                    color: #007bff;
                    margin-bottom: 1.5rem;
                }

                .hero-tagline {
                    font-size: 1.1rem;
                    color: #666;
                    font-style: italic;
                    max-width: 600px;
                    margin: 0 auto 2.5rem;
                }

                .about-card {
                    background-color: #fff;
                    padding: 2rem;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
                    margin-top: 2rem;
                }

                .about-card h3 {
                    font-size: 1.3rem;
                    font-weight: 600;
                    color: #333;
                    margin-bottom: 1rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .about-card h3 svg {
                    margin-right: 0.5rem;
                }


                .about-card p {
                    line-height: 1.6;
                }

                .skills-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.75rem;
                    justify-content: center;
                }

                .skill-tag {
                    padding: 0.5rem 1.25rem;
                    background-color: #e6f0ff; /* Light Blue */
                    color: #007bff;
                    border-radius: 50px;
                    font-weight: 500;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
                    transition: background-color 0.3s, transform 0.3s;
                }

                .skill-tag:hover {
                    background-color: #cce0ff;
                    transform: translateY(-2px);
                }

                .projects-grid {
                    display: grid;
                    gap: 2rem;
                }

                .project-card {
                    background-color: #fff;
                    padding: 1.5rem;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
                    border-left: 5px solid #007bff;
                    transition: box-shadow 0.3s, transform 0.3s;
                }

                .project-card:hover {
                    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
                    transform: translateX(2px);
                }

                .project-card h3 {
                    font-size: 1.25rem;
                    font-weight: 600;
                    color: #333;
                    margin-bottom: 0.5rem;
                    display: flex;
                    align-items: center;
                }

                .project-card p {
                    color: #666;
                    padding-left: 1.75rem;
                }

                .project-icon {
                    width: 20px;
                    height: 20px;
                    color: #007bff;
                    margin-right: 0.5rem;
                }

                .contact-card {
                    background-color: #fff;
                    padding: 2rem;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
                    text-align: center;
                }

                .contact-info {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    margin-top: 1.5rem;
                    justify-content: center;
                    align-items: center;
                }

                .contact-item {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #007bff;
                    font-weight: 500;
                    text-decoration: none;
                    padding: 0.5rem 1rem;
                    border: 2px solid #007bff;
                    border-radius: 50px;
                    transition: all 0.3s;
                }
                
                .contact-item:last-child {
                    background-color: #f5f5f5;
                    color: #333;
                    border-color: #ccc;
                }
                
                .contact-item:first-child:hover {
                    background-color: #007bff;
                    color: #fff;
                }

                .contact-icon {
                    width: 20px;
                    height: 20px;
                    margin-right: 0.5rem;
                }

                .footer {
                    background-color: #222;
                    color: #ccc;
                    padding: 1rem 0;
                    text-align: center;
                    font-size: 0.875rem;
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
                
                {}
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

                {}
                <Section id="skills" title="Technical Skills">
                    <div className="skills-list">
                        {portfolioData.skills.map(skill => (
                            <div key={skill} className="skill-tag">
                                {skill}
                            </div>
                        ))}
                    </div>
                </Section>

                {/* Projects Section */}
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

                {/* Contact Section */}
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
            
            {}
            <footer className="footer">
                <div className="container">
                    &copy; {new Date().getFullYear()} {portfolioData.name}. Final Lab Activity 1 for CCS112.
                </div>
            </footer>
        </div>
    );
};

export default App;