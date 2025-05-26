// Función para mostrar notificaciones
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Función para validar el formulario
function validateForm(email, password) {
    if (!email || !password) {
        showNotification('Por favor, completa todos los campos', 'error');
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Por favor, ingresa un email válido', 'error');
        return false;
    }

    if (password.length < 6) {
        showNotification('La contraseña debe tener al menos 6 caracteres', 'error');
        return false;
    }

    return true;
}

// Función para actualizar la navegación según el estado de la sesión
function updateNavigation() {
    const navLinks = document.querySelector('.nav-links');
    const loginLink = navLinks.querySelector('a[href="login.html"]');
    
    if (isUserLoggedIn()) {
        // Obtener el email del usuario
        const userEmail = localStorage.getItem('userEmail') || 'Usuario';
        
        // Crear el nuevo elemento de navegación
        const userNav = document.createElement('div');
        userNav.className = 'user-nav';
        userNav.innerHTML = `
            <span class="user-email">${userEmail}</span>
            <button class="logout-btn">
                <i class="fas fa-sign-out-alt"></i> Cerrar Sesión
            </button>
        `;
        
        // Reemplazar el enlace de login con el nuevo elemento
        loginLink.parentNode.replaceChild(userNav, loginLink);
        
        // Agregar evento al botón de cerrar sesión
        const logoutBtn = userNav.querySelector('.logout-btn');
        logoutBtn.addEventListener('click', handleLogout);
    }
}

// Función para manejar el cierre de sesión
function handleLogout() {
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('userEmail');
    showNotification('Sesión cerrada exitosamente');
    setTimeout(() => {
        window.location.reload();
    }, 1000);
}

// Función para verificar si el usuario está logueado
function isUserLoggedIn() {
    return localStorage.getItem('userLoggedIn') === 'true';
}

// Función para manejar el inicio de sesión
function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!validateForm(email, password)) {
        return;
    }

    // Simulación de inicio de sesión
    const loginBtn = document.querySelector('.login-btn');
    loginBtn.disabled = true;
    loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Iniciando sesión...';

    // Simular una petición al servidor
    setTimeout(() => {
        // Aquí iría la lógica real de autenticación
        if (email === 'Jenifer@gmail.com' && password === '123456') {
            // Guardar el estado de inicio de sesión y el email
            localStorage.setItem('userLoggedIn', 'true');
            localStorage.setItem('userEmail', email);
            showNotification('¡Inicio de sesión exitoso!');
            setTimeout(() => {
                window.location.href = 'index.php'; // Quita el ../
            }, 1000);
        } else {
            showNotification('Credenciales incorrectas', 'error');
            loginBtn.disabled = false;
            loginBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Iniciar Sesión';
        }
    }, 1500);
}

// Función para manejar el inicio de sesión social
function handleSocialLogin(provider) {
    const socialBtn = document.querySelector(`.social-btn.${provider}`);
    socialBtn.disabled = true;
    socialBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

    // Simular una petición al servidor
    setTimeout(() => {
        showNotification(`Iniciando sesión con ${provider}...`);
        socialBtn.disabled = false;
        socialBtn.innerHTML = `<i class="fab fa-${provider}"></i>`;
    }, 1500);
}

// Agregar estilos para las notificaciones
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 5px;
        box-shadow: 0 3px 10px rgba(0,0,0,0.2);
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1000;
    }

    .notification.success {
        background-color: var(--primary-color);
        color: white;
    }

    .notification.error {
        background-color: #f44336;
        color: white;
    }

    .notification.show {
        transform: translateY(0);
        opacity: 1;
    }

    .form-group input.error {
        border-color: #f44336;
    }

    .form-group input.error:focus {
        box-shadow: 0 0 0 3px rgba(244, 67, 54, 0.1);
    }

    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }

    .shake {
        animation: shake 0.5s ease;
    }
`;
document.head.appendChild(style);

// Agregar estilos para la navegación del usuario
const navStyle = document.createElement('style');
navStyle.textContent = `
    .user-nav {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .user-email {
        color: var(--primary-color);
        font-weight: 500;
    }

    .logout-btn {
        background: none;
        border: none;
        color: var(--text-color);
        cursor: pointer;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .logout-btn:hover {
        background-color: rgba(0,0,0,0.05);
        color: var(--primary-color);
    }

    .logout-btn i {
        font-size: 1.1em;
    }
`;
document.head.appendChild(navStyle);

// Actualizar la navegación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    updateNavigation();
    
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Agregar eventos a los botones sociales
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(button => {
        button.addEventListener('click', () => {
            const provider = button.classList[1];
            handleSocialLogin(provider);
        });
    });

    // Agregar animación a los inputs
    const inputs = document.querySelectorAll('.form-group input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
        });
    });
});
