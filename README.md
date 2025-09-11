# Chatbot Educativo - Botsito

Un chatbot interactivo desarrollado con React + TypeScript + Vite que ayuda a estudiantes a practicar y validar oraciones en inglés usando el verbo TO BE.

## 🤖 Sobre el Proyecto

**Botsito** es un asistente de gramática inglesa especializado en el verbo TO BE que proporciona:

- Validación gramatical en tiempo real de oraciones
- Correcciones automáticas con explicaciones detalladas
- Soporte para oraciones afirmativas, negativas e interrogativas
- Validación en tiempo presente y pasado
- Interfaz conversacional amigable

## ✨ Características

- **Validación Inteligente**: Utiliza expresiones regulares avanzadas para validar la gramática
- **Corrección Automática**: Proporciona sugerencias de corrección cuando detecta errores
- **Ejemplos Interactivos**: Muestra ejemplos de oraciones correctas
- **Interfaz Moderna**: Diseño responsivo con Tailwind CSS
- **TypeScript**: Código tipado para mayor robustez

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Instalación
```bash
# Clonar el repositorio
git clone [url-del-repositorio]
cd chattbot

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build
```

## 📁 Estructura del Proyecto

```
src/
├── App.tsx              # Componente principal del chatbot
├── validator.ts         # Lógica de validación gramatical
├── validator.test.ts    # Tests unitarios
├── super-complexity-tests.ts # Tests de casos complejos
├── main.tsx            # Punto de entrada
└── assets/             # Recursos estáticos
```

## 🎯 Reglas de Validación

El chatbot valida oraciones siguiendo estas reglas gramaticales:

### Tiempo Presente
- **I** + am
- **You/We/They** + are  
- **He/She/It** + is
- **Sustantivos singulares** + is
- **Sustantivos plurales** + are

### Tiempo Pasado
- **I/He/She/It** + was
- **You/We/They** + were

### Tipos de Oraciones Soportadas
1. **Afirmativas**: "I am happy"
2. **Negativas**: "She is not ready" / "She isn't ready"
3. **Interrogativas**: "Are you coming?"

## 🔧 Tecnologías Utilizadas

- **React 19.1.1** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático
- **Vite** - Herramienta de construcción
- **Tailwind CSS** - Framework de estilos
- **Lucide React** - Iconos
- **ESLint** - Linting de código

## 🧪 Testing

```bash
# Ejecutar tests
npm test

# Ejecutar tests con cobertura
npm run test:coverage
```

## 📝 Scripts Disponibles

- `npm run dev` - Ejecuta el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Vista previa de la construcción
- `npm run lint` - Ejecuta el linter

## 🎮 Cómo Usar

1. Abre la aplicación en tu navegador
2. Botsito te pedirá tu nombre
3. Acepta comenzar la práctica escribiendo "yes"
4. Escribe oraciones en inglés usando el verbo TO BE
5. Recibe retroalimentación inmediata y correcciones

## 🔍 Ejemplos de Oraciones Válidas

```
✅ I am a student.
✅ She is not ready.
✅ Are you coming?
✅ They were happy yesterday.
✅ The cat is sleeping.
```

## 🛠️ Configuración de ESLint

El proyecto incluye configuración avanzada de ESLint con reglas específicas para React y TypeScript:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Configuraciones recomendadas con verificación de tipos
      ...tseslint.configs.recommendedTypeChecked,
      // Reglas más estrictas (opcional)
      ...tseslint.configs.strictTypeChecked,
      // Reglas de estilo (opcional)
      ...tseslint.configs.stylisticTypeChecked,
      // Reglas específicas para React
      reactX.configs['recommended-typescript'],
      // Reglas para React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
```

## 📚 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👥 Autores

Desarrolladores
-Daniel David Henriquez Julio
-Juan David Bolañoz Lopez
-Víctor Daniel Marrugo Aguilar
-Jesús David Caraballo Nieto
-Wilmer Andrés Iriarte Camargo
-Gabriel Jose Buelvas Morales

---

¡Desarrollado con ❤️ para ayudar a estudiantes de inglés a mejorar su gramática!
