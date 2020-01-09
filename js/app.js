const init = (function init() {
  const controls = document.querySelectorAll('.controls input[type=range]');
  controls.forEach((item) => {
    // Name input[range] matches the css variable
    // We get computed value for variable
    const prop = getComputedStyle(document.documentElement).getPropertyValue(`--${item.name}`);
    // and extract from it the value and units of measurement
    const propMatch = prop.match(/(\d+)(.*?$)/);
    const [propValue, propUnit] = [propMatch[1], propMatch[2] || ''];

    item.dataset.unit = propUnit;
    item.value = propValue;
    item.addEventListener('input', changeControls);
    item.addEventListener('change', changeControls);
  });
  return init;
})();

function changeControls() {
  document.documentElement.style.setProperty(`--${this.name}`, `${this.value}${this.dataset.unit}`);
}

function resetFilters() {
  const controls = document.querySelectorAll('.controls input[type=range]');
  controls.forEach((item) => {
    document.documentElement.style.removeProperty(`--${item.name}`);
  })
  init();
}
