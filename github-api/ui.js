class UI{
  

  displayUser(user){
    const profile = document.getElementById('profile');
    if(!user.blog)
      user.blog = 'NA';
    if(!user.company)
      user.company = 'NA';
    if(!user.location)
      user.location  = 'NA';
    profile.innerHTML  = `
    <div class="card card-body mb-3">
      <div class="row">
        <div class="col-md-4">
          <img class="img-fluid mb-2" src="${user.avatar_url}">
          <a href ="${user.html_url}" role="button" class="btn btn-primary btn-block mb-2">Visit Profile</a>
        </div>
        <div class="col-md-8">
          <span class="badge badge-success">Followers ${user.followers}</span>
          <span class="badge badge-warning">Following ${user.following}</span>
          <span class="badge badge-info">Public Repos ${user.public_repos}</span>
          <span class="badge badge-danger">Public Gists ${user.public_gists} </span>
          <br><br>
          <ul class="list-group">
            <li class="list-group-item">Login Id : ${user.login}</li>
            <li class="list-group-item">Company : ${user.company}</li>
            <li class="list-group-item">Blog : ${user.blog}</li>
            <li class="list-group-item">Location : ${user.location} </li>
            <li class="list-group-item">Created at : ${user.created_at}</li>
          </ul>
        </div>
      </div>
    </div>
    `
  }

  showAlert(msg,className){
    this.clearAlert();

    const div = document.createElement('div');
    div.className = className;
    
    div.appendChild(document.createTextNode(msg));

    const container = document.querySelector('.searchContainer');

    const search = document.querySelector('.search');

    container.insertBefore(div,search);

    setTimeout(this.clearAlert,3000);
  }

  displayRepos(repos){
    let output='';

    repos.forEach(function(repo){
      output+=`
        <div class="card card-body mb-2">
          <div class="row">
            <div class=" col-md-6">
              <a href = "${repo.html_url}"> ${repo.name}</a>
            </div>
            <div class=" col-md-6">
            <span class="badge badge-success">Watcher count ${repo.watchers_count}</span>
            <span class="badge badge-warning">Stargazer count ${repo.stargazers_count}</span>
            <span class="badge badge-info"> Forks count ${repo.forks_count}</span>  
            </div>
          </div>
        </div>
      `
    });

    document.querySelector('#repos').innerHTML=output;
  }

  clearAlert(){
    const currAlert = document.querySelector('.alert');
    if(currAlert){
      currAlert.remove();
    }
  }

  clearProfile(){
    profile.innerHTML='';
    repos.innerHTML='';
  }
}