import { productDetails } from '../../data/ecosystem'
import useScrollAnimation from '../../hooks/useScrollAnimation'
import styles from '../../styles/components/ProductsPage.module.css'

function ProductVisual({ productId }: { productId: string }) {
  if (productId === 'kaicards') {
    return (
      <div className={`${styles.visual} ${styles.visualKaicards}`} aria-hidden>
        <div className={styles.cardMock} />
        <div className={styles.cardMockSecondary} />
        <div className={styles.signalLine} />
      </div>
    )
  }

  if (productId === 'kairef') {
    return (
      <div className={`${styles.visual} ${styles.visualKairef}`} aria-hidden>
        <div className={styles.portalWindow} />
        <div className={styles.resumeCard} />
        <div className={styles.matchMeter} />
      </div>
    )
  }

  return (
    <div className={`${styles.visual} ${styles.visualKaitree}`} aria-hidden>
      <div className={styles.treeRoot} />
      <div className={styles.treeBranchA} />
      <div className={styles.treeBranchB} />
      <div className={styles.treeLeaf} />
    </div>
  )
}

function FlowBlock({
  flow,
}: {
  flow: {
    step: number
    actor: string
    title: string
    detail: string
  }[]
}) {
  return (
    <div className={styles.flowBox}>
      <pre className={styles.flowPre} aria-label="Structured user flow">
        {`{
  "userFlow": [`}
      </pre>
      {flow.map((item, index) => (
        <article key={item.step} className={styles.flowStep}>
          <p className={styles.flowLine}>{`    {`}</p>
          <p className={styles.flowLine}>{`      "step": ${item.step},`}</p>
          <p className={styles.flowLine}>{`      "actor": "${item.actor}",`}</p>
          <p className={styles.flowLine}>{`      "title": "${item.title}",`}</p>
          <p className={styles.flowLine}>{`      "detail": "${item.detail}"`}</p>
          <p className={styles.flowLine}>
            {index === flow.length - 1 ? '    }' : '    },'}
          </p>
        </article>
      ))}
      <pre className={styles.flowPre}>{`  ]
}`}</pre>
    </div>
  )
}

export default function ProductsPage() {
  const heroRef = useScrollAnimation()

  return (
    <section className={styles.page}>
      <header ref={heroRef} className={styles.hero}>
        <span className="section-label">Product Deep Dive</span>
        <h1 className={styles.title}>
          KaizunaNexus Products:
          <span className="gradient-text"> direct bridges, not middlemen.</span>
        </h1>
        <p className={styles.subtitle}>
          Explore how Kaicards, Kairef, and Kaitree convert trusted connections
          into measurable outcomes.
        </p>
      </header>

      <div className={styles.productsWrap}>
        {productDetails.map((product, index) => {
          const ref = useScrollAnimation(index * 80)
          return (
            <article
              key={product.id}
              id={product.id}
              ref={ref}
              className={`${styles.productCard} scroll-fade`}
            >
              <div className={styles.productHeader}>
                <div>
                  <p className={styles.vertical}>{product.vertical}</p>
                  <h2 className={styles.productTitle}>{product.name}</h2>
                </div>
                <a href="/#waitlist" className={styles.connectBtn}>
                  Connect Now
                </a>
              </div>

              <p className={styles.statement}>{product.statement}</p>

              <div className={styles.copyGrid}>
                <div className={styles.copyBlock}>
                  <h3>Product Motivation</h3>
                  <p>{product.motivation}</p>
                </div>
                <div className={styles.copyBlock}>
                  <h3>Naming Motivation</h3>
                  <p>{product.namingMotivation}</p>
                </div>
              </div>

              <div className={styles.highlights}>
                {product.highlights.map((highlight) => (
                  <span key={highlight} className={styles.highlightPill}>
                    {highlight}
                  </span>
                ))}
              </div>

              <div className={styles.detailGrid}>
                <FlowBlock flow={product.flow} />
                <ProductVisual productId={product.id} />
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
