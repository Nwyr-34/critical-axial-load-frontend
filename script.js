document.getElementById('calcForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const E = parseFloat(document.getElementById('E').value);
  const I = parseFloat(document.getElementById('I').value);
  const L = parseFloat(document.getElementById('L').value);

  const response = await fetch('http://localhost:8000/calculate_critical_load/', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ E, I, L })
  });

  const result = await response.json();
  document.getElementById('result').textContent = `Carga Axial Crítica (P_cr): ${result.P_cr.toFixed(2)}`;

  drawChart(E, I, L, result.P_cr);
});

function drawChart(E, I, L, P_cr) {
  const ctx = document.getElementById('resultChart').getContext('2d');
  const chart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: Array.from({ length: 10 }, (_, i) => i + 1),
          datasets: [{
              label: 'Carga Axial Crítica',
              data: Array.from({ length: 10 }, (_, i) => (Math.PI ** 2 * E * I) / ((i + 1) ** 2)),
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 2,
              fill: false
          }]
      },
      options: {
          responsive: true,
          scales: {
              x: {
                  title: {
                      display: true,
                      text: 'Factor de Longitud'
                  }
              },
              y: {
                  title: {
                      display: true,
                      text: 'Carga Axial Crítica'
                  }
              }
          }
      }
  });
}
