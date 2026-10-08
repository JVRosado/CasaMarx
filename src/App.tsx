import { useEffect, useState, type ReactNode } from "react";
import logo from "./assets/LogoCasa.png";
const workerImage =
  "https://images.unsplash.com/photo-1576666735179-f3ad352212c2?auto=format&fit=crop&w=1800&q=85";
const factoryImage =
  "https://images.unsplash.com/photo-1739530906314-25d9f933c61f?auto=format&fit=crop&w=1800&q=85";
const marxImage =
  "https://upload.wikimedia.org/wikipedia/commons/d/d4/Karl_Marx_001.jpg";

// Defina como `null` quando não houver destaque. Nesse caso, apenas a capa editorial será exibida.
const showEventSlide = false;

const activeFeature: {
  type: "event";
  eyebrow: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
} | null = showEventSlide
  ? {
      type: "event",
      eyebrow: "Próximo encontro",
      title: "Marx e o nosso tempo",
      date: "28 JUN — 2025",
      time: "19H30",
      location: "Auditório principal",
      description:
        "Uma conversa aberta sobre trabalho, tecnologia e as novas formas de organização da vida contemporânea.",
    }
  : null;

const concepts = [
  {
    number: "01",
    title: "Luta de classes",
    text: "A história das sociedades é atravessada pelo conflito entre grupos que ocupam posições opostas na produção.",
  },
  {
    number: "02",
    title: "Mais-valia",
    text: "A diferença entre o valor produzido pelo trabalho e aquilo que retorna ao trabalhador em forma de salário.",
  },
  {
    number: "03",
    title: "Alienação",
    text: "Quando o trabalho, sua atividade e seu produto aparecem ao trabalhador como algo estranho e exterior.",
  },
  {
    number: "04",
    title: "Capital",
    text: "Não apenas riqueza acumulada, mas uma relação social orientada à expansão contínua do valor.",
  },
  {
    number: "05",
    title: "Trabalho",
    text: "Atividade humana que transforma a natureza, produz o mundo social e também transforma quem trabalha.",
  },
  {
    number: "06",
    title: "Materialismo histórico",
    text: "Um modo de compreender a história a partir das condições materiais e das relações sociais concretas.",
  },
];

const works = [
  ["1867", "O Capital", "Crítica da economia política", "I"],
  ["1848", "Manifesto do Partido Comunista", "Com Friedrich Engels", "II"],
  ["1845", "A Ideologia Alemã", "Crítica da filosofia alemã", "III"],
  ["1844", "Manuscritos Econômico-Filosóficos", "Trabalho, alienação e humanidade", "IV"],
];

const timeline = [
  ["1818", "Nasce Karl Marx", "Trier, então parte do Reino da Prússia."],
  ["1848", "Revoluções na Europa", "Levantes populares atravessam o continente; é publicado o Manifesto."],
  ["1864", "Primeira Internacional", "Organizações operárias de diferentes países passam a se articular."],
  ["1867", "O Capital, Livro I", "Marx publica sua investigação sobre a dinâmica do modo de produção capitalista."],
  ["1871", "Comuna de Paris", "Trabalhadores assumem o governo da cidade por 72 dias."],
  ["1883", "Uma obra em movimento", "Marx morre em Londres; seus escritos seguem abertos a leituras e disputas."],
];

const quotes = [
  {
    label: "Transformação",
    quote: "Os filósofos apenas interpretaram o mundo de diferentes maneiras; o que importa é transformá-lo.",
    source: "Teses sobre Feuerbach, 1845",
  },
  {
    label: "História",
    quote: "Os homens fazem a sua própria história, mas não a fazem segundo a sua livre vontade.",
    source: "O 18 de Brumário, 1852",
  },
  {
    label: "Trabalho",
    quote: "O trabalho é, antes de tudo, um processo entre o homem e a natureza.",
    source: "O Capital, Livro I, 1867",
  },
];

