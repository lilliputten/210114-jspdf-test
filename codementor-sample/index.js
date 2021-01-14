/* global jsPDF */
/*
 * @see https://www.codementor.io/@amehjoseph/convert-html-css-content-to-a-sleek-multiple-page-pdf-file-using-jspdf-javascript-library-eyyz74hci
 */

var base64Img = null;

imgToBase64('octocat.jpg', function(base64) {
  base64Img = base64;
});

var margins = {
  top: 70,
  bottom: 40,
  left: 30,
  width: 550
};

function onLoad() {
  generate();
}

function generate() {
  var element = document.getElementById('html-content');
  var pdf = new jsPDF('p', 'pt', 'a4');
  pdf.setFontSize(18);
  pdf.fromHTML(element,
    margins.left, // x coord
    margins.top,
    {
      // y coord
      width: margins.width, // max width of content on PDF
    },
    function(/* dispose */) {
      headerFooterFormatting(pdf, pdf.internal.getNumberOfPages());
    },
    margins
  );
  // // Variant 1: Save to file...
  // pdf.save('a4.pdf');
  // Variant 2: Output to iframe
  var iframe = document.createElement('iframe');
  iframe.setAttribute('id','pdf-demo');
  // iframe.setAttribute('style','position:absolute;right:0; top:0; bottom:0; height:100%; width:400px; padding:20px;');
  document.body.appendChild(iframe);
  iframe.src = pdf.output('datauristring');
}

function headerFooterFormatting(doc, totalPages) {
  for (var i = totalPages; i >= 1; i--)
  {
    doc.setPage(i);
    //header
    header(doc);

    footer(doc, i, totalPages);
    doc.page++;
  }
}

function header(doc) {
  doc.setFontSize(15);
  doc.setTextColor(100);
  doc.setFontStyle('normal');
  // if (base64Img) {
  //   doc.addImage(base64Img, 'JPEG', margins.left, 10, 40,40);
  // }
  doc.text('Page Header', margins.left, 40);
  doc.setLineCap(1);
  doc.setLineWidth(1);
  doc.setDrawColor(200);
  var y = 50;
  var xOffset = 3;
  doc.line(xOffset, y, margins.width + 40 + xOffset, y); // horizontal line
}

// You could either use a function similar to this or pre convert an image with for example http://dopiaza.org/tools/datauri
// http://stackoverflow.com/questions/6150289/how-to-convert-image-into-base64-string-using-javascript
function imgToBase64(url, callback, imgVariable) {
  if (!window.FileReader) {
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

function footer(doc, pageNumber, totalPages) {
  var str = 'Page ' + pageNumber + ' of ' + totalPages;
  doc.setFontSize(10);
  doc.text(str, margins.left, doc.internal.pageSize.height - 20);
}
