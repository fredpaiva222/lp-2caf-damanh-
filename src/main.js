import './style.css'

// ─── STICKY BAR ─────────────────────────────────────────────
const bar = document.getElementById('stickyBar')
window.addEventListener('scroll', () => {
  bar.classList.toggle('visible', window.scrollY > 600)
})

// ─── FAQ ACCORDION ──────────────────────────────────────────
document.querySelectorAll('details').forEach(detail => {
  detail.addEventListener('toggle', () => {
    if (detail.open) {
      document.querySelectorAll('details').forEach(other => {
        if (other !== detail) other.open = false
      })
    }
  })
})

// ─── SCROLL REVEAL ──────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target
      const delay = parseInt(el.dataset.delay || '0')
      setTimeout(() => {
        el.classList.add('is-visible')
      }, delay)
      revealObserver.unobserve(el)
    }
  })
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -50px 0px'
})

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el)
})

// ─── PROGRESSIVE BLUR ───────────────────────────────────────
const blurLayers = [
  { blur: '0.25px', mask: 'linear-gradient(to bottom, transparent 0%, black 12.5%, black 25%, transparent 37.5%)' },
  { blur: '0.5px',  mask: 'linear-gradient(to bottom, transparent 12.5%, black 25%, black 37.5%, transparent 50%)' },
  { blur: '1px',    mask: 'linear-gradient(to bottom, transparent 25%, black 37.5%, black 50%, transparent 62.5%)' },
  { blur: '2px',    mask: 'linear-gradient(to bottom, transparent 37.5%, black 50%, black 62.5%, transparent 75%)' },
  { blur: '4px',    mask: 'linear-gradient(to bottom, transparent 50%, black 62.5%, black 75%, transparent 87.5%)' },
  { blur: '8px',    mask: 'linear-gradient(to bottom, transparent 62.5%, black 75%, black 87.5%, transparent 100%)' },
  { blur: '16px',   mask: 'linear-gradient(to bottom, transparent 75%, black 87.5%, black 100%)' },
  { blur: '32px',   mask: 'linear-gradient(to bottom, transparent 87.5%, black 100%)' },
]

const blurContainer = document.createElement('div')
blurContainer.className = 'progressive-blur'

blurLayers.forEach(({ blur, mask }) => {
  const layer = document.createElement('div')
  layer.style.backdropFilter = `blur(${blur})`
  layer.style.webkitBackdropFilter = `blur(${blur})`
  layer.style.maskImage = mask
  layer.style.webkitMaskImage = mask
  blurContainer.appendChild(layer)
})

document.body.appendChild(blurContainer)
