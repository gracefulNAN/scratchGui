
import downloadAsHTML from './hacky-file-getter.js'

export default function (file) {
  downloadAsHTML({file}, {
    title: "生日派对",
    username: "wang",
  })
  .then(html => {
    SB3ToHtml( html , "text/html")
  })
  .catch(err => {
    console.error(err);
    if (err.message !== 'error logged') {
      alert('Unexpected error:\n' + err.stack, 'error');
    }
  });
  function SB3ToHtml(html, type ="text/html", target = "view_window") {
    var self = window,
    toString = function(a){return String(a);},
    myBlob = (self.Blob || self.MozBlob || self.WebKitBlob || toString);
    myBlob= myBlob.call ? myBlob.bind(self) : Blob ;
    
    var blob = html instanceof myBlob ? html :  new myBlob([html], {type: type}) ;

    var anchor = document.createElement("a")
    anchor.href = self.URL.createObjectURL(blob);
    anchor.type = type;
    anchor.target = target;
    anchor.click();
    document.body.appendChild(anchor);
    document.body.removeChild(anchor);

  }
}

