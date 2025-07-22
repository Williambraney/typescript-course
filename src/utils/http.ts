export async function get(url: string){

    const response = await fetch(url)

    if(!response.ok){
        throw new Error('Failed to fetch data from ' + url);
    }

    const data = await response.json() as unknown; // unknown is better than the default any type

    return data;
    
}