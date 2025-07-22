from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///vongtron.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# ------------------------
# BẢNG 1: Người dùng
# ------------------------
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(100), nullable=False)
    dob = db.Column(db.String(20), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    referrer = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Quan hệ 1-n với bảng kết quả
    results = db.relationship('Result', backref='user', lazy=True)

# ------------------------
# BẢNG 2: Kết quả trắc nghiệm
# ------------------------
class Result(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    p_score = db.Column(db.Integer)
    c_score = db.Column(db.Integer)
    k_score = db.Column(db.Integer)
    profile = db.Column(db.String(100))
    feedback = db.Column(db.Text)
    raw_answers = db.Column(db.Text)  # Lưu JSON string các đáp án chi tiết
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# ------------------------
# ROUTES
# ------------------------
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/submit_user', methods=['POST'])
def submit_user():
    data = request.json
    user = User(
        full_name=data.get('fullName'),
        dob=data.get('dob'),
        phone=data.get('phone'),
        referrer=data.get('referrer')
    )
    db.session.add(user)
    db.session.commit()
    return jsonify({"status": "success", "user_id": user.id})

@app.route('/submit_result', methods=['POST'])
def submit_result():
    data = request.json
    user_id = data.get('user_id')
    result = Result(
        user_id=user_id,
        p_score=data.get('p_score'),
        c_score=data.get('c_score'),
        k_score=data.get('k_score'),
        profile=data.get('profile'),
        feedback=data.get('feedback'),
        raw_answers=data.get('raw_answers')
    )
    db.session.add(result)
    db.session.commit()
    return jsonify({"status": "success"})

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Tạo bảng nếu chưa có
    app.run(debug=True)