
        // URL에서 비디오 ID 가져오기
        const urlParams = new URLSearchParams(window.location.search);
        const videoId = urlParams.get('id');

        let currentVideo = null;
        let transcriptions = [];
        let currentLang = 'ko';
        let isPlaying = false;
        let currentTime = 0;
        let videoDuration = 59; // 초 단위
        let videoPlayer = null;
        let currentTab = 'original'; // 'original' or 'translation'
        let isMuted = false;
        let playbackRate = 1.0;
        let showSubtitles = true;

        // 데이터 로드
        function loadVideoData() {
            const savedVideos = JSON.parse(localStorage.getItem('savedVideos') || '[]');
            currentVideo = savedVideos.find(v => v.id === videoId);
            
            if (!currentVideo) {
                alert('강의를 찾을 수 없습니다.');
                window.location.href = 'mypage.html';
                return;
            }

            // 제목 설정
            document.getElementById('video-title').value = currentVideo.title || '강의 제목';

            // 샘플 트랜스크립션 데이터 생성
            transcriptions = currentVideo.transcriptions || generateSampleTranscriptions();
            
            renderTranscriptions();
            
            // 비디오 플레이어 초기화
            initializeVideoPlayer();
        }
        
        // 비디오 플레이어 초기화
        function initializeVideoPlayer() {
            videoPlayer = document.getElementById('video-player');
            const placeholder = document.getElementById('video-placeholder');
            
            if (!videoPlayer) return;
            
            // 비디오 URL 설정 (로컬 스토리지에서 가져온 비디오 URL 사용)
            if (currentVideo && currentVideo.videoUrl) {
                videoPlayer.src = currentVideo.videoUrl;
            } else if (currentVideo && currentVideo.file) {
                // File 객체인 경우
                const url = URL.createObjectURL(currentVideo.file);
                videoPlayer.src = url;
            } else {
                // 비디오가 없으면 placeholder 표시
                if (placeholder) {
                    placeholder.style.display = 'flex';
                }
                return;
            }
            
            // 비디오 메타데이터 로드
            videoPlayer.addEventListener('loadedmetadata', () => {
                videoDuration = videoPlayer.duration;
                updateProgress();
            });
            
            // 비디오 시간 업데이트
            videoPlayer.addEventListener('timeupdate', () => {
                currentTime = videoPlayer.currentTime;
                updateProgress();
                updateSubtitle();
            });
            
            // 비디오 재생 종료
            videoPlayer.addEventListener('ended', () => {
                isPlaying = false;
                const playBtn = document.getElementById('play-btn');
                if (playBtn) playBtn.textContent = '▶';
            });
            
            // 비디오 로드 오류
            videoPlayer.addEventListener('error', () => {
                if (placeholder) {
                    placeholder.style.display = 'flex';
                }
            });
        }

        // 샘플 트랜스크립션 생성
        function generateSampleTranscriptions() {
            return [
                {
                    id: 1,
                    speaker: '화자 1',
                    startTime: 0,
                    endTime: 3.41,
                    korean: '이 과자의 정체가 뭔지 아시는 분이 계시다면 제발 한 번만 도와주세요.',
                    english: 'If anyone knows what this snack is, please, just help me out, for once.'
                },
                {
                    id: 2,
                    speaker: '화자 1',
                    startTime: 3,
                    endTime: 9,
                    korean: '제가 저번에 두바이 초콜릿 맛을 과자를 하나를 얻어먹었는데 이게 이렇게 맛있을 줄 모르고 아무 데도 없이 껍데기를 버린 거예요.',
                    english: 'I tried a Dubai chocolate-flavored snack the other day, but I had no idea it would be this good, so I threw away the wrapper without thinking.'
                },
                {
                    id: 3,
                    speaker: '화자 1',
                    startTime: 9,
                    endTime: 15,
                    korean: '제가 기억하는 그 과자 맛을 똑같이 재현을 해볼게요. 먼저 이렇게 둥글고 짤막한 웨이퍼 재질의 과자였거든요.',
                    english: "I'll try to recreate the snack exactly as I remember. First, it was a round, short, wafer-textured snack."
                },
                {
                    id: 4,
                    speaker: '화자 1',
                    startTime: 15,
                    endTime: 19,
                    korean: '지금 여기에는 커피 크림이 채워져 있는데 그 과자에는 피스타치오 맛 크림이 채워져 있었거든요.',
                    english: 'Now, this one is filled with coffee cream, but that snack had a pistachio cream filling.'
                },
                {
                    id: 5,
                    speaker: '화자 1',
                    startTime: 19,
                    endTime: 23.10,
                    korean: '그래서 오늘은 피스타치오 맛 크림을 만들어서 이 과자에 채워넣어 볼게요.',
                    english: 'So today, I\'ll make a pistachio cream and fill this snack with it.'
                }
            ];
        }

        // 트랜스크립션 렌더링
        function renderTranscriptions() {
            const list = document.getElementById('transcription-list');
            
            list.innerHTML = transcriptions.map(segment => {
                const duration = (segment.endTime - segment.startTime).toFixed(2);
                const startTime = formatTime(segment.startTime);
                const endTime = formatTime(segment.endTime);
                
                return `
                    <div class="transcription-item" data-segment-id="${segment.id}">
                        <div class="segment-header">
                            <div class="speaker-icon">${segment.speaker.charAt(segment.speaker.length - 1)}</div>
                            <span class="speaker-name">${segment.speaker}</span>
                            <span class="timestamp">${startTime} - ${endTime} ${duration}sec</span>
                        </div>
                        <div class="text-content">
                            <div class="text-editor">
                                <div class="text-label">Korean</div>
                                <textarea class="text-input" data-lang="ko" data-segment-id="${segment.id}">${segment.korean}</textarea>
                            </div>
                            <div class="arrow-icon">→</div>
                            <div class="text-editor">
                                <div class="text-label">English</div>
                                <textarea class="text-input" data-lang="en" data-segment-id="${segment.id}">${segment.english}</textarea>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');

            // 텍스트 입력 이벤트
            document.querySelectorAll('.text-input').forEach(input => {
                input.addEventListener('input', function() {
                    const segmentId = parseInt(this.dataset.segmentId);
                    const lang = this.dataset.lang;
                    const segment = transcriptions.find(s => s.id === segmentId);
                    
                    if (segment) {
                        segment[lang === 'ko' ? 'korean' : 'english'] = this.value;
                    }
                });
            });
        }

        // 시간 포맷
        function formatTime(seconds) {
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            const ms = Math.floor((seconds % 1) * 100);
            return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
        }

        // 언어 탭 전환
        document.querySelectorAll('.lang-tab').forEach(tab => {
            tab.addEventListener('click', function() {
                document.querySelectorAll('.lang-tab').forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                currentLang = this.dataset.lang;
                // 자막 언어 업데이트
                updateSubtitle();
            });
        });

        // 비디오 탭 전환
        document.querySelectorAll('.video-tab').forEach(tab => {
            tab.addEventListener('click', function() {
                document.querySelectorAll('.video-tab').forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                currentTab = this.dataset.tab;
                updateVideoMode();
            });
        });
        
        // 비디오 모드 업데이트 (원본/번역)
        function updateVideoMode() {
            if (!videoPlayer) return;
            
            // 원본/번역 모드에 따라 자막 표시 여부 결정
            // 실제로는 원본 비디오와 번역 비디오를 전환해야 하지만,
            // 여기서는 자막 표시만 토글
            if (currentTab === 'translation') {
                showSubtitles = true;
            } else {
                showSubtitles = false;
                const subtitleText = document.getElementById('subtitle-text');
                if (subtitleText) subtitleText.textContent = '';
            }
        }

        // 재생 버튼
        const playBtn = document.getElementById('play-btn');
        if (playBtn) {
            playBtn.addEventListener('click', function() {
                if (!videoPlayer) return;
                
                if (videoPlayer.paused) {
                    videoPlayer.play();
                    isPlaying = true;
                    this.textContent = '⏸';
                } else {
                    videoPlayer.pause();
                    isPlaying = false;
                    this.textContent = '▶';
                }
            });
        }

        // 진행 바 클릭
        const progressBar = document.getElementById('progress-bar');
        if (progressBar) {
            progressBar.addEventListener('click', function(e) {
                if (!videoPlayer || !videoDuration) return;
                
                const rect = this.getBoundingClientRect();
                const percent = (e.clientX - rect.left) / rect.width;
                currentTime = videoDuration * percent;
                videoPlayer.currentTime = currentTime;
                updateProgress();
            });
        }

        // 진행 상태 업데이트
        function updateProgress() {
            if (!videoDuration) return;
            
            const percent = Math.min(100, Math.max(0, (currentTime / videoDuration) * 100));
            const progressFill = document.getElementById('progress-fill');
            const timeDisplay = document.getElementById('time-display');
            
            if (progressFill) {
                progressFill.style.width = percent + '%';
            }
            if (timeDisplay) {
                timeDisplay.textContent = formatTimeDisplay(currentTime);
            }
        }
        
        // 자막 업데이트
        function updateSubtitle() {
            if (!showSubtitles || !videoPlayer) {
                const subtitleText = document.getElementById('subtitle-text');
                if (subtitleText) subtitleText.textContent = '';
                return;
            }
            
            const currentTime = videoPlayer.currentTime;
            const subtitleText = document.getElementById('subtitle-text');
            
            if (!subtitleText) return;
            
            // 현재 시간에 맞는 자막 찾기
            const currentSegment = transcriptions.find(segment => {
                return currentTime >= segment.startTime && currentTime < segment.endTime;
            });
            
            if (currentSegment) {
                // 현재 선택된 언어에 따라 자막 표시
                const text = currentLang === 'ko' ? currentSegment.korean : currentSegment.english;
                subtitleText.textContent = text;
                subtitleText.style.opacity = '1';
            } else {
                subtitleText.style.opacity = '0';
            }
        }

        // 시간 표시 포맷
        function formatTimeDisplay(seconds) {
            const hours = Math.floor(seconds / 3600);
            const mins = Math.floor((seconds % 3600) / 60);
            const secs = Math.floor(seconds % 60);
            return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }

        // 변경사항 적용
        function applyChanges() {
            if (!currentVideo) return;

            // 제목 저장
            currentVideo.title = document.getElementById('video-title').value;

            // 트랜스크립션 저장
            currentVideo.transcriptions = transcriptions;
            currentVideo.updatedAt = new Date().toISOString();

            // 로컬 스토리지에 저장
            const savedVideos = JSON.parse(localStorage.getItem('savedVideos') || '[]');
            const index = savedVideos.findIndex(v => v.id === videoId);
            if (index !== -1) {
                savedVideos[index] = currentVideo;
                localStorage.setItem('savedVideos', JSON.stringify(savedVideos));
            }

            alert('변경사항이 적용되었습니다!');
        }

        // 제목 수정 모달
        const editTitleBtn = document.getElementById('edit-title-btn');
        const titleEditModal = document.getElementById('titleEditModal');
        const titleModalBackdrop = document.getElementById('titleModalBackdrop');
        const closeTitleModal = document.getElementById('closeTitleModal');
        const saveTitleBtn = document.getElementById('save-title-btn');
        const modalTitleInput = document.getElementById('modal-title-input');
        const videoTitleInput = document.getElementById('video-title');

        // 연필 아이콘 클릭 시 모달 열기
        if (editTitleBtn) {
            editTitleBtn.addEventListener('click', function() {
                if (titleEditModal && modalTitleInput) {
                    modalTitleInput.value = videoTitleInput.value;
                    titleEditModal.style.display = 'flex';
                    setTimeout(() => {
                        titleEditModal.style.opacity = '1';
                        modalTitleInput.focus();
                        modalTitleInput.select();
                    }, 10);
                }
            });
        }

        // 모달 닫기
        function closeTitleEditModal() {
            if (titleEditModal) {
                titleEditModal.style.opacity = '0';
                setTimeout(() => {
                    titleEditModal.style.display = 'none';
                }, 300);
            }
        }

        if (closeTitleModal) {
            closeTitleModal.addEventListener('click', closeTitleEditModal);
        }

        if (titleModalBackdrop) {
            titleModalBackdrop.addEventListener('click', closeTitleEditModal);
        }

        // 저장 버튼 클릭
        if (saveTitleBtn) {
            saveTitleBtn.addEventListener('click', function() {
                const newTitle = modalTitleInput.value.trim();
                if (newTitle) {
                    videoTitleInput.value = newTitle;
                    if (currentVideo) {
                        currentVideo.title = newTitle;
                        // 로컬 스토리지에 저장
                        const savedVideos = JSON.parse(localStorage.getItem('savedVideos') || '[]');
                        const index = savedVideos.findIndex(v => v.id === videoId);
                        if (index !== -1) {
                            savedVideos[index] = currentVideo;
                            localStorage.setItem('savedVideos', JSON.stringify(savedVideos));
                        }
                    }
                    closeTitleEditModal();
                } else {
                    alert('제목을 입력해주세요.');
                }
            });
        }

        // Enter 키로 저장
        if (modalTitleInput) {
            modalTitleInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    saveTitleBtn.click();
                }
            });
        }

        // 남은 시간 초기화 및 표시
        function initializeRemainingTime() {
            let remainingMinutes = parseInt(localStorage.getItem('remainingMinutes') || '0');
            
            if (remainingMinutes === 0 && !localStorage.getItem('timeInitialized')) {
                remainingMinutes = 100;
                localStorage.setItem('remainingMinutes', '100');
                localStorage.setItem('timeInitialized', 'true');
            }
            
            const remainingTimeEl = document.getElementById('remaining-time');
            if (remainingTimeEl) {
                remainingTimeEl.textContent = `${remainingMinutes}분 남음`;
            }
        }
        
        // 컨트롤 아이콘 기능 활성화
        const captionBtn = document.getElementById('caption-btn');
        const volumeBtn = document.getElementById('volume-btn');
        const speedBtn = document.getElementById('speed-btn');
        const fullscreenBtn = document.getElementById('fullscreen-btn');
        
        // 자막 ON/OFF
        if (captionBtn) {
            captionBtn.addEventListener('click', function() {
                showSubtitles = !showSubtitles;
                this.style.opacity = showSubtitles ? '1' : '0.5';
                if (!showSubtitles) {
                    const subtitleText = document.getElementById('subtitle-text');
                    if (subtitleText) subtitleText.textContent = '';
                } else {
                    updateSubtitle();
                }
            });
        }
        
        // 볼륨 ON/OFF
        if (volumeBtn && videoPlayer) {
            volumeBtn.addEventListener('click', function() {
                if (!videoPlayer) return;
                isMuted = !isMuted;
                videoPlayer.muted = isMuted;
                this.textContent = isMuted ? '🔇' : '🔊';
            });
        }
        
        // 재생 속도 변경
        const speedOptions = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];
        let speedIndex = 2; // 1.0
        
        if (speedBtn && videoPlayer) {
            speedBtn.addEventListener('click', function() {
                if (!videoPlayer) return;
                speedIndex = (speedIndex + 1) % speedOptions.length;
                playbackRate = speedOptions[speedIndex];
                videoPlayer.playbackRate = playbackRate;
                this.textContent = playbackRate + 'x';
            });
        }
        
        // 전체화면
        if (fullscreenBtn) {
            fullscreenBtn.addEventListener('click', function() {
                const videoContainer = document.querySelector('.video-container');
                if (!videoContainer) return;
                
                if (!document.fullscreenElement) {
                    videoContainer.requestFullscreen().catch(err => {
                        console.error('전체화면 오류:', err);
                    });
                } else {
                    document.exitFullscreen();
                }
            });
        }
        
        // 전체화면 변경 감지
        document.addEventListener('fullscreenchange', () => {
            const fullscreenIcon = document.getElementById('fullscreen-btn');
            if (fullscreenIcon) {
                fullscreenIcon.textContent = document.fullscreenElement ? '⛶' : '⛶';
            }
        });
        
        // 초기화
        initializeRemainingTime();
        
        if (videoId) {
            loadVideoData();
        } else {
            alert('강의 ID가 없습니다.');
            window.location.href = 'mypage.html';
        }
    