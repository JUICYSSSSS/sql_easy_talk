/* =============================================
   SQL-Easy Talk — Compiler Engine + UI Logic
   Premium edition with syntax highlighting,
   toast notifications, scroll reveal, stats,
   and login screen
   ==   =========================================== */

const languageStrings = {
  en: {
    '🌐 Idioma': '🌐 Language',
    '🌐 Idioma de la interfaz': '🌐 Interface language',
    'Idioma de la interfaz': 'Interface language',
    'Elige el idioma de la interfaz de la aplicación': 'Choose the language used by the application',
    'Intérprete Interactivo de Lenguaje Natural a SQL': 'Interactive Natural Language to SQL Interpreter',
    'Bienvenido': 'Welcome',
    'Inicia sesión para acceder al compilador': 'Sign in to access the compiler',
    'Usuario': 'Username',
    'Contraseña': 'Password',
    'Iniciar Sesión': 'Sign in',
    'Plataforma Educativa Segura': 'Secure Learning Platform',
    'Compilador & Intérprete': 'Compiler & Interpreter',
    'Inicio': 'Home',
    'Traductor': 'Translator',
    'Academia SQL': 'SQL Academy',
    'Historial': 'History',
    'Configuración': 'Settings',
    'Cerrar sesión': 'Sign out',
    'Intérprete Interactivo': 'Interactive Interpreter',
    'SQL-Easy Talk ⚡ — Intérprete Interactivo': 'SQL-Easy Talk ⚡ — Interactive Interpreter',
    'INTÉRPRETE DE LENGUAJE NATURAL A SQL': 'NATURAL LANGUAGE TO SQL INTERPRETER',
    'Escribe en': 'Write in',
    'Obtén': 'Get',
    'al Instante': 'instantly',
    'SQL-Easy Talk es un compilador interactivo que transforma frases en lenguaje natural': 'SQL-Easy Talk is an interactive compiler that transforms natural-language phrases',
    'a consultas SQL válidas. Aprende, practica y traduce — todo desde tu navegador.': 'into valid SQL queries. Learn, practice, and translate — all in your browser.',
    '🚀 Comenzar a Traducir': '🚀 Start translating',
    '📚 Explorar Academia': '📚 Explore the academy',
    'Entrada': 'Input',
    'Frase en español': 'Spanish phrase',
    'Tokens (DFA)': 'Tokens (DFA)',
    'Validación (CFG)': 'Validation (CFG)',
    'Consulta lista': 'Query ready',
    'Análisis Léxico': 'Lexical Analysis',
    'Tokeniza tu frase usando un Autómata Finito Determinista (DFA) con expresiones regulares.': 'Tokenize your phrase with a Deterministic Finite Automaton (DFA) using regular expressions.',
    'Parser Recursivo': 'Recursive Parser',
    'Valida la estructura gramatical mediante una Gramática Libre de Contexto (CFG).': 'Validate the grammatical structure using a Context-Free Grammar (CFG).',
    'Multi-Dialecto': 'Multiple SQL dialects',
    'Genera SQL para MySQL, PostgreSQL y SQL Server adaptando la sintaxis automáticamente.': 'Generate SQL for MySQL, PostgreSQL, and SQL Server with automatically adapted syntax.',
    'Dialectos SQL': 'SQL dialects',
    'Tipos de Token': 'Token types',
    'Fases del Compilador': 'Compiler stages',
    'Consultas Posibles': 'Possible queries',
    'Terminal — SQL-Easy Talk': 'Terminal — SQL-Easy Talk',
    'Intérprete': 'Interpreter',
    'Compilador & Intérprete de Lenguaje Natural a SQL • Tecnologías Educativas • 2025': 'Natural Language to SQL Compiler & Interpreter • Educational Technology • 2025',
    'Entorno de Traducción': 'Translation workspace',
    'Escribe tu consulta en lenguaje natural para generar la estructura SQL correspondiente.': 'Write a natural-language query to generate the corresponding SQL statement.',
    '✨ Traducir a SQL': '✨ Translate to SQL',
    '📋 Copiar SQL': '📋 Copy SQL',
    '✕ Limpiar': '✕ Clear',
    'SQL Generado': 'Generated SQL',
    '-- Esperando comando...': '-- Waiting for a command...',
    'Visualizador de Tokens': 'Token viewer',
    'Token ID': 'Token ID',
    'Lexema': 'Lexeme',
    'Tabla de Símbolos': 'Symbol table',
    'Identificadores extraídos por el Lexer': 'Identifiers extracted by the lexer',
    'SQL-Easy Talk es un compilador interactivo que transforma frases en lenguaje natural a consultas SQL válidas. Aprende, practica y traduce — todo desde tu navegador.': 'SQL-Easy Talk is an interactive compiler that transforms natural-language phrases into valid SQL queries. Learn, practice, and translate — all in your browser.',
    'Dialecto Activo': 'Active dialect',
    'Aprende los conceptos fundamentales de Compiladores aplicados a nuestro Traductor de SQL.': 'Learn the compiler fundamentals behind our SQL translator.',
    '1. Análisis Léxico (Tokens)': '1. Lexical Analysis (Tokens)',
    'El': 'The',
    'toma la frase que escribes y la divide en componentes fundamentales (Tokens) usando un Autómata Finito Determinista.': 'takes your phrase and splits it into tokens using a Deterministic Finite Automaton.',
    '▸ Ver Detalles': '▸ View details',
    '▾ Ocultar Detalles': '▾ Hide details',
    '2. Análisis Sintáctico (Parser)': '2. Syntax Analysis (Parser)',
    'usa Descenso Recursivo para asegurar que los Tokens tengan sentido gramatical según la CFG.': 'uses recursive descent to check that tokens follow the CFG grammar.',
    '3. Generación de Código': '3. Code Generation',
    'convierte los componentes validados en una consulta SQL real, adaptada al dialecto seleccionado.': 'converts the validated components into a SQL query adapted to the selected dialect.',
    '4. Guía de Motores (RDBMS)': '4. Database Engines (RDBMS)',
    'Los sistemas gestores de bases de datos más populares difieren en su sintaxis y capacidades.': 'Popular database management systems differ in syntax and capabilities.',
    'Expresiones regulares definidas:': 'Regular expressions:',
    '• Acción (SELECT_KW):': '• Action (SELECT_KW):',
    '• Condición (WHERE_KW):': '• Condition (WHERE_KW):',
    '• Operador (OPERATOR):': '• Operator (OPERATOR):',
    '• Entidad (ENTITY):': '• Entity (ENTITY):',
    '• Número (NUMBER):': '• Number (NUMBER):',
    'Gramática Libre de Contexto (CFG):': 'Context-Free Grammar (CFG):',
    'Ejemplo válido:': 'Valid example:',
    'Dialectos soportados:': 'Supported dialects:',
    '• MySQL — Popular en la web, open-source': '• MySQL — Popular on the web, open source',
    '• PostgreSQL — El más avanzado, ANSI SQL': '• PostgreSQL — Advanced, ANSI SQL',
    '• SQL Server — Microsoft, T-SQL': '• SQL Server — Microsoft, T-SQL',
    '🔥 Práctica Interactiva': '🔥 Interactive practice',
    'Escribe una frase en español para generar exactamente la siguiente consulta:': 'Write a Spanish phrase that generates exactly this query:',
    'Verificar Respuesta': 'Check answer',
    '🎥 Recursos Multimedia': '🎥 Learning resources',
    'Material extra y documentación oficial.': 'Additional material and official documentation.',
    'Video Tutoriales': 'Video tutorials',
    'Historial de Traducciones': 'Translation history',
    'Tus últimas 10 consultas traducidas durante esta sesión.': 'Your last 10 translated queries from this session.',
    'No hay consultas recientes.': 'No recent queries.',
    'Las traducciones que realices aparecerán aquí': 'Your translations will appear here',
    'Configuración del Motor': 'Engine settings',
    'Ajusta los parámetros del compilador y la interfaz.': 'Adjust the compiler and interface settings.',
    '🐬 Dialecto SQL Destino': '🐬 Target SQL dialect',
    'Define el formato de salida de las consultas generadas': 'Choose the output format for generated queries',
    'Gestión de Cuenta': 'Account management',
    '👤 Cuenta actual': '👤 Current account',
    'Has iniciado sesión como': 'Signed in as',
    '⏻ Cerrar Sesión': '⏻ Sign out',
    'Soporte Institucional (TecNM ITT)': 'Institutional support (TecNM ITT)',
    'Si los problemas persisten después de consultar la sección de solución de problemas, puedes recurrir a los canales oficiales de soporte del': 'If problems persist after checking the troubleshooting section, contact the official support channels at',
    'Administrador del Sistema': 'System administrator',
    'Departamento': 'Department',
    'Ingeniería en Sistemas Computacionales (TecNM ITT)': 'Computer Systems Engineering (TecNM ITT)',
    'Correo Electrónico': 'Email',
    'Horario de Atención': 'Support hours',
    'Lunes a Viernes de 8:00 AM a 6:00 PM (Hora Pacífico)': 'Monday–Friday, 8:00 AM–6:00 PM (Pacific Time)',
    'Reporte de Bugs': 'Bug reports',
    'Puede enviar un log de errores adjuntando la frase que causó el fallo a nuestro correo electrónico para la mejora continua del diccionario principal del': 'Email an error log and the phrase that caused the problem to help us improve the main',
    '👉 Solo se permiten letras, números y espacios.': '👉 Only letters, numbers, and spaces are allowed.',
    'Vacía': 'Empty',
    '⚠️ ENTRADA VACÍA': '⚠️ EMPTY INPUT',
    'Escribe una frase antes de traducir. Ejemplo: mostrar ventas con total mayor a 500': 'Enter a phrase before translating. Example: mostrar ventas con total mayor a 500',
    '⚠️ ENTRADA MUY LARGA': '⚠️ INPUT TOO LONG',
    'La frase tiene': 'The phrase has',
    'caracteres. El máximo permitido es 200.': 'characters. The maximum is 200.',
    '⚠️ SINTAXIS INCORRECTA': '⚠️ INVALID SYNTAX',
    'La frase debe comenzar con una palabra de acción: mostrar, ver o listar.': 'The phrase must start with an action word: mostrar, ver, or listar.',
    'Ejemplo: "mostrar clientes con edad mayor a 18"': 'Example: "mostrar clientes con edad mayor a 18"',
    '🔤 ERROR LÉXICO': '🔤 LEXICAL ERROR',
    'Solo se permiten letras, números y espacios.': 'Only letters, numbers, and spaces are allowed.',
    '🌳 ERROR SINTÁCTICO': '🌳 SYNTAX ERROR',
    'Comienza con: mostrar, ver o listar': 'Start with: mostrar, ver, or listar',
    'Escribe el nombre de una tabla o campo (sin espacios)': 'Enter a table or column name (no spaces)',
    'Usa: mayor a, menor a o igual a': 'Use: mayor a, menor a, or igual a',
    'Escribe un número entero positivo (ej: 18, 500, 100)': 'Enter a positive integer (e.g. 18, 500, 100)',
    'La consulta tiene elementos extra al final.': 'The query has extra elements at the end.',
    'Estructura válida: [acción] [tabla] [con/donde/que] [campo] [operador] [número]': 'Valid structure: [action] [table] [con/donde/que] [column] [operator] [number]',
    '⚙️ ERROR INTERNO': '⚙️ INTERNAL ERROR',
    '-- ERROR DETECTADO --': '-- ERROR DETECTED --',
    '✅ Traducción exitosa': '✅ Translation successful',
    '⚠️ No hay SQL para copiar. Traduce una frase primero.': '⚠️ No SQL to copy. Translate a phrase first.',
    '✓ Copiado': '✓ Copied',
    '📋 SQL copiado al portapapeles': '📋 SQL copied to clipboard',
    '❌ No se pudo copiar. Selecciona el texto manualmente.': '❌ Could not copy. Select the text manually.',
    'Entrada:': 'Input:',
    '⚠️ Escribe una frase antes de verificar. Ejemplo: mostrar empleados con edad mayor a 18': '⚠️ Enter a phrase before checking. Example: mostrar empleados con edad mayor a 18',
    '⚠️ La frase debe comenzar con: mostrar, ver o listar': '⚠️ The phrase must start with: mostrar, ver, or listar',
    '🎉 ¡Excelente! Has formado la consulta correcta aplicando la gramática del proyecto.': '🎉 Great! You built the correct query using the project grammar.',
    '¡Reto completado! 🏆': 'Challenge completed! 🏆',
    'Necesitas: tabla =': 'Required: table =',
    'campo =': 'column =',
    'operador =': 'operator =',
    'valor =': 'value =',
    'Verifica que no uses caracteres especiales.': 'Check that you are not using special characters.',
    'Revisa el orden: [acción] [tabla] [con/donde/que] [campo] [operador] [número]': 'Check the order: [action] [table] [con/donde/que] [column] [operator] [number]',
    'Dialecto cambiado a': 'Dialect changed to',
    'Cierre de sesión seguro': 'You have signed out safely',
    '⚠️ Por favor ingresa tu usuario y contraseña': '⚠️ Please enter your username and password',
    '⚠️ El campo Usuario está vacío': '⚠️ The username field is empty',
    '⚠️ El campo Contraseña está vacío': '⚠️ The password field is empty',
    '❌ Usuario o contraseña incorrectos. Intenta de nuevo.': '❌ Incorrect username or password. Please try again.',
    'Iniciando sesión…': 'Signing in…',
    'Ingresa tu usuario': 'Enter your username',
    'Ingresa tu contraseña': 'Enter your password',
    'Ej: mostrar ventas con total mayor a 500': 'Example: mostrar ventas con total mayor a 500',
    'Ej: mostrar ...': 'Example: mostrar ...',
    'Abrir menú': 'Open menu',
    'Cerrar sesión': 'Sign out',
    'loginHint': 'Sign in with your account to continue',
    '⚠️ La frase tiene demasiados caracteres': '⚠️ The phrase is too long',
    'caracteres — cerca del límite': 'characters — nearing the limit',
    '⚠️ Tu consulta generó:': '⚠️ Your query produced:',
    'Necesitas: tabla =': 'Required: table =',
    ' ⚠️ Entrada vacía.': ' ⚠️ Empty input.',
    '— Solo se permiten letras, números y espacios.': '— Only letters, numbers, and spaces are allowed.',
    'No hay SQL para copiar. Traduce una frase primero.': 'No SQL to copy. Translate a phrase first.',
    'Dialecto cambiado a ': 'Dialect changed to ',
  },
};

