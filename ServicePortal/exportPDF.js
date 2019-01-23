/* I just managed to get pdf export working with knowledge articles using html2canvas and jspdf

For my specific usecase, being able to edit/copy text from the produced document wasn’t required, so I settled for html2canvas which converts a element to an image (Initially png, but I chose to opt for jpg as the export time was reduced drastically)

I created dependencies based on these two URLS:

https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js
https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.min.js

And added the dependency to my widget

In my client side I used the following code :

*/

    $scope.exportPDF = function(){
        var html = $('#kb-content-html');
        html2canvas($('#kb-content-html')[0]).then(function(canvas) {
            var doc;
            var style = canvas.style;
            doc = new jsPDF('p', 'px', [(parseInt(style.width, 10) * 1.2), (parseInt(style.height, 10) * 1.2)]);
            var imgData = canvas.toDataURL('image/jpeg', 0.5);
            doc.addImage(imgData, 'jpeg', 10, 10);
            doc.save('sample-file.pdf');
        });
    }

/*
Where kb-content-html is the ID of the div you want to export. Just add the exportPDF() wherever you’d like in the HTML.

Regarding the parseInt * 1.2, that was a result of me having some trouble making the image convert to the correct size. Maybe it won’t be an issue to you, and you can instead opt for this:
*/
doc = new jsPDF('p', 'mm', [canvas.width, canvas.height]);

/* Would love to hear if you manage to implement it successfully another way, as the shortcomings of exporting as an image > pdf might be an issue for later use. */
