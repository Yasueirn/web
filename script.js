$(document).ready(function() {
    $('#join_button').click(function() {
        const email = $('#email').val().trim();
        const fname = $('#fname').val().trim();
        const lname = $('#lname').val().trim();

        if (email && fname && lname) {
            // get last id
            let lastId = parseInt(localStorage.getItem('lastVolunteerId')) || 0;
            const newId = lastId + 1;

            const dateSubmitted = new Date().toLocaleString();

            const volunteer = {
                id: newId,
                email,
                fname,
                lname,
                dateSubmitted
            };

            // get array of volo
            let volunteers = JSON.parse(localStorage.getItem('volunteers')) || [];
            volunteers.push(volunteer);

            // saving
            localStorage.setItem('volunteers', JSON.stringify(volunteers));
            localStorage.setItem('lastVolunteerId', newId.toString());

            alert(
                `Thank you for joining our volunteer team, ${fname} ${lname}!\n\n` +
                `We will contact you soon at: ${email}\n` +
                `Your volunteer ID: ${newId}\n\n` +
                `Welcome to the Paws Home family!`
            );

            // clear form
            $('#email').val('');
            $('#fname').val('');
            $('#lname').val('');
        } else {
            alert('Please fill out all fields before submitting.');
        }
    });
});


$('#randomPetBtn').click(function () {
    $('#randomPetContainer').html('Loading...');
    
    $.get('https://dog.ceo/api/breeds/image/random', function (data) {
        if (data.status === "success") {
            $('#randomPetContainer').html(`<img src="${data.message}" alt="Random Dog">`);
        } else {
            $('#randomPetContainer').html("Failed to fetch pet. Please try again.");
        }
    }).fail(function () {
        $('#randomPetContainer').html("Error fetching data.");
    });
});

