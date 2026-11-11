/**
 * SYNTRAXS TECHNOLOGIES INDIA
 * Premier Event Architecture & Experiential Systems
 * High-End 3D Physics, Indian Landmark Deployments & Interactive Engine
 */

(function () {
  'use strict';

  // State Management
  const state = {
    audioEnabled: false,
    lightingMode: 'cobalt',
    viewMode: 'grid',
    activeFilter: 'all',
    activeCapability: 0,
    mouse: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
    isModalOpen: false,
    isMenuOpen: false,
  };

  /* ==========================================================================
     01. BRAND ASSETS & PRELOADER INITIALIZATION
     ========================================================================== */
  function initPreloader() {
    const preloader = document.getElementById('preloader');
    const counter = document.getElementById('preloaderCounter');
    const bar = document.getElementById('preloaderBar');
    const log = document.getElementById('preloaderLog');
    const skipBtn = document.getElementById('preloaderSkip');
    const logoImg = document.getElementById('preloaderLogoImg');

    // Use embedded high-res logo data URI from logo-data.js, fallback to local path
    if (window.SYNTRAXS_LOGO && logoImg) {
      logoImg.src = window.SYNTRAXS_LOGO;
    }

    const logMessages = [
      '[01/05] INITIALIZING INDIAN SPATIAL ARCHITECTURE ENGINE...',
      '[02/05] CALIBRATING BENGALURU & MUMBAI VOLUMETRIC RIGS...',
      '[03/05] SYNCHRONIZING REAL-TIME TELEMETRY ACROSS INDIAN HUBS...',
      '[04/05] LOADING HIGH-PRECISION MONUMENT BLUEPRINTS...',
      '[05/05] SYNTRAXS TECHNOLOGIES INDIA ONLINE. READY.'
    ];

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 4) + 1;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        if (counter) counter.textContent = '100%';
        if (bar) bar.style.width = '100%';
        if (log) log.textContent = logMessages[4];

        if (state.audioEnabled) soundEngine.playChime();

        setTimeout(() => {
          dismissPreloader();
        }, 500);
      } else {
        if (counter) counter.textContent = `${progress}%`;
        if (bar) bar.style.width = `${progress}%`;
        const logIdx = Math.min(Math.floor((progress / 100) * logMessages.length), logMessages.length - 1);
        if (log) log.textContent = logMessages[logIdx];
      }
    }, 30);

    if (skipBtn) {
      skipBtn.addEventListener('click', () => {
        clearInterval(interval);
        dismissPreloader();
      });
    }
  }

  function dismissPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader || preloader.classList.contains('completed')) return;
    preloader.classList.add('completed');
    document.body.style.overflow = '';
    initHeroCanvas();
    initStageCanvas();
    init3DTilt();
    animateMetrics();
  }

  // Replay Intro Feature
  window.replayIntro = function () {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;
    preloader.classList.remove('completed');
    initPreloader();
  };

  /* ==========================================================================
     02. SYNTHESIZED WEB AUDIO SOUND ENGINE
     ========================================================================== */
  class SoundEngine {
    constructor() {
      this.ctx = null;
      this.ambientOsc = null;
      this.ambientGain = null;
    }

    init() {
      if (this.ctx) return;
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioContext();
      } catch (e) {
        console.warn('Web Audio not supported');
      }
    }

    playClick() {
      if (!state.audioEnabled || !this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1400, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(700, this.ctx.currentTime + 0.05);

        gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.06);
      } catch (e) {}
    }

    playSweep() {
      if (!state.audioEnabled || !this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(150, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(600, this.ctx.currentTime + 0.18);

        gain.gain.setValueAtTime(0.09, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.18);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.19);
      } catch (e) {}
    }

    playChime() {
      if (!state.audioEnabled || !this.ctx) return;
      try {
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.08);

          gain.gain.setValueAtTime(0.06, this.ctx.currentTime + i * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + i * 0.08 + 0.4);

          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(this.ctx.currentTime + i * 0.08);
          osc.stop(this.ctx.currentTime + i * 0.08 + 0.45);
        });
      } catch (e) {}
    }

    toggleAmbient(enable) {
      if (!this.ctx) this.init();
      if (enable) {
        try {
          if (!this.ambientOsc) {
            this.ambientOsc = this.ctx.createOscillator();
            this.ambientGain = this.ctx.createGain();
            this.ambientOsc.type = 'sine';
            this.ambientOsc.frequency.setValueAtTime(55, this.ctx.currentTime); // Deep A1 drone

            this.ambientGain.gain.setValueAtTime(0.02, this.ctx.currentTime);
            this.ambientOsc.connect(this.ambientGain);
            this.ambientGain.connect(this.ctx.destination);
            this.ambientOsc.start();
          }
        } catch (e) {}
      } else {
        if (this.ambientOsc) {
          try {
            this.ambientOsc.stop();
            this.ambientOsc.disconnect();
          } catch (e) {}
          this.ambientOsc = null;
        }
      }
    }
  }

  const soundEngine = new SoundEngine();

  function initSoundToggle() {
    const soundBtn = document.getElementById('soundToggleBtn');
    if (!soundBtn) return;

    soundBtn.addEventListener('click', () => {
      soundEngine.init();
      state.audioEnabled = !state.audioEnabled;
      soundBtn.classList.toggle('active', state.audioEnabled);
      const textSpan = soundBtn.querySelector('.sound-btn-text');
      if (textSpan) textSpan.textContent = state.audioEnabled ? 'AUDIO [ON]' : 'AUDIO [OFF]';

      soundEngine.toggleAmbient(state.audioEnabled);
      if (state.audioEnabled) soundEngine.playClick();
    });
  }

  /* ==========================================================================
     03. HIGH-PERFORMANCE 3D TILT & SPECULAR HOVER ENGINE
     ========================================================================== */
  function init3DTilt() {
    // Select all interactive cards & elements for 3D tilt
    const tiltElements = document.querySelectorAll('.card-3d-tilt, .project-card, .studio-card, .capability-card, .preloader-logo-wrapper');

    tiltElements.forEach((card) => {
      // Create glare overlay if not present
      if (!card.querySelector('.card-3d-glare')) {
        const glare = document.createElement('div');
        glare.className = 'card-3d-glare';
        card.appendChild(glare);
      }

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -12; // In degrees
        const rotateY = ((x - centerX) / centerX) * 12;

        // Apply 3D perspective transform
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(16px) scale3d(1.02, 1.02, 1.02)`;

        // Update specular glare
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;
        card.style.setProperty('--glare-x', `${glareX}%`);
        card.style.setProperty('--glare-y', `${glareY}%`);
        card.style.setProperty('--glare-opacity', '1');
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)`;
        card.style.setProperty('--glare-opacity', '0');
      });
    });

    // Global cursor spotlight tracking
    window.addEventListener('mousemove', (e) => {
      state.mouse.x = e.clientX;
      state.mouse.y = e.clientY;
      document.body.style.setProperty('--mouse-x', `${(e.clientX / window.innerWidth) * 100}%`);
      document.body.style.setProperty('--mouse-y', `${(e.clientY / window.innerHeight) * 100}%`);
    });
  }

  /* ==========================================================================
     04. HERO 3D ROTATING ARCHITECTURAL DOME CANVAS
     ========================================================================== */
  function initHeroCanvas() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width, height;
    function resize() {
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // 3D Nodes representing an architectural dome / parametric truss
    const nodes = [];
    const numNodes = 54;
    const radius = Math.min(width, height) * 0.42;

    for (let i = 0; i < numNodes; i++) {
      const theta = Math.acos(2 * Math.random() - 1);
      const phi = 2 * Math.PI * Math.random();
      nodes.push({
        x: radius * Math.sin(theta) * Math.cos(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(theta),
      });
    }

    let angleX = 0;
    let angleY = 0;
    let targetAngleX = 0;
    let targetAngleY = 0;

    window.addEventListener('mousemove', (e) => {
      targetAngleY = (e.clientX / window.innerWidth - 0.5) * 1.5;
      targetAngleX = (e.clientY / window.innerHeight - 0.5) * -0.9;
    });

    function draw() {
      ctx.clearRect(0, 0, width, height);

      angleX += (targetAngleX - angleX) * 0.05;
      angleY += (targetAngleY - angleY) * 0.05 + 0.0025;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      const projected = [];
      const centerX = width * 0.68;
      const centerY = height * 0.5;

      // Draw 3 Concentric 3D Orbital Rings
      const rings = [radius * 1.15, radius * 0.85, radius * 0.55];
      rings.forEach((r, idx) => {
        ctx.beginPath();
        const ringAngle = angleY * (idx % 2 === 0 ? 1 : -1) + idx * 0.5;
        for (let a = 0; a <= Math.PI * 2; a += 0.2) {
          const rx = r * Math.cos(a);
          const ry = 0;
          const rz = r * Math.sin(a);

          const x1 = rx * Math.cos(ringAngle) - rz * Math.sin(ringAngle);
          const z1 = rz * Math.cos(ringAngle) + rx * Math.sin(ringAngle);

          const y2 = ry * cosX - z1 * sinX;
          const z2 = z1 * cosX + ry * sinX;

          const fov = 480;
          const scale = fov / (fov + z2 + 250);
          const px = centerX + x1 * scale;
          const py = centerY + y2 * scale;

          if (a === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.strokeStyle = idx === 0 ? 'rgba(0, 229, 255, 0.18)' : 'rgba(0, 119, 255, 0.1)';
        ctx.lineWidth = 1.2;
        ctx.stroke();
      });

      // Project Nodes
      nodes.forEach((node) => {
        let x1 = node.x * cosY - node.z * sinY;
        let z1 = node.z * cosY + node.x * sinY;

        let y2 = node.y * cosX - z1 * sinX;
        let z2 = z1 * cosX + node.y * sinX;

        const fov = 480;
        const scale = fov / (fov + z2 + 250);
        projected.push({
          x: centerX + x1 * scale,
          y: centerY + y2 * scale,
          scale: scale,
          z: z2,
        });
      });

      // Connect nodes within threshold distance
      const maxDist = 145;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i];
          const p2 = projected[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.28 * Math.min(p1.scale, p2.scale);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 229, 255, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      projected.forEach((p) => {
        const radius = Math.max(1.2, p.scale * 3.5);
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 229, 255, ${p.scale * 0.85})`;
        ctx.shadowColor = '#00e5ff';
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);
  }

  /* ==========================================================================
     05. SPOTLIGHT LAB INTERACTIVE CONSOLE
     ========================================================================== */
  function initStageCanvas() {
    const canvas = document.getElementById('stageCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width, height;
    function resize() {
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    let spotX = width * 0.5;
    let spotY = height * 0.5;
    let targetSpotX = width * 0.5;
    let targetSpotY = height * 0.5;

    let intensity = 0.85;
    let angleSpread = 0.45;

    const intensitySlider = document.getElementById('intensitySlider');
    const angleSlider = document.getElementById('angleSlider');
    const intensityVal = document.getElementById('intensityVal');
    const angleVal = document.getElementById('angleVal');

    if (intensitySlider) {
      intensitySlider.addEventListener('input', (e) => {
        intensity = parseFloat(e.target.value) / 100;
        if (intensityVal) intensityVal.textContent = `${e.target.value}%`;
      });
    }
    if (angleSlider) {
      angleSlider.addEventListener('input', (e) => {
        angleSpread = parseFloat(e.target.value) / 100;
        if (angleVal) angleVal.textContent = `${e.target.value}°`;
      });
    }

    canvas.parentElement.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      targetSpotX = e.clientX - rect.left;
      targetSpotY = e.clientY - rect.top;
    });

    const presetChips = document.querySelectorAll('.preset-chip');
    presetChips.forEach((chip) => {
      chip.addEventListener('click', () => {
        presetChips.forEach((c) => c.classList.remove('active'));
        chip.classList.add('active');
        const mode = chip.getAttribute('data-preset');
        setLightingMode(mode);
        soundEngine.playSweep();
      });
    });

    function setLightingMode(mode) {
      state.lightingMode = mode;
      document.body.setAttribute('data-lighting', mode);
    }

    function getModeRGB() {
      switch (state.lightingMode) {
        case 'cyber': return { r: 255, g: 183, b: 3 };
        case 'platinum': return { r: 245, g: 248, b: 255 };
        case 'violet': return { r: 217, g: 70, b: 239 };
        default: return { r: 0, g: 229, b: 255 }; // Cobalt
      }
    }

    const pillars = [
      { x: 0.2, y: 0.28, w: 28, h: 180 },
      { x: 0.4, y: 0.22, w: 32, h: 220 },
      { x: 0.6, y: 0.22, w: 32, h: 220 },
      { x: 0.8, y: 0.28, w: 28, h: 180 },
    ];

    function drawStage() {
      ctx.clearRect(0, 0, width, height);

      spotX += (targetSpotX - spotX) * 0.15;
      spotY += (targetSpotY - spotY) * 0.15;

      const rgb = getModeRGB();

      // Stage Floor Perspective Grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      const horizon = height * 0.65;

      for (let x = 0; x <= width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, height);
        ctx.lineTo(width * 0.5 + (x - width * 0.5) * 0.25, horizon);
        ctx.stroke();
      }
      for (let y = horizon; y <= height; y += 22) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 3D Pillars & Perspective Shadows
      pillars.forEach((p) => {
        const px = p.x * width;
        const py = p.y * height;

        const dx = px - spotX;
        const dy = py + p.h - spotY;

        ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        ctx.beginPath();
        ctx.ellipse(px + dx * 0.1, py + p.h, p.w * 0.8, p.w * 0.3, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#10141f';
        ctx.fillRect(px - p.w / 2, py, p.w, p.h);
        ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.25)`;
        ctx.strokeRect(px - p.w / 2, py, p.w, p.h);
      });

      // Volumetric Spotlight Cone
      const rigX = width * 0.5;
      const rigY = 20;

      const grad = ctx.createRadialGradient(spotX, spotY, 0, spotX, spotY, 260 * angleSpread);
      grad.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${0.45 * intensity})`);
      grad.addColorStop(0.4, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${0.15 * intensity})`);
      grad.addColorStop(1, 'transparent');

      ctx.beginPath();
      ctx.moveTo(rigX - 15, rigY);
      ctx.lineTo(spotX - 180 * angleSpread, spotY);
      ctx.lineTo(spotX + 180 * angleSpread, spotY);
      ctx.lineTo(rigX + 15, rigY);
      ctx.closePath();
      ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${0.08 * intensity})`;
      ctx.fill();

      ctx.beginPath();
      ctx.ellipse(spotX, spotY, 160 * angleSpread, 80 * angleSpread, 0, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(rigX, rigY, 14, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${0.8 * intensity})`;
      ctx.shadowColor = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
      ctx.shadowBlur = 25;
      ctx.fill();
      ctx.shadowBlur = 0;

      requestAnimationFrame(drawStage);
    }
    requestAnimationFrame(drawStage);
  }

  /* ==========================================================================
     06. LANDMARK INDIAN PROJECTS DATA & SHOWCASE SYSTEM
     ========================================================================== */
  const projectsData = [
    {
      id: 'bharat-mandapam',
      title: 'Bharat Mandapam Quantum Keynote',
      category: 'keynotes',
      categoryLabel: 'Immersive Keynotes',
      location: 'Pragati Maidan, New Delhi',
      year: '2026',
      summary: 'A 75-meter curved MicroLED monolith and robotic lighting trusses built for India’s Global AI Leadership Conclave hosting 12,000 international delegates.',
      specs: ['Screen Width: 75m Curved MicroLED', 'Pixel Pitch: 0.9mm', 'Audio: 144-Ch Spatial Array', 'Latency: <3.5ms'],
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
      client: 'Ministry of Electronics & IT (MeitY) / Global AI Summit',
      metrics: '12,000 In-Person Leaders // 8.4M Live Broadcast // Zero Latency Feed',
      narrative: 'Syntraxs engineered an optical stage with zero visible rigging lines, immersing Indian and global dignitaries in dynamic 3D generative backdrops driven by real-time speech and policy telemetry.'
    },
    {
      id: 'jio-world-pavilion',
      title: 'Jio World Convention Pavilion',
      category: 'pavilions',
      categoryLabel: 'Architectural Pavilions',
      location: 'BKC, Mumbai, Maharashtra',
      year: '2026',
      summary: '6,500m² cantilevered kinetic architecture housing a 360° holographic dome with real-time biometric climate telemetry for enterprise leaders.',
      specs: ['Footprint: 6,500 m²', 'AV Power: 1.6MW', 'Holo-Projection: 48x 4K Lumens', 'Structural: Indian Tata Steel & Carbon'],
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
      client: 'Reliance Industries / Global Tech Conclave',
      metrics: '550,000+ Attendees // 99.99% Hardware Uptime // Gold National Architecture Award',
      narrative: 'Constructed at Jio World Centre in Bandra-Kurla Complex, this monumental ephemeral pavilion incorporated kinetic lotus-inspired louvers that dynamically adjusted acoustic reverberation to match audience density.'
    },
    {
      id: 'aura-vedic-dome',
      title: 'Aura Vedic Biosphere Dome',
      category: 'installations',
      categoryLabel: 'Spatial Installations',
      location: 'Electronic City, Bengaluru, Karnataka',
      year: '2025',
      summary: 'A living architectural sphere uniting indigenous Western Ghats botanical mosses with generative ambient mist and soundscape arrays reacting to live air quality telemetry.',
      specs: ['Diameter: 32m Geodesic', 'Mist Emitters: 520 Precision Nodes', 'Sound: 72 Parametric Transducers'],
      image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1200&q=80',
      client: 'Infosys Science Foundation / Green Future Summit',
      metrics: '45 Global Tech Delegations // 100% Carbon-Neutral Build // Awwwards SOTD',
      narrative: 'An ethereal bio-responsive structure in Bengaluru that translates carbon absorption metrics into tangible sensory lighting environments, celebrating India’s Vedic ecological ethos with frontier technology.'
    },
    {
      id: 'hitex-coliseum',
      title: 'HITEX Cyber Coliseum Arena',
      category: 'xr',
      categoryLabel: 'XR & Virtual Arenas',
      location: 'HITEC City, Hyderabad, Telangana',
      year: '2025',
      summary: '25,000-seat live esports and AI arena featuring real-time holographic player avatars, synchronized laser scenography, and audience telemetry bands.',
      specs: ['Capacity: 25,000 Seats', 'Holo-Emitters: 160 Ultra-Rate', 'Laser Output: 500W RGB Matrix'],
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80',
      client: 'Telangana Innovation Council & Global Esports',
      metrics: '24M Global Digital Viewers // 25,000 Smart Wristbands // 120 FPS Real-time XR',
      narrative: 'Syntraxs merged physical stadium architecture with augmented reality tracking to render life-sized holographic gaming titans directly on the HITEX Hyderabad arena floor for live spectators.'
    },
    {
      id: 'rajasthan-desert-pavilion',
      title: 'Metamorphosis Royal Desert Retreat',
      category: 'pavilions',
      categoryLabel: 'Architectural Pavilions',
      location: 'Udaipur, Rajasthan',
      year: '2025',
      summary: 'Cantilevered carbon-fiber and electrochromic glass pavilions constructed above desert dunes for an exclusive luxury electric hypercar world premiere.',
      specs: ['Area: 3,200 m²', 'Structure: Cantilevered Carbon & Lightweight Titanium', 'Glass: Solar-Reactive Electrochromic'],
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      client: 'Tata EV Luxury Group / Global Auto Conclave',
      metrics: '400 VIP Delegates // Zero Trace Desert Strike // Architectural Design Trophy',
      narrative: 'Framed against the golden horizons of Rajasthan, Syntraxs engineered self-leveling aerodynamic structures that blended royal heritage stone textures with aerospace-grade carbon fiber.'
    },
    {
      id: 'chennai-chronos',
      title: 'Chronos Chennai Maritime Forum',
      category: 'keynotes',
      categoryLabel: 'Immersive Keynotes',
      location: 'Chennai Trade Centre, Tamil Nadu',
      year: '2024',
      summary: 'Cylindrical 360° translucent OLED matrix chamber delivering maritime and deep-space tech forums with holographic telepresence across the Indian Ocean rim.',
      specs: ['Radius: 22m Ring', 'Panels: 220 Transparent OLED', 'Acoustics: Parametric Beamforming'],
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
      client: 'Indian Space & Maritime Alliance',
      metrics: '82 Naval & Tech Leaders // Zero Acoustic Bleed // Platinum Security Standard',
      narrative: 'A transparent cylindrical council chamber providing real-time spatial telepresence between research ships in the Indian Ocean and world leaders gathered in Chennai.'
    }
  ];

  function renderWorks() {
    const gridContainer = document.getElementById('worksGrid');
    const listContainer = document.getElementById('worksList');
    if (!gridContainer || !listContainer) return;

    const filtered = state.activeFilter === 'all'
      ? projectsData
      : projectsData.filter((p) => p.category === state.activeFilter);

    // Render Grid with 3D Tilt Classes
    gridContainer.innerHTML = filtered.map((p, idx) => `
      <div class="project-card card-3d-tilt" data-id="${p.id}" tabindex="0">
        <div class="project-card-media">
          <img class="project-card-img" src="${p.image}" alt="${p.title}" loading="lazy" />
          <div class="project-card-overlay"></div>
          <span class="project-badge-loc">${p.location}</span>
        </div>
        <div class="project-card-info card-3d-content">
          <span class="project-category">${p.categoryLabel}</span>
          <h3 class="project-title">${p.title}</h3>
          <div class="project-specs-row">
            <span>${p.specs[0]}</span>
            <span>//</span>
            <span>${p.specs[1]}</span>
          </div>
        </div>
      </div>
    `).join('');

    // Render List
    listContainer.innerHTML = filtered.map((p, idx) => `
      <div class="project-list-row" data-id="${p.id}" data-img="${p.image}" tabindex="0">
        <span class="list-idx">${String(idx + 1).padStart(2, '0')}.</span>
        <h3 class="list-title">${p.title}</h3>
        <span class="list-cat">${p.categoryLabel}</span>
        <span class="list-loc">${p.location}</span>
        <span class="list-arrow">→</span>
      </div>
    `).join('');

    // Attach click events
    document.querySelectorAll('.project-card, .project-list-row').forEach((el) => {
      el.addEventListener('click', () => {
        const id = el.getAttribute('data-id');
        openProjectModal(id);
        soundEngine.playClick();
      });
    });

    // Re-initialize 3D tilt on newly rendered cards
    init3DTilt();

    // Floating preview in List view
    const floatingPreview = document.getElementById('floatingPreview');
    const floatingImg = document.getElementById('floatingPreviewImg');

    document.querySelectorAll('.project-list-row').forEach((row) => {
      row.addEventListener('mouseenter', (e) => {
        if (!floatingPreview || !floatingImg) return;
        const imgUrl = row.getAttribute('data-img');
        floatingImg.src = imgUrl;
        floatingPreview.classList.add('active');
      });
      row.addEventListener('mousemove', (e) => {
        if (!floatingPreview) return;
        floatingPreview.style.left = `${e.clientX + 25}px`;
        floatingPreview.style.top = `${e.clientY + 25}px`;
      });
      row.addEventListener('mouseleave', () => {
        if (!floatingPreview) return;
        floatingPreview.classList.remove('active');
      });
    });
  }

  function initWorksFilters() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    filterTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        filterTabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        state.activeFilter = tab.getAttribute('data-filter');
        renderWorks();
        soundEngine.playClick();
      });
    });

    const gridBtn = document.getElementById('viewGridBtn');
    const listBtn = document.getElementById('viewListBtn');
    const gridEl = document.getElementById('worksGrid');
    const listEl = document.getElementById('worksList');

    if (gridBtn && listBtn && gridEl && listEl) {
      gridBtn.addEventListener('click', () => {
        gridBtn.classList.add('active');
        listBtn.classList.remove('active');
        gridEl.style.display = 'grid';
        listEl.style.display = 'none';
        soundEngine.playClick();
      });
      listBtn.addEventListener('click', () => {
        listBtn.classList.add('active');
        gridBtn.classList.remove('active');
        gridEl.style.display = 'none';
        listEl.style.display = 'flex';
        soundEngine.playClick();
      });
    }
  }

  /* ==========================================================================
     07. PROJECT DETAIL MODAL / DRAWER
     ========================================================================== */
  function openProjectModal(id) {
    const project = projectsData.find((p) => p.id === id);
    if (!project) return;

    const modal = document.getElementById('projectModal');
    const body = document.getElementById('projectModalBody');
    if (!modal || !body) return;

    body.innerHTML = `
      <div style="margin-bottom: 2rem;">
        <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--accent-cyan); text-transform: uppercase; letter-spacing: 0.15em;">${project.categoryLabel} // ${project.year}</span>
        <h2 style="font-family: var(--font-display); font-size: clamp(2rem, 4vw, 3rem); font-weight: 800; margin: 0.5rem 0 1rem; text-transform: uppercase;">${project.title}</h2>
        <p style="font-size: 1.15rem; color: var(--text-secondary); line-height: 1.6;">${project.summary}</p>
      </div>

      <div style="position: relative; height: 420px; border-radius: 12px; overflow: hidden; margin-bottom: 2.5rem; border: 1px solid var(--border-accent);">
        <img src="${project.image}" alt="${project.title}" style="width: 100%; height: 100%; object-fit: cover;" />
        <div style="position: absolute; bottom: 1rem; left: 1rem; background: rgba(0,0,0,0.85); padding: 0.6rem 1.2rem; border-radius: 4px; font-family: var(--font-mono); font-size: 0.78rem; color: var(--accent-cyan); border: 1px solid var(--border-subtle);">
          LOCATION: ${project.location} // COMMISSIONED BY: ${project.client}
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1.6fr 1fr; gap: 2.5rem; margin-bottom: 2.5rem;">
        <div>
          <h4 style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 1rem;">Architectural Narrative & Execution</h4>
          <p style="font-size: 1rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 1.5rem;">${project.narrative}</p>
          <div style="background: rgba(0, 229, 255, 0.05); border-left: 3px solid var(--accent-cyan); padding: 1rem 1.25rem; font-family: var(--font-mono); font-size: 0.82rem; color: #fff;">
            ${project.metrics}
          </div>
        </div>
        <div>
          <h4 style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 1rem;">Indian Engineering Blueprints</h4>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.75rem;">
            ${project.specs.map((s) => `
              <li style="padding: 0.65rem 0.85rem; background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: 6px; font-family: var(--font-mono); font-size: 0.78rem; color: var(--text-primary);">
                ▸ ${s}
              </li>
            `).join('')}
          </ul>
        </div>
      </div>

      <div style="display: flex; justify-content: flex-end; gap: 1rem; border-top: 1px solid var(--border-subtle); padding-top: 1.5rem;">
        <button class="btn-primary" onclick="initiateConsultation('${project.title}')">
          <span class="btn-dot"></span> Commission Monument in India
        </button>
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    state.isModalOpen = true;
  }

  window.closeProjectModal = function () {
    const modal = document.getElementById('projectModal');
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
    state.isModalOpen = false;
  };

  /* ==========================================================================
     08. CAPABILITIES ACCORDION & BLUEPRINT SIMULATOR
     ========================================================================== */
  const capabilitiesData = [
    {
      id: 0,
      title: 'Spatial Architecture & Ephemeral Structures',
      desc: 'We conceive and construct monumental temporary structures across Indian cities, cantilevered pavilions, and geodesic domes engineered to strict BIS and global seismic standards.',
      tags: ['Parametric CAD', 'Tata Steel & Carbon Trusses', 'Zero-Footprint Strike', 'Bespoke Enclosures'],
      svgBlueprint: `
        <circle cx="200" cy="160" r="110" stroke="rgba(0, 229, 255, 0.4)" stroke-width="2" fill="none" stroke-dasharray="6,4"/>
        <line x1="90" y1="160" x2="310" y2="160" stroke="#00e5ff" stroke-width="2"/>
        <line x1="200" y1="50" x2="200" y2="270" stroke="#00e5ff" stroke-width="2"/>
        <polygon points="200,80 290,200 110,200" stroke="#0077ff" stroke-width="2" fill="rgba(0, 119, 255, 0.15)"/>
        <circle cx="200" cy="80" r="6" fill="#00e5ff"/>
        <circle cx="290" cy="200" r="6" fill="#00e5ff"/>
        <circle cx="110" cy="200" r="6" fill="#00e5ff"/>
        <text x="200" y="240" fill="#94A3B8" font-family="Space Mono" font-size="11" text-anchor="middle">PRIMARY LOAD TRUSS // SPAN 52.00m (BIS)</text>
      `
    },
    {
      id: 1,
      title: 'Experiential AV & Laser Scenography',
      desc: 'High-precision laser arrays, optical projection mapping up to 32K lumens, and custom acoustic shells tuned for landmark Indian conclaves and arenas.',
      tags: ['Laser Emitters', '3D Spatial Audio', 'Projection Mapping', 'Robotic Rigging'],
      svgBlueprint: `
        <path d="M 50,220 Q 200,80 350,220" stroke="#00e5ff" stroke-width="2" fill="none"/>
        <circle cx="200" cy="80" r="14" fill="#00e5ff" opacity="0.6"/>
        <line x1="200" y1="80" x2="100" y2="220" stroke="rgba(0, 229, 255, 0.3)" stroke-width="1.5" stroke-dasharray="4"/>
        <line x1="200" y1="80" x2="200" y2="220" stroke="rgba(0, 229, 255, 0.5)" stroke-width="1.5"/>
        <line x1="200" y1="80" x2="300" y2="220" stroke="rgba(0, 229, 255, 0.3)" stroke-width="1.5" stroke-dasharray="4"/>
        <rect x="180" y="215" width="40" height="15" fill="#0077ff" rx="4"/>
        <text x="200" y="260" fill="#94A3B8" font-family="Space Mono" font-size="11" text-anchor="middle">VOLUMETRIC FOCAL POINT // 32k LUMENS</text>
      `
    },
    {
      id: 2,
      title: 'Real-Time Generative Environments & XR',
      desc: 'Unreal Engine 5 and TouchDesigner pipelines generating reactive graphics triggered live by speech, biometric sentiment, and spatial gestures for Indian keynotes.',
      tags: ['Unreal Engine 5', 'TouchDesigner', 'Live Motion Capture', 'Generative Shaders'],
      svgBlueprint: `
        <rect x="80" y="60" width="240" height="160" stroke="#00e5ff" stroke-width="1.5" fill="rgba(0, 229, 255, 0.05)" rx="8"/>
        <path d="M 80,140 Q 140,80 200,140 T 320,140" stroke="#0077ff" stroke-width="2" fill="none"/>
        <circle cx="140" cy="110" r="5" fill="#00e5ff"/>
        <circle cx="260" cy="170" r="5" fill="#00e5ff"/>
        <text x="200" y="255" fill="#94A3B8" font-family="Space Mono" font-size="11" text-anchor="middle">REAL-TIME RENDER PIPELINE // 120 FPS</text>
      `
    },
    {
      id: 3,
      title: 'Turnkey Physical-to-Digital Production',
      desc: 'End-to-end pan-India logistical execution: inter-state logistics, precision CNC metal fabrication in Pune and Chennai, and certified structural engineering crews.',
      tags: ['Pan-India Logistics', 'CNC Fabrication', 'Mission Control', 'Turnkey Crew'],
      svgBlueprint: `
        <rect x="70" y="100" width="80" height="80" stroke="#94A3B8" stroke-width="1.5" fill="none"/>
        <rect x="160" y="100" width="80" height="80" stroke="#00e5ff" stroke-width="2" fill="rgba(0,229,255,0.1)"/>
        <rect x="250" y="100" width="80" height="80" stroke="#94A3B8" stroke-width="1.5" fill="none"/>
        <line x1="150" y1="140" x2="160" y2="140" stroke="#00e5ff" stroke-width="2"/>
        <line x1="240" y1="140" x2="250" y2="140" stroke="#00e5ff" stroke-width="2"/>
        <text x="200" y="240" fill="#94A3B8" font-family="Space Mono" font-size="11" text-anchor="middle">TURNKEY CAD PIPELINE // PRECISION ±0.5mm</text>
      `
    },
    {
      id: 4,
      title: 'Intelligent Guest Flow & Spatial Telemetry',
      desc: 'Heatmapping visitor density across mega-venues like Bharat Mandapam and Jio World, optimizing VIP seating velocity, and sponsor dwell time.',
      tags: ['Heatmap Telemetry', 'Queue Velocity', 'Spatial Analytics', 'Live Dashboards'],
      svgBlueprint: `
        <ellipse cx="200" cy="140" rx="130" ry="70" stroke="rgba(0,229,255,0.3)" stroke-width="1" fill="none"/>
        <circle cx="160" cy="130" r="28" fill="rgba(0,229,255,0.2)" stroke="#00e5ff" stroke-width="1.5"/>
        <circle cx="240" cy="145" r="38" fill="rgba(0,119,255,0.3)" stroke="#0077ff" stroke-width="1.5"/>
        <text x="200" y="250" fill="#94A3B8" font-family="Space Mono" font-size="11" text-anchor="middle">SPATIAL FLOW SENSORS // 6,500 GUESTS/HR</text>
      `
    }
  ];

  function initCapabilities() {
    const list = document.getElementById('capabilityList');
    const svgStage = document.getElementById('blueprintStageSvg');
    const hudSpec = document.getElementById('blueprintHudSpec');
    if (!list) return;

    list.innerHTML = capabilitiesData.map((c, idx) => `
      <div class="capability-card card-3d-tilt ${idx === 0 ? 'active' : ''}" data-idx="${idx}">
        <div class="capability-header">
          <div class="capability-num-title">
            <span class="capability-num">0${idx + 1}.</span>
            <h3 class="capability-title">${c.title}</h3>
          </div>
          <span style="font-family: var(--font-mono); font-size: 1.1rem; color: var(--accent-cyan);">+</span>
        </div>
        <div class="capability-body">
          <p class="capability-desc">${c.desc}</p>
          <div class="capability-pills">
            ${c.tags.map((t) => `<span class="cap-pill">${t}</span>`).join('')}
          </div>
        </div>
      </div>
    `).join('');

    function updateBlueprint(idx) {
      const cap = capabilitiesData[idx];
      if (svgStage) svgStage.innerHTML = cap.svgBlueprint;
      if (hudSpec) hudSpec.textContent = `CAD PROTOCOL // ${cap.title.toUpperCase()}`;
    }
    updateBlueprint(0);

    const cards = document.querySelectorAll('.capability-card');
    cards.forEach((card) => {
      card.addEventListener('click', () => {
        const idx = parseInt(card.getAttribute('data-idx'), 10);
        cards.forEach((c) => c.classList.remove('active'));
        card.classList.add('active');
        updateBlueprint(idx);
        soundEngine.playSweep();
      });
    });
  }

  /* ==========================================================================
     09. INDIAN STUDIO HUBS & SYNCHRONIZED CLOCKS (IST UTC+5:30)
     ========================================================================== */
  function initStudioClocks() {
    const studios = [
      { id: 'blr', name: 'Bengaluru (HQ)', state: 'Karnataka' },
      { id: 'bom', name: 'Mumbai', state: 'Maharashtra' },
      { id: 'del', name: 'New Delhi', state: 'NCR' },
      { id: 'hyd', name: 'Hyderabad', state: 'Telangana' },
      { id: 'maa', name: 'Chennai', state: 'Tamil Nadu' },
    ];

    function updateClocks() {
      // Indian Standard Time is UTC + 5:30
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const istDate = new Date(utc + (3600000 * 5.5));

      const hours = String(istDate.getHours()).padStart(2, '0');
      const minutes = String(istDate.getMinutes()).padStart(2, '0');
      const seconds = String(istDate.getSeconds()).padStart(2, '0');
      const timeStr = `${hours}:${minutes}:${seconds} IST`;

      studios.forEach((s) => {
        const el = document.getElementById(`clock-${s.id}`);
        if (el) el.textContent = timeStr;
        const megaEl = document.getElementById(`mega-clock-${s.id}`);
        if (megaEl) megaEl.textContent = timeStr;
      });
    }

    updateClocks();
    setInterval(updateClocks, 1000);
  }

  /* ==========================================================================
     10. FULLSCREEN ARCHITECTURAL MEGA MENU
     ========================================================================== */
  function initMegaMenu() {
    const menuBtn = document.getElementById('menuToggleBtn');
    const megaMenu = document.getElementById('megaMenu');
    if (!menuBtn || !megaMenu) return;

    menuBtn.addEventListener('click', () => {
      state.isMenuOpen = !state.isMenuOpen;
      menuBtn.classList.toggle('open', state.isMenuOpen);
      megaMenu.classList.toggle('active', state.isMenuOpen);
      document.body.style.overflow = state.isMenuOpen ? 'hidden' : '';
      soundEngine.playClick();
    });

    const menuLinks = megaMenu.querySelectorAll('.menu-nav-item');
    menuLinks.forEach((link) => {
      link.addEventListener('click', () => {
        state.isMenuOpen = false;
        menuBtn.classList.remove('open');
        megaMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    const previewImg = document.getElementById('megaMenuPreviewImg');
    const previewTitle = document.getElementById('megaMenuPreviewTitle');
    const previewLoc = document.getElementById('megaMenuPreviewLoc');

    const previewMap = {
      works: { img: projectsData[0].image, title: 'Indian Landmarks', loc: 'New Delhi / Mumbai' },
      capabilities: { img: projectsData[1].image, title: 'Spatial Engineering', loc: 'Pan-India Operations' },
      spotlight: { img: projectsData[2].image, title: 'Theatrical Spotlight Lab', loc: 'Stage Lighting Console' },
      manifesto: { img: projectsData[4].image, title: 'Defining Ambitions', loc: 'National Manifesto' },
      studios: { img: projectsData[5].image, title: 'Indian Studio Network', loc: '5 Metropolitan Hubs' },
      initiate: { img: projectsData[3].image, title: 'Initiate Commission', loc: 'Direct Telemetry' },
    };

    menuLinks.forEach((link) => {
      link.addEventListener('mouseenter', () => {
        const key = link.getAttribute('data-preview');
        if (previewMap[key] && previewImg && previewTitle) {
          previewImg.src = previewMap[key].img;
          previewTitle.textContent = previewMap[key].title;
          if (previewLoc) previewLoc.textContent = previewMap[key].loc;
        }
      });
    });
  }

  /* ==========================================================================
     11. METRICS COUNTER ANIMATION
     ========================================================================== */
  function animateMetrics() {
    const metrics = document.querySelectorAll('.metric-number');
    metrics.forEach((m) => {
      const target = parseFloat(m.getAttribute('data-target'));
      const suffix = m.getAttribute('data-suffix') || '';
      let current = 0;
      const step = target / 50;

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
          m.innerHTML = `${target % 1 === 0 ? target : target.toFixed(1)}<span>${suffix}</span>`;
        } else {
          m.innerHTML = `${target % 1 === 0 ? Math.floor(current) : current.toFixed(1)}<span>${suffix}</span>`;
        }
      }, 30);
    });
  }

  /* ==========================================================================
     12. INDIAN PROJECT CONFIGURATOR (IN RUPEES ₹ CRORES)
     ========================================================================== */
  const configSelections = {
    dimension: 'Architectural Pavilion',
    scale: 'Enterprise (1,000 - 5,000m²)',
    tech: ['Kinetic Trusses', '360° Holo-Projection']
  };

  function initConfigurator() {
    const dimBtns = document.querySelectorAll('[data-config-group="dimension"]');
    dimBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        dimBtns.forEach((b) => b.classList.remove('selected'));
        btn.classList.add('selected');
        configSelections.dimension = btn.textContent.trim();
        updateEstimate();
        soundEngine.playClick();
      });
    });

    const scaleBtns = document.querySelectorAll('[data-config-group="scale"]');
    scaleBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        scaleBtns.forEach((b) => b.classList.remove('selected'));
        btn.classList.add('selected');
        configSelections.scale = btn.textContent.trim();
        updateEstimate();
        soundEngine.playClick();
      });
    });

    const techBtns = document.querySelectorAll('[data-config-group="tech"]');
    techBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        btn.classList.toggle('selected');
        const text = btn.textContent.trim();
        if (btn.classList.contains('selected')) {
          if (!configSelections.tech.includes(text)) configSelections.tech.push(text);
        } else {
          configSelections.tech = configSelections.tech.filter((t) => t !== text);
        }
        updateEstimate();
        soundEngine.playClick();
      });
    });

    const form = document.getElementById('configForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        soundEngine.playChime();
        alert(`[SYNTRAXS INDIA DIRECTIVE RECEIVED]\n\nScope: ${configSelections.dimension}\nScale: ${configSelections.scale}\nTech: ${configSelections.tech.join(', ')}\n\nOur Executive Partner for India will connect via encrypted WhatsApp / Email within 4 hours.`);
        form.reset();
      });
    }

    function updateEstimate() {
      const costEl = document.getElementById('estimateCost');
      const timeEl = document.getElementById('estimateTime');
      if (!costEl || !timeEl) return;

      // Values in Crores INR
      let baseCrores = 2.4; 
      let weeks = 12;

      if (configSelections.scale.includes('Enterprise')) {
        baseCrores = 5.8;
        weeks = 18;
      } else if (configSelections.scale.includes('Monumental')) {
        baseCrores = 14.5;
        weeks = 26;
      }

      baseCrores += configSelections.tech.length * 0.75;

      costEl.textContent = `₹${baseCrores.toFixed(2)} Crores INR`;
      timeEl.textContent = `${weeks} - ${weeks + 4} WEEKS`;
    }
    updateEstimate();
  }

  window.initiateConsultation = function (projectTitle) {
    closeProjectModal();
    const configSec = document.getElementById('initiate');
    if (configSec) {
      configSec.scrollIntoView({ behavior: 'smooth' });
      const briefInput = document.getElementById('configBrief');
      if (briefInput) {
        briefInput.value = `Inquiry regarding landmark architecture build inspired by: ${projectTitle}`;
        briefInput.focus();
      }
    }
  };

  /* ==========================================================================
     13. HEADER SCROLL & KINETIC TEXT HIGHLIGHTING
     ========================================================================== */
  function initScrollTriggers() {
    const header = document.getElementById('siteHeader');

    window.addEventListener('scroll', () => {
      if (window.scrollY > 80) {
        if (header) header.classList.add('scrolled');
      } else {
        if (header) header.classList.remove('scrolled');
      }

      const words = document.querySelectorAll('.manifesto-word');
      words.forEach((word) => {
        const rect = word.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.75 && rect.bottom > 0) {
          word.classList.add('highlighted');
        } else {
          word.classList.remove('highlighted');
        }
      });
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (state.isModalOpen) closeProjectModal();
      if (state.isMenuOpen) {
        const menuBtn = document.getElementById('menuToggleBtn');
        const megaMenu = document.getElementById('megaMenu');
        if (menuBtn && megaMenu) {
          state.isMenuOpen = false;
          menuBtn.classList.remove('open');
          megaMenu.classList.remove('active');
          document.body.style.overflow = '';
        }
      }
    }
  });

  /* ==========================================================================
     BOOTSTRAP ON DOM READY
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initSoundToggle();
    init3DTilt();
    initWorksFilters();
    renderWorks();
    initCapabilities();
    initStudioClocks();
    initMegaMenu();
    initConfigurator();
    initScrollTriggers();
  });
})();
