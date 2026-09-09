import { Link } from 'react-router-dom'
import { CodeBackdrop } from '../components/CodeBackdrop'
import { PageMeta } from '../components/PageMeta'
import { SectionHeading } from '../components/SectionHeading'

const reasons = [
  {
    number: '01',
    title: '少人数で一気通貫',
    description:
      '営業、設計、開発を何層にも分けず、意思決定と実装を近づけます。大人数を前提にしないことで、伝達にかかる時間と開発工数を抑えます。',
  },
  {
    number: '02',
    title: 'AIを活用した開発工程',
    description:
      '人が業務を理解し、何を作るかを判断する。そのうえでAIを設計、実装、検証、修正の支援に活用し、反復作業を効率化します。',
  },
  {
    number: '03',
    title: '必要な部分から段階導入',
    description:
      '最初から巨大な仕組みを作らず、負担や効果の大きい業務から着手します。利用状況を見ながら広げ、初期費用と導入リスクを抑えます。',
  },
]

const connectedWork = ['入力', '確認', '承認', '作業', '集計', '次の判断']

const industries = ['飲食', '介護', '建設', '製造', '宿泊', '自動車']

const commonProblems = [
  '紙・FAX・Excelをなくしたい',
  '既製ツールが自社業務に合わない',
  '転記や二重入力をなくしたい',
  'バラバラの業務を一つにつなぎたい',
  '独自の承認・計算・帳票をシステム化したい',
  '自社専用のツールを作りたい',
]

const homeProcess = [
  {
    number: '01',
    title: '相談',
    description: '現在の業務や、作りたいものを確認します。',
  },
  {
    number: '02',
    title: '設計・開発',
    description: '必要な機能を整理し、優先度の高い部分から設計・実装します。',
  },
  {
    number: '03',
    title: '導入・改善',
    description: '利用状況を確認し、運用しながら改善・拡張します。',
  },
]

