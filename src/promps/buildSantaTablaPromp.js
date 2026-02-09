export const buildSantaTablaPromp = () => {
    return `
Sos un asistente virtual oficial de Santa Tabla, una escuela y centro de kitesurf.
Si no estás 100% seguro de una respuesta basada en el contexto, NO respondas con suposiciones.

Tu función es responder preguntas de clientes y alumnos usando ÚNICAMENTE la información provista en el CONTEXTO.
No inventes datos. Si algo no está especificado claramente, decilo de forma honesta y sugerí contactar al staff.

Estilo de respuesta:
- Claro, directo y amable
- Español rioplatense neutro
- Respuestas breves pero completas
- Orientado a ayudar y vender sin ser agresivo

Prioridades:
1. Seguridad
2. Claridad para principiantes
3. Información práctica (clases, cursos, condiciones, requisitos)
4. Buena experiencia del cliente

Formato:
- Usá listas cuando ayuden a la claridad
- No repitas información innecesaria
- No menciones el PDF ni el “contexto”

Si el usuario hace una pregunta ambigua:
- Pedí una aclaración concreta

Si la pregunta excede el contexto:
- Respondé: 
  "Eso lo puede confirmar mejor el equipo de Santa Tabla, te recomiendo contactarlos directamente."


Siempre vas a responder en formato JSON, con la siguiente estructura:
El formato JSON que espero como respuesta es el siguite:

{
	tarea: "sinSentidoPractico",
	mensaje: $RespuestaAlUsuaior
}
`;
}

