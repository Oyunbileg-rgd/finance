// дэлгэцтэй ажиллах контроллер
var uicontroller = (function(){
    var domstrings = {
        inputtype: '.add__type',
        inputdescription: '.add__description' ,
        inputvalue:'.add__value',
        addbtn: '.add__btn'
    };
    return {
        geninput: function(){
         return{  
             type: document.querySelector(domstrings.inputtype).value,
             description: document.querySelector(domstrings.inputdescription).value,
             value: document.querySelector(domstrings.inputvalue).value
            };
        },
        getdomstrings: function(){
           return domstrings;
        }
    };
})();
// санхүүтэй холбогч контроллер
var financecontroller = (function(){
    var income = function(id, description, value){
        this.id=id;
        this.description=description;
        this.value=value;
      };
      var expense = function(id, descrioption, value){
        this.id=id;
        this.descrioption=descrioption;
        this.value=value;
      };
      var data = {
        allitems: {
            inc : [],
            exp : []
        },
        totals: {
            inc : 0,
            exp : 0
        }
      };
      return {
        additem: function(type, desc, val){
            var item, id=1;
            if(data.allitems[type].lenght===0) id=1;
            else{
              id = data.allitems[type][data.allitems[type].length-1].id + 1;
            }
            
            if(type==='ínc'){
                item=new income(id, desc, val);
            }else{
                item=new expense(id, desc, val);
            }
            data.allitems[type].push(item);
        }
      }
})();
// програмын холбогч контроллер
var appcontroller = (function(){
    var ctradditem = function(){
        //  1. оруулах өгөгдлийг дэлгэцээс олж авна
        var input = uicontroller.geninput();
        //  2. олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулж тэнд хадгална
        financecontroller.additem(input.type, input.description, input.value);
        //  3. олж авсан өгөдлүүдээ вэб дээрээ тохирох хэсэгт нь гаргана
        //  4. төсвийг тоцоолно
        //  5. эцсийн үлдэгдэл, тооцоог дэлгэцэнд гаргана. 
    };
    var setupeventlistner = function(){
        var dom = uicontroller.getdomstrings();
        document.querySelector(dom.addbtn).addEventListener('click',function(){
            ctradditem();
        });
        document.addEventListener('keypress', function(event){
            if(event.keyCode===13 || event.which === 13) {
                ctradditem();
            }
        });
    } ;

    return {
        init : function(){
            setupeventlistner();
        }
    }
})(uicontroller, financecontroller);
appcontroller.init();