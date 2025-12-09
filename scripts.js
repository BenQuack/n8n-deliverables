async function callSimpleWorkFlows(option){
    const name = document.getElementById("userInput").value;
    let d1Container = document.getElementById("d1-results");
    let d2Container = document.getElementById("d2-results");
    const response = await fetch(`https://n8n-service-u2ox.onrender.com/webhook/9c10fb82-b1da-44f6-8aec-9914ed2be67b/${option}/${name}`);
    const data = await response.json();
    console.log(data);
    for(var i=0; i<data.length; i++){
        let row = data[i];
        let newDiv = document.createElement("div");
        if(option === 'basic'){
            newDiv.innerText = `Name: ${row['name']}\nTime: ${row['time']}`;
            newDiv.className = "item-box";
            d1Container.appendChild(newDiv);
        } else if (option == 'basic_llm'){
            newDiv.innerText = `Name: ${row['name']}\nName Origin: ${row['name origin']}\nTime: ${row['time']}`;
            newDiv.className = "item-box";
            d2Container.appendChild(newDiv);
        }
    }
}


