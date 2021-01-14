/* global html2pdf */
/*
 * @see https://ekoopmans.github.io/html2pdf.js/
 * @see https://github.com/eKoopmans/html2pdf.js
 * @see https://cdnjs.com/libraries/html2pdf.js/0.8.1
 */
function onLoad() {
  var element = document.getElementById('root');
  html2pdf(element);
}
