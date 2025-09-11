// Módulo de validación de frases en inglés con el verbo TO BE
// Implementa expresiones regulares para validar frases afirmativas, negativas e interrogativas
// en tiempo presente y pasado

export interface ValidationResult {
  isValid: boolean;
  message: string;
  type: string;
  tense: string;
  correction?: string; // Nueva propiedad para mostrar la corrección
}

// Expresiones regulares para diferentes tipos de sujetos
const PATTERNS = {
  // Sujetos
  personalPronouns: /^(i|you|he|she|it|we|they)\s+/i,
  properNouns: /^[A-Z][a-z]+\s+/,
  commonNounsWithArticle: /^the\s+[a-z]+\s+/i,
  demonstrativePronouns: /^(this|that|these|those)\s+[a-z]+\s+/i,

  // Verbo TO BE - Presente
  toBePresentAffirmative: {
    i: /^i\s+am\s+.+/i,
    youWe: /^(you|we|they)\s+are\s+.+/i,
    heSheIt: /^(he|she|it)\s+is\s+.+/i,
    properNounSingular: /^[A-Z][a-z]+\s+is\s+.+/,
    properNounPlural: /^[A-Z][a-z]+\s+are\s+.+/,
    properNounCompound: /^[A-Z][a-z]+\s+and\s+[A-Z][a-z]+\s+are\s+.+/i,
    pronounCompound: /^(he|she|it|you|we|they|i)\s+and\s+(he|she|it|you|we|they|i)\s+are\s+.+/i,
    mixedCompound: /^([A-Z][a-z]+\s+and\s+(he|she|it|you|we|they|i)|(he|she|it|you|we|they|i)\s+and\s+[A-Z][a-z]+)\s+are\s+.+/i,
    commonNounCompound: /^(the\s+[a-z]+\s+and\s+(he|she|it|you|we|they|i)|(he|she|it|you|we|they|i)\s+and\s+the\s+[a-z]+)\s+are\s+.+/i,
    commonNounSingular: /^the\s+[a-z]+\s+is\s+.+/i,
    commonNounPlural: /^the\s+[a-z]+s\s+are\s+.+/i,
    demonstrativeThis: /^(this|that)\s+[a-z]+\s+is\s+.+/i,
    demonstrativeThese: /^(these|those)\s+[a-z]+\s+are\s+.+/i
  },

  // Verbo TO BE - Presente Negativo
  toBePresentNegative: {
    i: /^i\s+(am\s+not|'m\s+not)\s+.+/i,
    iContraction: /^i'm\s+not\s+.+/i,
    youWe: /^(you|we|they)\s+(are\s+not|aren't)\s+.+/i,
    heSheIt: /^(he|she|it)\s+(is\s+not|isn't)\s+.+/i,
    properNounSingular: /^[A-Z][a-z]+\s+(is\s+not|isn't)\s+.+/,
    properNounPlural: /^[A-Z][a-z]+\s+(are\s+not|aren't)\s+.+/,
    commonNounSingular: /^the\s+[a-z]+\s+(is\s+not|isn't)\s+.+/i,
    commonNounPlural: /^the\s+[a-z]+s\s+(are\s+not|aren't)\s+.+/i,
    demonstrativeThis: /^(this|that)\s+[a-z]+\s+(is\s+not|isn't)\s+.+/i,
    demonstrativeThese: /^(these|those)\s+[a-z]+\s+(are\s+not|aren't)\s+.+/i
  },

  // Verbo TO BE - Pasado
  toBePastAffirmative: {
    iHeSheIt: /^(i|he|she|it)\s+was\s+.+/i,
    youWeThey: /^(you|we|they)\s+were\s+.+/i,
    properNounSingular: /^[A-Z][a-z]+\s+was\s+.+/,
    properNounPlural: /^[A-Z][a-z]+\s+were\s+.+/,
    commonNounSingular: /^the\s+[a-z]+\s+was\s+.+/i,
    commonNounPlural: /^the\s+[a-z]+s\s+were\s+.+/i,
    demonstrativeThis: /^(this|that)\s+[a-z]+\s+was\s+.+/i,
    demonstrativeThese: /^(these|those)\s+[a-z]+\s+were\s+.+/i
  },

  // Verbo TO BE - Pasado Negativo
  toBePastNegative: {
    iHeSheIt: /^(i|he|she|it)\s+(was\s+not|wasn't)\s+.+/i,
    youWeThey: /^(you|we|they)\s+(were\s+not|weren't)\s+.+/i,
    properNounSingular: /^[A-Z][a-z]+\s+(was\s+not|wasn't)\s+.+/,
    properNounPlural: /^[A-Z][a-z]+\s+(were\s+not|weren't)\s+.+/,
    commonNounSingular: /^the\s+[a-z]+\s+(was\s+not|wasn't)\s+.+/i,
    commonNounPlural: /^the\s+[a-z]+s\s+(were\s+not|weren't)\s+.+/i,
    demonstrativeThis: /^(this|that)\s+[a-z]+\s+(was\s+not|wasn't)\s+.+/i,
    demonstrativeThese: /^(these|those)\s+[a-z]+\s+(were\s+not|weren't)\s+.+/i
  },

  // Preguntas - Presente
  toBeQuestionPresent: {
    general: /^(am|are|is)\s+(i|you|he|she|it|we|they|[A-Z][a-z]+|the\s+[a-z]+|this\s+[a-z]+|that\s+[a-z]+|these\s+[a-z]+|those\s+[a-z]+)\s+.+\?$/i
  },

  // Preguntas - Pasado
  toBeQuestionPast: {
    general: /^(was|were)\s+(i|you|he|she|it|we|they|[A-Z][a-z]+|the\s+[a-z]+|this\s+[a-z]+|that\s+[a-z]+|these\s+[a-z]+|those\s+[a-z]+)\s+.+\?$/i
  }
};

// Función principal de validación
export function validateSentence(sentence: string): ValidationResult {
  const trimmedSentence = sentence.trim();

  if (!trimmedSentence) {
    return {
      isValid: false,
      message: "Please enter a sentence to validate.",
      type: "error",
      tense: "none"
    };
  }

  // Verificar si es una pregunta
  if (trimmedSentence.endsWith('?')) {
    return validateQuestion(trimmedSentence);
  }

  // Verificar frases afirmativas y negativas
  return validateStatement(trimmedSentence);
}

function validateQuestion(sentence: string): ValidationResult {
  const words = sentence.toLowerCase().replace('?', '').trim().split(/\s+/);
  const verb = words[0];

  // Validar preguntas en presente con estructura completa
  if (PATTERNS.toBeQuestionPresent.general.test(sentence)) {
    if (isCorrectQuestionStructure(sentence, 'present')) {
      return {
        isValid: true,
        message: "✓ Correct question structure with TO BE in present tense!",
        type: "question",
        tense: "present"
      };
    }
  }

  // Validar preguntas en pasado con estructura completa
  if (PATTERNS.toBeQuestionPast.general.test(sentence)) {
    if (isCorrectQuestionStructure(sentence, 'past')) {
      return {
        isValid: true,
        message: "✓ Correct question structure with TO BE in past tense!",
        type: "question",
        tense: "past"
      };
    }
  }

  // Caso especial: pregunta incompleta que comienza con verbo TO BE
  if (/^(am|are|is|was|were)\s+/i.test(sentence) && words.length >= 2) {
    const complement = words.slice(1).join(' ');
    let suggestions = [];

    if (verb === 'are') {
      suggestions = [
        `They are ${complement}.`,
        `We are ${complement}.`,
        `You are ${complement}.`,
        `Are they ${complement}?`,
        `Are we ${complement}?`,
        `Are you ${complement}?`
      ];
    } else if (verb === 'is') {
      suggestions = [
        `He is ${complement}.`,
        `She is ${complement}.`,
        `It is ${complement}.`,
        `Is he ${complement}?`,
        `Is she ${complement}?`,
        `Is it ${complement}?`
      ];
    } else if (verb === 'am') {
      suggestions = [
        `I am ${complement}.`,
        `Am I ${complement}?`
      ];
    } else if (verb === 'was') {
      suggestions = [
        `He was ${complement}.`,
        `She was ${complement}.`,
        `It was ${complement}.`,
        `I was ${complement}.`,
        `Was he ${complement}?`,
        `Was she ${complement}?`,
        `Was it ${complement}?`,
        `Was I ${complement}?`
      ];
    } else if (verb === 'were') {
      suggestions = [
        `They were ${complement}.`,
        `We were ${complement}.`,
        `You were ${complement}.`,
        `Were they ${complement}?`,
        `Were we ${complement}?`,
        `Were you ${complement}?`
      ];
    }

    const tense = ['am', 'are', 'is'].includes(verb) ? 'present' : 'past';
    const correction = suggestions.length > 0 ? suggestions[0] : generateCorrection(sentence);

    return {
      isValid: false,
      message: `✗ Incomplete sentence. Missing subject. Try: ${suggestions.slice(0, 3).join(', ')}.`,
      type: "question",
      tense: tense,
      correction: correction
    };
  }

  // Si no es válida, generar corrección
  const correction = generateCorrection(sentence);

  return {
    isValid: false,
    message: "✗ Incorrect question structure. Remember: [Am/Are/Is/Was/Were] + [Subject] + [Complement] + ?",
    type: "question",
    tense: "unknown",
    correction: correction !== sentence ? correction : undefined
  };
}

function validateStatement(sentence: string): ValidationResult {
  // Verificar si comienza con un verbo TO BE (caso especial: pregunta sin signo de interrogación)
  if (/^(am|are|is|was|were)\s+/i.test(sentence)) {
    return validateQuestion(sentence);
  }

  // Verificar si contiene negación - mejorar detección de contracciones
  const isNegative = /\s+(not|n't)(\s+|$)/.test(sentence) || /\w+'t\s+/.test(sentence);

  if (isNegative) {
    return validateNegativeStatement(sentence);
  } else {
    return validateAffirmativeStatement(sentence);
  }
}

function detectTenseFromVerb(sentence: string): string {
  const lowerSentence = sentence.toLowerCase();

  // Detectar verbos de presente
  if (lowerSentence.includes(' am ') || lowerSentence.includes(' is ') || lowerSentence.includes(' are ')) {
    return "present";
  }

  // Detectar verbos de pasado
  if (lowerSentence.includes(' was ') || lowerSentence.includes(' were ')) {
    return "past";
  }

  return "unknown";
}

function validateAffirmativeStatement(sentence: string): ValidationResult {
  // PRIMERO: Verificar errores de forma prioritaria antes de validar patrones

  // 1. Detectar nombres propios sin capitalización (incluyendo múltiples nombres con "and")
  const words = sentence.toLowerCase().trim().split(/\s+/);
  const subject = words[0];
  const personalPronouns = ['i', 'you', 'he', 'she', 'it', 'we', 'they'];

  // Verificar si hay nombres propios sin capitalizar en sujetos compuestos
  if (sentence.toLowerCase().includes(' and ')) {
    const nameParts = sentence.split(/\s+and\s+/i);
    for (let i = 0; i < nameParts.length; i++) {
      const part = nameParts[i].trim();
      const words = part.split(/\s+/);
      let wordToCheck;

      if (i === 0) {
        // Para la primera parte, verificar la primera palabra
        wordToCheck = words[0];
      } else {
        // Para la segunda parte, verificar la primera palabra de esa parte
        wordToCheck = words[0];
      }

      if (wordToCheck && !personalPronouns.includes(wordToCheck.toLowerCase()) && !wordToCheck.match(/^[A-Z]/)) {
        const correction = generateCorrection(sentence);
        return {
          isValid: false,
          message: "✗ Error: Proper nouns (names) must start with a capital letter.",
          type: "affirmative",
          tense: detectTenseFromVerb(sentence),
          correction: correction !== sentence ? correction : undefined
        };
      }
    }
  } else if (!personalPronouns.includes(subject) && !sentence.match(/^[A-Z]/)) {
    const correction = generateCorrection(sentence);
    return {
      isValid: false,
      message: "✗ Error: Proper nouns (names) must start with a capital letter.",
      type: "affirmative",
      tense: detectTenseFromVerb(sentence),
      correction: correction !== sentence ? correction : undefined
    };
  }

  // 2. Detectar concordancia incorrecta con sujetos compuestos (Name and Name)
  if (/\b[A-Z][a-z]+\s+and\s+[A-Z][a-z]+\s+is\b/i.test(sentence)) {
    const correction = generateCorrection(sentence);
    return {
      isValid: false,
      message: "✗ Error: Multiple subjects joined by 'and' use 'are', not 'is'.",
      type: "affirmative",
      tense: "present",
      correction: correction !== sentence ? correction : undefined
    };
  }

  // 3. Detectar concordancia incorrecta sujeto-verbo (casos individuales)
  // PERO EXCLUIR sujetos compuestos con "and"
  if (!sentence.toLowerCase().includes(' and ') && /\b(he|she|it)\s+are\b/i.test(sentence)) {
    const correction = generateCorrection(sentence);
    return {
      isValid: false,
      message: "✗ Error: 'He/She/It' uses 'is' in present, not 'are'.",
      type: "affirmative",
      tense: "present",
      correction: correction !== sentence ? correction : undefined
    };
  }

  if (!sentence.toLowerCase().includes(' and ') && /\b(you|we|they)\s+is\b/i.test(sentence)) {
    const correction = generateCorrection(sentence);
    return {
      isValid: false,
      message: "✗ Error: 'You/We/They' uses 'are' in present, not 'is'.",
      type: "affirmative",
      tense: "present",
      correction: correction !== sentence ? correction : undefined
    };
  }

  if (/\bi\s+are\b/i.test(sentence)) {
    // EXCEPCIÓN: Permitir "I are" en sujetos compuestos con "and"
    if (sentence.toLowerCase().includes(' and ')) {
      // No es error si "I" está en un sujeto compuesto
      // Continuar con la validación normal
    } else {
      const correction = generateCorrection(sentence);
      return {
        isValid: false,
        message: "✗ Error: 'I' always uses 'am', never 'are'.",
        type: "affirmative",
        tense: "present",
        correction: correction !== sentence ? correction : undefined
      };
    }
  }

  if (/\bi\s+is\b/i.test(sentence)) {
    const correction = generateCorrection(sentence);
    return {
      isValid: false,
      message: "✗ Error: 'I' always uses 'am', never 'is'.",
      type: "affirmative",
      tense: "present",
      correction: correction !== sentence ? correction : undefined
    };
  }

  // DESPUÉS: Verificar patrones válidos
  // Verificar presente afirmativo
  const presentPatterns = Object.values(PATTERNS.toBePresentAffirmative);
  for (const pattern of presentPatterns) {
    if (pattern.test(sentence)) {
      return {
        isValid: true,
        message: "✓ Correct affirmative sentence with TO BE in present tense!",
        type: "affirmative",
        tense: "present"
      };
    }
  }

  // Verificar pasado afirmativo
  const pastPatterns = Object.values(PATTERNS.toBePastAffirmative);
  for (const pattern of pastPatterns) {
    if (pattern.test(sentence)) {
      return {
        isValid: true,
        message: "✓ Correct affirmative sentence with TO BE in past tense!",
        type: "affirmative",
        tense: "past"
      };
    }
  }

  // Si llegamos aquí, hay algún error no detectado específicamente
  const detectedTense = detectTenseFromVerb(sentence);
  const correction = generateCorrection(sentence);
  const explanation = getErrorExplanation(sentence);

  return {
    isValid: false,
    message: `✗ ${explanation}`,
    type: "affirmative",
    tense: detectedTense,
    correction: correction !== sentence ? correction : undefined
  };
}

function validateNegativeStatement(sentence: string): ValidationResult {
  // PRIMERO: Verificar errores específicos antes de validar patrones

  // 1. Detectar nombres propios sin capitalización
  const words = sentence.toLowerCase().trim().split(/\s+/);
  const subject = words[0];
  const personalPronouns = ['i', 'you', 'he', 'she', 'it', 'we', 'they'];

  if (!personalPronouns.includes(subject) && !sentence.match(/^[A-Z]/)) {
    const correction = generateCorrection(sentence);
    return {
      isValid: false,
      message: "✗ Error: Proper nouns (names) must start with a capital letter.",
      type: "negative",
      tense: detectTenseFromVerb(sentence),
      correction: correction !== sentence ? correction : undefined
    };
  }

  // DESPUÉS: Verificar patrones válidos
  // Verificar presente negativo
  const presentNegPatterns = Object.values(PATTERNS.toBePresentNegative);
  for (const pattern of presentNegPatterns) {
    if (pattern.test(sentence)) {
      return {
        isValid: true,
        message: "✓ Correct negative sentence with TO BE in present tense!",
        type: "negative",
        tense: "present"
      };
    }
  }

  // Verificar pasado negativo
  const pastNegPatterns = Object.values(PATTERNS.toBePastNegative);
  for (const pattern of pastNegPatterns) {
    if (pattern.test(sentence)) {
      return {
        isValid: true,
        message: "✓ Correct negative sentence with TO BE in past tense!",
        type: "negative",
        tense: "past"
      };
    }
  }

  // Si no es válida, generar corrección
  const correction = generateCorrection(sentence);

  return {
    isValid: false,
    message: "✗ Incorrect negative sentence structure. Use 'am not', 'are not'/'aren't', 'is not'/'isn't' for present or 'was not'/'wasn't', 'were not'/'weren't' for past.",
    type: "negative",
    tense: "unknown",
    correction: correction !== sentence ? correction : undefined
  };
}

function isCorrectQuestionStructure(sentence: string, tense: 'present' | 'past'): boolean {
  const words = sentence.toLowerCase().replace('?', '').split(/\s+/);

  if (words.length < 3) return false;

  const verb = words[0];
  const subject = words[1];

  if (tense === 'present') {
    // Verificar concordancia presente
    if (verb === 'am' && subject === 'i') return true;
    if (verb === 'are' && ['you', 'we', 'they'].includes(subject)) return true;
    if (verb === 'is' && ['he', 'she', 'it'].includes(subject)) return true;
    if (verb === 'are' && /^(these|those)/.test(sentence.toLowerCase())) return true;
    if (verb === 'is' && /^(this|that)/.test(sentence.toLowerCase())) return true;
  } else if (tense === 'past') {
    // Verificar concordancia pasado
    if (verb === 'was' && ['i', 'he', 'she', 'it'].includes(subject)) return true;
    if (verb === 'were' && ['you', 'we', 'they'].includes(subject)) return true;
    if (verb === 'were' && /^(these|those)/.test(sentence.toLowerCase())) return true;
    if (verb === 'was' && /^(this|that)/.test(sentence.toLowerCase())) return true;
  }

  return false;
}

// Función para obtener ejemplos de frases correctas
export function getExamples(): string[] {
  return [
    "I am a teacher.",
    "You are a student.",
    "He is happy.",
    "She is not sad.",
    "We were friends.",
    "They weren't ready.",
    "The cat is brown.",
    "The dogs are playing.",
    "This book is interesting.",
    "Those cars were expensive.",
    "Am I correct?",
    "Are you ready?",
    "Is she coming?",
    "Was he there?",
    "Were they happy?"
  ];
}

// Función para generar correcciones automáticas
function generateCorrection(sentence: string): string {
  const words = sentence.toLowerCase().trim().replace(/[?!.]$/, '').split(/\s+/);

  if (words.length < 2) return sentence;

  const subject = words[0];
  let correctedSentence = sentence;

  // Detectar y corregir múltiples nombres propios con "and"
  if (sentence.toLowerCase().includes(' and ')) {
    // Corregir capitalización en sujetos compuestos - AMBOS nombres
      // @ts-ignore
    correctedSentence = correctedSentence.replace(/\b([a-z][a-z]*)\s+and\s+([a-z][a-z]*)\b/gi, (match, name1, name2) => {
      return name1.charAt(0).toUpperCase() + name1.slice(1) + ' and ' + name2.charAt(0).toUpperCase() + name2.slice(1);
    });

    // Corregir concordancia: "Name and Name is" → "Name and Name are"
    correctedSentence = correctedSentence.replace(/\b([A-Z][a-z]+\s+and\s+[A-Z][a-z]+)\s+is\b/gi, '$1 are');

    // Corregir capitalización de pronombres en sujetos compuestos - mantener minúsculas excepto "I"
      // @ts-ignore
    correctedSentence = correctedSentence.replace(/\b(He|She|It|You|We|They)\s+and\s+(he|she|it|you|we|they|i)\b/gi, (match, first, second) => {
      const firstLower = first.charAt(0).toUpperCase() + first.slice(1).toLowerCase();
      const secondCorrect = second.toLowerCase() === 'i' ? 'I' : second.toLowerCase();
      return `${firstLower} and ${secondCorrect}`;
    });
// @ts-ignore
    correctedSentence = correctedSentence.replace(/\b([A-Z][a-z]+)\s+and\s+(He|She|It|You|We|They)\b/gi, (match, name, pronoun) => {
      return `${name} and ${pronoun.toLowerCase()}`;
    });
  }

  // Detectar nombres propios individuales que deberían empezar con mayúscula
  const personalPronouns = ['i', 'you', 'he', 'she', 'it', 'we', 'they'];
  if (!personalPronouns.includes(subject) && !sentence.match(/^[A-Z]/)) {
    // Es probable que sea un nombre propio mal capitalizado
    correctedSentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);
  }

  // Detectar y corregir artículos faltantes para profesiones/ocupaciones
  const professions = ['doctor', 'teacher', 'nurse', 'student', 'engineer', 'lawyer', 'artist', 'writer'];
  for (const profession of professions) {
    // Buscar patrones como "is doctor" o "am nurse" sin artículo
    const pattern = new RegExp(`\\b(am|is|are)\\s+${profession}\\b`, 'gi');
    if (pattern.test(correctedSentence)) {
      correctedSentence = correctedSentence.replace(pattern, `$1 a ${profession}`);
    }
  }

  // Detectar y corregir errores comunes con TO BE - PERO NO en sujetos compuestos

  // Correcciones para presente - solo si NO hay "and"
  if (!sentence.toLowerCase().includes(' and ')) {
    if (sentence.toLowerCase().includes(' are ') && (subject === 'i' || subject === 'he' || subject === 'she' || subject === 'it')) {
      if (subject === 'i') {
        correctedSentence = correctedSentence.replace(/\b(i)\s+are\b/gi, 'I am');
      } else {
        correctedSentence = correctedSentence.replace(/\b(he|she|it)\s+are/gi, (_, subj) =>
          subj.charAt(0).toUpperCase() + subj.slice(1) + ' is');
      }
    }

    if (sentence.toLowerCase().includes(' is ') && subject === 'i') {
      correctedSentence = correctedSentence.replace(/\b(i)\s+is\b/gi, 'I am');
    }

    if (sentence.toLowerCase().includes(' am ') && subject !== 'i') {
      if (['you', 'we', 'they'].includes(subject)) {
        correctedSentence = correctedSentence.replace(/\bam\b/gi, 'are');
      } else if (['he', 'she', 'it'].includes(subject)) {
        correctedSentence = correctedSentence.replace(/\bam\b/gi, 'is');
      }
    }

    if (sentence.toLowerCase().includes(' is ') && ['you', 'we', 'they'].includes(subject)) {
      correctedSentence = correctedSentence.replace(/\bis\b/gi, 'are');
    }
  }

  // Correcciones para pasado
  if (sentence.toLowerCase().includes(' were ') && ['i', 'he', 'she', 'it'].includes(subject)) {
    correctedSentence = correctedSentence.replace(/\bwere\b/gi, 'was');
  }

  if (sentence.toLowerCase().includes(' was ') && ['you', 'we', 'they'].includes(subject)) {
    correctedSentence = correctedSentence.replace(/\bwas\b/gi, 'were');
  }

  // Correcciones para preguntas
  if (sentence.trim().endsWith('?')) {
    // Corregir estructura de pregunta si está mal formada
    if (/^(i|you|he|she|it|we|they)\s+(am|are|is|was|were)/i.test(sentence)) {
      const match = sentence.match(/^(i|you|he|she|it|we|they)\s+(am|are|is|was|were)\s+(.+)/i);
      if (match) {
        const [, subj, verb, rest] = match;
        correctedSentence = `${verb.charAt(0).toUpperCase() + verb.slice(1)} ${subj.toLowerCase()} ${rest}`;
      }
    }
  }

  // Capitalizar primera letra si es necesario (para casos que no sean sujetos compuestos)
  if (!correctedSentence.includes(' and ')) {
    correctedSentence = correctedSentence.charAt(0).toUpperCase() + correctedSentence.slice(1);
  }

  return correctedSentence;
}

// Función para detectar errores específicos y dar explicaciones
function getErrorExplanation(sentence: string): string {
  const words = sentence.toLowerCase().trim().split(/\s+/);
  const subject = words[0];

  // Detectar nombres propios sin capitalización
  const personalPronouns = ['i', 'you', 'he', 'she', 'it', 'we', 'they'];
  if (!personalPronouns.includes(subject) && !sentence.match(/^[A-Z]/)) {
    return "Error: Proper nouns (names) must start with a capital letter.";
  }

  // ELIMINADO: Ya no detectamos artículos faltantes como error

  // Errores comunes detectados - usar límites de palabra para evitar falsos positivos
  if (/\bi\s+are\b/i.test(sentence)) {
    return "Error: 'I' always uses 'am', never 'are'. → I am";
  }

  if (/\bi\s+is\b/i.test(sentence)) {
    return "Error: 'I' always uses 'am', never 'is'. If you want to use 'is', try 'He is' or 'She is' instead.";
  }

  if (/\bi\s+was\b/i.test(sentence) && words.length > 2) {
    // Permitir "I was" pero sugerir alternativas si parece un error conceptual
    const complement = words.slice(2).join(' ');
    if (complement.includes('student') || complement.includes('teacher') || complement.includes('doctor')) {
      return "Note: 'I was' is correct for past tense. If you want present tense, use 'I am'. For third person, use 'He was' or 'She was'.";
    }
  }

  if (/\bi\s+were\b/i.test(sentence)) {
    return "Error: 'I' uses 'was' in past tense, never 'were'. If you want to use 'were', try 'You were', 'We were', or 'They were'.";
  }

  if ((subject === 'he' || subject === 'she' || subject === 'it') && /\s+are\s+/i.test(sentence)) {
    return `Error: '${subject.charAt(0).toUpperCase() + subject.slice(1)}' uses 'is' in present, not 'are'. If you want to use 'are', try 'You are', 'We are', or 'They are'.`;
  }

  if ((subject === 'you' || subject === 'we' || subject === 'they') && /\s+is\s+/i.test(sentence)) {
    return `Error: '${subject.charAt(0).toUpperCase() + subject.slice(1)}' uses 'are' in present, not 'is'. If you want to use 'is', try 'He is', 'She is', or 'It is'.`;
  }

  if ((subject === 'i' || subject === 'he' || subject === 'she' || subject === 'it') && /\s+were\s+/i.test(sentence)) {
    return `Error: '${subject.charAt(0).toUpperCase() + subject.slice(1)}' uses 'was' in past, not 'were'. If you want to use 'were', try 'You were', 'We were', or 'They were'.`;
  }

  if ((subject === 'you' || subject === 'we' || subject === 'they') && /\s+was\s+/i.test(sentence)) {
    return `Error: '${subject.charAt(0).toUpperCase() + subject.slice(1)}' uses 'were' in past, not 'was'. If you want to use 'was', try 'I was', 'He was', 'She was', or 'It was'.`;
  }

  return "Check the subject-verb agreement with TO BE.";
}
