function fn() {
    let env = karate.env; // get system property 'karate.env'
    karate.log('karate.env system property was:', env);
    let config = {
        env: env,
        appId: 'classification-api',
        baseUrl: '',
        token: karate.properties['token'],
    };
    switch (env) {
        case 'prod':
            config.baseUrl = `https://classify.api.schafe-vorm-fenster.de`;
            break;
        default: // local
            config.baseUrl = 'http://localhost:8100';
            config.token = config.token || "Mow123"
            break;
    }
    karate.configure('retry', { count: 5, interval: 5000 });
    karate.configure('headers', { 'Sheep-Token': config.token });
    return config;
}