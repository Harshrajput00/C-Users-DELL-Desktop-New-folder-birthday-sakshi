/* Diary/Book Flow with Page Flipping */
document.addEventListener('DOMContentLoaded', () => {
  const slides = [
    { img: 'assets/photos/photo1.jpg', text: 'That evening under the lights... when I knew you were someone truly special. The way you smiled, the comfort in your presence — it all felt so right. 💛' },
    { img: 'assets/photos/photo2.jpg', text: 'Nature, you, and endless moments of laughter. Those scenic drives and stolen glances across the landscape — thank you for making simple moments magical. 🌿' },
    { img: 'assets/photos/photo3.jpg', text: 'Just you and me against the world, with those matching smiles. This is what happiness looks like — genuine, unfiltered, and forever. 💚' },
    { img: 'assets/photos/photo4.jpg', text: 'In the quiet moments, I realize how lucky I am. Your love, your warmth, your presence — they make my heart overflow with gratitude. One year with you, and I want forever. 🥰' }
  ];
  // Feature flags to enable/disable optional visuals
  const ENABLE_STRAWBERRIES = true;
  const ENABLE_CANDLE_WISHES = true;

  let currentPage = 0;
  const totalPages = slides.length + 4; // +1 for cover, +1 for cake, +1 for final message, +1 for wishes page
  const pagesContainer = document.getElementById('memory-pages-container');
  const pageCounter = document.getElementById('page-counter');
  const prevBtn = document.getElementById('prevPage');
  const nextBtn = document.getElementById('nextPage');
  const nextCoverBtn = document.getElementById('nextPageCover');
  const memoryNav = document.getElementById('memory-nav');

  console.log('DOM elements:', {
    pagesContainer,
    pageCounter,
    prevBtn,
    nextBtn,
    nextCoverBtn,
    memoryNav
  });

  // Decorative emojis near the Next Page area
  function createNavEmojis(){
    if(document.getElementById('nav-emoji-cluster')) return;
    const cluster = document.createElement('div');
    cluster.id = 'nav-emoji-cluster';
    cluster.setAttribute('aria-hidden','true');
    cluster.innerHTML = '<span>💖</span><span>✨</span><span>🎈</span><span>💕</span><span>🌸</span>';
    document.body.appendChild(cluster);
  }

  // Create memory pages
  function createMemoryPages() {
    slides.forEach((slide, idx) => {
      const page = document.createElement('div');
      page.className = 'diary-page memory-page';
      page.id = `page-${idx + 1}`;
      page.innerHTML = `
        <div class="page-inner">
          <div class="image-side">
            <img src="${slide.img}" alt="Memory ${idx + 1}">
          </div>
          <div class="text-side">
            <p>${slide.text}</p>
            <div class="emoji-float" aria-hidden="true">
              <span>💖</span><span>✨</span><span>🎈</span><span>💕</span><span>🌸</span>
            </div>
          </div>
        </div>
      `;
      pagesContainer.appendChild(page);
    });
    
    // Create cake page
    const cakeIndex = slides.length + 1;
    const cakePage = document.createElement('div');
    cakePage.className = 'diary-page cake-page';
    cakePage.id = `page-${cakeIndex}`;
    cakePage.innerHTML = `
      <div class="page-inner cake-inner">
        <div class="blow-text" id="blow-text">Make a wish... Blow the candles 🕯️</div>
        <div class="cake-container">
          <div class="cake">
            <div class="cake-emoji" id="cake-emoji">🎂</div>
            <div class="cake-layer">
              <div class="cake-frosting">
                <div class="strawberries-holder" id="strawberries-holder"></div>
              </div>
              <div class="candles-holder" id="candles-holder"></div>
            </div>
          </div>
        </div>
      </div>
    `;
    pagesContainer.appendChild(cakePage);
    createCandles();
    if (ENABLE_STRAWBERRIES) {
      createStrawberries();
    }

    // Create final message page (after cake)
    const messageIndex = slides.length + 2;
    const messagePage = document.createElement('div');
    messagePage.className = 'diary-page message-page';
    messagePage.id = `page-${messageIndex}`;
    messagePage.innerHTML = `
      <div class="page-inner">
        <div class="message-content" id="message-content">
          <h2>Dear love (Sakshi)</h2>
          <div class="message-body"> 
            <p>Sakshi, when we first started talking, I never knew how special you would become to me. Somewhere between those conversations, I slowly fell for you 💫.</p>
            <p>I know you weren’t ready at first, but love has its own way of finding the heart, and it gently made its place in yours too 💕. Today, I feel grateful, lucky, and truly happy to have you in my life.</p>
            <p>You make my days brighter just by being you, and I smile more because of you 🌸.</p>
            <p>Happy Birthday mera cutie sa baccha 🎂🎉💖 — may your day be as beautiful and warm as your heart 🥰✨</p>
          </div>
        </div>
      </div>
    `;
    pagesContainer.appendChild(messagePage);
    
    // Create wishes page (after final message)
    const wishesIndex = slides.length + 3;
    const wishesPage = document.createElement('div');
    wishesPage.className = 'diary-page wishes-page';
    wishesPage.id = `page-${wishesIndex}`;
    wishesPage.innerHTML = `
      <div class="page-inner">
        <div class="message-content" id="wishes-content">
          <h2>Good Wishes for You</h2>
          <div class="message-body">
            <p>May your days stay bright, your heart stay light, and your smile never fade ✨</p>
            <p>May every dream you whisper find its way to you, wrapped in love and luck 🎁</p>
            <p>May laughter and warmth follow you everywhere, today and always 😊</p>
            <p>May you always feel cherished, celebrated, and deeply loved 💖</p>
          </div>
        </div>
      </div>
    `;
    pagesContainer.appendChild(wishesPage);

    console.log('Created', slides.length, 'memory pages + cake + final message page + wishes page');
  }
  
  function createCandles() {
    const candlesHolder = document.getElementById('candles-holder');
    const candleCount = 5;
    const wishes = [
      "May your smile never fade 😊",
      "Wishing you endless laughter and love 💖",
      "May your dreams come true ✨",
      "Stay as beautiful as you are 🌸",
      "A year filled with joy and sweet moments 🎂"
    ];

    for(let i = 0; i < candleCount; i++) {
      const candle = document.createElement('div');
      candle.className = 'candle lit';
      candle.innerHTML = '<div class="wick"></div><div class="flame">🔥</div>';
      candle.style.cursor = 'pointer';
      candle.dataset.wish = wishes[i % wishes.length];

      candle.addEventListener('click', function(e) {
        if(this.classList.contains('blown')) return;
        this.classList.add('blown');

        // Trigger small celebration
        spawnSmallHearts();
        spawnSmallConfetti();

        // Show a cute wish popup near the candle (if enabled)
        if (ENABLE_CANDLE_WISHES) {
          try {
            const rect = this.getBoundingClientRect();
            const wishEl = document.createElement('div');
            wishEl.className = 'candle-wish';
            wishEl.textContent = this.dataset.wish || 'Best wishes!';
            wishEl.style.position = 'fixed';
            wishEl.style.left = (rect.left + rect.width / 2) + 'px';
            wishEl.style.top = (rect.top - 8) + 'px';
            wishEl.style.transform = 'translate(-50%, -100%) scale(0.9)';
            wishEl.style.pointerEvents = 'none';
            document.body.appendChild(wishEl);
            // animate in
            requestAnimationFrame(() => wishEl.classList.add('show'));
            // auto hide after a short duration
            setTimeout(() => {
              wishEl.classList.remove('show');
              setTimeout(() => wishEl.remove(), 400);
            }, 2800);
          } catch (err) {
            console.warn('Could not position wish popup', err);
          }
        }

        // Check if all candles are blown
        const allCandles = Array.from(candlesHolder.querySelectorAll('.candle'));
        const allBlown = allCandles.every(c => c.classList.contains('blown'));

        if(allBlown) {
          setTimeout(() => {
            triggerBalloonPop();
          }, 800);
        }
      });

      candlesHolder.appendChild(candle);
    }
  }

  function createStrawberries(){
    const holder = document.getElementById('strawberries-holder');
    if(!holder) return;
    const positions = [
      {left: '18%', top: '18%', scale: 1},
      {left: '50%', top: '10%', scale: 1.05},
      {left: '74%', top: '18%', scale: 0.95},
      {left: '36%', top: '28%', scale: 0.9}
    ];
    positions.forEach((p, i) => {
      const s = document.createElement('div');
      s.className = 'strawberry';
      s.style.left = p.left;
      s.style.top = p.top;
      s.style.transform = `translate(-50%, -50%) scale(${p.scale}) rotate(${(i%2? -8:8)}deg)`;
      holder.appendChild(s);
    });
  }
  
  function triggerBalloonPop() {
    // Hide blow text
    const blowText = document.getElementById('blow-text');
    if(blowText) {
      blowText.style.animation = 'fadeOut 0.6s ease-out forwards';
      setTimeout(() => blowText.remove(), 600);
    }
    
    // Add blur overlay
    let overlay = document.getElementById('overlay-blur');
    if(!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'overlay-blur';
      overlay.className = 'overlay-blur';
      document.body.appendChild(overlay);
    }
    overlay.classList.add('active');
    
    // Create big balloon with text
    const bigBalloon = document.createElement('div');
    bigBalloon.className = 'big-balloon';
    bigBalloon.id = 'big-balloon';
    bigBalloon.textContent = 'Happy Birthday love 🎉';
    document.body.appendChild(bigBalloon);
    
    // Pop animation after delay
    setTimeout(() => {
      bigBalloon.classList.add('pop');
      
      // Spawn celebratory effects
      runConfetti();
      spawnBalloons(24);
      spawnSmallHearts();
      
      // Create floating balloons
      for(let i = 0; i < 20; i++) {
        const joyBalloon = document.createElement('div');
        joyBalloon.className = 'joy-balloon';
        joyBalloon.style.left = (10 + Math.random() * 80) + '%';
        joyBalloon.style.top = (60 + Math.random() * 30) + '%';
        const hue = Math.floor(280 - Math.random() * 120);
        joyBalloon.style.background = `linear-gradient(180deg, hsl(${hue} 90% 70%), hsl(${hue} 70% 55%))`;
        document.body.appendChild(joyBalloon);
        
        joyBalloon.animate([
          {transform: 'translateY(0) scale(0.9)', opacity: 1},
          {transform: 'translateY(-420px) scale(1.05)', opacity: 1}
        ], {
          duration: 4000 + Math.random() * 3000,
          delay: 200 + Math.random() * 800,
          easing: 'cubic-bezier(0.2, 0.9, 0.2, 1)'
        });
        
        setTimeout(() => joyBalloon.remove(), 6000 + Math.random() * 3000);
      }
    }, 300);
    
    // Remove big balloon when animation ends
    bigBalloon.addEventListener('animationend', (ev) => {
      if(ev.animationName && ev.animationName.toLowerCase().includes('pop')) {
        bigBalloon.remove();
        
        // Show celebration text (multiline message)
        const celebrText = document.createElement('div');
        celebrText.className = 'celebration-text';
        celebrText.innerHTML = `
          <p>Happy Birthday Sakshi 🎉💫</p>
          <p>Happy birthday mera cutie sa baccha 🥰💖</p>
          <p>You make my world brighter just by being you 🌸</p>
          <p>May your smile always stay the same and your heart always stay happy ✨</p>
          <p>I’m really lucky to have you, and I hope today brings you lots of love, laughter, and cake 🎂💝</p>
          <p>Stay cute, stay you 💕😊</p>
        `;
        document.body.appendChild(celebrText);
        
        setTimeout(() => celebrText.classList.add('show'), 100);
        
        // Extra confetti
        runConfetti();
        spawnBalloons(36);
        
        // Remove blur after delay
        setTimeout(() => overlay.classList.remove('active'), 4200);
        
        // Auto remove celebration text (stay visible for 20 seconds)
        setTimeout(() => {
          celebrText.classList.remove('show');
          setTimeout(() => celebrText.remove(), 500);
        }, 20000);
      }
    });
  }


  function updatePageDisplay() {
    // hide all pages
    document.querySelectorAll('.diary-page').forEach(p => {
      p.classList.remove('active', 'prev');
    });

    // show current page with animation
    const currentPageEl = currentPage === 0 
      ? document.getElementById('cover-page') 
      : document.getElementById(`page-${currentPage}`);
    
    if(currentPageEl) {
      currentPageEl.classList.add('active');
      // Trigger celebration when viewing memory pages
      if(currentPage > 0) {
        setTimeout(() => {
          spawnSmallHearts();
          spawnSmallConfetti();
        }, 300);
      }
    }

    // update counter
    if(currentPage === 0) {
      pageCounter.textContent = 'Cover';
    } else {
      pageCounter.textContent = `Memory ${currentPage}/${slides.length}`;
    }

    // disable buttons at limits
    prevBtn.disabled = currentPage === 0;
    nextBtn.disabled = currentPage === totalPages - 1;

    // Show memory nav only on memory pages (not on cover)
    if(currentPage === 0) {
      memoryNav.style.display = 'none';
    } else {
      memoryNav.style.display = 'flex';
    }

    console.log('Page updated to:', currentPage);

    // If we're on the final message page, reveal it and run joyful effects
    const finalMessageIndex = slides.length + 2;
    if(currentPage === finalMessageIndex){
      const msg = document.getElementById('message-content');
      if(msg && !msg.classList.contains('reveal')){
        setTimeout(()=>{
          msg.classList.add('reveal');
          runConfetti();
          spawnBalloons(18);
          spawnSmallHearts();
        }, 200);
      }
    }

    // If we're on the wishes page, reveal it and trigger a small celebration
    const wishesIndex = slides.length + 3;
    if(currentPage === wishesIndex) {
      const wishesContent = document.querySelector(`#page-${wishesIndex} .message-content`);
      if(wishesContent && !wishesContent.classList.contains('reveal')) {
        setTimeout(() => {
          wishesContent.classList.add('reveal');
          runConfetti();
          spawnBalloons(14);
          spawnSmallHearts();
        }, 200);
      }
    }
  }

  // Event Listeners
  if(nextCoverBtn) {
    nextCoverBtn.addEventListener('click', () => {
      console.log('Cover button clicked, moving from page', currentPage, 'to', currentPage + 1);
      if(currentPage < totalPages - 1) {
        currentPage++;
        updatePageDisplay();
      }
    });
  } else {
    console.error('nextPageCover button not found!');
  }

  if(prevBtn) {
    prevBtn.addEventListener('click', () => {
      console.log('Prev button clicked');
      if(currentPage > 0) {
        currentPage--;
        updatePageDisplay();
      }
    });
  }

  if(nextBtn) {
    nextBtn.addEventListener('click', () => {
      console.log('Next button clicked, currentPage:', currentPage, 'totalPages:', totalPages);
      if(currentPage < totalPages - 1) {
        currentPage++;
        updatePageDisplay();
      } else {
        console.log('Next button disabled - at last page');
      }
    });
  }

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if(e.key === 'ArrowLeft' && prevBtn && !prevBtn.disabled) prevBtn.click();
    if(e.key === 'ArrowRight' && nextBtn && !nextBtn.disabled) nextBtn.click();
  });

  // Initialize
  createMemoryPages();
  createNavEmojis();
  updatePageDisplay();

  // Confetti and Balloons
  function spawnSmallHearts() {
    for(let i = 0; i < 15; i++) {
      const heart = document.createElement('div');
      heart.className = 'floating-heart';
      heart.textContent = '💕';
      heart.style.position = 'fixed';
      heart.style.left = Math.random() * 100 + '%';
      heart.style.bottom = '-10px';
      heart.style.fontSize = (14 + Math.random() * 20) + 'px';
      heart.style.zIndex = '9998';
      heart.style.pointerEvents = 'none';
      document.body.appendChild(heart);
      
      heart.animate([
        {transform: 'translateY(0) scale(1)', opacity: 1},
        {transform: 'translateY(-' + (300 + Math.random() * 200) + 'px) scale(1.2) rotateZ(' + (Math.random() * 20 - 10) + 'deg)', opacity: 0}
      ], {
        duration: 2000 + Math.random() * 1000,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      });
      
      setTimeout(() => heart.remove(), 3500);
    }
  }

  function spawnSmallConfetti() {
    const colors = ['#ff4da6', '#ffd166', '#ff7aa2', '#b388ff', '#7ef3d5'];
    for(let i = 0; i < 30; i++) {
      const el = document.createElement('div');
      el.className = 'confetti';
      const size = 4 + Math.random() * 8;
      el.style.width = size + 'px';
      el.style.height = (size * 1.2) + 'px';
      el.style.background = colors[Math.floor(Math.random() * colors.length)];
      el.style.left = (Math.random() * 100) + '%';
      el.style.top = (20 + Math.random() * 30) + '%';
      el.style.transform = `rotate(${Math.random() * 360}deg)`;
      el.style.animation = `confetti-fall ${1.5 + Math.random() * 2}s linear forwards`;
      el.style.opacity = 0.8;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 4000);
    }
  }

  function runConfetti() {
    const colors = ['#ff4da6', '#ffd166', '#ff7aa2', '#b388ff', '#7ef3d5'];
    for(let i = 0; i < 80; i++) {
      const el = document.createElement('div');
      el.className = 'confetti';
      const size = 6 + Math.random() * 12;
      el.style.width = size + 'px';
      el.style.height = (size * 1.2) + 'px';
      el.style.background = colors[Math.floor(Math.random() * colors.length)];
      el.style.left = (Math.random() * 100) + '%';
      el.style.top = (-10 - Math.random() * 10) + '%';
      el.style.transform = `rotate(${Math.random() * 360}deg)`;
      el.style.animation = `confetti-fall ${2 + Math.random() * 3}s linear forwards`;
      el.style.opacity = 0.95;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 5500);
    }
  }

  function spawnBalloons(count) {
    for(let i = 0; i < count; i++) {
      const b = document.createElement('div');
      b.className = 'balloon';
      const hue = Math.floor(280 - Math.random() * 120);
      b.style.background = `linear-gradient(180deg, hsl(${hue} 90% 70%), hsl(${hue} 70% 55%))`;
      b.style.left = (Math.random() * 100) + '%';
      b.style.bottom = '-50px';
      b.style.animation = `float-balloon ${4 + Math.random() * 3}s ease-in forwards`;
      document.body.appendChild(b);
      setTimeout(() => b.remove(), 8000);
    }
  }

  window.celebrateDiary = () => {
    runConfetti();
    spawnBalloons(16);
  };

  // Add CSS animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes confetti-fall {
      0% { transform: translateY(-10vh) rotate(0) scale(1); opacity: 1; }
      100% { transform: translateY(110vh) rotate(720deg) scale(0.5); opacity: 0; }
    }
    @keyframes float-balloon {
      0% { transform: translateY(0) scale(0.8); opacity: 1; }
      100% { transform: translateY(-110vh) scale(1); opacity: 0.7; }
    }
    .confetti {
      position: fixed;
      pointer-events: none;
      z-index: 9999;
    }
    .balloon {
      position: fixed;
      width: 30px;
      height: 40px;
      border-radius: 50% 50% 50% 0;
      pointer-events: none;
      z-index: 9999;
    }
  `;
  document.head.appendChild(style);
});