export const buildSantaTablaContext = () => {
    return `
CONTEXTO: 
¿QUÉ ES EL KITESURF?

El kitesurf es un deporte de agua en el que usás una vela (kite)
conectada a un arnés y una tabla para moverte sobre el agua.

La fuerza del viento es tu motor. No necesitás olas ni tener
experiencia previa. Solo ganas de aprender algo nuevo, "moverte
en la naturaleza y peca olen.

Se puede practicar en ao o con olas, y es ideal si te'
gusta la adrenalina pero también si querés un mesle para pasear
sobre las aguas y descomectar de todo. o ns


¿CÓMO LO ENSEÑAMOS?

* Usamos un sistema de aprendizaje por módulos de 1 hora, y te
guiamos paso a paso con instructores certificados, que van
ajustando la clase a tu ritmo.

* En general, con 9 a 12 horas de clase ya vas a estar parado/a
en la tabla y empezando a navegar por tu cuenta.

+ Es importante tener en cuenta tu regularidad y habilidades para
acortar el plazo de aprendizaje.

TEMARIOS POR NIVELES

NIVEL INICIANTE - (Se estiman 3hs.) O
e Teoría del viento y zonas de vuelo.
. Armado del equipo.

e Seguridad y uso del leash y quick release.

* Primeros vuelos en tierra (despegue y aterrizaje).
« Control del kite con dos manos y relanzamiento.

NIVEL INTERMEDIO -— (Se estiman 3hs.) 6)
* Bodydrag (conducción en el agua sin tabla).
. Recupero de tabla.

* Técnica de waterstart (ponerse de pie en la tabla).
« Control del kite en el agua.

NIVEL AVANZADO - (Se estiman 3 a 6hs.) O
. Navegación en ambos rumbos.
. Virajes y transiciones.

. Control de velocidad y dirección.

. Preparación para navegación independiente. ]


SOBRE NUESTROS INSTRUCTORES

e Todos nuestros instructores están certificados y
entrenados, con amplia experiencia en el agua y buen
trato para enseñar desde cero.

e Vasa sentirte acompañado/a en cada etapa del proceso.

¿CÓMO SE RESERVA UN TURNO?

« Usamos un sistema de turnos que se llama Crossfy,
donde podés ver los días y horarios disponibles según el
clima.

o Así te autogestionás como más te convenga.

. Las clases tienen una vigencia de 3 meses desde la
fecha de compra, para que las agendes en ese plazo.


PASO A PASO PARA EMPEZAR

Una vez completada la ficha de datos por WhatsApp,
descargá la app y creá tu usuario (o lo podés hacer
desde el navegador web sin tener que descargar nadal).

Cuando estés adentro, elegís el turno o pack de turnos
que quieras hacer, hacés el pago de la seña y cargás el
comprobante (te guiamos en el paso a paso).

Luego, vas a la agenda y seleccionás el día y horario
que mejor te quede. La agenda está ajustada acorde al
pronóstico de la semana, pero siempre recomendamos
consultar antes para ver si el viento es acorde a tu nivel.

¡Y listo! El día de tu clase acércate al Spot 30 minutos
antes.

IMPORTANTE

* Se puede cancelar hasta 24Hs antes, de lo contrario, el
pago no tiene devolución.

. El kitesurf depende 100% del viento. Por eso, las clases
se habilitan en base al pronóstico y es importante tener
flexibilidad y paciencia.

¿QUÉ INCLUYE?

Y Instructores personalizados.

Y 1 hora de clase por turno.

vw Todo el equipo necesario:
. Traje de neoprene — + Botas

* Chaleco e Arnés
. Casco . Tabla y Kite

En Santa Tabla Spot usamos equipos NORTH Y MYSTIC
que garantizan mayor seguridad, mejor aprendizaje y una
experiencia real en el agua.

¿QUÉ HAY QUE LLEVAR? 6)

E Protector solar y algo seco para cambiarte después.


NOTAS IMPORTANTES

+ Las clases se pagan por adelantado y se pueden usar
durante 3 meses

e Las clases están 100% sujeto a condiciones climáticas que
varían minuto a minuto, por lo que cancelaciones en el día
pueden suceder por parte nuestra. Pedimos paciencia!

.« Tenés que presentarte 30 minutos antes del turno para
alistarte con calma y entrar al agua en horario.

+ Te vamos a agregar a un grupo de WhatsApp para
mantenerte informado de las condiciones climáticas.

e En tu primer clase, acercate a la oficina de la entrada para
firmar tu ficha y completar el pago. En tus siguientes clases
ya podés ir directo a la escuela

PRECIOS

DURACIÓN INDIVIDUAL

1 hora $165.000

3 hora $445.000

6 hora $842.000

9 hora $1.188.000

*20% OFF EN EL PAGO CON EFECTIVO

** LAS TARIFAS CORRESPONDEN PARA PAGOS CON TARJETA EN HASTA 18 CUOTAS
SEGÚN EL BANCO.

** TARIFAS VIGENTES HASTA: 20/11/2025

+ Contamos con promociones y pago en cuotas según el mes
+ Los packs de clases tienen una vigencia de 3 meses


PREGUNTAS FRECUENTES

¿PUEDO EMPEZAR SIN EXPERIENCIA?

+ Sí, te enseñamos desde cero. No necesitás tener
conocimientos previos.

¿QUÉ PASA SI NO HAY VIENTO?

.« Cancelamos la clase desde nuestro sistema de turnos y te
avisamos para que puedas reprogramarla.

¿CÓMO ME AGENDO?

* Una vez que tengas tu usuario y pack activo, te agendas desde
Crossfy, eligiendo los horarios habilitados según el pronóstico
de viento.

¿CUÁNTO DURA CADA CLASE?

* Cada clase dura 1 hora. Las clases se venden por horas y
podés usarlas como quieras dentro de la agenda disponible.

¿PUEDO TOMAR DOS CLASES SEGUIDAS?

e Sí, si hay disponibilidad, podés hacer más de una clase en el
mismo día.

¿TENGO QUE LLEVAR ALGO?

e Solo ropa cómoda, toalla, protector solar y una muda seca.
Nosotros te damos todo lo técnico.

¿DÓNDE ES LA CLASE?

. En el Bajo de San Isidro, dentro del Yacht Club Avellaneda. Te
pasamos la ubicación y el punto de encuentro por WhatsApp o
podés buscarnos en Google Maps ingresando “Santa Tabla
Spot”.


¿PUEDO CANCELAR UN TURNO?

e Sí, siempre que avises con mínimo 24 horas de anticipación.
Pasado ese plazo, la seña no tiene devolución.

¿CÓMO RESERVO?

* Una vez creado tu usuario en Crossfy, pagás la seña y se te
activa un pack para agendarte en el sistema.

¿CÓMO ME AGENDO?

* Una vez que tengas tu usuario y pack activo, te agendas desde
Crossfy, eligiendo los horarios habilitados según el pronóstico
de viento.

¿PUEDO VENIR ACOMPAÑADO?
* Obvio, el Spot tiene buena onda y espacio para que te
acompañen.
¿PUEDO TOMAR UNA CLASE GRUPAL?
* Sil Si son dos, ambos pueden agendarse en horarios

consecutivos y avisar para que sea grupal.

¿CUÁNTO DURAN LOS PACKS?

* Los packs tienen una validez de 3 meses desde el momento de
la compra.

¿PUEDO COMPRAR EQUIPOS CON USTEDES?

e Sil Con nosotros accedés a descuentos exclusivos en
productos nuevos NORTH y MYSTIC. También tenemos
usados en excelentes condiciones para que empieces.


Horarios en los que estamos abiertos:
- Lunes a domingo, de 10 a 18 hs (variable).

    `
}