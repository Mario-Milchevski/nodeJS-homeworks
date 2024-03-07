//Fetching the API we created from a front-end 
fetch('http://localhost:3000/api/trainers')
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));