document.getElementById('calendarForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const year = parseInt(document.getElementById('year').value);
    const month = parseInt(document.getElementById('month').value);

    if (!year || !month || month < 1 || month > 12) {
        document.getElementById('calendarOutput').innerHTML =
            "<span style='color: #ff1744;'>Please enter a valid year and month.</span>";
        return;
    }
    // Fetch calendar data from Flask backend
    const res = await fetch(`/api/calendar?year=${year}&month=${month}`);
    const data = await res.json();
    renderCalendar(data);
});

function renderCalendar(data) {
    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    let html = `<h2 style="text-align:center;">${data.month_name} ${data.year}</h2>`;
    html += `<table class="calendar-table"><thead><tr>`;
    for (let d of daysOfWeek) html += `<th>${d}</th>`;
    html += `</tr></thead><tbody>`;
    data.weeks.forEach(week => {
        html += `<tr>`;
        week.forEach((day, i) => {
            let cls = "";
            if (i === 5 || i === 6) cls += " weekend";
            // Highlight today
            const today = new Date();
            if (
                day === today.getDate() &&
                data.month === today.getMonth() + 1 &&
                data.year === today.getFullYear()
            ) cls += " today";
            html += `<
