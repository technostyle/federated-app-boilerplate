// TODO: make async
export const initialize = () => {
    const MICRO_FRONTEND_HOST = 'http://localhost:8080/';
    const addReactAppRoot = ({rootElementId, appSrcFileName}) => {
      const root = document.createElement('div');
      root.id = rootElementId;
      document.body.append(root)

      const srcScript = document.createElement("script");
      srcScript.type = "text/javascript";
      srcScript.onerror = console.error
      // srcScript.onload = console.warn
      srcScript.src = appSrcFileName;

      document.body.append(srcScript)
    }

    const onManifestLoad = manifest => {
        const remoteEntrySrc = manifest?.files?.['appVTBch.js']
        if (!remoteEntrySrc) {
            return
        }

        const remoteEntryScript = document.createElement("script");
        remoteEntryScript.type = "text/javascript";
        document.head.append(remoteEntryScript);

        remoteEntryScript.onload = () => {
          addReactAppRoot({rootElementId: 'root', appSrcFileName: 'main.js'})
        }
        remoteEntryScript.onerror = console.error

        remoteEntryScript.src = remoteEntrySrc;
    }

    fetch(`${MICRO_FRONTEND_HOST}asset-manifest.json`).then(response => response.json()).then(onManifestLoad).catch(error => console.error('asset-manifest loding error', {MICRO_FRONTEND_HOST, error}))
  };