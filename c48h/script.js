Math.degToRad = (degrees) => degrees * (Math.PI / 180);

class Scene {
  constructor(urls) {
    this._urls = urls;
  }

  init() {
    return new Promise((resolve) => {
      let models = [];
      const manager = new THREE.LoadingManager(() => {
        this.setupCanvas(models);
        resolve();
      });
      const loader = new THREE.GLTFLoader(manager);
      this._urls.forEach((x) =>
        loader.load(x.url, (gltf) => {
          gltf.scene.visible = x.visible;
          models.push({ id: x.id, scene: gltf.scene });
        })
      );
    });
  }
  setupCanvas(models) {
    // Camera
    this.camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 1, 30000);
    this.camera.position.set(0, 0, 4000);

    // Scene
    this.scene = new THREE.Scene();

    // Renderer
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.setPixelRatio(window.devicePixelRatio);

    // Light
    const ambientLight = new THREE.AmbientLight(0x111111);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(2, 0, 1).normalize();
    this.scene.add(directionalLight);

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('./assets/background.jpeg', (bgTexture) => {
      this.scene.background = bgTexture;
    });

    models.forEach((x) => {
      this[x.id] = x.scene;
      this.scene.add(this[x.id]);
    });

    document.body.appendChild(this.renderer.domElement);

    this.render();
    this.animate();

    window.addEventListener(
      'resize',
      () => {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.render();
      },
      false
    );
  }
  animate() {
    this.render();
    requestAnimationFrame(() => this.animate());
  }
  render() {
    this.renderer.render(this.scene, this.camera);
  }
}

class Page {
  constructor(scene) {
    this._scene = scene;
  }

  get mars() {
    return this._scene.mars;
  }

  get camera() {
    return this._scene.camera;
  }

  get content() {
    return [
      {
        title: 'La Pyramide Elysium',
        coords: {
          jASON: 'BG',
          '': '',
        },
        selector: '.olympus',
      },
      {
        title: 'Le Visage Cydonia',
        coords: {
          Latitude: '136.783441',
          Longitude: '-5.10837943',
        },
        selector: '.curiosity',
      },
      {
        title: 'Le Mont Olympe',
        coords: {
          Latitude: '-14.00586857',
          Longitude: '-58.5876741',
        },
        selector: '.valles',
      },
    ];
  }

  async init() {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
    await this._scene.init();
    document.querySelector('.loader').style.display = 'none';
    this.setupPlugins();
    this.setupAnimScrollTrigger();
    this.setupContentScrollTrigger();
  }

  setupPlugins() {
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(TextPlugin);
    gsap.registerPlugin(DrawSVGPlugin);
  }

  setupAnimScrollTrigger() {
    const opening = new gsap.timeline()
      .fromTo(this.camera.position, { z: 2000 }, { z: 4000, ease: 'Circ.easeOut', duration: 1.5 }, 'opening')
      .fromTo(
        this.camera.rotation,
        { y: -Math.degToRad(30), x: -Math.degToRad(-5) },
        { y: 0, x: 0, ease: 'Circ.easeOut', duration: 1.5 },
        'opening'
      )
      .set('.scroller, .watermark', { visibility: 'visible' });

    const rotation = new gsap.timeline({
      scrollTrigger: {
        toggleActions: 'play pause play pause',
        trigger: '.welcome',
        start: 'top bottom',
        end: 'top -1',
      },
    }).to(this.mars.rotation, { y: Math.degToRad(360), ease: 'none', repeat: -1, duration: 30 });

    const animation = new gsap.timeline({
      scrollTrigger: {
        trigger: '.content',
        scrub: true,
        start: 'top bottom',
        end: 'bottom bottom',
        //markers: {startColor: "green", endColor: "red", fontSize: "12px"}
      },
    })
      .set('.nav svg, .circle svg', { visibility: 'visible' })
      .to(
        this.mars.rotation,
        {
          y: Math.degToRad(38.9018577),
          x: Math.degToRad(0.337587),
          ease: 'power2.inOut',
          duration: 0.75,
        },
        0
      )
      .to(this.camera.position, { z: 3000, ease: 'linear', duration: 0.75 }, 0)
      .set('.scroller', { visibility: 'hidden' }, 0.2)
      .to(
        this.mars.rotation,
        {
          y: -Math.degToRad(136.78344100200877 - 90),
          x: Math.degToRad(5.1083794384352),
          ease: 'power2.inOut',
          duration: 0.75,
        },
        1
      )
      .to(
        this.mars.rotation,
        { y: Math.degToRad(58.5876741 + 90), x: Math.degToRad(-14.00586857), ease: 'power2.inOut', duration: 0.75 },
        2
      );
  }

  setupContentScrollTrigger() {
    const onUpdate = function () {
      const target = this.targets()[0];
      const time = this.time();
      const duration = this.duration();

      if (time >= duration || time <= 0) {
        target.classList.remove('editing');
        return;
      }
      if (!target.classList.contains('editing')) {
        target.classList.add('editing');
      }
    };

    const getLines = (obj) => {
      const lines = [];
      Object.keys(obj).forEach((x) => {
        lines.push(`${x}: ${obj[x]}`);
      });
      return lines;
    };

    ScrollTrigger.addEventListener('scrollEnd', function (e) {
      const target = document.querySelectorAll('.editing')[0];
      if (target) {
        target.classList.add('blink');
      }
    });

    ScrollTrigger.addEventListener('scrollStart', function (e) {
      const target = document.querySelectorAll('.editing')[0];
      if (target) {
        target.classList.remove('blink');
      }
    });

    this.content.forEach((item, i, arr) => {
      const timeline = new gsap.timeline({
        scrollTrigger: {
          trigger: item.selector,
          scrub: true,
          start: 'top 75%',
          end: `bottom ${i < arr.length - 1 ? '75%' : 'bottom'}`,
          // markers: { startColor: 'green', endColor: 'red', fontSize: '12px' },
        },
      })
        .to(`${item.selector} .title`, { text: `${item.title}`, ease: 'linear', duration: 0.25, onUpdate }, 0)
        .to(
          `${item.selector} .lat`,
          { text: `${getLines(item.coords)[0]}`, ease: 'linear', duration: 0.125, onUpdate },
          0.25
        )
        .to(
          `${item.selector} .lon`,
          { text: `${getLines(item.coords)[1]}`, ease: 'linear', duration: 0.125, onUpdate },
          0.375
        )
        .fromTo(`${item.selector} polyline`, { drawSVG: 0 }, { drawSVG: '100%', duration: 0.125 }, 0.5)
        .fromTo('#circle', { drawSVG: 0 }, { drawSVG: '100%', duration: 0.125 }, 0.625)
        .set(`${item.selector} .image-container`, { visibility: 'visible' })
        .fromTo(`${item.selector} .image-container`, { width: '0%' }, { width: '25vw', duration: 0.125 }, 0.75)
        .fromTo(`${item.selector} .image-container`, { height: '0%' }, { height: 'auto', duration: 0.125 }, 0.875);

      if (i < arr.length - 1) {
        timeline.yoyo(true).repeat(1).repeatDelay(0.5);
      }
    });
  }
}

const urls = [
  {
    id: 'mars',
    url: 'https://assets.codepen.io/1443237/Mars_1_6792.glb',
    visible: true,
  },
];

new Page(new Scene(urls)).init();
