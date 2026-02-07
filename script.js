const btnNo = document.getElementById('btn-no');
const btnYes = document.getElementById('btn-yes');
const container = document.querySelector('.container');
const initialContent = document.getElementById('initial-content');
const celebration = document.getElementById('celebration');

let moveCount = 0;

const moveButton = () => {
    moveCount++;

    // Move the button to the container level if it's not already
    if (btnNo.parentElement !== container) {
        container.appendChild(btnNo);
    }

    const containerRect = container.getBoundingClientRect();
    const btnWidth = btnNo.offsetWidth;
    const btnHeight = btnNo.offsetHeight;
    const padding = 20;

    // Define 4 corner positions
    const corners = [
        { left: padding, top: padding }, // Top Left
        { left: containerRect.width - btnWidth - padding, top: padding }, // Top Right
        { left: padding, top: containerRect.height - btnHeight - padding }, // Bottom Left
        { left: containerRect.width - btnWidth - padding, top: containerRect.height - btnHeight - padding } // Bottom Right
    ];

    // Cycle through corners based on moveCount
    const nextCorner = corners[moveCount % corners.length];

    btnNo.style.position = 'absolute';
    btnNo.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'; // Bouncy movement
    btnNo.style.left = `${nextCorner.left}px`;
    btnNo.style.top = `${nextCorner.top}px`;
    btnNo.style.zIndex = '1000';
    btnNo.style.margin = '0';
};

// Move when hovered or touched
btnNo.addEventListener('mouseover', moveButton);
btnNo.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveButton();
});

btnYes.addEventListener('click', () => {
    initialContent.style.display = 'none';
    if (btnNo && btnNo.parentElement) {
        btnNo.remove(); // Completely delete the element from the page
    }
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
