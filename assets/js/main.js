/* DataPlug-GH Seller 9061 site interactions */
    function showPage(page) {
      document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
      document.getElementById('page-' + page).classList.add('active');
      document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active-nav'));
      const nav = document.getElementById('nav-' + page);
      if (nav) nav.classList.add('active-nav');
      closeMobileMenu();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function toggleMobileMenu() {
      document.getElementById('mobileMenu').classList.toggle('open');
      document.getElementById('menuOverlay').classList.toggle('show');
    }
    function closeMobileMenu() {
      document.getElementById('mobileMenu').classList.remove('open');
      document.getElementById('menuOverlay').classList.remove('show');
    }
    function navigateMobile(page) { showPage(page); closeMobileMenu(); }

    function toggleTutorial(card) { card.querySelector('.tutorial-steps').classList.toggle('open'); }
    function toggleBlogDropdown(btn) {
      const dd = btn.nextElementSibling;
      dd.classList.toggle('open');
      btn.textContent = dd.classList.contains('open') ? 'Hide ▲' : 'View Deal ▼';
    }

    function copyText(text, label) {
      if (!navigator.clipboard?.writeText) { showToast('Copy manually'); return; }
      navigator.clipboard.writeText(text).then(() => showToast(`✅ ${label} copied!`)).catch(() => showToast('Copy manually'));
    }
    function showToast(msg) {
      const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg;
      document.getElementById('toastContainer').appendChild(t);
      setTimeout(() => t.remove(), 2500);
    }

    const html = document.documentElement;
    function setTheme(mode) {
      html.setAttribute('data-theme', mode);
      const isDark = mode === 'dark';
      document.getElementById('lightIcon').classList.toggle('active-theme', !isDark);
      document.getElementById('darkIcon').classList.toggle('active-theme', isDark);
      document.getElementById('mLightIcon').classList.toggle('active-theme', !isDark);
      document.getElementById('mDarkIcon').classList.toggle('active-theme', isDark);
      localStorage.setItem('theme', mode);
    }

    const hour = new Date().getHours();
    const savedTheme = localStorage.getItem('theme');
    const promptDismissed = sessionStorage.getItem('nightPromptDismissed');

    if (!savedTheme && !promptDismissed && (hour >= 20 || hour < 6)) {
      document.getElementById('nightPrompt').style.display = 'flex';
    } else if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setTheme('light');
    }

    window.acceptNightMode = function() {
      setTheme('dark');
      document.getElementById('nightPrompt').style.display = 'none';
      sessionStorage.setItem('nightPromptDismissed', 'true');
    };
    window.dismissNightPrompt = function() {
      setTheme('light');
      document.getElementById('nightPrompt').style.display = 'none';
      sessionStorage.setItem('nightPromptDismissed', 'true');
    };

    document.getElementById('themeToggle').addEventListener('click', () => setTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'));
    document.getElementById('mobileThemeToggle').addEventListener('click', () => setTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'));
