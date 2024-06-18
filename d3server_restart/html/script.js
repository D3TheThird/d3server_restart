let timerInterval; // Variable to hold the interval ID

window.addEventListener('message', function(event) {
    if (event.data.action === 'show') {
        const notification = document.querySelector('.notification');
        notification.style.display = 'block';

        // Update time immediately when showing notification
        updateTime(event.data.time);

        // Add show class to trigger animation
        notification.classList.remove('hide');
        notification.classList.add('show');

        // Clear previous interval if exists
        if (timerInterval) {
            clearInterval(timerInterval);
        }

        // Start a new interval to update time every second
        timerInterval = setInterval(() => {
            event.data.time--; // Decrease time by 1 second
            updateTime(event.data.time);
        }, 1000);

        // Hide notification after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            notification.classList.add('hide');
            setTimeout(() => {
                notification.style.display = 'none'; // Hide notification after animation
            }, 1000); // Wait for animation to complete before hiding
        }, 10000); // Change to 10000 ms (10 seconds) for testing, revert to 5000 ms (5 seconds) later

        // Additional message logic
        if (event.data.time === 60) {
            const additionalMessage = document.createElement('div');
            additionalMessage.innerText = 'Please leave now, we will not refund lost items if you ignore this warning!';
            additionalMessage.classList.add('additional-message');
            notification.appendChild(additionalMessage);
        } else {
            const existingMessage = document.querySelector('.additional-message');
            if (existingMessage) {
                existingMessage.remove(); // Remove additional message if time is not 60 seconds
            }
        }
    }
});

function updateTime(time) {
    const timeElement = document.getElementById('time');
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    if (seconds < 10) {
        seconds = '0' + seconds;
    }

    timeElement.innerText = `Time left: ${minutes}m${seconds}s`;
}
