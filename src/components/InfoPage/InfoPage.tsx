import { Fragment, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { infoPages, type InfoSlug } from '../../data/legal'
import styles from '../../styles/components/InfoPage.module.css'

const EMAIL = 'kaizunanexus@gmail.com'

function renderRichText(text: string): ReactNode[] {
  const nodes: ReactNode[] = []
  let keyIndex = 0

  // Split on **bold** and *italic* segments while keeping delimiters.
  const tokens = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).filter(Boolean)

  for (const token of tokens) {
    let content: ReactNode = token
    let wrapBold = false
    let wrapItalic = false

    if (token.startsWith('**') && token.endsWith('**')) {
      content = token.slice(2, -2)
      wrapBold = true
    } else if (token.startsWith('*') && token.endsWith('*')) {
      content = token.slice(1, -1)
      wrapItalic = true
    }

    if (typeof content === 'string' && content.includes(EMAIL)) {
      const parts = content.split(EMAIL)
      content = (
        <>
          {parts.map((part, index) => (
            <Fragment key={index}>
              {part}
              {index < parts.length - 1 && (
                <a className={styles.emailLink} href={`mailto:${EMAIL}`}>
                  {EMAIL}
                </a>
              )}
            </Fragment>
          ))}
        </>
      )
    }

    if (wrapBold) {
      nodes.push(<strong key={keyIndex++}>{content}</strong>)
    } else if (wrapItalic) {
      nodes.push(<em key={keyIndex++}>{content}</em>)
    } else {
      nodes.push(<Fragment key={keyIndex++}>{content}</Fragment>)
    }
  }

  return nodes
}

interface InfoPageProps {
  slug: InfoSlug
}

export default function InfoPage({ slug }: InfoPageProps) {
  const reduceMotion = useReducedMotion()
  const data = infoPages[slug]

  const reveal = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.15 },
          transition: {
            duration: 0.45,
            ease: [0.23, 1, 0.32, 1] as const,
            delay,
          },
        }

  return (
    <section className={styles.page}>
      <div className={styles.shell}>
        <a href="/#hero" className={styles.backLink}>
          <svg viewBox="0 0 24 24" aria-hidden width="18" height="18">
            <path
              d="M15 18l-6-6 6-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to home
        </a>

        <motion.header className={styles.hero} {...reveal(0)}>
          <span className={styles.eyebrow}>{data.eyebrow}</span>
          <h1 className={styles.title}>{data.title}</h1>
          {data.updated && (
            <p className={styles.updated}>Last updated: {data.updated}</p>
          )}
          {data.intro && (
            <p className={styles.intro}>{renderRichText(data.intro)}</p>
          )}
        </motion.header>

        <div className={styles.sections}>
          {data.sections.map((section, index) => (
            <motion.section
              key={section.id}
              id={section.id}
              className={styles.sectionCard}
              {...reveal(0.05 + index * 0.04)}
            >
              {section.title && (
                <h2 className={styles.sectionTitle}>{section.title}</h2>
              )}
              {section.blocks.map((block, blockIndex) => {
                if (block.type === 'heading') {
                  return (
                    <h3 key={blockIndex} className={styles.blockHeading}>
                      {renderRichText(block.text)}
                    </h3>
                  )
                }

                if (block.type === 'list') {
                  return (
                    <ul key={blockIndex} className={styles.list}>
                      {block.items.map((item, itemIndex) => (
                        <li key={itemIndex} className={styles.listItem}>
                          <span className={styles.bullet} aria-hidden />
                          <span>
                            {item.label && (
                              <strong className={styles.listLabel}>
                                {item.label}:
                              </strong>
                            )}{' '}
                            {renderRichText(item.text)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )
                }

                return (
                  <p key={blockIndex} className={styles.paragraph}>
                    {renderRichText(block.text)}
                  </p>
                )
              })}
            </motion.section>
          ))}
        </div>

        <motion.div className={styles.footerCta} {...reveal(0.1)}>
          <p>Have a question or want to reach the team?</p>
          <a className={styles.ctaButton} href={`mailto:${EMAIL}`}>
            Email us at {EMAIL}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
