$(function(){
    const wavesurfer = WaveSurfer.create({
        container: '#waveform',
        height: 167,
        waveColor: '#A7B5BC',
        progressColor: '#A7B5BC',
        cursorColor: '#32D074',
        cursorWidth: 1,
        url: '../assets/audio/test.mp3',
        barWidth: 3,
        barMinHeight: 3,
        barGap: 2,
        barRadius: 2,
        minPxPerSec: 50,
        dragToSeek: true,
        hideScrollbar: true,
        autoplay: false,
        autoScroll: true,
        autoCenter: true,
    });

    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        const milliseconds = Math.floor((time % 1) * 100);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
    }

    function updateTimeDisplay(time) {
        $(".recording-time strong").text(formatTime(time));
    }

    // 재생 버튼
    $(".play-btn").on("click", function(){
        wavesurfer.play();
        $(this).removeClass("on");
        $(this).siblings(".pause-btn").addClass("on");
    });

    // 일시정지 버튼 (재생 위치 유지)
    $(".pause-btn").on("click", function(){
        wavesurfer.pause();
        $(this).removeClass("on");
        $(this).siblings(".play-btn").addClass("on");
    });

    // 10초 뒤로 가기
    $(".skip-backward-btn").on("click", function(){
        const duration = wavesurfer.getDuration();
        const current = wavesurfer.getCurrentTime();
        const target = Math.max(current - 10, 0);
        wavesurfer.seekTo(target / duration);
        updateTimeDisplay(target); // 위치 이동 후 시간 수동 업데이트
    });

    // 10초 앞으로 가기
    $(".skip-forward-btn").on("click", function(){
        const duration = wavesurfer.getDuration();
        const current = wavesurfer.getCurrentTime();
        const target = Math.min(current + 10, duration);
        wavesurfer.seekTo(target / duration);
        updateTimeDisplay(target); // 위치 이동 후 시간 수동 업데이트
    });

    // 재생 중일 때는 실시간 시간 표시
    wavesurfer.on("audioprocess", function(time){
        updateTimeDisplay(time);
    });

    // 재생이 끝났을 때도 시간 표시를 종료 시점으로
    wavesurfer.on("finish", function(){
        updateTimeDisplay(wavesurfer.getDuration());
    });

    // 커서 이동 시 (정지 상태 포함) 시간 업데이트
    document.getElementById('waveform').addEventListener('mouseup', function () {
        // 마우스 업 후 약간의 지연을 두고 시간 업데이트 (WaveSurfer 내부 업데이트 이후 실행되게 함)
        setTimeout(() => {
            const time = wavesurfer.getCurrentTime();
            updateTimeDisplay(time);
        }, 50);
    });
});