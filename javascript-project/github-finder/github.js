class GitHub{
    constructor(){
        this.client_id = "9bd2949429cfae5063bd";
        this.client_secret = "86251af9db74f9e8a3324807d8d6bd3150e7fd8e";
        this.repos_count = 5;
        this.repos_sort = 'created: asc';
    }

    async gitUser(user){

        const profileResponse = await fetch(`https://api.github.com/users/${user}
        ?client_id=${this.client_id}&client_secret=${this.client_secret}`);

        const repoResponse = await fetch(`https://api.github.com/users/${user}/repos`+
        `?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`);

        const profile = await profileResponse.json();
        const repos = await repoResponse.json();

        return{
            profile,
            repos
        }

    }
}