import React, { useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const BRAND = 'DICAS93TV'
const INSTAGRAM = '@dicas93tv'

const competitions = [  { name: 'Liga dos Campeões da CAF', country: 'África', teams: ['Al-Ahly','Zamalek','Wydad Casablanca','Raja Casablanca','Esperance Tunis','Mamelodi Sundowns','TP Mazembe','Simba SC','Young Africans','CR Belouizdad','Orlando Pirates','Pyramids FC'] },
  { name: 'Liga dos Campeões da AFC', country: 'Ásia', teams: ['Al-Hilal','Al-Nassr','Al-Ittihad','Al-Ahli','Urawa Reds','Vissel Kobe','Yokohama F. Marinos','Ulsan Hyundai','Jeonbuk Hyundai Motors','Shanghai Port','Al-Ain','Al-Sadd','Persepolis','Esteghlal'] },
  { name: 'Bundesliga', country: 'Áustria', teams: ['Bayern München','Borussia Dortmund','Bayer Leverkusen','RB Leipzig','Eintracht Frankfurt','Stuttgart','Wolfsburg','Freiburg','Mainz','Augsburg','Werder Bremen','Borussia Mönchengladbach','Union Berlin','Hoffenheim','Heidenheim','St. Pauli','Hamburgo','Colônia'] },
  { name: 'Bundesliga', country: 'Alemanha', teams: ['Bayern München','Borussia Dortmund','Bayer Leverkusen','RB Leipzig','Eintracht Frankfurt','Stuttgart','Wolfsburg','Freiburg','Mainz','Augsburg','Werder Bremen','Borussia Mönchengladbach','Union Berlin','Hoffenheim','Heidenheim','St. Pauli','Hamburgo','Colônia'] },
  { name: 'Copa Libertadores', country: 'América do Sul', teams: ['Flamengo','Palmeiras','São Paulo','Botafogo','River Plate','Boca Juniors','Racing','Estudiantes','Peñarol','Nacional','Colo-Colo','Universidad de Chile','Bolívar','The Strongest','Olimpia','Cerro Porteño','Atlético Nacional','Independiente del Valle','LDU Quito','Barcelona SC'] },
  { name: 'Copa Sul-Americana', country: 'América do Sul', teams: ['Vasco da Gama','Cruzeiro','Corinthians','Bahia','Lanús','Defensa y Justicia','San Lorenzo','Independiente','Universidad Católica','Colo-Colo','Olimpia','Cerro Porteño','LDU Quito','Barcelona SC','Deportivo Cali','Atlético Nacional','Blooming','Carabobo','Melgar','Sporting Cristal'] },
  { name: 'Liga Profissional Saudita', country: 'Arábia Saudita', teams: ['Al-Hilal','Al-Nassr','Al-Ittihad','Al-Ahli','Al-Shabab','Al-Ettifaq','Al-Taawoun','Al-Fateh','Al-Riyadh','Al-Qadsiah','Al-Wehda','Al-Khaleej'] },
  { name: 'Brasileirão Betano', country: 'Brasil', teams: ['Flamengo','Palmeiras','Corinthians','São Paulo','Santos','Vasco da Gama','Botafogo','Fluminense','Cruzeiro','Atlético-MG','Grêmio','Internacional','Bahia','Fortaleza','Ceará','Sport','Vitória','Mirassol','Bragantino','Juventude'] },
  { name: 'Brasileirão Série B', country: 'Brasil', teams: ['Athletico-PR','Coritiba','Goiás','Vila Nova','Avaí','Chapecoense','Criciúma','Cuiabá','Remo','Paysandu','CRB','CSA','Novorizontino','Operário','América-MG','Atlético-GO','Botafogo-SP','Ferroviária','Volta Redonda','Amazonas'] },
  { name: 'Série C', country: 'Brasil', teams: ['Náutico','Paysandu','Remo','Figueirense','Londrina','São Bernardo','Botafogo-PB','CSA','Confiança','Ypiranga-RS','ABC','Volta Redonda'] },
  { name: 'Série D', country: 'Brasil', teams: ['Retrô','Portuguesa-RJ','Treze','Manaus','Maringá','Itabaiana','Brasiliense','Anápolis','Cianorte','Inter de Limeira'] },
  { name: 'Carioca Superbet', country: 'Brasil', teams: ['Flamengo','Fluminense','Vasco da Gama','Botafogo','Boavista','Madureira','Volta Redonda','Portuguesa-RJ','Bangu','Nova Iguaçu'] },
  { name: 'Gauchão Superbet', country: 'Brasil', teams: ['Grêmio','Internacional','Juventude','Brasil de Pelotas','Caxias','São José-RS','Novo Hamburgo','Ypiranga-RS'] },
  { name: 'Mineiro', country: 'Brasil', teams: ['Atlético-MG','Cruzeiro','América-MG','Tombense','Villa Nova-MG','Democrata-GV','Athletic Club','Pouso Alegre'] },
  { name: 'Paulista', country: 'Brasil', teams: ['Corinthians','Palmeiras','São Paulo','Santos','Bragantino','Ponte Preta','Guarani','Mirassol','Ituano','Ferroviária','São Bernardo FC','Novorizontino'] },
  { name: 'Copa Betano do Brasil', country: 'Brasil', teams: ['Flamengo','Palmeiras','Corinthians','São Paulo','Santos','Vasco da Gama','Botafogo','Fluminense','Cruzeiro','Atlético-MG','Grêmio','Internacional','Bahia','Fortaleza','Athletico-PR','Coritiba','Sport','Ceará','Vitória','Juventude'] },
  { name: 'Premier League', country: 'Egito', teams: ['Arsenal','Aston Villa','Bournemouth','Brentford','Brighton','Chelsea','Crystal Palace','Everton','Fulham','Liverpool','Manchester City','Manchester United','Newcastle','Nottingham Forest','Tottenham','West Ham','Wolves','Leeds United','Burnley','Sunderland'] },
  { name: 'LaLiga', country: 'Espanha', teams: ['Real Madrid','Barcelona','Atlético de Madrid','Athletic Club','Real Sociedad','Villarreal','Valencia','Sevilla','Betis','Celta de Vigo','Osasuna','Getafe','Mallorca','Girona','Espanyol','Alavés','Rayo Vallecano','Levante','Elche','Oviedo'] },
  { name: 'LaLiga2', country: 'Espanha', teams: ['Valladolid','Eibar','Leganés','Sporting Gijón','Zaragoza','Levante','Racing Santander','Tenerife','Burgos','Almería'] },
  { name: 'MLS', country: 'EUA', teams: ['Inter Miami','LA Galaxy','Los Angeles FC','New York City FC','New York Red Bulls','Atlanta United','Orlando City','Columbus Crew','Seattle Sounders','Portland Timbers','Chicago Fire','FC Dallas','Austin FC','Nashville SC','Toronto FC','Vancouver Whitecaps'] },
  { name: 'Liga dos Campeões', country: 'Europa', teams: ['Real Madrid','Barcelona','Atlético de Madrid','Arsenal','Chelsea','Liverpool','Manchester City','PSG','Bayern München','Borussia Dortmund','Inter de Milão','Milan','Juventus','Napoli','Benfica','Porto','Sporting','Ajax','PSV','Celtic'] },
  { name: 'Liga Europa', country: 'Europa', teams: ['Manchester United','Tottenham','Roma','Lazio','Milan','Porto','Benfica','Sporting','Ajax','PSV','Fenerbahçe','Galatasaray','Olympiacos','Rangers','Celtic','Sevilla','Betis','Lyon','Marseille','Frankfurt'] },
  { name: 'Liga Conferência', country: 'Europa', teams: ['Chelsea','Crystal Palace','Fiorentina','Betis','Lille','Nice','Copenhagen','Gent','AZ Alkmaar','Rapid Wien','Legia Warszawa','Partizan','Hearts','Molde','Djurgården','Shakhtar Donetsk'] },
  { name: 'Ligue 1', country: 'França', teams: ['PSG','Marseille','Lyon','Monaco','Lille','Nice','Rennes','Lens','Strasbourg','Nantes','Toulouse','Montpellier','Brest','Auxerre','Angers','Le Havre','Metz','Paris FC'] },
  { name: 'Premier League', country: 'Inglaterra', teams: ['Arsenal','Aston Villa','Bournemouth','Brentford','Brighton','Chelsea','Crystal Palace','Everton','Fulham','Liverpool','Manchester City','Manchester United','Newcastle','Nottingham Forest','Tottenham','West Ham','Wolves','Leeds United','Burnley','Sunderland'] },
  { name: 'Championship', country: 'Inglaterra', teams: ['Leicester City','Southampton','Ipswich Town','Norwich City','West Brom','Middlesbrough','Watford','Hull City','Swansea City','Stoke City'] },
  { name: 'Championship', country: 'Irlanda do Norte', teams: ['Leicester City','Southampton','Ipswich Town','Norwich City','West Brom','Middlesbrough','Watford','Hull City','Swansea City','Stoke City'] },
  { name: 'Serie A', country: 'Itália', teams: ['Inter de Milão','Milan','Juventus','Napoli','Roma','Lazio','Atalanta','Fiorentina','Bologna','Torino','Genoa','Udinese','Sassuolo','Parma','Cagliari','Lecce','Verona','Como','Cremonese','Pisa'] },
  { name: 'Serie B', country: 'Itália', teams: ['Palermo','Sampdoria','Bari','Parma','Venezia','Cremonese','Pisa','Brescia','Modena','Catanzaro'] },
  { name: 'Liga MX', country: 'México', teams: ['América','Chivas','Cruz Azul','Pumas','Tigres','Monterrey','Toluca','Pachuca','León','Santos Laguna','Atlas','Tijuana','Necaxa','Puebla','Querétaro','Juárez','Mazatlán','Atlético San Luis'] },
  { name: 'Copa do Mundo', country: 'Mundo', teams: ['México','África do Sul','Coreia do Sul','Tchéquia','Canadá','Bósnia e Herzegovina','Catar','Suíça','Brasil','Marrocos','Haiti','Escócia','Estados Unidos','Paraguai','Austrália','Turquia','Alemanha','Curaçao','Costa do Marfim','Equador','Holanda','Japão','Suécia','Tunísia','Bélgica','Egito','Irã','Nova Zelândia','Espanha','Cabo Verde','Arábia Saudita','Uruguai','França','Senegal','Iraque','Noruega','Argentina','Argélia','Áustria','Jordânia','Portugal','RD Congo','Uzbequistão','Colômbia','Inglaterra','Croácia','Gana','Panamá'] },
  { name: 'Premier League', country: 'País de Gales', teams: ['Arsenal','Aston Villa','Bournemouth','Brentford','Brighton','Chelsea','Crystal Palace','Everton','Fulham','Liverpool','Manchester City','Manchester United','Newcastle','Nottingham Forest','Tottenham','West Ham','Wolves','Leeds United','Burnley','Sunderland'] },
  { name: 'Liga Portugal', country: 'Portugal', teams: ['Benfica','Porto','Sporting','Braga','Vitória SC','Boavista','Casa Pia','Estoril','Famalicão','Gil Vicente','Moreirense','Nacional','Rio Ave','Santa Clara','Arouca','Tondela','Alverca','Estrela Amadora'] },
  { name: 'Premier League', country: 'Rússia', teams: ['Arsenal','Aston Villa','Bournemouth','Brentford','Brighton','Chelsea','Crystal Palace','Everton','Fulham','Liverpool','Manchester City','Manchester United','Newcastle','Nottingham Forest','Tottenham','West Ham','Wolves','Leeds United','Burnley','Sunderland'] },
  { name: 'Premier League', country: 'Ucrânia', teams: ['Arsenal','Aston Villa','Bournemouth','Brentford','Brighton','Chelsea','Crystal Palace','Everton','Fulham','Liverpool','Manchester City','Manchester United','Newcastle','Nottingham Forest','Tottenham','West Ham','Wolves','Leeds United','Burnley','Sunderland'] },]

const roundOptions = [
  'Deixar em branco',
  'Sem rodada/fase',
  ...Array.from({ length: 38 }, (_, i) => `${i + 1}ª Rodada`),
  'Fase de liga','Temporada regular','Abertura','Clausura','Playoffs','Final','Disputa de 3º lugar',
  'Oitavas de final','Oitavas de final - Ida','Oitavas de final - Volta',
  'Quartas de final','Quartas de final - Ida','Quartas de final - Volta',
  'Semifinal','Semifinal - Ida','Semifinal - Volta',
  'Grupo A - 1ª R','Grupo A - 2ª R','Grupo A - 3ª R','Grupo A - 4ª R','Grupo A - 5ª R','Grupo A - 6ª R',
  'Grupo B - 1ª R','Grupo B - 2ª R','Grupo B - 3ª R','Grupo B - 4ª R','Grupo B - 5ª R','Grupo B - 6ª R',
  'Grupo C - 1ª R','Grupo C - 2ª R','Grupo C - 3ª R','Grupo C - 4ª R','Grupo C - 5ª R','Grupo C - 6ª R',
  'Grupo D - 1ª R','Grupo D - 2ª R','Grupo D - 3ª R','Grupo D - 4ª R','Grupo D - 5ª R','Grupo D - 6ª R',
  'Grupo E - 1ª R','Grupo F - 1ª R','Grupo G - 1ª R','Grupo H - 1ª R'
]

const channels = ['Deixar em branco','Sem transmissão','A definir','Globo','SporTV','SporTV 2','Premiere','ESPN','ESPN 2','ESPN 3','ESPN 4','Disney+','Paramount+','YouTube','YouTube (CazéTV)','YT (CazéTV)','CazéTV','SportyNet','YT SportyNet','Globoplay (GE TV)','NSports','GOAT','YouTube (GOAT)','Xports','Band','Record','SBT','Prime Video','DAZN','TNT Sports','Apple TV','Max','Canal UOL','Nosso Futebol','TV Brasil','FIFA+','CONMEBOL TV','CBF TV','FPF TV','Paulistão Play','UOL Play','OneFootball','Pluto TV','Twitch','Facebook','Fox Sports','Telemundo','Univision','TUDN','beIN Sports','Sky Sports','BBC','ITV','Viaplay','Canal+','Movistar+','Movistar LaLiga','Movistar Liga de Campeões','LaLiga TV','Sport TV','Eleven Sports','RTP','SIC','TVI','Rai Sport','Mediaset','ARD','ZDF','Optus Sport']
const globalTeamOptions = ['Flamengo','Palmeiras','Corinthians','São Paulo','Santos','Vasco da Gama','Botafogo','Fluminense','Cruzeiro','Atlético-MG','Grêmio','Internacional','Bahia','Fortaleza','Ceará','Sport','Vitória','Athletico-PR','Coritiba','Goiás','Bragantino','Juventude','Mirassol','América-MG','Atlético-GO','Remo','Paysandu','CRB','CSA','Náutico','Santa Cruz','Real Madrid','Barcelona','Atlético de Madrid','Athletic Club','Real Sociedad','Villarreal','Valencia','Sevilla','Betis','Girona','Manchester City','Manchester United','Liverpool','Arsenal','Chelsea','Tottenham','Newcastle','Aston Villa','Everton','West Ham','Leeds United','Bayern München','Borussia Dortmund','Bayer Leverkusen','RB Leipzig','Eintracht Frankfurt','Stuttgart','Wolfsburg','Paris Saint-Germain','Marseille','Lyon','Monaco','Lille','Nice','Rennes','Inter de Milão','Milan','Juventus','Napoli','Roma','Lazio','Atalanta','Fiorentina','Bologna','Torino','Benfica','Porto','Sporting','Braga','Vitória SC','Ajax','PSV','Feyenoord','Celtic','Rangers','River Plate','Boca Juniors','Racing','Independiente','San Lorenzo','Estudiantes','Peñarol','Nacional','Colo-Colo','Universidad de Chile','Olimpia','Cerro Porteño','Libertad','LDU Quito','Barcelona SC','Independiente del Valle','Atlético Nacional','Millonarios','América','Chivas','Cruz Azul','Pumas','Tigres','Monterrey','Toluca','Pachuca','León','Inter Miami','LA Galaxy','Los Angeles FC','New York City FC','Seattle Sounders','Atlanta United','Al-Hilal','Al-Nassr','Al-Ittihad','Al-Ahli','Al-Ain','Al-Sadd','Urawa Reds','Vissel Kobe','Yokohama F. Marinos','Ulsan Hyundai','Jeonbuk Hyundai Motors Motors','Al-Ahly','Zamalek','Wydad Casablanca','Raja Casablanca','Esperance Tunis','Mamelodi Sundowns','Pyramids FC','Brasil','Argentina','Uruguai','Colômbia','Chile','Paraguai','México','Estados Unidos','Canadá','Inglaterra','França','Espanha','Portugal','Alemanha','Itália','Holanda','Bélgica','Croácia','Marrocos','Japão','Coreia do Sul','Austrália','Egito','Senegal','Gana']
const timeOptions = Array.from({ length: 24 * 12 }, (_, i) => `${String(Math.floor(i / 12)).padStart(2, '0')}h${String((i % 12) * 5).padStart(2, '0')}`)
const oddsOptions = ['—', ...Array.from({ length: Math.round((15 - 1.1) / 0.05) + 1 }, (_, i) => (1.1 + i * 0.05).toFixed(2))]

function todayISO(){ return new Date().toISOString().slice(0,10) }
function uid(){ return Math.random().toString(36).slice(2) + Date.now().toString(36) }
function norm(v){ return String(v || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim() }

function isBlankRound(value) {
  const v = norm(value)
  return !v || v === 'deixar em branco' || v === 'sem rodada/fase' || v === 'sem rodada' || v === 'sem fase'
}

function displayRound(value) {
  return isBlankRound(value) ? '' : String(value || '').trim()
}

function cleanRoundValue(value) {
  const v = norm(value)
  if (!v || v === 'deixar em branco' || v === 'sem rodada/fase' || v === 'sem rodada' || v === 'sem fase') return 'Deixar em branco'
  return value
}

function normalizeChannelNameForSave(value) {
  const raw = String(value || '').trim()
  const n = norm(raw)
  if (n === 'xsports' || n === 'x sports' || n === 'xport' || n === 'xports') return 'Xports'
  return raw
}

function cleanChannelValue(value) {
  const v = norm(value)
  if (v === 'deixar em branco') return 'Deixar em branco'
  const raw = String(value || '').trim()
  if (!raw) return raw

  const parts = raw
    .split(/\s*(?:\/|,|\be\b)\s*/i)
    .map(v => v.trim())
    .filter(Boolean)

  if (parts.length <= 1) return raw

  const unique = []
  const seen = new Set()
  for (const part of parts) {
    const key = norm(part)
    if (!seen.has(key)) {
      seen.add(key)
      unique.push(part)
    }
  }
  return unique.join(', ')
}

function displayChannel(value) {
  const v = norm(value)
  if (!v || v === 'deixar em branco') return ''
  return String(value || '').trim()
}







function countryFlag(country){
  const flags = {
    'África': '🌍', 'África do Sul': '🇿🇦', 'Ásia': '🌏', 'Áustria': '🇦🇹', 'Alemanha': '🇩🇪',
    'América do Norte e Central': '🌎', 'América do Sul': '🌎', 'Arábia Saudita': '🇸🇦', 'Argentina': '🇦🇷',
    'Bélgica': '🇧🇪', 'Bolívia': '🇧🇴', 'Brasil': '🇧🇷', 'Bulgária': '🇧🇬', 'Chile': '🇨🇱', 'China': '🇨🇳',
    'Colômbia': '🇨🇴', 'Croácia': '🇭🇷', 'Dinamarca': '🇩🇰', 'Egito': '🇪🇬', 'Equador': '🇪🇨', 'Escócia': '🏴',
    'Espanha': '🇪🇸', 'EUA': '🇺🇸', 'Estados Unidos': '🇺🇸', 'Europa': '🇪🇺', 'França': '🇫🇷', 'Grécia': '🇬🇷',
    'Inglaterra': '🏴', 'Irlanda do Norte': '🇬🇧', 'Itália': '🇮🇹', 'Marrocos': '🇲🇦', 'México': '🇲🇽', 'Mundo': '🌐',
    'Noruega': '🇳🇴', 'País de Gales': '🏴', 'Países Baixos': '🇳🇱', 'Paraguai': '🇵🇾', 'Peru': '🇵🇪', 'Portugal': '🇵🇹',
    'Rússia': '🇷🇺', 'Suécia': '🇸🇪', 'Suíça': '🇨🇭', 'Turquia': '🇹🇷', 'Ucrânia': '🇺🇦', 'Uruguai': '🇺🇾',
    'Venezuela': '🇻🇪', 'Japão': '🇯🇵', 'Coreia do Sul': '🇰🇷', 'FIFA': '🏆'
  }
  return flags[country] || '🏳️'
}

function competitionLabel(game){
  return `${countryFlag(game.country)} ${game.competition || 'Campeonato'}`
}

function parseCompetitionName(value){
  const withoutFlag = String(value || '').replace(/^\S+\s+/, '')
  return withoutFlag.split(' — ')[0]
}

function formatDatePt(dateValue){
  const value = dateValue || todayISO()
  const date = new Date(`${value}T12:00:00`)
  if (Number.isNaN(date.getTime())) return 'DATA NÃO SELECIONADA'
  return new Intl.DateTimeFormat('pt-BR',{ weekday:'long', day:'2-digit', month:'long', year:'numeric' }).format(date).replace('-feira','').toUpperCase()
}

function defaultGame(){
  return { id: uid(), selected: true, time: '19h00', competition: 'Brasileirão Betano', country: 'Brasil', round: 'Deixar em branco', home: 'Flamengo', away: 'Palmeiras', oddHome: '2.10', oddDraw: '3.20', oddAway: '3.40', channel: 'Deixar em branco', status: 'confirmado' }
}

const starterGames = [
  { ...defaultGame(), id: uid(), time:'16h00', competition:'Liga Conferência', country:'Europa', round:'Semifinal - Ida', home:'Shakhtar Donetsk', away:'Crystal Palace', oddHome:'3.75', oddDraw:'3.50', oddAway:'2.00', channel:'YouTube (CazéTV)' },
  { ...defaultGame(), id: uid(), time:'19h00', competition:'Copa Libertadores', country:'América do Sul', round:'Grupo C - 3ª R', home:'Bolívar', away:'Fluminense', oddHome:'1.95', oddDraw:'3.50', oddAway:'3.70', channel:'Paramount+' },
  { ...defaultGame(), id: uid(), time:'19h00', competition:'Copa Sul-Americana', country:'América do Sul', round:'Grupo G - 3ª R', home:'Vasco da Gama', away:'Olimpia', oddHome:'1.85', oddDraw:'3.60', oddAway:'4.00', channel:'Paramount+' },
  { ...defaultGame(), id: uid(), time:'20h00', competition:'Brasileirão Betano', country:'Brasil', round:'15ª Rodada', home:'Flamengo', away:'Palmeiras', oddHome:'2.10', oddDraw:'3.20', oddAway:'3.40', channel:'Globo/Premiere' },
]

function useClickOutside(ref, handler){
  useEffect(() => {
    const onDown = (event) => { if (ref.current && !ref.current.contains(event.target)) handler() }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('touchstart', onDown)
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('touchstart', onDown) }
  }, [ref, handler])
}

function SearchSelect({ label, value, options, onChange, placeholder='Pesquisar...', allowCustom=true, disabled=false, allowBlank=false, blankLabel='Deixar em branco' }){
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const box = useRef(null)
  useClickOutside(box, () => setOpen(false))
  const filtered = useMemo(() => {
    const q = norm(query)
    return options.filter(opt => !q || norm(opt).includes(q)).slice(0, 90)
  }, [options, query])
  function choose(v){ onChange(v === 'Sem rodada/fase' ? '' : v); setQuery(''); setOpen(false) }
  return <div className="field" ref={box}>
    <label>{label}</label>
    <button type="button" className={'selectButton ' + (disabled ? 'disabled':'')} disabled={disabled} onClick={() => setOpen(v => !v)}>
      <span>{value || placeholder}</span><b>⌄</b>
    </button>
    {open && !disabled && <div className="popover">
      <input autoFocus value={query} onChange={e => setQuery(e.target.value)} placeholder={placeholder} className="searchInput" />
      <div className="optionList">
        {allowBlank && <button className="option blankOption" type="button" onClick={() => choose('')}>{blankLabel}</button>}
        {allowCustom && query.trim() && <button className="option custom" type="button" onClick={() => choose(query.trim())}>Usar “{query.trim()}”</button>}
        {filtered.map(opt => <button className="option" type="button" key={opt} onClick={() => choose(opt)}>{opt}</button>)}
        {!filtered.length && !query.trim() && <div className="empty">Nenhuma opção</div>}
      </div>
    </div>}
  </div>
}

function TextInput({ label, value, onChange, placeholder='' }){
  return <div className="field"><label>{label}</label><input className="textInput" value={value} placeholder={placeholder} onChange={e => onChange(e.target.value)} /></div>
}

function DateInput({ label, value, onChange }){
  return <div className="field">
    <label>{label}</label>
    <input
      className="textInput dateInput"
      type="date"
      value={value || todayISO()}
      onChange={e => onChange(e.target.value || todayISO())}
      onClick={e => e.currentTarget.showPicker?.()}
    />
  </div>
}

function CanvasCard({ game }){
  const roundText = displayRound(game.round)
  const channelText = displayChannel(game.channel)
  const channelFontSize = getChannelFontSize(channelText)
  const channelLines = getWrappedChannelLines(channelText, 205, channelFontSize, 4)
  const multiChannel = channelParts(channelText).length > 1

  return <div className="canvasRow">
    <div className="matchBox">
      <div className="timeCell">{game.time || '--h--'}</div>
      <div className="matchMain">
        <div className="leagueLine">
          <span className="leagueName">{competitionLabel(game)}</span>
          {roundText && <span className="roundPill">{roundText}</span>}
        </div>
        <div className="teamsLine"><span>{game.home || 'Mandante'}</span><em>x</em><span>{game.away || 'Visitante'}</span></div>
      </div>
      <div className="oddsCell"><span>{game.oddHome || '—'}</span><span>{game.oddDraw || '—'}</span><span>{game.oddAway || '—'}</span></div>
    </div>
    <div className={`channelBox${multiChannel ? ' multi' : ''}`} style={{ fontSize: `${channelFontSize}px` }}>
      {channelLines.map((line, lineIdx) => (
        <div className="channelLine" key={`line-${lineIdx}`}>
          {line.map((token, idx) => (
            <span key={`${token.text}-${lineIdx}-${idx}`} style={{ color: token.type === 'channel' ? channelColor(token.text) : '#1b0b06' }}>{token.text}</span>
          ))}
        </div>
      ))}
    </div>
  </div>
}

const MAX_PNG_BLOCKS = 10
const CANVAS_W = 1080
const HEADER_BLOCK = 54
const ROW_HEIGHT = 86
const ROW_GAP = 6
const FOOTER_HEIGHT = 46
const CANVAS_BOTTOM_PADDING = 10

function getCanvasHeight() {
  const rows = MAX_PNG_BLOCKS
  return HEADER_BLOCK + rows * ROW_HEIGHT + Math.max(0, rows - 1) * ROW_GAP + FOOTER_HEIGHT + CANVAS_BOTTOM_PADDING
}

function FeedCanvas({ date, games }){
  const visibleRows = games.filter(g => g.selected).slice(0, MAX_PNG_BLOCKS)
  const canvasHeight = getCanvasHeight()
  return <div className="feedCanvas" style={{ height: `${canvasHeight}px` }}>
    <div className="canvasHeader"><div className="dateBadge">{formatDatePt(date)}</div><div className="brandBadge"><span>DICAS93TV</span></div></div>
    <div className="rowsWrap">{visibleRows.map(game => <CanvasCard game={game} key={game.id} />)}</div>
    <div className="canvasFooter"><strong>{BRAND}</strong><span>{INSTAGRAM}</span></div>
  </div>
}

function drawRoundRect(ctx, x, y, w, h, r) {
  const radius = Math.min(r, w / 2, h / 2)
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.lineTo(x + w - radius, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + radius)
  ctx.lineTo(x + w, y + h - radius)
  ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h)
  ctx.lineTo(x + radius, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - radius)
  ctx.lineTo(x, y + radius)
  ctx.quadraticCurveTo(x, y, x + radius, y)
  ctx.closePath()
}

