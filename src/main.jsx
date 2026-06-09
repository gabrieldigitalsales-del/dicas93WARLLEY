import React, { useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const BRAND = 'DICAS93TV'
const INSTAGRAM = '@dicas93tv'

const competitions = [
  { name: 'Brasileirão Série A', country: 'Brasil', teams: ['Flamengo','Palmeiras','Corinthians','São Paulo','Santos','Vasco da Gama','Botafogo','Fluminense','Cruzeiro','Atlético-MG','Grêmio','Internacional','Bahia','Fortaleza','Ceará','Sport','Vitória','Mirassol','Bragantino','Juventude'] },
  { name: 'Brasileirão Série B', country: 'Brasil', teams: ['Athletico-PR','Coritiba','Goiás','Vila Nova','Avaí','Chapecoense','Criciúma','Cuiabá','Remo','Paysandu','CRB','CSA','Novorizontino','Operário','América-MG','Atlético-GO','Botafogo-SP','Ferroviária','Volta Redonda','Amazonas'] },
  { name: 'Copa do Brasil', country: 'Brasil', teams: ['Flamengo','Palmeiras','Corinthians','São Paulo','Santos','Vasco da Gama','Botafogo','Fluminense','Cruzeiro','Atlético-MG','Grêmio','Internacional','Bahia','Fortaleza','Athletico-PR','Coritiba','Sport','Ceará','Vitória','Juventude'] },
  { name: 'Campeonato Paulista', country: 'Brasil', teams: ['Corinthians','Palmeiras','São Paulo','Santos','Bragantino','Ponte Preta','Guarani','Mirassol','Ituano','Ferroviária','São Bernardo FC','Novorizontino'] },
  { name: 'Campeonato Carioca', country: 'Brasil', teams: ['Flamengo','Fluminense','Vasco da Gama','Botafogo','Boavista','Madureira','Volta Redonda','Portuguesa-RJ','Bangu','Nova Iguaçu'] },
  { name: 'Campeonato Mineiro', country: 'Brasil', teams: ['Atlético-MG','Cruzeiro','América-MG','Tombense','Villa Nova-MG','Democrata-GV','Athletic Club','Pouso Alegre'] },
  { name: 'Campeonato Gaúcho', country: 'Brasil', teams: ['Grêmio','Internacional','Juventude','Brasil de Pelotas','Caxias','São José-RS','Novo Hamburgo','Ypiranga-RS'] },
  { name: 'Libertadores', country: 'América do Sul', teams: ['Flamengo','Palmeiras','São Paulo','Botafogo','River Plate','Boca Juniors','Racing','Estudiantes','Peñarol','Nacional','Colo-Colo','Universidad de Chile','Bolívar','The Strongest','Olimpia','Cerro Porteño','Atlético Nacional','Independiente del Valle','LDU Quito','Barcelona SC'] },
  { name: 'Sul-Americana', country: 'América do Sul', teams: ['Vasco da Gama','Cruzeiro','Corinthians','Bahia','Lanús','Defensa y Justicia','San Lorenzo','Independiente','Universidad Católica','Colo-Colo','Olimpia','Cerro Porteño','LDU Quito','Barcelona SC','Deportivo Cali','Atlético Nacional','Blooming','Carabobo','Melgar','Sporting Cristal'] },
  { name: 'Premier League', country: 'Inglaterra', teams: ['Arsenal','Aston Villa','Bournemouth','Brentford','Brighton','Chelsea','Crystal Palace','Everton','Fulham','Liverpool','Manchester City','Manchester United','Newcastle','Nottingham Forest','Tottenham','West Ham','Wolves','Leeds United','Burnley','Sunderland'] },
  { name: 'La Liga', country: 'Espanha', teams: ['Real Madrid','Barcelona','Atlético de Madrid','Athletic Club','Real Sociedad','Villarreal','Valencia','Sevilla','Betis','Celta de Vigo','Osasuna','Getafe','Mallorca','Girona','Espanyol','Alavés','Rayo Vallecano','Levante','Elche','Oviedo'] },
  { name: 'Serie A Italiana', country: 'Itália', teams: ['Inter de Milão','Milan','Juventus','Napoli','Roma','Lazio','Atalanta','Fiorentina','Bologna','Torino','Genoa','Udinese','Sassuolo','Parma','Cagliari','Lecce','Verona','Como','Cremonese','Pisa'] },
  { name: 'Bundesliga', country: 'Alemanha', teams: ['Bayern de Munique','Borussia Dortmund','Bayer Leverkusen','RB Leipzig','Eintracht Frankfurt','Stuttgart','Wolfsburg','Freiburg','Mainz','Augsburg','Werder Bremen','Borussia Mönchengladbach','Union Berlin','Hoffenheim','Heidenheim','St. Pauli','Hamburgo','Colônia'] },
  { name: 'Ligue 1', country: 'França', teams: ['PSG','Marseille','Lyon','Monaco','Lille','Nice','Rennes','Lens','Strasbourg','Nantes','Toulouse','Montpellier','Brest','Auxerre','Angers','Le Havre','Metz','Paris FC'] },
  { name: 'Liga Portugal', country: 'Portugal', teams: ['Benfica','Porto','Sporting','Braga','Vitória SC','Boavista','Casa Pia','Estoril','Famalicão','Gil Vicente','Moreirense','Nacional','Rio Ave','Santa Clara','Arouca','Tondela','Alverca','Estrela Amadora'] },
  { name: 'Champions League', country: 'Europa', teams: ['Real Madrid','Barcelona','Atlético de Madrid','Arsenal','Chelsea','Liverpool','Manchester City','PSG','Bayern de Munique','Borussia Dortmund','Inter de Milão','Milan','Juventus','Napoli','Benfica','Porto','Sporting','Ajax','PSV','Celtic'] },
  { name: 'Europa League', country: 'Europa', teams: ['Manchester United','Tottenham','Roma','Lazio','Milan','Porto','Benfica','Sporting','Ajax','PSV','Fenerbahçe','Galatasaray','Olympiacos','Rangers','Celtic','Sevilla','Betis','Lyon','Marseille','Frankfurt'] },
  { name: 'Conference League', country: 'Europa', teams: ['Chelsea','Crystal Palace','Fiorentina','Betis','Lille','Nice','Copenhagen','Gent','AZ Alkmaar','Rapid Wien','Legia Warszawa','Partizan','Hearts','Molde','Djurgården','Shakhtar Donetsk'] },
  { name: 'MLS', country: 'Estados Unidos', teams: ['Inter Miami','LA Galaxy','Los Angeles FC','New York City FC','New York Red Bulls','Atlanta United','Orlando City','Columbus Crew','Seattle Sounders','Portland Timbers','Chicago Fire','FC Dallas','Austin FC','Nashville SC','Toronto FC','Vancouver Whitecaps'] },
  { name: 'Liga MX', country: 'México', teams: ['América','Chivas','Cruz Azul','Pumas','Tigres','Monterrey','Toluca','Pachuca','León','Santos Laguna','Atlas','Tijuana','Necaxa','Puebla','Querétaro','Juárez','Mazatlán','Atlético San Luis'] },
  { name: 'Campeonato Argentino', country: 'Argentina', teams: ['River Plate','Boca Juniors','Racing','Independiente','San Lorenzo','Estudiantes','Vélez Sarsfield','Lanús','Huracán','Rosario Central','Newell’s Old Boys','Talleres','Belgrano','Godoy Cruz','Defensa y Justicia','Argentinos Juniors'] },
  { name: 'Campeonato Chileno', country: 'Chile', teams: ['Colo-Colo','Universidad de Chile','Universidad Católica','Unión Española','Palestino','Audax Italiano','Everton','Cobresal','Huachipato','O’Higgins','Coquimbo Unido','La Serena'] },
  { name: 'Campeonato Colombiano', country: 'Colômbia', teams: ['Atlético Nacional','Millonarios','América de Cali','Deportivo Cali','Junior Barranquilla','Santa Fe','Once Caldas','Tolima','Medellín','Deportivo Pereira','Envigado','La Equidad'] },
  { name: 'Campeonato Saudita', country: 'Arábia Saudita', teams: ['Al-Hilal','Al-Nassr','Al-Ittihad','Al-Ahli','Al-Shabab','Al-Ettifaq','Al-Taawoun','Al-Fateh','Al-Riyadh','Al-Qadsiah','Al-Wehda','Al-Khaleej'] },
  { name: 'J-League', country: 'Japão', teams: ['Vissel Kobe','Yokohama F. Marinos','Urawa Reds','Kawasaki Frontale','Sanfrecce Hiroshima','Kashima Antlers','FC Tokyo','Cerezo Osaka','Gamba Osaka','Nagoya Grampus','Avispa Fukuoka','Consadole Sapporo'] },
  { name: 'K League', country: 'Coreia do Sul', teams: ['Ulsan HD','Jeonbuk Hyundai','FC Seoul','Pohang Steelers','Suwon FC','Daegu FC','Daejeon Hana Citizen','Jeju United','Gangwon FC','Gwangju FC','Incheon United','Gimcheon Sangmu'] },
  { name: 'AFC Champions League', country: 'Ásia', teams: ['Al-Hilal','Al-Nassr','Al-Ittihad','Al-Ahli','Urawa Reds','Vissel Kobe','Yokohama F. Marinos','Ulsan HD','Jeonbuk Hyundai','Shanghai Port','Al-Ain','Al-Sadd','Persepolis','Esteghlal'] },
  { name: 'CAF Champions League', country: 'África', teams: ['Al Ahly','Zamalek','Wydad Casablanca','Raja Casablanca','Esperance Tunis','Mamelodi Sundowns','TP Mazembe','Simba SC','Young Africans','CR Belouizdad','Orlando Pirates','Pyramids FC'] },
  { name: 'Copa do Mundo de Clubes', country: 'FIFA', teams: ['Flamengo','Fluminense','Palmeiras','Botafogo','Real Madrid','Barcelona','Manchester City','Chelsea','PSG','Bayern de Munique','Inter de Milão','Juventus','Al-Hilal','Al-Ahly','Wydad Casablanca','Monterrey','Seattle Sounders','Inter Miami'] },
]

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

const channels = ['Deixar em branco','Sem transmissão','Globo','SporTV','SporTV 2','Premiere','ESPN','ESPN 2','Disney+','Paramount+','YouTube','YouTube (CazéTV)','CazéTV','GOAT','X Sports','Band','Record','SBT','Prime Video','DAZN','TNT Sports','SportyNet','Amazon Prime','Apple TV','HBO Max','Max','Canal UOL','Nosso Futebol','TV Brasil','A definir']
const timeOptions = Array.from({ length: 24 * 12 }, (_, i) => `${String(Math.floor(i / 12)).padStart(2, '0')}h${String((i % 12) * 5).padStart(2, '0')}`)
const oddsOptions = ['—', ...Array.from({ length: Math.round((15 - 1.1) / 0.05) + 1 }, (_, i) => (1.1 + i * 0.05).toFixed(2))]

function todayISO(){ return new Date().toISOString().slice(0,10) }
function uid(){ return Math.random().toString(36).slice(2) + Date.now().toString(36) }
function norm(v){ return String(v || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim() }

function cleanRoundValue(value) {
  const v = norm(value)
  if (v === 'deixar em branco' || v === 'sem rodada/fase' || v === 'sem rodada' || v === 'sem fase') return ''
  return value
}

function cleanChannelValue(value) {
  const v = norm(value)
  if (v === 'deixar em branco') return ''
  return value
}


function countryFlag(country){
  const flags = {
    'Brasil': '🇧🇷',
    'América do Sul': '🌎',
    'Inglaterra': '🏴',
    'Espanha': '🇪🇸',
    'Itália': '🇮🇹',
    'Alemanha': '🇩🇪',
    'França': '🇫🇷',
    'Portugal': '🇵🇹',
    'Europa': '🇪🇺',
    'Estados Unidos': '🇺🇸',
    'México': '🇲🇽',
    'Argentina': '🇦🇷',
    'Chile': '🇨🇱',
    'Colômbia': '🇨🇴',
    'Arábia Saudita': '🇸🇦',
    'Japão': '🇯🇵',
    'Coreia do Sul': '🇰🇷',
    'Ásia': '🌏',
    'África': '🌍',
    'FIFA': '🏆'
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
  const date = new Date(`${dateValue}T12:00:00`)
  return new Intl.DateTimeFormat('pt-BR',{ weekday:'long', day:'2-digit', month:'long', year:'numeric' }).format(date).replace('-feira','').toUpperCase()
}

function defaultGame(){
  return { id: uid(), selected: true, time: '19h00', competition: 'Brasileirão Série A', country: 'Brasil', round: '1ª Rodada', home: 'Flamengo', away: 'Palmeiras', oddHome: '2.10', oddDraw: '3.20', oddAway: '3.40', channel: 'Globo/Premiere', status: 'confirmado' }
}

const starterGames = [
  { ...defaultGame(), id: uid(), time:'16h00', competition:'Conference League', country:'Europa', round:'Semifinal - Ida', home:'Shakhtar Donetsk', away:'Crystal Palace', oddHome:'3.75', oddDraw:'3.50', oddAway:'2.00', channel:'YouTube (CazéTV)' },
  { ...defaultGame(), id: uid(), time:'19h00', competition:'Libertadores', country:'América do Sul', round:'Grupo C - 3ª R', home:'Bolívar', away:'Fluminense', oddHome:'1.95', oddDraw:'3.50', oddAway:'3.70', channel:'Paramount+' },
  { ...defaultGame(), id: uid(), time:'19h00', competition:'Sul-Americana', country:'América do Sul', round:'Grupo G - 3ª R', home:'Vasco da Gama', away:'Olimpia', oddHome:'1.85', oddDraw:'3.60', oddAway:'4.00', channel:'Paramount+' },
  { ...defaultGame(), id: uid(), time:'20h00', competition:'Brasileirão Série A', country:'Brasil', round:'15ª Rodada', home:'Flamengo', away:'Palmeiras', oddHome:'2.10', oddDraw:'3.20', oddAway:'3.40', channel:'Globo/Premiere' },
]

function useClickOutside(ref, handler){
  useEffect(() => {
    const onDown = (event) => { if (ref.current && !ref.current.contains(event.target)) handler() }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('touchstart', onDown)
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('touchstart', onDown) }
  }, [ref, handler])
}

function SearchSelect({ label, value, options, onChange, placeholder='Pesquisar...', allowCustom=true, disabled=false }){
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const box = useRef(null)
  useClickOutside(box, () => setOpen(false))
  const filtered = useMemo(() => {
    const q = norm(query)
    return options.filter(opt => !q || norm(opt).includes(q)).slice(0, 90)
  }, [options, query])
  function choose(v){ onChange(v); setQuery(''); setOpen(false) }
  return <div className="field" ref={box}>
    <label>{label}</label>
    <button type="button" className={'selectButton ' + (disabled ? 'disabled':'')} disabled={disabled} onClick={() => setOpen(v => !v)}>
      <span>{value || placeholder}</span><b>⌄</b>
    </button>
    {open && !disabled && <div className="popover">
      <input autoFocus value={query} onChange={e => setQuery(e.target.value)} placeholder={placeholder} className="searchInput" />
      <div className="optionList">
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

function CanvasCard({ game }){
  const channelClass = norm(game.channel).includes('youtube') || norm(game.channel).includes('caze') ? 'blue' : (norm(game.channel).includes('paramount') || norm(game.channel).includes('globo') || norm(game.channel).includes('premiere') || norm(game.channel).includes('disney') ? 'red' : '')
  return <div className="canvasRow">
    <div className="matchBox">
      <div className="timeCell">{game.time || '--h--'}</div>
      <div className="matchMain">
        <div className="leagueLine">
          <span className="leagueName">{competitionLabel(game)}</span>
          <span className="roundPill">{game.round || 'Rodada'}</span>
        </div>
        <div className="teamsLine"><span>{game.home || 'Mandante'}</span><em>x</em><span>{game.away || 'Visitante'}</span></div>
      </div>
      <div className="oddsCell"><span>{game.oddHome || '—'}</span><span>{game.oddDraw || '—'}</span><span>{game.oddAway || '—'}</span></div>
    </div>
    <div className={'channelBox ' + channelClass}>{String(game.channel || '').trim()}</div>
  </div>
}

function FeedCanvas({ date, games }){
  const visible = games.filter(g => g.selected).slice(0, 11)
  return <div className="feedCanvas">
    <div className="canvasHeader"><div className="dateBadge">{formatDatePt(date)}</div><div className="brandBadge"><span>DICAS93TV</span></div></div>
    <div className="rowsWrap">{visible.map(game => <CanvasCard game={game} key={game.id} />)}</div>
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
  return String(channel || '')
    .split(/\s*(?:\/|,|\+| e )\s*/i)
    .map(v => v.trim())
    .filter(Boolean)
}

function hasMultipleChannels(channel) {
  return channelParts(channel).length > 1
}

function getChannelFontSize(channel) {
  const value = String(channel || '').trim()
  const parts = channelParts(value)
  const len = value.length

  if (parts.length >= 4 || len >= 34) return 15
  if (parts.length >= 3 || len >= 28) return 17
  if (parts.length >= 2 || len >= 20) return 19
  if (len >= 15) return 22
  return 25
}

function wrapTextLines(ctx, text, maxWidth, maxLines = 2) {
  const words = String(text || '').trim().split(/\s+/).filter(Boolean)
  if (!words.length) return ['']

  const lines = []
  let current = words[0]

  for (let i = 1; i < words.length; i += 1) {
    const test = `${current} ${words[i]}`
    if (ctx.measureText(test).width <= maxWidth) {
      current = test
    } else {
      lines.push(current)
      current = words[i]
      if (lines.length === maxLines - 1) break
    }
  }

  const usedWords = lines.join(' ').split(/\s+/).filter(Boolean).length
  const remaining = words.slice(usedWords)
  lines.push(remaining.join(' ') || current)

  const result = lines.slice(0, maxLines)
  if (result.length === maxLines) result[result.length - 1] = fitText(ctx, result[result.length - 1], maxWidth)

  return result
}

function drawCenteredMultilineText(ctx, text, x, y, maxWidth, font, color, lineHeight = 20, maxLines = 2) {
  ctx.font = font
  ctx.fillStyle = color
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  const lines = wrapTextLines(ctx, text, maxWidth, maxLines)
  const totalHeight = (lines.length - 1) * lineHeight

  lines.forEach((line, index) => {
    ctx.fillText(line, x, y - totalHeight / 2 + index * lineHeight)
  })
}

function drawBrandPill(ctx, x, y, w, h, colors) {
  const text = 'DICAS93TV'
  ctx.textBaseline = 'middle'
  ctx.font = '900 30px Arial, Helvetica, sans-serif'
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
    { keys: ['youtube'], color: '#005eb8' },
    { keys: ['globo'], color: '#e30613' },
    { keys: ['espn 2'], color: '#8f0014' },
    { keys: ['espn'], color: '#a40017' },
    { keys: ['disney'], color: '#4b2bbf' },
    { keys: ['paramount'], color: '#0077b6' },
    { keys: ['cazetv', 'caze'], color: '#00a6d6' },
    { keys: ['goat'], color: '#d19000' },
    { keys: ['x sports'], color: '#00a9a5' },
    { keys: ['band'], color: '#006b4f' },
    { keys: ['record'], color: '#ef6c00' },
    { keys: ['sbt'], color: '#b000b5' },
    { keys: ['prime video', 'amazon prime'], color: '#0073ce' },
    { keys: ['dazn'], color: '#1b0b06' },
    { keys: ['tnt'], color: '#552583' },
    { keys: ['sportynet'], color: '#008f68' },
    { keys: ['apple tv', 'apple'], color: '#111111' },
    { keys: ['hbo max', 'max'], color: '#5f2eea' },
    { keys: ['canal uol', 'uol'], color: '#f58220' },
    { keys: ['nosso futebol'], color: '#00843d' },
    { keys: ['tv brasil'], color: '#1f8f3a' },
    { keys: ['sem transmissao', 'a definir'], color: '#1b0b06' },
  ]

  let match = null

  for (const rule of rules) {
    for (const key of rule.keys) {
      const pos = v.indexOf(key)
      if (pos >= 0 && (!match || pos < match.pos)) {
        match = { pos, color: rule.color }
      }
    }
  }

  return match?.color || '#1b0b06'
}

function downloadProgramPng(date, games, filename) {
  const W = 1080
  const H = 1350
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

  fillRound(ctx, 28, 26, 735, 62, 15, colors.green)
  drawLeftText(ctx, formatDatePt(date), 46, 57, 695, '900 31px Arial, Helvetica, sans-serif', '#ffffff')

  fillRound(ctx, 785, 26, 267, 62, 15, colors.dark)
  drawBrandPill(ctx, 785, 26, 267, 62, colors)

  const visible = games.filter(g => g.selected).slice(0, 11)
  let y = 106
  const rowH = 92
  const gap = 13

  visible.forEach((game) => {
    const x = 28
    const matchW = 778
    const channelX = 820
    const channelW = 232
    const timeW = 126
    const oddsW = 66

    fillRound(ctx, x, y, matchW, rowH, 14, colors.card, colors.line, 2)
    ctx.save()
    drawRoundRect(ctx, x, y, matchW, rowH, 14)
    ctx.clip()

    ctx.fillStyle = colors.green
    ctx.fillRect(x, y, timeW, rowH)
    drawCenteredText(ctx, game.time || '--h--', x + timeW / 2, y + rowH / 2, timeW - 10, '900 29px Arial, Helvetica, sans-serif', '#ffffff')

    ctx.fillStyle = colors.pale
    ctx.fillRect(x + timeW, y, matchW - timeW - oddsW, 31)
    ctx.strokeStyle = '#dfd6ca'
    ctx.lineWidth = 1
    ctx.beginPath(); ctx.moveTo(x + timeW, y + 31); ctx.lineTo(x + matchW - oddsW, y + 31); ctx.stroke()

    drawLeftText(ctx, competitionLabel(game), x + timeW + 12, y + 15.5, 285, '900 15px Arial, Helvetica, sans-serif', '#2a1b15')
    const pillW = Math.min(185, Math.max(80, ctx.measureText(String(game.round || 'Rodada')).width + 26))
    fillRound(ctx, x + 435, y + 4.5, pillW, 22, 11, '#d7f2ea')
    drawCenteredText(ctx, game.round || 'Rodada', x + 435 + pillW / 2, y + 15.5, pillW - 14, '900 13px Arial, Helvetica, sans-serif', colors.green)

    const teamsY = y + 31
    const teamsH = rowH - 31
    const contentX = x + timeW
    const contentW = matchW - timeW - oddsW
    const midCX = contentX + contentW / 2
    const leftCX = contentX + contentW * 0.25
    const rightCX = contentX + contentW * 0.75
    drawCenteredText(ctx, game.home || 'Mandante', leftCX, teamsY + teamsH / 2, contentW * 0.43, '900 29px Arial, Helvetica, sans-serif', '#160b07')
    drawCenteredText(ctx, 'x', midCX, teamsY + teamsH / 2, 28, '900 22px Arial, Helvetica, sans-serif', '#6d6258')
    drawCenteredText(ctx, game.away || 'Visitante', rightCX, teamsY + teamsH / 2, contentW * 0.43, '900 29px Arial, Helvetica, sans-serif', '#160b07')

    ctx.fillStyle = '#fff8db'
    ctx.fillRect(x + matchW - oddsW, y, oddsW, rowH)
    ctx.strokeStyle = '#d8d0c6'
    ctx.beginPath(); ctx.moveTo(x + matchW - oddsW, y); ctx.lineTo(x + matchW - oddsW, y + rowH); ctx.stroke()
    ;[game.oddHome || '—', game.oddDraw || '—', game.oddAway || '—'].forEach((odd, idx) => {
      const oy = y + 13 + idx * 27
      fillRound(ctx, x + matchW - oddsW + 6, oy, 54, 24, 12, colors.yellow)
      drawCenteredText(ctx, odd, x + matchW - oddsW + 33, oy + 12, 48, '900 17px Arial, Helvetica, sans-serif', colors.dark)
    })
    ctx.restore()

    fillRound(ctx, channelX, y, channelW, rowH, 14, colors.card, colors.line, 2)
    const channelText = String(game.channel || '').trim()
    const channelFontSize = getChannelFontSize(channelText)
    drawCenteredMultilineText(
      ctx,
      channelText,
      channelX + channelW / 2,
      y + rowH / 2,
      channelW - 26,
      `900 ${channelFontSize}px Arial, Helvetica, sans-serif`,
      channelColor(channelText),
      channelFontSize <= 17 ? 18 : 20,
      hasMultipleChannels(channelText) ? 2 : 1
    )

    y += rowH + gap
  })

  ctx.fillStyle = colors.dark
  ctx.fillRect(0, H - 62, W, 62)
  drawLeftText(ctx, BRAND, 32, H - 31, 480, '900 33px Arial, Helvetica, sans-serif', '#ffffff')
  ctx.textAlign = 'right'
  ctx.textBaseline = 'middle'
  ctx.font = '900 30px Arial, Helvetica, sans-serif'
  ctx.fillStyle = colors.yellow
  ctx.fillText(INSTAGRAM, W - 32, H - 31)

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

  function setDraftField(key, value){
    setDraft(prev => {
      const next = { ...prev, [key]: value }
      if (key === 'competition') {
        const compName = parseCompetitionName(value)
        const comp = competitions.find(c => c.name === compName) || competitions.find(c => c.name === value)
        next.competition = comp?.name || compName || value
        next.country = comp?.country || ''
        if (comp?.teams?.length) { next.home = comp.teams[0]; next.away = comp.teams[1] || comp.teams[0] }
      }
      return next
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
      const imported = lines.map(line => { const cols=line.split(','); return { id:uid(), selected:true, time:get(cols,'horario') || '19h00', competition:get(cols,'campeonato') || 'Campeonato', country:get(cols,'pais'), round:get(cols,'rodada') || get(cols,'fase') || 'Rodada', home:get(cols,'mandante') || 'Mandante', away:get(cols,'visitante') || 'Visitante', oddHome:get(cols,'odd_casa') || '—', oddDraw:get(cols,'odd_empate') || '—', oddAway:get(cols,'odd_fora') || '—', channel:cleanChannelValue(get(cols,'canal') || ''), status:get(cols,'status') || 'confirmado' } })
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
          <div className="dateRow"><TextInput label="Data da arte" value={date} onChange={setDate}/></div>
          <SearchSelect label="Campeonato" value={draft.competition ? `${countryFlag(draft.country)} ${draft.competition}${draft.country ? ' — '+draft.country : ''}` : ''} options={competitionOptions} onChange={v => setDraftField('competition', v)} placeholder="Pesquisar campeonato..." />
          <div className="twoCols"><SearchSelect label="Horário" value={draft.time} options={timeOptions} onChange={v => setDraftField('time', v)} placeholder="Digite 19..." allowCustom={true}/><SearchSelect label="Rodada/Fase" value={draft.round} options={roundOptions} onChange={v => setDraftField('round', cleanRoundValue(v))} placeholder="Pesquisar rodada..." allowCustom={true}/></div>
          <div className="twoCols"><SearchSelect label="Mandante" value={draft.home} options={teamOptions} onChange={v => setDraftField('home', v)} placeholder="Pesquisar time..." allowCustom={true}/><SearchSelect label="Visitante" value={draft.away} options={teamOptions} onChange={v => setDraftField('away', v)} placeholder="Pesquisar time..." allowCustom={true}/></div>
          <div className="threeCols"><SearchSelect label="Casa" value={draft.oddHome} options={oddsOptions} onChange={v => setDraftField('oddHome', v)} placeholder="Odd"/><SearchSelect label="Empate" value={draft.oddDraw} options={oddsOptions} onChange={v => setDraftField('oddDraw', v)} placeholder="Odd"/><SearchSelect label="Fora" value={draft.oddAway} options={oddsOptions} onChange={v => setDraftField('oddAway', v)} placeholder="Odd"/></div>
          <SearchSelect label="Transmissão" value={draft.channel} options={channels} onChange={v => setDraftField('channel', cleanChannelValue(v))} placeholder="Digite ou pesquise transmissão..." allowCustom={true}/>
          <div className="actions"><button className="primary" onClick={addOrSave}>{editingId ? 'Salvar alterações' : 'Adicionar jogo'}</button><button className="secondary" onClick={resetDraft}>Limpar campos</button><button className="secondary" onClick={() => setDraft(d => ({...d, oddHome:'—', oddDraw:'—', oddAway:'—'}))}>Sem odds</button></div>
          <div className="sectionTitle lower">Jogos adicionados <span>{selectedCount}/11 na arte</span></div>
          <div className="gameList">{games.map((g, index) => <div className="editCard" key={g.id}>
            <div className="editMain"><label><input type="checkbox" checked={g.selected} onChange={e => updateGame(g.id,{selected:e.target.checked})}/> mostrar</label><strong>{g.time} · {g.home} x {g.away}</strong><small>{countryFlag(g.country)} {g.competition} · {g.round} · {g.channel}</small></div>
            <div className="miniBtns"><button onClick={() => move(g.id,-1)} disabled={index===0}>↑</button><button onClick={() => move(g.id,1)} disabled={index===games.length-1}>↓</button><button onClick={() => editGame(g)}>Editar</button><button onClick={() => duplicate(g)}>Duplicar</button><button className="danger" onClick={() => removeGame(g.id)}>Excluir</button></div>
          </div>)}</div>
          <div className="fileActions"><label className="secondary file">Importar CSV<input type="file" accept=".csv" onChange={e => e.target.files?.[0] && importCsv(e.target.files[0])}/></label><label className="secondary file">Importar JSON<input type="file" accept=".json" onChange={e => e.target.files?.[0] && importJson(e.target.files[0])}/></label><button className="secondary" onClick={exportJson}>Exportar JSON</button><button className="secondary" onClick={downloadExampleCsv}>CSV exemplo</button></div>
        </aside>
        <section className="previewSide"><div className="previewToolbar"><strong>Prévia da arte</strong><span>Exportação real: 1080 x 1350 px</span></div><div className="previewFrame"><div className="previewScale"><FeedCanvas date={date} games={games}/></div></div></section>
      </section>
    </main>
    <div className="exportMount" aria-hidden="true"><div ref={exportRef}><FeedCanvas date={date} games={games}/></div></div>
  </>
}

createRoot(document.getElementById('root')).render(<App />)
