async function allData(){
    let data=await fetch("https://reqres.in/api/users?page=2");
    let result=await data.json();
    result.data.forEach((item) => {
        
        let col=createElements('div','col-6 col-sm-4 col-lg-2',`
    <div class="card text-center shadow">
        <div class="card-body p-0 m-1">
            <h3 class="card-title">${item.first_name}</h3>
            <p class="card-text">${item.email}</p>
        </div>
        <img src="${item.avatar}" alt="img" class="card-img-bottom">
    </div>`);
        $('.cards').appendChild(col);
    });
    console.log(result);
};
allData();