/** @type {{headers(): Promise<[{headers: [{value: string, key: string}, {value: string, key: string}, {value: string, key: string}, {value: string, key: string}], source: string}]>}} */
const nextConfig = {
    basePath: process.env.BASE_PATH,
    env: {
        basePath: process.env.BASE_PATH
    },
    crossOrigin: 'anonymous'
    // async headers() {
    //     return [
    //         {
    //             // matching all API routes
    //             // source: "/api/:path*",
    //             source: "/:path*",
    //             headers: [
    //                 { key: "Access-Control-Allow-Credentials", value: "true" },
    //                 { key: "Access-Control-Allow-Origin", value: "http://127.0.0.1:8000/" }, // replace this your actual origin
    //                 { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
    //                 { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
    //             ]
    //         }
    //     ]
    // }
};

export default nextConfig;
