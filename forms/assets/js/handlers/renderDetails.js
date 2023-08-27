// fetch('/api/getPersonalData').then(res => res.json()).then(data => {
// if(data.error)
// {
//     window.location.href = "/login"
// }else{
//     document.getElementById('name').textContent = data.userName;
//    // document.getElementById('firstName').textContent = data.firstName;
// }
// }).catch(err => {
//     console.error(err);
// });
$(document).ready(async function () {
$.ajax({
    url: '/api/getPersonalData',
    type: 'GET',
    dataType: 'json',
    success: function(data) {
        if(data.error) {
            // Handle error (e.g., redirect to login page)
            window.location.href = "/login.html";
        } else {
            console.log( $('userName').text(data.userName));
            $('userName').text(data.userName);
           
        }
    },
    error: function(error) {
        console.error('Error fetching user data:', error);
    }
});});