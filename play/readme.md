axios

request.interceptors.request.use((config) => {
// ✅ Ultimate fix for OpenAPI + FormData bug
if (config.data instanceof FormData) {
delete config.headers['Content-Type'];
// 🔥 Full kill override: remove ALL transform functions from OpenAPI
config.transformRequest = undefined;
}
return config;
});
