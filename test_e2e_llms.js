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
        
        console.log(`[${name}] Job started:`, startData);
        
        let jobId = startData.job ? startData.job._id : null;
        if (!jobId) {
            console.error(`[${name}] Could not find job ID in response`);
            return;
        }

        console.log(`[${name}] Polling job ${jobId}...`);
        
        while (true) {
            const resPoll = await fetch(`${BASE_URL}${pollEndpoint}/${jobId}`);
            const pollData = await resPoll.json();
            
            console.log(`[${name}] Status:`, pollData.status);
            
            if (pollData.status === 'Completed' || pollData.status === 'Failed') {
                console.log(`[${name}] Final Result JSON:`, JSON.stringify(pollData, null, 2));
                break;
            }
            
            await new Promise(r => setTimeout(r, 2000));
        }
        
    } catch (e) {
        console.error(`[${name}] EXCEPTION:`, e.message);
    }
}

async function run() {
    await testService('LLMs.txt', '/llmstxt', { url: 'https://example.com' }, '/llmstxt');
}

run();
