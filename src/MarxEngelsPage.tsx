import { useEffect, useState, type ReactNode } from "react";

const marxEngelsImage =
  "https://upload.wikimedia.org/wikipedia/commons/5/5f/Portraits_of_Marx_and_Engels_handcolored.jpg";
const founderPlaceholder =
  "https://images.unsplash.com/photo-1587397845856-e6cf49176c70?auto=format&fit=crop&w=1200&q=85";
// Conteúdo provisório: substitua este objeto pelos dados reais da próxima atividade.
const activeFeature: {
  title: string;
  eyebrow: string;
  date: string;
  time: string;
  location: string;
  description: string;
} | null = {
  eyebrow: "Próximo encontro",
  title: "Marx, Engels e o nosso tempo",
  date: "28 JUN",
  time: "19H30",
  location: "Local a confirmar",
  description:
    "Uma conversa aberta sobre trabalho, tecnologia e as novas formas de organização da vida contemporânea.",
};

const activities = [
  {
    number: "01",
    title: "Pesquisa e formação",
    text: "Grupos de estudo, cursos livres e encontros para ler criticamente o presente.",
  },
  {
    number: "02",
    title: "Programação cultural",
    text: "Debates, cinema, exposições e conversas que aproximam pensamento, arte e sociedade.",
  },
  {
    number: "03",
    title: "Arquivo e memória",
    text: "Documentos, imagens e histórias dos movimentos sociais e das experiências do trabalho.",
  },
  {
    number: "04",
    title: "Edições e publicações",
    text: "Cadernos, ensaios e materiais de apoio para fazer as ideias circularem.",
  },
];