const localizationSources = new WeakMap();
const localizedAttributes = new WeakMap();
let currentLanguage = 'es';
let currentError = null;

function translate(key) {
  return languageStrings[currentLanguage]?.[key] || key;
}

function applyLanguage(language) {
  currentLanguage = language;
  document.documentElement.lang = language;
  document.title = languageStrings[language]?.['SQL-Easy Talk ⚡ — Intérprete Interactivo']
    || 'SQL-Easy Talk ⚡ — Intérprete Interactivo';

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    if (!localizationSources.has(node)) localizationSources.set(node, node.nodeValue || '');
    const source = localizationSources.get(node);
    const key = source.replace(/\s+/g, ' ').trim();
    const translated = languageStrings[language]?.[key];
    if (translated) {
      const leading = source.match(/^\s*/)?.[0] || '';
      const trailing = source.match(/\s*$/)?.[0] || '';
      node.nodeValue = `${leading}${translated}${trailing}`;
    } else if (node.nodeValue !== source) {
      node.nodeValue = source;
    }
  }

  document.querySelectorAll('[placeholder], [aria-label], [title]').forEach(element => {
    ['placeholder', 'aria-label', 'title'].forEach(attribute => {
      if (!element.hasAttribute(attribute)) return;
      let sources = localizedAttributes.get(element);
      if (!sources) {
        sources = {};
        localizedAttributes.set(element, sources);
      }
      if (sources[attribute] === undefined) sources[attribute] = element.getAttribute(attribute);
      const source = sources[attribute];
      element.setAttribute(attribute, languageStrings[language]?.[source] || source);
    });
  });

  document.querySelectorAll('#login-language-select, #language-select, #config-language-select').forEach(select => {
    select.value = language;
  });

  if (currentError) {
    const message = language === 'en' && currentError.englishMessage
      ? currentError.englishMessage
      : translate(currentError.message);
    document.getElementById('error-banner').textContent =
      `${translate(currentError.title)}: ${message}`;
  }
}

