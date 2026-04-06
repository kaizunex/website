import styles from "../styles/components/Footer.module.css";

const PRODUCT_LINKS = [
  { label: "Kaicards", href: "/product/kaicards" },
  { label: "Kairefer", href: "/product/kairefer" },
  { label: "Kaitree", href: "/product/kaitree" },
  { label: "Join Waitlist", href: "/#waitlist" },
];

const COMPANY_LINKS = [
  { label: "Home", href: "/#hero" },
  { label: "Why Kaizuna", href: "/#why-kaizuna" },
  { label: "Our Ecosystem", href: "/#use-cases" },
  { label: "Get in touch", href: "/#contact" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Cookie Policy", href: "#" },
  { label: "Contact", href: "#" },
];

function LogoMark() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="10" cy="4" r="2.5" fill="#8B5CF6" />
      <circle cx="4" cy="14" r="2.5" fill="#10B981" />
      <circle cx="16" cy="14" r="2.5" fill="#8B5CF6" />
      <line
        x1="10"
        y1="4"
        x2="4"
        y2="14"
        stroke="#8B5CF6"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.6"
      />
      <line
        x1="10"
        y1="4"
        x2="16"
        y2="14"
        stroke="#8B5CF6"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.6"
      />
      <line
        x1="4"
        y1="14"
        x2="16"
        y2="14"
        stroke="#10B981"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}

interface FooterProps {
  isProductPage?: boolean;
}

export default function Footer({ isProductPage = false }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <a href="/" className={styles.logo}>
            <div className={styles.logoMark}>
              <LogoMark />
            </div>
            <span className={styles.logoText}>Kaizuna</span>
          </a>
          <p>Solve problems through human connections.</p>
          <p>
            {isProductPage
              ? "Exploring deep dives for Kaicards, Kairef, and Kaitree."
              : "Kaizuna builds direct, high-trust pathways without middlemen."}
          </p>
        </div>

        <nav className={styles.col} aria-label="Product">
          <h4>Product</h4>
          <ul>
            {PRODUCT_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <nav className={styles.col} aria-label="Company">
          <h4>Company</h4>
          <ul>
            {COMPANY_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <nav className={styles.col} aria-label="Legal">
          <h4>Legal</h4>
          <ul>
            {LEGAL_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className={styles.bottom}>
        <p>© 2025 Kaizuna Technologies. All rights reserved.</p>
        <p>Built for the next billion connections.</p>
      </div>
    </footer>
  );
}
