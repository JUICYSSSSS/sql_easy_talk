/* =============================================
   SQL-Easy Talk — Compiler Engine + UI Logic
   Premium edition with syntax highlighting,
   toast notifications, scroll reveal, stats,
   and login screen
   ============================================= */

// ===========================================
// 0. LOGIN SYSTEM
// ===========================================

function createLoginParticles() {
  const container = document.getElementById('login-particles');
  if (!container) return;
  const count = 25;
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'login-particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (8 + Math.random() * 12) + 's';
    particle.style.animationDelay = (Math.random() * 10) + 's';
    particle.style.width = (2 + Math.random() * 3) + 'px';
    particle.style.height = particle.style.width;
    if (Math.random() > 0.5) {
      particle.style.background = '#39FF14';
    }
    container.appendChild(particle);
  }
}

function handleLogin(e) {
  e.preventDefault();

  const user = document.getElementById('login-user').value.trim();
  const pass = document.getElementById('login-pass').value;
  const errorEl = document.getElementById('login-error');
  const btn = document.getElementById('login-btn');
  const card = document.getElementById('login-card');

  // Clear previous error
  errorEl.textContent = '';
  errorEl.classList.remove('visible');

  if (!user || !pass) {
    errorEl.textContent = '⚠️ Por favor completa todos los campos';
    errorEl.classList.add('visible');
    return;
  }

  // Show loading state
  btn.classList.add('loading');

  // Simulate authentication delay for UX
  setTimeout(() => {
    // Validate credentials
    if (user === 'admin' && pass === '1234') {
      // Success!
      card.classList.add('success');
      btn.classList.remove('loading');

      setTimeout(() => {
        const overlay = document.getElementById('login-overlay');
        const sidebar = document.getElementById('sidebar');
        const main = document.getElementById('main-content');

        // Animate out
        overlay.classList.add('exit');
        sidebar.classList.remove('app-hidden');
        main.classList.remove('app-hidden');
        sidebar.classList.add('app-revealed');
        main.classList.add('app-revealed');

        // Remove overlay from DOM after animation
        setTimeout(() => {
          overlay.style.display = 'none';
          // Start the main app
          navigateTo('home');
          animateStats();
        }, 700);
      }, 400);

    } else {
      // Error
      btn.classList.remove('loading');
      errorEl.textContent = '❌ Usuario o contraseña incorrectos';
      errorEl.classList.add('visible');

      // Shake the inputs
      document.getElementById('login-user').style.borderColor = 'var(--red)';
      document.getElementById('login-pass').style.borderColor = 'var(--red)';
      setTimeout(() => {
        document.getElementById('login-user').style.borderColor = '';
        document.getElementById('login-pass').style.borderColor = '';
      }, 1500);
    }
  }, 1200);
}

function logout() {
  const overlay = document.getElementById('login-overlay');
  const sidebar = document.getElementById('sidebar');
  const main = document.getElementById('main-content');
  const user = document.getElementById('login-user');
  const pass = document.getElementById('login-pass');
  const btn = document.getElementById('login-btn');
  const card = document.getElementById('login-card');

  // Reset visual styles of login
  card.classList.remove('success');
  overlay.classList.remove('exit');
  overlay.style.display = 'flex';
  
  // Clean inputs
  user.value = '';
  pass.value = '';

  // Hide the app content
  sidebar.classList.remove('app-revealed');
  main.classList.remove('app-revealed');
  sidebar.classList.add('app-hidden');
  main.classList.add('app-hidden');
  
  // Go back to Home secretly
  navigateTo('home');
  
  showToast('Cierre de sesión seguro', 'success');
}

// ===========================================
// 1. COMPILER LAYER
// ===========================================

class LexicalError extends Error {
  constructor(msg) { super(msg); this.name = 'LexicalError'; }
}

class SyntaxError2 extends Error {
  constructor(msg) { super(msg); this.name = 'SyntaxError2'; }
}

class Token {
  constructor(type, value) {
    this.type = type;
    this.value = value;
  }
}

class Lexer {
  constructor() {
    this.specs = [
      { name: 'SELECT_KW', pattern: /\b(mostrar|ver|listar)\b/i },
      { name: 'WHERE_KW',  pattern: /\b(con|donde|que)\b/i },
      { name: 'OPERATOR',  pattern: /\b(mayor a|menor a|igual a)\b|[><=]/i },
      { name: 'NUMBER',    pattern: /\d+/ },
      { name: 'ENTITY',    pattern: /\b[a-zA-ZáéíóúñÁÉÍÓÚÑ_][a-zA-ZáéíóúñÁÉÍÓÚÑ0-9_]*\b/ },
      { name: 'ESPACIO',   pattern: /[ \t\n]+/ },
      { name: 'ILEGAL',    pattern: /./ },
    ];
    const parts = this.specs.map(s => `(?<${s.name}>${s.pattern.source})`);
    this.regex = new RegExp(parts.join('|'), 'gi');
    this.symbolTable = [];
  }