function fillRound(ctx, x, y, w, h, r, fill, stroke = null, lineWidth = 1) {
  drawRoundRect(ctx, x, y, w, h, r)
  ctx.fillStyle = fill
  ctx.fill()
  if (stroke) {
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = stroke
    ctx.stroke()
  }
}

function fitText(ctx, text, maxWidth) {
  const value = String(text || '')
  if (ctx.measureText(value).width <= maxWidth) return value
  let result = value
  while (result.length > 1 && ctx.measureText(result + '…').width > maxWidth) result = result.slice(0, -1)
  return result + '…'
}

function drawCenteredText(ctx, text, x, y, maxWidth, font, color) {
  ctx.font = font
  ctx.fillStyle = color
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(fitText(ctx, text, maxWidth), x, y)
}

function drawLeftText(ctx, text, x, y, maxWidth, font, color) {
  ctx.font = font
  ctx.fillStyle = color
  ctx.textAlign = 'left'
  ctx.textBaseline = 'middle'
  ctx.fillText(fitText(ctx, text, maxWidth), x, y)
}


function channelParts(channel) {
  const clean = displayChannel(channel)
  if (!clean) return []

  return clean
    .split(/\s*(?:\/|,|\be\b)\s*/i)
    .map(v => v.trim())
    .filter(Boolean)
}

