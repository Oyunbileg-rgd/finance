// дэлгэцтэй ажиллах контроллер
var uicontroller = (function(){
    var domstrings = {
        inputtype: '.add__type',
        inputdescription: '.add__description' ,
        inputvalue:'.add__value',
        addbtn: '.add__btn',
        inclist: ".income__list",
        explist: '.expenses__list'
    };
    return {
        getinput: function(){
         return{  
             type: document.querySelector(domstrings.inputtype).value,
             description: document.querySelector(domstrings.inputdescription).value,
             value: document.querySelector(domstrings.inputvalue).value
            };
        },
        getdomstrings: function(){
           return domstrings;
        },
        ClearFields:function(){
            var fields = document.querySelectorAll(domstrings.inputdescription + ',' + domstrings.inputvalue);
            var fieldarr=Array.prototype.slice.call(fields);
           fieldarr.forEach(function(el){
            el.value = " ";
           });
           fieldarr[0].focus();
        },
        addlistitem: function(item, type){
            // Орлого зарлагын элементийг агуулсан HTML-ийг бэлтгэнэ
            var html, list;
            if (type === "inc"){
                list=domstrings.inclist;
                html='<div class="item clearfix" id="income-%ID%"><div class="item__description">$DESCRIPTION$</div><div class="right clearfix"><div class="item__value">$VALUE$</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }else{
                list=domstrings.explist;
                html='<div class="item clearfix" id="expense-%ID%"><div class="item__description">$DESCRIPTION$</div> <div class="right clearfix"> <div class="item__value">$VALUE$</div><div class="item__percentage">21%</div> <div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div> </div>'
            }
            // Тэр HTML дотроо орлого зарлагын утгыг replace ашиглаж өөрчилнө
            html=html.replace('%ID%', item.id);
            html= html.replace('$DESCRIPTION$', item.description);
            html= html.replace('$VALUE$', item.value);
            // Бэлтгэсэн  HTML- ээ  DOM руу хийж өгнө
            document.querySelector(list).insertAdjacentHTML('beforeend', html);
        }
    };
})();
// санхүүтэй холбогч контроллер
var financecontroller = (function(){
    var income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
      };
      var expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
      };
      var data = {
        items: {
            inc: [],
            exp: []
        },
        totals: {
            inc: 0,
            exp: 0
        }
      };
      return {
        additem: function(type, desc, val){
            var item, id;
            if(data.items[type].length===0) id=1;
            else{
              id = data.items[type][data.items[type].length-1].id+1;
            }
            
            if(type==='inc'){
                item=new income(id, desc, val);
            }else{
                item=new expense(id, desc, val);
            }
            data.items[type].push(item);
            return item;
        },
        seeData: function() {
            return data;
          }
      };
})();
// програмын холбогч контроллер
var appcontroller = (function(uicontroller, financecontroller){
    var ctradditem = function(){
        //  1. оруулах өгөгдлийг дэлгэцээс олж авна
        var input = uicontroller.getinput();
        //  2. олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулж тэнд хадгална
       var item = financecontroller.additem(input.type, input.description, input.value);
        //  3. олж авсан өгөдлүүдээ вэб дээрээ тохирох хэсэгт нь гаргана
        uicontroller.addlistitem(item, input.type);
        uicontroller.ClearFields();
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
            };
        });
    } ;

    return {
        init : function(){
            setupeventlistner();
        }
    }
})(uicontroller, financecontroller);
appcontroller.init();