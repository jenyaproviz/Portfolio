import { Link } from "react-router-dom";
import { FiGithub, FiLinkedin, FiGlobe, FiInfo, FiBookOpen } from "react-icons/fi";

const socialLinks = [
  {
    id: 1,
    icon: <FiGlobe />,
    label: "Home",
    url: "/",
  },
  { id: 2, icon: <FiGithub />, label: "GitHub", url: "https://github.com/jenyaproviz" },
  { id: 4, icon: <FiLinkedin />, label: "LinkedIn", url: "https://linkedin.com/in/jenya-proviz-katz" },
  { id: 5, icon: <FiInfo />, label: "About me", url: "/about" },
  { id: 6, icon: <FiBookOpen />, label: "Contact me", url: "/contact" },
];

const Footer = () => (
  <footer className="site-footer fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-slate-900/95 text-slate-400 backdrop-blur-md">
    <div className="container mx-auto flex h-full flex-col items-center justify-center gap-1 px-4 sm:flex-row sm:justify-between sm:gap-4 sm:px-6">
      <p className="text-[10px] sm:text-xs">
        &copy; {new Date().getFullYear()} Jenya Proviz. All rights reserved.
      </p>
      <nav aria-label="Footer navigation">
        <ul className="flex items-center gap-1 sm:gap-2">
          {socialLinks.map((link) => {
            const className = "flex h-8 w-8 items-center justify-center rounded-lg text-base transition hover:bg-white/10 hover:text-blue-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400";
            return (
              <li key={link.id}>
                {link.url.startsWith("/") ? (
                  <Link to={link.url} aria-label={link.label} title={link.label} className={className}>
                    <span aria-hidden="true">{link.icon}</span>
                  </Link>
                ) : (
                  <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.label} title={link.label} className={className}>
                    <span aria-hidden="true">{link.icon}</span>
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  </footer>
);

export default Footer;