function channelTokens(channel) {
  const parts = channelParts(channel)
  if (!parts.length) return []

  const tokens = []
  parts.forEach((part, index) => {
    tokens.push({ type: 'channel', text: part })
    if (index < parts.length - 1) tokens.push({ type: 'sep', text: ',\u00A0' })
  })
  return tokens
}

const channelMeasureCanvas = typeof document !== 'undefined' ? document.createElement('canvas') : null

function wrapChannelTokens(tokens, measureText, maxWidth, maxLines = 4) {
  if (!tokens.length) return []

  const groups = []
  for (let i = 0; i < tokens.length; ) {
    const current = [tokens[i]]
    if (i + 1 < tokens.length && tokens[i + 1].type === 'sep') current.push(tokens[i + 1])
    groups.push(current)
    i += current.length
  }

  const lines = []
  let currentLine = []
  let currentWidth = 0

  groups.forEach(group => {
    const groupWidth = group.reduce((sum, token) => sum + measureText(token.text), 0)
    if (!currentLine.length || currentWidth + groupWidth <= maxWidth) {
      currentLine.push(...group)
      currentWidth += groupWidth
      return
    }
    lines.push(currentLine)
    currentLine = [...group]
    currentWidth = groupWidth
  })

  if (currentLine.length) lines.push(currentLine)

  if (lines.length <= maxLines) return lines

  const trimmed = lines.slice(0, maxLines - 1)
  const rest = lines.slice(maxLines - 1).flat()
  trimmed.push(rest)
  return trimmed
}