const houseQuotes = [
  {
    quote: "A teoria também se torna força material quando se apodera das massas.",
    source: "Karl Marx",
  },
  {
    quote: "Um grama de ação vale mais do que uma tonelada de teoria.",
    source: "Friedrich Engels",
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

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <div className={`eyebrow ${light ? "eyebrow--light" : ""}`}>{children}</div>;
}

export default function MarxEngelsPage() {
  const [activeHero, setActiveHero] = useState(0);
  const [activeQuote, setActiveQuote] = useState(0);
  const slides = activeFeature ? 2 : 1;

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
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (slides < 2) return;
    const timer = window.setInterval(() => {
      setActiveHero((current) => (current + 1) % slides);
    }, 8000);
    return () => window.clearInterval(timer);
  }, [slides]);

  return (
    <main className="site-shell">
      <header className="topbar">
        <a className="brand" href={import.meta.env.BASE_URL}>
          CASA MARX
        </a>
        <nav className="nav" aria-label="Navegação principal">
          <a href="#a-casa">A Casa</a>
          <a href="#atuacao">O que fazemos</a>
          <a href="#visite">Visite</a>
          <a href={`${import.meta.env.BASE_URL}marx-engels`}>Marx &amp; Engels</a>
        </nav>
        <a className="issue" href="#social">
          Instagram
        </a>
      </header>

      <section className="hero-carousel home-carousel" aria-roledescription="carrossel">
        <div className="hero-slides">
          {activeFeature && (
            <article
              className={`hero-slide event-hero ${activeHero === 0 ? "hero-slide--active" : ""}`}
              aria-hidden={activeHero !== 0}
            >
              <div className="event-backdrop">
                <img src={marxEngelsImage} alt="Karl Marx e Friedrich Engels" />
              </div>
              <div className="event-layout">
                <div className="event-seal">
                  CM
                  <br />
                  AGENDA
                </div>
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
                <a className="event-link" href="#visite">
                  Ver informações <span>↘</span>
                </a>
              </div>
            </article>
          )}

          <article
            className={`hero-slide house-hero ${activeHero === slides - 1 ? "hero-slide--active" : ""}`}
            aria-hidden={activeHero !== slides - 1}
          >
            <div className="house-hero-copy">
              <div className="hero-kicker">Pensamento · Sociedade · Transformação</div>
              <Heading as="h1" className="house-hero-title">
                Uma casa para ideias <em>em movimento.</em>
              </Heading>
              <p>
                A CASA MARX é um espaço de estudo, memória e cultura dedicado a tornar o pensamento
                crítico vivo, acessível e coletivo.
              </p>
              <a className="house-hero-link" href="#a-casa">
                Conheça a casa <span>↓</span>
              </a>
            </div>
            <div className="house-hero-image">
              <img src={marxEngelsImage} alt="Retratos de Karl Marx e Friedrich Engels" />
              <div className="portrait-wash" />
              <div className="portrait-caption">Marx &amp; Engels / Arquivo histórico</div>
            </div>
            <div className="house-hero-index">CASA / ARQUIVO 001</div>
          </article>
        </div>

        {slides > 1 && (
          <div className="carousel-controls" aria-label="Controles do carrossel">
            <button
              className="carousel-arrow"
              onClick={() => setActiveHero((current) => (current - 1 + slides) % slides)}
              type="button"
              aria-label="Slide anterior"
            >
              ←
            </button>
            <div className="carousel-count">
              <span>0{activeHero + 1}</span>
              <i />
              <span>0{slides}</span>
            </div>
            <button
              className="carousel-arrow"
              onClick={() => setActiveHero((current) => (current + 1) % slides)}
              type="button"
              aria-label="Próximo slide"
            >
              →
            </button>
          </div>
        )}
      </section>

      <section className="house-about paper-section" id="a-casa">
        <div className="section-number reveal">01</div>
        <div className="house-about-title reveal">
          <Eyebrow>A Casa</Eyebrow>
          <Heading className="display-heading">Pensar junto também é uma forma de agir.</Heading>
        </div>
        <div className="house-about-body reveal">
          <p className="lead">
            Mais do que guardar ideias, a CASA MARX existe para colocá-las em circulação.
          </p>
          <p>
            Somos um projeto cultural e educativo independente voltado à leitura crítica da
            sociedade. A casa conecta pesquisa, história, arte e formação por meio de uma
            programação aberta a diferentes públicos.
          </p>
          <a className="inline-route" href={`${import.meta.env.BASE_URL}marx-engels`}>
            Conheça Marx e Engels <span>→</span>
          </a>
        </div>
      </section>

      <section className="activity-section" id="atuacao">
        <div className="section-head reveal">
          <div>
            <Eyebrow light>O que fazemos</Eyebrow>
            <Heading className="display-heading light">Conhecimento é uma prática coletiva.</Heading>
          </div>
          <div className="section-note">Quatro frentes de atuação</div>
        </div>
        <div className="activity-grid">
          {activities.map((item) => (
            <article className="activity-card reveal" key={item.number}>
              <div className="activity-number">{item.number}</div>
              <Heading as="h3">{item.title}</Heading>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="founder-section">
        <div className="founder-copy reveal">
          <Eyebrow>Quem iniciou a casa</Eyebrow>
          <div className="provisional-tag">Conteúdo provisório</div>
          <Heading className="display-heading">Nome do fundador</Heading>
          <p className="founder-role">Fundador e coordenador da CASA MARX</p>
          <p>
            Pesquisador e articulador cultural dedicado a criar espaços onde pensamento, memória e
            experiência coletiva possam se encontrar. Este texto deve ser substituído pela
            biografia oficial do fundador.
          </p>
          <blockquote>
            “Uma casa de pensamento só faz sentido quando suas portas permanecem abertas ao
            diálogo.”
          </blockquote>
        </div>
        <div className="founder-image reveal">
          <img src={founderPlaceholder} alt="Retrato provisório para a seção do fundador" />
          <div className="image-label">IMAGEM PROVISÓRIA — SUBSTITUIR PELO RETRATO OFICIAL</div>
        </div>
      </section>

      <section className="house-quotes">
        <div className="house-quote-nav reveal">
          <Eyebrow light>Para pensar</Eyebrow>
          <div>
            {houseQuotes.map((item, index) => (
              <button
                className={`house-quote-button ${activeQuote === index ? "is-active" : ""}`}
                key={item.source}
                onClick={() => setActiveQuote(index)}
                type="button"
              >
                0{index + 1} — {item.source}
              </button>
            ))}
          </div>
        </div>
        <div className="house-quote-display reveal" key={activeQuote}>
          <span>“</span>
          <blockquote>{houseQuotes[activeQuote].quote}</blockquote>
          <cite>{houseQuotes[activeQuote].source}</cite>
        </div>
      </section>

      <section className="visit-section" id="visite">
        <div className="visit-details">
          <div className="reveal">
            <div className="section-number">02</div>
            <Eyebrow>Visite a casa</Eyebrow>
            <Heading className="display-heading">Horários de funcionamento</Heading>
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
          </div>
        </div>
        <div className="location-panel reveal">
          <div className="location-meta">
            <div>
              <Eyebrow>Onde estamos</Eyebrow>
              <Heading as="h3">Endereço a confirmar</Heading>
              <p>Centro · Cidade/UF</p>
            </div>
            <div className="provisional-tag">Localização provisória</div>
          </div>
          <iframe
            title="Mapa provisório da localização da CASA MARX"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-46.676%2C-23.574%2C-46.615%2C-23.533&layer=mapnik"
            loading="lazy"
          />
        </div>
      </section>

      <section className="social-section" id="social">
        <div className="social-kicker">Acompanhe a casa</div>
        <Heading className="social-title">INSTAGRAM</Heading>
        <div className="social-bottom">
          <p>Agenda, leituras, arquivos e bastidores da programação.</p>
          <div>Perfil oficial em breve</div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-top">
          <Heading className="footer-logo">CASA MARX</Heading>
          <div className="footer-circle">CM</div>
        </div>
        <div className="footer-bottom">
          <p>Pensar a sociedade é reconhecer que ela pode ser outra.</p>
          <div>Projeto cultural e editorial</div>
          <a href={`${import.meta.env.BASE_URL}marx-engels`}>Marx &amp; Engels →</a>
        </div>
      </footer>
    </main>
  );
}
