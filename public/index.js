// document.querySelector('body').addEventListener('click', function(event) {
//     if (event.target.tagName.toLowerCase() === 'button') {
//         if(event.target.attributes.id.nodeValue === 'get'){
//             document.getElementById("get").addEventListener("click", btn_get);
//         }
//         if(event.target.attributes.id.nodeValue === 'clear'){
//             document.getElementById("clear").addEventListener("click", btn_clear);
//         }
//     }
// },true);

window.onload = function(){
    document.getElementById("get").addEventListener("click", btn_get);
    document.getElementById("clear").addEventListener("click", btn_clear);
}

let count = 0,
    timer;

function data_request(count){
    let xmlhttp = new XMLHttpRequest(),
        url = "data.json";

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let myArr = JSON.parse(this.responseText);
            
            data_append(myArr, count);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function data_append(arr, count) {
    let arr_slice = arr.slice(4*(count - 1), 4*count);

    arr_slice.forEach(function(item){
        let dom_img = document.createElement("img"),
            dom_div = document.createElement("div"),
            dom_div_all = document.querySelectorAll('.list div'),
            dom_div_id = 'list'+dom_div_all.length;
        
        dom_div.id = dom_div_id;
        dom_img.src = item;
        dom_div.appendChild(dom_img);
        document.getElementById("list").appendChild(dom_div);
        dom_img.onload = function(){
            dom_div.style.height = dom_div.clientHeight+'px';
            
            
        };
       
    });

   
   

}

function btn_get(){
    if (timer) {
        clearTimeout(timer);
    }
    
    timer = setTimeout(function(){
        count++;
        data_request(count);
    },100);
}

function btn_clear(){
    let ele_div = document.querySelectorAll(".list div");
    count = 0;
    ele_div.forEach(function(item){
        item.parentNode.removeChild(item);
    });
}
