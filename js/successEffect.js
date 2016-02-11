var ps, animate;
function ParticleSystem() 
{
	this.imgd = null;
	this.ctx = null;
	this.pix = null;
	this.width = 0;
	this.height = 0;
	
	this.x0;
	this.y0;
	this.x1;
	this.y1;
	
	this.n = 0;
	this.particles = [];
	this.gravity = 0;

	  this.init = function(ctx, n, x0, y0, x1, y1, cx, cy, w, h) {
		this.ctx = ctx;
		this.width = w;
		this.height = h;
		this.cx = cx;
		this.cy = cy;
		
		this.imgd = this.ctx.getImageData(cx, cy, this.width, this.height);
		this.pix = this.imgd.data;
		this.n = n; 
		
		this.x0 = x0; this.y0 = y0;
		this.x1 = x1; this.y1 = y1;
		this.gravity = 0;
		for (var i = 0; i < this.n; i++) {
			this.particles.push(new Particle(this.pix, this.width));
			this.particles[i].setValues(Math.floor(Math.random() * this.x1) + this.x0, Math.floor(Math.random() * this.y1) + this.y0, 0, 1);
		}
              	this.invisible();
          }

	this.invisible = function () {
		for (var i = 0; i < this.height; i++) {
			for (var j = 0; j < this.width; j++) {
			  var idx = (i * this.width + j) * 4;
			  	this.pix[idx + 3] = 0;
			}
		}
		this.ctx.putImageData(this.imgd, this.cx, this.cy);
      	}
      	
      	this.setParticlesColor = function(color) {
              for (var i = 0; i < this.particles.length; i++) this.particles[i].setColor(color);
          }

          this.update = function() {
              for (var i = 0; i < this.particles.length; i++) {
                  if (this.particles[i].time < this.particles[i].life) {
                      this.particles[i].x = this.particles[i].x + (Math.floor(Math.random() * 3) - 1);
                      this.particles[i].y = this.particles[i].y + this.particles[i].vy;
                      this.particles[i].time += 1;
                  }
                  else {
                      this.particles[i].setValues(Math.floor(Math.random() * this.x1) + this.x0, Math.floor(Math.random() * this.y1) + this.y0, 0, 1);
                  }
              }
          }

          this.render = function() {
              for (var i = 0; i < this.particles.length; i++) { this.particles[i].render(); }
              this.ctx.putImageData(this.imgd, this.cx, this.cy);
          }
      }
      
      function Particle(pix, width) {
          this.x = 0;
          this.y = 0;

          this.vx = 0;
          this.vy = 0;

          this.r = 5;

          this.time = 1;
          this.life = 0;
          
          this.setValues = function(x, y, vx, vy) {
              this.x = x; this.y = y;
              this.vx = vx; this.vy = vy;
              this.time = 0;
              this.life = Math.floor(Math.random() * 500);
          }

          this.setColor = function(color) {
              this.color = color;
          }

          this.render = function() {
              for (var i = -this.r; i <= this.r; i++) {
                  for (var j = -this.r; j <= this.r; j++) {
                      var idx = (Math.floor(this.y + i) * width + Math.floor(this.x + j)) * 4;
                      if (idx >= 0 && idx < pix.length && this.r * this.r > i * i + j * j) {
                          pix[idx + 3] = Math.min(255, pix[idx + 3] + 8);
                      }
                  }
              }
          }
      }
