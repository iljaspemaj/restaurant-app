document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("emailForm");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const subjectInput = document.getElementById("subject");
    const messageInput = document.getElementById("message");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const subject = subjectInput.value.trim();
        const message = messageInput.value.trim();

        if (!name ||!email ||!subject ||!message) {
            Toastify({
                text: "All fields are required!",
                duration: 3000,
                gravity: "top",
                position: 'center',
                backgroundColor: "linear-gradient(to right, #FF5F6D, #ffc371)",
            }).showToast();
            return;
        }

        if (!validateEmail(email)){
            Toastify({
                text: "Please enter a valid email address!",
                duration: 3000,
                gravity: "top",
                position: 'center',
                backgroundColor: "linear-gradient(to right, #FF5F6D, #ffc371)",
            }).showToast();
            return;
        }

        sendEmail({name, email, subject, message});

    })

    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }
    
    function sendEmail(data){
        setTimeout(() => {
            Toastify({
                text: "Email sent successfully!",
                duration: 3000,
                gravity: "top",
                position: 'center',
                backgroundColor: "#ff7a00",
            }).showToast();
            form.reset();
        })
    }
})