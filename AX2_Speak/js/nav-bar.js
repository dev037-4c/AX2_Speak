// 네비게이션 바 공통 컴포넌트
(function() {
    // 현재 페이지가 html 폴더 안에 있는지 확인
    const isInHtmlFolder = window.location.pathname.includes('/html/');
    const assetPath = isInHtmlFolder ? '../' : '';  // 자산(이미지 등) 경로
    const htmlPath = isInHtmlFolder ? '' : 'html/';  // html 파일 경로

    // 네비게이션 바 HTML 생성
    function createNavBar() {
        return `
    <nav class="glass-nav" style="position: sticky !important; top: 0 !important; z-index: 1000 !important; background: rgba(255, 255, 255, 0.95) !important; backdrop-filter: blur(30px) !important; border-bottom: 1px solid #E5E7EB !important; padding: 15px 0 !important; box-sizing: border-box !important; width: 100% !important; margin: 0 !important;">
        <div class="nav-content" style="max-width: 100% !important; margin: 0 auto !important; padding: 0 20px !important; display: flex !important; align-items: center !important; justify-content: space-between !important; box-sizing: border-box !important; width: 100% !important;">
            <div class="nav-left" style="display: flex !important; align-items: center !important; gap: 30px !important;">
                <div class="logo" onclick="location.href='${assetPath}index.html'" style="font-size: 28px !important; font-weight: bold !important; color: #FFC107 !important; cursor: pointer !important; white-space: nowrap !important; display: flex !important; align-items: center !important; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', 'SF Pro Display', sans-serif !important;">
                    <img src="${assetPath}assets/image/AX2_logo.png" alt="AX2" class="logo-img" style="height: 32px !important; width: auto !important; object-fit: contain !important; display: block !important; margin: 0 !important;">
                </div>
                <div class="service-tabs" style="display: flex !important; align-items: center !important; gap: 0 !important; background: transparent !important; border-radius: 0 !important; padding: 0 !important; overflow: visible !important; box-shadow: none !important;">
                    <a href="${assetPath}index.html" class="service-tab" data-page="index.html" style="padding: 10px 20px !important; border: none !important; background: transparent !important; color: #666666 !important; font-size: 16px !important; font-weight: 500 !important; cursor: pointer !important; white-space: nowrap !important; position: relative !important; border-radius: 0 !important; margin-right: 0 !important; text-decoration: none !important; display: flex !important; align-items: center !important; gap: 8px !important; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', 'SF Pro Display', sans-serif !important;">
                        <span>강의 번역</span>
                    </a>
                    <a href="${htmlPath}pricing.html" class="service-tab" data-page="pricing.html" style="padding: 10px 20px !important; border: none !important; background: transparent !important; color: #666666 !important; font-size: 16px !important; font-weight: 500 !important; cursor: pointer !important; white-space: nowrap !important; position: relative !important; border-radius: 0 !important; margin-right: 0 !important; text-decoration: none !important; display: flex !important; align-items: center !important; gap: 8px !important; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', 'SF Pro Display', sans-serif !important;">
                        <span>요금제/결제</span>
                    </a>
                    <a href="${htmlPath}used.html" class="service-tab" data-page="used.html" style="padding: 10px 20px !important; border: none !important; background: transparent !important; color: #666666 !important; font-size: 16px !important; font-weight: 500 !important; cursor: pointer !important; white-space: nowrap !important; position: relative !important; border-radius: 0 !important; margin-right: 0 !important; text-decoration: none !important; display: flex !important; align-items: center !important; gap: 8px !important; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', 'SF Pro Display', sans-serif !important;">
                        <span>사용방법</span>
                    </a>
                </div>
            </div>
            <div class="nav-right" style="display: flex !important; align-items: center !important; gap: 20px !important; position: relative !important; flex-shrink: 0 !important;">
                <div class="plan-info" id="plan-info-box" style="font-size: 13px !important; color: #666666 !important; padding: 6px 12px !important; background: #f0f0f0 !important; border-radius: 6px !important; display: flex !important; align-items: center !important; gap: 4px !important; font-weight: normal !important; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', 'SF Pro Display', sans-serif !important; margin: 0 !important; box-sizing: border-box !important;">
                    <span class="highlight" id="current-plan" style="color: #FFC107 !important; font-weight: 600 !important; font-size: 13px !important; margin: 0 !important; padding: 0 !important; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', 'SF Pro Display', sans-serif !important;">Free</span> <span id="remaining-time" style="font-weight: normal !important; font-size: 13px !important; color: #666666 !important; margin: 0 !important; padding: 0 !important; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', 'SF Pro Display', sans-serif !important;">5분 남음</span>
                </div>
                <a href="${htmlPath}login.html" class="login-btn" style="padding: 8px 20px !important; background: linear-gradient(135deg, #FFC107 0%, #FFA000 100%) !important; color: #ffffff !important; border: none !important; border-radius: 6px !important; font-size: 14px !important; font-weight: 600 !important; cursor: pointer !important; text-decoration: none !important; display: inline-block !important; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', 'SF Pro Display', sans-serif !important; line-height: 1.5 !important; height: auto !important; min-height: auto !important; max-height: none !important; box-sizing: border-box !important;">로그인</a>
                <a href="${htmlPath}signup.html" class="signup-btn" style="padding: 8px 20px !important; background: rgba(255, 255, 255, 0.9) !important; color: #FFC107 !important; border: 1px solid #FFC107 !important; border-radius: 6px !important; font-size: 14px !important; font-weight: 600 !important; cursor: pointer !important; text-decoration: none !important; display: inline-block !important; margin-left: 4px !important; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', 'SF Pro Display', sans-serif !important; line-height: 1.5 !important; height: auto !important; min-height: auto !important; max-height: none !important; box-sizing: border-box !important;">가입하기</a>
                <div class="more-menu-btn" id="moreMenuBtn">
                    <div class="dots">
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                    </div>
                </div>
                <div class="more-menu-dropdown" id="moreMenuDropdown">
                    <div class="language-dropdown-menu" id="languageDropdownMenu">
                        <div class="language-option" data-lang="ko">
                            <span>한국어</span>
                            <i class="fas fa-check"></i>
                        </div>
                        <div class="language-option" data-lang="en">
                            <span>영어</span>
                            <i class="fas fa-check" style="display: none;"></i>
                        </div>
                        <div class="language-option" data-lang="ja">
                            <span>일본어</span>
                            <i class="fas fa-check" style="display: none;"></i>
                        </div>
                        <div class="language-option" data-lang="zh">
                            <span>중국어</span>
                            <i class="fas fa-check" style="display: none;"></i>
                        </div>
                        <div class="language-option" data-lang="es">
                            <span>스페인어</span>
                            <i class="fas fa-check" style="display: none;"></i>
                        </div>
                    </div>
                    <div class="mega-menu-content">
                        <!-- 1열: 기타 제품 -->
                        <div class="mega-menu-column">
                            <div class="mega-menu-section-title">기타 제품</div>
                            <a href="${assetPath}index.html" class="mega-menu-item">
                                <div class="mega-menu-item-icon"><i class="fas fa-chalkboard-teacher"></i></div>
                                <div class="mega-menu-item-text">
                                    <div class="mega-menu-item-title">강의 번역</div>
                                    <div class="mega-menu-item-desc">실시간 강의 번역 및 자막</div>
                                </div>
                                <i class="fas fa-arrow-right mega-menu-arrow"></i>
                            </a>
                            <a href="#" class="mega-menu-item">
                                <div class="mega-menu-item-icon"><i class="fas fa-closed-captioning"></i></div>
                                <div class="mega-menu-item-text">
                                    <div class="mega-menu-item-title">자막생성</div>
                                    <div class="mega-menu-item-desc">AI 기반 실시간 번역</div>
                                </div>
                                <i class="fas fa-arrow-right mega-menu-arrow"></i>
                            </a>
                        </div>
                        <!-- 2열: 링크 목록 -->
                        <div class="mega-menu-column mega-menu-links">
                            <a href="${htmlPath}pricing.html" class="mega-menu-link">
                                <i class="fas fa-file-alt"></i>
                                <span>가격</span>
                            </a>
                            <a href="${htmlPath}security.html" class="mega-menu-link">
                                <i class="fas fa-lock"></i>
                                <span>보안</span>
                            </a>
                            <a href="${htmlPath}features.html" class="mega-menu-link">
                                <i class="fas fa-th-large"></i>
                                <span>기능</span>
                            </a>
                            <a href="${htmlPath}features.html" class="mega-menu-link">
                                <i class="fas fa-tags"></i>
                                <span>회사 소개</span>
                            </a>
                            <div class="mega-menu-divider" style="height: 1px; background: #e5e7eb; margin: 16px 0;"></div>
                            <div class="mega-menu-link has-submenu" id="helpMenuBtn">
                                <i class="fas fa-chevron-left"></i>
                                <span>도움</span>
                            </div>
                            <div class="mega-menu-link has-submenu" id="languageMenuBtn">
                                <i class="fas fa-chevron-left"></i>
                                <span>언어</span>
                            </div>
                        </div>
                        <!-- 도움 서브메뉴 -->
                        <div class="mega-submenu" id="helpSubmenu">
                            <a href="${htmlPath}faq.html" class="mega-submenu-item">
                                <i class="fas fa-question-circle"></i>
                                <span>자주 묻는 질문</span>
                            </a>
                            <a href="${htmlPath}features.html" class="mega-submenu-item">
                                <i class="fas fa-tools"></i>
                                <span>도구</span>
                            </a>
                            <a href="${htmlPath}security.html" class="mega-submenu-item">
                                <i class="fas fa-user-shield"></i>
                                <span>법률 & 개인 정보 보호</span>
                            </a>
                            <a href="${htmlPath}faq.html" class="mega-submenu-item">
                                <i class="fas fa-envelope"></i>
                                <span>문의</span>
                            </a>
                        </div>
                        <!-- 언어 서브메뉴 -->
                        <div class="mega-submenu" id="languageSubmenu">
                            <div class="mega-submenu-item language-option" data-lang="ko">
                                <span>한국어</span>
                                <i class="fas fa-check"></i>
                            </div>
                            <div class="mega-submenu-item language-option" data-lang="en">
                                <span>English</span>
                                <i class="fas fa-check" style="visibility: hidden;"></i>
                            </div>
                            <div class="mega-submenu-item language-option" data-lang="ja">
                                <span>日本語</span>
                                <i class="fas fa-check" style="visibility: hidden;"></i>
                            </div>
                            <div class="mega-submenu-item language-option" data-lang="zh">
                                <span>中文</span>
                                <i class="fas fa-check" style="visibility: hidden;"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>`;
    }

    // 현재 페이지에 맞는 탭 활성화
    function setActiveTab() {
        const currentPath = window.location.pathname;
        const currentPage = currentPath.split('/').pop() || 'index.html';
        
        document.querySelectorAll('.service-tab').forEach(tab => {
            const tabPage = tab.getAttribute('data-page');
            if (tabPage === currentPage || 
                (currentPage === 'index.html' && tabPage === 'index.html') ||
                (currentPage === 'edit.html' && tabPage === 'index.html') ||
                (currentPage === 'storage.html' && tabPage === 'index.html') ||
                (currentPage === 'used.html' && tabPage === 'used.html') ||
                (currentPage === 'guide.html' && tabPage === 'used.html') ||
                (currentPage === 'pricing.html' && tabPage === 'pricing.html')) {
                tab.classList.add('active');
                // 활성 탭 스타일 강제 적용
                tab.style.fontWeight = '600';
                tab.style.color = '#FFC107';
            } else {
                tab.classList.remove('active');
                // 비활성 탭 스타일 강제 적용
                tab.style.fontWeight = '500';
                tab.style.color = '#666666';
            }
        });
    }

    // 서브메뉴 이벤트 초기화
    function initSubmenuEvents() {
        // 더보기 메뉴 토글 기능
        const moreMenuBtn = document.getElementById('moreMenuBtn');
        const moreMenuDropdown = document.getElementById('moreMenuDropdown');
        
        if (moreMenuBtn && moreMenuDropdown) {
            moreMenuBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                moreMenuDropdown.classList.toggle('active');
            });
            
            // 외부 클릭 시 메뉴 닫기
            document.addEventListener('click', function(e) {
                if (!moreMenuBtn.contains(e.target) && !moreMenuDropdown.contains(e.target)) {
                    moreMenuDropdown.classList.remove('active');
                }
            });
        }
        
        const helpMenuBtn = document.getElementById('helpMenuBtn');
        const languageMenuBtn = document.getElementById('languageMenuBtn');
        const helpSubmenu = document.getElementById('helpSubmenu');
        const languageSubmenu = document.getElementById('languageSubmenu');
        const megaMenuContent = document.querySelector('.mega-menu-content');
        
        if (!helpMenuBtn || !languageMenuBtn || !helpSubmenu || !languageSubmenu || !megaMenuContent) return;

        function showSubmenu(btn, submenu) {
            helpSubmenu.classList.remove('active');
            languageSubmenu.classList.remove('active');
            helpMenuBtn.classList.remove('active');
            languageMenuBtn.classList.remove('active');
            submenu.classList.add('active');
            btn.classList.add('active');
            megaMenuContent.classList.add('blurred');
        }
        
        function hideAllSubmenus() {
            helpSubmenu.classList.remove('active');
            languageSubmenu.classList.remove('active');
            helpMenuBtn.classList.remove('active');
            languageMenuBtn.classList.remove('active');
            megaMenuContent.classList.remove('blurred');
        }
        
        let submenuTimeout = null;
        function delayedHide() {
            submenuTimeout = setTimeout(() => { hideAllSubmenus(); }, 100);
        }
        function cancelHide() {
            if (submenuTimeout) { clearTimeout(submenuTimeout); submenuTimeout = null; }
        }
        
        helpMenuBtn.addEventListener('mouseenter', () => showSubmenu(helpMenuBtn, helpSubmenu));
        helpMenuBtn.addEventListener('mouseleave', (e) => { if (!helpSubmenu.contains(e.relatedTarget)) delayedHide(); });
        helpMenuBtn.addEventListener('mouseenter', cancelHide);
        helpSubmenu.addEventListener('mouseleave', delayedHide);
        helpSubmenu.addEventListener('mouseenter', cancelHide);

        languageMenuBtn.addEventListener('mouseenter', () => showSubmenu(languageMenuBtn, languageSubmenu));
        languageMenuBtn.addEventListener('mouseleave', (e) => { if (!languageSubmenu.contains(e.relatedTarget)) delayedHide(); });
        languageMenuBtn.addEventListener('mouseenter', cancelHide);
        languageSubmenu.addEventListener('mouseleave', delayedHide);
        languageSubmenu.addEventListener('mouseenter', cancelHide);
        
        // 다른 메뉴 링크에 마우스 올리면 서브메뉴 닫기
        document.querySelectorAll('.mega-menu-link:not(.has-submenu)').forEach(link => {
            link.addEventListener('mouseenter', hideAllSubmenus);
        });
        document.querySelectorAll('.mega-menu-column:not(.mega-menu-links)').forEach(col => {
            col.addEventListener('mouseenter', hideAllSubmenus);
        });
        
        const menuDropdown = document.getElementById('moreMenuDropdown');
        if (menuDropdown) menuDropdown.addEventListener('mouseleave', hideAllSubmenus);
        
        // 언어 선택 처리
        document.querySelectorAll('#languageSubmenu .language-option').forEach(option => {
            option.addEventListener('click', function() {
                const lang = this.dataset.lang;
                document.querySelectorAll('#languageSubmenu .language-option').forEach(opt => {
                    opt.querySelector('.fa-check').style.visibility = 'hidden';
                });
                this.querySelector('.fa-check').style.visibility = 'visible';
                localStorage.setItem('siteLanguage', lang);
                
                // i18n으로 언어 변경 적용
                if (window.i18n && window.i18n.setLanguage) {
                    window.i18n.setLanguage(lang);
                }
            });
        });
    }

    // 네비게이션 바 삽입
    function insertNavBar() {
        const navPlaceholder = document.getElementById('nav-placeholder');
        if (navPlaceholder) {
            navPlaceholder.innerHTML = createNavBar();
            setActiveTab();
            initSubmenuEvents();
            
            // 플랜 정보 초기값 통일
            initializePlanInfo();
            
            // 상단바 스타일 강제 적용 - 모든 페이지에서 동일하게
            applyNavBarStyles();
            
            // 다른 스크립트가 실행된 후에도 스타일 강제 적용
            setTimeout(function() {
                initializePlanInfo();
                applyNavBarStyles();
            }, 100);
            
            setTimeout(function() {
                initializePlanInfo();
                applyNavBarStyles();
            }, 500);
            
            // 네비게이션 바 로드 완료 이벤트 발생
            setTimeout(function() {
                document.dispatchEvent(new CustomEvent('navBarLoaded'));
            }, 10);
        }
    }
    
    // 플랜 정보 초기값 통일 함수 - 주기적으로 실행하여 다른 스크립트의 변경을 덮어씀
    function initializePlanInfo() {
        const remainingTimeEl = document.getElementById('remaining-time');
        if (remainingTimeEl) {
            // 기본값을 5분으로 강제 설정
            let currentText = remainingTimeEl.textContent || '';
            let currentMinutes = parseInt(currentText.replace(/[^0-9]/g, '')) || 0;
            
            // 60분이나 다른 값이면 5분으로 변경
            if (currentMinutes !== 5 && (currentMinutes === 60 || currentMinutes === 100 || currentMinutes === 0)) {
                remainingTimeEl.textContent = '5분 남음';
                localStorage.setItem('remainingMinutes', '5');
            } else if (currentMinutes === 0 || !currentText.includes('분')) {
                // 값이 없거나 잘못된 경우 5분으로 설정
                remainingTimeEl.textContent = '5분 남음';
                localStorage.setItem('remainingMinutes', '5');
            }
            
            // 스타일 강제 적용
            remainingTimeEl.style.setProperty('font-weight', 'normal', 'important');
            remainingTimeEl.style.setProperty('font-size', '13px', 'important');
            remainingTimeEl.style.setProperty('font-family', '-apple-system, BlinkMacSystemFont, "Segoe UI", "Inter", "SF Pro Display", sans-serif', 'important');
            remainingTimeEl.style.setProperty('color', '#666666', 'important');
            remainingTimeEl.style.setProperty('margin', '0', 'important');
            remainingTimeEl.style.setProperty('padding', '0', 'important');
        }
        
        const currentPlanEl = document.getElementById('current-plan');
        if (currentPlanEl) {
            currentPlanEl.style.setProperty('font-weight', '600', 'important');
            currentPlanEl.style.setProperty('color', '#FFC107', 'important');
            currentPlanEl.style.setProperty('font-size', '13px', 'important');
            currentPlanEl.style.setProperty('font-family', '-apple-system, BlinkMacSystemFont, "Segoe UI", "Inter", "SF Pro Display", sans-serif', 'important');
            currentPlanEl.style.setProperty('margin', '0', 'important');
            currentPlanEl.style.setProperty('padding', '0', 'important');
        }
        
        const planInfoBox = document.getElementById('plan-info-box');
        if (planInfoBox) {
            planInfoBox.style.setProperty('font-size', '13px', 'important');
            planInfoBox.style.setProperty('font-weight', 'normal', 'important');
            planInfoBox.style.setProperty('font-family', '-apple-system, BlinkMacSystemFont, "Segoe UI", "Inter", "SF Pro Display", sans-serif', 'important');
            planInfoBox.style.setProperty('color', '#666666', 'important');
            planInfoBox.style.setProperty('padding', '6px 12px', 'important');
            planInfoBox.style.setProperty('background', '#f0f0f0', 'important');
            planInfoBox.style.setProperty('border-radius', '6px', 'important');
            planInfoBox.style.setProperty('margin', '0', 'important');
        }
    }
    
    // 상단바 스타일 강제 적용 함수 - 인라인 스타일로 직접 적용
    function applyNavBarStyles() {
        // CSS 스타일 주입 - Tailwind CSS 등 모든 외부 스타일보다 우선 적용
        const style = document.createElement('style');
        style.id = 'nav-bar-unified-styles';
        style.textContent = `
            /* 상단바 통일 스타일 - 모든 페이지에서 동일하게 적용 (최우선) */
            .glass-nav {
                box-sizing: border-box !important;
            }
            .glass-nav * {
                box-sizing: border-box !important;
            }
            /* Font Awesome 아이콘은 원래 폰트 패밀리 유지 */
            .glass-nav i.fas,
            .glass-nav i.far,
            .glass-nav i.fab,
            .glass-nav i.fal,
            .glass-nav i.fad,
            .glass-nav i.fa,
            .glass-nav i[class^="fa-"],
            .glass-nav i[class*=" fa-"] {
                font-family: "Font Awesome 6 Free", "Font Awesome 6 Pro", "Font Awesome 6 Brands", "FontAwesome" !important;
            }
            /* 텍스트 요소만 폰트 패밀리 적용 */
            .glass-nav .logo,
            .glass-nav .service-tab,
            .glass-nav .login-btn,
            .glass-nav .signup-btn,
            .glass-nav .plan-info,
            .glass-nav span:not(.fa),
            .glass-nav div:not(.mega-menu-item-icon):not(.mega-menu-link):not(.mega-submenu-item) {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', 'SF Pro Display', sans-serif !important;
            }
            .glass-nav {
                position: sticky !important;
                top: 0 !important;
                z-index: 1000 !important;
                background: rgba(255, 255, 255, 0.95) !important;
                backdrop-filter: blur(30px) !important;
                border-bottom: 1px solid #E5E7EB !important;
                padding: 15px 0 !important;
                box-sizing: border-box !important;
                width: 100% !important;
                margin: 0 !important;
            }
            .glass-nav .nav-content {
                max-width: 100% !important;
                margin: 0 auto !important;
                padding: 0 20px !important;
                display: flex !important;
                align-items: center !important;
                justify-content: space-between !important;
                box-sizing: border-box !important;
                width: 100% !important;
            }
            /* 메뉴 버튼 아이콘 보호 - 점 9개 그리드 */
            .glass-nav .more-menu-btn {
                width: 40px !important;
                height: 40px !important;
                border-radius: 8px !important;
                background: rgba(255, 255, 255, 0.9) !important;
                border: 1px solid rgba(0, 0, 0, 0.1) !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                cursor: pointer !important;
                position: relative !important;
            }
            .glass-nav .more-menu-btn .dots {
                display: grid !important;
                grid-template-columns: repeat(3, 4px) !important;
                grid-template-rows: repeat(3, 4px) !important;
                gap: 3px !important;
                width: 18px !important;
                height: 18px !important;
                margin: 0 !important;
                padding: 0 !important;
            }
            .glass-nav .more-menu-btn .dot {
                width: 4px !important;
                height: 4px !important;
                border-radius: 50% !important;
                background: #666 !important;
                display: block !important;
                margin: 0 !important;
                padding: 0 !important;
                flex: none !important;
            }
            .glass-nav .logo {
                font-size: 28px !important;
                font-weight: bold !important;
                color: #FFC107 !important;
                line-height: 1.5 !important;
                height: auto !important;
                margin: 0 !important;
                padding: 0 !important;
            }
            .glass-nav .service-tab {
                font-size: 16px !important;
                font-weight: 500 !important;
                color: #666666 !important;
                padding: 10px 20px !important;
                line-height: 1.5 !important;
                height: auto !important;
                box-sizing: border-box !important;
                margin: 0 !important;
            }
            .glass-nav .service-tab.active {
                font-weight: 600 !important;
                color: #FFC107 !important;
            }
            .glass-nav .login-btn {
                font-size: 14px !important;
                font-weight: 600 !important;
                padding: 8px 20px !important;
                line-height: 1.5 !important;
                height: auto !important;
                min-height: auto !important;
                max-height: none !important;
                box-sizing: border-box !important;
                margin: 0 !important;
            }
            .glass-nav .signup-btn {
                font-size: 14px !important;
                font-weight: 600 !important;
                padding: 8px 20px !important;
                line-height: 1.5 !important;
                height: auto !important;
                min-height: auto !important;
                max-height: none !important;
                box-sizing: border-box !important;
                margin: 0 !important;
            }
            .glass-nav .plan-info {
                font-size: 13px !important;
                font-weight: normal !important;
                color: #666666 !important;
                padding: 6px 12px !important;
                background: #f0f0f0 !important;
                border-radius: 6px !important;
                margin: 0 !important;
                display: flex !important;
                align-items: center !important;
                gap: 4px !important;
            }
            .glass-nav .plan-info .highlight {
                font-weight: 600 !important;
                color: #FFC107 !important;
                font-size: 13px !important;
                margin: 0 !important;
                padding: 0 !important;
            }
            .glass-nav .plan-info #remaining-time {
                font-weight: normal !important;
                font-size: 13px !important;
                color: #666666 !important;
                margin: 0 !important;
                padding: 0 !important;
            }
        `;
        
        // 기존 스타일이 있으면 제거
        const existingStyle = document.getElementById('nav-bar-unified-styles');
        if (existingStyle) {
            existingStyle.remove();
        }
        
        // head에 추가 (가장 마지막에 추가하여 최우선 적용)
        document.head.appendChild(style);
        
        // 추가 보험: 각 요소에 직접 인라인 스타일 적용 (주기적으로 재적용)
        function applyInlineStyles() {
            // 상단바 전체
            const navBar = document.querySelector('.glass-nav');
            if (navBar) {
                navBar.style.setProperty('position', 'sticky', 'important');
                navBar.style.setProperty('top', '0', 'important');
                navBar.style.setProperty('z-index', '1000', 'important');
                navBar.style.setProperty('background', 'rgba(255, 255, 255, 0.95)', 'important');
                navBar.style.setProperty('backdrop-filter', 'blur(30px)', 'important');
                navBar.style.setProperty('border-bottom', '1px solid #E5E7EB', 'important');
                navBar.style.setProperty('padding', '15px 0', 'important');
                navBar.style.setProperty('box-sizing', 'border-box', 'important');
                navBar.style.setProperty('width', '100%', 'important');
                navBar.style.setProperty('margin', '0', 'important');
            }
            
            const navContent = document.querySelector('.glass-nav .nav-content');
            if (navContent) {
                navContent.style.setProperty('padding', '0 20px', 'important');
            }
            
            // 메뉴 버튼 아이콘 보호 - 점 9개 그리드
            const moreMenuBtn = document.querySelector('.glass-nav .more-menu-btn');
            if (moreMenuBtn) {
                moreMenuBtn.style.setProperty('width', '40px', 'important');
                moreMenuBtn.style.setProperty('height', '40px', 'important');
                moreMenuBtn.style.setProperty('border-radius', '8px', 'important');
                moreMenuBtn.style.setProperty('background', 'rgba(255, 255, 255, 0.9)', 'important');
                moreMenuBtn.style.setProperty('border', '1px solid rgba(0, 0, 0, 0.1)', 'important');
                moreMenuBtn.style.setProperty('display', 'flex', 'important');
                moreMenuBtn.style.setProperty('align-items', 'center', 'important');
                moreMenuBtn.style.setProperty('justify-content', 'center', 'important');
                moreMenuBtn.style.setProperty('cursor', 'pointer', 'important');
                moreMenuBtn.style.setProperty('position', 'relative', 'important');
            }
            
            const dots = document.querySelector('.glass-nav .more-menu-btn .dots');
            if (dots) {
                dots.style.setProperty('display', 'grid', 'important');
                dots.style.setProperty('grid-template-columns', 'repeat(3, 4px)', 'important');
                dots.style.setProperty('grid-template-rows', 'repeat(3, 4px)', 'important');
                dots.style.setProperty('gap', '3px', 'important');
                dots.style.setProperty('width', '18px', 'important');
                dots.style.setProperty('height', '18px', 'important');
                dots.style.setProperty('margin', '0', 'important');
                dots.style.setProperty('padding', '0', 'important');
            }
            
            const dotElements = document.querySelectorAll('.glass-nav .more-menu-btn .dot');
            dotElements.forEach(function(dot) {
                dot.style.setProperty('width', '4px', 'important');
                dot.style.setProperty('height', '4px', 'important');
                dot.style.setProperty('border-radius', '50%', 'important');
                dot.style.setProperty('background', '#666', 'important');
                dot.style.setProperty('display', 'block', 'important');
                dot.style.setProperty('margin', '0', 'important');
                dot.style.setProperty('padding', '0', 'important');
                dot.style.setProperty('flex', 'none', 'important');
            });
            
            const logo = document.querySelector('.glass-nav .logo');
            if (logo) {
                logo.style.setProperty('font-size', '28px', 'important');
                logo.style.setProperty('font-weight', 'bold', 'important');
                logo.style.setProperty('color', '#FFC107', 'important');
                logo.style.setProperty('font-family', '-apple-system, BlinkMacSystemFont, "Segoe UI", "Inter", "SF Pro Display", sans-serif', 'important');
                logo.style.setProperty('line-height', '1.5', 'important');
                logo.style.setProperty('height', 'auto', 'important');
                logo.style.setProperty('margin', '0', 'important');
                logo.style.setProperty('padding', '0', 'important');
            }
            
            const serviceTabs = document.querySelectorAll('.glass-nav .service-tab');
            serviceTabs.forEach(function(tab) {
                tab.style.setProperty('font-size', '16px', 'important');
                tab.style.setProperty('font-family', '-apple-system, BlinkMacSystemFont, "Segoe UI", "Inter", "SF Pro Display", sans-serif', 'important');
                tab.style.setProperty('padding', '10px 20px', 'important');
                tab.style.setProperty('line-height', '1.5', 'important');
                tab.style.setProperty('height', 'auto', 'important');
                tab.style.setProperty('box-sizing', 'border-box', 'important');
                tab.style.setProperty('margin', '0', 'important');
                if (tab.classList.contains('active')) {
                    tab.style.setProperty('font-weight', '600', 'important');
                    tab.style.setProperty('color', '#FFC107', 'important');
                } else {
                    tab.style.setProperty('font-weight', '500', 'important');
                    tab.style.setProperty('color', '#666666', 'important');
                }
            });
            
            const loginBtn = document.querySelector('.glass-nav .login-btn');
            if (loginBtn) {
                loginBtn.style.setProperty('font-size', '14px', 'important');
                loginBtn.style.setProperty('font-weight', '600', 'important');
                loginBtn.style.setProperty('font-family', '-apple-system, BlinkMacSystemFont, "Segoe UI", "Inter", "SF Pro Display", sans-serif', 'important');
                loginBtn.style.setProperty('padding', '8px 20px', 'important');
                loginBtn.style.setProperty('line-height', '1.5', 'important');
                loginBtn.style.setProperty('height', 'auto', 'important');
                loginBtn.style.setProperty('min-height', 'auto', 'important');
                loginBtn.style.setProperty('max-height', 'none', 'important');
                loginBtn.style.setProperty('box-sizing', 'border-box', 'important');
                loginBtn.style.setProperty('margin', '0', 'important');
            }
            
            const signupBtn = document.querySelector('.glass-nav .signup-btn');
            if (signupBtn) {
                signupBtn.style.setProperty('font-size', '14px', 'important');
                signupBtn.style.setProperty('font-weight', '600', 'important');
                signupBtn.style.setProperty('font-family', '-apple-system, BlinkMacSystemFont, "Segoe UI", "Inter", "SF Pro Display", sans-serif', 'important');
                signupBtn.style.setProperty('padding', '8px 20px', 'important');
                signupBtn.style.setProperty('line-height', '1.5', 'important');
                signupBtn.style.setProperty('height', 'auto', 'important');
                signupBtn.style.setProperty('min-height', 'auto', 'important');
                signupBtn.style.setProperty('max-height', 'none', 'important');
                signupBtn.style.setProperty('box-sizing', 'border-box', 'important');
                signupBtn.style.setProperty('margin', '0', 'important');
            }
            
            const planInfo = document.querySelector('.glass-nav .plan-info');
            if (planInfo) {
                planInfo.style.setProperty('font-size', '13px', 'important');
                planInfo.style.setProperty('font-weight', 'normal', 'important');
                planInfo.style.setProperty('font-family', '-apple-system, BlinkMacSystemFont, "Segoe UI", "Inter", "SF Pro Display", sans-serif', 'important');
                planInfo.style.setProperty('color', '#666666', 'important');
                planInfo.style.setProperty('padding', '6px 12px', 'important');
                planInfo.style.setProperty('background', '#ffffff', 'important');
                planInfo.style.setProperty('border-radius', '6px', 'important');
                planInfo.style.setProperty('margin', '0', 'important');
                planInfo.style.setProperty('display', 'flex', 'important');
                planInfo.style.setProperty('align-items', 'center', 'important');
                planInfo.style.setProperty('gap', '4px', 'important');
                planInfo.style.setProperty('border', '1px solid #e0e0e0', 'important');
            }
            
            const planHighlight = document.querySelector('.glass-nav .plan-info .highlight');
            if (planHighlight) {
                planHighlight.style.setProperty('font-weight', '600', 'important');
                planHighlight.style.setProperty('color', '#FFC107', 'important');
                planHighlight.style.setProperty('font-size', '13px', 'important');
                planHighlight.style.setProperty('font-family', '-apple-system, BlinkMacSystemFont, "Segoe UI", "Inter", "SF Pro Display", sans-serif', 'important');
                planHighlight.style.setProperty('margin', '0', 'important');
                planHighlight.style.setProperty('padding', '0', 'important');
            }
            
            const remainingTime = document.querySelector('.glass-nav .plan-info #remaining-time');
            if (remainingTime) {
                remainingTime.style.setProperty('font-weight', 'normal', 'important');
                remainingTime.style.setProperty('font-size', '13px', 'important');
                remainingTime.style.setProperty('font-family', '-apple-system, BlinkMacSystemFont, "Segoe UI", "Inter", "SF Pro Display", sans-serif', 'important');
                remainingTime.style.setProperty('color', '#666666', 'important');
                remainingTime.style.setProperty('margin', '0', 'important');
                remainingTime.style.setProperty('padding', '0', 'important');
            }
        }
        
        // 즉시 적용
        setTimeout(applyInlineStyles, 10);
        setTimeout(initializePlanInfo, 10);
        // 주기적으로 재적용 (다른 스크립트가 변경할 수 있으므로) - 더 자주 실행
        setInterval(applyInlineStyles, 50);
        setInterval(initializePlanInfo, 50);
        
        // MutationObserver로 DOM 변경 감지하여 스타일 재적용
        const navBar = document.querySelector('.glass-nav');
        if (navBar) {
            const observer = new MutationObserver(function(mutations) {
                applyInlineStyles();
                initializePlanInfo();
            });
            observer.observe(navBar, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['style', 'class'],
                characterData: true
            });
        }
        
        // remaining-time 텍스트 변경 감지
        const remainingTimeEl = document.getElementById('remaining-time');
        if (remainingTimeEl) {
            const textObserver = new MutationObserver(function(mutations) {
                initializePlanInfo();
            });
            textObserver.observe(remainingTimeEl, {
                childList: true,
                subtree: true,
                characterData: true
            });
        }
    }

    // 다른 스크립트의 함수 오버라이드 - initializeRemainingTime 함수를 가로채서 스타일만 통일
    function overrideOtherScripts() {
        // script.js의 initializeRemainingTime 함수를 오버라이드
        // DOMContentLoaded 이벤트 리스너 내부의 함수를 찾아서 오버라이드
        const originalInitRemainingTime = window.initializeRemainingTime;
        if (originalInitRemainingTime) {
            window.initializeRemainingTime = function() {
                originalInitRemainingTime.apply(this, arguments);
                // 함수 실행 후 스타일 강제 적용
                setTimeout(initializePlanInfo, 10);
            };
        }
        
        // remaining-time 요소가 변경될 때마다 스타일 재적용
        const remainingTimeEl = document.getElementById('remaining-time');
        if (remainingTimeEl) {
            // 기존 MutationObserver가 없으면 새로 생성
            if (!remainingTimeEl._navBarObserver) {
                const observer = new MutationObserver(function() {
                    // 값이 변경되면 5분으로 강제 설정
                    let currentText = remainingTimeEl.textContent || '';
                    let currentMinutes = parseInt(currentText.replace(/[^0-9]/g, '')) || 0;
                    
                    if (currentMinutes === 60 || currentMinutes === 100) {
                        remainingTimeEl.textContent = '5분 남음';
                        localStorage.setItem('remainingMinutes', '5');
                    }
                    
                    initializePlanInfo();
                });
                observer.observe(remainingTimeEl, {
                    childList: true,
                    subtree: true,
                    characterData: true
                });
                remainingTimeEl._navBarObserver = observer;
            }
        }
    }
    
    // DOM 로드 후 실행 - 가장 마지막에 실행되도록
    function initNavBar() {
        insertNavBar();
        
        // 다른 스크립트 오버라이드
        setTimeout(overrideOtherScripts, 50);
        
        // window.load 이벤트 후에도 재실행 (모든 스크립트가 로드된 후)
        window.addEventListener('load', function() {
            setTimeout(function() {
                overrideOtherScripts();
                initializePlanInfo();
                applyNavBarStyles();
            }, 100);
        });
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNavBar);
    } else {
        initNavBar();
    }
    
    // 모든 스크립트가 로드된 후에도 계속 모니터링
    if (document.readyState === 'complete') {
        setTimeout(function() {
            overrideOtherScripts();
            initializePlanInfo();
            applyNavBarStyles();
        }, 200);
    }
    
    // 스크립트 로드 후에도 계속 모니터링
    setTimeout(function() {
        overrideOtherScripts();
    }, 500);
    setTimeout(function() {
        overrideOtherScripts();
    }, 1000);
})();

