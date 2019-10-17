document.addEventListener('DOMContentLoaded', {})

// API CONSTANTS

    baseURL = "https://api.github.com/"
    searchURL = `${baseURL}search/users?q=`


// DOM CONSTANTS

    searchForm = document.querySelector('#github-form')
    userList = document.querySelector('#user-list')
    reposList = document.querySelector('#repos-list')

// API

    function get(keyWord){
        return fetch(searchURL+keyWord).then(resp => resp.json())
    }

    function getRepos(user){
        return fetch(baseURL+`users/${user}/repos`).then(resp => resp.json())
    }

// FUNCTIONALITY

searchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    userList.innerText = ""
    searchFunction(e.target.elements[0].value)
})

function searchFunction(keyWord){
    get(keyWord).then(results => {
        results.items.forEach(r =>{
            displayResult(r)
        })
    })
}

function displayResult(r){
    userDiv = document.createElement('div')
    userDiv.id = r.id
    userDiv.addEventListener('click', () => displayRepos(r))

    let username = document.createElement('h3')
    username.innerText = r.login
    
    
    let image = document.createElement('img')
    image.src = r.avatar_url
    image.height = 100

    userDiv.append(username, image)
    userList.append(userDiv)
}


function displayRepos(r){
    getRepos(r.login).then(repos => {
        repos.forEach(repo =>{
            createRepo(repo)
        })
    })
}

function createRepo(repo){
    
    name = document.createElement('li')
    name.id = repo.id
    name.innerText = repo.name

    reposList.append(name)
}   

// HELPER METHODS

