import re
import tkinter as tk
import customtkinter as ctk
import webbrowser

# ==========================================
# ==========================================
# 1. CAPA DE COMPILADOR (LÓGICA DE AUTÓMATAS)
# ==========================================
# ==========================================

class LexicalError(Exception):
    pass

class SyntaxError(Exception):
    pass

class Token:
    def __init__(self, type_: str, value: str):
        self.type = type_
        self.value = value
    def __repr__(self):
        return f"Token({self.type}, {repr(self.value)})"

class Lexer:
    """Implementación del Autómata Finito Determinista (DFA)"""
    TOKEN_SPECIFICATION = [
        ('SELECT_KW', r'\b(mostrar|ver|listar)\b'),            # Acción
        ('WHERE_KW',  r'\b(con|donde|que)\b'),                 # Condición
        ('OPERATOR',  r'\b(mayor a|menor a|igual a|>|<|=)\b'), # Operadores relacionales
        ('NUMBER',    r'\d+'),                                 # Constantes Numéricas
        ('ENTITY',    r'\b[a-zA-Z_][a-zA-Z0-9_]*\b'),          # Identificadores (id)
        ('ESPACIO',   r'[ \t\n]+'),                            # Transición vacía
        ('ILEGAL',    r'.')                                    # Estado inválido
    ]

    def __init__(self):
        regex_parts = [f'(?P<{pair[0]}>{pair[1]})' for pair in self.TOKEN_SPECIFICATION]
        self.regex = re.compile('|'.join(regex_parts), re.IGNORECASE)
        self.symbol_table = [] 

    def tokenize(self, text: str):
        tokens = []
        self.symbol_table.clear() 
        for match in self.regex.finditer(text):
            kind = str(match.lastgroup)
            value = str(match.group())
            
            if kind == 'ESPACIO': continue
            if kind == 'ILEGAL': raise LexicalError(f"Se detectó un símbolo que no pertenece al abecedario: '{value}'")
            
            if kind == 'ENTITY':
                tag = value.lower()
                if tag not in self.symbol_table:
                    self.symbol_table.append(tag)
                    
            tokens.append(Token(kind, value.lower()))
        
        tokens.append(Token('EOF', ''))
        return tokens

class Parser:
    """Implementación de la Gramática Libre de Contexto (CFG) mediante Descenso Recursivo"""
    def __init__(self, tokens):
        self.tokens = tokens
        self.pos = 0

    def current_token(self):
        return self.tokens[self.pos]

    def consume(self, expected_type):
        token = self.current_token()
        if token.type == expected_type:
            self.pos += 1
            return token
        raise SyntaxError(f"Estructura gramatical incorrecta. Se esperaba '{expected_type}', se recibió '{token.type}'")

    def parse(self):
        # <Statement> -> SELECT_KW ENTITY [ WHERE_KW ENTITY OPERATOR NUMBER ]
        self.consume('SELECT_KW')
        entidad = self.consume('ENTITY').value
        
        atributo, operador, valor = None, None, None
        
        if self.current_token().type == 'WHERE_KW':
            self.consume('WHERE_KW')
            atributo = self.consume('ENTITY').value
            
            op_str = self.consume('OPERATOR').value
            if op_str == 'mayor a': operador = '>'
            elif op_str == 'menor a': operador = '<'
            elif op_str == 'igual a': operador = '='
            else: operador = op_str 
            
            valor = self.consume('NUMBER').value
            
        if self.current_token().type != 'EOF':
            raise SyntaxError("La consulta debe finalizar después del valor. Elementos sobrantes detectados.")
            
        return entidad, atributo, operador, valor

class Translator:
    """Generador de Código Final soportando múltiples dialectos"""
    @staticmethod
    def translate(entidad: str, atributo: str, operador: str, valor: str, dialect="MySQL") -> str:
        # Se formatea el string principal dependiendo del dialecto (por ahora son muy similares en queries simples)
        sql = f"SELECT * FROM {entidad}"
        if dialect == "SQL Server":
            sql = f"SELECT * FROM [{entidad}]"  # Bracket escaping form
            
        if atributo and operador and valor:
            if dialect == "SQL Server":
                sql += f"\nWHERE [{atributo}] {operador} {valor}"
            else:
                sql += f"\nWHERE {atributo} {operador} {valor}"
                
        return sql + ";"

