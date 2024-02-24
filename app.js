// дэлгэцтэй ажиллах контроллер
var uicontroller = (function(){
    var domstrings = {
        inputtype: '.add__type',
        inputdescription: '.add__description' ,
        inputvalue:'.add__value',
        addbtn: '.add__btn',
        inclist: ".income__list",
        explist: '.expenses__list',
        tusuvlabel:'.budget__value',
        incomelabel:'.budget__income--value',
        expenselabel:'.budget__expenses--value',
        persentagelabel:'.budget__expenses--percentage',
        containetrDiv:'.container'
    };
    return {
        getinput: function(){
         return{  
             type: document.querySelector(domstrings.inputtype).value,
             description: document.querySelector(domstrings.inputdescription).value,
             value: parseInt(document.querySelector(domstrings.inputvalue).value)
            };
        },
        getdomstrings: function(){
           return domstrings;
        },
        ClearFields:function(){
            var fields = document.querySelectorAll(domstrings.inputdescription + ',' + domstrings.inputvalue);
            var fieldarr=Array.prototype.slice.call(fields);
           fieldarr.forEach(function(el,index, array){
            el.value = "";
           });
           fieldarr[0].focus();
        },
        tusviiguzuuleh:function(tusuv){
            document.querySelector(domstrings.tusuvlabel).textContent=tusuv.tusuv;
            document.querySelector(domstrings.incomelabel).textContent=tusuv.totalinc;
            document.querySelector(domstrings.expenselabel).textContent=tusuv.totalexp;
            if(tusuv.huvi !== 0){
                document.querySelector(domstrings.persentagelabel).textContent=tusuv.huvi + '%';
            }else  document.querySelector(domstrings.persentagelabel).textContent=tusuv.huvi ;
         
        },
        deletelistitem : function(id){
            var el = document.getElementById(id);
            el.parentNode.removeChild(el);
        },
        addlistitem: function(item, type){
            // Орлого зарлагын элементийг агуулсан HTML-ийг бэлтгэнэ
            var html, list;
            if (type === "inc"){
                list=domstrings.inclist;
                html='<div class="item clearfix" id="inc-%ID%"><div class="item__description">$DESCRIPTION$</div><div class="right clearfix"><div class="item__value">$VALUE$</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }else{
                list=domstrings.explist;
                html='<div class="item clearfix" id="exp-%ID%"><div class="item__description">$DESCRIPTION$</div> <div class="right clearfix"> <div class="item__value">$VALUE$</div><div class="item__percentage">21%</div> <div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div> </div>'
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

     var CalculateTotal=function(type){
        var sum=0
        data.items[type].forEach(function(el){
            sum=sum+el.value;
        });
        data.totals[type]=sum;
     };

      var data = {
        items: {
            inc: [],
            exp: []
        },
        totals: {
            inc: 0,
            exp: 0
        },
        tusuv:0,
        huvi:0
      };
      return {
        Tusuvtootsooloh:function(){
            CalculateTotal('inc');
            CalculateTotal('exp');
            data.tusuv = data.totals.inc-data.totals.exp;
            data.huvi = Math.round((data.totals.exp/data.totals.inc)*100);
        },
        tusuviigavah: function(){
            return{
                tusuv: data.tusuv,
                huvi: data.huvi,
                totalinc: data.totals.inc,
                totalexp:data.totals.exp
            }
        },
        DelelteItems:function(type, id){
            var ids=data.items[type].map(function(el){
                return el.id;
            });
            var index = ids.indexOf(id);
            if (index !== -1){
                data.items[type].splice(index, 1);
            }
        },
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
        if(input.description !== "" && input.value !== ""){
            //  2. олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулж тэнд хадгална
            var item = financecontroller.additem(input.type, input.description, input.value);
            //  3. олж авсан өгөдлүүдээ вэб дээрээ тохирох хэсэгт нь гаргана
            uicontroller.addlistitem(item, input.type);
            uicontroller.ClearFields();
            //  4. төсвийг тоцоолно
            financecontroller.Tusuvtootsooloh();
            //  5. эцсийн үлдэгдэл, 
            var tusuv=financecontroller.tusuviigavah();
            // 6. тооцоог дэлгэцэнд гаргана. 
            uicontroller.tusviiguzuuleh(tusuv);
        }    
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
        document.querySelector(dom.containetrDiv).addEventListener('click', function(event){
            var id=event.target.parentNode.parentNode.parentNode.parentNode.id;
            if(id){
                var arr = id.split('-');
                var type = arr[0];
                var itemId = parseInt(arr[1]);
                // 1. Санхүүгийн модулаас type, id -ийг ашиглаад устгана
                financecontroller.DelelteItems(type, itemId);
                // 2. Дэлгэцнээс энэ элементийг  устгана
                uicontroller.deletelistitem(id);
                // 3. Үлдэгдэл тооцоог шинэчилж харуулна
            };
        });
    } ;

    return {
        init : function(){
            uicontroller.tusviiguzuuleh({
                tusuv: 0,
                huvi: 0,
                totalinc: 0,
                totalexp:0
            });
            setupeventlistner();
        }
    }
})(uicontroller, financecontroller);
appcontroller.init();