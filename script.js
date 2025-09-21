/* ====== NAV, THEME & HAMBURGER ====== */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger && hamburger.addEventListener('click', ()=> navLinks.classList.toggle('show'));

// Theme toggle + persist
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const savedTheme = localStorage.getItem('theme');
if(savedTheme === 'dark') body.classList.add('dark-mode'), themeToggle.textContent = '☀️';
themeToggle && themeToggle.addEventListener('click', ()=>{
  body.classList.toggle('dark-mode');
  const isDark = body.classList.contains('dark-mode');
  themeToggle.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

/* ====== SMOOTH SCROLL for internal links ====== */
document.querySelectorAll('.nav-links a').forEach(a=>{
  a.addEventListener('click', (e)=>{
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if(target) target.scrollIntoView({behavior:'smooth', block:'start'});
    // close mobile menu
    navLinks.classList.remove('show');
  });
});

/* ====== SCROLL APPEAR ANIMATIONS ====== */
const observer = new IntersectionObserver((entries, obs)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('show');
      obs.unobserve(entry.target);
    }
  });
}, {threshold: 0.15});
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
document.querySelectorAll('.hero-text, .hero-photo').forEach(el => observer.observe(el));

/* ====== PHOTO MODAL (click to zoom) ====== */
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const closeBtn = document.querySelector('.close');

document.querySelectorAll('.modal-trigger').forEach(img=>{
  img.addEventListener('click', ()=>{
    modal.style.display = 'flex';
    modalImg.src = img.src;
    modal.setAttribute('aria-hidden','false');
  });
});
closeBtn && closeBtn.addEventListener('click', ()=> {
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden','true');
});
window.addEventListener('click', e => {
  if(e.target === modal) { modal.style.display = 'none'; modal.setAttribute('aria-hidden','true'); }
});

/* ====== SCROLL TO TOP ====== */
const topBtn = document.getElementById('topBtn');
window.addEventListener('scroll', ()=>{
  if(window.scrollY > 400) topBtn.style.display = 'block';
  else topBtn.style.display = 'none';
});
topBtn && topBtn.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));

/* ====== Make project cards collapsible on small screens ====== */
function setupCollapsibles(){
  if(window.innerWidth <= 700){
    document.querySelectorAll('.project-card').forEach(card=>{
      if(!card.classList.contains('collapsible')){
        const header = card.querySelector('.project-head');
        const content = Array.from(card.children).slice(1);
        const wrapper = document.createElement('div');
        wrapper.classList.add('collapsible-content');
        content.forEach(c=> wrapper.appendChild(c));
        card.appendChild(wrapper);
        header.style.cursor = 'pointer';
        header.addEventListener('click', ()=> wrapper.classList.toggle('open'));
        card.classList.add('collapsible');
      }
    });
  } else {
    // if resizing larger, remove open-collapse wrappers (simple approach: reload)
  }
}
setupCollapsibles();
window.addEventListener('resize', ()=> { /* small screens: re-run on resize */ setupCollapsibles(); });

/* ====== Accessibility: close modal with ESC ====== */
window.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') { modal.style.display='none'; modal.setAttribute('aria-hidden','true'); }});
