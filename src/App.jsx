import React, { useState } from "react"
import "./App.css"

// PASTE YOUR GOOGLE APPS SCRIPT WEB APP URL BELOW:
const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbysXnNMhIQfv7Ofs9gbuGQYmxIKdLlUpy_MLkDHIJUAVSN7aZPFh3FHYElwm26YNgrB/exec"

const CONTENT = {
    en: {
        langLabel: "Español",
        flag: "🇲🇽",
        title: "Edinburgh Postnatal Depression Scale (EPDS)",
        subtitle:
            "Your Personal Postpartum Wellness Screening & Resource Guide",
        acknowledgmentTitle: "ACKNOWLEDGMENT AND LIMITATION OF LIABILITY:",
        acknowledgmentParagraphs: [
            "By completing this questionnaire, I understand that the Edinburgh Postnatal Depression Scale (EPDS) is a screening tool used solely to assist the NICU care team in evaluating environmental factors impacting my infant’s care plan.",
            "I explicitly acknowledge that this screening does not constitute a formal psychiatric diagnosis, clinical evaluation, or the establishment of a doctor-patient relationship between myself and Methodist Mansfield Medical Center or its NICU staff.",
            "I understand and agree that it is my sole responsibility to follow up with my primary care physician, obstetric provider, or a licensed mental health professional for formal evaluation, diagnosis, and treatment. Methodist Mansfield Medical Center and its employees assume no ongoing liability for my outpatient psychiatric or medical care.",
        ],
        losSectionTitle: "NICU Stay Information",
        losLabel:
            "How many days has your baby been in the NICU? (Enter 0 if born today):",
        losPlaceholder: "e.g., 7",
        losHelper:
            "Recorded anonymously as total days in the NICU. No names, birth dates, or personal identifiers are collected.",
        losWarning:
            "Please enter the number of days your baby has been in the NICU (0 or greater).",
        instructionsTitle: "Instructions",
        instructionsText:
            "Since you are either pregnant or have recently had a baby, we want to know how you feel. Please select the answer that comes closest to how you have felt IN THE PAST 7 DAYS—not just how you feel today. Complete all 10 items. This is a screening test; not a medical diagnosis. If something doesn’t seem right, call your health care provider regardless of your score.",
        exampleTitle: "Example (Already Completed)",
        examplePrompt: "I have felt happy:",
        exampleOptions: [
            { label: "Yes, all the time", checked: false },
            { label: "Yes, most of the time", checked: true },
            { label: "No, not very often", checked: false },
            { label: "No, not at all", checked: false },
        ],
        exampleNote:
            'This would mean: "I have felt happy most of the time" in the past week. Please complete the other questions in the same way.',
        questions: [
            {
                id: 1,
                text: "1. I have been able to laugh and see the funny side of things:",
                options: [
                    { label: "As much as I always could", score: 0 },
                    { label: "Not quite so much now", score: 1 },
                    { label: "Definitely not so much now", score: 2 },
                    { label: "Not at all", score: 3 },
                ],
            },
            {
                id: 2,
                text: "2. I have looked forward with enjoyment to things:",
                options: [
                    { label: "As much as I ever did", score: 0 },
                    { label: "Rather less than I used to", score: 1 },
                    { label: "Definitely less than I used to", score: 2 },
                    { label: "Hardly at all", score: 3 },
                ],
            },
            {
                id: 3,
                text: "3. I have blamed myself unnecessarily when things went wrong:",
                options: [
                    { label: "Yes, most of the time", score: 3 },
                    { label: "Yes, some of the time", score: 2 },
                    { label: "Not very often", score: 1 },
                    { label: "No, never", score: 0 },
                ],
            },
            {
                id: 4,
                text: "4. I have been anxious or worried for no good reason:",
                options: [
                    { label: "No, not at all", score: 0 },
                    { label: "Hardly ever", score: 1 },
                    { label: "Yes, sometimes", score: 2 },
                    { label: "Yes, very often", score: 3 },
                ],
            },
            {
                id: 5,
                text: "5. I have felt scared or panicky for no good reason:",
                options: [
                    { label: "Yes, quite a lot", score: 3 },
                    { label: "Yes, sometimes", score: 2 },
                    { label: "No, not much", score: 1 },
                    { label: "No, not at all", score: 0 },
                ],
            },
            {
                id: 6,
                text: "6. Things have been getting to me:",
                options: [
                    {
                        label: "Yes, most of the time I haven’t been able to cope at all",
                        score: 3,
                    },
                    {
                        label: "Yes, sometimes I haven’t been coping as well as usual",
                        score: 2,
                    },
                    {
                        label: "No, most of the time I have coped quite well",
                        score: 1,
                    },
                    { label: "No, I have been coping as ever", score: 0 },
                ],
            },
            {
                id: 7,
                text: "7. I have been so unhappy that I have had difficulty sleeping:",
                options: [
                    { label: "Yes, most of the time", score: 3 },
                    { label: "Yes, sometimes", score: 2 },
                    { label: "Not very often", score: 1 },
                    { label: "No, not at all", score: 0 },
                ],
            },
            {
                id: 8,
                text: "8. I have felt sad or miserable:",
                options: [
                    { label: "Yes, most of the time", score: 3 },
                    { label: "Yes, quite often", score: 2 },
                    { label: "Not very often", score: 1 },
                    { label: "No, not at all", score: 0 },
                ],
            },
            {
                id: 9,
                text: "9. I have been so unhappy that I have been crying:",
                options: [
                    { label: "Yes, most of the time", score: 3 },
                    { label: "Yes, quite often", score: 2 },
                    { label: "Only occasionally", score: 1 },
                    { label: "No, never", score: 0 },
                ],
            },
            {
                id: 10,
                text: "10. The thought of harming myself has occurred to me:*",
                options: [
                    { label: "Yes, quite often", score: 3 },
                    { label: "Sometimes", score: 2 },
                    { label: "Hardly ever", score: 1 },
                    { label: "Never", score: 0 },
                ],
            },
        ],
        submitBtn: "View My Score & Personalized Next Steps",
        submittingBtn: "Submitting...",
        resetBtn: "Clear & Start Over",
        incompleteWarning:
            "Please enter the NICU length of stay and answer all 10 questions before viewing your results.",
        progressText: "Completed",
        resultsHeading: "Your Personal Postpartum Wellness Resource Guide",
        totalScoreLabel: "Your Total EPDS Score",
        q10ScoreLabel: "Question 10 Score",
        tiers: {
            urgent: {
                badge: "Urgent Emotional Crisis / Immediate Safety Need",
                condition: "You scored 1, 2, or 3 on Question 10",
                summary:
                    "Please know that you are not alone, these feelings are a medical emergency, and help is available right now.",
                stepsTitle: "Your Personal Next Steps:",
                steps: [
                    {
                        title: "Alert Someone Immediately",
                        desc: "Tell your bedside nurse, the Charge Nurse, or any NICU staff member right away that you need immediate support.",
                    },
                    {
                        title: "Go to the Emergency Room",
                        desc: "If you are not at the hospital, please immediately transport yourself to the nearest Emergency Room for a professional evaluation.",
                    },
                    {
                        title: "Call a Crisis Line",
                        desc: "Connect instantly with a compassionate crisis counselor by calling or texting 988 or 1-800-866-2465.",
                    },
                ],
            },
            moderate: {
                badge: "Mild to Moderate Emotional Elevation",
                condition:
                    "Total Score of 10 or Higher (with 0 on Question 10)",
                summary:
                    "Your score suggests you may be experiencing symptoms of postpartum depression or anxiety. You do not have to carry this heavy burden alone, and reaching out for support can help you feel like yourself again.",
                stepsTitle: "Your Personal Next Steps:",
                steps: [
                    {
                        title: "Connect with Your Care Team",
                        desc: "Reach out to your primary OB/GYN or request to speak with the NICU social worker or case manager. They can help connect you with local mental health professionals or use clinical consultation services like PeriPAN.",
                    },
                    {
                        title: "Explore Local Counseling & Support",
                        desc: "Reach out directly to one of the dedicated Mansfield providers or free maternal support networks listed below to schedule a consultation.",
                    },
                ],
            },
            low: {
                badge: "Healthy Coping / Low Visual Signs of Clinical Depression",
                condition: "Total Score Under 10 (with 0 on Question 10)",
                summary:
                    'Having a baby in the NICU is incredibly stressful. It is completely normal to experience a wide range of emotions, often called the "baby blues."',
                stepsTitle: "Your Personal Next Steps:",
                steps: [
                    {
                        title: "Stay Informed",
                        desc: "Review the standard maternal warning signs to help you distinguish between standard NICU stress and postpartum depression. Take care of yourself by getting sleep (nap when the baby naps), asking friends and family for help, drinking plenty of fluids, eating a good diet, and getting exercise—even if it is just walking outside.",
                    },
                    {
                        title: "Keep Screening",
                        desc: "Emotional wellness can fluctuate. Please remember to scan the bedside QR code weekly throughout your baby's stay and once more at discharge.",
                    },
                ],
            },
        },
        disclaimer:
            "Please note: The Edinburgh Postnatal Depression Scale (EPDS) is a screening tool that does not diagnose postpartum depression (PPD) or anxiety. Regardless of your score, if you have concerns about depression or anxiety, please contact your health care provider.",
        directory: {
            heading: "Your Local Support & Resource Directory",
            hotlinesTitle: "Free, Confidential 24/7 Hotlines & Emergency Lines",
            hotlines: [
                {
                    name: "National Suicide & Crisis Lifeline",
                    detail: "Call or Text 988 for urgent psychological safety guidance.",
                    tel: "988",
                },
                {
                    name: "Tarrant County ICARE Crisis Line",
                    detail: "Call or Text 1-800-866-2465 for local immediate behavioral support.",
                    tel: "18008662465",
                },
                {
                    name: "National Maternal Mental Health Hotline",
                    detail: "Call or Text 1-833-852-6262 (1-833-TLC-MAMA) for a supportive counselor.",
                    tel: "18338526262",
                },
            ],
            clinicsTitle:
                "Specialized Perinatal & Behavioral Health Clinics (Mansfield, TX)",
            clinics: [
                {
                    name: "Iroko Psychiatry",
                    address:
                        "600 Strada Circle, Suite 208, Mansfield, TX 76063",
                    phone: "469-482-3708",
                    tel: "4694823708",
                },
                {
                    name: "Healing Hope Behavioral Clinic",
                    address: "733 U.S. 287 Frontage Rd, Mansfield, TX 76063",
                    phone: "469-225-3670",
                    tel: "4692253670",
                },
            ],
            programsTitle: "100% Free Maternal Support Programs",
            programs: [
                {
                    name: "The Perinatal Psychiatry Access Network (PeriPAN) Texas",
                    desc: "A Texas-wide network that connects your obstetrician, pediatrician, or NICU providers directly to reproductive psychiatrists to immediately improve, guide, and fast-track your maternal mental health treatment plan. Ask your doctor to call PeriPAN for a direct resource referral.",
                },
                {
                    name: "Help Me Grow North Texas / MHMR Perinatal Connections",
                    desc: "Connects you with free personal support coaches, nurses, and specialized counseling for up to 1 year postpartum. Phone: 844-689-5437",
                    tel: "8446895437",
                },
                {
                    name: "Catholic Charities Fort Worth (Blessed Beginnings)",
                    desc: "Offers free parenting groups, postpartum education classes, and supportive counseling tracks.",
                },
                {
                    name: "Postpartum Support International (PSI)",
                    desc: 'Direct links to localized support networks and specialized online group therapy. Call 1-800-944-4773 or Text "HELP" to 503-894-9453.',
                    tel: "18009444773",
                },
            ],
        },
        copyright:
            "Edinburgh Postnatal Depression Scale (EPDS). Adapted from the British Journal of Psychiatry, June, 1987, vol. 150 by J.L. Cox, J.M. Holden, R. Sagovsky.",
    },

    es: {
        langLabel: "English",
        flag: "🇺🇸",
        title: "Escala Edinburgh para la Depresión Postnatal (EPDS)",
        subtitle:
            "Guía Personal de Detección y Recursos para el Bienestar Posparto",
        acknowledgmentTitle: "RECONOCIMIENTO Y LIMITACIÓN DE RESPONSABILIDAD:",
        acknowledgmentParagraphs: [
            "Al completar este cuestionario, entiendo que la Escala de Depresión Postnatal de Edimburgo (EPDS) es una herramienta de detección utilizada únicamente para ayudar al equipo de atención de la NICU a evaluar los factores ambientales que influyen en el plan de atención de mi bebé.",
            "Reconozco explícitamente que esta evaluación no constituye un diagnóstico psiquiátrico formal, una evaluación clínica ni el establecimiento de una relación médico-paciente entre mi persona y Methodist Mansfield Medical Center o su personal de la NICU.",
            "Entiendo y acepto que es mi exclusiva responsabilidad hacer seguimiento con mi médico de atención primaria, mi proveedor obstétrico o un profesional de salud mental con licencia para una evaluación formal, diagnóstico y tratamiento. Methodist Mansfield Medical Center y sus empleados no asumen ninguna responsabilidad continua por mi atención psiquiátrica o médica ambulatoria.",
        ],
        losSectionTitle: "Información de Estadía en la NICU",
        losLabel:
            "¿Cuántos días ha estado su bebé en la NICU? (Ingrese 0 si nació hoy):",
        losPlaceholder: "ej., 7",
        losHelper:
            "Se registra de forma anónima como el total de días en la NICU. No se recopilan nombres, fechas de nacimiento ni datos personales.",
        losWarning:
            "Por favor ingrese el número de días que su bebé ha estado en la NICU (0 o más).",
        instructionsTitle: "Instrucciones",
        instructionsText:
            "Como usted está embarazada o hace poco que tuvo un bebé, nos gustaría saber como se siente actualmente. Por favor MARQUE la respuesta que más se acerca a como se ha sentido durante LOS ÚLTIMOS 7 DÍAS y no sólo como se ha sentido hoy. Complete las 10 preguntas. Esta es una prueba de detección; no es un diagnóstico médico. Si algo no parece estar bien, llame a su proveedor de atención médica sin importar su puntaje.",
        exampleTitle: "Ejemplo (Ya Completado)",
        examplePrompt: "Me he sentido feliz:",
        exampleOptions: [
            { label: "Sí, todo el tiempo", checked: false },
            { label: "Sí, la mayor parte del tiempo", checked: true },
            { label: "No, no muy a menudo", checked: false },
            { label: "No, en absoluto", checked: false },
        ],
        exampleNote:
            'Esto significa: "Me he sentido feliz la mayor parte del tiempo" durante la última semana. Por favor complete las otras preguntas de la misma manera.',
        questions: [
            {
                id: 1,
                text: "1. He podido reír y ver el lado bueno de las cosas:",
                options: [
                    { label: "Tanto como siempre he podido hacerlo", score: 0 },
                    { label: "No tanto ahora", score: 1 },
                    { label: "Sin duda, mucho menos ahora", score: 2 },
                    { label: "No, en absoluto", score: 3 },
                ],
            },
            {
                id: 2,
                text: "2. He mirado al futuro con placer para hacer cosas:",
                options: [
                    { label: "Tanto como siempre", score: 0 },
                    { label: "Algo menos de lo que solía hacerlo", score: 1 },
                    {
                        label: "Definitivamente menos de lo que solía hacerlo",
                        score: 2,
                    },
                    { label: "Prácticamente nunca", score: 3 },
                ],
            },
            {
                id: 3,
                text: "3. Me he culpado sin necesidad cuando las cosas marchaban mal:",
                options: [
                    { label: "Sí, casi siempre", score: 3 },
                    { label: "Sí, algunas veces", score: 2 },
                    { label: "No muy a menudo", score: 1 },
                    { label: "No, nunca", score: 0 },
                ],
            },
            {
                id: 4,
                text: "4. He estado ansiosa y preocupada sin motivo alguno:",
                options: [
                    { label: "No, en absoluto", score: 0 },
                    { label: "Casi nada", score: 1 },
                    { label: "Sí, a veces", score: 2 },
                    { label: "Sí, muy a menudo", score: 3 },
                ],
            },
            {
                id: 5,
                text: "5. He sentido miedo o pánico sin motivo alguno:",
                options: [
                    { label: "Sí, bastante", score: 3 },
                    { label: "Sí, a veces", score: 2 },
                    { label: "No, no mucho", score: 1 },
                    { label: "No, en absoluto", score: 0 },
                ],
            },
            {
                id: 6,
                text: "6. Las cosas me oprimen o agobian:",
                options: [
                    {
                        label: "Sí, la mayor parte del tiempo no he podido sobrellevarlas",
                        score: 3,
                    },
                    {
                        label: "Sí, a veces no he podido sobrellevarlas de la manera habitual",
                        score: 2,
                    },
                    {
                        label: "No, la mayoría de las veces he podido sobrellevarlas bastante bien",
                        score: 1,
                    },
                    {
                        label: "No, he podido sobrellevarlas tan bien como lo he hecho siempre",
                        score: 0,
                    },
                ],
            },
            {
                id: 7,
                text: "7. Me he sentido tan infeliz, que he tenido dificultad para dormir:",
                options: [
                    { label: "Sí, casi siempre", score: 3 },
                    { label: "Sí, a veces", score: 2 },
                    { label: "No muy a menudo", score: 1 },
                    { label: "No, en absoluto", score: 0 },
                ],
            },
            {
                id: 8,
                text: "8. Me he sentido triste y desgraciada:",
                options: [
                    { label: "Sí, casi siempre", score: 3 },
                    { label: "Sí, bastante a menudo", score: 2 },
                    { label: "No muy a menudo", score: 1 },
                    { label: "No, en absoluto", score: 0 },
                ],
            },
            {
                id: 9,
                text: "9. Me he sentido tan infeliz que he estado llorando:",
                options: [
                    { label: "Sí, casi siempre", score: 3 },
                    { label: "Sí, bastante a menudo", score: 2 },
                    { label: "Ocasionalmente", score: 1 },
                    { label: "No, nunca", score: 0 },
                ],
            },
            {
                id: 10,
                text: "10. He pensado en hacerme daño:*",
                options: [
                    { label: "Sí, bastante a menudo", score: 3 },
                    { label: "A veces", score: 2 },
                    { label: "Casi nunca", score: 1 },
                    { label: "No, nunca", score: 0 },
                ],
            },
        ],
        submitBtn: "Ver Mi Puntaje y Próximos Pasos",
        submittingBtn: "Enviando...",
        resetBtn: "Borrar y Comenzar de Nuevo",
        incompleteWarning:
            "Por favor ingrese los días en la NICU y responda las 10 preguntas antes de ver sus resultados.",
        progressText: "Completado",
        resultsHeading:
            "Su Guía Personal de Recursos para el Bienestar Posparto",
        totalScoreLabel: "Su Puntaje Total EPDS",
        q10ScoreLabel: "Puntaje de la Pregunta 10",
        tiers: {
            urgent: {
                badge: "Crisis Emocional Urgente / Necesidad de Seguridad Inmediata",
                condition: "Obtuvo 1, 2 o 3 puntos en la Pregunta 10",
                summary:
                    "Por favor sepa que no está sola, estos sentimientos son una emergencia médica y hay ayuda disponible ahora mismo.",
                stepsTitle: "Sus Próximos Pasos Personales:",
                steps: [
                    {
                        title: "Avise a Alguien de Inmediato",
                        desc: "Informe de inmediato a su enfermera, a la enfermera encargada (Charge Nurse) o a cualquier miembro del personal de la NICU que necesita apoyo inmediato.",
                    },
                    {
                        title: "Vaya a la Sala de Emergencias",
                        desc: "Si no se encuentra en el hospital, trasládese de inmediato a la Sala de Emergencias más cercana para una evaluación profesional.",
                    },
                    {
                        title: "Llame a una Línea de Crisis",
                        desc: "Conéctese al instante con un consejero de crisis llamando o enviando un mensaje de texto al 988 o al 1-800-866-2465.",
                    },
                ],
            },
            moderate: {
                badge: "Elevación Emocional Leve a Moderada",
                condition:
                    "Puntaje Total de 10 o Más (con 0 en la Pregunta 10)",
                summary:
                    "Su puntaje sugiere que puede estar experimentando síntomas de depresión o ansiedad posparto. No tiene que cargar con este peso sola; buscar apoyo puede ayudarle a sentirse usted misma nuevamente.",
                stepsTitle: "Sus Próximos Pasos Personales:",
                steps: [
                    {
                        title: "Comuníquese con su Equipo de Atención",
                        desc: "Comuníquese con su obstetra/ginecólogo (OB/GYN) o pida hablar con el trabajador social o administrador de casos de la NICU. Ellos pueden conectarle con profesionales locales de salud mental o utilizar servicios de consulta clínica como PeriPAN.",
                    },
                    {
                        title: "Explore Consejería y Apoyo Local",
                        desc: "Comuníquese directamente con uno de los proveedores dedicados en Mansfield o con las redes gratuitas de apoyo materno que figuran a continuación para programar una consulta.",
                    },
                ],
            },
            low: {
                badge: "Afrontamiento Saludable / Señales Bajas de Depresión Clínica",
                condition:
                    "Puntaje Total Menor de 10 (con 0 en la Pregunta 10)",
                summary:
                    'Tener un bebé en la NICU es increíblemente estresante. Es completamente normal experimentar una amplia gama de emociones, a menudo llamadas "tristeza posparto" (baby blues).',
                stepsTitle: "Sus Próximos Pasos Personales:",
                steps: [
                    {
                        title: "Manténgase Informada",
                        desc: "Revise las señales de advertencia materna estándar para ayudarle a distinguir entre el estrés normal de la NICU y la depresión posparto. Cuídese durmiendo cuando el bebé duerme, pidiendo ayuda a familiares y amigos, tomando suficientes líquidos, comiendo bien y haciendo ejercicio aunque sea caminar al aire libre.",
                    },
                    {
                        title: "Continúe con el Seguimiento",
                        desc: "El bienestar emocional puede fluctuar. Recuerde escanear el código QR semanalmente durante la estadía de su bebé y una vez más al momento del alta.",
                    },
                ],
            },
        },
        disclaimer:
            "Nota importante: La Escala de Depresión Postnatal de Edimburgo (EPDS) es una herramienta de detección que no diagnostica la depresión posparto (DPP) ni la ansiedad. Sin importar su puntaje, si tiene inquietudes sobre la depresión o la ansiedad, comuníquese con su proveedor de atención médica.",
        directory: {
            heading: "Su Directorio Local de Apoyo y Recursos",
            hotlinesTitle:
                "Líneas de Emergencia y Apoyo Gratuitas y Confidenciales 24/7",
            hotlines: [
                {
                    name: "Línea Nacional de Prevención del Suicidio y Crisis",
                    detail: "Llame o envíe un mensaje de texto al 988 para orientación urgente de seguridad psicológica.",
                    tel: "988",
                },
                {
                    name: "Línea de Crisis ICARE del Condado de Tarrant",
                    detail: "Llame o envíe un mensaje de texto al 1-800-866-2465 para apoyo conductual inmediato local.",
                    tel: "18008662465",
                },
                {
                    name: "Línea Nacional de Salud Mental Materna",
                    detail: "Llame o envíe un mensaje de texto al 1-833-852-6262 (1-833-TLC-MAMA) para hablar con un consejero de apoyo.",
                    tel: "18338526262",
                },
            ],
            clinicsTitle:
                "Clínicas Especializadas en Salud Perinatal y Conductual (Mansfield, TX)",
            clinics: [
                {
                    name: "Iroko Psychiatry",
                    address:
                        "600 Strada Circle, Suite 208, Mansfield, TX 76063",
                    phone: "469-482-3708",
                    tel: "4694823708",
                },
                {
                    name: "Healing Hope Behavioral Clinic",
                    address: "733 U.S. 287 Frontage Rd, Mansfield, TX 76063",
                    phone: "469-225-3670",
                    tel: "4692253670",
                },
            ],
            programsTitle: "Programas de Apoyo Materno 100% Gratuitos",
            programs: [
                {
                    name: "The Perinatal Psychiatry Access Network (PeriPAN) Texas",
                    desc: "Una red en todo Texas que conecta a su obstetra, pediatra o proveedores de la NICU directamente con psiquiatras reproductivos para mejorar, guiar y acelerar de inmediato su plan de tratamiento de salud mental materna. Pida a su médico que llame a PeriPAN para una referencia directa.",
                },
                {
                    name: "Help Me Grow North Texas / MHMR Perinatal Connections",
                    desc: "Le conecta con entrenadores de apoyo personal gratuitos, enfermeras y consejería especializada hasta 1 año después del parto. Teléfono: 844-689-5437",
                    tel: "8446895437",
                },
                {
                    name: "Catholic Charities Fort Worth (Blessed Beginnings)",
                    desc: "Ofrece grupos gratuitos para padres, clases de educación posparto y programas de consejería de apoyo.",
                },
                {
                    name: "Postpartum Support International (PSI)",
                    desc: 'Enlaces directos a redes de apoyo locales y terapia grupal especializada en línea. Llame al 1-800-944-4773 o envíe "HELP" al 503-894-9453.',
                    tel: "18009444773",
                },
            ],
        },
        copyright:
            "Edinburgh Postnatal Depression Scale (EPDS). Texto adaptado del British Journal of Psychiatry, Junio, 1987, vol. 150 por J.L. Cox, J.M. Holden, R. Sagovsky. Versión en español desarrollada en la Universidad de Iowa.",
    },
}

