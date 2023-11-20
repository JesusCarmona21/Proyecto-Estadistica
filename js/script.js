// Obtener referencia al botón de cálculo y agregar un evento de clic
document.addEventListener("DOMContentLoaded", function () {
    const calculateBtn = document.getElementById("calculateBtn");
    calculateBtn.addEventListener("click", calculateStatistics);

       // Obtener referencias a los elementos del DOM
    function calculateStatistics() {
        const dataInput = document.getElementById("data");
        const meanResult = document.getElementById("meanResult");
        const medianResult = document.getElementById("medianResult");
        const modeResult = document.getElementById("modeResult");
        const varianceResult = document.getElementById("varianceResult");
        const stdDeviationResult = document.getElementById("stdDeviationResult");

        const data = dataInput.value.split(",").map(Number);
        if (data.length === 0) {
            alert("Ingresa al menos un dato.");
            return;
        }

        // Calcular la media
        const mean = data.reduce((acc, val) => acc + val, 0) / data.length;
        meanResult.textContent = mean.toFixed(2);

        // Calcular la mediana
        const sortedData = data.slice().sort((a, b) => a - b);
        const middle = Math.floor(sortedData.length / 2);
        const median = sortedData.length % 2 === 0
            ? (sortedData[middle - 1] + sortedData[middle]) / 2
            : sortedData[middle];
        medianResult.textContent = median.toFixed(2);

        // Calcular la moda
        const dataCounts = {};
        let mode = [];
        let maxCount = 0;
        for (const value of data) {
            dataCounts[value] = (dataCounts[value] || 0) + 1;
            if (dataCounts[value] > maxCount) {
                maxCount = dataCounts[value];
                mode = [value];
            } else if (dataCounts[value] === maxCount) {
                mode.push(value);
            }
        }
        modeResult.textContent = mode.join(", ");

        // Calcular la varianza y la desviación estándar
        const variance = data.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / data.length;
        varianceResult.textContent = variance.toFixed(2);
        const stdDeviation = Math.sqrt(variance);
        stdDeviationResult.textContent = stdDeviation.toFixed(2);

        // Crear un gráfico de barras con colores aleatorios
        const ctx = document.getElementById("dataChart").getContext("2d");
        const backgroundColors = generateRandomColors(data.length);

        new Chart(ctx, {
            type: "bar",
            data: {
                labels: data.map((_, index) => "Dato " + (index + 1)),
                datasets: [
                    {
                        label: "Datos",
                        data: data,
                        backgroundColor: backgroundColors,
                    },
                ],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });
    }

    // Función para generar colores aleatorios
    function generateRandomColors(count) {
        const colors = [];
        for (let i = 0; i < count; i++) {
            const randomColor = `rgba(${getRandomInt(0, 255)}, ${getRandomInt(0, 255)}, ${getRandomInt(0, 255)}, 0.7)`;
            colors.push(randomColor);
        }
        return colors;
    }

    // Función para generar un número entero aleatorio
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
});
