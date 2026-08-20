// Hero background: a drifting node-network, a nod to pattern recognition & neural graphs.
(function(){
  var canvas = document.getElementById('hero-canvas');
  if(!canvas || typeof THREE === 'undefined') return;

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.set(0, 0, 13);

  var group = new THREE.Group();
  scene.add(group);

  var NODE_COUNT = window.innerWidth < 760 ? 34 : 60;
  var RADIUS = 7.6;
  var nodes = [];

  for(var i = 0; i < NODE_COUNT; i++){
    var v = new THREE.Vector3(
      (Math.random() - 0.5) * RADIUS * 2.1,
      (Math.random() - 0.5) * RADIUS * 1.3,
      (Math.random() - 0.5) * 4.2
    );
    nodes.push({
      pos: v,
      base: v.clone(),
      speed: 0.15 + Math.random() * 0.25,
      offset: Math.random() * Math.PI * 2
    });
  }

  // Points (nodes)
  var pointGeo = new THREE.BufferGeometry();
  var positions = new Float32Array(NODE_COUNT * 3);
  nodes.forEach(function(n, i){
    positions[i*3] = n.pos.x; positions[i*3+1] = n.pos.y; positions[i*3+2] = n.pos.z;
  });
  pointGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  var pointMat = new THREE.PointsMaterial({
    color: 0x3fab8c,
    size: 0.09,
    transparent: true,
    opacity: 0.9,
    sizeAttenuation: true
  });
  var points = new THREE.Points(pointGeo, pointMat);
  group.add(points);

  // Lines (edges) — connect nodes within a distance threshold, recomputed occasionally
  var lineGeo = new THREE.BufferGeometry();
  var lineMat = new THREE.LineBasicMaterial({ color: 0x2c6e5c, transparent: true, opacity: 0.35 });
  var lineSegments = new THREE.LineSegments(lineGeo, lineMat);
  group.add(lineSegments);

  var MAX_DIST = 3.1;

  function rebuildEdges(){
    var verts = [];
    for(var i = 0; i < nodes.length; i++){
      for(var j = i+1; j < nodes.length; j++){
        var d = nodes[i].pos.distanceTo(nodes[j].pos);
        if(d < MAX_DIST){
          verts.push(nodes[i].pos.x, nodes[i].pos.y, nodes[i].pos.z);
          verts.push(nodes[j].pos.x, nodes[j].pos.y, nodes[j].pos.z);
        }
      }
    }
    lineGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(verts), 3));
    lineGeo.attributes.position.needsUpdate = true;
  }
  rebuildEdges();

  // Mouse parallax
  var mouse = { x: 0, y: 0 };
  window.addEventListener('mousemove', function(e){
    mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  function resize(){
    var parent = canvas.parentElement;
    var w = parent.clientWidth, h = parent.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);
  resize();

  var clock = new THREE.Clock();
  var edgeTimer = 0;

  function animate(){
    var t = clock.getElapsedTime();

    if(!reduceMotion){
      nodes.forEach(function(n){
        n.pos.x = n.base.x + Math.sin(t * n.speed + n.offset) * 0.35;
        n.pos.y = n.base.y + Math.cos(t * n.speed * 0.8 + n.offset) * 0.35;
      });
      var posAttr = pointGeo.attributes.position;
      nodes.forEach(function(n, i){
        posAttr.array[i*3] = n.pos.x;
        posAttr.array[i*3+1] = n.pos.y;
        posAttr.array[i*3+2] = n.pos.z;
      });
      posAttr.needsUpdate = true;

      edgeTimer += clock.getDelta();
      if(edgeTimer > 0.12){ rebuildEdges(); edgeTimer = 0; }

      group.rotation.y = mouse.x * 0.12;
      group.rotation.x = mouse.y * -0.06;
    }

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();
})();
