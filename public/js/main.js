const submitbtn=document.getElementById("submitbtn");
const cityname=document.getElementById("cityname");
const city_name=document.getElementById("city_name");
const temp_status=document.getElementById("temp_status");
const temp=document.getElementById("temp_real_value");
const datahide=document.querySelector(".middle_layer");
const day=document.getElementById("day");
const date=document.getElementById("today_date");
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var d = new Date();
    const dayvalue=d.getDate()+"-" + months[d.getMonth()] + "-"+ d.getFullYear();
    date.innerText=dayvalue;
    const weekvalue= days[d.getDay()];
    day.innerText=weekvalue;
const getInfo = async (event)=>{
    event.preventDefault();
    let cityval=cityname.value;
    //console.log(cityval.length);
    
    if(cityval == ""){
        city_name.innerText=`Please enter the city name.`;
        datahide.classList.add('data_hide');
    }else
    {
        try{
            let url=`http://api.openweathermap.org/data/2.5/weather?q=${cityval}&units=metric&appid=ecd53e0d267c04d97d29cfc882fea0d9`;
            const response=await fetch(url);
            const data=await response.json();
            const arraydata=[data];
            
            temp.innerText=arraydata[0].main.temp;
            const tempstatus=arraydata[0].weather[0].main;
            //console.log(tempstatus);
            city_name.innerText=`${arraydata[0].name} , ${arraydata[0].sys.country}`;
            if(tempstatus == "Clear")
            {
                temp_status.innerHTML = "<i  class='fas fa-sun' style='color: #eccc68;'></i>";
            }
            else if(tempstatus == "Clouds")
            {
                temp_status.innerHTML = "<i class='fas fa-cloud' style='color: #f1f2f6;'></i>";
            }
            else if(tempstatus == "Rain")
            {
                temp_status.innerHTML = "<i class='fas fa-cloud-rain' style:'color: #a4b0be;'></i>";
            }
            else 
            {
                temp_status.innerHTML = "<i class='fas fa-cloud' style='color: #f1f2f6;'></i>";
            }
            datahide.classList.remove('data_hide');
            cityval="";
            //console.log(data);
        }
        catch{
            city_name.innerText=`Please enter the valid city name.`;
            datahide.classList.add('data_hide');
        }
        
    }
}
submitbtn.addEventListener('click',getInfo);