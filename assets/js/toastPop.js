$(function(){
    // 토스트 팝업
    let $tostMessage = $('.toast-pop');
    let $tostBtn = $('.toast-btn');

    function tostOn() {
        $tostMessage.addClass('active');
        setTimeout(function () {
            $tostMessage.removeClass('active');
        }, 3000);
    }

    // 버튼 연결 추후 제거
    $tostBtn.on('click', function () {
        tostOn();
    });
})