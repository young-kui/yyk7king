window.onload = function(){
    document.querySelector("#get").addEventListener("click", btn_get);
    document.querySelector("#clear").addEventListener("click", btn_clear);
}

let count = 0,
    timer,
    myArr = [], //처음에 한번만 받아오게
    topArr = []; // top 위치 저장하는 배열

const data_request = (count) => {
    let xmlhttp = new XMLHttpRequest(),
        url = "data.json";

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            myArr = JSON.parse(this.responseText);
            data_append(myArr, count);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

const data_append = (arr, count) => {
    let arr_slice = arr.slice(4*count, 4*(count+1));

    arr_slice.forEach(function(item){
        let dom_img = document.createElement("img"),
            dom_div = document.createElement("div");

        const len = document.querySelectorAll('.list div').length,
              dom_div_id = 'list'+len;
        
        dom_div.id = dom_div_id;//혹시 id값으로 컨트롤 할까봐
        dom_div.style.top = len >= 4 ? topArr[len - 4]+'px' : 0; // top 위치 구하는..
        dom_img.src = item;
        dom_div.appendChild(dom_img);
        document.querySelector("#list").appendChild(dom_div);
        dom_img.onload = function(){
            topArr[len] = dom_div.offsetTop + dom_div.clientHeight + 15;
        };
    });
}

const btn_get = () => {
    if (timer) {
        clearTimeout(timer);
    }
    
    timer = setTimeout(function(){
        count === 0 ? data_request(count) : data_append(myArr, count);
        count++;
    },100);
}

const btn_clear = () => {
    let ele_div = document.querySelectorAll(".list div");
    count = 0;
    ele_div.forEach(function(item){
        item.parentNode.removeChild(item);
    });
}

$(window).scroll(function(){
    let dh = $(document).height(),
        wh = $(window).height(),
        wt = $(window).scrollTop();
    if( dh === wh + wt){
        document.querySelector("#get").click();
    }
})