function getWrappedChannelLines(channel, maxWidth, fontSize, maxLines = 4) {
  const tokens = channelTokens(channel)
  if (!tokens.length) return []
  if (!channelMeasureCanvas) return [tokens]

  const ctx = channelMeasureCanvas.getContext('2d')
  ctx.font = `900 ${fontSize}px Arial, Helvetica, sans-serif`
  return wrapChannelTokens(tokens, text => ctx.measureText(text).width, maxWidth, maxLines)
}

function hasMultipleChannels(channel) {
  return channelParts(channel).length > 1
}

function getChannelFontSize(channel) {
  const value = displayChannel(channel)
  const parts = channelParts(value)
  const renderedLen = parts.join(', ').length

  // Escala visual aproximada 80/100 dentro do retângulo:
  // maior para teste, ainda priorizando encaixe.
  if (!value) return 17
  if (parts.length >= 4 || renderedLen >= 38) return 13
  if (parts.length >= 3 || renderedLen >= 31) return 14
  if (parts.length >= 2 || renderedLen >= 24) return 15
  if (renderedLen >= 17) return 16
  return 17
}

function drawColoredChannelText(ctx, channel, x, y, maxWidth) {
  const tokens = channelTokens(channel)
  if (!tokens.length) return

  let fontSize = getChannelFontSize(channel)
  let lines = []

  while (fontSize > 7) {
    ctx.font = `900 ${fontSize}px Arial, Helvetica, sans-serif`
    lines = wrapChannelTokens(tokens, text => ctx.measureText(text).width, maxWidth, 4)
    if (lines.length <= 4 && lines.every(line => line.reduce((sum, token) => sum + ctx.measureText(token.text).width, 0) <= maxWidth)) break
    fontSize -= 1
  }

  ctx.font = `900 ${fontSize}px Arial, Helvetica, sans-serif`
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'left'

  const lineHeight = fontSize <= 9 ? fontSize + 1 : fontSize + 2
  const totalHeight = (lines.length - 1) * lineHeight

  lines.forEach((line, lineIdx) => {
    const lineWidth = line.reduce((sum, token) => sum + ctx.measureText(token.text).width, 0)
    let cursor = x - lineWidth / 2
    const yLine = y - totalHeight / 2 + lineIdx * lineHeight

    line.forEach(token => {
      ctx.fillStyle = token.type === 'channel' ? channelColor(token.text) : '#1b0b06'
      ctx.fillText(token.text, cursor, yLine)
      cursor += ctx.measureText(token.text).width
    })
  })
}