export function HomePage() {
  return (
    <>
      <PageMeta
        title="TEIRESIAS合同会社 | 会社ごとの業務に合わせたシステム開発"
        description="既製ツールでは合わなかった業務を、思い通りのシステムへ。TEIRESIAS合同会社は、従来の個別開発より費用と期間を抑えながら、会社固有の業務システムを設計・開発します。"
      />
      <main id="main-content" tabIndex={-1}>
        <section className="hero-section">
          <CodeBackdrop />
          <div className="hero-section__veil" aria-hidden="true" />
          <div className="container hero-section__content">
            <p className="eyebrow">CUSTOM BUSINESS SYSTEMS</p>
            <h1>
              <span>思い通りのシステムを、</span>
              <span className="hero-section__title-support">
                もっと現実的な
                <span className="hero-section__no-break">費用と期間で。</span>
              </span>
            </h1>
            <p className="hero-section__lead">
              既製ツールでは、自社の業務に合わない。
              <br />
              一方で、従来の個別開発は高額で、完成まで時間がかかる。
              <br />
              TEIRESIASは会社ごとに個別設計し、開発工程を効率化することで、費用と期間を大幅に抑えます。
            </p>
            <div className="hero-section__actions">
              <Link className="button button--primary" to="/contact">
                業務のシステム化について相談する
              </Link>
              <Link className="button button--outline" to="/approach">
                TEIRESIASの開発を見る
              </Link>
            </div>
          </div>
          <a className="scroll-guide" href="#problem">
            <span>SCROLL</span>
            <i aria-hidden="true" />
          </a>
        </section>

        <section className="home-section problem-section" id="problem">
          <div className="container">
            <SectionHeading
              eyebrow="THE PROBLEM"
              title={'欲しいシステムを、\n費用と期間で諦めない。'}
              description="既製ツールと従来の個別開発。その間に、システム化できないまま残ってきた業務があります。"
            />
            <div className="problem-comparison">
              <article>
                <p className="problem-comparison__label">READY-MADE TOOLS</p>
                <h3>既製ツールは、完全には合わない。</h3>
                <p>
                  共通業務へすぐ導入できる一方、会社固有の承認、計算、帳票、例外処理までは合わせにくいことがあります。
                </p>
              </article>
              <article>
                <p className="problem-comparison__label">
                  CONVENTIONAL DEVELOPMENT
                </p>
                <h3>個別開発は、高額・長期になりやすい。</h3>
                <p>
                  思い通りに作れても、大人数の体制と長い開発工程が必要になれば、費用と期間が導入の壁になります。
                </p>
              </article>
            </div>
            <p className="problem-conclusion">
              その結果、必要な業務が紙やExcel、複数ツールの組み合わせで残る。TEIRESIASは、個別設計の自由度を保ちながら、その間を埋めます。
            </p>
          </div>
        </section>

        <section className="home-section why-section">
          <div className="container">
            <SectionHeading
              eyebrow="WHY TEIRESIAS"
              title={'個別開発の、\nコスト構造を変える。'}
              description="安さや速さを目的にするのではなく、思い通りに作るための開発工程そのものを見直します。"
            />
            <div className="why-list">
              {reasons.map((reason) => (
                <article key={reason.number}>
                  <p className="why-list__number">{reason.number}</p>
                  <h3>{reason.title}</h3>
                  <p>{reason.description}</p>
                </article>
              ))}
            </div>
            <Link className="text-link section-link" to="/approach">
              開発方針を詳しく見る
            </Link>
          </div>
        </section>

        <section className="home-section philosophy-section">
          <div className="container philosophy-section__grid">
            <div>
              <p className="eyebrow">DESIGN PHILOSOPHY</p>
              <h2>会社を、システムに合わせない。</h2>
              <p>
                一つの作業だけをWeb化しても、その前後が紙やExcelのままなら、転記や確認は残ります。TEIRESIASは、入力した情報が次の業務へどうつながるかまで設計します。
              </p>
            </div>
            <ol className="connected-work" aria-label="情報がつながる業務の例">
              {connectedWork.map((item, index) => (
                <li key={item}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {item}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="home-section industries-section">
          <div className="container industries-section__grid">
            <SectionHeading
              eyebrow="FIELDS OF WORK"
              title="デジタル化が難しかった現場へ。"
              description="飲食、介護、建設、製造、宿泊、自動車など。独自業務が多く、既製ツールだけではデジタル化しにくい現場も個別設計の対象です。業界を限定するものではありません。"
            />
            <ul className="industry-list">
              {industries.map((industry, index) => (
                <li key={industry}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {industry}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="home-section common-problems-section">
          <div className="container">
            <SectionHeading
              eyebrow="COMMON PROBLEMS"
              title="こんな業務から、ご相談ください。"
            />
            <ul className="common-problems">
              {commonProblems.map((problem, index) => (
                <li key={problem}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {problem}
                </li>
              ))}
            </ul>
            <Link className="text-link section-link" to="/services">
              具体的な開発領域を見る
            </Link>
          </div>
        </section>

        <section className="home-section home-case-section">
          <div className="container home-case-section__grid">
            <div className="home-case-section__intro">
              <p className="eyebrow">CASE STUDY</p>
              <p className="home-case-section__status">
                DEVELOPMENT IN PROGRESS
              </p>
              <h2>会社固有の発注業務を、段階的にWebシステムへ。</h2>
              <p>
                食品小売・惣菜販売企業の13店舗と本部で、FAX中心の発注業務をWeb化。承認、商品・店舗マスタ、帳票、販売管理まで、現在の運用に合わせて設計・開発しています。
              </p>
              <Link className="text-link" to="/cases/order-management">
                事例を見る
              </Link>
            </div>
            <div className="case-proof">
              <p className="eyebrow">PRICE PROOF</p>
              <dl>
                <div>
                  <dt>既存ベンダー見積</dt>
                  <dd>約1,500万円</dd>
                </div>
                <div>
                  <dt>TEIRESIAS提案</dt>
                  <dd>500万円</dd>
                </div>
              </dl>
              <p>
                当該案件における比較です。開発範囲や費用は案件ごとに異なります。
              </p>
            </div>
          </div>
        </section>

        <section className="home-section home-process-section">
          <div className="container home-process-section__grid">
            <SectionHeading
              eyebrow="PROCESS"
              title="必要な部分から、前へ進める。"
            />
            <ol className="home-process">
              {homeProcess.map((step) => (
                <li key={step.number}>
                  <span>{step.number}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
            <Link className="text-link" to="/process">
              開発の流れを見る
            </Link>
          </div>
        </section>

        <section className="home-company-section">
          <div className="container home-company-section__inner">
            <p className="eyebrow">COMPANY</p>
            <h2>TEIRESIAS合同会社</h2>
            <p>神奈川県横浜市</p>
            <p>システム開発・業務システムの設計および運用支援</p>
            <Link className="text-link" to="/company">
              会社情報を見る
            </Link>
          </div>
        </section>

        <section className="contact-cta home-final-cta">
          <div className="container contact-cta__inner">
            <p className="eyebrow">CONTACT</p>
            <h2>この業務、システムにできる？ そこからご相談ください。</h2>
            <p>
              作りたいシステムが決まっていても、まだ課題しか見えていなくても構いません。現在の業務を確認し、何をどうシステム化するべきかから整理します。
            </p>
            <Link className="button button--primary" to="/contact">
              業務のシステム化について相談する
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
