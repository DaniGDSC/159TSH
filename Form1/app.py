from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

# =========================
# App & Database Config
# =========================
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///vongtron.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# =========================
# Database Models
# =========================

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
    raw_answers = db.Column(db.Text)  # JSON string
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class TempAnswer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    question_index = db.Column(db.Integer)
    answer_index = db.Column(db.Integer)
    priority = db.Column(db.Integer)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

# =========================
# Routes
# =========================

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
    result = Result(
        user_id=data.get('user_id'),
        p_score=data.get('p_score'),
        c_score=data.get('c_score'),
        k_score=data.get('k_score'),
        profile=data.get('profile'),j
        feedback=data.get('feedback'),
        raw_answers=data.get('raw_answers')
    )
    db.session.add(result)
    db.session.commit()
    return jsonify({"status": "success"})

@app.route('/save_answer', methods=['POST'])
def save_answer():
    data = request.json
    user_id = data.get('user_id')
    question_index = data.get('question_index')
    answer_index = data.get('answer_index')
    priority = data.get('priority')

    temp = TempAnswer.query.filter_by(
        user_id=user_id,
        question_index=question_index,
        answer_index=answer_index
    ).first()

    if priority is None:
        # Nếu bỏ chọn, xóa đáp án tạm thời
        if temp:
            db.session.delete(temp)
            db.session.commit()
        return jsonify({"status": "deleted"})

    if temp:
        temp.priority = priority
        temp.updated_at = datetime.utcnow()
    else:
        temp = TempAnswer(
            user_id=user_id,
            question_index=question_index,
            answer_index=answer_index,
            priority=priority
        )
        db.session.add(temp)
    db.session.commit()
    return jsonify({"status": "saved"})

# (Optional) API lấy lại đáp án tạm thời cho user
@app.route('/get_temp_answers', methods=['GET'])
def get_temp_answers():
    user_id = request.args.get('user_id')
    answers = TempAnswer.query.filter_by(user_id=user_id).all()
    result = [
        {
            "question_index": a.question_index,
            "answer_index": a.answer_index,
            "priority": a.priority
        } for a in answers
    ]
    return jsonify(result)

# =========================
# Main
# =========================

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)