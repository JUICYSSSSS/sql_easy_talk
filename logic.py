import re

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
        # Se formatea el string principal dependiendo del dialecto
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
    # Devolvemos también los tokens para poder inspeccionarlos en el visualizador
    return sql_generado, lexer.symbol_table, tokens
