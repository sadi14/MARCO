document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const activitiesButton = document.getElementById('activitiesButton');

    if (activitiesButton) {
        activitiesButton.addEventListener('click', () => {
            if (sidebar) {
                sidebar.style.width = sidebar.style.width === "250px" ? "0" : "250px";
            }
        });
    }

    function addActivity(activity) {
        const newActivity = document.createElement('li');
        newActivity.textContent = activity;
        document.getElementById('activityList').appendChild(newActivity);
    }
});  