module.exports = {
    serverUrl: process.env.ELASTIC_APM_SERVER_URL,
    serviceName: process.env.ELASTIC_APM_SERVICE_NAME,
    environment: process.env.ELASTIC_APM_ENV,
    transactionSampleRate: process.env.ELASTIC_APM_TX_SAMPLE_RATE,
    centralConfig: process.env.ELASTIC_APM_CENTRAL_CONFIG,
    verifyServerCert: false,
}