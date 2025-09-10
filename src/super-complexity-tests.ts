// TESTS DE SUPER COMPLEJIDAD PARA EL VALIDADOR TO BE
// Estos tests cubren casos extremos y situaciones del mundo real muy complejas

import { validateSentence } from './validator';

// Función helper para ejecutar tests
function runComplexTest(description: string, sentence: string, expectedValid: boolean, expectedCorrection?: string) {
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

export function runSuperComplexityTests() {
  console.log('🔥 EJECUTANDO TESTS DE SUPER COMPLEJIDAD\n');
  console.log('=' .repeat(60));

  let passedTests = 0;
  let totalTests = 0;

  // TEST 23: SUPER COMPLEJIDAD - Sujetos múltiples extremos
  console.log('\n📝 TESTS DE SUPER COMPLEJIDAD - SUJETOS MÚLTIPLES:');

  totalTests++; passedTests += runComplexTest(
    'Triple sujeto con nombres propios',
    'Daniel and Maria and Carlos are students',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runComplexTest(
    'Triple sujeto con pronombres mixtos',
    'He and she and I are ready',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runComplexTest(
    'Cuádruple sujeto complejo',
    'The teacher and Daniel and I and she are here',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runComplexTest(
    'Sujeto con artículo + nombre + pronombre + nombre propio',
    'The doctor and I and Maria are working',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runComplexTest(
    'Error en triple sujeto - concordancia',
    'Daniel and Maria and Carlos is students',
    false,
    'Daniel and Maria and Carlos are students'
  ) ? 1 : 0;

  // TEST 24: SUPER COMPLEJIDAD - Capitalización extrema
  console.log('\n📝 TESTS DE SUPER COMPLEJIDAD - CAPITALIZACIÓN EXTREMA:');

  totalTests++; passedTests += runComplexTest(
    'Múltiples nombres sin capitalizar',
    'daniel and maria and carlos are students',
    false,
    'Daniel and Maria and Carlos are students'
  ) ? 1 : 0;

  totalTests++; passedTests += runComplexTest(
    'Nombres mezclados con artículos sin capitalizar',
    'the teacher and daniel and maria are here',
    false,
    'The teacher and Daniel and Maria are here'
  ) ? 1 : 0;

  totalTests++; passedTests += runComplexTest(
    'Capitalización parcial incorrecta',
    'Daniel and maria and CARLOS are students',
    false,
    'Daniel and Maria and Carlos are students'
  ) ? 1 : 0;

  // TEST 25: SUPER COMPLEJIDAD - Frases negativas complejas
  console.log('\n📝 TESTS DE SUPER COMPLEJIDAD - NEGATIVAS COMPLEJAS:');

  totalTests++; passedTests += runComplexTest(
    'Negación con sujetos múltiples',
    'Daniel and I and Maria are not ready',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runComplexTest(
    'Negación con contracción compleja',
    'The teacher and he and I aren\'t students',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runComplexTest(
    'Negación pasado con sujetos múltiples',
    'Daniel and Maria and I were not there',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runComplexTest(
    'Negación mixta con artículos',
    'The dog and the cat and I are not running',
    true
  ) ? 1 : 0;

  // TEST 26: SUPER COMPLEJIDAD - Preguntas extremas
  console.log('\n📝 TESTS DE SUPER COMPLEJIDAD - PREGUNTAS EXTREMAS:');

  totalTests++; passedTests += runComplexTest(
    'Pregunta con sujetos múltiples presente',
    'Are Daniel and Maria and I ready?',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runComplexTest(
    'Pregunta con sujetos múltiples pasado',
    'Were the teacher and Daniel and I there?',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runComplexTest(
    'Pregunta compleja con artículos',
    'Are the doctor and the nurse and you working?',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runComplexTest(
    'Pregunta con cinco sujetos',
    'Are he and she and I and you and they coming?',
    true
  ) ? 1 : 0;

  // TEST 27: SUPER COMPLEJIDAD - Complementos extremos
  console.log('\n📝 TESTS DE SUPER COMPLEJIDAD - COMPLEMENTOS EXTREMOS:');

  totalTests++; passedTests += runComplexTest(
    'Complemento con múltiples profesiones',
    'Daniel and I are doctors and teachers',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runComplexTest(
    'Complemento con lugar específico complejo',
    'The students and I are in the library at the university',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runComplexTest(
    'Complemento con edad y descripción',
    'Maria and Carlos and I are twenty years old and very happy',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runComplexTest(
    'Complemento con estado emocional complejo',
    'The teacher and the students and I are excited about the project',
    true
  ) ? 1 : 0;

  // TEST 28: SUPER COMPLEJIDAD - Errores múltiples combinados
  console.log('\n📝 TESTS DE SUPER COMPLEJIDAD - ERRORES MÚLTIPLES:');

  totalTests++; passedTests += runComplexTest(
    'Error triple: capitalización + concordancia + artículo',
    'daniel and maria is doctor',
    false,
    'Daniel and Maria are a doctor'
  ) ? 1 : 0;

  totalTests++; passedTests += runComplexTest(
    'Error cuádruple: múltiples nombres + concordancia',
    'daniel and maria and carlos and ana is students',
    false,
    'Daniel and Maria and Carlos and Ana are students'
  ) ? 1 : 0;

  totalTests++; passedTests += runComplexTest(
    'Error con artículo + capitalización + pronombre',
    'the teacher and daniel and i is working',
    false,
    'The teacher and Daniel and I are working'
  ) ? 1 : 0;

  // TEST 29: SUPER COMPLEJIDAD - Casos límite extremos
  console.log('\n📝 TESTS DE SUPER COMPLEJIDAD - CASOS LÍMITE:');

  totalTests++; passedTests += runComplexTest(
    'Seis sujetos con combinación total',
    'The doctor and Daniel and I and Maria and he and she are here',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runComplexTest(
    'Sujetos con números y adjetivos',
    'The first student and the second teacher and I are ready',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runComplexTest(
    'Sujetos con posesivos complejos',
    'My teacher and his friend and I are studying',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runComplexTest(
    'Frase súper larga con múltiples elementos',
    'The experienced doctor and the young nurse and the smart student and I are working together in the modern hospital',
    true
  ) ? 1 : 0;

  // TEST 30: SUPER COMPLEJIDAD - Pasado complejo
  console.log('\n📝 TESTS DE SUPER COMPLEJIDAD - PASADO EXTREMO:');

  totalTests++; passedTests += runComplexTest(
    'Pasado con múltiples sujetos y lugar',
    'Daniel and Maria and I were at the conference yesterday',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runComplexTest(
    'Pasado negativo con cinco sujetos',
    'The teacher and Daniel and Maria and he and I were not prepared',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runComplexTest(
    'Error pasado con concordancia múltiple',
    'Daniel and Maria and I was students',
    false,
    'Daniel and Maria and I were students'
  ) ? 1 : 0;

  totalTests++; passedTests += runComplexTest(
    'Pasado con error de capitalización múltiple',
    'daniel and maria and carlos were not there',
    false,
    'Daniel and Maria and Carlos were not there'
  ) ? 1 : 0;

  // TEST 31: SUPER COMPLEJIDAD - Casos del mundo real extremos
  console.log('\n📝 TESTS DE SUPER COMPLEJIDAD - MUNDO REAL EXTREMO:');

  totalTests++; passedTests += runComplexTest(
    'Escenario médico complejo',
    'The head surgeon and the anesthesiologist and the nurse and I are preparing for the operation',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runComplexTest(
    'Escenario educativo multinivel',
    'The principal and the vice-principal and the department head and the teachers and I are attending the conference',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runComplexTest(
    'Escenario empresarial internacional',
    'The CEO and the CFO and the international partners and the local representatives and I are negotiating the contract',
    true
  ) ? 1 : 0;

  totalTests++; passedTests += runComplexTest(
    'Error complejo mundo real - múltiples profesionales',
    'the doctor and the nurse and the technician and i is working',
    false,
    'The doctor and the nurse and the technician and I are working'
  ) ? 1 : 0;

  // RESUMEN FINAL DE SUPER COMPLEJIDAD
  console.log('\n' + '=' .repeat(60));
  console.log('🔥 RESUMEN DE TESTS DE SUPER COMPLEJIDAD:');
  console.log(`Total tests complejos: ${totalTests}`);
  console.log(`Tests pasados: ${passedTests}`);
  console.log(`Tests fallidos: ${totalTests - passedTests}`);
  console.log(`Porcentaje de éxito: ${((passedTests / totalTests) * 100).toFixed(1)}%`);

  if (passedTests === totalTests) {
    console.log('🎉 ¡TODOS LOS TESTS DE SUPER COMPLEJIDAD PASARON!');
    console.log('🏆 El validador maneja perfectamente casos extremos del mundo real');
  } else {
    console.log('⚠️  Algunos tests complejos fallaron. El validador necesita mejoras para casos extremos.');
  }

  console.log('\n🌟 CASOS EXTREMOS PROBADOS:');
  console.log('✅ Sujetos múltiples (hasta 6 elementos)');
  console.log('✅ Combinaciones complejas de nombres + pronombres + artículos');
  console.log('✅ Errores múltiples simultáneos');
  console.log('✅ Frases del mundo real profesional');
  console.log('✅ Capitalización extrema');
  console.log('✅ Complementos largos y descriptivos');

  return { passed: passedTests, total: totalTests };
}

// Auto-ejecutar si se llama directamente
if (typeof window === 'undefined') {
  runSuperComplexityTests();
}
