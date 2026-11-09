import React, {useEffect, useMemo, useState} from "react";
import {createRoot} from "react-dom/client";
import {
  ArrowRight, Bell, Check, ChevronRight, Crown, Flame, History,
  Home, Lock, Menu, Play, Shield, Sparkles, Trophy, Users, X,
  CalendarDays, Newspaper, TrendingUp, CircleDollarSign
} from "lucide-react";
import "./styles.css";

const managers = [
  ["Sir Matt Busby","1945–1969 / 1970–1971","2 European Cups • 5 League titles • FA Cup","busby.jpg"],
  ["Wilf McGuinness","1969–1970","Former player who inherited Busby's side","mcguinness.jpg"],
  ["Frank O'Farrell","1971–1972","One-season tenure in a transitional era","ofarrell.jpg"],
  ["Tommy Docherty","1972–1977","Rebuilt United and won the FA Cup","docherty.jpg"],
  ["Dave Sexton","1977–1981","Four seasons of competitive rebuild","sexton.jpg"],
  ["Ron Atkinson","1981–1986","Two FA Cups and an attacking identity","atkinson.jpg"],
  ["Sir Alex Ferguson","1986–2013","13 Premier League titles • 2 Champions Leagues","ferguson.jpg"],
  ["David Moyes","2013–2014","Took charge after Ferguson","moyes.jpg"],
  ["Louis van Gaal","2014–2016","FA Cup winner in 2016","vangaal.jpg"],
  ["José Mourinho","2016–2018","Europa League • League Cup • Community Shield","mourinho.jpg"],
  ["Ole Gunnar Solskjær","2018–2021","Former United striker; reached the 2021 Europa League final","solskjaer.jpg"],
  ["Erik ten Hag","2022–2024","League Cup winner in 2023; FA Cup winner in 2024","tenhag.jpg"],
  ["Ruben Amorim","2024–2026","Portuguese coach during a major rebuild","amorim.jpg"],
  ["Michael Carrick","2026–present","Current head coach in this demo dataset","carrick.jpg"]
];

const penalties = [
  ["01","The Pressure Cooker","Historic penalty moment — add your licensed MP4","penalty-01.mp4"],
  ["02","Old Trafford Roar","Classic spot-kick atmosphere — add your licensed MP4","penalty-02.mp4"],
  ["03","The Decider","Big-match penalty — add your licensed MP4","penalty-03.mp4"],
  ["04","Ice in His Veins","Clinical finish from twelve yards — add your licensed MP4","penalty-04.mp4"],
  ["05","European Night","European knockout penalty — add your licensed MP4","penalty-05.mp4"],
  ["06","The Comeback","Penalty during a famous comeback — add your licensed MP4","penalty-06.mp4"],
  ["07","Captain's Moment","Captain steps up — add your licensed MP4","penalty-07.mp4"],
  ["08","Cup Night","Cup-tie pressure penalty — add your licensed MP4","penalty-08.mp4"],
  ["09","One More Chance","Late-game spot kick — add your licensed MP4","penalty-09.mp4"],
  ["10","The Perfect Finish","Fan-voted style finale — add your licensed MP4","penalty-10.mp4"]
];

const transfers = [
  ["TRANSFER RADAR","Incoming / outgoing / loan movement","Update this feed from your chosen football-data provider."],
  ["LIVE DEAL ROOM","Negotiations & rumours","Use verified sources before publishing rumours as fact."],
  ["SQUAD WATCH","Contract and squad changes","Keep contract details sourced and timestamped."]
];

