import json
from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from datetime import datetime
from openpyxl import Workbook

# --- Setup Flask app and DB ---
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///vongtron.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# --- Models (giống app.py) ---
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(100), nullable=False)
    dob = db.Column(db.String(20), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    referrer = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    results = db.relationship('Result', backref='user', lazy=True)

class Result(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    p_score = db.Column(db.Integer)
    c_score = db.Column(db.Integer)
    k_score = db.Column(db.Integer)
    profile = db.Column(db.String(100))
    feedback = db.Column(db.Text)
    raw_answers = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

def export_results_excel(filename='export_results.xlsx'):
    with app.app_context():
        results = db.session.query(Result, User).join(User, Result.user_id == User.id).all()
        wb = Workbook()
        ws = wb.active
        ws.title = "Quiz Results"
        # Header
        ws.append([
            "STT", "Họ và tên", "Sinh nhật", "Số Điện thoại", "Người giới thiệu",
            "Câu hỏi", "Đáp án", "Điểm số", "Thời gian tạo bản ghi result"
        ])
        stt = 1
        for result, user in results:
            try:
                raw = json.loads(result.raw_answers)
            except Exception:
                continue
            for q_idx, q in enumerate(raw):
                question_text = q.get('question', '')
                # Có thể có nhiều đáp án cho 1 câu hỏi (nhiều lựa chọn)
                for ua in q.get('userAnswers', []):
                    ans_idx = ua.get('ansIndex')
                    priority = ua.get('priority')
                    # Lấy text đáp án
                    answer_text = q['answers'][ans_idx]['text'] if ans_idx is not None and ans_idx < len(q['answers']) else ''
                    ws.append([
                        stt,
                        user.full_name,
                        user.dob,
                        user.phone,
                        user.referrer,
                        question_text,
                        answer_text,
                        priority,
                        result.created_at.strftime('%Y-%m-%d %H:%M:%S') if result.created_at else ''
                    ])
            stt += 1
        wb.save(filename)
        print(f"Exported to {filename}")

if __name__ == '__main__':
    export_results_excel()