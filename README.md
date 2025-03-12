# React.js and WASM Example

This is an example of how to integrate WebAssembly (WASM) into a React.js project. The integration process allows you to use WASM modules for faster execution of code in the browser, providing an enhanced user experience.

TL/DR need to see demo in action: [barKoder React WASM Demo](https://dev2.afk.mk/react-wasm-demo/build/).

## Features

- **Barcode Scanning**: Scan a wide variety of barcodes (1D, 2D) including QR codes, UPC, Code 128, and more.
- **Camera Selection**: Select the active camera and adjust camera settings such as resolution and scanning speed.
- **Template Selection**: Use predefined templates (like "All Barcodes" or "QR Barcodes") to simplify barcode type selection.
- **MultiScan**: Toggle between single and multi-scan modes to scan multiple barcodes at once.
- **Notifications**: Receive notifications of scan results and manage the display of scan history.
- **CSV Export**: Export scan results to a CSV file for further processing.
- **Copy**: Copy barcode result to clipboard.
- **Search**: Search scanned barcode on google.
- **Real-Time Feedback**: Display the scanned barcode result in real-time with visual overlays.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or above)
- npm (v6 or above)


## Project Setup (Installation)

Follow the steps below to set up and run this project:

### 1. Clone the Repository

Start by cloning the repository to your local machine:

```bash
git clone <repository_url>
cd <project_folder>
npm install
npm run-script build
npm start
```


## Implementation

```bash
npx create-react-app app-name
cd app-name
npm install barkoder-wasm
```

### index.js file:

```javascript
import React from "react";
import ReactDOM from "react-dom/client";
import SampleApp from "./sampleapp";
import './main.css'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<SampleApp />);
```

### sampleapp.js:

```javascript
import React, { useState, useEffect, useMemo } from "react";
import BarkoderSDK from "barkoder-wasm";

const [barkoder, setBarkoder] = useState(null);
const [templateData, setTemplateData] = useState({});

const readTemplate = async () => {
  try {
    const response = await fetch(`templates.json`);
    const data = await response.json();
    setTemplateData(data);
  } catch (error) {
    console.error("Error loading template:", error);
  }
};

useEffect(() => {
  const initializeBarkoder = async () => {
    const sdk = await BarkoderSDK.initialize(
      "YOUR_LICENCE_KEY"
    );
    sdk.setEnabledDecoders(
      sdk.constants.Decoders.QR,
      sdk.constants.Decoders.Ean8,
      sdk.constants.Decoders.PDF417
    );
    sdk.setCameraResolution(sdk.constants.CameraResolution.FHD);
    sdk.setDecodingSpeed(sdk.constants.DecodingSpeed.Normal);
    sdk.setContinuous(true);
    setBarkoder(sdk);
  };
  initializeBarkoder();
}, []);

useEffect(() => {
  const fetchData = async () => {
    await readTemplate();
    setTemplateData("all");
  };
  fetchData();
}, []);
```

```javascript
const startScanner = () => {
    setIsCameraStarted(true);
    setBarcodesScannedCount(0);

    setFlags((prevFlags) => ({
      ...prevFlags,
      mode: "scanning",
      cammeraLoading: true,
    }));

    setTimeout(() => {
      if (barkoder) {
        barkoder?.startScanner((result) => {
          showResult(result);  
        });
      }
    }, 300);  
  };

const stopScanner = (mode) => {
  barkoder.stopScanner();
  setIsCameraStarted(false);
  setFlags((prevFlags) => ({
    ...prevFlags,
    cammeraRunning: false,
    cammeraLoading: false,
    mode: "initial",
    showResultBox: "",
  }));

  if (mode === "restart") {
    setTimeout(startScanner, 400);
  }
};
```

```html
<div id="wasmApp">
    <div id="barkoder-container"></div>
    <button className="start_scanner" type="button" onClick={startScanner}>Start Scanner</button>
</div>
```

```css
#barkoder-container {
	position: fixed; 
	top: 0; 
	left: 0;
	width: 100%; 
	height: 100%;
	background-color:#FFFFFF;
	z-index: 1;
}
```

## Demo

As mentioned to see this code in action on a live web server you can try [barKoder React WASM Demo](https://barkoder.com/react-wasm-demo/). Works best in Safari on iOS and Chrome on Android. Other main browser are also supported.

## License

[barKoder SDK](https://barkoder.com) uses a license to operate.

Running the barKoder Barcode Scanner SDK without a valid trial or production license will result in all successful barcode scan results being partially masked with asterisks (*). Don't worry, though! You can easily get a trial license by registering on the barKoder Portal and using the self-service [Evaluation License Generation](https://barkoder.com/request-quote).

Each trial license is valid for 30 days and can be used on up to 50 devices.







