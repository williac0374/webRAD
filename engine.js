//misc
master_alpha = 1;timeShift=0,FPS=[],fps=0,run=true,fullscreen=false;
// math:
max = Math.max, min = Math.min, round = Math.round, floor = Math.floor, ceil = Math.ceil,
sin = Math.sin, cos = Math.cos, sqrt = Math.sqrt, tan = Math.tan, rand = Math.random,
arccos = Math.acos, arcsin = Math.asin, arctan = Math.atan, arctan2 = Math.atan2,
tu_r2d = -180 / Math.PI, tu_d2r = Math.PI / -180, tu_2pi = Math.PI * 2,
// i/o constants:
vk_0 = 48, vk_1 = 49, vk_2 = 50, vk_3 = 51, vk_4 = 52, vk_5 = 53, vk_6 = 54,
vk_7 = 55, vk_8 = 56, vk_9 = 57, vk_a = 65, vk_add = 107, vk_alt = 18, vk_b = 66,
vk_backspace = 8, vk_c = 67, vk_ctrl = 17, vk_d = 68, vk_decimal = 110, vk_delete = 46,
vk_divide = 111, vk_down = 40, vk_e = 69, vk_end = 35, vk_enter = 13, vk_escape = 27,
vk_f1 = 112, vk_f2 = 113, vk_f3 = 114, vk_f4 = 115, vk_f5 = 116, vk_f6 = 117,
vk_f7 = 118, vk_f8 = 119, vk_f9 = 120, vk_f10 = 121, vk_f11 = 122, vk_f12 = 123,
vk_g = 71, vk_h = 72, vk_home = 36, vk_f = 70, vk_i = 73, vk_insert = 45, vk_j = 74, vk_k = 75,
vk_l = 76, vk_left = 37, vk_m = 77, vk_multiply = 106, vk_n = 78, vk_num0 = 96, vk_num1 = 97,
vk_num2 = 98, vk_num3 = 99, vk_num4 = 100, vk_num5 = 101, vk_num6 = 102, vk_num7 = 103,
vk_num8 = 104, vk_num9 = 105, vk_o = 79, vk_p = 80, vk_pagedown = 34, vk_pageup = 33,
vk_pause = 19, vk_q = 81, vk_r = 82, vk_right = 39, vk_s = 83, vk_shift = 16, vk_space = 32,
vk_subtract = 109, vk_t = 84, vk_tab = 9, vk_u = 85, vk_up = 38, vk_v = 86, vk_w = 87,
vk_x = 88, vk_y = 89, vk_z = 90,
// i/o variables:
mouse_x = mouse_y = 0, mouse_down = mouse_pressed = mouse_released = false,wheelDir=0,
key_down = [], key_pressed = [], key_released = [],all_keys_pressed = [],all_keys_released = [];
function make_sound(_src,buffers){
  if (_src != '') {
    let temp = [];
    for(let i = 0; i < buffers; i++ ){
      temp[i] = document.createElement('audio');
      temp[i].setAttribute('src', _src);
    }
    return temp;
  }
}
function play(sound){
  //.duration > 0 && ! .paused means its playing
  for(let i = 0 ; i < sound.length ; i++){
    if(sound[i].duration > 0 && !sound[i].paused){
    }else{
      sound[i].currentTime = 0;
      sound[i].play()
      i=1000;
    }
  }
}
//request full screen
function requestFullscreen(element) {if (!element) {element = document.documentElement;}if (element.requestFullscreen) {element.requestFullscreen();} else if (element.webkitRequestFullscreen) {element.webkitRequestFullscreen();} else if (element.msRequestFullscreen) {element.msRequestFullscreen();} else if (element.mozRequestFullScreen) {element.mozRequestFullScreen();} else {console.error("Fullscreen API is not supported on this browser.");}}
// detects fullscreen change
document.addEventListener('fullscreenchange', function() {
if (document.fullscreenElement) {
  fullscreen=true;
} else {
  fullscreen=false;
}
 
});