def compilar_y_traducir(frase: str, dialect="MySQL"):
    lexer = Lexer()
    tokens = lexer.tokenize(frase)
    parser = Parser(tokens)
    entidad, atributo, operador, valor = parser.parse()
    sql_generado = Translator.translate(entidad, atributo, operador, valor, dialect)
    return sql_generado, lexer.symbol_table


# ==========================================
# ==========================================
# 2. CAPA UI: DASHBOARD & NAVIGATION RAIL
# ==========================================
# ==========================================

class SQLEasyTalkApp(ctk.CTk):
    def __init__(self):
        super().__init__()

        # --- Variables Inciales ---
        self.title("SQL-Easy Talk Compiler - Pro Suite")
        self.geometry("1100x650")
        self.minsize(900, 600)
        
        self.current_dialect = ctk.StringVar(value="MySQL")
        self.theme_mode = ctk.StringVar(value="Dark")
        self.historial_consultas = [] 

        # --- Grid Layout Principal ---
        # Col 0: Menú Lateral (NavigationBar) | Col 1: Vista Principal (Dashboard)
        self.grid_rowconfigure(0, weight=1)
        self.grid_columnconfigure(1, weight=1)

        # --- 1. Inicializar Navigation Rail (Menú Lateral) ---
        self.navigation_frame = ctk.CTkFrame(self, corner_radius=0, width=200)
        self.navigation_frame.grid(row=0, column=0, sticky="nsew")
        self.navigation_frame.grid_rowconfigure(5, weight=1) # Empuja los elementos arriba
        
        # Header del Menú
        self.navigation_frame_label = ctk.CTkLabel(
            self.navigation_frame, 
            text="SQL-Easy Talk\nSuite ⚡",
            font=ctk.CTkFont(size=20, weight="bold")
        )
        self.navigation_frame_label.grid(row=0, column=0, padx=20, pady=(30, 30))

        # Configuración de Botones del Menú
        btn_kwargs = {
            "corner_radius": 0, 
            "height": 50, 
            "border_spacing": 10, 
            "text_color": ("gray10", "gray90"),
            "hover_color": ("gray70", "gray30"),
            "anchor": "w",
            "font": ctk.CTkFont(size=14, weight="bold")
        }

        self.btn_home = ctk.CTkButton(self.navigation_frame, text="🏠 Traductor", command=lambda: self.select_frame("Home"), **btn_kwargs)
        self.btn_home.grid(row=1, column=0, sticky="ew")

        self.btn_learn = ctk.CTkButton(self.navigation_frame, text="🎓 Aprender SQL", command=lambda: self.select_frame("Learn"), **btn_kwargs)
        self.btn_learn.grid(row=2, column=0, sticky="ew")

        self.btn_history = ctk.CTkButton(self.navigation_frame, text="📜 Historial", command=lambda: self.select_frame("History"), **btn_kwargs)
        self.btn_history.grid(row=3, column=0, sticky="ew")

        self.btn_config = ctk.CTkButton(self.navigation_frame, text="⚙️ Configuración", command=lambda: self.select_frame("Config"), **btn_kwargs)
        self.btn_config.grid(row=4, column=0, sticky="ew")

        # --- 2. Inicializar Vistas (Frames) ---
        self.home_frame = HomeFrame(self)
        self.learn_frame = LearningHubFrame(self)
        self.history_frame = HistoryFrame(self)
        self.config_frame = ConfigFrame(self)

        # --- 3. Seleccionar Vista por Defecto ---
        self.select_frame("Home")

    def select_frame(self, name):
        # Efecto visual en el botón activo
        active_color = ("gray75", "gray25")
        transparent = "transparent"
        
        self.btn_home.configure(fg_color=active_color if name == "Home" else transparent)
        self.btn_learn.configure(fg_color=active_color if name == "Learn" else transparent)
        self.btn_history.configure(fg_color=active_color if name == "History" else transparent)
        self.btn_config.configure(fg_color=active_color if name == "Config" else transparent)

        # Mostrar/Ocultar Frames Correspondientes
        frames = {"Home": self.home_frame, "Learn": self.learn_frame, "History": self.history_frame, "Config": self.config_frame}
        for key, frame in frames.items():
            if key == name:
                frame.grid(row=0, column=1, sticky="nsew")
                if key == "History": self.history_frame.actualizar_vista()
            else:
                frame.grid_forget()

    def add_to_history(self, text, sql):
        # Guardamos un nuevo ítem, limitando a 10 el tamaño
        self.historial_consultas.insert(0, (text, sql))
        if len(self.historial_consultas) > 10:
            self.historial_consultas.pop()

