
# Edge Extension: JSON Visualizer

This Edge browser extension converts a JSON response into an object tree to provide a better reading experience. It also allows the user to expand/collapse objects in the tree.


## Steps to create a package to submit the extension in the Windows Store

Once you are finished with the development of your app, you would need to go through the following steps before it can be listed in the Windows Store.


### Step 1: Developer account and the preparation for app submission

- If you do not have a windows developer account, create one by paying the nominal fee to list your app(s) in the Windows Store
- Login to your developer account and create a new app, reserve a catchy name for your upcoming app
- Go to "App management" and check the app identity details (it will be required when creating the package)


### Step 2: Use manifoldjs to create package folder structure 

- Install Nodejs and node_module manifoldjs (npm -install g manifoldjs) 
- Start Node.js command prompt, swtich to the folder where you want to copy the package artifacts (e.g. run "cd C:\EdgeExtensions")
- Run command: manifoldjs -l debug -p edgeextension -f edgeextension -m C:\Git\My.Extensions.Edge.JsonVisualizer\manifest.json
- Verify folder structure and that all the required files are correctly copied under the edgeextension\manifest\Extension folder
- Copy correct icons in the Assets folder
- Edit the appxmanifest.xml with correct app identity details (we saw it in the Step 1)


### Step 3: Use MakeAppx tool to create the package 

- Make sure that you have Win SDK installed, verify that you have (C:\Program Files (x86)\Windows Kits\10\bin\x64) folder
- Start cmd as administrator 
- Run command: "C:\Program Files (x86)\Windows Kits\10\bin\x64\makeappx.exe" pack /h SHA256 /d "C:\EdgeExtensions\JSONVisualizer\edgeextension\manifest" /p C:\EdgeExtensions\AppexTest\JSONVisualizer.appx
- Verify that an appx file is created in the destination folder


### Step 4: Verify your package before submitting

- Start cmd as administrator
- Unpack the newly created package by running the command: "C:\Program Files (x86)\Windows Kits\10\bin\x64\makeappx.exe" unpack /v /p C:\EdgeExtensions\AppexTest\JSONVisualizer.appx /d C:\EdgeExtensions\AppexTest\JSONVisualizer
- Sideload the extension in the Edge browser and check everything works as expected


### Step 5: The package submission and the approval

- Log on to your developer account and upload the appex package to the correct App (if you have more than one) 
- Choose desired Pricing, Properties, Age rating and Store listing
- Provide some info in "Notes for certification" for testers to understand what your app does
- Wait for the approval from Microsoft


## Other relevant info

- Info on how to create an app package signing certificate: https://msdn.microsoft.com/en-us/library/windows/desktop/jj835832.aspx