  tokenize(text) {
    const tokens = [];
    this.symbolTable = [];
    this.regex.lastIndex = 0;
    let match;
    while ((match = this.regex.exec(text)) !== null) {
      let kind = null, value = '';
      for (const spec of this.specs) {
        if (match.groups[spec.name] !== undefined) {
          kind = spec.name;
          value = match.groups[spec.name];
          break;
        }
      }
      if (kind === 'ESPACIO') continue;
      if (kind === 'ILEGAL') throw new LexicalError(`Se detectó un símbolo que no pertenece al abecedario: '${value}'`);
      if (kind === 'ENTITY') {
        const tag = value.toLowerCase();
        if (!this.symbolTable.includes(tag)) this.symbolTable.push(tag);
      }
      tokens.push(new Token(kind, value.toLowerCase()));
    }
    tokens.push(new Token('EOF', ''));
    return tokens;
  }
}

class Parser {
  constructor(tokens) { this.tokens = tokens; this.pos = 0; }
  current() { return this.tokens[this.pos]; }

  consume(expectedType) {
    const token = this.current();
    if (token.type === expectedType) { this.pos++; return token; }
    throw new SyntaxError2(`Estructura gramatical incorrecta. Se esperaba '${expectedType}', se recibió '${token.type}'`);
  }

  parse() {
    this.consume('SELECT_KW');
    const entidad = this.consume('ENTITY').value;
    let atributo = null, operador = null, valor = null;
    if (this.current().type === 'WHERE_KW') {
      this.consume('WHERE_KW');
      atributo = this.consume('ENTITY').value;
      const opStr = this.consume('OPERATOR').value;
      operador = opStr === 'mayor a' ? '>' : opStr === 'menor a' ? '<' : opStr === 'igual a' ? '=' : opStr;
      valor = this.consume('NUMBER').value;
    }
    if (this.current().type !== 'EOF') throw new SyntaxError2('Elementos sobrantes detectados.');
    return { entidad, atributo, operador, valor };
  }
}

class Translator {
  static translate(entidad, atributo, operador, valor, dialect = 'MySQL') {
    let sql = dialect === 'SQL Server' ? `SELECT * FROM [${entidad}]` : `SELECT * FROM ${entidad}`;
    if (atributo && operador && valor) {
      sql += dialect === 'SQL Server'
        ? `\nWHERE [${atributo}] ${operador} ${valor}`
        : `\nWHERE ${atributo} ${operador} ${valor}`;
    }
    return sql + ';';
  }
}

function compilarYTraducir(frase, dialect = 'MySQL') {
  const lexer = new Lexer();
  const tokens = lexer.tokenize(frase);
  const parser = new Parser(tokens);
  const { entidad, atributo, operador, valor } = parser.parse();
  const sql = Translator.translate(entidad, atributo, operador, valor, dialect);
  return { sql, symbolTable: lexer.symbolTable, tokens };
}

// ===========================================
// 2. SQL SYNTAX HIGHLIGHTER
// ===========================================
function highlightSQL(sql) {
  const keywords = /\b(SELECT|FROM|WHERE)\b/g;
  const numbers = /\b(\d+)\b/g;
  const operators = /([><=])/g;
  const brackets = /(\[|\])/g;

  let highlighted = escapeHtml(sql);
  highlighted = highlighted.replace(keywords, '<span class="sql-keyword">$1</span>');
  highlighted = highlighted.replace(/\b(\*)\b/, '<span class="sql-keyword">$1</span>');
  highlighted = highlighted.replace(numbers, '<span class="sql-number">$1</span>');
  highlighted = highlighted.replace(operators, '<span class="sql-operator">$1</span>');
  highlighted = highlighted.replace(brackets, '<span class="sql-operator">$1</span>');

  // Highlight table/column names (words that aren't keywords, numbers, or operators)
  // We do this by finding spans of ENTITY text that aren't already wrapped
  return highlighted;
}

// ===========================================
// 3. TOAST NOTIFICATIONS
// ===========================================
let toastTimer = null;

function showToast(message, type = '') {
  const toast = document.getElementById('toast');
  if (toastTimer) clearTimeout(toastTimer);
  toast.className = 'toast ' + type;
  toast.textContent = message;
  // Force reflow
  toast.offsetHeight;
  toast.classList.add('visible');
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 2500);
}