# --- VISTA 1: HOME (Traductor Central) ---
class HomeFrame(ctk.CTkFrame):
    def __init__(self, parent):
        super().__init__(parent, fg_color="transparent")
        self.parent = parent
        
        self.grid_columnconfigure(0, weight=7)
        self.grid_columnconfigure(1, weight=3)
        self.grid_rowconfigure(0, weight=1)
        
        self.init_left_panel()
        self.init_right_panel()

    def init_left_panel(self):
        panel = ctk.CTkFrame(self, fg_color="transparent")
        panel.grid(row=0, column=0, sticky="nsew", padx=(20, 10), pady=20)
        panel.grid_rowconfigure(3, weight=1)
        
        # Título
        ctk.CTkLabel(panel, text="Entorno de Traducción", font=ctk.CTkFont(size=26, weight="bold")).grid(row=0, column=0, sticky="w", pady=(0, 20))
        
        # Input
        self.entry = ctk.CTkEntry(
            panel, height=55, corner_radius=10, 
            font=ctk.CTkFont(size=16), placeholder_text=" Ej: 'mostrar ventas con total igual a 500'"
        )
        self.entry.grid(row=1, column=0, sticky="ew", pady=(0, 20))
        self.entry.bind("<Return>", lambda event: self.traducir())
        
        # Botones
        btn_frame = ctk.CTkFrame(panel, fg_color="transparent")
        btn_frame.grid(row=2, column=0, sticky="ew", pady=(0, 20))
        
        # Boton verde brillante para traducir
        ctk.CTkButton(
            btn_frame, text="✨ Traducir a SQL", height=45, corner_radius=8,
            font=ctk.CTkFont(size=15, weight="bold"), fg_color="#2E86C1", hover_color="#21618C",
            command=self.traducir
        ).pack(side="left", padx=(0, 10))
        
        ctk.CTkButton(
            btn_frame, text="Copiar SQL", height=45, width=120, fg_color="#3B3B3B", hover_color="#505050",
            command=self.copiar
        ).pack(side="left", padx=(0, 10))

        ctk.CTkButton(
            btn_frame, text="Limpiar", height=45, width=100, fg_color="transparent", border_width=1, text_color="gray",
            command=self.limpiar
        ).pack(side="left")

        # Output Textbox (Console Area)
        self.output_frame = ctk.CTkFrame(panel, corner_radius=10, border_width=1, border_color="#3B3B3B", bg_color="transparent")
        self.output_frame.grid(row=3, column=0, sticky="nsew", pady=(0, 15))
        self.output_frame.grid_rowconfigure(0, weight=1)
        self.output_frame.grid_columnconfigure(0, weight=1)

        self.output = ctk.CTkTextbox(
            self.output_frame, font=ctk.CTkFont(family="Consolas", size=18, weight="bold"), 
            text_color="#39FF14", fg_color="#181818", corner_radius=10
        )
        self.output.grid(row=0, column=0, sticky="nsew", padx=10, pady=10)
        self.output.insert("1.0", "> Esperando comando...")
        self.output.configure(state="disabled")
        
        # Error Banner
        self.error_banner = ctk.CTkFrame(panel, height=0, fg_color="transparent")
        self.error_banner.grid(row=4, column=0, sticky="ew")
        self.lbl_error = ctk.CTkLabel(self.error_banner, text="", text_color="white", font=ctk.CTkFont(weight="bold"))

    def init_right_panel(self):
        panel = ctk.CTkFrame(self, corner_radius=15)
        panel.grid(row=0, column=1, sticky="nsew", padx=(10, 20), pady=20)
        panel.grid_rowconfigure(2, weight=1)
        panel.grid_columnconfigure(0, weight=1)
        
        ctk.CTkLabel(panel, text="Tabla de Símbolos", font=ctk.CTkFont(size=18, weight="bold")).grid(row=0, column=0, sticky="w", padx=20, pady=(20, 5))
        ctk.CTkLabel(panel, text="(Extraidos del Lexer)", text_color="gray").grid(row=1, column=0, sticky="w", padx=20, pady=(0, 15))
        
        self.simbolos = ctk.CTkTextbox(panel, font=ctk.CTkFont(family="Consolas", size=14), fg_color="#181818", text_color="#A9B7C6")
        self.simbolos.grid(row=2, column=0, sticky="nsew", padx=15, pady=(0, 20))
        self.simbolos.insert("1.0", "---")
        self.simbolos.configure(state="disabled")

    def traducir(self):
        frase = self.entry.get().strip()
        if not frase: return
            
        self.ocultar_error()
        self.output.configure(state="normal")
        self.simbolos.configure(state="normal")
        self.output.delete("1.0", "end")
        self.simbolos.delete("1.0", "end")
        
        dialect = self.parent.current_dialect.get()
        
        try:
            sql, simbolos = compilar_y_traducir(frase, dialect)
            self.output.configure(text_color="#39FF14")  # Verde
            self.output.insert("end", sql)
            self.parent.add_to_history(frase, sql)
            
            if simbolos:
                for idx, sym in enumerate(simbolos):
                    self.simbolos.insert("end", f"[{idx}] {sym}\n")
            else:
                 self.simbolos.insert("1.0", "Vacía")
                 
        except LexicalError as le:
            self.mostrar_error("ERROR LÉXICO", str(le))
        except SyntaxError as se:
            self.mostrar_error("ERROR SINTÁCTICO", str(se))
        except Exception as e:
             self.mostrar_error("ERROR INTERNO", str(e))
             
        self.output.configure(state="disabled")
        self.simbolos.configure(state="disabled")

    def mostrar_error(self, title, msg):
        self.error_banner.configure(fg_color="#E74C3C", height=45, corner_radius=10)
        self.lbl_error.configure(text=f"{title}: {msg}")
        self.lbl_error.pack(pady=10, padx=15, side="left")
        self.output.insert("end", f"-- {title} DETECTADO --")

    def ocultar_error(self):
        self.error_banner.configure(fg_color="transparent", height=0)
        self.lbl_error.pack_forget()
        
    def limpiar(self):
        self.entry.delete(0, "end")
        self.ocultar_error()
        self.output.configure(state="normal")
        self.output.delete("1.0", "end")
        self.output.insert("1.0", "> Esperando comando...")
        self.output.configure(state="disabled")
        self.simbolos.configure(state="normal")
        self.simbolos.delete("1.0", "end")
        self.simbolos.insert("1.0", "---")
        self.simbolos.configure(state="disabled")
        
    def copiar(self):
        text = self.output.get("1.0", "end-1c")
        if text and not text.startswith(">") and not text.startswith("--"):
            self.clipboard_clear()
            self.clipboard_append(text)


