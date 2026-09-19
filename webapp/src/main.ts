import './style.css'

const appDiv = document.querySelector<HTMLDivElement>('#app')!;

appDiv.innerHTML = `
  <h1>Vite Frontend</h1>
  <p id="api-status">Connecting to backend...</p>
`;

function delay (time: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, time));
};

// Check connection to api and database then allow into main app
fetch('/api/response')
  .then(response => {
    if (!response.ok) throw new Error(response.statusText);
    else {
      response.json()
      .then(data => {
        const statusText = document.querySelector<HTMLParagraphElement>('#api-status')!;
        statusText.textContent = data.message;
        statusText.style.color = "green";

        //Wait 3 seconds (to mentally process the screen) then move to showings list
        delay(3000)
        .then(() => {window.location.href = '/api/showings';});
      })
    }
  })
  .catch(error => {
    const statusText = document.querySelector<HTMLParagraphElement>('#api-status')!;
        statusText.textContent = error;
        statusText.style.color = "red";
    console.error("Error connecting to backend:", error);
  });
