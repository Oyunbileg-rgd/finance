// дэлгэцтэй ажиллах контроллер
var uicontroller = (function(){
// санхүүтэй холбогч контроллер
})();
var financecontroller = (function(){

})();
// програмын холбогч контроллер
var appcontroller = (function(){
    var ctradditem = function(){

    };
    document.querySelector('.add__btn').addEventListener('click',function(){
        ctradditem();
        //  1. оруулах өгөгдлийг дэлгэцээс олж авна
        //  2. олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулж тэнд хадгална
        //  3. олж авсан өгөдлүүдээ вэб дээрээ тохирох хэсэгт нь гаргана
        //  4. төсвийг тоцоолно
        //  5. эцсийн үлдэгдэл, тооцоог дэлгэцэнд гаргана. 
    });
    document.addEventListener('keypress', function(event){
        if(event.keyCode===13 ) {
            ctradditem();
        }
    })
})(uicontroller, financecontroller);