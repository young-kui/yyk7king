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
1. json data 가져오기 - data_request 함수 작성
2. GET DOGS - btn_get 함수 작성
3. CLEAR DOGS - btn_clear 함수 작성
4. list 노출 - data_append 함수 작성
5. window_size 함수 작성