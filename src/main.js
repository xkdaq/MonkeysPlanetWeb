import './style.css'

const menuToggle = document.querySelector('.menu-toggle')
const siteNav = document.querySelector('.site-nav')
const toast = document.querySelector('.toast')
const wechatDialog = document.querySelector('.wechat-dialog')
const wechatTrigger = document.querySelector('[data-wechat-trigger]')
const dialogClose = document.querySelector('.dialog-close')
let dialogCloseTimer

menuToggle.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open')
  menuToggle.classList.toggle('open', isOpen)
  menuToggle.setAttribute('aria-expanded', String(isOpen))
})

document.querySelectorAll('.site-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('open')
    menuToggle.classList.remove('open')
    menuToggle.setAttribute('aria-expanded', 'false')
  })
})

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        revealObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.14 }
)

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element))

/* ===== Scroll-based nav highlighting ===== */
const navLinks = document.querySelectorAll('.site-nav a[data-nav]')
const sections = Array.from(navLinks).map((link) => {
  const id = link.getAttribute('href').replace('#', '')
  return document.getElementById(id)
}).filter(Boolean)

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          const linkId = link.getAttribute('href').replace('#', '')
          link.classList.toggle('nav-active', linkId === entry.target.id)
        })
      }
    })
  },
  { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
)

sections.forEach((section) => sectionObserver.observe(section))

let toastTimer
function showToast(message) {
  toast.textContent = message
  toast.classList.add('show')
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800)
}

document.querySelectorAll('[data-platform]').forEach((button) => {
  button.addEventListener('click', () => {
    showToast('Android 正式下载地址接入后，即可在这里直接下载')
  })
})

function openWechatDialog() {
  clearTimeout(dialogCloseTimer)
  wechatDialog.classList.remove('closing')
  wechatDialog.showModal()
  document.body.classList.add('dialog-open')
}

function closeWechatDialog() {
  if (!wechatDialog.open || wechatDialog.classList.contains('closing')) return

  wechatDialog.classList.add('closing')
  dialogCloseTimer = setTimeout(() => {
    wechatDialog.close()
    wechatDialog.classList.remove('closing')
  }, 300)
}

wechatTrigger.addEventListener('click', openWechatDialog)
dialogClose.addEventListener('click', closeWechatDialog)

wechatDialog.addEventListener('click', (event) => {
  if (event.target === wechatDialog) {
    closeWechatDialog()
  }
})

wechatDialog.addEventListener('cancel', (event) => {
  event.preventDefault()
  closeWechatDialog()
})

wechatDialog.addEventListener('close', () => {
  document.body.classList.remove('dialog-open')
  wechatTrigger.focus()
})

document.querySelector('#year').textContent = new Date().getFullYear()
