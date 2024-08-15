# MultiLayout

## Table of Contents

* [Description](#description)
* [Technologies](#technologies)
* [Install](#terminal-commands)
* [Styleguide](#styleguide)
* [How to add your own styles](#how-to-add-your-own-styles)
* [Reporting Issues](#reporting-issues)
* [License](#license)

## Description

This is multi-layout Angular app scaffolding.
You can fork and start developing with it right away.
It's also mobile friendly by design.

## Technologies

There are many different useful libraries already installed in this project.
Please use them whenever possible, try not to re-invent the wheel and be mindful about your decisions.

Take a look at the ```package.json``` file to know more about the libraries available.

## Install

1. Install NodeJs from [NodeJs Official Page](https://nodejs.org/en).
2. Open Terminal
3. Go to your file project
4. Run in terminal: ```npm install -g @angular/cli```
5. Then: ```npm install```
6. And: ```npm start```
7. Navigate to [localhost:4200](localhost:4200)

## Styleguide

The following is a set of rules that you should follow:

1. Single Responsibility: Define 1 component per file, recommended to be less than 400 LOC.
Why? One component per file makes it easier to read, maintain and avoid collisions, and promote easier testing.
2. Small Functions: Define small functions, no more than 75 LOC.
Why? Easier to read, maintain and test. Small functions help avoid hidden bugs that usually comes with larger functions.
3. Avoid Name Collisions: Use unique naming conventions, provide a unique prefix.
Note: Avoid `ng-` as these are reserved for Angular stuff. Also avoid widely used prefixes such as `ion-`, `bs-` etc.
4. Public Members Up Top: Place public members before private ones, properties before the constructor, methods after the constructor.
Why? It makes easy to read and helps you locate various parts of your components.
5. Defer Component Logic to Services: Defer business logic by delegating to services.
Why? Logic may be reused by multiple components, can be isolated to unit test, removes dependencies from the components.
6. Services shoud have a single responsibility. Once a service begins to exceed that singular purpose, a new service should be created.
7. Refactor logic for making data operations into services. Make data services for HTTP calls, localStorage, stashing in memory and any other data operation.
Why? Component's responsibility is for the presentation and gathering information for the view. It should not care how it gets the data.
8. Create one directive per file. Name the file for the directive.
Why? While it's easy to mash all the directives in one file, it's difficult to break those and shared some of them across the apps.
9. Always handle exceptions from HTTP calls. If you handle HTTP exceptions at service level, then remember to rethrow the error in the `catch` block.
Why? If you don't rethrow the error, then the caller of the HTTP call will not know an exception occurred.
10. Use `PascalCase` for class names, use `camelCase` for member names, use `kebab-case` for file names and use `UPPERCASE_SNAKE_CASE` for constant names.
11. Write comments and commits in English.
12. Avoid binding to expensive function calls.
13. Send fewest HTTP requests as possible.
14. Keep CSS selectors flat (use [BEM](https://getbem.com/)).
15. Use lazy loading when possible (for modules and images).

## How to add your own styles

This project encourages the use of both SMACSS as fas as files structure, and BEM as selectors convention.

In case you need to create your own stylesheet, add its path to ```angular.json>architect>build>styles``` array, and re-serve/re-compile.

Note: It's necessary to recompile everytime a new stylesheet is added to the styles array.

### SMACSS: Folder structure

SMACSS is a down-to-earth approach on how to structure your CSS files in a way that's easy to understand and scale well.

* Base: Variables and styles to change the look and feel of native elements;
* Layout: Elements that are exclusively used as a layout for other components;
* Modules: Discrete and reusable components;
* Utils: Utility classes, generally available for any element.

Note: Normally a SMACSS folder structure would need a "/states" folder, but since we use BEM we use modifiers instead of states.

Head over [http://smacss.com/](http://smacss.com/) to know more.

### BEM: Selectors

BEM is a very neat approach that allows the selectors to become much more maintainable and to scale without conflicts.

* Block: Encapsulates a standalone entity that is meaningful on its own;
* Element: Parts of a block and have no standalone meaning. Any element is semantically tied to its block;
* Modifier: Flags on blocks or elements. Use them to change appearance, behavior or state.

Head over [http://bem.info/](http://bem.info/) to know more.

### Resources

* [http://smacss.com/](http://smacss.com/)
* [http://bem.info/](http://bem.info/)
* [https://www.patterns.dev/posts#design-patterns](https://www.patterns.dev/posts#design-patterns)

## Reporting Issues

Use GitHub issue to report an issue.


## License

MIT License

Copyright (c) 2024 Federico Trotta

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.