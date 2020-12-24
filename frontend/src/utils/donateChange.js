function main(){
    const donateToBankBtn = document.querySelector(".donate-to-bank");

    donateToBankBtn.addEventListener('click', () => {
    console.log(donateToBankBtn[0]);
    alert("clicked");

});
}

document.onload(main());



