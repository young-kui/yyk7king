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
    
    arr_slice.forEach(function(item, index){
        let dom_img = document.createElement("img"),
            dom_li = document.createElement("li");

        dom_img.src = item;
        dom_li.appendChild(dom_img);
        document.getElementById("list").appendChild(dom_li);

        console.log(dom_img);
    });
 console.log('adsf');   
    // let out = "",
    //     i;
    // for(i = 0; i < arr.length; i++) {
    //     out += '<li><img src="' + arr[i] + '"></li>';
    // }
    // document.getElementById("list").appendChild('<li>테스트1</li>');
    // document.getElementById("list").innerHTML = out;
}

function btn_get(e){
    if (timer) {
        clearTimeout(timer);
    }
    
    timer = setTimeout(function(){
        count++;
        data_request(count);
    },200);
    
}

function btn_clear(){
    let ele_ul = document.querySelectorAll(".list li");
    
    ele_ul.forEach(function(item){
        item.parentNode.removeChild(item);
    });
}