function drawBrandPill(ctx, x, y, w, h, colors) {
  const text = 'DICAS93TV'
  ctx.textBaseline = 'middle'
  ctx.font = '900 18px Arial, Helvetica, sans-serif'
  const textW = ctx.measureText(text).width
  const startX = x + (w - textW) / 2
  ctx.textAlign = 'left'
  ctx.fillStyle = colors.yellow
  ctx.fillText(text, startX, y + h / 2)
}

function channelColor(channel) {
  const v = norm(channel)
  const rules = [
    { keys: ['sportv 2'], color: '#b5121b' },
    { keys: ['sportv'], color: '#c91d26' },
    { keys: ['premiere'], color: '#1b0b06' },
    { keys: ['youtube', 'yt'], color: '#005eb8' },
    { keys: ['globo'], color: '#e30613' },
    { keys: ['espn 4'], color: '#7d0012' },
    { keys: ['espn 3'], color: '#850014' },
    { keys: ['espn 2'], color: '#8f0014' },
    { keys: ['espn'], color: '#a40017' },
    { keys: ['disney'], color: '#4b2bbf' },
    { keys: ['paramount'], color: '#0077b6' },
    { keys: ['cazetv', 'caze'], color: '#00a6d6' },
    { keys: ['sportynet'], color: '#008f68' },
    { keys: ['nsports'], color: '#f58220' },
    { keys: ['goat'], color: '#d19000' },
    { keys: ['xports'], color: '#00a9a5' },
    { keys: ['band'], color: '#006b4f' },
    { keys: ['record'], color: '#ef6c00' },
    { keys: ['sbt'], color: '#b000b5' },
    { keys: ['prime video'], color: '#0073ce' },
    { keys: ['dazn'], color: '#1b0b06' },
    { keys: ['tnt'], color: '#552583' },
    { keys: ['apple tv', 'apple'], color: '#111111' },
    { keys: ['max'], color: '#5f2eea' },
    { keys: ['canal uol', 'uol'], color: '#f58220' },
    { keys: ['nosso futebol'], color: '#00843d' },
    { keys: ['tv brasil'], color: '#1f8f3a' },
    { keys: ['fifa', 'cbf'], color: '#173b79' },
    { keys: ['conmebol'], color: '#003b73' },
    { keys: ['paulistao', 'fpf'], color: '#006b4f' },
    { keys: ['onefootball'], color: '#00a000' },
    { keys: ['pluto'], color: '#ff4b00' },
    { keys: ['twitch'], color: '#6441a5' },
    { keys: ['fox'], color: '#0033a0' },
    { keys: ['telemundo'], color: '#e31b23' },
    { keys: ['univision', 'tudn'], color: '#00a3e0' },
    { keys: ['bein'], color: '#8a1538' },
    { keys: ['sky sports'], color: '#005eb8' },
    { keys: ['bbc', 'itv'], color: '#111111' },
    { keys: ['sport tv'], color: '#f2b705' },
    { keys: ['sem transmissao', 'a definir'], color: '#1b0b06' },
  ]
  let match = null
  for (const rule of rules) {
    for (const key of rule.keys) {
      const pos = v.indexOf(key)
      if (pos >= 0 && (!match || pos < match.pos)) match = { pos, color: rule.color }
    }
  }
  return match?.color || '#1b0b06'
}

