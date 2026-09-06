import './style.css'

const appDiv = document.querySelector<HTMLDivElement>('#app')!;

appDiv.innerHTML = `
  <h1>Vite Frontend</h1>
  <p id="api-status">Connecting to backend...</p>
`;

// Temp check connection works
fetch('/api/data')
  .then(response => response.json())
  .then(data => {
    const statusText = document.querySelector<HTMLParagraphElement>('#api-status')!;
    statusText.textContent = data.message;
    statusText.style.color = "green";
  })
  .catch(error => {
    console.error("Error connecting to backend:", error);
  });