# --- VISTA 2: HISTORIAL ---
class HistoryFrame(ctk.CTkFrame):
    def __init__(self, parent):
        super().__init__(parent, fg_color="transparent")
        self.parent = parent
        self.grid_rowconfigure(1, weight=1)
        self.grid_columnconfigure(0, weight=1)
        
        ctk.CTkLabel(self, text="📜 Historial de Traducciones", font=ctk.CTkFont(size=26, weight="bold")).grid(row=0, column=0, sticky="w", padx=30, pady=30)
        
        self.scroll_area = ctk.CTkScrollableFrame(self, fg_color="transparent")
        self.scroll_area.grid(row=1, column=0, sticky="nsew", padx=20, pady=(0,20))
        self.scroll_area.grid_columnconfigure(0, weight=1)
        
    def actualizar_vista(self):
        # Limpiar frame actual
        for widget in self.scroll_area.winfo_children():
            widget.destroy()
            
        if not self.parent.historial_consultas:
            ctk.CTkLabel(self.scroll_area, text="No hay consultas recientes.", text_color="gray").grid(pady=20)
            return
            
        for i, (frase, sql) in enumerate(self.parent.historial_consultas):
            card = ctk.CTkFrame(self.scroll_area, corner_radius=10, fg_color="#2A2D2E")
            card.grid(row=i, column=0, sticky="ew", pady=10, padx=10)
            card.grid_columnconfigure(0, weight=1)
            
            ctk.CTkLabel(card, text=f"Entrada: {frase}", font=ctk.CTkFont(weight="bold"), text_color="white").grid(row=0, column=0, sticky="w", padx=15, pady=(15, 5))
            txt = ctk.CTkTextbox(card, height=60, font=ctk.CTkFont(family="Consolas"), fg_color="#18181A", text_color="#39FF14")
            txt.grid(row=1, column=0, sticky="ew", padx=15, pady=(0, 15))
            txt.insert("1.0", sql)
            txt.configure(state="disabled")


