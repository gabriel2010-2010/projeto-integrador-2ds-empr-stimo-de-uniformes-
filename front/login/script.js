const loginForm = document.querySelector('#login-form');
const identifierInput = document.querySelector('#identifier');
const passwordInput = document.querySelector('#password');
const passwordToggle = document.querySelector('#password-toggle');
const formMessage = document.querySelector('#form-message');

function showFieldError(fieldId, message) {
	document.querySelector(`#${fieldId}-error`).textContent = message;
}

passwordToggle.addEventListener('click', () => {
	const isPasswordVisible = passwordInput.type === 'text';
	passwordInput.type = isPasswordVisible ? 'password' : 'text';
	passwordToggle.textContent = isPasswordVisible ? 'Mostrar' : 'Ocultar';
	passwordToggle.setAttribute('aria-label', isPasswordVisible ? 'Mostrar senha' : 'Ocultar senha');
	passwordToggle.setAttribute('aria-pressed', String(!isPasswordVisible));
});

loginForm.addEventListener('submit', (event) => {
	event.preventDefault();
	showFieldError('identifier', '');
	showFieldError('password', '');
	formMessage.textContent = '';
	formMessage.className = 'form-message';
	const identifier = identifierInput.value.trim();
	const password = passwordInput.value;
	let isValid = true;

	if (!identifier) {
		showFieldError('identifier', 'Informe seu CGM ou e-mail.');
		isValid = false;
	}
	if (password.length < 6) {
		showFieldError('password', 'A senha deve ter pelo menos 6 caracteres.');
		isValid = false;
	}
	if (!isValid) {
		formMessage.textContent = 'Confira os dados informados.';
		formMessage.classList.add('error');
		return;
	}

	sessionStorage.setItem('uniformeFacilUser', identifier);
	formMessage.textContent = 'Login realizado. Abrindo seu painel...';
	formMessage.classList.add('success');
	window.setTimeout(() => { window.location.href = '../home/index.html'; }, 500);
});

document.querySelector('#forgot-password').addEventListener('click', (event) => {
	event.preventDefault();
	formMessage.textContent = 'Procure a secretaria da escola para redefinir sua senha.';
	formMessage.className = 'form-message';
});
