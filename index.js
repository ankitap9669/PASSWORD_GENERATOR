const len_number=document.querySelector("[data-lengthnumber]");
const inputslide=document.querySelector("[data-slidenumber]");
const uppercase=document.querySelector("#uppercase");
const number=document.querySelector("#number");
const lowercase=document.querySelector("#lowercase");
const symbol=document.querySelector("#symbol");
const allcheckbox=document.getElementsByClassName("check");
const setcolor=document.querySelector("[data-strongcolor]");
const getbtn=document.querySelector("#getbtn");
let getpassword=document.querySelector("[data-password]");
const copybtn=document.querySelector("#copybtn");
const copymsg=document.querySelector("#copymsg"); 
let arr=[];
const sym="!@#$%^&*<>?|\[])(";
let passwordlength=10;
let password="";
let count=0;
handleslide();
function handleslide()
{
    inputslide.value=passwordlength;
    len_number.innerText=passwordlength;
}
function strong(col)
{
    setcolor.style.backgroundColor = col;
}
inputslide.addEventListener('input',(e)=>
{
    passwordlength=e.target.value;
    handleslide();
})
function getrndinterger(min,max)
{
    let s=Math.floor(Math.random()*(max-min)+min);
   return s;
}
function getuppercase()
{
    return String.fromCharCode(getrndinterger(65,91));
}
function getlowercase()
{
   return String.fromCharCode(getrndinterger(97,122));
}
function getsymbol()
{
    return sym.charAt(getrndinterger(0,sym.length));
 
}
function getnumber()
{
    return getrndinterger(1,9);
}
function choosestrong()
{
    let hupper=false;
    let hlower=false;
    let hsymbol=false;
    let hnumber=false;
    if(uppercase.checked)
    {hupper=true;}
    if(lowercase.checked)
    {hlower=true;}
    if(number.checked)
    {hnumber=true;}
    if(symbol.checked)
    {hsymbol=true;}
    if(hupper && hlower && (hnumber || hsymbol) && passwordlength>=8)
    {
        strong("#008000");
    }
    else if((hupper || hlower)&&(hnumber || hsymbol)&& passwordlength>=6)
    {
        strong("#FFA500");
    }
    else
    {
        strong("#FFFFFF");
    }
}
function suffle(o)
{
    var array=o.split('');
    let temp="";
    var num;
    for(let i=0;i<passwordlength;i++)
    {
      num=getrndinterger(0,passwordlength);
       let s=array[i];
       array[i]=array[num];
       array[num]=s;
    }
     temp=array.join('');
    return temp;
}
function handlrcheckbox()
{
     count=0;
     for(let i=0;i<allcheckbox.length; i++)
     {  
      if(allcheckbox[i].checked)
      { count++;}
    }
}
for(let i=0;i<allcheckbox.length; i++)
{
    allcheckbox[i].addEventListener('change',handlrcheckbox);
}
 async function copied()
{
   try{
    await navigator.clipboard.writeText(getpassword.value);
    copymsg.innerText="copied";
   }
   catch(e){
         prompt("not copied",e);   
   }
   copymsg.classList.add("active");
   setTimeout(()=>copymsg.classList.remove("active"),2000);
}
copybtn.addEventListener('click',copied);
function handlrpassword()
{
     if(count==0)
     {
        return;
     }
    if(passwordlength<count)
    { 
        passwordlength=count;
        handleslide();
    }
    password="";
    if(uppercase.checked)
    {
        arr.push(getuppercase);
    }
    if(lowercase.checked)
    {
        arr.push(getlowercase);
    }
    if(number.checked)
    {
        arr.push(getnumber);
    }
    if(symbol.checked)
    {
        arr.push(getsymbol);
    }

   for(let i=0;i<arr.length;i++)
   {
       password+=arr[i]();
   }
   for(let i=0;i<passwordlength-arr.length;i++)
   {
            let rendix=getrndinterger(0,arr.length);
            password+=arr[rendix]();
   }
  
   var getpass=suffle(password)
   getpassword.value=getpass;
   choosestrong();
   arr.length=0;
}
getbtn.addEventListener("click",handlrpassword);