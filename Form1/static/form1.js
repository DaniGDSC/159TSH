document.addEventListener('DOMContentLoaded', function() {
    const quizData = [
        // Câu hỏi 1
        {
            question: "Câu hỏi 1: Hãy hình dung cuộc sống của bạn ngay lúc này. Nó giống với hình ảnh nào nhất?",
            answers: [
                { text: "Một con tàu đang đi trên biển lặng, nhưng tôi cảm nhận có những dòng chảy ngầm...", code: "P" },
                { text: "Một khu rừng rậm rạp, tôi cảm thấy lạc lối và cần một tấm bản đồ...", code: "C" },
                { text: "Một ngôi nhà đang cháy, tôi cần dập lửa và giải quyết vấn đề cấp bách...", code: "K" },
                { text: "Một ngọn núi cao cần chinh phục, đầy thử thách...", code: "V" },
                { text: "Một vùng đầm lầy, trông có vẻ tĩnh lặng nhưng tôi cảm thấy mình bị mắc kẹt...", code: "C" },
            ]
        },
        // Câu hỏi 2
        {
            question: "Câu hỏi 2: Nỗi trăn trở lớn nhất của bạn đến từ đâu?",
            answers: [
                { text: "Từ những mâu thuẫn, cảm xúc và ký ức lặp đi lặp lại từ sâu bên trong tôi.", code: "P" },
                { text: "Từ những áp lực và kỳ vọng của gia đình, xã hội...", code: "C" },
                { text: "Từ những khoản nợ, những trách nhiệm tài chính cụ thể...", code: "K" },
                { text: "Từ cảm giác bấp bênh về tương lai, về sự nghiệp...", code: "V" },
                { text: "Từ một mối quan hệ đổ vỡ hoặc khó khăn...", code: "C" },
            ]
        },
          // Câu hỏi 3: Về Tâm Thế Tìm Kiếm
        {
            question: "Câu hỏi 3: Bạn đến với 'Phòng Gương' này với tâm thế nào?",
            answers: [
                { text: "Tìm một không gian an toàn để đối diện và chữa lành những tổn thương thầm kín.", code: "P" },
                { text: "Tìm cách tối ưu hóa 'phần mềm nội tâm' của mình để đạt hiệu suất cao nhất trong cuộc sống.", code: "C" },
                { text: "Tìm một 'công thức bí mật' hay một 'lối tắt' để đạt được thành công và hạnh phúc nhanh chóng.", code: "K" },
                { text: "Tìm cách khai phá 'tiềm năng vô hạn' để trở nên vượt trội và chiến thắng trong mọi cuộc chơi.", code: "K" },
                { text: "Tôi chỉ tò mò và muốn thử xem nơi này có gì thú vị.", code: "V" }
            ]
        },
        // Câu hỏi 4: Về Câu Hỏi Bản Dạng
        {
            question: "Câu hỏi 4: Khi nhìn vào gương, câu hỏi nào vang lên trong đầu bạn thường xuyên nhất?",
            answers: [
                { text: "\"Tại sao mình lại phản ứng theo cách này? Mô thức này đến từ đâu?\"", code: "P" },
                { text: "\"Đâu là mục đích sống hay tiếng gọi đích thực của cuộc đời mình?\"", code: "P" },
                { text: "\"Đâu là con người thật của mình, phía sau những vai trò mình đang phải gánh vác?\"", code: "C" },
                { text: "\"Làm sao để trở thành phiên bản mà mọi người mong đợi ở mình?\"", code: "K" },
                { text: "\"Bản dạng và xu hướng cảm xúc của mình có thực sự phù hợp với những gì mình cảm nhận không?\"", code: "V", flag: "IDENTITY_CONCERN" },
            ]
        },
        // Câu hỏi 5: Về Hệ Thống Niềm Tin
        {
            question: "Câu hỏi 5: Khi đối mặt với một vấn đề nan giải, bạn thường có xu hướng nào?",
            answers: [
                { text: "Tò mò khám phá vấn đề từ nhiều góc nhìn tâm lý khác nhau, kể cả những góc nhìn thách thức niềm tin sẵn có.", code: "P" },
                { text: "Tìm về một triết lý hoặc tôn giáo quen thuộc để tìm sự bình an và câu trả lời.", code: "C" },
                { text: "Tin rằng mọi vấn đề đều có thể được giải quyết bằng một câu thần chú, một bài thiền định, hoặc một nghi lễ cụ thể.", code: "K" },
                { text: "Bỏ qua vấn đề và tin rằng \"mọi chuyện rồi sẽ ổn\" theo một ý chí cao hơn.", code: "K" },
                { text: "Phân tích vấn đề một cách logic và tìm lời giải thích hợp lý dựa trên những gì mình đã biết.", code: "C" },
            ]
        },
        // Câu hỏi 6: Về Mục Đích Sử Dụng Công Cụ Nội Tâm
        {
            question: "Câu hỏi 6: Thiền định hoặc các phương pháp tương tự để làm gì?",
            answers: [
                { text: "Để quan sát và thấu hiểu dòng chảy của tâm trí mà không bị cuốn theo.", code: "P" },
                { text: "Để tìm kiếm sự tĩnh lặng và giảm bớt căng thẳng trong cuộc sống.", code: "C" },
                { text: "Để loại bỏ hoàn toàn những suy nghĩ và cảm xúc tiêu cực.", code: "K" },
                { text: "Để đạt được những trạng thái tâm thức đặc biệt hoặc những năng lực siêu việt.", code: "K" },
                { text: "Tôi chưa từng thực hành hoặc không thực hành thường xuyên.", code: "V" },
            ]
        },
        // Câu hỏi 7: Về Cam Kết và Hoàn Cảnh Thực Tế
        {
            question: "Câu hỏi 7: Khả năng đầu tư thời gian và nguồn lực của bạn cho một kế hoạch mới là gì?",
            answers: [
                { text: "Tôi có thể sắp xếp thời gian cố định hàng tuần và sẵn sàng cho một quá trình kéo dài.", code: "P" },
                { text: "Lịch trình của tôi khá bận rộn, tôi cần sự linh hoạt và có thể chỉ tham gia được các buổi không thường xuyên.", code: "C" },
                { text: "Hiện tại tôi đang ở trong một môi trường có quy định nghiêm ngặt (quân đội, nội trú...) và khó có thể tham gia.", code: "K" },
                { text: "Tôi ưu tiên các khóa học trực tuyến hoặc tự học hơn là các buổi gặp mặt trực tiếp.", code: "V" },
                { text: "Tình hình tài chính của tôi khá eo hẹp, chi phí là một yếu tố quan trọng tôi cần cân nhắc.", code: "C" },
            ]
        },
        // Câu hỏi 8: Về Sự Đối Diện Với Sự Thật
        {
            question: "Câu hỏi 8: Một sự thật khó chịu về bản thân được phơi bày sẽ khiến bạn cảm thấy thế nào?",
            answers: [
                { text: "Đau nhưng đáng giá. Đó là cơ hội để tôi trưởng thành.", code: "P" },
                { text: "Hơi sợ hãi, nhưng tôi tò mò muốn biết thêm.", code: "C" },
                { text: "Cảm thấy bị tấn công và muốn tự vệ hoặc bỏ chạy.", code: "K" },
                { text: "Cảm thấy bối rối và không biết phải làm gì tiếp theo.", code: "V" },
                { text: "Muốn tìm bằng chứng để phản biện lại \"sự thật\" đó.", code: "C" },
            ]
        },
        // Câu hỏi 9: Về Mối Quan Hệ với Người Hỗ Trợ
        {
            question: "Câu hỏi 9: Bạn mong đợi một chuyên gia tâm lý sẽ đóng vai trò gì trong cuộc sống của bạn?",
            answers: [
                { text: "Một người đồng hành, cầm đuốc soi đường để tôi tự tìm ra câu trả lời của mình.", code: "P" },
                { text: "Một người thầy, cung cấp kiến thức và các công cụ để tôi áp dụng.", code: "C" },
                { text: "Một vị cứu tinh, người sẽ giải quyết mọi vấn đề cho tôi.", code: "K" },
                { text: "Một người xác thực, giúp tôi tin rằng những cảm xúc của mình là có thật và tôi không hề đơn độc.", code: "P" },
                { text: "Một người lắng nghe, nơi tôi có thể trút bầu tâm sự một cách an toàn.", code: "V" },
            ]
        },
        // Câu hỏi 10: Về Mục Tiêu Cuối Cùng
        {
            question: "Câu hỏi 10: Mục tiêu cuối cùng mà bạn hình dung sau hành trình khám phá này là gì?",
            answers: [
                { text: "Trở nên thấu hiểu và tử tế hơn với mọi phiên bản của chính mình...", code: "P" },
                { text: "Trở nên thành công và hạnh phúc hơn trong cuộc sống.", code: "C" },
                { text: "Đạt đến một trạng thái 'giác ngộ', không còn khổ đau hay phiền não.", code: "K" },
                { text: "Đơn giản là cảm thấy tốt hơn so với hiện tại.", code: "V" },
                { text: "Trở thành một người tốt hơn để có thể chăm sóc cho những người tôi yêu thương.", code: "C" },
            ]
        }
    ].map(q => ({ ...q, answered: false, userAnswers: [] })); // Thêm các thuộc tính trạng thái vào mỗi câu hỏi

    // Lấy các thành phần DOM
    const registerModal = document.getElementById('register-modal');
    const userInfoForm = document.getElementById('userInfoForm');
    const mainContainer = document.querySelector('.container');
    const gateHub = document.getElementById('gate-hub');
    const portalOverlay = document.getElementById('portal-overlay');
    const questionModal = document.getElementById('question-modal');
    const modalQuestionText = document.getElementById('modal-question-text');
    const modalAnswersContainer = document.getElementById('modal-answers-container');
    const modalSaveBtn = document.getElementById('modal-save-btn');
    const submitBtn = document.getElementById('submitBtn');
    const resultContainer = document.getElementById('resultContainer');
    
    let currentQuestionIndex = null;
    let userData = {};

    /**
     * Kích hoạt hiệu ứng cổng thời gian và thực hiện một hành động ở giữa.
     * @param {function} callback - Hành động cần thực hiện.
     */
    function triggerPortalEffect(callback) {
        portalOverlay.classList.add('active');
        setTimeout(() => {
            if (callback) callback();
            portalOverlay.classList.remove('active');
        }, 500); // Nửa thời gian của animation (1s)
    }

    /**
     * Hiển thị cửa sổ câu hỏi (modal) với nội dung của câu hỏi được chọn.
     * @param {number} qIndex - Chỉ số của câu hỏi trong mảng quizData.
     */
    function showQuestionModal(qIndex) {
        currentQuestionIndex = qIndex;
        const questionData = quizData[qIndex];
        
        modalQuestionText.innerText = questionData.question;
        modalAnswersContainer.innerHTML = ''; // Xóa các câu trả lời cũ
        
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

    /**
     * Cập nhật giao diện của Sảnh Đường, làm sáng các cánh cổng đã trả lời.
     */
    function updateHubUI() {
        const gates = document.querySelectorAll('.gate');
        let allAnswered = quizData.every(q => q.answered);
        
        gates.forEach((gate, index) => {
            gate.classList.toggle('answered', quizData[index].answered);
        });

        submitBtn.classList.toggle('hidden', !allAnswered);
    }
    
    /**
     * Tính toán điểm số từ tất cả các câu trả lời của người dùng.
     * @returns {object} - Object chứa điểm P, C, K và các cờ (flags).
     */
    function calculateScores() {
        const scores = { P: 0, C: 0, K: 0 };
        const flags = [];

        quizData.forEach(q => {
            q.userAnswers.forEach(ua => {
                const answerData = q.answers[ua.ansIndex];
                const code = answerData.code;
                const priority = ua.priority;
                
                let points = 0;
                if (priority === 1) points = 3;
                else if (priority === 2) points = 2;
                else if (priority >= 3) points = 1;
                
                if (scores.hasOwnProperty(code)) {
                    scores[code] += points;
                }
                
                if (answerData.flag && (priority === 1 || priority === 2) && !flags.includes(answerData.flag)) {
                    flags.push(answerData.flag);
                }
            });
        });
        return { scores, flags };
    }

    /**
     * Phân tích điểm số để xác định hồ sơ và phản hồi.
     * @param {object} scores - Object điểm P, C, K.
     * @returns {object} - Object chứa profile và feedback text.
     */
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

    function saveintoCsv(data){
    }

    /**
     * Hiển thị kết quả cuối cùng trên giao diện.
     * @param {object} scores - Object điểm P, C, K.
     * @param {string} profile - Tên hồ sơ.
     * @param {string} feedback - Nội dung phản hồi.
     * @param {array} flags - Mảng các cờ đặc biệt.
     */
    function displayResults(scores, profile, feedback, flags) {
        resultContainer.classList.remove('hidden');
        
        const maxPossibleScore = quizData.length * 3; 

        document.getElementById('pScore').innerText = scores.P;
        document.getElementById('cScore').innerText = scores.C;
        document.getElementById('kScore').innerText = scores.K;

        document.getElementById('pScoreBar').style.width = (scores.P / maxPossibleScore) * 100 + '%';
        document.getElementById('cScoreBar').style.width = (scores.C / maxPossibleScore) * 100 + '%';
        document.getElementById('kScoreBar').style.width = (scores.K / maxPossibleScore) * 100 + '%';
        
        document.getElementById('profileText').innerText = profile;
        document.getElementById('feedbackText').innerText = feedback;

        const flagResultEl = document.getElementById('flagResult');
        if (flags.length > 0) {
            flagResultEl.classList.remove('hidden');
            if(flags.includes("IDENTITY_CONCERN")){
                 document.getElementById('flagText').innerText = "Lưu ý quan trọng: Hành trình của bạn có liên quan đến các câu hỏi sâu sắc về bản dạng và xu hướng cảm xúc. Chúng tôi đặc biệt khuyến nghị bạn tìm một người dẫn đường có kinh nghiệm chuyên sâu về lĩnh vực này để đảm bảo bạn nhận được sự hỗ trợ thấu cảm và phù hợp nhất.";
            }
        } else {
            flagResultEl.classList.add('hidden');
        }
        
        resultContainer.scrollIntoView({ behavior: 'smooth' });
    }

    // =========================================================================
    // PHẦN 3: KHỞI TẠO VÀ GẮN SỰ KIỆN
    // =========================================================================

    // ---- A. KHỞI TẠO VÒNG TRÒN CÁNH CỔNG ----
    function initializeGates() {
        const totalGates = quizData.length;
        const angleIncrement = 360 / totalGates;
        const hubContainerWidth = document.querySelector('.hub-container').offsetWidth;
        const calculatedRadius = Math.max(200, Math.min(hubContainerWidth / 2.2, 400));

        gateHub.innerHTML = ''; // Xóa các gate cũ nếu có

        quizData.forEach((_, index) => {
            const gate = document.createElement('div');
            gate.className = 'gate';
            gate.dataset.questionIndex = index;
            
            const currentAngle = index * angleIncrement;
            gate.style.setProperty('--angle', `${currentAngle}deg`);
            gate.style.setProperty('--radius', `${calculatedRadius}px`);

            gate.innerHTML = `
                <img src="https://i.pinimg.com/564x/a2/1c/63/a21c637494fbe542615a2f5a2a223961.jpg" alt="Cánh cổng ${index + 1}">
                <span class="gate-number">${index + 1}</span>
            `;
            
            gate.addEventListener('click', () => {
                triggerPortalEffect(() => showQuestionModal(index));
            });
            
            gateHub.appendChild(gate);
        });
        updateHubUI();
    }

    // ---- B. GẮN CÁC SỰ KIỆN (Event Listeners) ----

    // Sự kiện cho form đăng ký
    userInfoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        userData = {
            fullName: document.getElementById('fullName').value,
            dob: document.getElementById('dob').value,
            phone: document.getElementById('phone').value,
            referrer: document.getElementById('referrer').value
        };
        console.log("Thông tin người dùng:", userData);

        registerModal.style.opacity = '0';
        // Dùng setTimeout để đợi hiệu ứng mờ kết thúc
        setTimeout(() => {
             registerModal.style.display = 'none';
        }, 500);
        
        mainContainer.classList.remove('blurred');
    });

    // Sự kiện cho nút lưu trong modal câu hỏi
    modalSaveBtn.addEventListener('click', () => {
        const question = quizData[currentQuestionIndex];
        question.userAnswers = [];
        const answerInputs = modalAnswersContainer.querySelectorAll('.answer-item');
        let hasAnswers = false;
        
        answerInputs.forEach(item => {
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

    // Sự kiện cho nút submit cuối cùng
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
    });

    // Sự kiện cho việc bật/tắt ô nhập số trong modal câu hỏi
    modalAnswersContainer.addEventListener('change', function (e) {
        if (e.target.type === 'checkbox') {
            const priorityInput = e.target.parentElement.querySelector('.priority-input');
            priorityInput.disabled = !e.target.checked;
            if (!e.target.checked) priorityInput.value = '';
        }
    });

    // Sự kiện resize cửa sổ để vẽ lại vòng tròn cho responsive
    window.addEventListener('resize', initializeGates);

    // ---- C. CHẠY KHỞI TẠO ----
    initializeGates();
});