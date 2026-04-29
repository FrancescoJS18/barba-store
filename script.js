
/* ---- Scroll progress bar ---- */
window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
});

/* ---- Intersection Observer for reveals ---- */
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // animate metric bars
            entry.target.querySelectorAll('.metric-bar').forEach(bar => {
                bar.classList.add('animated');
            });
        }
    });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));

/* ---- Number counter animation ---- */
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.target);
            let current = 0;
            const step = target / 60;
            const timer = setInterval(() => {
                current += step;
                if (current >= target) { current = target; clearInterval(timer); }
                el.textContent = Math.round(current);
            }, 20);
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });
counters.forEach(c => counterObserver.observe(c));

/* ---- Trigger initial hero reveals ---- */
document.querySelectorAll('#hero .reveal, #hero .reveal-right').forEach(el => {
    setTimeout(() => el.classList.add('visible'), 200);
});