// ===========================================
// 4. UI CONTROLLER
// ===========================================
const state = {
  currentView: 'home',
  dialect: 'MySQL',
  history: [],
};

const dialectIcons = {
  'MySQL': '🐬',
  'PostgreSQL': '🐘',
  'SQL Server': '🖥️',
};

// --- Navigation ---
function navigateTo(viewName) {
  state.currentView = viewName;
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.view === viewName);
  });
  document.querySelectorAll('.view').forEach(v => {
    v.classList.toggle('active', v.id === `view-${viewName}`);
  });
  if (viewName === 'history') renderHistory();
  if (viewName === 'home') {
    startTypewriter();
    // Re-trigger reveal animations
    setTimeout(() => initScrollReveal(), 100);
  }
}

// --- Translator ---
function traducir() {
  const input = document.getElementById('translator-input');
  const console_ = document.getElementById('sql-console');
  const errorBanner = document.getElementById('error-banner');
  const tokenBody = document.getElementById('token-tbody');
  const symbolList = document.getElementById('symbol-list');
  const frase = input.value.trim();
  if (!frase) return;

  errorBanner.classList.remove('visible');
  console_.classList.remove('error', 'waiting', 'glow');

  try {
    const { sql, symbolTable, tokens } = compilarYTraducir(frase, state.dialect);

    // Syntax-highlighted SQL
    console_.innerHTML = highlightSQL(sql);

    // Glow effect
    console_.classList.add('glow');
    setTimeout(() => console_.classList.remove('glow'), 1500);

    // Token table with staggered animation
    const visibleTokens = tokens.filter(t => t.type !== 'EOF');
    tokenBody.innerHTML = visibleTokens.map((t, i) =>
      `<tr style="animation-delay:${i * 0.05}s"><td class="token-type">${t.type}</td><td class="token-value">${t.value}</td></tr>`
    ).join('');

    // Symbol table
    if (symbolTable.length) {
      symbolList.innerHTML = symbolTable.map((s, i) =>
        `<li><span class="idx">[${i}]</span>${s}</li>`
      ).join('');
    } else {
      symbolList.innerHTML = '<li style="color:var(--text-muted)">Vacía</li>';
    }

    addToHistory(frase, sql);
    showToast('Traducción exitosa', 'success');

  } catch (e) {
    if (e instanceof LexicalError) showError('ERROR LÉXICO', e.message);
    else if (e instanceof SyntaxError2) showError('ERROR SINTÁCTICO', e.message);
    else showError('ERROR INTERNO', e.message);
    console_.textContent = '-- ERROR DETECTADO --';
    console_.classList.add('error');
    tokenBody.innerHTML = '';
    symbolList.innerHTML = '<li style="color:var(--text-muted)">---</li>';
  }
}

function showError(title, msg) {
  const banner = document.getElementById('error-banner');
  banner.textContent = `${title}: ${msg}`;
  banner.classList.add('visible');
}

function limpiar() {
  document.getElementById('translator-input').value = '';
  document.getElementById('error-banner').classList.remove('visible');
  const con = document.getElementById('sql-console');
  con.innerHTML = '<span class="sql-comment">-- Esperando comando...</span>';
  con.classList.remove('error', 'glow');
  con.classList.add('waiting');
  document.getElementById('token-tbody').innerHTML = '';
  document.getElementById('symbol-list').innerHTML = '<li style="color:var(--text-muted)">---</li>';
}

function copiarSQL() {
  const con = document.getElementById('sql-console');
  const text = con.textContent;
  if (!text || text.startsWith('--') || text.startsWith('>')) return;

  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById('btn-copy');
    btn.classList.add('copied');
    btn.textContent = '✓ Copiado';
    showToast('SQL copiado al portapapeles', 'success');
    setTimeout(() => {
      btn.classList.remove('copied');
      btn.textContent = '📋 Copiar SQL';
    }, 1500);
  });
}

// --- History ---
function addToHistory(frase, sql) {
  const now = new Date();
  const time = now.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
  state.history.unshift({ frase, sql, time });
  if (state.history.length > 10) state.history.pop();
}

function renderHistory() {
  const container = document.getElementById('history-list');
  if (!state.history.length) {
    container.innerHTML = `
      <div class="history-empty">
        <div class="empty-icon">📜</div>
        <p>No hay consultas recientes.</p>
        <small>Las traducciones que realices aparecerán aquí</small>
      </div>`;
    return;
  }
  container.innerHTML = state.history.map(h => `
    <div class="history-item">
      <div class="history-meta">
        <div class="history-input"><strong>Entrada:</strong> ${escapeHtml(h.frase)}</div>
        <span class="history-time">${h.time}</span>
      </div>
      <div class="history-sql">${escapeHtml(h.sql)}</div>
    </div>
  `).join('');
}

