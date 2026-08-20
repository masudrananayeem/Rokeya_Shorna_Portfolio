// Mobile nav toggle
(function(){
  var btn = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  if(btn && links){
    btn.addEventListener('click', function(){
      links.classList.toggle('open');
      var expanded = links.classList.contains('open');
      btn.setAttribute('aria-expanded', expanded);
    });
    links.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ links.classList.remove('open'); });
    });
  }
})();

// Scroll reveal
(function(){
  var els = document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window) || els.length === 0){
    els.forEach(function(el){ el.classList.add('show'); });
    return;
  }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('show');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach(function(el){ io.observe(el); });
})();

// Footer year
(function(){
  var y = document.getElementById('year');
  if(y){ y.textContent = new Date().getFullYear(); }
})();

// Contact form (front-end only demo — no backend wired up yet)
(function(){
  var form = document.getElementById('contactForm');
  if(!form) return;
  var status = document.getElementById('formStatus');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    var btn = form.querySelector('button[type="submit"]');
    var original = btn.textContent;
    btn.textContent = 'Sending…';
    btn.disabled = true;
    status.textContent = '';
    status.classList.remove('ok');
    setTimeout(function(){
      btn.textContent = original;
      btn.disabled = false;
      status.textContent = 'Message ready — connect a backend or emailing service to deliver it. For now, please reach out directly via email.';
      status.classList.add('ok');
    }, 900);
  });
})();
