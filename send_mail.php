<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Capture the form fields
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];
    $appointment_date = $_POST['datetimepicker1'];
    $note = $_POST['Note'];
    
    // Set email details
    $to = "siddhantrn20@iiserbpr.ac.in";
    $subject = "New Appointment Request from $name";
    $message = "Name: $name\nPhone: $phone\nEmail: $email\nAppointment Date: $appointment_date\nNote: $note";
    $headers = "From: $email";

    // Send the email
    if (mail($to, $subject, $message, $headers)) {
        echo "Appointment request sent successfully!";
    } else {
        echo "Failed to send the appointment request. Please try again.";
    }
}
?>
