import { useState } from 'react';
import { Link } from 'react-router-dom';
import apkService from '../services/apkService';

const ApkUpload = () => {
    const [file, setFile] = useState(null);
    const [version, setVersion] = useState('');
    const [busy, setBusy] = useState(false);
    const [msg, setMsg] = useState('');

    // Choose file
    const handleFile = e => {
        const chosen = e.target.files?.[0];
        if (chosen && chosen.type !== 'application/vnd.android.package-archive')
            return alert('Please select a .apk file');
        setFile(chosen);
        setMsg('');
    };

    // Upload to server → Cloudinary
    const handleUpload = async () => {
        if (!file) return alert('Select an APK first');
        setBusy(true);
        try {
            await apkService.uploadApk(file, version);
            setMsg('✅ APK uploaded successfully');
            setFile(null);
            setVersion('');
            // optional: toast / navigate
        } catch (err) {
            alert(err?.response?.data?.error || err.message || 'Upload failed');
        } finally { setBusy(false); }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-start justify-center py-10">
            <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg space-y-6">
                <header className="flex items-center justify-between">
                    <h1 className="text-lg font-bold">APK Uploader</h1>
                    <Link to="/admin/dashboard"
                        className="text-sm text-indigo-600 hover:underline">← Back</Link>
                </header>

                <div className="space-y-4">
                    <input
                        type="file"
                        accept=".apk"
                        onChange={handleFile}
                        disabled={busy}
                        className="block w-full text-sm text-gray-700 file:mr-3 file:px-4 file:py-2 file:border-0
                       file:rounded-md file:bg-indigo-600 file:text-white hover:file:bg-indigo-700
                       disabled:opacity-60"
                    />

                    <input
                        type="text"
                        placeholder="Version (optional e.g. 1.0.4)"
                        value={version}
                        onChange={(e) => setVersion(e.target.value)}
                        disabled={busy}
                        className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
                    />

                    <button
                        onClick={handleUpload}
                        disabled={busy || !file}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400
                       text-white font-medium py-2 rounded-md transition-colors">
                        {busy ? 'Uploading…' : 'Upload APK'}
                    </button>

                    {msg && <p className="text-green-600 text-sm">{msg}</p>}
                </div>
            </div>
        </div>
    );
};

export default ApkUpload;
