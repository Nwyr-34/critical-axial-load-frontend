// script.js
document.getElementById('calculate-btn').addEventListener('click', () => {
    const E = parseFloat(document.getElementById('E').value);
    const I = parseFloat(document.getElementById('I').value);
    const L = parseFloat(document.getElementById('L').value);

    fetch('https://critical-axial-load-backend.onrender.com/calculate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ E, I, L })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            document.getElementById('pcr-value').innerText = data.Resultado;
            updateGraph(E, I, L, data.Resultado);
        })
        .catch(error => console.error('Error:', error));
});

function updateGraph(E, I, L, pcr) {
    const ctx = document.getElementById('graph').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Carga Axial Crítica'],
            datasets: [{
                label: 'Resultado',
                data: [pcr],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
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
}
