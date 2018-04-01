const git = new GitHub;
const ui = new UI;

const searchUser = document.getElementById("searchUser");

searchUser.addEventListener("keyup", (e) => {
    const userText = e.target.value;
    
    if(userText !== ""){ 
        git.gitUser(userText)
        .then(data => {
            if(data.profile.message === "Not Found"){
                //show alert
                ui.showAlert("User not found", "alert alert-danger");
            }else{
                ui.showProfile(data.profile);
                ui.showRepos(data.repos);
            }
        });
    }else{
        ui.clearProfile();
    }
});