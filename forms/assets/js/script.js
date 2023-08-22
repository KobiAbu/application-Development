
$(document).ready(function()
{
    $.ajax({
        url:"https://api.metalpriceapi.com/v1/latest?api_key=9e04cdeb8705a9aaa9fbeefdf45a34a8&base=ILS&currencies=XAU"
        ,method:"GET",
       success: function(data){
        console.log(data)
        const priceOfGram=(1/data.rates.XAU)/28.3495231
        console.log(priceOfGram)
       }
    })
})

// Fetch data from the API
fetch('https://api.metalpriceapi.com/v1/latest?api_key=9e04cdeb8705a9aaa9fbeefdf45a34a8')
  .then(response => response.json())
  .then(data => {
    // Process the API data and extract values
    const labels = data.map(item => item.label);
    const values = data.map(item => item.value);

    // Create a Chart.js chart
    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar', // Change the chart type if needed
      data: {
        labels: labels,
        datasets: [{
          label: 'Values',
          data: values,
          backgroundColor: 'rgba(75, 192, 192, 0.2)', // Adjust colors as needed
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  })
  .catch(error => console.error('Error fetching data:', error));