function App(){
  const [page,setPage] = useState("home");
  const [menu,setMenu] = useState(false);
  const [member,setMember] = useState(()=>localStorage.getItem("redLegacyMember")==="1");
  const [toast,setToast] = useState("");

  const navigate = (p)=>{
    setPage(p); setMenu(false); window.scrollTo({top:0, behavior:"smooth"});
  };
  const activate = ()=>{
    localStorage.setItem("redLegacyMember","1");
    setMember(true);
    setToast("VIP demo membership unlocked on this device.");
    setTimeout(()=>setToast(""),2600);
  };

  return <div className="app">
    <header className="topbar">
      <div className="brand" onClick={()=>navigate("home")}>
        <div className="brand-mark">RL</div>
        <div><strong>RED LEGACY</strong><span>MUFC FAN EXPERIENCE</span></div>
      </div>
      <nav className={menu?"nav open":"nav"}>
        {[
          ["home","Home"],["clips","Top 10 Clips"],["history","History"],["managers","Managers"],
          ["rise","Rise & Fall"],["membership","VIP Membership"],["updates","Team Updates"],["live","Live"]
        ].map(([id,label])=><button className={page===id?"active":""} onClick={()=>navigate(id)} key={id}>{label}</button>)}
      </nav>
      <div className="header-actions">
        <button className="icon-btn" aria-label="notifications"><Bell size={19}/></button>
        <button className="vip-mini" onClick={()=>navigate("membership")}><Crown size={16}/> {member?"VIP ACTIVE":"JOIN VIP"}</button>
        <button className="mobile-menu" onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button>
      </div>
    </header>

    <main>
      {page==="home" && <Home navigate={navigate} member={member}/>}
      {page==="clips" && <Clips/>}
      {page==="history" && <HistoryPage/>}
      {page==="managers" && <Managers/>}
      {page==="rise" && <RiseFall/>}
      {page==="membership" && <Membership member={member} activate={activate}/>}
      {page==="updates" && <Updates member={member}/>}
      {page==="live" && <Live member={member}/>}
    </main>

    <footer>
      <div className="footer-inner">
        <div><div className="brand"><div className="brand-mark">RL</div><div><strong>RED LEGACY</strong><span>UNOFFICIAL FAN PROJECT</span></div></div><p>Built for supporters who live for the badge, the noise and the next ninety minutes.</p></div>
        <div><h4>Explore</h4><button onClick={()=>navigate("history")}>History</button><button onClick={()=>navigate("clips")}>Clips</button><button onClick={()=>navigate("managers")}>Managers</button></div>
        <div><h4>Premium</h4><button onClick={()=>navigate("membership")}>VIP Membership</button><button onClick={()=>navigate("live")}>Live Match Hub</button><button onClick={()=>navigate("updates")}>Team Updates</button></div>
      </div>
      <div className="footer-bottom">© 2026 Red Legacy. Unofficial, independent fan project. Not affiliated with Manchester United Football Club.</div>
    </footer>
    {toast && <div className="toast"><Check size={18}/>{toast}</div>}
  </div>
}

function Home({navigate, member}){
  return <section>
    <div className="hero">
      <div className="hero-glow"></div>
      <div className="hero-copy">
        <div className="eyebrow"><Flame size={16}/> THE REDS. THE LEGACY. THE INNER CIRCLE.</div>
        <h1>MORE THAN A CLUB.<br/><em>A LIFETIME.</em></h1>
        <p>A premium, fan-first digital home for Manchester United supporters — history, iconic moments, squad intelligence and an exclusive VIP layer.</p>
        <div className="hero-buttons">
          <button className="primary" onClick={()=>navigate("membership")}><Crown size={18}/> {member?"ENTER VIP":"ENTER THE VIP CLUB"} <ArrowRight size={18}/></button>
          <button className="secondary" onClick={()=>navigate("clips")}><Play size={17}/> WATCH THE TOP 10</button>
        </div>
        <div className="trust-row"><span><Shield size={15}/> Fan-first</span><span><Lock size={15}/> VIP-ready</span><span><Sparkles size={15}/> Built for red</span></div>
      </div>
      <div className="hero-card">
        <div className="stadium-orb"><div className="crest">MU</div></div>
        <div className="scoreline"><span>RED LEGACY</span><strong>1878</strong><small>FOREVER RED</small></div>
      </div>
    </div>

    <section className="ticker"><span>BREAKING</span><p>VIP members get the daily United briefing, squad movement tracker and matchday command centre.</p><ChevronRight/></section>

    <section className="section">
      <div className="section-head"><div><span className="kicker">THE INNER CIRCLE</span><h2>Built like a premium club.</h2></div><button className="text-link" onClick={()=>navigate("membership")}>See membership <ArrowRight size={16}/></button></div>
      <div className="feature-grid">
        <Feature icon={<Play/>} title="Top 10 Penalties" text="A dedicated cinematic clip room with HTML5 video players for your licensed match footage." onClick={()=>navigate("clips")}/>
        <Feature icon={<History/>} title="The Full Story" text="A visual timeline through triumph, transition, dominance, decline and rebuild." onClick={()=>navigate("rise")}/>
        <Feature icon={<Crown/>} title="VIP Matchday" text="A premium dashboard for member-only updates, match hubs and squad intelligence." onClick={()=>navigate("membership")}/>
      </div>
    </section>

    <section className="dark-band">
      <div className="section-head"><div><span className="kicker">UNITED THROUGH TIME</span><h2>Every era leaves a mark.</h2></div><button className="text-link light" onClick={()=>navigate("managers")}>Meet the managers <ArrowRight size={16}/></button></div>
      <div className="era-strip">
        <Era year="1945" title="Busby" text="Rebuilding and European glory"/>
        <Era year="1986" title="Ferguson" text="The foundation of a dynasty"/>
        <Era year="1999" title="Treble" text="A season that changed football"/>
        <Era year="2013" title="After the King" text="A search for the next era"/>
        <Era year="2026" title="Carrick" text="A new chapter begins"/>
      </div>
    </section>
  </section>
}