function downloadProgramPng(date, games, filename) {
  const W = CANVAS_W
  const visible = games.filter(g => g.selected).slice(0, MAX_PNG_BLOCKS)
  const H = getCanvasHeight()
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')

  const colors = {
    green: '#006b4f',
    green2: '#008f68',
    dark: '#1b0b06',
    yellow: '#f8d327',
    cream: '#f4efe6',
    card: '#ffffff',
    line: '#2b1a14',
    muted: '#776b61',
    pale: '#eee5d8',
    blue: '#005eb8',
    red: '#c91d26'
  }

  ctx.fillStyle = colors.cream
  ctx.fillRect(0, 0, W, H)

  fillRound(ctx, 10, 10, 878, 34, 8, colors.green)
  drawLeftText(ctx, formatDatePt(date), 18, 27, 850, '900 18px Arial, Helvetica, sans-serif', '#ffffff')

  fillRound(ctx, 898, 10, 172, 34, 8, colors.dark)
  drawBrandPill(ctx, 898, 10, 172, 34, colors)

  let y = 54
  const rowH = 86
  const gap = 6

  visible.forEach((game) => {
    const x = 10
    const matchW = 825
    const channelX = 845
    const channelW = 225
    const timeW = 74
    const oddsW = 48

    fillRound(ctx, x, y, matchW, rowH, 8, colors.card, colors.line, 2)
    ctx.save()
    drawRoundRect(ctx, x, y, matchW, rowH, 8)
    ctx.clip()

    ctx.fillStyle = colors.green
    ctx.fillRect(x, y, timeW, rowH)
    drawCenteredText(ctx, game.time || '--h--', x + timeW / 2, y + rowH / 2, timeW - 8, '900 18px Arial, Helvetica, sans-serif', '#ffffff')

    ctx.fillStyle = colors.pale
    ctx.fillRect(x + timeW, y, matchW - timeW - oddsW, 21)
    ctx.strokeStyle = '#dfd6ca'
    ctx.lineWidth = 1
    ctx.beginPath(); ctx.moveTo(x + timeW, y + 21); ctx.lineTo(x + matchW - oddsW, y + 21); ctx.stroke()

    drawLeftText(ctx, competitionLabel(game), x + timeW + 8, y + 11.5, game.round ? 300 : 500, '900 14px Arial, Helvetica, sans-serif', '#2a1b15')
    const roundText = displayRound(game.round)
    if (roundText) {
      const pillW = Math.min(185, Math.max(80, ctx.measureText(roundText).width + 26))
      fillRound(ctx, x + 330, y + 1.5, pillW, 18, 9, '#d7f2ea')
      drawCenteredText(ctx, roundText, x + 330 + pillW / 2, y + 10.5, pillW - 10, '900 13px Arial, Helvetica, sans-serif', colors.green)
    }

    const teamsY = y + 21
    const teamsH = rowH - 21
    const contentX = x + timeW
    const contentW = matchW - timeW - oddsW
    const midCX = contentX + contentW / 2
    const leftCX = contentX + contentW * 0.25
    const rightCX = contentX + contentW * 0.75
    drawCenteredText(ctx, game.home || 'Mandante', leftCX, teamsY + teamsH / 2, contentW * 0.43, '900 19px Arial, Helvetica, sans-serif', '#160b07')
    drawCenteredText(ctx, 'x', midCX, teamsY + teamsH / 2, 20, '900 14px Arial, Helvetica, sans-serif', '#6d6258')
    drawCenteredText(ctx, game.away || 'Visitante', rightCX, teamsY + teamsH / 2, contentW * 0.43, '900 19px Arial, Helvetica, sans-serif', '#160b07')

    ctx.fillStyle = '#fff8db'
    ctx.fillRect(x + matchW - oddsW, y, oddsW, rowH)
    ctx.strokeStyle = '#d8d0c6'
    ctx.beginPath(); ctx.moveTo(x + matchW - oddsW, y); ctx.lineTo(x + matchW - oddsW, y + rowH); ctx.stroke()
    ;[game.oddHome || '—', game.oddDraw || '—', game.oddAway || '—'].forEach((odd, idx) => {
      const oy = y + 9 + idx * 24
      fillRound(ctx, x + matchW - oddsW + 3, oy, 42, 20, 10, colors.yellow)
      drawCenteredText(ctx, odd, x + matchW - oddsW + 24, oy + 10, 38, '900 14px Arial, Helvetica, sans-serif', colors.dark)
    })
    ctx.restore()

    fillRound(ctx, channelX, y, channelW, rowH, 8, colors.card, colors.line, 2)
    drawColoredChannelText(ctx, game.channel, channelX + channelW / 2, y + rowH / 2, channelW - 18)

    y += rowH + gap
  })

  ctx.fillStyle = colors.dark
  ctx.fillRect(0, H - 46, W, 46)
  drawLeftText(ctx, BRAND, 12, H - 23, 300, '900 18px Arial, Helvetica, sans-serif', '#ffffff')
  ctx.textAlign = 'right'
  ctx.textBaseline = 'middle'
  ctx.font = '900 18px Arial, Helvetica, sans-serif'
  ctx.fillStyle = colors.yellow
  ctx.fillText(INSTAGRAM, W - 12, H - 23)

  const a = document.createElement('a')
  a.download = filename
  a.href = canvas.toDataURL('image/png', 1)
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

function App(){
  const [date, setDate] = useState(todayISO())
  const [games, setGames] = useState(starterGames)
  const [draft, setDraft] = useState(defaultGame())
  const [editingId, setEditingId] = useState(null)
  const exportRef = useRef(null)
  const selectedCompetition = competitions.find(c => c.name === draft.competition)
  const teamOptions = selectedCompetition?.teams || []
  const competitionOptions = competitions.map(c => `${countryFlag(c.country)} ${c.name} — ${c.country}`)
  const selectedCount = games.filter(g => g.selected).length
  const previewHeight = getCanvasHeight()

  function setDraftField(key, value){
    setDraft(prev => {
      const next = { ...prev, [key]: value }
      if (key === 'competition') {
        const compName = parseCompetitionName(value)
        const comp = competitions.find(c => c.name === compName) || competitions.find(c => c.name === value)
        next.competition = comp?.name || compName || value
        next.country = comp?.country || ''
        if (comp?.teams?.length) { next.home = comp.teams[0]; next.away = comp.teams[1] || comp.teams[0] } else { next.home = ''; next.away = '' }
      }
      return next
    })
  }

  function addTransmissionToDraft(value){
    const cleaned = cleanChannelValue(value)
    if (!displayChannel(cleaned)) {
      setDraftField('channel', cleaned)
      return
    }
    setDraft(prev => {
      const current = displayChannel(prev.channel)
      const currentParts = channelParts(current).map(norm)
      if (currentParts.includes(norm(cleaned))) return prev
      return { ...prev, channel: cleanChannelValue(current ? `${current}, ${cleaned}` : cleaned) }
    })
  }
  function resetDraft(){ setDraft(defaultGame()); setEditingId(null) }
  function addOrSave(){
    if (!draft.home || !draft.away || !draft.competition) return alert('Preencha campeonato, mandante e visitante.')
    if (editingId) {
      setGames(list => list.map(g => g.id === editingId ? { ...draft, id: editingId, selected: true } : g))
      resetDraft()
    } else {
      setGames(list => [...list, { ...draft, id: uid(), selected: true }])
    }
  }
  function editGame(game){ setDraft({ ...game }); setEditingId(game.id); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  function updateGame(id, patch){ setGames(list => list.map(g => g.id === id ? { ...g, ...patch } : g)) }
  function removeGame(id){ setGames(list => list.filter(g => g.id !== id)) }
  function move(id, dir){ setGames(list => { const idx = list.findIndex(g => g.id === id); const nextIdx = idx + dir; if(idx < 0 || nextIdx < 0 || nextIdx >= list.length) return list; const next=[...list]; [next[idx], next[nextIdx]]=[next[nextIdx], next[idx]]; return next }) }
  function duplicate(game){ setGames(list => [...list, { ...game, id: uid() }]) }
  function importJson(file){ const r = new FileReader(); r.onload = () => { const data = JSON.parse(r.result); setDate(data.date || date); setGames((data.games || []).map(g => ({...g, id:g.id || uid()}))) }; r.readAsText(file) }
  function exportJson(){ const blob = new Blob([JSON.stringify({ date, games }, null, 2)], {type:'application/json'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=`dicas93-jogos-${date}.json`; a.click() }
  function importCsv(file){
    const r = new FileReader();
    r.onload = () => {
      const lines = String(r.result).split(/\r?\n/).filter(Boolean); const headers = lines.shift().split(',').map(norm)
      const get=(cols,k)=>cols[headers.indexOf(k)]?.trim() || ''
      const imported = lines.map(line => { const cols=line.split(','); return { id:uid(), selected:true, time:get(cols,'horario') || '19h00', competition:get(cols,'campeonato') || 'Campeonato', country:get(cols,'pais'), round:cleanRoundValue(get(cols,'rodada') || get(cols,'fase') || ''), home:get(cols,'mandante') || 'Mandante', away:get(cols,'visitante') || 'Visitante', oddHome:get(cols,'odd_casa') || '—', oddDraw:get(cols,'odd_empate') || '—', oddAway:get(cols,'odd_fora') || '—', channel:cleanChannelValue(get(cols,'canal') || ''), status:get(cols,'status') || 'confirmado' } })
      setGames(list => [...list, ...imported])
    }
    r.readAsText(file)
  }
  function downloadExampleCsv(){ const content='data,horario,campeonato,rodada,mandante,visitante,odd_casa,odd_empate,odd_fora,canal,pais,status\n2026-04-30,19h00,Libertadores,Grupo C - 3ª R,Bolívar,Fluminense,1.95,3.50,3.70,Paramount+,América do Sul,confirmado'; const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([content],{type:'text/csv'})); a.download='transmissoes-exemplo.csv'; a.click() }

  return <>
    <main className="appShell">
      <header className="topbar"><div><h1>DICAS93TV</h1><p>{INSTAGRAM}</p></div><button className="primary big" onClick={() => downloadProgramPng(date, games, `dicas93-${date}.png`)}>Exportar PNG</button></header>
      <section className="gridLayout">
        <aside className="panel">
          <div className="sectionTitle">Nova partida</div>
          <div className="dateRow"><DateInput label="Data da arte" value={date} onChange={setDate}/></div>
          <SearchSelect label="Campeonato" value={draft.competition ? `${countryFlag(draft.country)} ${draft.competition}${draft.country ? ' — '+draft.country : ''}` : ''} options={competitionOptions} onChange={v => setDraftField('competition', v)} placeholder="Pesquisar campeonato..." />
          <div className="twoCols"><SearchSelect label="Horário" value={draft.time} options={timeOptions} onChange={v => setDraftField('time', v)} placeholder="Digite 19..." allowCustom={true}/><SearchSelect label="Rodada/Fase" value={draft.round} options={roundOptions} onChange={v => setDraftField('round', cleanRoundValue(v))} placeholder="Opcional" allowCustom={true} allowBlank={true} blankLabel="Deixar Rodada/Fase em branco"/></div>
          <div className="twoCols"><SearchSelect label="Mandante" value={draft.home} options={teamOptions} onChange={v => setDraftField('home', v)} placeholder="Pesquisar time..." allowCustom={true}/><SearchSelect label="Visitante" value={draft.away} options={teamOptions} onChange={v => setDraftField('away', v)} placeholder="Pesquisar time..." allowCustom={true}/></div>
          <div className="threeCols"><SearchSelect label="Casa" value={draft.oddHome} options={oddsOptions} onChange={v => setDraftField('oddHome', v)} placeholder="Odd"/><SearchSelect label="Empate" value={draft.oddDraw} options={oddsOptions} onChange={v => setDraftField('oddDraw', v)} placeholder="Odd"/><SearchSelect label="Fora" value={draft.oddAway} options={oddsOptions} onChange={v => setDraftField('oddAway', v)} placeholder="Odd"/></div>
          <div className="transmissionField">
            <SearchSelect label="Transmissão" value={draft.channel} options={channels} onChange={v => setDraftField('channel', cleanChannelValue(v))} placeholder="Digite ou pesquise transmissão..." allowCustom={true}/>
            <SearchSelect label="Adicionar transmissão" value="" options={channels.filter(c => c !== 'Deixar em branco' && c !== 'A definir')} onChange={addTransmissionToDraft} placeholder="+ adicionar outro canal..." allowCustom={true}/>
            <button type="button" className="secondary transmissionClear" onClick={() => setDraftField('channel', 'Deixar em branco')}>Limpar transmissão</button>
          </div>
          <div className="actions"><button className="primary" onClick={addOrSave}>{editingId ? 'Salvar alterações' : 'Adicionar jogo'}</button><button className="secondary" onClick={resetDraft}>Limpar campos</button><button className="secondary" onClick={() => setDraft(d => ({...d, oddHome:'—', oddDraw:'—', oddAway:'—'}))}>Sem odds</button></div>
          <div className="sectionTitle lower">Jogos adicionados <span>{selectedCount}/11 na arte</span></div>
          <div className="gameList">{games.map((g, index) => <div className="editCard" key={g.id}>
            <div className="editMain"><label><input type="checkbox" checked={g.selected} onChange={e => updateGame(g.id,{selected:e.target.checked})}/> mostrar</label><strong>{g.time} · {g.home} x {g.away}</strong><small>{countryFlag(g.country)} {g.competition}{displayRound(g.round) ? ` · ${displayRound(g.round)}` : ''}{displayChannel(g.channel) ? ` · ${displayChannel(g.channel)}` : ''}</small></div>
            <div className="miniBtns"><button onClick={() => move(g.id,-1)} disabled={index===0}>↑</button><button onClick={() => move(g.id,1)} disabled={index===games.length-1}>↓</button><button onClick={() => editGame(g)}>Editar</button><button onClick={() => duplicate(g)}>Duplicar</button><button className="danger" onClick={() => removeGame(g.id)}>Excluir</button></div>
          </div>)}</div>
          <div className="fileActions"><label className="secondary file">Importar CSV<input type="file" accept=".csv" onChange={e => e.target.files?.[0] && importCsv(e.target.files[0])}/></label><label className="secondary file">Importar JSON<input type="file" accept=".json" onChange={e => e.target.files?.[0] && importJson(e.target.files[0])}/></label><button className="secondary" onClick={exportJson}>Exportar JSON</button><button className="secondary" onClick={downloadExampleCsv}>CSV exemplo</button></div>
        </aside>
        <section className="previewSide"><div className="previewToolbar"><strong>Prévia da arte</strong><span>Máximo de 10 blocos por PNG</span></div><div className="previewFrame"><div className="previewScale" style={{ height: `${previewHeight}px` }}><FeedCanvas date={date} games={games}/></div></div></section>
      </section>
    </main>
    <div className="exportMount" style={{ height: `${previewHeight}px` }} aria-hidden="true"><div ref={exportRef}><FeedCanvas date={date} games={games}/></div></div>
  </>
}

createRoot(document.getElementById('root')).render(<App />)
