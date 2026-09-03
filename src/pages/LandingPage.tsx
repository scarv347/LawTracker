import { useEffect, useRef } from 'react';
import { Calendar, MessageCircle, Scale, Sparkle } from '../components/ui/Icons';
import styles from './LandingPage.module.css';

interface LandingPageProps {
  onAuth: () => void;
  onIncognito: () => void;
}

export const LandingPage = ({ onAuth, onIncognito }: LandingPageProps) => {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;
    const revealItems = page.querySelectorAll<HTMLElement>('[data-reveal]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.revealed);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });
    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={pageRef} className={styles.page}>
      <header className={styles.header}>
        <a className={styles.brand} href="/" aria-label="LawTrack home">
          <span className={styles.logo} aria-hidden="true"><Scale /></span>
          <span>LawTrack</span>
        </a>
        <div className={styles.headerActions}>
          <span className={styles.headerNote}>A clearer way to know your rights</span>
          <button className={styles.incognitoButton} type="button" onClick={onIncognito}><Sparkle /> Try incognito</button>
          <button className={styles.signIn} type="button" onClick={onAuth}>Sign up / log in</button>
        </div>
      </header>

      <main>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}><span className={styles.kickerDot} /> Legal information, made personal</p>
            <h1>Know what<br /><em>applies to you.</em></h1>
            <p className={styles.intro}>LawTrack helps you understand legal questions, spot what changes when life changes, and keep up with laws that affect you.</p>
            <div className={styles.heroActions}>
              <button className={styles.primaryButton} type="button" onClick={onAuth}>Sign up to explore <span aria-hidden="true">-&gt;</span></button>
              <span className={styles.noAdvice}>General information only<br />Never legal advice</span>
            </div>
          </div>

          <div className={styles.heroVisual} aria-label="LawTrack workspace preview">
            <div className={styles.paperShadow} />
            <div className={styles.document}>
              <div className={styles.documentTop}><span>LAWTRACK / YOUR BRIEF</span><span>01</span></div>
              <div className={styles.documentRule} />
              <p className={styles.documentEyebrow}>THIS WEEK IN YOUR JURISDICTION</p>
              <h2>Arizona housing<br />&amp; family law</h2>
              <p className={styles.documentBody}>A focused view of the laws and deadlines that matter to your life right now.</p>
              <div className={styles.documentStat}><strong>84</strong><span>evidence confidence<br /><small>Strong supporting sources</small></span></div>
              <div className={styles.documentFooter}><span>Verified sources</span><span>Maricopa County, AZ</span></div>
            </div>
            <div className={styles.floatingDate}><Calendar /><div><strong>Next up</strong><span>Lease review · Oct 14</span></div></div>
            <div className={styles.floatingSpark}><Sparkle /></div>
          </div>
        </section>

        <section className={`${styles.features} ${styles.reveal}`} data-reveal aria-label="LawTrack features">
          <div className={styles.featureIntro}><span>01</span><strong>Three ways<br />to stay ahead.</strong></div>
          <article className={`${styles.feature} ${styles.reveal}`} data-reveal><span className={styles.featureIcon}><MessageCircle /></span><div><h3>Ask LawTrack</h3><p>Get clear, source-backed help with the legal questions in your life.</p></div></article>
          <article className={`${styles.feature} ${styles.reveal}`} data-reveal><span className={styles.featureIcon}><Sparkle /></span><div><h3>Life-triggered updates</h3><p>When life changes, discover the new rights and responsibilities that may apply.</p></div></article>
          <article className={`${styles.feature} ${styles.reveal}`} data-reveal><span className={styles.featureIcon}><Scale /></span><div><h3>New laws for you</h3><p>Keep up with laws and updates relevant to your life and location.</p></div></article>
        </section>

        <section className={`${styles.storySection} ${styles.reveal}`} data-reveal>
          <div className={styles.sectionLabel}>02 / WHEN LIFE MOVES</div>
          <div className={styles.storyGrid}>
            <div>
              <h2>Big life moments<br /><em>change the picture.</em></h2>
              <p className={styles.sectionText}>Tell LawTrack what is happening in your life and it helps surface the legal information worth paying attention to next.</p>
              <button className={styles.textButton} type="button" onClick={onAuth}>Build your personal view <span aria-hidden="true">-&gt;</span></button>
            </div>
            <div className={styles.timeline}>
              <div className={styles.timelineItem}><span className={styles.timelineMarker}>01</span><div><strong>Turning 21</strong><p>Check age-based rules and responsibilities in your jurisdiction.</p></div><span className={styles.timelineTag}>LIFE EVENT</span></div>
              <div className={styles.timelineItem}><span className={styles.timelineMarker}>02</span><div><strong>Moving states</strong><p>See how location can change the information that applies to you.</p></div><span className={styles.timelineTag}>LIFE EVENT</span></div>
              <div className={styles.timelineItem}><span className={styles.timelineMarker}>03</span><div><strong>Starting a business</strong><p>Keep relevant registration, employment, and local information close.</p></div><span className={styles.timelineTag}>LIFE EVENT</span></div>
            </div>
          </div>
        </section>

        <section className={`${styles.assistantSection} ${styles.reveal}`} data-reveal>
          <div className={styles.assistantCard}>
            <div className={styles.assistantTop}><span className={styles.assistantIcon}><MessageCircle /></span><span>ASK LAWTRACK / GROUNDED AI</span></div>
            <p className={styles.chatQuestion}>“What should I know about this change?”</p>
            <div className={styles.chatAnswer}><span className={styles.answerLine} /><div><strong>Here is what we found.</strong><p>Answers are built from retrieved legal sources, with the supporting evidence shown alongside them.</p><span className={styles.sourcePill}>3 VERIFIED SOURCES</span></div></div>
          </div>
          <div className={styles.assistantCopy}><div className={styles.sectionLabel}>03 / ASK WITH CONTEXT</div><h2>A better starting point<br /><em>for hard questions.</em></h2><p className={styles.sectionText}>Ask in plain language. LawTrack keeps the conversation tied to verified sources and makes uncertainty visible, so you can read, follow up, and know when to seek an attorney.</p></div>
        </section>

        <section className={`${styles.feedSection} ${styles.reveal}`} data-reveal>
          <div className={styles.feedHeading}><div className={styles.sectionLabel}>04 / YOUR LAW FEED</div><h2>Keep up without<br /><em>keeping watch.</em></h2><p className={styles.sectionText}>Your feed brings relevant legal updates into focus across federal, state, county, and city jurisdictions.</p></div>
          <div className={styles.feedList}>
            <div className={styles.feedItem}><span className={styles.feedNumber}>01</span><div><span className={styles.feedMeta}>HOUSING · ARIZONA</span><h3>Updates worth a closer look</h3><p>See a plain-language summary, effective date, and source evidence together.</p></div><span className={styles.feedArrow} aria-hidden="true">-&gt;</span></div>
            <div className={styles.feedItem}><span className={styles.feedNumber}>02</span><div><span className={styles.feedMeta}>PERSONALIZED TO YOU</span><h3>Less noise, more relevance</h3><p>Follow the topics and places connected to your life events.</p></div><span className={styles.feedArrow} aria-hidden="true">-&gt;</span></div>
            <div className={styles.feedItem}><span className={styles.feedNumber}>03</span><div><span className={styles.feedMeta}>SOURCE EVIDENCE</span><h3>Know where information comes from</h3><p>Every update points back to its legal source so you can dig deeper.</p></div><span className={styles.feedArrow} aria-hidden="true">-&gt;</span></div>
          </div>
        </section>

        <section className={`${styles.finalCta} ${styles.reveal}`} data-reveal>
          <p className={styles.kicker}><span className={styles.kickerDot} /> Start with what matters to you</p>
          <h2>Make the law<br /><em>easier to follow.</em></h2>
          <button className={styles.primaryButton} type="button" onClick={onAuth}>Create your account <span aria-hidden="true">-&gt;</span></button>
          <p className={styles.disclaimer}>LawTrack provides general legal information for educational purposes only. It does not constitute legal advice or create an attorney-client relationship.</p>
        </section>
      </main>

      <footer className={styles.footer}><span>Built for understanding, wherever you are.</span><span>United States · Federal to local</span></footer>
    </div>
  );
};