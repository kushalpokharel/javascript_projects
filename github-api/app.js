const searchUser = document.getElementById('searchUser');

const github = new Github;

const ui = new UI;

searchUser.addEventListener('keyup',e=>{

  const userText = e.target.value;
  //github.getUser(userText);

  if(!userText){
    ui.clearProfile();
  }
  else{
    //get the user profile
    github.getUser(userText)
      .then(data=>{
        if(data.profile.message === "Not Found"){
          //show alert
          ui.showAlert('User not found','alert alert-danger');
        }
        else{
          //display the profile
          console.log(data.profile.login);
          ui.displayUser(data.profile);
          ui.displayRepos(data.repos);
        }
      })

  }
})