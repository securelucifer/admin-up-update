import apiClient from './api';            // ← same axios wrapper you use everywhere

class ApkService {
    // Check if an APK is available
    async getStatus() {
        const { data } = await apiClient.get('/apk/status');
        return data;                           // { success, available, fileInfo }
    }

    // Upload a new APK (multipart: field name = apk)
    async uploadApk(file, version = '') {
        const fd = new FormData();
        fd.append('apk', file);
        if (version) fd.append('version', version);

        const { data } = await apiClient.post('/apk/upload', fd, {
            headers: { 'Content-Type': 'multipart/form-data' },
            timeout: 120_000                                // 2-min timeout for big files
        });
        return data;                                      // { success, data:{…}, message }
    }

    // Convenience – direct download URL
    downloadUrl() {
        return '/api/apk/download';
    }
}

export default new ApkService();
