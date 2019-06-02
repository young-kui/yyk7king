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

2. json data 가져오기 - data_request 함수 작성
    - my_arr변수에 json data 담기
    - data_append(my_arr, count)호출

3. GET DOGS - btn_get 함수 작성
    - 디바운싱 적용
    - 최초 버튼 클릭과 이후를 삼항 연산자로 표현 
        * data_request(count) : data_append(my_arr, count)
    - 버튼 클릭시 마다 count 증가


4. CLEAR DOGS - btn_clear 함수 작성
5. list 노출 - data_append 함수 작성
6. window_size 함수 작성