function setLanguage(language) {
  if (!Object.prototype.hasOwnProperty.call(languageStrings, language) && language !== 'es') {
    throw new RangeError(`Unsupported language: ${language}`);
  }
  localStorage.setItem('sqlEasyTalkLanguage', language);
  applyLanguage(language);
}

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

  if (!user && !pass) {
    errorEl.textContent = translate('⚠️ Por favor ingresa tu usuario y contraseña');
    errorEl.classList.add('visible');
    document.getElementById('login-user').focus();
    return;
  }
  if (!user) {
    errorEl.textContent = translate('⚠️ El campo Usuario está vacío');
    errorEl.classList.add('visible');
    document.getElementById('login-user').focus();
    return;
  }
  if (!pass) {
    errorEl.textContent = translate('⚠️ El campo Contraseña está vacío');
    errorEl.classList.add('visible');
    document.getElementById('login-pass').focus();
    return;
  }

  // Show loading state
  btn.classList.add('loading');
  btn.disabled = true;

  // Simulate authentication delay for UX
  setTimeout(() => {
    // Validate credentials
    if (user === 'admin' && pass === '1234') {
      // Success!
      card.classList.add('success');
      btn.classList.remove('loading');
      btn.disabled = false;

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
      btn.disabled = false;
      errorEl.textContent = translate('❌ Usuario o contraseña incorrectos. Intenta de nuevo.');
      errorEl.classList.add('visible');

      // Shake the inputs
      document.getElementById('login-user').style.borderColor = 'var(--red)';
      document.getElementById('login-pass').style.borderColor = 'var(--red)';
      // Clear password field for security
      document.getElementById('login-pass').value = '';
      setTimeout(() => {
        document.getElementById('login-user').style.borderColor = '';
        document.getElementById('login-pass').style.borderColor = '';
        document.getElementById('login-pass').focus();
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
  
  showToast(translate('Cierre de sesión seguro'), 'success');
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
  return sql.replace(/\b(SELECT|FROM|WHERE)\b|(\*)|(\d+)|([><=])|(\[|\])/gi,
    (match, keyword, wildcard, number) => {
      const className = keyword || wildcard ? 'sql-keyword' : number ? 'sql-number' : 'sql-operator';
      return `<span class="${className}">${escapeHtml(match)}</span>`;
    });
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

  // Validate empty input
  if (!frase) {
    showError('⚠️ ENTRADA VACÍA', 'Escribe una frase antes de traducir. Ejemplo: mostrar ventas con total mayor a 500');
    input.focus();
    return;
  }

  // Validate max length
  if (frase.length > 200) {
    const message = `La frase tiene ${frase.length} caracteres. El máximo permitido es 200.`;
    showError('⚠️ ENTRADA MUY LARGA', message,
      `The phrase has ${frase.length} characters. The maximum is 200.`);
    return;
  }

  // Validate it starts with a valid keyword
  const startsValid = /^(mostrar|ver|listar)\b/i.test(frase);
  if (!startsValid) {
    const message = 'La frase debe comenzar con una palabra de acción: mostrar, ver o listar. ' +
      'Ejemplo: "mostrar clientes con edad mayor a 18"';
    showError('⚠️ SINTAXIS INCORRECTA', message,
      'The phrase must start with an action word: mostrar, ver, or listar. ' +
      'Example: "mostrar clientes con edad mayor a 18"');
    return;
  }

  errorBanner.classList.remove('visible');
  currentError = null;
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
    showToast(translate('✅ Traducción exitosa'), 'success');

  } catch (e) {
    let friendlyMsg = e.message;
    let englishFriendlyMsg;
    // Make error messages more user friendly
    if (e instanceof LexicalError) {
      const message = `${friendlyMsg} — Solo se permiten letras, números y espacios.`;
      showError('🔤 ERROR LÉXICO', message,
        `Unrecognized symbol in the input: ${friendlyMsg}. Only letters, numbers, and spaces are allowed.`);
    } else if (e instanceof SyntaxError2) {
      // Provide contextual hints based on what was expected
      if (friendlyMsg.includes("SELECT_KW")) {
        friendlyMsg = 'Comienza con: mostrar, ver o listar';
      } else if (friendlyMsg.includes("ENTITY")) {
        friendlyMsg = 'Escribe el nombre de una tabla o campo (sin espacios)';
      } else if (friendlyMsg.includes("OPERATOR")) {
        friendlyMsg = 'Usa: mayor a, menor a o igual a';
      } else if (friendlyMsg.includes("NUMBER")) {
        friendlyMsg = 'Escribe un número entero positivo (ej: 18, 500, 100)';
      } else if (friendlyMsg.includes("Elementos sobrantes")) {
        friendlyMsg = 'La consulta tiene elementos extra al final. ' +
          'Estructura válida: [acción] [tabla] [con/donde/que] [campo] [operador] [número]';
      }
      englishFriendlyMsg = translate(friendlyMsg);
      showError('🌳 ERROR SINTÁCTICO', friendlyMsg, englishFriendlyMsg);
    } else {
      showError('⚙️ ERROR INTERNO', friendlyMsg);
    }
    console_.textContent = translate('-- ERROR DETECTADO --');
    console_.classList.add('error');
    tokenBody.innerHTML = '';
    symbolList.innerHTML = '<li style="color:var(--text-muted)">---</li>';
  }
}

function showError(title, msg, englishMessage) {
  currentError = { title, message: msg, englishMessage };
  const banner = document.getElementById('error-banner');
  const message = currentLanguage === 'en' && englishMessage
    ? englishMessage
    : translate(msg);
  banner.textContent = `${translate(title)}: ${message}`;
  banner.classList.add('visible');
}

function limpiar() {
  document.getElementById('translator-input').value = '';
  document.getElementById('error-banner').classList.remove('visible');
  currentError = null;
  const con = document.getElementById('sql-console');
  con.innerHTML = `<span class="sql-comment">${translate('-- Esperando comando...')}</span>`;
  con.classList.remove('error', 'glow');
  con.classList.add('waiting');
  document.getElementById('token-tbody').innerHTML = '';
  document.getElementById('symbol-list').innerHTML = '<li style="color:var(--text-muted)">---</li>';
}

function copiarSQL() {
  const con = document.getElementById('sql-console');
  const text = con.textContent.trim();
  // Don't copy if it's the placeholder or error message
  if (!text || con.classList.contains('waiting') || con.classList.contains('error')) {
    showToast(`⚠️ ${translate('No hay SQL para copiar. Traduce una frase primero.')}`, 'error');
    return;
  }

  if (!navigator.clipboard) {
    // Fallback for environments without clipboard API
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast(translate('📋 SQL copiado al portapapeles'), 'success');
    return;
  }

  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById('btn-copy');
    btn.classList.add('copied');
    btn.textContent = translate('✓ Copiado');
    showToast(translate('📋 SQL copiado al portapapeles'), 'success');
    setTimeout(() => {
      btn.classList.remove('copied');
      btn.textContent = translate('📋 Copiar SQL');
    }, 1500);
  }).catch(() => {
    showToast(translate('❌ No se pudo copiar. Selecciona el texto manualmente.'), 'error');
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
        <p>${translate('No hay consultas recientes.')}</p>
        <small>${translate('Las traducciones que realices aparecerán aquí')}</small>
      </div>`;
    applyLanguage(currentLanguage);
    return;
  }
  container.innerHTML = state.history.map(h => `
    <div class="history-item">
      <div class="history-meta">
        <div class="history-input"><strong>${translate('Entrada:')}</strong> ${escapeHtml(h.frase)}</div>
        <span class="history-time">${h.time}</span>
      </div>
      <div class="history-sql">${escapeHtml(h.sql)}</div>
    </div>
  `).join('');
  applyLanguage(currentLanguage);
}

// --- Challenge ---
function verificarReto() {
  const inputEl = document.getElementById('challenge-input');
  const input = inputEl.value.trim();
  const result = document.getElementById('challenge-result');

  if (!input) {
    result.className = 'challenge-result fail';
    result.textContent = translate('⚠️ Escribe una frase antes de verificar. Ejemplo: mostrar empleados con edad mayor a 18');
    inputEl.focus();
    return;
  }

  // Check that it starts with a valid action keyword
  if (!/^(mostrar|ver|listar)\b/i.test(input)) {
    result.className = 'challenge-result fail';
    result.textContent = translate('⚠️ La frase debe comenzar con: mostrar, ver o listar');
    return;
  }

  try {
    const { sql } = compilarYTraducir(input, 'MySQL'); // Always use MySQL for challenge comparison
    const sqlClean = sql.replace(/\n/g, ' ').trim().toLowerCase();
    // Accept any valid SELECT on empleados with edad > 18
    if (
      sqlClean.includes('from empleados') &&
      sqlClean.includes('where edad') &&
      sqlClean.includes('>') &&
      sqlClean.includes('18')
    ) {
      result.className = 'challenge-result success';
      result.textContent = translate('🎉 ¡Excelente! Has formado la consulta correcta aplicando la gramática del proyecto.');
      showToast(translate('¡Reto completado! 🏆'), 'success');
    } else {
      result.className = 'challenge-result fail';
      result.innerHTML =
        `${translate('⚠️ Tu consulta generó:')}<br><code>${escapeHtml(sql)}</code><br><br>` +
        `${translate('Necesitas: tabla =')} <strong>empleados</strong>, ${translate('campo =')} <strong>edad</strong>, ${translate('operador =')} <strong>mayor a</strong>, ${translate('valor =')} <strong>18</strong>`;
    }
  } catch (e) {
    result.className = 'challenge-result fail';
    let hint = '';
    if (e instanceof LexicalError) hint = 'Verifica que no uses caracteres especiales.';
    else if (e instanceof SyntaxError2) hint = 'Revisa el orden: [acción] [tabla] [con/donde/que] [campo] [operador] [número]';
    result.textContent = currentLanguage === 'en'
      ? `❌ Syntax error: ${e.message}. ${hint ? translate(hint) : ''}`
      : `❌ Error en tu sintaxis: ${e.message}. ${hint}`;
  }
}

// --- Expandable ---
function toggleExpand(btn) {
  const content = btn.nextElementSibling;
  const isOpen = content.classList.toggle('open');
  btn.textContent = translate(isOpen ? '▾ Ocultar Detalles' : '▸ Ver Detalles');
}

// --- Config ---
function updateDialect(val) {
  state.dialect = val;
  // Update dialect display in translator
  const display = document.getElementById('dialect-name');
  const icon = document.querySelector('.dialect-icon');
  if (display) display.textContent = val;
  if (icon) icon.textContent = dialectIcons[val] || '🐬';
  showToast(`${translate('Dialecto cambiado a ')}${val}`);
}

// --- Typewriter animation ---
let typewriterTimeout = null;

function startTypewriter() {
  const phrases = [
    { input: 'mostrar ventas con total mayor a 500', output: 'SELECT * FROM ventas\nWHERE total > 500;' },
    { input: 'listar clientes donde edad igual a 25', output: 'SELECT * FROM clientes\nWHERE edad = 25;' },
    { input: 'ver productos con precio menor a 100', output: 'SELECT * FROM productos\nWHERE precio < 100;' },
    { input: 'mostrar empleados con salario mayor a 1000', output: 'SELECT * FROM empleados\nWHERE salario > 1000;' },
  ];

  const inputEl = document.getElementById('typewriter');
  const outputEl = document.getElementById('demo-output');
  if (!inputEl || !outputEl) return;
  // Clear any existing typewriter loop
  if (typewriterTimeout) {
    clearTimeout(typewriterTimeout);
    typewriterTimeout = null;
  }

  let phraseIdx = 0;
  let isRunning = true;

  function typePhrase() {
    if (!isRunning) return;
    const phrase = phrases[phraseIdx % phrases.length];
    inputEl.textContent = '';
    outputEl.textContent = '';
    let charIdx = 0;

    function typeChar() {
      if (!isRunning) return;
      if (charIdx < phrase.input.length) {
        inputEl.textContent += phrase.input[charIdx];
        charIdx++;
        typewriterTimeout = setTimeout(typeChar, 40 + Math.random() * 25);
      } else {
        typewriterTimeout = setTimeout(() => {
          if (!isRunning) return;
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

  // Return a stop function so we can stop when navigating away
  return () => { isRunning = false; };
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
  const savedLanguage = localStorage.getItem('sqlEasyTalkLanguage');
  applyLanguage(savedLanguage === 'en' ? 'en' : 'es');

  // Initialize login particles
  createLoginParticles();

  // Focus on username input
  const loginUser = document.getElementById('login-user');
  if (loginUser) loginUser.focus();

  // Show credentials hint in console (dev helper)
  console.info('SQL-Easy Talk — Login: usuario=admin, contraseña=1234');

  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      navigateTo(btn.dataset.view);
      document.querySelector('.sidebar').classList.remove('open');
    });
  });

  document.getElementById('translator-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') traducir();
  });

  // Character counter hint for translator input
  document.getElementById('translator-input').addEventListener('input', e => {
    const len = e.target.value.length;
    if (len > 180) {
      showToast(`⚠️ ${len}/200 caracteres — cerca del límite`, '');
    }
  });

  document.getElementById('challenge-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') verificarReto();
  });

  document.getElementById('dialect-select').addEventListener('change', e => {
    updateDialect(e.target.value);
  });

  document.querySelectorAll('#login-language-select, #language-select, #config-language-select').forEach(select => {
    select.addEventListener('change', e => setLanguage(e.target.value));
  });

  // Keyboard shortcut: Escape clears the error banner
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.getElementById('error-banner').classList.remove('visible');
      currentError = null;
    }
  });

  // Don't navigate or animate stats until login completes
});
