import pkg from "../../package";

const fs = require('fs');
import {Notification} from "electron";

export const mainURL = process.env.NODE_ENV === 'development' ? 'http://localhost:9080/' : `file://${__dirname}/index.html`;

export const isMac = function () {
    return process.platform === 'darwin';
};

export const isWin = function () {
    return process.platform === 'win32';
};

export const isLinux = function () {
    return process.platform === 'linux';
};

/**
 * 统一win的分割符 \ => /
 * @param path
 * @returns {*}
 */
export function convertPath(path) {
    return path.replace(/\\/g, '/');
}

/**
 * 是否是目录类型
 * @param path
 * @returns {Stats | boolean}
 */
const isDirectory = function (path) {
    return fs.statSync(path).isDirectory();
};

export const notification = function (option) {
    option.title = option.title || pkg.cnname;
    option.body = option.message;
    option.silent = true;
    // option.subtitle = 'subtitle';
    // option.body = 'body';
    new Notification(option).show();
};
