declare var require: any

const bootstrap: string = require('../../package.json').dependencies['bootstrap']
    .replace('^', '')
    .split('.')
    .slice(0, 2)
    .join('.'); // extracts only the minor version "4.0.1" -> "4.0"

const ngBootstrap: string = require('../../package.json').dependencies['@ng-bootstrap/ng-bootstrap']
    .replace('^', '')
    .split('.')
    .slice(0, 2)
    .map((v: string, i: number) => i === 1 ? "x" : v)
    .join('.'); // extracts only the major and blank minor with x "4.0.1" -> "4.x"

export const versions: { [key: string]: string } = {
    bootstrap,
    ngBootstrap
};