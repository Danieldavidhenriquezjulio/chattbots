// Test suite para el validador de frases con verbo TO BE
import { validateSentence, getExamples } from './validator';

// Función helper para ejecutar tests
function runTest(description: string, sentence: string, expectedValid: boolean, expectedCorrection?: string) {
  const result = validateSentence(sentence);
  const status = result.isValid === expectedValid ? '✅ PASS' : '❌ FAIL';

  console.log(`\n${status} ${description}`);
  console.log(`Input: "${sentence}"`);
  console.log(`Expected valid: ${expectedValid}, Got: ${result.isValid}`);
  console.log(`Message: ${result.message}`);

  if (result.correction) {
    console.log(`Correction: "${result.correction}"`);
    if (expectedCorrection && result.correction !== expectedCorrection) {
      console.log(`❌ Expected correction: "${expectedCorrection}"`);
    }
  } else if (expectedCorrection) {
    console.log(`❌ Expected correction: "${expectedCorrection}" but got none`);
  }

  return result.isValid === expectedValid;
}

// Ejecutar todos los tests
export function runAllTests() {
  console.log('🧪 EJECUTANDO TESTS DEL VALIDADOR TO BE\n');
  console.log('=' .repeat(50));

  let passedTests = 0;
  let totalTests = 0;

  // TEST 1: Casos válidos - Presente
  console.log('\n📝 TESTS DE FRASES VÁLIDAS - PRESENTE:');

  totalTests++; passedTests += runTest(
    'Pronombre I con am',
    'I am a teacher',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'Pronombre he con is',
    'He is happy',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'Nombre propio con is',
    'Mary is a doctor',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'Pronombre they con are',
    'They are students',
    true
  ) ? 1 : 0;

  // TEST 2: Casos de capitalización
  console.log('\n📝 TESTS DE CAPITALIZACIÓN:');

  totalTests++; passedTests += runTest(
    'Nombre propio sin capitalizar',
    'shi is a doctor',
    false,
    'Shi is a doctor'
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'Nombre john sin capitalizar',
    'john is a teacher',
    false,
    'John is a teacher'
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'Nombre maria sin capitalizar',
    'maria is happy',
    false,
    'Maria is happy'
  ) ? 1 : 0;

  // TEST 3: Casos de artículos opcionales (ahora ambas formas son válidas)
  console.log('\n📝 TESTS DE ARTÍCULOS OPCIONALES:');

  totalTests++; passedTests += runTest(
    'Con artículo - doctor',
    'He is a doctor',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'Sin artículo - doctor (también válido)',
    'He is doctor',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'Con artículo - teacher',
    'She is a teacher',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'Sin artículo - teacher (también válido)',
    'She is teacher',
    true
  ) ? 1 : 0;

  // TEST 4: Casos combinados (capitalización + artículo)
  console.log('\n📝 TESTS DE ERRORES COMBINADOS:');

  totalTests++; passedTests += runTest(
    'Sin capitalizar + sin artículo - doctor',
    'shi is doctor',
    false,
    'Shi is a doctor'
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'Sin capitalizar + sin artículo - nurse',
    'ana is nurse',
    false,
    'Ana is a nurse'
  ) ? 1 : 0;

  // TEST 5: Concordancia sujeto-verbo errónea
  console.log('\n📝 TESTS DE CONCORDANCIA SUJETO-VERBO:');

  totalTests++; passedTests += runTest(
    'I con are (incorrecto)',
    'I are happy',
    false,
    'I am happy'
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'He con are (incorrecto)',
    'He are a doctor',
    false,
    'He is a doctor'
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'They con is (incorrecto)',
    'They is students',
    false,
    'They are students'
  ) ? 1 : 0;

  // TEST 6: Frases negativas válidas
  console.log('\n📝 TESTS DE FRASES NEGATIVAS:');

  totalTests++; passedTests += runTest(
    'Negación con I am not',
    'I am not a teacher',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'Negación con is not',
    'She is not happy',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'Negación con aren\'t',
    'They aren\'t ready',
    true
  ) ? 1 : 0;

  // TEST 7: Tiempo pasado
  console.log('\n📝 TESTS DE TIEMPO PASADO:');

  totalTests++; passedTests += runTest(
    'Pasado válido - I was',
    'I was a student',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'Pasado válido - They were',
    'They were happy',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'Pasado incorrecto - I were',
    'I were happy',
    false,
    'I was happy'
  ) ? 1 : 0;

  // TEST 8: Preguntas
  console.log('\n📝 TESTS DE PREGUNTAS:');

  totalTests++; passedTests += runTest(
    'Pregunta válida - Are you',
    'Are you ready?',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'Pregunta válida - Is she',
    'Is she a doctor?',
    true
  ) ? 1 : 0;

  // TEST 9: Casos especiales
  console.log('\n📝 TESTS DE CASOS ESPECIALES:');

  totalTests++; passedTests += runTest(
    'Frase vacía',
    '',
    false
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'Solo espacios',
    '   ',
    false
  ) ? 1 : 0;

  // TEST 10: Sujetos compuestos con "and"
  console.log('\n📝 TESTS DE SUJETOS COMPUESTOS:');

  totalTests++; passedTests += runTest(
    'Capitalización incorrecta - daniel and juan',
    'daniel and juan is young',
    false,
    'Daniel and Juan are young'
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'Concordancia incorrecta - Daniel and Juan is',
    'Daniel and Juan is young',
    false,
    'Daniel and Juan are young'
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'Correcto - Daniel and Juan are',
    'Daniel and Juan are young',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'Sin artículo pero válido - Daniel and Juan are student',
    'Daniel and Juan are student',
    true
  ) ? 1 : 0;

  // TEST 11: Sujetos compuestos con pronombres
  console.log('\n📝 TESTS DE SUJETOS COMPUESTOS CON PRONOMBRES:');

  totalTests++; passedTests += runTest(
    'Pronombres he and he are',
    'He and he are student',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'Pronombres he and she are',
    'He and she are student',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'Pronombres she and he are',
    'She and he are student',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'Pronombres he and I are',
    'He and I are student',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'Pronombres I and he are',
    'I and he are student',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'Pronombres she and I are',
    'She and I are student',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'Pronombres you and he are',
    'You and he are student',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'Pronombres we and they are',
    'We and they are student',
    true
  ) ? 1 : 0;

  // TEST 12: Sujetos mixtos - nombres + pronombres
  console.log('\n📝 TESTS DE SUJETOS MIXTOS (NOMBRES + PRONOMBRES):');

  totalTests++; passedTests += runTest(
    'Nombre y pronombre - Daniel and he are',
    'Daniel and he are student',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'Pronombre y nombre - he and Daniel are',
    'He and Daniel are student',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'Nombre y pronombre - Mary and she are',
    'Mary and she are student',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'Pronombre y nombre - she and Mary are',
    'She and Mary are student',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'Nombre y pronombre - Daniel and I are',
    'Daniel and I are student',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'Pronombre y nombre - I and Daniel are',
    'I and Daniel are student',
    true
  ) ? 1 : 0;

  // TEST 13: Errores de concordancia con sujetos compuestos
  console.log('\n📝 TESTS DE ERRORES DE CONCORDANCIA COMPUESTOS:');

  totalTests++; passedTests += runTest(
    'Error concordancia - he and she is (debería ser are)',
    'He and she is student',
    false,
    'He and she are student'
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'Error concordancia - Daniel and Mary is (debería ser are)',
    'Daniel and Mary is student',
    false,
    'Daniel and Mary are student'
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'Error concordancia - Daniel and he is (debería ser are)',
    'Daniel and he is student',
    false,
    'Daniel and he are student'
  ) ? 1 : 0;

  // TEST 14: Errores de capitalización en sujetos compuestos
  console.log('\n📝 TESTS DE ERRORES DE CAPITALIZACIÓN COMPUESTOS:');

  totalTests++; passedTests += runTest(
    'Error capitalización - daniel and mary is (múltiples errores)',
    'daniel and mary is student',
    false,
    'Daniel and Mary are student'
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'Error capitalización - daniel and he are',
    'daniel and he are student',
    false,
    'Daniel and he are student'
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'Error capitalización - mary and she are',
    'mary and she are student',
    false,
    'Mary and she are student'
  ) ? 1 : 0;

  // TEST 15: Casos con artículos opcionales en sujetos compuestos
  console.log('\n📝 TESTS DE ARTÍCULOS OPCIONALES COMPUESTOS:');

  totalTests++; passedTests += runTest(
    'Plural válido - he and she are students',
    'He and she are students',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'Singular sin artículo válido - he and she are student',
    'He and she are student',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'Plural válido - Daniel and Mary are teachers',
    'Daniel and Mary are teachers',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'Singular sin artículo válido - Daniel and Mary are teacher',
    'Daniel and Mary are teacher',
    true
  ) ? 1 : 0;

  // TEST 16: Diferentes tipos de complementos con sujetos compuestos
  console.log('\n📝 TESTS DE DIFERENTES COMPLEMENTOS COMPUESTOS:');

  totalTests++; passedTests += runTest(
    'Adjetivo - he and she are happy',
    'He and she are happy',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'Adjetivo - Daniel and Mary are young',
    'Daniel and Mary are young',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'Lugar - he and I are here',
    'He and I are here',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'Profesión plural - she and he are doctors',
    'She and he are doctors',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'Profesión singular - she and he are doctor',
    'She and he are doctor',
    true
  ) ? 1 : 0;

  // TEST 17: Verbo TO BE - Presente EXHAUSTIVO
  console.log('\n📝 TESTS EXHAUSTIVOS - TO BE PRESENTE:');

  totalTests++; passedTests += runTest(
    'I am - con profesión',
    'I am a nurse',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'I am - con adjetivo',
    'I am tired',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'You are - singular',
    'You are smart',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'You are - con profesión',
    'You are a lawyer',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'He is - con adjetivo',
    'He is tall',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'He is - con lugar',
    'He is here',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'She is - con profesión',
    'She is an engineer',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'She is - con nacionalidad',
    'She is Mexican',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'It is - con adjetivo',
    'It is beautiful',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'It is - con lugar',
    'It is on the table',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'We are - con adjetivo',
    'We are ready',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'We are - con profesión plural',
    'We are teachers',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'They are - con lugar',
    'They are at home',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'They are - con edad',
    'They are young',
    true
  ) ? 1 : 0;

  // TEST 18: Verbo TO BE - Presente Negativo EXHAUSTIVO
  console.log('\n📝 TESTS EXHAUSTIVOS - TO BE PRESENTE NEGATIVO:');

  totalTests++; passedTests += runTest(
    'I am not - forma completa',
    'I am not angry',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'I\'m not - contracción',
    'I\'m not a doctor',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'You are not - forma completa',
    'You are not late',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'You aren\'t - contracción',
    'You aren\'t my teacher',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'He is not - forma completa',
    'He is not here',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'He isn\'t - contracción',
    'He isn\'t a student',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'She is not - con adjetivo',
    'She is not busy',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'She isn\'t - con profesión',
    'She isn\'t a lawyer',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'It is not - forma completa',
    'It is not expensive',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'It isn\'t - contracción',
    'It isn\'t my car',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'We are not - forma completa',
    'We are not ready',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'We aren\'t - contracción',
    'We aren\'t students',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'They are not - forma completa',
    'They are not at work',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'They aren\'t - contracción',
    'They aren\'t my friends',
    true
  ) ? 1 : 0;

  // TEST 19: Verbo TO BE - Pasado EXHAUSTIVO
  console.log('\n📝 TESTS EXHAUSTIVOS - TO BE PASADO:');

  totalTests++; passedTests += runTest(
    'I was - con profesión',
    'I was a teacher',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'I was - con lugar',
    'I was at school',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'You were - singular',
    'You were right',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'You were - con adjetivo',
    'You were very kind',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'He was - con edad',
    'He was twenty years old',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'He was - con estado',
    'He was sick',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'She was - con profesión',
    'She was a nurse',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'She was - con lugar',
    'She was in Paris',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'It was - con adjetivo',
    'It was amazing',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'It was - con descripción',
    'It was a beautiful day',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'We were - con estado',
    'We were happy',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'We were - con lugar',
    'We were at the beach',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'They were - con profesión plural',
    'They were doctors',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'They were - con estado',
    'They were tired',
    true
  ) ? 1 : 0;

  // TEST 20: Verbo TO BE - Pasado Negativo EXHAUSTIVO
  console.log('\n📝 TESTS EXHAUSTIVOS - TO BE PASADO NEGATIVO:');

  totalTests++; passedTests += runTest(
    'I was not - forma completa',
    'I was not there',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'I wasn\'t - contracción',
    'I wasn\'t a student',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'You were not - forma completa',
    'You were not wrong',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'You weren\'t - contracción',
    'You weren\'t at home',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'He was not - forma completa',
    'He was not happy',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'He wasn\'t - contracción',
    'He wasn\'t my teacher',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'She was not - con estado',
    'She was not ready',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'She wasn\'t - con lugar',
    'She wasn\'t in the office',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'It was not - forma completa',
    'It was not easy',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'It wasn\'t - contracción',
    'It wasn\'t my fault',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'We were not - forma completa',
    'We were not invited',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'We weren\'t - contracción',
    'We weren\'t late',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'They were not - forma completa',
    'They were not here',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'They weren\'t - contracción',
    'They weren\'t my friends',
    true
  ) ? 1 : 0;

  // TEST 21: Preguntas - Presente EXHAUSTIVO
  console.log('\n📝 TESTS EXHAUSTIVOS - PREGUNTAS PRESENTE:');

  totalTests++; passedTests += runTest(
    'Am I - pregunta básica',
    'Am I correct?',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'Am I - con profesión',
    'Am I a good teacher?',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'Are you - pregunta básica',
    'Are you ready?',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'Are you - con estado',
    'Are you feeling well?',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'Is he - pregunta básica',
    'Is he coming?',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'Is he - con profesión',
    'Is he a doctor?',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'Is she - pregunta básica',
    'Is she here?',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'Is she - con adjetivo',
    'Is she happy?',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'Is it - pregunta básica',
    'Is it working?',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'Is it - con lugar',
    'Is it on the desk?',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'Are we - pregunta básica',
    'Are we late?',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'Are we - con lugar',
    'Are we in the right place?',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'Are they - pregunta básica',
    'Are they coming?',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'Are they - con profesión',
    'Are they teachers?',
    true
  ) ? 1 : 0;

  // TEST 22: Preguntas - Pasado EXHAUSTIVO
  console.log('\n📝 TESTS EXHAUSTIVOS - PREGUNTAS PASADO:');

  totalTests++; passedTests += runTest(
    'Was I - pregunta básica',
    'Was I right?',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'Was I - con lugar',
    'Was I at the meeting?',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'Were you - pregunta básica',
    'Were you there?',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'Were you - con estado',
    'Were you surprised?',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'Was he - pregunta básica',
    'Was he sick?',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'Was he - con profesión',
    'Was he a good student?',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'Was she - pregunta básica',
    'Was she happy?',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'Was she - con lugar',
    'Was she at work?',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'Was it - pregunta básica',
    'Was it difficult?',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'Was it - con descripción',
    'Was it a good movie?',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'Were we - pregunta básica',
    'Were we invited?',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'Were we - con estado',
    'Were we too late?',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'Were they - pregunta básica',
    'Were they at home?',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runTest(
    'Were they - con profesión',
    'Were they good teachers?',
    true
  ) ? 1 : 0;

  // RESUMEN FINAL
  console.log('\n' + '=' .repeat(50));
  console.log('📊 RESUMEN DE TESTS:');
  console.log(`Total tests: ${totalTests}`);
  console.log(`Tests pasados: ${passedTests}`);
  console.log(`Tests fallidos: ${totalTests - passedTests}`);
  console.log(`Porcentaje de éxito: ${((passedTests / totalTests) * 100).toFixed(1)}%`);

  if (passedTests === totalTests) {
    console.log('🎉 ¡TODOS LOS TESTS PASARON!');
  } else {
    console.log('⚠️  Algunos tests fallaron. Revisar implementación.');
  }

  // Mostrar ejemplos disponibles
  console.log('\n📚 EJEMPLOS DISPONIBLES:');
  const examples = getExamples();
  examples.forEach((example, index) => {
    console.log(`${index + 1}. ${example}`);
  });

  return { passed: passedTests, total: totalTests };
}

// Función para test interactivo
export function testSentence(sentence: string) {
  console.log('\n🔍 TESTING SENTENCE:');
  console.log(`Input: "${sentence}"`);

  const result = validateSentence(sentence);

  console.log(`Valid: ${result.isValid}`);
  console.log(`Type: ${result.type}`);
  console.log(`Tense: ${result.tense}`);
  console.log(`Message: ${result.message}`);

  if (result.correction) {
    console.log(`Suggested correction: "${result.correction}"`);
  }

  return result;
}

// Función específica para probar el caso "shi is doctor"
export function testShiIsDoctor() {
  console.log('\n🎯 TEST ESPECÍFICO: "shi is doctor"');
  console.log('=' .repeat(40));

  const result = testSentence('shi is doctor');

  console.log('\n✅ Resultado esperado:');
  console.log('- Valid: false');
  console.log('- Error detectado: Capitalización + Artículo faltante');
  console.log('- Corrección: "Shi is a doctor"');

  return result;
}

// Si este archivo se ejecuta directamente
if (typeof window === 'undefined') {
  // Ejecutar tests automáticamente si estamos en Node.js
  runAllTests();
}