// draw text:
function draw_text(x, y, text, size) {
  ctx.globalAlpha =master_alpha;
if(size==null){size=24}
  ctx.font = size+"px Helvetica";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText(text, x, y);
}
function draw_centered_text(x, y, text, size) {
  ctx.globalAlpha =master_alpha;
if(size==null){size=24}
  ctx.font = size+"px Helvetica";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, x, y);
}
function draw_set_image(file){
  let temp = new Image();
  temp.src = file;
  return temp;
}
function draw_image(img,x,y,w,h,rot,ox,oy){
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  ctx.globalAlpha =master_alpha;
  if(rot!=null){
    ctx.save();
    ctx.translate(x+ox,y+oy);
    ctx.rotate(rot*Math.PI/180);//tu_r2d = -180 / Math.PI, tu_d2r = Math.PI / -180
    ctx.drawImage(img,-ox,-oy,w,h);
    ctx.restore()
  }else{
    ctx.drawImage(img, x, y, w, h);
  }
}
// draw shapes:
function draw_rectangle(x, y, w, h,outline,rot,ox,oy) {
  ctx.globalAlpha =master_alpha;
  if(rot!=null){
    ctx.save();
    ctx.translate(x+ox,y+oy);
    ctx.rotate(rot*Math.PI/180);
    ctx.beginPath();
    if (outline) ctx.strokeRect( -ox,-oy,w,h);
    else ctx.fillRect( -ox,-oy,w,h );
    ctx.closePath();
    ctx.restore()
  }else{
    ctx.beginPath();
    if (outline) ctx.strokeRect( x,y,w,h);
    else ctx.fillRect( x,y,w,h );
    ctx.closePath()
  }
}
function draw_circle(x, y, r, outline) {
  ctx.globalAlpha =master_alpha;
  ctx.beginPath();
  ctx.arc( x,y,r, 0, tu_2pi, true );
  ctx.closePath();
  !outline ? ctx.fill() : ctx.stroke();
}

