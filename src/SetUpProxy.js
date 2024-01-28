const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports=app=>{ 
    app.use(
        createProxyMiddleware("/api/token",{ 
            target:"https://api.chartmetric.com",
            changeOrigin:true
        })
    )  
  
    app.use(
        createProxyMiddleware("/api/charts/spotify/artists?latest=true&interval=monthly&type=playlist_reach",{ 
            target:"https://api.chartmetric.com",
            changeOrigin:true
        })
    )  

    app.use(
        createProxyMiddleware("/api/charts/spotify?latest=true&country_code=US&interval=daily&type=regional",{ 
            target:"https://api.chartmetric.com",
            changeOrigin:true
        })
    )  
    

    app.use(
        createProxyMiddleware("/api/charts/youtube/videos?latest=true&country_code=us&offset=0",{ 
            target:"https://api.chartmetric.com",
            changeOrigin:true
        })
    ) 
}