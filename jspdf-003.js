/* global jspdf */
/*
 * @see https://github.com/MrRio/jsPDF
 * @see http://raw.githack.com/MrRio/jsPDF/master/
 * @see https://stackoverflow.com/questions/742271/generating-pdf-files-with-javascript
 * @see https://cdnjs.com/libraries/jspdf
 * @see https://stackoverflow.com/questions/45780708/how-do-i-create-multiline-text-and-page-split-in-jspdf
 */

var base64Img = null;
var margins = {
  top: 70,
  bottom: 40,
  left: 30,
  width: 550
};

function header(doc)
{
  doc.setFontSize(30);
  doc.setTextColor(40);
  doc.setFontStyle('normal');
  if (base64Img) {
    doc.addImage(base64Img, 'JPEG', margins.left, 10, 40,40);
  }
  doc.text('Report Header Template', margins.left + 50, 40 );
  doc.line(3, 70, margins.width + 43,70); // horizontal line
}

imgToBase64('octocat.jpg', function(base64) {
  base64Img = base64;
});

// You could either use a function similar to this or preconvert an image with, for example, http://dopiaza.org/tools/datauri
// http://stackoverflow.com/questions/6150289/how-to-convert-image-into-base64-string-using-javascript
function imgToBase64(url, callback, imgVariable) {
  if (!window.FileReade) {
    callback(null);
    return;
  }
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'blob';
  xhr.onload = function() {
    var reader = new FileReader();
    reader.onloadend = function() {
      imgVariable = reader.result.replace('text/xml', 'image/jpeg');
      callback(imgVariable);
    };
    reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', url);
  xhr.send();
}

function headerFooterFormatting(doc)
{
  var totalPages  = doc.internal.getNumberOfPages();
  for (var i = totalPages; i >= 1; i--) { // make this page, the current page we are currently working on.
    doc.setPage(i);
    header(doc);
    footer(doc, i, totalPages);
  }
}

function onLoad() {
  var element = document.getElementById('root');
  var jsPDF = window.jspdf.jsPDF;
  var pdf = new jsPDF();
  pdf.fromHTML(element,
    margins.left, // x coord
    margins.top,
    {
      // y coord
      width: margins.width// max width of content on PDF
    },
    function(dispose) {
      headerFooterFormatting(pdf);
    },
    margins);
  // pdf.setFontSize(20);
  // pdf.setTextColor(0, 255, 0);
  // pdf.text('This is a title', 20, 20);
  // // pdf.addPage();
  // pdf.setTextColor(150);
  // pdf.setFontSize(10);
  // pdf.text('This is some normal sized text underneath.', 20, 30);
  // pdf.text('This is next text line.', 20, 35);
  pdf.save('a4.pdf');
  // pdf.autoPrint();
}
