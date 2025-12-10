async function callSimpleWorkFlows(option){
    var input = document.getElementById("userInput").value;
    let d1Container = document.getElementById("d1-results");
    let d2Container = document.getElementById("d2-results");
    let ragContainer = document.getElementById("rag-results");
    if(option === 'rag'){
        input = document.getElementById("ragInput").value;
    }
    const response = await fetch(`https://n8n-service-u2ox.onrender.com/webhook/9c10fb82-b1da-44f6-8aec-9914ed2be67b/${option}/${input}`);
    const data = await response.json();
    if (option === 'rag'){
        newDiv = document.createElement("div");
        newDiv.innerText = `${data['output']}`;
        newDiv.className = "item-box";
        ragContainer.appendChild(newDiv);        
        return;
    }
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

async function loadDeliverables(){
    const fileList =[
        "workflows/deliverables/Simple workflow.json",
        "workflows/deliverables/Simple workflow w_LLM.json",
        "workflows/deliverables/rag.json",
        "workflows/deliverables/Telegram Bot.json",
        "workflows/deliverables/webhook routing.json",
        "workflows/deliverables/MCP.json"
    ];
    for (let i = 1; i <=6; i++) {
        const demoElement = document.getElementById(`deliverable-demo${i}`);
        const workflowFile = await fetch(fileList[i-1]);
        const workflowText = JSON.stringify(await workflowFile.json());
        demoElement.setAttribute('workflow', workflowText);
        console.log(`Loaded deliverable ${i}`);
    }
}

const workflows = {
    1: 'workflows/rag-fp.json',
    2: 'workflows/Gmail ticket submission.json',
    3: 'workflows/telegram.json',
    4: 'workflows/webscraper.json',
    5: 'workflows/recursive auto save.json',
    6: 'workflows/New ticket handler.json',
}

const workflowTitles = {
    1: 'RAG Test for Final Project',
    2: 'Email Submission Handler',
    3: 'Telegram Bot',
    4: 'Web Scraper',
    5: 'Github Auto Save',
    6: 'New Ticket Handler',
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


