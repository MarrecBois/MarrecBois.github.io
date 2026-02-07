const btnNo = document.getElementById('btn-no');
const btnYes = document.getElementById('btn-yes');
const container = document.querySelector('.container');
const initialContent = document.getElementById('initial-content');
const celebration = document.getElementById('celebration');

const moveButton = () => {
    // Offset range to move the button within
    const x = Math.random() * (window.innerWidth - btnNo.offsetWidth);
    const y = Math.random() * (window.innerHeight - btnNo.offsetHeight);
    
    // Set position to fixed relative to viewport for the runaway effect
    btnNo.style.position = 'fixed';
    btnNo.style.left = `${x}px`;
    btnNo.style.top = `${y}px`;
};

// Move when hovered or touched
btnNo.addEventListener('mouseover', moveButton);
btnNo.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveButton();
});

btnYes.addEventListener('click', () => {
    initialContent.style.display = 'none';
    celebration.style.display = 'block';
    startConfetti();
});

function startConfetti() {
    for (let i = 0; i < 100; i++) {
        createConfettiPiece();
    }
}

function createConfettiPiece() {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    
    const colors = ['#ffb7c5', '#d63384', '#ff85a1', '#ff5c8a', '#ff99ac'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    confetti.style.backgroundColor = color;
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = -10 + 'px';
    confetti.style.opacity = Math.random();
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    
    document.body.appendChild(confetti);
    
    const animation = confetti.animate([
        { transform: `translate3d(0, 0, 0) rotate(0deg)`, opacity: 1 },
        { transform: `translate3d(${Math.random() * 100 - 50}px, 100vh, 0) rotate(${Math.random() * 360}deg)`, opacity: 0 }
    ], {
        duration: Math.random() * 3000 + 2000,
        easing: 'cubic-bezier(0, .9, .91, 1)',
        iterations: 1
    });
    
    animation.onfinish = () => confetti.remove();
}
