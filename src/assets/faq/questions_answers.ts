type FaqSectionProps = {
  key: number;
  question: string;
  answer: string[];
};

export const generalidades: FaqSectionProps[] = [
  {
    key: 1,

    question: "¿Qué es DEPOEVENTOS?",
    answer: [
      "DEPOEVENTOS es una empresa dedicada a la gestión de actividades extracurriculares, talleres, programas deportivos y recreativos en colegios, clubes asociados y empresas particulares.",
    ],
  },
];

export const registroCuenta: FaqSectionProps[] = [
  {
    key: 2,
    question: "¿Cómo creo un usuario?",
    answer: [
      "Haz clic en Acceder en la página principal.",
      "Selecciona Regístrate y completa el formulario con tus datos personales.",
      "Asegúrate de que tu contraseña cumpla con los requisitos (mínimo 8 caracteres, incluyendo una letra mayúscula, una letra minúscula y un carácter especial). Ejemplo: Deportes2024$ ",
      "Haz clic en Registrarse.",
    ],
  },
  {
    key: 3,
    question: "¿Qué hago si olvidé mi contraseña?",
    answer: [
      "En la pantalla de inicio de sesión, selecciona ¿Olvidaste tu contraseña?.",
      "Ingresa el correo registrado y recibirás un enlace para restablecer tu contraseña.",
      "Crea una nueva contraseña siguiendo los requisitos de seguridad.",
    ],
  },
];

export const gestionHijos: FaqSectionProps[] = [
  {
    key: 4,
    question: "¿Cómo registro a mi hijo en la plataforma?",
    answer: [
      "Inicia sesión en tu cuenta de Depoeventos.",
      "Dirígete al apartado Hijos, ubicado en el menú principal superior izquierdo de la página.",
      "Haz clic en el botón + Crear Hijo para iniciar el registro.",
      "Completa el formulario con la información personal del menor: nombre completo, fecha de nacimiento y otra información requerida.",
    ],
  },
  {
    key: 5,
    question: "¿Es miembro de un club?",
    answer: [
      "Si tu hijo pertenece a un club: haz clic en el botón '¿Es miembro de un club?' hasta que este cambie a color azul, lo que indica que la opción está activada. Luego, selecciona el nombre del club en el campo desplegable que aparecerá.",
      "Si tu hijo no pertenece a ningún club: deja el botón en su estado original (sin hacer clic), lo que permitirá continuar con el registro sin seleccionar ningún club.",
      "Revisa los datos ingresados y haz clic en Guardar para completar el registro.",
    ],
  },
  {
    key: 6,
    question: "¿Qué pasa si no selecciono la opción '¿Es miembro de un club?'?",
    answer: [
      "Esta opción está diseñada para adaptarse a distintos usuarios. Si el campo no aplica para tu caso (por ejemplo, tu hijo no pertenece a ningún club), puedes omitirlo dejando el botón en su estado original (sin hacer clic).",
    ],
  },
  {
    key: 7,
    question: "¿Cómo verifico que mi hijo fue registrado correctamente?",
    answer: [
      "Una vez completado el registro, dirígete nuevamente al apartado Hijos. Allí encontrarás la lista de los menores registrados bajo tu cuenta, con todos sus datos visibles para futuras gestiones.",
    ],
  },
];

export const inscripcionTalleres: FaqSectionProps[] = [
  {
    key: 8,
    question: "¿Cómo selecciono un taller o paquete?",
    answer: [
      "En la página principal, selecciona Productos.",
      "Utiliza los filtros (categoría, sede, grado, edad, horario) para encontrar talleres específicos.",
      "Haz clic en el botón azul de Inscribirse junto al taller deseado.",
      "Selecciona a tu hijo en la sección Alumnos.",
      "Verifica que todos los datos correspondientes al taller sean los correctos.",
      "Añade el producto haciendo clic en el botón azul Añadir al carrito.",
    ],
  },
  {
    key: 9,
    question: "¿Cómo completo el pago de un taller?",
    answer: [
      "Accede al carrito en la esquina superior derecha y revisa tu selección.",
      "Acepta los Términos y Condiciones.",
      "Acepta las Políticas de Privacidad.",
      "Haz clic en Realizar Pago y selecciona la opción de Mercado Pago para completar la transacción.",
    ],
  },
];

