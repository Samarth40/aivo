const BASE_URL = 'http://localhost:5000/api';

async function testService(name, startEndpoint, startBody, pollEndpoint) {
    console.log(`\n--- Testing ${name} ---`);
    try {
        const resStart = await fetch(`${BASE_URL}${startEndpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(startBody)
        });
        
        const startData = await resStart.json();
        if (!resStart.ok) {
            console.error(`[${name}] START ERROR:`, startData);
            return;
        }
        
        console.log(`[${name}] Job started:`, startData);
        
        let jobId;
        if (startData.analysis) jobId = startData.analysis._id;
        else if (startData.simulation) jobId = startData.simulation._id;
        else if (startData.competitor) jobId = startData.competitor._id;
        else if (startData.llmstxt) jobId = startData.llmstxt._id;
        else {
            console.error(`[${name}] Could not find job ID in response`);
            return;
        }

        console.log(`[${name}] Polling job ${jobId}...`);
        
        while (true) {
            const resPoll = await fetch(`${BASE_URL}${pollEndpoint}/${jobId}`);
            const pollData = await resPoll.json();
            
            if (!resPoll.ok) {
                console.error(`[${name}] POLL ERROR:`, pollData);
                break;
            }
            
            console.log(`[${name}] Status:`, pollData.status);
            
            if (pollData.status === 'Completed' || pollData.status === 'Failed') {
                console.log(`[${name}] Final Result:`, pollData.status === 'Failed' ? pollData.error || pollData.errorMessage : 'Success');
                break;
            }
            
            await new Promise(r => setTimeout(r, 2000));
        }
        
    } catch (e) {
        console.error(`[${name}] EXCEPTION:`, e.message);
    }
}

async function run() {
    await testService('Analysis', '/analyze', { url: 'https://example.com' }, '/analyze');
    await testService('Simulation', '/simulate', { url: 'https://example.com', selectedModels: ['chatgpt'] }, '/simulate');
    await testService('Competitor', '/competitor', { targetUrl: 'https://example.com', competitorUrl: 'https://example.org' }, '/competitor');
    await testService('LLMs.txt', '/llmstxt', { url: 'https://example.com' }, '/llmstxt');
}

run();
