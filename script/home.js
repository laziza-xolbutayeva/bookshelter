'use strict'

// localStora*ge.clear();
// barcha data
async function getUser(){
    const users=await fetch(`https://restcountries.com/v2/all`);
    const result=await users.json();
    return result;
}

// barchasini render qilish
async function dataRender(num=1){
    const data= await getUser();
    const currentPage=num;
    const totalPage=6;
    
    const start=currentPage*totalPage;
    const end=start-totalPage;

    const lastData=data.slice(end,start);

    paginate(data,lastData,totalPage,currentPage);
}

// paginatsiya chiqarish
function paginate(all,data,current,num){
    let dot=[];
    $('.pagination').innerHTML='<li class="p-3 shadow m-2 rounded" id="previous">&laquo;</li>';
    $('.books').innerHTML='';

    for (let i = 1; i <=Math.ceil(all.length/current); i++) {
        dot.push(i);
    }

    dot.forEach(i=>{
        const li=createElements('li',`${i==num?"page-item p-3 shadow m-2 rounded activ":"page-item p-3 shadow m-2 rounded"}`,i);
        if(!(num-1<=i && i<=num+1)){
            li.style.display="none";
        }
        $('.pagination').appendChild(li);
    });
    let prew=createElements('li','p-3 shadow m-2 rounded',`&raquo;`);
    prew.setAttribute('id',"next");
    $('.pagination').appendChild(prew);
    data.forEach(item => {
        const div=createElements('div','col-4',`<div class="countries text-center card shadow my-3">
        <img src="${item.flags.png}" alt="flag" class='card-img h-50'>
        <div class="card__body h-25 mt-2">
        <h2 class="fs-3">${item.name}</h2>
        <p>${item.nativeName}</p>
        <div class="countries__btns d-flex justify-content-between px-4 ">
            <button class="btn btn-secondary bookmarkAdd" data-item="${item.name}">Bookmark</button>
            <button class="btn btn-primary text-light more" data-item="${item.name}">More Info</button>
        </div>
        </div>    
        </div>`);
        $('.books').appendChild(div);
    });
    $('#resultNum').textContent=all.length;
}
dataRender()

// qidirish
async function searchData(query,num=1){
    const users=await fetch(`https://restcountries.com/v2/name/${query}`);
    const data=await users.json();
    console.log(data);
    const currentPage=num;
    const totalPage=6;
    
    const start=currentPage*totalPage;
    const end=start-totalPage;

    const lastData=data.slice(end,start);

    paginate(data,lastData,totalPage,currentPage);
}

// inputga kiritish
$('#search').addEventListener('keyup',(e)=>{
    if(!(e.target.value.length==0)){
        searchData(e.target.value.trim().toLowerCase());
    }else{
        dataRender()
    }
})

// paginatsiya bosilganda uzgarish
$('.pagination').addEventListener('click',(e)=>{
    if(e.target.classList.contains('page-item')){
        if($('#search').value){
            searchData($('#search').value.trim().toLowerCase(),e.target.textContent*1);
        }else{
            dataRender(e.target.textContent*1);
        }
    }
    if(e.target.getAttribute("id")){
        if(e.target.getAttribute("id")=="previous"){
            for(let i=0;i<$a(".page-item").length;i++){
                if($a(".page-item")[i].style.display!="none" && i!=0){
                    $a(".page-item")[i-1].style.display="block";
                    $a(".page-item")[i+2].style.display="none";
                    break;
                }
            }
        }else if(e.target.getAttribute("id")=="next"){
            for(let i=0;i<$a(".page-item").length;i++){
                if($a(".page-item")[i].style.display!="none" && i<$a(".page-item").length-2){
                    $a(".page-item")[i].style.display="none";
                    $a(".page-item")[i+2].style.display="block";
                    $a(".page-item")[i+3].style.display="block";
                    break;
                }
            }
        }
    }
})