export const cupones: FaqSectionProps[] = [
  {
    key: 10,
    question: "¿Cómo puedo aplicar un cupón de descuento en la web?",
    answer: [
      "Selecciona tus productos: Entra a la página de Depoeventos y selecciona los talleres o productos que deseas adquirir.",
      "Accede al carrito de compra: Una vez que hayas añadido todos los productos a tu carrito, dirígete a la página de pago haciendo clic en el ícono del carrito en la esquina superior derecha.",
      "Introduce el cupón: En la pantalla de pago, encontrarás un campo para aplicar cupón de descuento.",
      "Escribe el código del cupón: Ingresa el código del cupón que tienes y haz clic en Aplicar. El descuento se reflejará automáticamente en el total de la compra.",
      "Finaliza el pago: Si el descuento se aplica correctamente, podrás proceder a realizar el pago con el monto ajustado.",
    ],
  },
];

export const cursoTaller: FaqSectionProps[] = [
  {
    key: 11,
    question: "¿Cómo verifico los talleres adquiridos?",
    answer: [
      "Ve a tu perfil haciendo clic en tu nombre en la esquina superior derecha.",
      "Selecciona la sección Cursos, donde podrás ver la lista de talleres adquiridos, hijos asignados y otros detalles como: Fecha de inscripción, sede, categoría.",
    ],
  },
];

export const mediosPago: FaqSectionProps[] = [
  {
    key: 12,
    question: "¿Qué métodos de pago están disponibles?",
    answer: [
      "En Depoeventos, todos los pagos se realizan de manera rápida y segura a través de la pasarela de pago 'Mercado Pago'.",
      "Mercado Pago asegura que todas tus compras sean procesadas con los más altos estándares de seguridad, brindándote una experiencia confiable y sin complicaciones.",
    ],
  },
  {
    key: 13,
    question: "¿Cómo funciona el sistema de pago en Mercado Pago?",
    answer: [
      "En Mercado Pago, puedes realizar el pago con o sin una cuenta registrada:",
      "Si tienes cuenta: Inicia sesión para acceder a tus tarjetas guardadas, dinero en tu cuenta de Mercado Pago, o configura tu pago.",
      "Sin cuenta: Puedes continuar ingresando directamente los datos de tu tarjeta de crédito o débito, o utilizando otros métodos como Yape, antes de confirmar la compra.",
    ],
  },
  {
    key: 14,
    question: "¿Es seguro pagar a través de Mercado Pago?",
    answer: [
      "Sí, Mercado Pago utiliza sistemas de encriptación y protección avanzada para garantizar la seguridad de tus transacciones.",
      "Si tienes algún problema con tu pago, puedes contactar a la plataforma para resolverlo.",
    ],
  },
];

export const devoluciones: FaqSectionProps[] = [
  {
    key: 15,
    question: "¿Cuál es la política de devoluciones?",
    answer: [
      "Para solicitar una devolución, debes revisar los detalles y condiciones establecidos en los Términos y Condiciones de Depoeventos.",
      "Allí encontrarás toda la información necesaria sobre los casos en los que aplica una devolución, los plazos y el procedimiento para realizarla.",
    ],
  },
  {
    key: 16,
    question: "¿Cómo puedo acceder a los Términos y Condiciones?",
    answer: [
      "Puedes consultar los Términos y Condiciones en el enlace proporcionado durante el proceso de inscripción o pago. Si necesitas más información, también puedes contactarnos a través de nuestros canales de soporte.",
    ],
  },
];

export const contacto: FaqSectionProps[] = [
  {
    key: 17,
    question: "¿Cómo comunicarte con nosotros?",
    answer: [
      "Comunícate con nosotros a través de nuestro correo electrónico depoeventossac@gmail.com o al teléfono +51 929 952 527, y con gusto te asistiremos.",
    ],
  },
];
