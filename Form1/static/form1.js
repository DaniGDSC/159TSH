document.addEventListener('DOMContentLoaded', () => {
    // =========================
    // Quiz Data & State
    // =========================
    const quizData = [
        // ... (same quizData as before)
    ].map(q => ({ ...q, answered: false, userAnswers: [] }));

    // =========================
    // DOM Elements
    // =========================
    const $ = id => document.getElementById(id);
    const registerModal = $('register-modal');
    const userInfoForm = $('userInfoForm');
    const mainContainer = document.querySelector('.container');
    const gateHub = $('gate-hub');
    const portalOverlay = $('portal-overlay');
    const questionModal = $('question-modal');
    const modalQuestionText = $('modal-question-text');
    const modalAnswersContainer = $('modal-answers-container');
    const modalSaveBtn = $('modal-save-btn');
    const submitBtn = $('submitBtn');
    const resultContainer = $('resultContainer');

    let currentQuestionIndex = null;
    let userData = {};

    // =========================
    // Utility Functions
    // =========================
    function triggerPortalEffect(callback) {
        portalOverlay.classList.add('active');
        setTimeout(() => {
            callback && callback();
            portalOverlay.classList.remove('active');
        }, 500);
    }

    function showQuestionModal(qIndex) {
        currentQuestionIndex = qIndex;
        const questionData = quizData[qIndex];
        modalQuestionText.innerText = questionData.question;
        modalAnswersContainer.innerHTML = '';

        questionData.answers.forEach((ans, ansIndex) => {
            const userAnswer = questionData.userAnswers.find(ua => ua.ansIndex === ansIndex);
            const isChecked = userAnswer ? 'checked' : '';
            const priorityValue = userAnswer ? `value="${userAnswer.priority}"` : '';
            const isDisabled = userAnswer ? '' : 'disabled';

            const answerItem = document.createElement('div');
            answerItem.className = 'answer-item';
            answerItem.innerHTML = `
                <input type="checkbox" id="modal_q${qIndex}a${ansIndex}" data-ans-index="${ansIndex}" ${isChecked}>
                <label for="modal_q${qIndex}a${ansIndex}">${ans.text}</label>
                <input type="number" min="1" max="5" class="priority-input" ${priorityValue} ${isDisabled}>
            `;
            modalAnswersContainer.appendChild(answerItem);
        });

        questionModal.classList.remove('hidden');
    }

    function updateHubUI() {
        const gates = document.querySelectorAll('.gate');
        const allAnswered = quizData.every(q => q.answered);
        gates.forEach((gate, idx) => gate.classList.toggle('answered', quizData[idx].answered));
        submitBtn.classList.toggle('hidden', !allAnswered);
    }

    function calculateScores() {
        const scores = { P: 0, C: 0, K: 0 };
        const flags = [];
        quizData.forEach(q => {
            q.userAnswers.forEach(ua => {
                const answerData = q.answers[ua.ansIndex];
                const code = answerData.code;
                const priority = ua.priority;
                let points = priority === 1 ? 3 : priority === 2 ? 2 : priority >= 3 ? 1 : 0;
                if (scores.hasOwnProperty(code)) scores[code] += points;
                if (answerData.flag && (priority === 1 || priority === 2) && !flags.includes(answerData.flag)) {
                    flags.push(answerData.flag);
                }
            });
        });
        return { scores, flags };
    }

    function analyzeProfile({ P, C, K }) {
        let profile = "", feedback = "";
        if (K >= 10 && K > P + 5) {
            profile = "Người Cần Hỗ Trợ Khẩn Cấp";
            feedback = "Ta hiểu những gánh nặng bạn đang mang. Phòng Gương có lẽ chưa phải là nơi giúp bạn dập tắt những ngọn lửa cấp bách đó. Điều bạn cần nhất lúc này là sự hỗ trợ vững chắc và thiết thực. Hãy tìm kiếm sự giúp đỡ từ các chuyên gia về khủng hoảng hoặc các dịch vụ hỗ trợ cộng đồng.";
        } else if (P >= 12 && P > K + 5) {
            profile = "Người Tìm Kiếm Sẵn Sàng";
            feedback = "Trái tim và tâm trí bạn đã rộng mở. Con đường phía trước tuy có thử thách nhưng hoàn toàn phù hợp với bạn. Cánh cổng sẽ mở ra, chào đón bạn vào hành trình khám phá.";
        } else if (P >= 8 && K >= 8) {
            profile = "Người Tìm Kiếm Mâu Thuẫn";
            feedback = "Ta thấy trong bạn cả một khao khát khám phá mãnh liệt lẫn những cơn bão nội tâm dữ dội. Hành trình này có thể rất giá trị nhưng cũng sẽ vô cùng thử thách. Hãy bước đi một cách thận trọng và tìm một người dẫn đường thật vững vàng.";
        } else if (C > P && C > K) {
            profile = "Người Hướng đến Thực tế";
            feedback = "Bạn có những nhu cầu và mục tiêu rất thực tế. Có lẽ hành trình khám phá sâu không phải là ưu tiên lúc này, mà là các giải pháp và kỹ năng ứng dụng. Hãy cân nhắc các hình thức tư vấn ngắn hạn hoặc huấn luyện (coaching) để đạt được mục tiêu của mình.";
        } else {
            profile = "Người Tò Mò Thận Trọng";
            feedback = "Ta cảm nhận được sự tò mò nhưng cũng rất thận trọng từ bạn. Có lẽ đây chưa phải lúc để bước sâu vào Phòng Gương. Hãy dành thêm thời gian để tìm hiểu trước khi đưa ra quyết định cho hành trình dài hạn này. Các tài liệu trên trang của chúng tôi có thể hữu ích cho bạn.";
        }
        return { profile, feedback };
    }

    function displayResults(scores, profile, feedback, flags) {
        resultContainer.classList.remove('hidden');
        const maxPossibleScore = quizData.length * 3;
        $('pScore').innerText = scores.P;
        $('cScore').innerText = scores.C;
        $('kScore').innerText = scores.K;
        $('pScoreBar').style.width = (scores.P / maxPossibleScore) * 100 + '%';
        $('cScoreBar').style.width = (scores.C / maxPossibleScore) * 100 + '%';
        $('kScoreBar').style.width = (scores.K / maxPossibleScore) * 100 + '%';
        $('profileText').innerText = profile;
        $('feedbackText').innerText = feedback;
        const flagResultEl = $('flagResult');
        if (flags.length > 0) {
            flagResultEl.classList.remove('hidden');
            if (flags.includes("IDENTITY_CONCERN")) {
                $('flagText').innerText = "Lưu ý quan trọng: Hành trình của bạn có liên quan đến các câu hỏi sâu sắc về bản dạng và xu hướng cảm xúc. Chúng tôi đặc biệt khuyến nghị bạn tìm một người dẫn đường có kinh nghiệm chuyên sâu về lĩnh vực này để đảm bảo bạn nhận được sự hỗ trợ thấu cảm và phù hợp nhất.";
            }
        } else {
            flagResultEl.classList.add('hidden');
        }
        resultContainer.scrollIntoView({ behavior: 'smooth' });
    }

    // =========================
    // UI Initialization
    // =========================
    function initializeGates() {
        const totalGates = quizData.length;
        const angleIncrement = 360 / totalGates;
        const hubContainerWidth = document.querySelector('.hub-container').offsetWidth;
        const calculatedRadius = Math.max(200, Math.min(hubContainerWidth / 2.2, 400));
        gateHub.innerHTML = '';
        quizData.forEach((_, idx) => {
            const gate = document.createElement('div');
            gate.className = 'gate';
            gate.dataset.questionIndex = idx;
            const currentAngle = idx * angleIncrement;
            gate.style.setProperty('--angle', `${currentAngle}deg`);
            gate.style.setProperty('--radius', `${calculatedRadius}px`);
            gate.innerHTML = `
                <img src="https://i.pinimg.com/564x/a2/1c/63/a21c637494fbe542615a2f5a2a223961.jpg" alt="Cánh cổng ${idx + 1}">
                <span class="gate-number">${idx + 1}</span>
            `;
            gate.addEventListener('click', () => triggerPortalEffect(() => showQuestionModal(idx)));
            gateHub.appendChild(gate);
        });
        updateHubUI();
    }

    // =========================
    // Event Listeners
    // =========================
    userInfoForm.addEventListener('submit', e => {
        e.preventDefault();
        userData = {
            fullName: $('fullName').value,
            dob: $('dob').value,
            phone: $('phone').value,
            referrer: $('referrer').value
        };
        fetch('/submit_user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        })
        .then(res => res.json())
        .then(data => {
            userData.user_id = data.user_id;
            registerModal.style.opacity = '0';
            setTimeout(() => { registerModal.style.display = 'none'; }, 500);
            mainContainer.classList.remove('blurred');
        });
    });

    modalSaveBtn.addEventListener('click', () => {
        const question = quizData[currentQuestionIndex];
        question.userAnswers = [];
        let hasAnswers = false;
        modalAnswersContainer.querySelectorAll('.answer-item').forEach(item => {
            const checkbox = item.querySelector('input[type="checkbox"]');
            const priorityInput = item.querySelector('input[type="number"]');
            if (checkbox.checked) {
                hasAnswers = true;
                question.userAnswers.push({
                    ansIndex: parseInt(checkbox.dataset.ansIndex),
                    priority: parseInt(priorityInput.value) || 0
                });
            }
        });
        question.answered = hasAnswers;
        triggerPortalEffect(() => {
            questionModal.classList.add('hidden');
            updateHubUI();
        });
    });

    submitBtn.addEventListener('click', () => {
        const { scores, flags } = calculateScores();
        const { profile, feedback } = analyzeProfile(scores);
        const hubContainer = document.querySelector('.hub-container');
        hubContainer.style.transition = 'opacity 0.5s';
        hubContainer.style.opacity = '0';
        submitBtn.style.transition = 'opacity 0.5s';
        submitBtn.style.opacity = '0';
        setTimeout(() => {
            hubContainer.classList.add('hidden');
            submitBtn.classList.add('hidden');
            displayResults(scores, profile, feedback, flags);
        }, 500);
        fetch('/submit_result', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_id: userData.user_id,
                p_score: scores.P,
                c_score: scores.C,
                k_score: scores.K,
                profile,
                feedback,
                raw_answers: JSON.stringify(quizData)
            })
        });
    });

    modalAnswersContainer.addEventListener('change', e => {
        if (e.target.type === 'checkbox') {
            const priorityInput = e.target.parentElement.querySelector('.priority-input');
            priorityInput.disabled = !e.target.checked;
            if (!e.target.checked) priorityInput.value = '';
        }
    });

    window.addEventListener('resize', initializeGates);

    // =========================
    // Start
    // =========================
    initializeGates();
});
