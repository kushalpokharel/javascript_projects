class Github{

  constructor(){
    this.client_id='7535e5a286bc9aa54e7e';
    this.client_secret ='94ffdc2bf567bd4b1f848d7357884980d9507eb7';
    this.repo_count  = 5;
    this.repo_sort = 'create:asc'; 
  }

  async getUser(user){
    const link=`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`;

    const repoLink=`https://api.github.com/users/${user}/repos?per_page=${this.repo_count}&sort=${this.repo_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`;

    const response = await fetch(link);

    const profile = await response.json();

    const resp = await fetch(repoLink);

    const repos = await resp.json();

    return{
      profile,
      repos
    }
  }
}