function Feature({icon,title,text,onClick}){return <button className="feature-card" onClick={onClick}><div className="feature-icon">{icon}</div><h3>{title}</h3><p>{text}</p><span>Explore <ArrowRight size={15}/></span></button>}
function Era({year,title,text}){return <div className="era"><strong>{year}</strong><h3>{title}</h3><p>{text}</p></div>}

function PageHero({kicker,title,text}){return <div className="page-hero"><div><span className="kicker">{kicker}</span><h1>{title}</h1><p>{text}</p></div><div className="hero-seal">RL</div></div>}

function Clips(){
  const [selected,setSelected]=useState(0);
  return <section>
    <PageHero kicker="THE CLIP ROOM" title="Top 10 penalties." text="A dedicated, full-screen-ready clip experience. Drop your licensed MP4 files into public/videos and they will play directly on this page — no YouTube redirects."/>
    <div className="notice"><Lock size={18}/><div><strong>Video rights matter.</strong><p>This starter ships without copyrighted match footage. Only upload footage you own or have licensed for this site.</p></div></div>
    <div className="clip-layout">
      <div className="player">
        <video key={penalties[selected][3]} controls playsInline poster="/media/clip-poster.svg">
          <source src={"/videos/"+penalties[selected][3]} type="video/mp4"/>
          Your browser does not support HTML5 video.
        </video>
        <div className="player-meta"><span>CLIP {penalties[selected][0]}</span><h2>{penalties[selected][1]}</h2><p>{penalties[selected][2]}</p></div>
      </div>
      <div className="clip-list">
        {penalties.map((p,i)=><button className={selected===i?"clip-row selected":"clip-row"} onClick={()=>setSelected(i)} key={p[0]}>
          <span className="num">{p[0]}</span><span><strong>{p[1]}</strong><small>{p[2]}</small></span><Play size={16}/>
        </button>)}
      </div>
    </div>
  </section>
}

function HistoryPage(){
  const milestones=[
    ["1878","Origins","Founded as Newton Heath LYR before becoming Manchester United."],
    ["1908","First League title","United's early breakthrough established the club as a major force."],
    ["1945","The Busby era","A transformative rebuild set the foundations for modern United."],
    ["1958","Munich","A devastating tragedy shaped the club's identity and resilience."],
    ["1968","European champions","United became the first English club to win the European Cup."],
    ["1993","Premier League","The first Premier League title of the modern dynasty."],
    ["1999","The Treble","Premier League, FA Cup and Champions League in one extraordinary season."],
    ["2008","European peak","Another Champions League triumph, plus the Premier League."],
    ["2013","A changing era","Sir Alex Ferguson's retirement began a period of transition."],
    ["2026","New chapter","The club enters another rebuild with Michael Carrick at the helm in this site dataset."]
  ];
  return <section><PageHero kicker="THE ARCHIVE" title="The story never stops." text="A visual history designed to make the rise, peak, fall and rebuild of United feel like one continuous story."/>
    <div className="timeline">{milestones.map((m,i)=><div className="timeline-item" key={m[0]}><div className="timeline-dot"></div><div className="timeline-year">{m[0]}</div><div className="timeline-card"><span>ERA {String(i+1).padStart(2,"0")}</span><h3>{m[1]}</h3><p>{m[2]}</p></div></div>)}</div>
  </section>
}

function Managers(){
  return <section><PageHero kicker="THE DUGOUT" title="Every manager. Every era." text="A manager wall built for browsing — from Busby to Ferguson and through the modern rebuild. Add licensed portraits to public/managers/ to replace the generated placeholders."/>
    <div className="manager-grid">{managers.map((m,i)=><article className="manager-card" key={m[0]}>
      <div className="manager-photo"><img src={"/managers/"+m[3]} onError={(e)=>{e.currentTarget.src="/media/manager-placeholder.svg"}} alt={m[0]}/><span>{String(i+1).padStart(2,"0")}</span></div>
      <div className="manager-info"><span>{m[1]}</span><h3>{m[0]}</h3><p>{m[2]}</p></div>
    </article>)}</div>
  </section>
}

