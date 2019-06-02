# 조건 정의
* GET DOGS 버튼 클릭시 리스트 호출
* CLEAR DOGS 버튼 클릭시 리스트 삭제
* http 리퀘스트를 이용해서 json data 가져오기
* Desktop view(>= 768px)에서는 한 열당 네 개의 시바견 이미지 노출
* Mobile view(< 768px)에서는 한 열당 한 개의 시바견 이미지 노출
* 시바견 이미지의 비율을 유지(crop이나 resize 불가능)
* 스크롤 페이징 구현

# 사용한 플러그인
* jquery-3.4.1.min.js

# 작업 순서
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
                * [0,1],[1,2],[2,3]... 순으로 가져오기 위해
    - 노출 될 엘리먼트만 append 하기
        1. div, img 태그 createElement
        2. 노출되는 리스트 index 
            * len = document.querySelectorAll('.list div').length : foreach안에서 노출되는 갯수로 파악
                - foreach의 index를 사용하지 않는 이유는 현재 노출되는 리스트 순번만 가져와 사용하지 않음
        3. id값은 혹시 제어 할 일이 생길까봐 생성
        4. #list에 append
        5. 노출 되는 리스트 배치를 위한 top값 구하기
            - len >= resize_count ? top_arr[len - resize_count]+'px' : 0 
            - 첫번째 열은 top = 0으로
            - 두번째 부터는 기존 열에 있는 위치값(offsetTop) + 높이값(clientHeight)로 구해 옴
            - dom_img.onload : 이미지가 로드 되기전에 정상적으로 엘리먼트의 높이값을 가져오오지 못하는 현상 해결
                * + 15 는 노출되는 리스트와 간격 사이를 벌이기 위해 추가


6. window_size 함수 작성
    - Desktop, Mobile에서 노출되는 갯수 정의


7. 스크롤 페이징 함수 작성
    - jquery로 구현

# 작업하면서 어려웠던 부분
    * top값을 계산 하는데 가장 크게 어려웠음. 
    * 이미 노출된 element 정보의 합을 배열로 만들면 될것이라고 생각은 했지만 ㅜ.ㅜ
    * img가 완전 로드 되기전에 element 높이값을 가져와 잘못된 수치를 가져오는 현상 발생
    * img 로드를 해결하기 위해 dom_img.onload = function(){}을 적용
    * 정상적으로 정보를 가져오는걸 확인 후 dom_img.onload = function(){} 안에서 배열을 만들면 되겠다고 생각ㅜ.ㅜ
    * 하지만 onload는 foreach에서 작동되고 있어서 배열 메소드들을 사용했지만 초기화 되는 문제가 발생
    * onload 안에서만 해결 할려고 했던 잘못된 판단으로 많은 시간을 소모

# 현 작업에서 개선 해야 할 점
    * Desktop, Mobile으로 구분하여 작업 완료했지만 완벽하게 반응형으로 구현 하지 못한점
        * 최초 진입이 mobile 모드이거나, desktop 모드일 경우는 정상적으로 작동하지만
        * 과제 확인 진행중 창을 줄였을 경우 정상적으로 위치값 계산이 안되는 점.
    * jquery를 사용하지 않기
        * es6문법으로 변경.
    * 요즘 코딩 트렌드 스타일 부분에서 아쉬움(뭔가 아직 jquery작업하던 느낌이 남아있는것 같음)

# 작업하면서 아쉬웠던 부분
    * 오랫동안 jquery를 사용하여 익숙하지 않는 es6 문법.
    * 최대한 es6 형태로 만들려고 했지만 미흡한 부분이 있음.
    * 아직 사용해보지 못한 레이아웃 구조 적용(하위 버전 브라우져를 사용하지 않는다면 사용 가능)
        * column-count, column-width, column-gap를 이용한 구조
        [참고 링크]: <https://codepen.io/egoing/pen/EgyBXd>
    
        

