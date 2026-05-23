(function () {
  const whatsappNumber = '50662957826';
  const whatsappBase = `https://wa.me/${whatsappNumber}`;
  const email = 'qsdelsursrl@gmail.com';

  const quickQuestions = [
    'Quiero cotizar',
    'Ver catálogo',
    '¿Hacen entregas?',
    'Venta al por mayor'
  ];

  const productCategories = [
    'cloro',
    'desinfectantes',
    'desinfectantes concentrados',
    'desinfectantes trigger',
    'aromatizantes',
    'lavamanos',
    'lavaplatos',
    'limpiavidrios',
    'productos para autos',
    'suavizantes',
    'detergentes',
    'ceras',
    'biodegradables',
    'alcoholes',
    'varios'
  ];

  const normalize = value => value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  const includesAny = (text, words) => words.some(word => text.includes(word));

  const createWhatsAppUrl = message => `${whatsappBase}?text=${encodeURIComponent(message)}`;

  const responseFor = rawMessage => {
    const message = normalize(rawMessage);

    if (includesAny(message, ['hola', 'buenas', 'saludos'])) {
      return {
        text: 'Hola. Soy el asistente de Químicos Superiores del Sur. Puedo ayudarte con productos Kilan, catálogo, entregas, ventas al por mayor, certificaciones y contacto.',
        actions: [{ label: 'Cotizar por WhatsApp', href: createWhatsAppUrl('Hola, quiero información sobre productos Kilan.') }]
      };
    }

    if (includesAny(message, ['cotiz', 'precio', 'precios', 'costo', 'comprar', 'pedido'])) {
      return {
        text: 'Con gusto te ayudamos a cotizar. Para una respuesta más precisa, indícanos el producto, presentación y cantidad aproximada que necesitas.',
        actions: [{ label: 'Enviar consulta', href: createWhatsAppUrl('Hola, quiero cotizar productos Kilan. Me pueden ayudar con precios y disponibilidad?') }]
      };
    }

    if (includesAny(message, ['catalogo', 'catalog', 'producto', 'productos', 'presentacion', 'presentaciones'])) {
      return {
        text: `Trabajamos líneas como ${productCategories.join(', ')}. En el catálogo puedes seleccionar una categoría para ver productos, presentaciones y contacto directo por WhatsApp.`,
        actions: [{ label: 'Abrir catálogo', href: 'catalog.html' }]
      };
    }

    if (includesAny(message, ['entrega', 'entregas', 'envio', 'envios', 'domicilio'])) {
      return {
        text: 'Sí, coordinamos entregas según la zona y el volumen del pedido. Lo ideal es confirmar ubicación, productos y cantidades por WhatsApp.',
        actions: [{ label: 'Coordinar entrega', href: createWhatsAppUrl('Hola, quiero consultar por entregas de productos Kilan.') }]
      };
    }

    if (includesAny(message, ['mayor', 'mayorista', 'distribuidor', 'volumen', 'empresa', 'negocio'])) {
      return {
        text: 'Sí, atendemos hogares, comercios, industrias y clientes mayoristas. Podemos revisar tu necesidad según volumen y línea de producto.',
        actions: [{ label: 'Consulta mayorista', href: createWhatsAppUrl('Hola, quiero información para compra al por mayor de productos Kilan.') }]
      };
    }

    if (includesAny(message, ['personalizado', 'personalizados', 'desarrollo', 'formula', 'especial'])) {
      return {
        text: 'Podemos evaluar desarrollos específicos según la necesidad y el volumen requerido. Cuéntanos qué tipo de producto estás buscando.',
        actions: [{ label: 'Evaluar desarrollo', href: createWhatsAppUrl('Hola, quiero consultar por un producto personalizado o desarrollo específico.') }]
      };
    }

    if (includesAny(message, ['contacto', 'telefono', 'whatsapp', 'correo', 'email', 'mail', 'llamar'])) {
      return {
        text: `Puedes contactarnos por WhatsApp al 6295-7826 / 4703-5113 o por correo a ${email}.`,
        actions: [
          { label: 'WhatsApp', href: createWhatsAppUrl('Hola, quiero información sobre productos Kilan.') },
          { label: 'Email', href: `mailto:${email}?subject=Consulta%20sobre%20productos%20Kilan` }
        ]
      };
    }

    if (includesAny(message, ['ubicacion', 'direccion', 'donde', 'cartago', 'san diego'])) {
      return {
        text: 'Estamos en Cartago, La Unión, San Diego. También puedes escribirnos para coordinar atención, entregas o disponibilidad.',
        actions: [{ label: 'Escribir por WhatsApp', href: createWhatsAppUrl('Hola, quiero confirmar ubicación y atención de Químicos Superiores del Sur.') }]
      };
    }

    if (includesAny(message, ['certificacion', 'certificaciones', 'documento', 'documentacion', 'verde', 'sostenibilidad', 'cscp'])) {
      return {
        text: 'Tenemos publicaciones destacadas como Crecimiento Verde 11° Edición y Códigos Verdes CSCP, relacionadas con sostenibilidad, producción responsable y mejora continua.',
        actions: [{ label: 'Ver certificaciones', href: 'Certificaciones.html' }]
      };
    }

    if (includesAny(message, ['cloro', 'desinfect', 'alcohol', 'lavamanos', 'lavaplatos', 'aromatizante', 'suavizante', 'detergente', 'cera', 'limpiavidrios', 'auto'])) {
      return {
        text: 'Esa línea está dentro del catálogo Kilan. Manejamos presentaciones para uso doméstico, comercial y necesidades de mayor volumen.',
        actions: [
          { label: 'Ver catálogo', href: 'catalog.html' },
          { label: 'Consultar disponibilidad', href: createWhatsAppUrl(`Hola, quiero consultar disponibilidad sobre: ${rawMessage}`) }
        ]
      };
    }

    return {
      text: 'Puedo orientarte con catálogo, presentaciones, entregas, ventas al por mayor, certificaciones y contacto. Para una respuesta personalizada, puedes escribirnos por WhatsApp.',
      actions: [{ label: 'Hablar con asesor', href: createWhatsAppUrl(`Hola, quiero información sobre: ${rawMessage}`) }]
    };
  };

  const createIcon = path => `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="${path}" />
    </svg>
  `;

  const addMessage = (messages, type, content) => {
    const item = document.createElement('div');
    item.className = `chatbot-message ${type === 'user' ? 'is-user' : 'is-bot'}`;

    const bubble = document.createElement('div');
    bubble.className = 'chatbot-bubble';

    const text = document.createElement('p');
    text.textContent = content.text || content;
    bubble.appendChild(text);

    if (content.actions && content.actions.length) {
      const actions = document.createElement('div');
      actions.className = 'chatbot-message-actions';
      content.actions.forEach(action => {
        const link = document.createElement('a');
        link.href = action.href;
        link.textContent = action.label;
        if (action.href.startsWith('http') || action.href.startsWith('mailto:')) {
          link.target = action.href.startsWith('mailto:') ? '_self' : '_blank';
          link.rel = 'noopener noreferrer';
        }
        actions.appendChild(link);
      });
      bubble.appendChild(actions);
    }

    item.appendChild(bubble);
    messages.appendChild(item);
    messages.scrollTop = messages.scrollHeight;
  };

  const initChatbot = () => {
    if (document.querySelector('.chatbot-widget')) return;

    const widget = document.createElement('section');
    widget.className = 'chatbot-widget';
    widget.setAttribute('aria-label', 'Asistente virtual Kilan');
    widget.innerHTML = `
      <button class="chatbot-toggle" type="button" aria-label="Abrir chat" aria-expanded="false">
        ${createIcon('M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z')}
        <span>Asistente</span>
      </button>
      <div class="chatbot-panel" role="dialog" aria-modal="false" aria-labelledby="chatbotTitle" hidden>
        <div class="chatbot-header">
          <div>
            <span class="chatbot-kicker">Asistente virtual</span>
            <h2 id="chatbotTitle">Kilan</h2>
          </div>
          <button class="chatbot-close" type="button" aria-label="Cerrar chat">
            ${createIcon('M18 6 6 18M6 6l12 12')}
          </button>
        </div>
        <div class="chatbot-status">
          <span></span>
          Respuestas rápidas con información del sitio
        </div>
        <div class="chatbot-messages" aria-live="polite"></div>
        <div class="chatbot-quick-actions" aria-label="Preguntas rápidas"></div>
        <form class="chatbot-form">
          <label class="sr-only" for="chatbotInput">Escribe tu consulta</label>
          <input id="chatbotInput" type="text" autocomplete="off" placeholder="Escribe tu consulta..." />
          <button type="submit" aria-label="Enviar mensaje">
            ${createIcon('M22 2 11 13M22 2l-7 20-4-9-9-4z')}
          </button>
        </form>
      </div>
    `;

    document.body.appendChild(widget);

    const toggle = widget.querySelector('.chatbot-toggle');
    const panel = widget.querySelector('.chatbot-panel');
    const close = widget.querySelector('.chatbot-close');
    const messages = widget.querySelector('.chatbot-messages');
    const quickWrap = widget.querySelector('.chatbot-quick-actions');
    const form = widget.querySelector('.chatbot-form');
    const input = widget.querySelector('#chatbotInput');

    quickQuestions.forEach(question => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = question;
      button.addEventListener('click', () => submitMessage(question));
      quickWrap.appendChild(button);
    });

    const setOpen = open => {
      widget.classList.toggle('is-open', open);
      panel.hidden = !open;
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Cerrar chat' : 'Abrir chat');
      if (open) window.setTimeout(() => input.focus(), 120);
    };

    const submitMessage = message => {
      const cleanMessage = message.trim();
      if (!cleanMessage) return;
      addMessage(messages, 'user', cleanMessage);
      input.value = '';
      window.setTimeout(() => {
        addMessage(messages, 'bot', responseFor(cleanMessage));
      }, 220);
    };

    toggle.addEventListener('click', () => setOpen(panel.hidden));
    close.addEventListener('click', () => setOpen(false));
    form.addEventListener('submit', event => {
      event.preventDefault();
      submitMessage(input.value);
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && !panel.hidden) setOpen(false);
    });

    addMessage(messages, 'bot', {
      text: 'Hola. Soy el asistente de Kilan. Puedo ayudarte con catálogo, cotizaciones, entregas, ventas al por mayor, certificaciones y contacto.',
      actions: [{ label: 'WhatsApp directo', href: createWhatsAppUrl('Hola, quiero información sobre productos Kilan.') }]
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatbot);
  } else {
    initChatbot();
  }
})();
