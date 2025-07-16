$(function() {
    let isRecording = false;
    let recordPlugin;
    let micWaveSurfer;
    let timerInterval = null;
    let startTime = 0;
    let totalRecordedTime = 0; // 누적 녹음 시간
    let chunks = [];
    
    const micContainer = document.getElementById("waveform");
    const recordBtn = document.querySelector(".record-btn");
    const stopBtn = document.querySelector(".pause-btn");
    const timeDisplay = document.querySelector(".recording-time strong");
    
    // 마이크 파형용 wavesurfer 인스턴스
    micWaveSurfer = WaveSurfer.create({
        container: micContainer,
        height: 300,
        waveColor: "#A7B5BC",
        progressColor: '#A7B5BC',
        cursorColor: '#32D074',
        cursorWidth: 1,
        barWidth: 3,
        barMinHeight: 3,
        barGap: 2,
        barRadius: 2,
        scrollParent: true,
        minPxPerSec: 5,
        dragToSeek: true,
        hideScrollbar: true,
        autoplay: false,
        autoScroll: true,
        // autoCenter: true, 녹음 중엔 작동안함
        // sampleRate: 44100,
    });
    
    // record 플러그인 등록
    recordPlugin = micWaveSurfer.registerPlugin(
        WaveSurfer.Record.create({
            renderRecordedAudio: false,
            // continuousWaveform: true,
            scrollingWaveform: true,
            // continuousWaveformDuration: 10, // 최근 10초까지만 누적 파형을 표시
            scrollingWaveformWindow: 5, // 최근 5초만 보여줌
            mediaRecorderTimeslice: 1000, // 1초마다 chunk로 나눠서 처리
        })
    );
    
    // 녹음 종료 시 blob 수집
    recordPlugin.on("record-end", (blob) => {
        chunks.push(blob); // 이어붙이기 위해 저장
        console.log("녹음 chunk 저장됨", blob);
    });
    
    // 초기 상태: Stop, Save 버튼 숨김
    stopBtn.classList.remove("on");
    // if (saveBtn) saveBtn.classList.remove("on");
    
    // 시간 포맷
    function formatTime(ms) {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const hundredths = Math.floor((ms % 1000) / 10);
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(hundredths).padStart(2, '0')}`;
    }
    
    // Record 버튼 클릭 시
    recordBtn.onclick = () => {
        recordPlugin.startRecording().then(() => {
            console.log("🔴 녹음 시작");
    
            isRecording = true;
            recordBtn.classList.remove("on");
            stopBtn.classList.add("on");
    
            // 이어서 시간 계산
            startTime = Date.now() - totalRecordedTime;
    
            // 타이머 시작
            timerInterval = setInterval(() => {
                const elapsed = Date.now() - startTime;
                timeDisplay.textContent = formatTime(elapsed);
            }, 30);
        });
    };
    
    // Stop 버튼 클릭 시
    stopBtn.onclick = () => {
        recordPlugin.stopRecording();
        isRecording = false;
        console.log("⏹️ 녹음 정지");
    
        stopBtn.classList.remove("on");
        recordBtn.classList.add("on");
    
        // 누적 시간 저장
        totalRecordedTime = Date.now() - startTime;
    
        // 타이머 정지 (시간은 유지)
        clearInterval(timerInterval);
    };
});