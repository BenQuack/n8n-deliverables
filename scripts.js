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

const workflows = {
    1: 'workflows/rag-fp.json',
    2: 'workflows/email chatbot.json',
    3: 'workflows/telegram.json',
    4: 'workflows/webscraper.json',
    5: '',
    6: '',
}

const workflowTitles = {
    1: 'RAG Test for Final Project',
    2: 'Email Chatbot',
    3: 'Telegram Bot',
    4: 'Web Scraper',
    5: 'Workflow 5',
    6: 'Workflow 6',
}


async function loadWorkflow(){
    console.log('Loading workflow id: ', localStorage.getItem("selectedWorkflow"));
    const demo = document.getElementById("demo");
    const header = document.getElementById("workflowTitle");
    const workflowId = localStorage.getItem("selectedWorkflow");
    header.innerText = workflowTitles[workflowId];
    const response = await fetch(workflows[workflowId]);
    const workflow = await response.json();
    demo.setAttribute('workflow', JSON.stringify(workflow));
}

function selectWorkflow(id){
    localStorage.setItem("selectedWorkflow", id);
}


