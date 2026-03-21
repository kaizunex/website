import useScrollAnimation from '../hooks/useScrollAnimation'
import { useTrackSection } from '../hooks/useAnalytics'
import styles from '../styles/components/BlogSection.module.css'

interface BlogPost {
  title: string
  date: string
  excerpt: string
}

const posts: BlogPost[] = [
  {
    title: 'Why Trust Networks Will Replace Resumes',
    date: 'March 2026',
    excerpt:
      'The credential economy is crumbling. What replaces it? A web of verified relationships where your network speaks louder than any piece of paper.',
  },
  {
    title: 'The Medium is the Connection',
    date: 'February 2026',
    excerpt:
      "Rethinking how we categorize human interaction — and why 'access', 'opportunity', and 'trust' are the only mediums that matter.",
  },
  {
    title: 'Privacy as a Feature, Not a Checkbox',
    date: 'January 2026',
    excerpt:
      'Why we built Kaizuna Nexus with privacy at the architecture level, not as an afterthought bolted onto existing systems.',
  },
  {
    title: 'Building for the Next Billion Connections',
    date: 'Coming Soon',
    excerpt:
      'Our vision for a world where opportunity flows freely through human networks, regardless of geography or background.',
  },
]

const PenIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
  </svg>
)

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const ref = useScrollAnimation(index * 100)

  return (
    <div ref={ref} className={styles.card}>
      <div className={styles.cardImage}>
        <div className={styles.cardImagePattern} />
        <span className={styles.cardImageIcon}>
          <PenIcon />
        </span>
        <span className={styles.comingSoon}>Coming Soon</span>
      </div>

      <div className={styles.cardBody}>
        <p className={styles.cardDate}>{post.date}</p>
        <h3 className={styles.cardTitle}>{post.title}</h3>
        <p className={styles.cardExcerpt}>{post.excerpt}</p>
        <a href="#" className={styles.cardLink}>
          Read more <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  )
}

export default function BlogSection() {
  const sectionRef = useTrackSection('blog')

  return (
    <section id="blog" ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className="section-label">From the Blog</span>
          <h2 className={styles.sectionTitle}>
            Thoughts on the future of{' '}
            <span className={styles.highlight}>connection</span>
          </h2>
          <p className={styles.sectionDesc}>
            Ideas, updates, and perspectives from the Kaizuna team.
          </p>
        </div>

        <div className={styles.grid}>
          {posts.map((post, i) => (
            <BlogCard key={post.title} post={post} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
