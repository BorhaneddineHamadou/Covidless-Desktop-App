const electron = require('electron');
const url = require('url');
const path = require('path');
const {app, BrowserWindow, Menu} = electron;


//set ENV
process.env.NODE_ENV = 'production';
let loginWindow;
//Listen for the app to be ready
app.on('ready', function(){
    //create new window
    loginWindow = new BrowserWindow({});
    loginWindow.maximize();
    //Load html file into the window
    loginWindow.loadURL(url.format({
        pathname : path.join(__dirname, 'loginWindow.html'),
        protocol : 'file:',
        slashes : true
    }));
    //Build Menu From the Template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate); 
    //Insert The Menu
    Menu.setApplicationMenu(mainMenu);
});
//Create Menu Template
const mainMenuTemplate = [
  {
      label:'File',
      submenu:[
          {
              label : 'Quit',
              accelerator : process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
              click(){
                  app.quit();
              }
          }
      ]
  }
];

//If mac add enpty object to menu
if(process.platform == 'darwin'){
    mainMenuTemplate.unshift({});
}

//Add developer tools Item if not in production
if(process.env.NODE_ENV != 'production'){
    mainMenuTemplate.push({
        label : 'Developer Tools',
        submenu : [
            {
                label : 'Toggle DevTools',
                accelerator : process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(item, focusedWindow){
                   focusedWindow.toggleDevTools();
                }
            },
            {
                role : 'reload'
            }
        ]
    });
}