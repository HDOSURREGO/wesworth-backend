module.exports = {
  apps : [{
    name        : "wesworth-app",
    script      : "/home/ubuntu/var/www/wesworth-app/server/app.js",
    watch       : true,
    env: {
      "NODE_ENV": "development",
    },
    env_production : {
     "NODE_ENV": "production"
    }
  },
  {
    name       : "wesworth-app",
    script     :"/home/ubuntu/var/www/wesworth-app/client/src/index.js",
    watch       : true,
    env: {
      "NODE_ENV": "development",
    },
    env_production : {
      "NODE_ENV": "production"
    }
  }]
}

