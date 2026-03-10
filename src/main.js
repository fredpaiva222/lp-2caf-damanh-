import './style.css'

// ─── CAROUSEL ───────────────────────────────────────────────
const track  = document.getElementById('carouselTrack')
const dots   = document.querySelectorAll('.cdot')
const prevBtn = document.getElementById('carouselPrev')
const nextBtn = document.getElementById('carouselNext')
const TOTAL   = 6
let current   = 0
let autoTimer = null

function goTo(index) {
  current = (index + TOTAL) % TOTAL
  track.style.transform = `translateX(-${current * 100}%)`
  dots.forEach((d, i) => d.classList.toggle('active', i === current))
}

function next() { goTo(current + 1) }
function prev() { goTo(current - 1) }

function startAuto() {
  autoTimer = setInterval(next, 3500)
}
function resetAuto() {
  clearInterval(autoTimer)
  startAuto()
}

prevBtn.addEventListener('click', () => { prev(); resetAuto() })
nextBtn.addEventListener('click', () => { next(); resetAuto() })
dots.forEach(d => d.addEventListener('click', () => {
  goTo(Number(d.dataset.index)); resetAuto()
}))

// Touch / swipe support
let touchStartX = 0
const carousel = document.getElementById('heroCarousel')
carousel.addEventListener('touchstart', e => {
  touchStartX = e.touches[0].clientX
}, { passive: true })
carousel.addEventListener('touchend', e => {
  const diff = touchStartX - e.changedTouches[0].clientX
  if (Math.abs(diff) > 40) { diff > 0 ? next() : prev(); resetAuto() }
}, { passive: true })

startAuto()

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
