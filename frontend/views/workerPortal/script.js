document.addEventListener('DOMContentLoaded', function() {
    // My Tasks Link-ta dhora holo (Ekhon ID thik kore deoa hoyechhe)
    const tasksLink = document.getElementById('myTasksLink');

    // Link-e click event listener jora holo
    if (tasksLink) {
        tasksLink.addEventListener('click', function(event) {
            // Default link action bondho kora holo (href="#")
            event.preventDefault(); 
            
            // Worker Tasks page-e redirect kora holo (File name thik kora holo)
            window.location.href = 'my_requests.html';
        });
    }
});