#조건 정의
* GET DOGS 버튼 클릭시 리스트 호출
* CLEAR DOGS 버튼 클릭시 리스트 삭제
* http 리퀘스트를 이용해서 json data 가져오기
* Desktop view(>= 768px)에서는 한 열당 네 개의 시바견 이미지 노출
* Mobile view(< 768px)에서는 한 열당 한 개의 시바견 이미지 노출
* 시바견 이미지의 비율을 유지(crop이나 resize 불가능)
* 스크롤 페이징 구현

#사용한 플러그인
* jquery-3.4.1.min.js

#작업 순서
1. 사용할 변수 선언
    - count : GET DOGS 클릭 수 
    - timer : 광클릭을 막기 위해(디바운싱)
    - my_arr : json data 처음에 한번만 받아오기
    - top_arr : top 위치 저장하는 배열
    - resize_count : 최초 Desktop, Mobile view 갯수


2. json data 가져오기 - data_request 함수 작성
    - my_arr변수에 json data 담기
    - data_append(my_arr, count)호출


3. GET DOGS - btn_get 함수 작성
    - 디바운싱 적용
    - 최초 버튼 클릭과 이후를 삼항 연산자로 표현 
        * count === 0 ? data_request(count) : data_append(my_arr, count);
    - 버튼 클릭시 마다 count 증가


4. CLEAR DOGS - btn_clear 함수 작성
    - 기존에 노출 됐던 리스트들을 삭제 하기 위해
      노출된 리스트 엘리먼트들 querySelectorAll로 가져와 foreach로 삭제처리


5. list 노출 - data_append 함수 작성
    - 버튼 클릭당 노출 갯수를 정하기 위해 slice메서드를 이용(Desktop, Mobile 공통으로 사용하기 위해)
        * arr_slice = arr.slice(resize_count*count, resize_count*(count+1));
            * Desktop 일 경우
                * [0,3],[4,7],[8,11]... 순으로 가져오기 위해
            * Mobile 일 경우 - 1개씩 노출
                * [0,1],[1,2],[1,2]... 순으로 가져오기 위해
    - 노출 될 엘리먼트만 append 하기
        1. div, img 태그 createElement
        2. 노출되는 리스트 index 
            * len = document.querySelectorAll('.list div').length : foreach안에서 노출되는 갯수로 파악
                - foreach의 index를 사용하지 않는 이유는 현재 노출되는 리스트 순번만 가져와 사용하지 않음
        3. id값은 혹시 제어 할 일이 생길까봐 생성
        4. 노출 되는 리스트 배치를 위한 top값 구하기
            - len >= resize_count ? top_arr[len - resize_count]+'px' : 0 
            - 첫번째 열은 top = 0으로
            - 두번째 부터는 기존 열에 있는 위치값(offsetTop) + 높이값(clientHeight)로 구해 옴
            - dom_img.onload : 이미지가 로드 되기전에 엘리먼트의 높이값을 가져오는 현상 해결하기 위해 사용
                *
        5. 준비한 값을 #list에 append


6. window_size 함수 작성