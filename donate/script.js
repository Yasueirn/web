$(document).ready(function () {
  $('#donationForm').submit(function (e) {
    e.preventDefault();

    const email = $('#email').val().trim();
    const amount = $('#amount').val().trim();
    const card = $('#card').val().trim();
    const expiry = $('#expiry').val().trim();
    const cvv = $('#cvv').val().trim();

    const digitsOnly = card.replace(/\D/g, '');

    if (email && amount && digitsOnly.length === 16 && expiry && cvv) {
      
      const audio = new Audio('happyb.mp3');
      audio.play();

      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 }
      });

      const maskedCard = digitsOnly.slice(-4).padStart(digitsOnly.length, '*');
      const transactionId = Math.floor(100000 + Math.random() * 900000);
//
      const donationData = {
        email: email,
        amount: amount
      };
      let donations = JSON.parse(localStorage.getItem('donations')) || [];
      donations.push(donationData);
      localStorage.setItem('donations', JSON.stringify(donations));

      const receiptHTML = `
        <div style="font-family:Arial, sans-serif; padding:20px; text-align:center;">
          <h2> Thank you for your donation! </h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Amount:</strong> ${amount} KZT</p>
          <p><strong>Card:</strong> ${maskedCard}</p>
          <p><strong>Valid Thru:</strong> ${expiry}</p>
          <p><strong>Transaction ID:</strong> #${transactionId}</p>
          <p style="margin-top:20px;">We appreciate your support! </p>
        </div>
      `;

      const receiptWindow = window.open('', 'Receipt', 'width=400,height=600');
      receiptWindow.document.write(`
        <html>
          <head><title>Receipt</title></head>
          <body>${receiptHTML}</body>
        </html>
      `);
      receiptWindow.document.close();

      $('#donationForm')[0].reset();
    } else {
      alert('Please fill out all fields correctly. Card number must be 16 digits.');
    }
  });

  $('#expiry').on('input', function () {
    let value = $(this).val().replace(/\D/g, '');
    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    $(this).val(value);
  });
});
