const ctx = document.getElementById('typesErrorChart');
                      
new Chart(ctx, {
    type: 'bar',
    data: {
    labels: ['contrast', 'structureel', 'alt-teksten', 'aria-labels'],
    datasets: [{
        label: '#soorten foutmeldingen',
        data: [44, 32, 14, 12, 8],
        backgroundColor: 'rgba(66, 133, 244, 0.2)',
        borderColor: 'rgba(66, 133, 244, 1)',
        borderWidth: 1,
        barPercentage: 0.05
    }]
    },
    options: {
    scales: {
        y: {
            beginAtZero: true,
            ticks: {
                stepSize: 10,
                max: 50
            }
        }
    }
    }
});