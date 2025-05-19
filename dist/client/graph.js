import ky from "ky";
/**
 * A class representing a graph database.
 * Uses a remote database.
 * @class
 */
class GraphRemote {
    remote;
    /**
     * Create a new database instance.
     */
    constructor(remote) {
        if (typeof remote === "string") {
            const urlObj = new URL(remote);
            const name = urlObj.username;
            const auth = urlObj.password;
            if (!name || !auth)
                throw new Error("Invalid remote database");
            urlObj.username = "";
            urlObj.password = "";
            const url = urlObj.toString().slice(0, -1);
            this.remote = {
                name,
                url,
                auth
            };
        }
        else
            this.remote = remote;
        if (this.remote.url.endsWith("/"))
            this.remote.url = this.remote.url.slice(0, -1);
    }
    /**
     * Make a request to the remote database.
     */
    async _request(type, params = []) {
        const data = {
            db: this.remote.name,
            params
        };
        const url = this.remote.url + "/db/" + type;
        const res = await ky.post(url, {
            json: data,
            headers: {
                "Authorization": this.remote.auth
            },
            throwHttpErrors: false
        }).json();
        if (res.err)
            throw new Error(res.msg);
        return res.result;
    }
    /**
     * Adds an edge between two nodes.
     */
    async add(collection, nodeA, nodeB) {
        return await this._request("add", [collection, nodeA, nodeB]);
    }
    /**
     * Removes an edge between two nodes.
     */
    async remove(collection, nodeA, nodeB) {
        return await this._request("remove", [collection, nodeA, nodeB]);
    }
    /**
     * Finds all edges with either node equal to `node`.
     */
    async find(collection, node) {
        return await this._request("find", [collection, node]);
    }
    /**
     * Finds one edge with either node equal to `nodeA` and the other equal to `nodeB`.
     */
    async findOne(collection, nodeA, nodeB) {
        return await this._request("findOne", [collection, nodeA, nodeB]);
    }
    /**
     * Get all edges in the collection.
     */
    async getAll(collection) {
        return await this._request("getAll", [collection]);
    }
    /**
     * Get the names of all available databases.
     */
    async getCollections() {
        return await this._request("getCollections", []);
    }
    /**
     * Check and create the specified collection if it doesn't exist.
     */
    async checkCollection(collection) {
        return await this._request("checkCollection", [collection]);
    }
    /**
     * Check if a collection exists.
     */
    async issetCollection(collection) {
        return await this._request("issetCollection", [collection]);
    }
    /**
     * Remove the specified collection.
     */
    removeCollection(collection) {
        return this._request("removeCollection", [collection]);
    }
}
export default GraphRemote;