function RiseFall(){
  const phases=[
    ["01","The rebuild","1945–1968","Busby's Manchester United rises from reconstruction to European champions.","rise"],
    ["02","The dynasty","1986–2013","Ferguson's reign turns United into a global football superpower.","peak"],
    ["03","The fall","2013–2021","Success becomes harder to sustain as managers, recruitment and identity change.","fall"],
    ["04","The rebuild","2022–present","A new cycle: structure, recruitment, youth and a search for the next defining era.","rebuild"]
  ];
  return <section><PageHero kicker="RISE / FALL / RISE" title="The mountain has never been flat." text="A premium editorial view of the club's changing eras — built for long-form storytelling, data and fan debate."/>
    <div className="rise-grid">{phases.map(p=><article className={"rise-card "+p[4]} key={p[0]}><div className="rise-number">{p[0]}</div><span>{p[2]}</span><h2>{p[1]}</h2><p>{p[3]}</p><div className="rise-line"></div></article>)}</div>
    <div className="quote-band"><Sparkles/><div><strong>"The badge is bigger than any one era."</strong><p>Use this section for your own editorial, supporter stories and season-by-season data.</p></div></div>
  </section>
}

function Membership({member,activate}){
  return <section><PageHero kicker="THE RED LEGACY INNER CIRCLE" title="VIP is where the real matchday begins." text="A premium subscription layer for supporters who want the daily United briefing, squad movement, member-only analysis and a dedicated matchday command centre."/>
    <div className="pricing">
      <div className="price-card featured"><div className="price-top"><span>MOST POPULAR</span><Crown/></div><h2>RED LEGACY VIP</h2><div className="price">£9.99 <small>/ month</small></div><p>Demo pricing — connect Stripe to make billing live.</p>
        <ul>{["Daily team briefing","Transfers: bought, sold & loaned","Member-only squad intelligence","Matchday command centre","Premium history & manager archive","VIP polls and supporter drops"].map(x=><li key={x}><Check size={17}/>{x}</li>)}</ul>
        <button className="primary wide" onClick={activate}>{member?"VIP ACTIVE — ENTER DASHBOARD":"ACTIVATE VIP DEMO"} <ArrowRight size={18}/></button>
      </div>
      <div className="vip-dashboard"><span className="kicker">MEMBER PREVIEW</span><h2>Tonight's command centre.</h2><div className="dash-grid">
        <Dash icon={<Newspaper/>} label="Daily Briefing" value="07:30" note="Next update"/>
        <Dash icon={<TrendingUp/>} label="Transfer Radar" value="LIVE" note="3 tracked moves"/>
        <Dash icon={<CalendarDays/>} label="Next Match" value="22 NOV" note="Liverpool · Away"/>
        <Dash icon={<Shield/>} label="Squad Watch" value="24/28" note="Players tracked"/>
      </div><div className="member-lock"><Lock/><div><strong>{member?"VIP access unlocked":"VIP members only"}</strong><p>{member?"This demo dashboard is unlocked on this browser.":"Activate the demo above to preview the protected experience."}</p></div></div></div>
    </div>
  </section>
}
function Dash({icon,label,value,note}){return <div className="dash"><div>{icon}</div><span>{label}</span><strong>{value}</strong><small>{note}</small></div>}

function Updates({member}){
  return <section><PageHero kicker="TEAM INTELLIGENCE" title="Know before the timeline does." text="A clean home for verified squad news, transfers, loans, contracts and daily briefings. Connect a football-data/news provider for automatic updates."/>
    <div className="update-grid">{transfers.map((t,i)=><article className="update-card" key={t[0]}><div className="update-icon">{i===0?<TrendingUp/>:i===1?<CircleDollarSign/>:<Users/>}</div><span>{t[0]}</span><h2>{t[1]}</h2><p>{t[2]}</p><button className="text-link">Open feed <ArrowRight size={16}/></button></article>)}</div>
    <div className="source-panel"><Newspaper/><div><strong>Recommended architecture</strong><p>Use a server-side API route to fetch news/transfer data, cache it, timestamp every item and show a source link. Never expose provider API keys in the browser.</p></div></div>
  </section>
}

function Live({member}){
  return <section><PageHero kicker="MATCHDAY COMMAND CENTRE" title="Live. Loud. United." text="The interface is ready for live match data and licensed video. Broadcasting rights must be secured before streaming men's competitive matches."/>
    <div className="live-shell"><div className="live-score"><span>PREMIER LEAGUE</span><strong>MAN UTD</strong><div className="vs">VS</div><strong>LIVERPOOL</strong><small>22 NOV · ANFIELD</small></div>
      <div className="live-video"><div className="live-lock"><div><Lock size={28}/></div><h2>Licensed live stream</h2><p>Connect your licensed stream URL or video service here. The page intentionally does not pirate or proxy a broadcast.</p><button className="secondary">{member?"VIP STREAM AREA":"VIP MEMBERS ONLY"} <ArrowRight size={17}/></button></div></div>
      <div className="match-tabs"><button className="active">MATCH</button><button>COMMENTARY</button><button>LINEUP</button><button>STATS</button></div>
    </div>
  </section>
}

function AppMount(){createRoot(document.getElementById("root")).render(<App/>)} AppMount();