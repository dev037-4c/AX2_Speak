// AX2 실시간 번역·자막 생성 인터페이스 JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // 입자 효과
    const particlesCanvas = document.getElementById('particles-canvas');
    if (particlesCanvas) {
        const pCtx = particlesCanvas.getContext('2d');
        particlesCanvas.width = window.innerWidth;
        particlesCanvas.height = window.innerHeight;
        
        const particles = [];
        const particleCount = 30;
        
        class Particle {
            constructor() {
                this.x = Math.random() * particlesCanvas.width;
                this.y = Math.random() * particlesCanvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedX = (Math.random() - 0.5) * 0.3;
                this.speedY = (Math.random() - 0.5) * 0.3;
                this.opacity = Math.random() * 0.3 + 0.1;
                const colors = [
                    'rgba(33, 150, 243, 0.2)',
                    'rgba(156, 39, 176, 0.2)',
                    'rgba(233, 30, 99, 0.2)'
                ];
                this.color = colors[Math.floor(Math.random() * colors.length)];
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                if (this.x < 0 || this.x > particlesCanvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > particlesCanvas.height) this.speedY *= -1;
            }
            
            draw() {
                pCtx.fillStyle = this.color;
                pCtx.globalAlpha = this.opacity;
                pCtx.beginPath();
                pCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                pCtx.fill();
            }
        }
        
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
        
        function animateParticles() {
            pCtx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
            
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            
            requestAnimationFrame(animateParticles);
        }
        
        animateParticles();
        
        window.addEventListener('resize', () => {
            particlesCanvas.width = window.innerWidth;
            particlesCanvas.height = window.innerHeight;
        });
    }
    
    // Confetti 효과
    const confettiCanvas = document.getElementById('confetti-canvas');
    if (confettiCanvas) {
        const cCtx = confettiCanvas.getContext('2d');
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
        
        const confetti = [];
        const confettiCount = 20;
        
        class Confetti {
            constructor() {
                this.x = Math.random() * confettiCanvas.width;
                this.y = -10;
                this.vx = (Math.random() - 0.5) * 2;
                this.vy = Math.random() * 2 + 1;
                this.size = Math.random() * 4 + 2;
                this.rotation = Math.random() * Math.PI * 2;
                this.rotationSpeed = (Math.random() - 0.5) * 0.1;
                this.opacity = Math.random() * 0.5 + 0.3;
                const colors = [
                    'rgba(33, 150, 243, 0.3)',
                    'rgba(156, 39, 176, 0.3)',
                    'rgba(233, 30, 99, 0.3)',
                    'rgba(255, 215, 0, 0.3)'
                ];
                this.color = colors[Math.floor(Math.random() * colors.length)];
            }
            
            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.rotation += this.rotationSpeed;
                this.vy += 0.05;
            }
            
            draw() {
                cCtx.save();
                cCtx.globalAlpha = this.opacity;
                cCtx.translate(this.x, this.y);
                cCtx.rotate(this.rotation);
                cCtx.fillStyle = this.color;
                cCtx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
                cCtx.restore();
            }
            
            isDead() {
                return this.y > confettiCanvas.height;
            }
        }
        
        function createConfetti() {
            if (confetti.length < confettiCount) {
                confetti.push(new Confetti());
            }
        }
        
        function animateConfetti() {
            cCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
            
            confetti.forEach((c, index) => {
                c.update();
                c.draw();
                if (c.isDead()) {
                    confetti.splice(index, 1);
                }
            });
            
            if (Math.random() < 0.1) {
                createConfetti();
            }
            
            requestAnimationFrame(animateConfetti);
        }
        
        animateConfetti();
        
        window.addEventListener('resize', () => {
            confettiCanvas.width = window.innerWidth;
            confettiCanvas.height = window.innerHeight;
        });
    }
    
    // 드래그 앤 드롭
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const translationModal = document.getElementById('translationModal');
    const modalBackdrop = document.getElementById('modalBackdrop');
    const closeTranslationModal = document.getElementById('closeTranslationModal');
    const videoPreviewSection = document.getElementById('videoPreviewSection');
    const videoThumbnail = document.getElementById('videoThumbnail');
    const thumbnailVideo = document.getElementById('thumbnail-video');
    const thumbnailCanvas = document.getElementById('thumbnail-canvas');
    const videoDuration = document.getElementById('videoDuration');
    const videoTitle = document.getElementById('videoTitle');
    
    // 전역 변수
    let currentVideoFile = null;
    let currentVideoUrl = null;
    
    // dropZone이 존재하는지 확인하고 이벤트 리스너 추가
    if (!dropZone) {
        console.error('dropZone 요소를 찾을 수 없습니다.');
    } else {
        // 클릭으로 업로드 - 드롭존 빈 공간 클릭 시 파일 선택
        dropZone.addEventListener('click', (e) => {
            // 링크 입력 필드, 업로드 버튼, 정보 영역을 클릭한 경우는 파일 선택 대화상자 열지 않음
            const clickedLinkInput = e.target.closest('#linkInput') || e.target.id === 'linkInput';
            const clickedUploadBtn = e.target.closest('#uploadBtn') || e.target.id === 'uploadBtn' || e.target.closest('.upload-btn');
            const clickedInfo = e.target.closest('.drop-zone-info') || e.target.closest('.drop-zone-info *');
            const clickedPlatformLogo = e.target.closest('.platform-logo') || e.target.closest('.platform-logos');
            
            // 위 요소들을 클릭하지 않은 경우에만 파일 선택 대화상자 열기
            if (!clickedLinkInput && !clickedUploadBtn && !clickedInfo && !clickedPlatformLogo) {
                e.preventDefault();
                e.stopPropagation();
                if (fileInput) {
                    fileInput.click();
                }
            }
        });
        
        // 드롭존에 커서 포인터 스타일 추가 (클릭 가능함을 표시)
        dropZone.style.cursor = 'pointer';
        
        // 드래그 앤 드롭 기능 강화
        let dragCounter = 0;
        
        // 드래그 진입
        dropZone.addEventListener('dragenter', (e) => {
            e.preventDefault();
            e.stopPropagation();
            dragCounter++;
            
            // 파일이 드래그되는 경우에만 스타일 적용
            if (e.dataTransfer.types.includes('Files')) {
                dropZone.classList.add('drag-over');
            }
        });
        
        // 드래그 오버 (드래그 중)
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // 드롭 효과 설정
            if (e.dataTransfer.types.includes('Files')) {
                e.dataTransfer.dropEffect = 'copy';
                dropZone.classList.add('drag-over');
            } else {
                e.dataTransfer.dropEffect = 'none';
            }
        });
        
        // 드래그 리브 (드래그 영역 벗어남)
        dropZone.addEventListener('dragleave', (e) => {
            e.preventDefault();
            e.stopPropagation();
            dragCounter--;
            
            // 모든 드래그가 끝났을 때만 스타일 제거
            if (dragCounter === 0) {
                dropZone.classList.remove('drag-over');
            }
        });
        
        // 드롭
        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            e.stopPropagation();
            dragCounter = 0;
            dropZone.classList.remove('drag-over');
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                const file = files[0];
                
                // 여러 파일이 드롭된 경우 경고
                if (files.length > 1) {
                    alert('한 번에 하나의 영상 파일만 업로드할 수 있습니다.\n첫 번째 파일만 처리됩니다.');
                }
                
                // 파일 처리 (번역 설정 팝업 자동 표시)
                handleFile(file);
            } else {
                // 파일이 없는 경우 (예: 텍스트 드래그)
                console.log('드롭된 파일이 없습니다.');
            }
        });
        
        // 전체 문서에서 드래그가 끝났을 때 스타일 제거 (안전장치)
        document.addEventListener('dragend', () => {
            dragCounter = 0;
            dropZone.classList.remove('drag-over');
        });
    }
    
    // 파일 선택
    if (fileInput) {
        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                handleFile(e.target.files[0]);
            }
        });
    }
    
    // 지원하는 비디오 파일 확장자
    const allowedVideoExtensions = ['.mp4', '.mov', '.avi', '.webm', '.mpeg', '.mpg', '.mkv', '.flv', '.wmv'];
    const allowedVideoTypes = ['video/mp4', 'video/mpeg', 'video/quicktime', 'video/x-msvideo', 'video/webm', 'video/x-matroska', 'video/x-flv', 'video/x-ms-wmv'];
    
    // 파일이 비디오인지 확인하는 함수
    function isValidVideoFile(file) {
        // MIME 타입 확인
        if (!file.type || !file.type.startsWith('video/')) {
            return false;
        }
        
        // 지원하는 MIME 타입 확인
        if (!allowedVideoTypes.some(type => file.type.includes(type.split('/')[1]))) {
            // 확장자로 추가 확인
            const fileName = file.name.toLowerCase();
            const hasValidExtension = allowedVideoExtensions.some(ext => fileName.endsWith(ext));
            if (!hasValidExtension) {
                return false;
            }
        }
        
        return true;
    }
    
    // 파일 처리 함수
    function handleFile(file) {
        // 파일 크기 확인 (2GB 제한)
        const maxSize = 2 * 1024 * 1024 * 1024; // 2GB in bytes
        if (file.size > maxSize) {
            alert('파일 크기가 2GB를 초과합니다.\n지원 형식: MP4, MOV, AVI 최대 2GB');
            return;
        }
        
        // 비디오 파일인지 확인
        if (!isValidVideoFile(file)) {
            alert('영상 파일만 업로드 가능합니다.\n지원 형식: MP4, MOV, AVI, WEBM, MPEG, MKV, FLV, WMV');
            return;
        }
        
        // 파일 정보 저장
        currentVideoFile = file;
        currentVideoUrl = URL.createObjectURL(file);
        
        // 파일 정보 업데이트
        const fileName = file.name;
        const fileDate = new Date().toLocaleString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
        
        // 비디오 제목 업데이트
        if (videoTitle) {
            videoTitle.textContent = fileName.replace(/\.[^/.]+$/, '') + ' ' + fileDate;
        }
        
        // 비디오 썸네일 생성
        generateVideoThumbnail(currentVideoUrl, file);
        
        // 번역 설정 모달 표시 (드래그 앤 드롭 또는 파일 선택 시 자동으로 표시)
        setTimeout(() => {
            showTranslationModal();
        }, 300); // 썸네일 생성 후 모달 표시
    }
    
    // 비디오 썸네일 생성 함수
    function generateVideoThumbnail(videoUrl, file) {
        if (!videoPreviewSection || !videoThumbnail || !thumbnailVideo || !thumbnailCanvas) {
            return;
        }
        
        // 비디오 미리보기 섹션 표시
        videoPreviewSection.style.display = 'block';
        
        // 비디오 요소 설정
        thumbnailVideo.src = videoUrl;
        thumbnailVideo.load();
        
        thumbnailVideo.addEventListener('loadedmetadata', function() {
            // 비디오 길이 업데이트
            const duration = thumbnailVideo.duration;
            if (videoDuration) {
                const minutes = Math.floor(duration / 60);
                const seconds = Math.floor(duration % 60);
                videoDuration.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }
            
            // 첫 프레임을 썸네일로 생성
            thumbnailVideo.currentTime = 0.1; // 0.1초 지점의 프레임 사용
        });
        
        thumbnailVideo.addEventListener('seeked', function() {
            // Canvas에 비디오 프레임 그리기
            const ctx = thumbnailCanvas.getContext('2d');
            thumbnailCanvas.width = thumbnailVideo.videoWidth;
            thumbnailCanvas.height = thumbnailVideo.videoHeight;
            ctx.drawImage(thumbnailVideo, 0, 0, thumbnailCanvas.width, thumbnailCanvas.height);
            
            // Canvas를 이미지로 변환하여 썸네일 배경으로 설정
            const thumbnailUrl = thumbnailCanvas.toDataURL('image/jpeg');
            videoThumbnail.style.backgroundImage = `url(${thumbnailUrl})`;
            videoThumbnail.style.backgroundSize = 'cover';
            videoThumbnail.style.backgroundPosition = 'center';
        });
        
        // 에러 처리
        thumbnailVideo.addEventListener('error', function() {
            // 비디오 로드 실패 시 기본 그라데이션 유지
            console.error('비디오 썸네일 생성 실패');
        });
    }
    
    // 번역 설정 모달 표시 함수
    function showTranslationModal() {
        if (translationModal) {
            translationModal.style.display = 'flex';
            // 페이드인 애니메이션
            setTimeout(() => {
                translationModal.style.opacity = '0';
                translationModal.style.transition = 'opacity 0.3s ease';
                setTimeout(() => {
                    translationModal.style.opacity = '1';
                }, 10);
            }, 10);
        }
    }
    
    // 번역 설정 모달 닫기 함수
    function closeTranslationModalFunc() {
        if (translationModal) {
            translationModal.style.opacity = '0';
            translationModal.style.transition = 'opacity 0.3s ease';
            setTimeout(() => {
                translationModal.style.display = 'none';
            }, 300);
        }
    }
    
    // 모달 닫기 이벤트
    if (closeTranslationModal) {
        closeTranslationModal.addEventListener('click', closeTranslationModalFunc);
    }
    
    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', closeTranslationModalFunc);
    }
    
    // 비디오 탭 전환
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
    
    // 언어 칩 제거
    const languageChips = document.querySelectorAll('.language-chip');
    languageChips.forEach(chip => {
        chip.addEventListener('click', (e) => {
            if (e.target.classList.contains('fa-times')) {
                chip.remove();
            }
        });
    });
    
    // 언어 추가 모달
    const addLanguageBtn = document.querySelector('.add-language-btn');
    const languageModal = document.getElementById('languageModal');
    const closeModal = document.getElementById('closeModal');
    const modalLanguageItems = document.querySelectorAll('.modal-language-item');
    
    addLanguageBtn.addEventListener('click', () => {
        languageModal.style.display = 'flex';
    });
    
    closeModal.addEventListener('click', () => {
        languageModal.style.display = 'none';
    });
    
    languageModal.addEventListener('click', (e) => {
        if (e.target === languageModal) {
            languageModal.style.display = 'none';
        }
    });
    
    // 모달에서 언어 선택
    modalLanguageItems.forEach(item => {
        item.addEventListener('click', () => {
            const lang = item.dataset.lang;
            const langName = item.querySelector('span').textContent;
            
            // 이미 추가된 언어인지 확인
            const existingChips = Array.from(document.querySelectorAll('.language-chip'));
            const alreadyAdded = existingChips.some(chip => chip.dataset.lang === lang);
            
            if (!alreadyAdded) {
                const chip = document.createElement('div');
                chip.className = 'language-chip';
                chip.dataset.lang = lang;
                chip.innerHTML = `
                    <span>${langName}</span>
                    <i class="fas fa-times"></i>
                `;
                
                chip.addEventListener('click', (e) => {
                    if (e.target.classList.contains('fa-times')) {
                        chip.remove();
                    }
                });
                
                addLanguageBtn.parentElement.insertBefore(chip, addLanguageBtn);
                languageModal.style.display = 'none';
            }
        });
    });
    
    // Translate Now 버튼
    const translateBtn = document.getElementById('translateBtn');
    translateBtn.addEventListener('click', () => {
        // 번역 시작 애니메이션
        translateBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            translateBtn.style.transform = 'scale(1)';
        }, 150);
        
        // 실제 번역 로직은 여기에 구현
        console.log('번역이 시작되었습니다');
    });
    
    // 스크롤 시 네비게이션 효과
    let lastScroll = 0;
    const nav = document.querySelector('.glass-nav');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 50) {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
            nav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.8)';
            nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
        }
        lastScroll = currentScroll;
    });
    
    // Floating 애니메이션
    const floatingElements = document.querySelectorAll('.upload-icon, .logo-circle');
    floatingElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            this.style.animation = 'float-icon 2s ease-in-out infinite';
        });
    });
    
    // 사이드바 아이템 클릭 이벤트
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    sidebarItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // 모든 아이템에서 active 제거
            sidebarItems.forEach(i => i.classList.remove('active'));
            
            // 클릭한 아이템에 active 추가
            item.classList.add('active');
            
            // 페이지 전환 로직 (필요시 구현)
            const page = item.dataset.page;
            console.log(`${page} 페이지로 이동`);
        });
    });
});