# --- VISTA 3: CONFIGURACIÓN ---
class ConfigFrame(ctk.CTkFrame):
    def __init__(self, parent):
        super().__init__(parent, fg_color="transparent")
        self.parent = parent
        
        ctk.CTkLabel(self, text="⚙️ Configuración del Motor", font=ctk.CTkFont(size=26, weight="bold")).grid(row=0, column=0, sticky="w", padx=30, pady=30)
        
        panel = ctk.CTkFrame(self, corner_radius=15)
        panel.grid(row=1, column=0, sticky="ew", padx=30, pady=10)
        panel.grid_columnconfigure(1, weight=1)
        
        # Dialecto SQL
        ctk.CTkLabel(panel, text="Dialecto SQL Destino:", font=ctk.CTkFont(size=16, weight="bold")).grid(row=0, column=0, sticky="w", padx=20, pady=(20, 10))
        dialects = ["MySQL", "PostgreSQL", "SQL Server"]
        combo_dialect = ctk.CTkOptionMenu(panel, values=dialects, variable=self.parent.current_dialect, width=200)
        combo_dialect.grid(row=0, column=1, sticky="e", padx=20, pady=(20, 10))
        
        # Tema UI
        ctk.CTkLabel(panel, text="Tema de Interfaz:", font=ctk.CTkFont(size=16, weight="bold")).grid(row=1, column=0, sticky="w", padx=20, pady=(10, 20))
        themes = ["Dark", "Light", "System"]
        combo_theme = ctk.CTkOptionMenu(panel, values=themes, variable=self.parent.theme_mode, command=self.change_theme, width=200)
        combo_theme.grid(row=1, column=1, sticky="e", padx=20, pady=(10, 20))
        
    def change_theme(self, choice):
        ctk.set_appearance_mode(choice)

