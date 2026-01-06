const enterScreen = document.getElementById('enterScreen');
const enterButton = document.querySelector('.enter-button');
const mainContent = document.getElementById('mainContent');

enterButton.addEventListener('mouseenter', () => {
    enterScreen.classList.add('blur');
});

enterButton.addEventListener('mouseleave', () => {
    enterScreen.classList.remove('blur');
});

enterButton.addEventListener('click', () => {
    enterScreen.classList.add('hidden');
    mainContent.classList.add('visible');
});
