const kyShim = {
    post: (url, options) => ({
        json: async () => {
            const res = await fetch(url, { 
                method: "POST", 
                body: JSON.stringify(options.json), 
                headers: { 
                    ...options.headers, 
                    "Content-Type": "application/json" 
                } 
            });
            return res.json();
        }
    })
};

export default kyShim;
