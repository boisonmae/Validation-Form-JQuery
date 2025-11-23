$(document).ready(function() {
    // Helper functions
    function isLettersOnly(input){ return /^[A-Za-z\s]+$/.test(input); }
    function isNumbersOnly(input){ return /^[0-9]+$/.test(input); }
    function isValidEmail(email){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }

    // Fields to validate
    const fields = [
        {id: 'last-name', validator: isLettersOnly, required: true},
        {id: 'first-name', validator: isLettersOnly, required: true},
        {id: 'middle-name', validator: isLettersOnly, required: true},
        {id: 'ext-name', validator: isLettersOnly, required: false},
        {id: 'contact-number', validator: (val)=>isNumbersOnly(val) && val.length===11, required: true},
        {id: 'email', validator: isValidEmail, required: true},
        {id: 'home-address', validator: (val)=>val.trim() !=='', required: true},
        {id: 'student-number', validator: isNumbersOnly, required: true},
        {id: 'program', validator: (val)=>val.trim()!=='', required: true},
        {id: 'year-level', validator: (val)=>val.trim()!=='', required: true},
        {id: 'section', validator: (val)=>val.trim()!=='', required: true}
    ];

    // Validate individual field
    function validateField(field){
        const input = $('#' + field.id);
        const errorSpan = $('#' + field.id + '-error');
        const value = input.val().trim();

        if(field.required && value === '') {
            input.css('border', '2px solid red');
            errorSpan.text('This field is required');
            return false;
        } else if(value !== '' && !field.validator(value)) {
            input.css('border', '2px solid red');
            errorSpan.text('Invalid input');
            return false;
        } else if(value !== ''){
            input.css('border', '2px solid green');
            errorSpan.text('');
            return true;
        } else {
            input.css('border', '1px solid #999');
            errorSpan.text('');
            return true;
        }
    }

    // Keyup and blur events
    fields.forEach(field => {
        $('#' + field.id).on('keyup blur', function(){
            validateField(field);
        });
    });

    // Gender and Birthdate validation
    $('#gender').on('change blur', function(){
        const val = $(this).val();
        const err = $('#gender-error');
        if(val === ''){
            $(this).css('border', '2px solid red');
            err.text('Select Gender');
        } else {
            $(this).css('border', '2px solid green');
            err.text('');
        }
    });

    $('#birthdate').on('change blur', function(){
        const val = $(this).val();
        const err = $('#birthdate-error');
        if(val === ''){
            $(this).css('border', '2px solid red');
            err.text('Birthdate is required');
        } else {
            $(this).css('border', '2px solid green');
            err.text('');
        }
    });

    // Form submission
    $('#registration-form').on('submit', function(e){
        e.preventDefault();
        let valid = true;

        // Validate all fields
        fields.forEach(field => {
            if(!validateField(field)) valid = false;
        });

        // Validate gender and birthdate
        if($('#gender').val() === '') valid = false;
        if($('#birthdate').val() === '') valid = false;

        // Terms checkbox
        if(!$('#agree-terms').is(':checked')){
            $('#terms-error').text('You must agree to terms');
            valid = false;
        } else {
            $('#terms-error').text('');
        }

        // Set Extended Name to "None" if empty
        if($('#ext-name').val().trim() === ''){
            $('#ext-name').val('None');
            $('#ext-name').css('border', '2px solid green');
            $('#ext-name-error').text('');
        }

        if(valid){
            $('#loading').show();
            $('#success-message').hide();
            setTimeout(() => {
                $('#loading').hide();
                $('#success-message').show();
                $('#registration-form')[0].reset();
                $('input, select').css('border', '1px solid #999');
                $('.error').text('');
            }, 2000);
        }
    });
});
