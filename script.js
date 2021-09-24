const forecastContainer = document.querySelector('.container');
const clearButton = document.querySelector('.clear');

clearButton.addEventListener("click", clear)

function clear() {
    forecastContainer.innerHTML = `
    <div class="input-container">
        <input type="text" placeholder="Enter your city here" />
        <button class="search">Search</button>
        <button class="clear" onclick="clear()">
            <i class="fas fa-redo"></i>
        </button>
    </div>
  `
    console.log("Cleared!")
}