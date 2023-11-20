// clicking link 'Already Member?' switches from 'Sign Up' section to 'Sign In' section

const switchToSignIn = document.getElementById('switchToSignIn');

switchToSignIn.addEventListener('click', function() {
    document.getElementById('tab-1').click();
    resetIconVisibility();
});


// clicking password icons switches their visibility modus & input type

function togglePasswordVisibility(passwordField, hideIcon, showIcon) {
    passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
    hideIcon.style.display = passwordField.type === 'password' ? 'inline' : 'none';
    showIcon.style.display = passwordField.type === 'password' ? 'none' : 'inline';
}

function addToggleListener(passwordField, hideIcon, showIcon) {
    hideIcon.addEventListener('click', () => togglePasswordVisibility(passwordField, hideIcon, showIcon));
    showIcon.addEventListener('click', () => togglePasswordVisibility(passwordField, showIcon, hideIcon));
}

// apply to elements in Sign In card
const passwordSignIn = document.querySelector('.sign-in-card input[name="password"]');
const hideFront = document.getElementById('hide-front');
const showFront = document.getElementById('show-front');
addToggleListener(passwordSignIn, hideFront, showFront);

// apply to elements in Sign Up card
const passwordSignUp = document.querySelector('.sign-up-card input[name="password"]');
const hideBack = document.getElementById('hide-back');
const showBack = document.getElementById('show-back');
addToggleListener(passwordSignUp, hideBack, showBack);


// function to reset password icon visibility & input type to default state

function resetIconVisibility() {
    hideFront.style.display = 'inline';
    showFront.style.display = 'none';
    hideBack.style.display = 'inline';
    showBack.style.display = 'none';
    
    passwordSignIn?.setAttribute('type', 'password');
    passwordSignUp?.setAttribute('type', 'password');
}

const signInRadio = document.getElementById('tab-1');
const signUpRadio = document.getElementById('tab-2');

signInRadio.addEventListener('click', resetIconVisibility);
signUpRadio.addEventListener('click', resetIconVisibility);
