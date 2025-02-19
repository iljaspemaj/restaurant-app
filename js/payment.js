const paymentModal = document.getElementById("payment-modal");
const payButton = document.querySelector(".pay-button");
const successModal = document.getElementById("success-modal");;

payButton.addEventListener("click", () => {
  paymentModal.style.display = "flex";
});

window.onclick = function (event) {
  if (event.target == paymentModal) {
    paymentModal.style.display = "none";
  }
};

const paymentForm = document.getElementById("payment-form");

paymentForm.add

paymentForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const cardNumber = document.getElementById("card-number").value;
    const expiryDate = document.getElementById("expiration-date").value;
    const cvv = document.getElementById("cvv").value;

    // Validimi i numrit te kartes (duhet ti kete 16 numra pa hapesira)
    const cardNumberRegex = /^[0-9]{16}$/;
    if (!cardNumberRegex.test(cardNumber.replace(/\s+/g, ""))) {
      alert("Please enter a 16 digit card number.");
      return;
    }

    // Validimi i datës se skadimit (format MM/YY)
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!expiryDateRegex.test(expiryDate)) {
      alert("Please enter a valid expiration date in (MM/YY)");
      return;
    }

    // Validimi i CVV-it (duhet te jete 3 numra)
    const cvvRegex = /^[0-9]{3}$/;
    if (!cvvRegex.test(cvv)) {
      alert("Please enter a 3-digit CVV.");
      return;
    }

    showSuccessModal();

    paymentModal.style.display = "none";
});

// Validimi dhe formatimi i numrit te kartes
const cardNumberInput = document.getElementById("card-number");
cardNumberInput.addEventListener("input", function (event) {
    let input = event.target.value.replace(/\D/g, "") // i fshin te gjitha karakteret qe nuk jane numra
    input = input.substring(0, 16); // e limiton userin te shenoj maximumi deri ne 16 karaktere

    const formattedCardNumber = input.match(/.{1,4}/g)?.join(" ") || input; // cdo 4 numra e shton nje hapesire
    event.target.value = formattedCardNumber;
});

// Validimi dhe formatimi i dates se skadimit: MM/YY format

const expiryDateInput = document.getElementById("expiration-date");
expiryDateInput.addEventListener("input", function (event) {
    let input = event.target.value.replace(/\D/g, "") // i fshin te gjitha karakteret qe nuk jane numra
    input = input.substring(0, 4); // e limiton userin te shenoj maximumi deri ne 5 karaktere

    if (input.length >= 3) {
        event.target.value = `${input.substring(0, 2)}/${input.substring(2)}`;
    } else {
        event.target.value = input;
    }
});

function showSuccessModal(){
    successModal.style.display = "flex";

    clearCartItems();

    setTimeout(function () {
        successModal.style.display = "none";
    }, 5000) // 5 sekonda
}

function clearCartItems() {
    localStorage.removeItem("cart");
    updateCartBadge();
    renderInvoice();
}