// more info bosish
$('.books').addEventListener('click',(e)=>{
    if(e.target.classList.contains("more")){
        moreInfo(e.target.dataset.item);
    }
})
$('.modals-content').style.display="none";

// more info bosilganda oyna ochish
async function moreInfo(name){
    const users=await fetch(`https://restcountries.com/v2/name/${name}`);
    const res=await users.json();

    $('.modals-content').style.display="flex";
    $(".modals_title").textContent=res[0].name;
    let card=createElements('div','modal_card pt-3 text-dark w-75 m-auto',`
        <img src="${res[0].flags.png}" alt="flag" class="modal_img">
        <div class="row text-start">
            <div class="col-12"><h2 class="my-2">${res[0].name}</h2></div>
            <div class="col-12"><p>nativeName: ${res[0].nativeName}</p></div>
            <div class="col-12"><p>capital: ${res[0].capital},</p></div>
            <div class="col-12"><p>subregion: ${res[0].subregion}</p></div>
            <div class="col-12"><p>currencies: ${res[0].currencies[0].name}</p></div>
            <div class="col-12"><p>population: ${res[0].population}</p></div>
            <div class="col-12"><p>callingCodes: ${res[0].callingCodes[0]}</p></div>
            <div class="col-12"><p>independent: ${res[0].independent}</p></div>  
        </div>`)
    $('.wrapper').appendChild(card);
}

// more info oynasini yopish
$('.modal_close').addEventListener('click',()=>{
    $('.wrapper').innerHTML='';

    $('.modals-content').style.display="none";

})

let obj=[];
if(localStorage.getItem("bookmark")){
    obj=(JSON.parse(localStorage.getItem("bookmark")));
    Add();
}

$('.books').addEventListener('click',(e)=>{
    if(e.target.classList.contains("bookmarkAdd")){
        bookmarkAdd(e.target.dataset.item);
    }
})

function bookmarkAdd(name){
    // let countries= await fetch(`https://restcountries.com/v2/name/${name}`);
    // let result=await countries.json();
    if(!(obj.includes(name))){
        obj.push(name);
        localStorage.setItem("bookmark",JSON.stringify(obj));
    }
    Add();
}

async function Add(){
    $('.bookmark').innerHTML="";
    if(obj.length!=0){
    obj.forEach((item)=>{
        getD(item);
    })
}
}

async function getD(name){
    let countries=await fetch(`https://restcountries.com/v2/name/${name}`);
    let result=await countries.json();
    let div=createElements('div','d-flex bg-light py-2 rounded my-2',`
        <div class="w-75">
            <h4>${result[0].name}</h4>
            <p>${result[0].subregion}</p>
        </div>
        <div class="pt-4">
            <span><img src="/img/book-open 1.svg" alt=""></span>
            <span ><img src="/img/delete 1.svg" alt="delete" class="delete" data-name="${result[0].name}"></span>
        </div>`);
        $('.bookmark').appendChild(div);
}

$('.bookmark').addEventListener('click',(e)=>{
    if(e.target.classList.contains("delete")){
        console.log(obj.findIndex((item)=>item==e.target.getAttribute("data-name")));
        obj.splice(obj.findIndex((item)=>item==e.target.getAttribute("data-name")),1);
        Add();
    }
})


$('.bi-brightness-high-fill').addEventListener("click",()=>{
    if($('#logo').getAttribute('src')=='/img/Group 193 home.png'){
    $('body').style.backgroundColor="rgb(71, 71, 71)";
    $('body').style.color="white";
    $('#logo').setAttribute('src','/img/Group 200.png');
    $('.box-1').classList.remove("border-light");
    $('.box-1').classList.add("border-dark");
return 0;}
    else{
        $('body').style.backgroundColor="white";
        $('body').style.color="black";
        $('#logo').setAttribute('src','/img/Group 193 home.png');
        $('.box-1').classList.remove("border-dark");
        $('.box-1').classList.add("border-light");
        return 0;
    }

})
