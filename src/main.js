import './style.css'

// ── LETTER REVEAL (hero) ──────────────────────────────────
document.querySelectorAll('.letter-reveal').forEach((el, wordIndex) => {
  const text = el.textContent
  el.innerHTML = ''
  text.split('').forEach((char, i) => {
    const span = document.createElement('span')
    span.className = 'letter'
    span.style.animationDelay = `${(wordIndex * 0.25) + (i * 0.045) + 0.15}s`
    span.textContent = char === ' ' ? '\u00A0' : char
    el.appendChild(span)
  })
})

// ── SCROLL REVEAL ─────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target
      const delay = parseInt(el.dataset.delay || '0')
      setTimeout(() => el.classList.add('is-visible'), delay)
      revealObserver.unobserve(el)
    }
  })
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' })

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el))

// ── PARALLAX FLOAT IMAGES ─────────────────────────────────
const floatImgs = document.querySelectorAll('.float-img')
if (floatImgs.length) {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY
    floatImgs.forEach(img => {
      const speed = parseFloat(img.dataset.speed || '0.05')
      img.style.transform = `translateY(${scrollY * speed}px)`
    })
  }, { passive: true })
}

// ── STICKY BAR ────────────────────────────────────────────
const bar = document.getElementById('stickyBar')
if (bar) {
  window.addEventListener('scroll', () => {
    bar.classList.toggle('visible', window.scrollY > 600)
  }, { passive: true })
}

// ── FAQ ACCORDION ─────────────────────────────────────────
document.querySelectorAll('details').forEach(detail => {
  detail.addEventListener('toggle', () => {
    if (detail.open) {
      document.querySelectorAll('details').forEach(other => {
        if (other !== detail) other.open = false
      })
    }
  })
})