function Heading({
  as = "h2",
  className = "",
  children,
}: {
  as?: "h1" | "h2" | "h3";
  className?: string;
  children: ReactNode;
}) {
  const Tag = as;
  return <Tag className={className}>{children}</Tag>;
}

function TextLink({
  href,
  className = "",
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a className={className} href={href}>
      {children}
    </a>
  );
}

function Action({
  active = false,
  onClick,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      className={`quote-tab ${active ? "quote-tab--active" : ""}`}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <div className={`eyebrow ${light ? "eyebrow--light" : ""}`}>{children}</div>;
}

export default function App() {
  const [activeQuote, setActiveQuote] = useState(0);
  const [activeHero, setActiveHero] = useState(0);
  const heroSlides = activeFeature ? ["event", "editorial"] : ["editorial"];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.14 },
    );

    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    const onScroll = () => {
      document.documentElement.style.setProperty("--scroll-y", `${window.scrollY}`);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (heroSlides.length < 2) return;
    const timer = window.setInterval(() => {
      setActiveHero((current) => (current + 1) % heroSlides.length);
    }, 8000);
    return () => window.clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <main className="site-shell">
      <header className="topbar">
        <TextLink className="brand" href="#inicio">
          CASA MARX-ENGELS
          {/*<img className="brand-logo" src={logo} alt="Casa Marx" />*/}
        </TextLink>

        <nav className="nav" aria-label="Navegação principal">
          <TextLink href="#pensamento">Pensamento</TextLink>
          <TextLink href="#obras">Obras</TextLink>
          <TextLink href="#historia">História</TextLink>
          <TextLink href="#pensar">Para pensar</TextLink>
        </nav>
        <div className="issue">Caderno 01 — 2025</div>
      </header>

      <section className="hero-carousel" id="inicio" aria-roledescription="carrossel">
        <div className="hero-slides">
          {activeFeature && (
            <article
              className={`hero-slide event-hero ${activeHero === 0 ? "hero-slide--active" : ""}`}
              aria-hidden={activeHero !== 0}
            >
              <div className="event-backdrop">
                <img src={workerImage} alt="" />
              </div>
              <div className="event-layout">
                <div className="event-seal">CM<br />AGENDA</div>
                <div className="event-main">
                  <div className="hero-kicker">{activeFeature.eyebrow} · Entrada livre</div>
                  <Heading as="h1" className="event-title">
                    {activeFeature.title}
                  </Heading>
                  <p className="event-description">{activeFeature.description}</p>
                </div>
                <div className="event-info">
                  <div>
                    <span>Data</span>
                    <strong>{activeFeature.date}</strong>
                  </div>
                  <div>
                    <span>Horário</span>
                    <strong>{activeFeature.time}</strong>
                  </div>
                  <div>
                    <span>Local</span>
                    <strong>{activeFeature.location}</strong>
                  </div>
                </div>
                <TextLink className="event-link" href="#horarios">
                  Ver informações <span>↘</span>
                </TextLink>
              </div>
            </article>
          )}

          <article
            className={`hero-slide hero ${activeHero === heroSlides.length - 1 ? "hero-slide--active" : ""}`}
            aria-hidden={activeHero !== heroSlides.length - 1}
          >
            <div className="hero-grid">
              <div className="hero-title-wrap">
                <div className="hero-kicker">Arquivo crítico · Filosofia · História social</div>
                <Heading as="h1" className="hero-title">
                  <span>CASA</span>
                  <span>MARX</span>
                </Heading>
                <div className="hero-deck">
                  Ideias não habitam o vazio. Elas nascem do mundo — e voltam para transformá-lo.
                </div>
              </div>

              <div className="portrait-frame">
                <div className="portrait-stamp">1818—1883</div>
                <img
                  className="portrait"
                  src={marxImage}
                  alt="Retrato histórico de Karl Marx em preto e branco"
                />
                <div className="portrait-wash" />
                <div className="portrait-caption">K. Marx / Londres / Arquivo fotográfico</div>
              </div>

              <div className="hero-index">
                <span>Nº 001</span>
                <span>51°30′N</span>
                <span>Leitura em 08 atos</span>
              </div>
              <div className="scroll-note">
                <span className="scroll-line" />
                Role para investigar
              </div>
            </div>
          </article>
        </div>

        {heroSlides.length > 1 && (
          <div className="carousel-controls" aria-label="Controles do carrossel">
            <button
              className="carousel-arrow"
              onClick={() =>
                setActiveHero((current) => (current - 1 + heroSlides.length) % heroSlides.length)
              }
              type="button"
              aria-label="Slide anterior"
            >
              ←
            </button>
            <div className="carousel-count">
              <span>0{activeHero + 1}</span>
              <i />
              <span>0{heroSlides.length}</span>
            </div>
            <button
              className="carousel-arrow"
              onClick={() => setActiveHero((current) => (current + 1) % heroSlides.length)}
              type="button"
              aria-label="Próximo slide"
            >
              →
            </button>
          </div>
        )}
      </section>

      <section className="intro paper-section" id="quem-foi">
        <div className="section-number reveal">01</div>
        <div className="intro-copy reveal">
          <Eyebrow>Quem foi Karl Marx</Eyebrow>
          <Heading className="display-heading">
            Um pensador no centro das contradições do seu tempo.
          </Heading>
        </div>
        <div className="intro-body reveal">
          <p className="lead">
            Filósofo, economista, jornalista e militante, Karl Marx construiu uma crítica radical
            da sociedade capitalista e de suas formas de exploração.
          </p>
          <div className="columns">
            <p>
              Nascido em 1818, na cidade de Trier, viveu entre censuras, exílios e intensos debates
              políticos. Em colaboração decisiva com Friedrich Engels, investigou como as relações
              materiais organizam a vida, a história e as ideias.
            </p>
            <p>
              Sua obra não oferece um retrato imóvel do mundo. Ela propõe um método para perceber
              forças, conflitos e possibilidades ocultas sob a aparência cotidiana das coisas.
            </p>
          </div>
        </div>
        <div className="marginalia marginalia-a">CRÍTICA / MÉTODO / PRÁXIS</div>
      </section>

      <section className="concepts-section" id="pensamento">
        <div className="section-head reveal">
          <div>
            <Eyebrow light>O pensamento</Eyebrow>
            <Heading className="display-heading light">Conceitos para ler o presente</Heading>
          </div>
          <div className="section-note">06 entradas para um vocabulário crítico</div>
        </div>
        <div className="concept-grid">
          {concepts.map((concept) => (
            <article className="concept-card reveal" key={concept.number}>
              <div className="concept-number">{concept.number}</div>
              <Heading as="h3" className="concept-title">
                {concept.title}
              </Heading>
              <p>{concept.text}</p>
              <div className="concept-arrow" aria-hidden="true">
                ↘
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="works-section paper-section" id="obras">
        <div className="works-heading reveal">
          <div className="section-number">02</div>
          <Eyebrow>Obras fundamentais</Eyebrow>
          <Heading className="display-heading">Livros que ainda inquietam</Heading>
        </div>
        <div className="works-list">
          {works.map(([year, title, subtitle, roman]) => (
            <article className="work-row reveal" key={title}>
              <div className="work-year">{year}</div>
              <div>
                <Heading as="h3" className="work-title">
                  {title}
                </Heading>
                <p>{subtitle}</p>
              </div>
              <div className="work-roman">{roman}</div>
              <div className="work-mark" aria-hidden="true">
                +
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="history-section" id="historia">
        <div className="history-image reveal">
          <img src={factoryImage} alt="Estrutura de uma antiga fábrica em preto e branco" />
          <div className="image-label">ARQUIVO / INDÚSTRIA / SÉC. XIX—XX</div>
        </div>
        <div className="history-content">
          <div className="reveal">
            <Eyebrow light>História e sociedade</Eyebrow>
            <Heading className="display-heading light">O tempo não é uma linha neutra.</Heading>
          </div>
          <div className="timeline">
            {timeline.map(([year, title, text]) => (
              <article className="timeline-item reveal" key={year}>
                <time>{year}</time>
                <div>
                  <Heading as="h3">{title}</Heading>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="labor-section" id="trabalho">
        <div className="labor-copy reveal">
          <Eyebrow>Trabalho e classe</Eyebrow>
          <Heading className="labor-title">
            Quem produz<br />
            <em>o mundo?</em>
          </Heading>
          <p>
            Toda mercadoria guarda uma história. Horas, corpos, conhecimentos e relações sociais
            tornam-se invisíveis quando o produto aparece pronto diante de nós.
          </p>
        </div>
        <div className="labor-visual reveal">
          <img src={workerImage} alt="Trabalhador operando máquina em fotografia histórica" />
          <div className="labor-words" aria-hidden="true">
            <span>PRODUÇÃO</span>
            <span>CONFLITO</span>
            <span>CLASSE</span>
          </div>
          <div className="labor-caption">Trabalho mecânico, acervo histórico — Museums Victoria</div>
        </div>
        <div className="formula-strip">
          <span>TRABALHO</span>
          <b>→</b>
          <span>VALOR</span>
          <b>→</b>
          <span>CAPITAL</span>
          <b>→</b>
          <span>CONTRADIÇÃO</span>
          <b>→</b>
          <span>TRANSFORMAÇÃO</span>
        </div>
      </section>

      <section className="quotes-section" id="pensar">
        <div className="quotes-meta reveal">
          <div className="section-number">03</div>
          <Eyebrow>Para pensar</Eyebrow>
          <p>Selecione uma chave de leitura.</p>
          <div className="quote-tabs">
            {quotes.map((item, index) => (
              <Action
                active={activeQuote === index}
                key={item.label}
                onClick={() => setActiveQuote(index)}
              >
                <span>0{index + 1}</span>
                {item.label}
              </Action>
            ))}
          </div>
        </div>
        <div className="quote-display reveal" key={activeQuote}>
          <div className="quote-mark">“</div>
          <blockquote>{quotes[activeQuote].quote}</blockquote>
          <cite>{quotes[activeQuote].source}</cite>
        </div>
      </section>

      <section className="hours-section" id="horarios">
        <div className="hours-intro reveal">
          <div className="section-number">04</div>
          <Eyebrow>Visita e programação</Eyebrow>
          <Heading className="display-heading">Horários de funcionamento</Heading>
          <p>
            Consulte os horários regulares. Em dias de encontros e atividades especiais, a
            programação pode se estender.
          </p>
        </div>
        <div className="hours-board reveal">
          <div className="hours-row">
            <span>Segunda-feira</span>
            <strong>Fechado</strong>
          </div>
          <div className="hours-row">
            <span>Terça — Sexta</span>
            <strong>10h — 19h</strong>
          </div>
          <div className="hours-row">
            <span>Sábado</span>
            <strong>10h — 18h</strong>
          </div>
          <div className="hours-row">
            <span>Domingo</span>
            <strong>11h — 16h</strong>
          </div>
          <div className="hours-note">
            <span>Hoje</span>
            <p>Programação sujeita a alterações em feriados.</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-top">
          <Heading className="footer-logo">CASA MARX</Heading>
          <img className="footer-circle" src={logo} alt="Casa Marx" />
        </div>
        <div className="footer-bottom">
          <p>Pensar a sociedade é reconhecer que ela pode ser outra.</p>
          <div>Todos os direitos reservados · 2026</div>
          <TextLink href="https://linkore.com.br/">Desenvolvido por Linkore</TextLink>
        </div>
      </footer>
    </main>
  );
}