# --- VISTA 4: APRENDER SQL (Learning Hub) ---
class LearningHubFrame(ctk.CTkFrame):
    def __init__(self, parent):
        super().__init__(parent, fg_color="transparent")
        
        self.grid_rowconfigure(1, weight=1)
        self.grid_columnconfigure(0, weight=1)
        
        # Título de la sección
        header_frame = ctk.CTkFrame(self, fg_color="transparent")
        header_frame.grid(row=0, column=0, sticky="ew", padx=30, pady=30)
        ctk.CTkLabel(header_frame, text="🎓 Aprender SQL", font=ctk.CTkFont(size=26, weight="bold")).pack(side="left")
        
        # Scrollable Frame para las tarjetas
        self.scroll_area = ctk.CTkScrollableFrame(self, fg_color="transparent")
        self.scroll_area.grid(row=1, column=0, sticky="nsew", padx=20, pady=(0, 20))
        self.scroll_area.grid_columnconfigure((0, 1), weight=1)
        
        self.crear_tarjetas()

    def crear_tarjetas(self):
        # Estilo base para las tarjetas
        card_kwargs = {
            "corner_radius": 15,
            "fg_color": "#2A2D2E",
            "border_width": 1,
            "border_color": "#3B3B3B"
        }

        # 1. Tarjeta de Documentación
        doc_card = ctk.CTkFrame(self.scroll_area, **card_kwargs)
        doc_card.grid(row=0, column=0, sticky="nsew", padx=10, pady=10)
        self.build_card(
            doc_card, 
            "📚 Documentación Oficial", 
            "Consulta los manuales oficiales de referencia para \naprender cada detalle de la sintaxis SQL.",
            "Abrir MySQL Docs", 
            lambda: webbrowser.open("https://dev.mysql.com/doc/")
        )

        # 2. Tarjeta de YouTube
        yt_card = ctk.CTkFrame(self.scroll_area, **card_kwargs)
        yt_card.grid(row=0, column=1, sticky="nsew", padx=10, pady=10)
        self.build_card(
            yt_card, 
            "🎥 Video Tutoriales", 
            "Aprende SQL desde cero con cursos visuales \ny ejemplos prácticos en YouTube.",
            "Ver Curso en YouTube", 
            lambda: webbrowser.open("https://www.youtube.com/results?search_query=curso+sql+desde+cero")
        )

        # 3. Guía de Motores de Base de Datos
        db_card = ctk.CTkFrame(self.scroll_area, **card_kwargs)
        db_card.grid(row=1, column=0, columnspan=2, sticky="nsew", padx=10, pady=10)
        
        ctk.CTkLabel(db_card, text="⚙️ Guía de Motores (RDBMS)", font=ctk.CTkFont(size=18, weight="bold"), text_color="white").pack(anchor="w", padx=20, pady=(20, 5))
        
        desc = (
            "Los Sistemas Gestores de Bases de Datos Relacionales (RDBMS) más populares difieren ligeramente en su sintaxis y capacidades:\n\n"
            "• MySQL: Muy popular en la web, de código abierto, integrado típicamente con PHP/Python.\n"
            "• PostgreSQL: El motor open-source más avanzado, con fuerte cumplimiento de estándares ANSI SQL y características complejas.\n"
            "• SQL Server: Desarrollado por Microsoft, excelente integración empresarial y herramientas como T-SQL.\n\n"
            "El núcleo de consultas básicas (SELECT, INSERT, UPDATE, DELETE) es idéntico o muy similar entre ellos."
        )
        ctk.CTkLabel(db_card, text=desc, font=ctk.CTkFont(size=14), text_color="#A9B7C6", justify="left").pack(anchor="w", padx=20, pady=(0, 20))

    def build_card(self, parent_frame, title, description, btn_text, action):
        ctk.CTkLabel(parent_frame, text=title, font=ctk.CTkFont(size=18, weight="bold"), text_color="white").pack(anchor="w", padx=20, pady=(20, 5))
        ctk.CTkLabel(parent_frame, text=description, font=ctk.CTkFont(size=14), text_color="#A9B7C6", justify="left").pack(anchor="w", padx=20, pady=(0, 15))
        ctk.CTkButton(parent_frame, text=btn_text, font=ctk.CTkFont(weight="bold"), fg_color="#2E86C1", hover_color="#21618C", command=action).pack(anchor="w", padx=20, pady=(0, 20))

# ==========================================
# BOOTSTRAPP 
# ==========================================
if __name__ == "__main__":
    ctk.set_appearance_mode("Dark")
    ctk.set_default_color_theme("blue")
    
    app = SQLEasyTalkApp()
    app.mainloop()
