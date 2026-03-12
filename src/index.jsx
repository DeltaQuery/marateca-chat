import { render, h } from 'preact'
import { useState } from 'preact/hooks'
import { Chat } from './Chat.jsx'

function Widget({ config }) {
  const [open, setOpen] = useState(false)
  const isMobile = () => window.innerWidth < 768

  return (
    <>
      {/* Botón FAB — solo visible en desktop */}
      <button class="mc-fab" onClick={() => setOpen(true)} aria-label="Abrir chat">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
        </svg>
      </button>

      {/* Backdrop — solo visible en desktop cuando está abierto */}
      {open && <div class="mc-backdrop open" onClick={() => setOpen(false)} />}

      {/* Ventana de chat */}
      {(open || isMobile()) && (
        <Chat
          config={config}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  )
}

export function createChat(config) {
  // Busca el target indicado en el config, o crea uno automático
  const targetSelector = config.target || '#marateca-chat'
  let container = document.querySelector(targetSelector)

  if (!container) {
    container = document.createElement('div')
    container.id = 'marateca-chat-root'
    document.body.appendChild(container)
  } else {
    container.id = 'marateca-chat-root'
  }

  render(h(Widget, { config }), container)
}