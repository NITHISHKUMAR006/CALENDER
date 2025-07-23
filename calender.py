from flask import Flask, request, jsonify, send_from_directory
import calendar
import os

app = Flask(__name__, static_folder='../frontend')

@app.route('/api/calendar')
def get_calendar():
    year = int(request.args.get('year'))
    month = int(request.args.get('month'))
    cal = calendar.TextCalendar(calendar.MONDAY)
    month_name = calendar.month_name[month]
    # Build data for frontend table rendering
    first_weekday, days_in_month = calendar.monthrange(year, month)
    rows = []
    week = []
    day_counter = 1
    # Fill week with empty days before month starts
    for i in range(first_weekday):
        week.append('')
    while day_counter <= days_in_month:
        week.append(day_counter)
        if len(week) == 7:
            rows.append(week)
            week = []
        day_counter += 1
    if week:
        while len(week) < 7:
            week.append('')
        rows.append(week)
    return jsonify({"year": year, "month": month, "month_name": month_name, "weeks": rows})

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_frontend(path):
    # Serve static files for SPA frontend
    if path == "" or path == "index.html":
        return send_from_directory(app.static_folder, "index.html")
    else:
        return send_from_directory(app.static_folder, path)

if __name__ == '__main__':
    app.run(debug=True)
