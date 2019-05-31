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
            dom_li = document.createElement("li"),
            dom_li_all = document.querySelectorAll('.list li'),
            dom_li_count = 'list'+dom_li_all.length;
        
        dom_li.id = dom_li_count;
        dom_img.src = item;
        dom_li.appendChild(dom_img);
        document.getElementById("list").appendChild(dom_li);

        console.log(document.getElementById(dom_li_count).clientHeight);       
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
    let ele_ul = document.querySelectorAll(".list li");
    count = 0;
    ele_ul.forEach(function(item){
        item.parentNode.removeChild(item);
    });
}
