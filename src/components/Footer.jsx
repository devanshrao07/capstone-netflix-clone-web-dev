export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-social">
        <a href="#" aria-label="Facebook">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
        </a>
        <a href="#" aria-label="Instagram">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
        </a>
        <a href="#" aria-label="Twitter">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
        </a>
        <a href="#" aria-label="YouTube">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zM9 16V8l8 4-8 4z"/></svg>
        </a>
      </div>
      <div className="footer-links">
        <a href="#">Audio Description</a>
        <a href="#">Help Center</a>
        <a href="#">Gift Cards</a>
        <a href="#">Media Center</a>
        <a href="#">Investor Relations</a>
        <a href="#">Jobs</a>
        <a href="#">Terms of Use</a>
        <a href="#">Privacy</a>
        <a href="#">Legal Notices</a>
        <a href="#">Cookie Preferences</a>
        <a href="#">Corporate Information</a>
        <a href="#">Contact Us</a>
      </div>
      <p className="footer-copy">&copy; 1997-2025 Netflix, Inc.</p>
    </footer>
  );
}