export default function App() {
    const [lang, setLang] = useState("en")
    const [losInput, setLosInput] = useState("")
    const [answers, setAnswers] = useState({})
    const [submitted, setSubmitted] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showWarning, setShowWarning] = useState(false)

    const t = CONTENT[lang]
    const answeredCount = Object.keys(answers).length
    const allAnswered = answeredCount === 10

    const parsedLos = losInput.trim() === "" ? NaN : Number(losInput)
    const isLosValid = Number.isInteger(parsedLos) && parsedLos >= 0

    const toggleLanguage = () => {
        setLang((prev) => (prev === "en" ? "es" : "en"))
    }

    const handleLosChange = (e) => {
        const val = e.target.value
        if (val === "" || /^\d+$/.test(val)) {
            setLosInput(val)
            if (showWarning) setShowWarning(false)
        }
    }

    const handleSelect = (questionId, optionIndex) => {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: optionIndex,
        }))
        if (showWarning) setShowWarning(false)
    }

    const calculateScores = () => {
        let total = 0
        let q10Score = 0
        const itemScores = {}

        t.questions.forEach((q) => {
            const selectedIdx = answers[q.id]
            if (selectedIdx !== undefined) {
                const pts = q.options[selectedIdx].score
                itemScores[`q${q.id}`] = pts
                total += pts
                if (q.id === 10) q10Score = pts
            }
        })

        return { total, q10Score, itemScores }
    }

    const getTierKey = (total, q10Score) => {
        if (q10Score > 0) return "urgent"
        if (total >= 10) return "moderate"
        return "low"
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!allAnswered || !isLosValid) {
            setShowWarning(true)
            return
        }

        const { total, q10Score, itemScores } = calculateScores()
        const currentTierKey = getTierKey(total, q10Score)

        const payload = {
            language: lang === "en" ? "English" : "Spanish",
            nicuLosDays: parsedLos,
            ...itemScores,
            totalScore: total,
            riskTier:
                currentTierKey === "urgent"
                    ? "Urgent Crisis (Q10 > 0)"
                    : currentTierKey === "moderate"
                      ? "Mild-Moderate Elevation (10+)"
                      : "Healthy Coping (< 10)",
        }

        setIsSubmitting(true)

        try {
            if (
                GOOGLE_SCRIPT_URL &&
                !GOOGLE_SCRIPT_URL.includes("YOUR_SCRIPT_ID_HERE")
            ) {
                await fetch(GOOGLE_SCRIPT_URL, {
                    method: "POST",
                    mode: "no-cors",
                    headers: {
                        "Content-Type": "text/plain;charset=utf-8",
                    },
                    body: JSON.stringify(payload),
                })
            }
        } catch (err) {
            console.error("Sheet logging failed:", err)
        } finally {
            setIsSubmitting(false)
            setSubmitted(true)
            window.scrollTo({ top: 0, behavior: "smooth" })
        }
    }

    const handleReset = () => {
        setLosInput("")
        setAnswers({})
        setSubmitted(false)
        setShowWarning(false)
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    const { total, q10Score } = calculateScores()
    const tierKey = getTierKey(total, q10Score)
    const activeTier = t.tiers[tierKey]

    return (
        <div className="app-wrapper">
            <header className="top-bar">
                <div className="top-bar-inner">
                    <span className="progress-pill">
                        {t.progressText}: {answeredCount} / 10
                    </span>
                    <button
                        type="button"
                        className="lang-toggle-btn"
                        onClick={toggleLanguage}
                        aria-label="Switch Language"
                    >
                        <span
                            className="flag-icon"
                            role="img"
                            aria-hidden="true"
                        >
                            {t.flag}
                        </span>
                        <span>{t.langLabel}</span>
                    </button>
                </div>
            </header>

            <main className="container">
                <div className="hero-card">
                    <h1>{t.title}</h1>
                    <p className="subtitle">{t.subtitle}</p>
                </div>

                <section
                    className="card acknowledgment-card"
                    aria-labelledby="ack-heading"
                >
                    <h2 id="ack-heading">{t.acknowledgmentTitle}</h2>
                    {t.acknowledgmentParagraphs.map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                    ))}
                </section>

                {!submitted ? (
                    <form onSubmit={handleSubmit} noValidate>
                        <section
                            className={`card los-card ${showWarning && !isLosValid ? "unanswered-error" : ""}`}
                        >
                            <h2>{t.losSectionTitle}</h2>
                            <label htmlFor="nicu-los" className="los-label">
                                {t.losLabel}
                            </label>
                            <input
                                id="nicu-los"
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                className="los-input"
                                placeholder={t.losPlaceholder}
                                value={losInput}
                                onChange={handleLosChange}
                                required
                            />
                            {showWarning && !isLosValid && (
                                <p className="field-error">{t.losWarning}</p>
                            )}
                            <p className="los-helper">{t.losHelper}</p>
                        </section>

                        <section className="card instructions-card">
                            <h2>{t.instructionsTitle}</h2>
                            <p>{t.instructionsText}</p>

                            <div className="example-box">
                                <h3>{t.exampleTitle}</h3>
                                <p className="example-prompt">
                                    {t.examplePrompt}
                                </p>
                                <ul className="example-list">
                                    {t.exampleOptions.map((opt, idx) => (
                                        <li
                                            key={idx}
                                            className={
                                                opt.checked
                                                    ? "example-checked"
                                                    : ""
                                            }
                                        >
                                            <span className="check-box">
                                                {opt.checked ? "☑" : "☐"}
                                            </span>
                                            <span>{opt.label}</span>
                                        </li>
                                    ))}
                                </ul>
                                <p className="example-note">{t.exampleNote}</p>
                            </div>
                        </section>

                        {t.questions.map((q) => {
                            const isUnanswered =
                                showWarning && answers[q.id] === undefined
                            return (
                                <fieldset
                                    key={q.id}
                                    className={`card question-card ${isUnanswered ? "unanswered-error" : ""}`}
                                >
                                    <legend className="question-text">
                                        {q.text}
                                    </legend>
                                    <div className="options-grid">
                                        {q.options.map((opt, idx) => {
                                            const isSelected =
                                                answers[q.id] === idx
                                            return (
                                                <label
                                                    key={idx}
                                                    className={`option-label ${isSelected ? "selected" : ""}`}
                                                >
                                                    <input
                                                        type="radio"
                                                        name={`question-${q.id}`}
                                                        checked={isSelected}
                                                        onChange={() =>
                                                            handleSelect(
                                                                q.id,
                                                                idx,
                                                            )
                                                        }
                                                    />
                                                    <span
                                                        className="radio-indicator"
                                                        aria-hidden="true"
                                                    />
                                                    <span className="option-text">
                                                        {opt.label}
                                                    </span>
                                                </label>
                                            )
                                        })}
                                    </div>
                                </fieldset>
                            )
                        })}

                        {showWarning && (
                            <div className="warning-banner" role="alert">
                                {t.incompleteWarning}
                            </div>
                        )}

                        <div className="actions-row">
                            <button
                                type="submit"
                                className="primary-btn"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? t.submittingBtn : t.submitBtn}
                            </button>
                        </div>
                    </form>
                ) : (
                    <section className="results-section" aria-live="polite">
                        <div className={`card result-banner tier-${tierKey}`}>
                            <div className="score-summary-row">
                                <div className="score-box">
                                    <span className="score-label">
                                        {t.totalScoreLabel}
                                    </span>
                                    <span className="score-number">
                                        {total} / 30
                                    </span>
                                </div>
                                <div className="score-box">
                                    <span className="score-label">
                                        {t.q10ScoreLabel}
                                    </span>
                                    <span className="score-number">
                                        {q10Score} / 3
                                    </span>
                                </div>
                            </div>

                            <div className="tier-badge">{activeTier.badge}</div>
                            <p className="tier-condition">
                                {activeTier.condition}
                            </p>
                            <p className="tier-summary">{activeTier.summary}</p>

                            <h3>{activeTier.stepsTitle}</h3>
                            <ul className="steps-list">
                                {activeTier.steps.map((step, i) => (
                                    <li key={i}>
                                        <strong>{step.title}:</strong>{" "}
                                        {step.desc}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="card directory-card">
                            <h2>{t.directory.heading}</h2>

                            <div className="directory-group">
                                <h3>{t.directory.hotlinesTitle}</h3>
                                {t.directory.hotlines.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="resource-item hotline-item"
                                    >
                                        <strong>{item.name}</strong>
                                        <p>{item.detail}</p>
                                        {item.tel && (
                                            <a
                                                href={`tel:${item.tel}`}
                                                className="call-chip"
                                            >
                                                📞 {item.tel}
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="directory-group">
                                <h3>{t.directory.clinicsTitle}</h3>
                                {t.directory.clinics.map((clinic, idx) => (
                                    <div key={idx} className="resource-item">
                                        <strong>{clinic.name}</strong>
                                        <p>{clinic.address}</p>
                                        <a
                                            href={`tel:${clinic.tel}`}
                                            className="call-chip"
                                        >
                                            📞 {clinic.phone}
                                        </a>
                                    </div>
                                ))}
                            </div>

                            <div className="directory-group">
                                <h3>{t.directory.programsTitle}</h3>
                                {t.directory.programs.map((prog, idx) => (
                                    <div key={idx} className="resource-item">
                                        <strong>{prog.name}</strong>
                                        <p>{prog.desc}</p>
                                        {prog.tel && (
                                            <a
                                                href={`tel:${prog.tel}`}
                                                className="call-chip"
                                            >
                                                📞 {prog.tel}
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="card disclaimer-card">
                            <p>{t.disclaimer}</p>
                        </div>

                        <div className="actions-row">
                            <button
                                type="button"
                                className="secondary-btn"
                                onClick={handleReset}
                            >
                                {t.resetBtn}
                            </button>
                        </div>
                    </section>
                )}

                <footer className="footer">
                    <p>{t.copyright}</p>
                </footer>
            </main>
        </div>
    )
}
