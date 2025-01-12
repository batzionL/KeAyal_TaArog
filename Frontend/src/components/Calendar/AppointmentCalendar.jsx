export const AppointmentCalendar = () => {
    const calander = process.env.REACT_APP_CALANDER_IFRAME;
    // const startDate = "20241230T100000Z";
    // const endDate = "20241230T110000Z";
    // const title = encodeURIComponent("תור לרופא");
    // const details = encodeURIComponent("תור שנקבע דרך האתר");

    // const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${startDate}/${endDate}&text=${title}&details=${details}`;
    // console.log('Calendar IFrame URL:', calander);
    // console.log(process.env);

    return (
        // <div>
            <center>
            <h2>בחרי תור מהיומן</h2>
            <iframe
                title="Google Calendar"
                src={calander}
                style={{ border: 0 }}
                width="800"
                height="600"
                frameBorder="0"
                scrolling="no"
            ></iframe>
            </center>
        // {/* </div> */}
    );
};