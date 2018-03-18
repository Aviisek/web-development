//Listen on submit

document.getElementById("loan-form").addEventListener('submit', function(event){
    //hide result
    document.getElementById("result").style.display = "none";
    
    //show Loading gif
    
    document.getElementById("loading").style.display = "block";
    
    setTimeout(calcResult,2000);
    
    event.preventDefault();
    
});

function calcResult(){
    
    const amount = document.getElementById("amount");
    const interest = document.getElementById("interest");
    const years = document.getElementById("years");
    const monthlyPayment = document.getElementById("monthly-payment");
    const totalPayment = document.getElementById("total-payment");
    const totalInterest = document.getElementById("total-interest");


    const principal = parseFloat(amount.value)
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayment = parseFloat(years.value) * 12;

    const x = Math.pow(1 + calculatedInterest, calculatedPayment);
    const monthly = (principal * x * calculatedInterest) / (x - 1);
    
    if(isFinite(monthly)){
        
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayment).toFixed(2);
        totalInterest.value = ((monthly*calculatedPayment) - principal).toFixed(2);
       
       }else{
           
           showError("please enter valid numbers");
       
       }
    
    //show result
    document.getElementById("result").style.display = "block";
    
    //hide Loading gif
    
    document.getElementById("loading").style.display = "none ";
    
}

function showError(error){
    
    const errorDiv = document.createElement("div");
    
    //get elements
    const card = document.querySelector(".card");
    const heading = document.querySelector(".heading");
    
    errorDiv.className = "alert alert-danger";
    errorDiv.appendChild(document.createTextNode(error))
    
    //insert error above heading
    card.insertBefore(errorDiv,heading);
    
    //clear after 3 seconds
    setTimeout(clearError,3000);
    
    function clearError(){
        document.querySelector(".alert-danger").remove();
    }
}