// --- Challenge ---
function verificarReto() {
  const input = document.getElementById('challenge-input').value.trim();
  const result = document.getElementById('challenge-result');
  if (!input) return;
  try {
    const { sql } = compilarYTraducir(input, state.dialect);
    const sqlClean = sql.replace(/\n/g, ' ').trim().toLowerCase();
    if (sqlClean.includes('empleados') && sqlClean.includes('edad') && sqlClean.includes('>') && sqlClean.includes('18')) {
      result.className = 'challenge-result success';
      result.textContent = '🎉 ¡Excelente! Has formado la consulta correcta aplicando la gramática del proyecto.';
      showToast('¡Reto completado!', 'success');
    } else {
      result.className = 'challenge-result fail';
      result.textContent = `Tu consulta generó: ${sql} — Revisa las palabras clave o los valores.`;
    }
  } catch (e) {
    result.className = 'challenge-result fail';
    result.textContent = '❌ Hay un error en tu sintaxis. ¡Sigue intentándolo!';
  }
}

// --- Expandable ---
function toggleExpand(btn) {
  const content = btn.nextElementSibling;
  const isOpen = content.classList.toggle('open');
  btn.textContent = isOpen ? '▾ Ocultar Detalles' : '▸ Ver Detalles';
}

// --- Config ---
function updateDialect(val) {
  state.dialect = val;
  // Update dialect display in translator
  const display = document.getElementById('dialect-name');
  const icon = document.querySelector('.dialect-icon');
  if (display) display.textContent = val;
  if (icon) icon.textContent = dialectIcons[val] || '🐬';
  showToast(`Dialecto cambiado a ${val}`);
}

// --- Typewriter animation ---
let typewriterTimeout = null;

function startTypewriter() {
  const phrases = [
    { input: 'mostrar ventas con total mayor a 500', output: 'SELECT * FROM ventas\nWHERE total > 500;' },
    { input: 'listar clientes donde edad igual a 25', output: 'SELECT * FROM clientes\nWHERE edad = 25;' },
    { input: 'ver productos con precio menor a 100', output: 'SELECT * FROM productos\nWHERE precio < 100;' },
  ];

  const inputEl = document.getElementById('typewriter');
  const outputEl = document.getElementById('demo-output');
  if (!inputEl || !outputEl) return;
  if (typewriterTimeout) clearTimeout(typewriterTimeout);

  let phraseIdx = 0;

  function typePhrase() {
    const phrase = phrases[phraseIdx % phrases.length];
    inputEl.textContent = '';
    outputEl.textContent = '';
    let charIdx = 0;

    function typeChar() {
      if (charIdx < phrase.input.length) {
        inputEl.textContent += phrase.input[charIdx];
        charIdx++;
        typewriterTimeout = setTimeout(typeChar, 40 + Math.random() * 25);
      } else {
        typewriterTimeout = setTimeout(() => {
          outputEl.textContent = phrase.output;
          typewriterTimeout = setTimeout(() => {
            phraseIdx++;
            typePhrase();
          }, 3000);
        }, 500);
      }
    }
    typeChar();
  }
  typePhrase();
}

// --- Scroll Reveal ---
function initScrollReveal() {
  const reveals = document.querySelectorAll('#view-home .reveal');
  reveals.forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 150 * (i + 1));
  });
}

// --- Animated Stats Counter ---
function animateStats() {
  document.querySelectorAll('.stat-num[data-target]').forEach(el => {
    const target = parseInt(el.dataset.target);
    let current = 0;
    const step = Math.ceil(target / 20);
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      el.textContent = current;
    }, 60);
  });
}

// --- Utilities ---
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function toggleSidebar() {
  document.querySelector('.sidebar').classList.toggle('open');
}

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
  // Initialize login particles
  createLoginParticles();

  // Focus on username input
  const loginUser = document.getElementById('login-user');
  if (loginUser) loginUser.focus();

  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      navigateTo(btn.dataset.view);
      document.querySelector('.sidebar').classList.remove('open');
    });
  });

  document.getElementById('translator-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') traducir();
  });

  document.getElementById('challenge-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') verificarReto();
  });

  document.getElementById('dialect-select').addEventListener('change', e => {
    updateDialect(e.target.value);
  });

  // Don't navigate or animate stats until login completes
});
