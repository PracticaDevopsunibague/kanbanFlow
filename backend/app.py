from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    return '<h1>KanbanFlow - Test App Running!</h1><p>Django app will be configured soon.</p>'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)