function draw_line(x1, y1, x2, y2) {
  ctx.globalAlpha =master_alpha;
  ctx.beginPath();
  ctx.moveTo( x1, y1);
  ctx.lineTo( x2, y2);
  ctx.closePath();
  ctx.stroke();
}
// draw settings:
function draw_set_alpha(_alpha) {
  master_alpha = _alpha;
}
function draw_set_color(r,g,b) {
  //"rgb(155, 102, 102)";
  ctx.fillStyle = "rgb("+r+","+g+","+b+")";
  ctx.strokeStyle = "rgb("+r+","+g+","+b+")";
}
function draw_set_linewidth(width) { ctx.lineWidth = width; }
function draw_set_linedash(dash) { ctx.setLineDash(dash); }
function show_mouse() { canvas.style.cursor = "default"; }
function hide_mouse() { canvas.style.cursor = "none"; }
// minimal math:
function average(nums){let output = 0;for(let i = 0; i < nums.length; i++){output+=nums[i]}return floor(output/nums.length)}
function abs(_value) { return _value < 0 ? -_value : _value; }
function sign(_value) { return _value > 0 ? 1 : _value < 0 ? -1 : 0; }
function choose() { return arguments[~~(Math.random() * arguments.length)]; }
function random(_value) { return Math.random() * _value; }
function floor(_value) { return Math.floor(_value); }
function irandom(_value) { return ~~(Math.random() * _value + 1); }
// trig functions:
function lengthdir_x(_length, _direction) { return _length * Math.cos(_direction * tu_d2r); }
function lengthdir_y(_length, _direction) { return _length * Math.sin(_direction * tu_d2r); }
function point_distance(_x1, _y1, _x2, _y2) { return Math.sqrt(Math.pow(( _x1 - _x2), 2) + Math.pow((_y1 - _y2), 2)); }
function point_direction(_x1, _y1, _x2, _y2) { return Math.atan2(_y2 - _y1, _x2 - _x1) * tu_r2d; }
function degtorad(_degree) { return _degree * tu_d2r; }
function radtodeg(_degree) { return _degree * tu_r2d; }
// keyboard functions:
function keyboard_check(_key) { return key_down[_key]; }
function keyboard_check_pressed(_key) { return key_pressed[_key]; }
function keyboard_check_released(_key) { return key_released[_key]; }
// mouse functions:
function mouse_check() { return mouse_down; }
function mouse_check_pressed() { return mouse_pressed; }
function mouse_check_released() { return mouse_released; }
//sets up canvas variables
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
function kDown(e){
  if(e.repeat){
    return;
  }
  var keyCode = e.keyCode;
  if (!key_down[keyCode]) {
    key_pressed[keyCode] = true;
    all_keys_pressed.push(keyCode);
  }
  key_down[keyCode] = true;
}
function kUp(e){
  var keyCode = e.keyCode;
  if (key_down[keyCode])
  {
    key_released[keyCode] = true;
    all_keys_released.push(keyCode);
  }
  key_down[keyCode] = false;
}
function mDown(){
  if (!mouse_down) {
    mouse_down = true;
    mouse_pressed = true;
  }else{
    mouse_down = true;
  }
}
function mUp(){
  if (!mouse_down) {
    mouse_down = false;
    mouse_pressed = false;
  }
  else{
    mouse_down = false;
    mouse_released = true;
  }
}
function mMove(e) {
  if (e.pageX != undefined && e.pageY != undefined) {
    mouse_x = e.pageX;
    mouse_y = e.pageY;
  } else {
    mouse_x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    mouse_y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }
  mouse_x -= canvas.offsetLeft;
  mouse_y -= canvas.offsetTop;
};
if(navigator.userAgent.includes("Android")){
  addEventListener("touchstart", function(e){
    var touch = e.touches[0];
    mouse_x = touch.clientX - canvas.offsetLeft;
    mouse_y = touch.clientY - canvas.offsetTop;
    if (!mouse_down) {
      mouse_down = true;
      mouse_pressed = true;
    }else{
      mouse_down = true;
    }
  });
  addEventListener("touchmove", function(e){
    var touch = e.touches[0];
    if(mouse_down==true){
      mouse_x = touch.clientX - canvas.offsetLeft;
      mouse_y = touch.clientY - canvas.offsetTop;
    }
  });
  addEventListener("touchend", function(e){
    if (!mouse_down) {
      mouse_down = false;
      mouse_pressed = false;
    }
    else{
      mouse_down = false;
      mouse_released = true;
    }
  });
}
addEventListener("keydown", kDown, false);//16 is shift e.keyCode;
addEventListener("keyup", kUp, false);
addEventListener("mousedown",mDown,false);
addEventListener("mouseup",mUp,false);
addEventListener("mousemove",mMove,false);
addEventListener('wheel', wheel,false);
function wheel(e) {
  if (e.deltaY < 0) {
    wheelDir++;
  } else {
    wheelDir--;
  }
};
// The main game loop
function main() {
  var now = Date.now();
  var delta = now - then;
  timeShift = delta / 1000
  FPS.push(Math.floor(1/timeShift));
  if(FPS.length>10){
    fps = average(FPS);
    FPS = [];
  }
  if(run){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw();
  }
    loop();

  //clears keypresses and mousepress
  for (let _k = 0; _k < all_keys_pressed.length; _k++) key_pressed[all_keys_pressed[_k]] = false;
  for (let _k = 0; _k < all_keys_released.length; _k++) key_released[all_keys_released[_k]] = false;
  all_keys_pressed = []; all_keys_released = [];mouse_pressed = false;mouse_released = false;
  
  then = now;
  // Request to do this again ASAP
  requestAnimationFrame(main);
};
// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
// Let's play this game!
var then = Date.now();
start();
main();
