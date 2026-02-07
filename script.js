const btnNo = document.getElementById('btn-no');
const btnYes = document.getElementById('btn-yes');
const container = document.querySelector('.container');
const initialContent = document.getElementById('initial-content');
const celebration = document.getElementById('celebration');

const moveButton = () => {
    // Get container dimensions to keep button inside
    const containerRect = container.getBoundingClientRect();
    const btnRect = btnNo.getBoundingClientRect();

    // Calculate max positions within container (subtracting button size and some padding)
    const padding = 20;
    const maxX = containerRect.width - btnRect.width - padding;
    const maxY = containerRect.height - btnRect.height - padding;

    // Random position within container bounds
    const randomX = Math.max(padding, Math.random() * maxX);
    const randomY = Math.max(padding, Math.random() * maxY);

    // Switch to absolute positioning relative to the container for the runaway effect
    btnNo.style.position = 'absolute';
    btnNo.style.left = `${randomX}px`;
    btnNo.style.top = `${randomY}px`;
    btnNo.style.margin = '0'; // Remove any layout margins
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
