const frontIcon = document.getElementById('toggle-icon-front');
const backIcon = document.getElementById('toggle-icon-back');

//get the associated password input element for sign-in and sign-up
const passwordSignIn = document.querySelector('.sign-in-card input[name="password"]');
const passwordSignUp = document.querySelector('.sign-up-card input[name="password"]');

function resetIconToHide() {
    frontIcon.classList.remove('bxs-show');
    frontIcon.classList.add('bxs-hide');

    backIcon.classList.remove('bxs-show');
    backIcon.classList.add('bxs-hide');

    passwordSignIn.type = 'password';
    passwordSignUp.type = 'password';
}

function toggleIconVisibility(icon) {
    icon.classList.toggle('bxs-hide');
    icon.classList.toggle('bxs-show');

    //set password field type based on icon display state
    passwordSignIn.type = icon.classList.contains('bxs-show') ? 'text' : 'password';
    passwordSignUp.type = icon.classList.contains('bxs-show') ? 'text' : 'password';
}

frontIcon.addEventListener('click', function() {
    toggleIconVisibility(frontIcon);
});

backIcon.addEventListener('click', function() {
    toggleIconVisibility(backIcon);
});

//clicking either radio button resets default state of visibility icon
const signInRadio = document.getElementById('tab-1');
const signUpRadio = document.getElementById('tab-2');

signInRadio.addEventListener('click', resetIconToHide);
signUpRadio.addEventListener('click', resetIconToHide);

// clicking link 'Already Member?' switches from 'Sign Up' section to 'Sign In' section 
const switchToSignIn = document.getElementById('switchToSignIn');
switchToSignIn.addEventListener('click', function() {
    document.getElementById('tab-1').click();
    resetIconToHide();
});
