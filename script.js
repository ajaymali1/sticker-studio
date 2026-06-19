
function openPopup(image, name, like, price) {
  document.getElementById("popup-img").src = image;
  document.getElementById("popup-name").textContent = name;
  document.getElementById("popup-like").textContent = like;
  document.getElementById("popup-price").textContent = price;
  document.getElementById("popup").style.display = "flex";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.classList.toggle("show");

  if (menu.classList.contains("show")) {
    document.addEventListener("click", closeMenuOutside);
  } else {
    document.removeEventListener("click", closeMenuOutside);
  }
}






function closeMenuOutside(event) {
  const menu = document.getElementById("menu");
  const toggle = document.querySelector(".menu-toggle");

  
  if (!menu.contains(event.target) && !toggle.contains(event.target)) {
    menu.classList.remove("show");
    document.removeEventListener("click", closeMenuOutside);
  }
}


// CARD // CARD// CARD

function isValidEmail(email) {
  // Basic email format check
  let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}



function clearEmail(event) {
  
  event.preventDefault();

  let emailField = document.getElementById("emailInput");
  let button = document.getElementById("submitBtn");
   let errorMsg = document.getElementById("errorMsg");

    if (!isValidEmail(emailField.value)) {
    errorMsg.textContent = " Please enter a valid email address.";
   

    return; 
  }

   errorMsg.textContent = "✅ Thanks for Subscribing";
   errorMsg.classList.add("success-msg");
   

   
  emailField.value = "";

  
   button.textContent = " ✓ "  ;
   button.classList.add("checkmark");

  button.style.background = "green";
}



// Sign In PopUp
function toggleMenu(){
  document.getElementById('menu').classList.toggle('show');
}

function loadUsers(){
  try{ return JSON.parse(localStorage.getItem('ss_users') || '{}'); }
  catch{ return {}; }
}
function saveUsers(map){ localStorage.setItem('ss_users', JSON.stringify(map)); }

const overlay   = document.getElementById('overlay');
const card      = document.getElementById('card');
const openBtn   = document.getElementById('open');
const form      = document.getElementById('form');
const emailEl   = document.getElementById('email');
const passEl    = document.getElementById('password');
const confirmEl = document.getElementById('confirm');
const confirmWrap = document.getElementById('confirm-wrap');
const msgEl     = document.getElementById('formMessage');
const noteEl    = document.getElementById('signupNote');
const submitBtn = document.getElementById('submitBtn');
const toggleText= document.getElementById('toggleText');
const toggleLink= document.getElementById('toggleLink');
const titleEl   = document.getElementById('dlg-title');

let mode = 'signin';

function showOverlay(){
  overlay.classList.add('show');
  requestAnimationFrame(()=>card.classList.add('active'));
  setTimeout(()=>emailEl.focus(), 120);
}
function hideOverlay(){
  card.classList.remove('active');
  setTimeout(()=>overlay.classList.remove('show'), 200);
  form.reset();
  clearMessage();
}
function setMode(next){
  mode = next;
  titleEl.textContent = next === 'signin' ? 'Sign In' : 'Sign Up';
  submitBtn.textContent = next === 'signin' ? 'Sign In' : 'Create Account';
  toggleText.textContent = next === 'signin' ? 'Don’t have an account?' : 'Already have an account?';
  toggleLink.textContent = next === 'signin' ? 'Sign Up' : 'Sign In';
  confirmWrap.style.display = next === 'signup' ? 'flex' : 'none';
  noteEl.classList.toggle('show', next === 'signup');
  form.reset();
  clearMessage();
}
function showMessage(text, type='error'){
  msgEl.textContent = text;
  msgEl.className = 'message ' + (type === 'success' ? 'success' : 'error');
}
function clearMessage(){
  msgEl.textContent = '';
  msgEl.className = 'message';
}
function validEmail(v){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

openBtn.addEventListener('click', ()=>{ setMode('signin'); showOverlay(); });
overlay.addEventListener('click', (e)=>{ if(e.target === overlay) hideOverlay(); });
document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape' && overlay.classList.contains('show')) hideOverlay(); });
toggleLink.addEventListener('click', ()=>{ setMode(mode === 'signin' ? 'signup' : 'signin'); });
submitBtn.addEventListener('click', handleSubmit);
form.addEventListener('submit', (e)=>{ e.preventDefault(); handleSubmit(); });

function handleSubmit(){
  clearMessage();
  const email = (emailEl.value || '').trim().toLowerCase();
  const pass  = (passEl.value || '').trim();
  const users = loadUsers();

  if(!email || !pass) return showMessage('Please fill in all fields.');
  if(!validEmail(email)) return showMessage('Enter a valid email address.');

  if(mode === 'signup'){
    const confirm = (confirmEl.value || '').trim();
    if(pass.length < 6) return showMessage('Password must be at least 6 characters.');
    if(confirm !== pass) return showMessage('Passwords do not match.');
    if(users[email]) return showMessage('An account with this email already exists.');
    users[email] = { password: pass, createdAt: Date.now() };
    saveUsers(users);
    showMessage('Account created. You can sign in now.', 'success');
    setTimeout(()=> setMode('signin'), 700);
    return;
  }
  if(!users[email]) return showMessage('No account found for this email. Please sign up.');
  if(users[email].password !== pass) return showMessage('Incorrect password.');
  showMessage('Signed in successfully!', 'success');
  setTimeout(()=> hideOverlay(), 600);
}


