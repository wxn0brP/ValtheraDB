const kyShim = {
    post: (url, options) => fetch(url, { 
        method: "POST", 
        body: JSON.stringify(options.json), 
        headers: { 
            ...options.headers, 
            "Content-Type": "application/json" 
        } 
    }).then(res => res.json())
};

export default kyShim;
