import { app, BrowserWindow, ipcMain, Menu, shell } from 'electron'
import * as util from './util';
import pkg from '../../package';
import { url } from 'inspector';
import '../renderer/store'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow

app.on('ready', initApp);

app.on('window-all-closed', () => {
  if (!util.isMac()) {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createMainWindow();
  }
});

function initApp() {
  //win10 ,不设置没有通知显示
  app.setAppUserModelId(pkg.build.appId);
  
  const menu = Menu.buildFromTemplate(getMenuData());
  Menu.setApplicationMenu(menu);
  //创建主窗口
  createMainWindow();
  //托盘处理
  // util.isMac() && trayUtil.createTray(mainWindow.id);
  registerIPC();
  
}

function createMainWindow() {
  mainWindow = new BrowserWindow({
    height: 1000,
    width: 1500,
    title: pkg.cnname,
    titleBarStyle: 'hidden',
    //frame: false,
    //icon: util.isWin() ? util.getIconPath('logo.ico') : util.getIconPath('logo.png'),
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true
    }
  });
  
  mainWindow.loadURL(util.mainURL);
  
  mainWindow.on('closed', () => {
          // mainWindow = null;
    app.quit();
  });
}

/**
  * 注册IPC事件
*/
const registerIPC = function () {
  ipcMain.on('miniWindow', function (event, option) {
    mainWindow.setContentSize(option.width, option.height, true);
  });
  ipcMain.on('register', function() {
      mainWindow.loadURL(url.format({
          pathname: path.join(__dirname, '#/RegisterPage'),
          protocol: 'file',
          slashes: true
      }))
  })
}

const getMenuData = function () {
  const template = [
      {
          label: '修改',
          submenu: [
              {role: 'undo', label: '撤销'},
              {role: 'redo', label: '重做'},
              {type: 'separator'},
              {role: 'cut', label: '剪切'},
              {role: 'copy', label: '复制'},
              {role: 'paste', label: '粘贴'},
              {role: 'pasteandmatchstyle', label: '粘贴并匹配样式'},
              {role: 'delete', label: '删除'},
              {role: 'selectall', label: '全选'}
          ]
      },
      {
          label: '设置',
          submenu: [
              {
                  label: '重新加载',
                  click() {
                      if (mainWindow) {
                          mainWindow.loadURL(util.mainURL);
                      }
                  }
              },
              {
                  label: '清除缓存&重新加载',
                  click() {
                      //
                      if (mainWindow) {
                          mainWindow.webContents.session.clearCache(function () {
                              mainWindow.loadURL(util.mainURL);
                          });
                      }
                  }
              },
              {role: 'toggledevtools', label: '开发者工具'},
          ]
      },
      {
          label: '窗口',
          submenu: [
              {role: 'minimize'},
              {role: 'close'}
          ]
      },
      {
          label: '帮助',
          submenu: [
              {
                  label: 'wiki',
                  click() {
                      shell.openExternal('https://github.com/willnewii/qiniuClient/wiki');
                  }
              },
              {
                  label: '提交异常或需求',
                  click() {
                      shell.openExternal('https://github.com/willnewii/qiniuClient/issues');
                  }
              }
          ]
      }
  ];

  let aboutMenu = {
      label: '关于',
      click() {
          if (aboutWindow) {
              aboutWindow.show();
          } else {
              let aboutWindow = new BrowserWindow({
                  width: 300,
                  height: 300,
                  resizable: false,
                  autoHideMenuBar: true,
                  title: '关于',
                  //icon: util.isWin() ? util.getIconPath('logo.ico') : util.getIconPath('logo.png'),
                  webPreferences: {
                      webSecurity: false,
                      backgroundThrottling: false,
                      nodeIntegration: true
                  }
              });
              aboutWindow.loadURL(util.mainURL + '#/about');
              aboutWindow.on('closed', () => {
                  aboutWindow = null;
              });
          }
      }
  };

  if (process.platform === 'darwin') {
      template.unshift({
          label: app.getName(),
          submenu: [
              aboutMenu,
              {type: 'separator'},
              {role: 'services', submenu: []},
              {type: 'separator'},
              {role: 'hide', label: '隐藏'},
              {role: 'hideothers', label: '隐藏其他'},
              {role: 'unhide', label: '显示全部'},
              {type: 'separator'},
              {role: 'quit', label: '关闭'}
          ]
      });

      template[3].submenu = [
          {role: 'close'},
          {role: 'minimize', label: '最小化'},
          {role: 'zoom', label: '缩放'},
      ];
  } else {
      template[template.length - 1].submenu.unshift(aboutMenu);
  }
  return template;
};


/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
