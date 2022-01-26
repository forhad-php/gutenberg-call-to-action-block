## To create style component and render styles : 

#### Run the command → `npm install style-it --save`
#### And import it → `import Style from 'style-it';`
#### Implementation →
```JS
<div>
  <Style>{`#forhad-guten-posts li{color: ${titleColor} !important;}`}</Style>
  <ServerSideRender
      block={ "gutenberg-examples/example-01-basic-esnext" } />
</div>
```

# Post Block - If lost the track →
#### After command `npm init`

package name: (post-block)
version: (1.0.0) (write the current version)
description:
entry point: (index.js)
test command:
git repository:
keywords:
author: Forhad
license: (ISC)

Is this OK? (yes) yes

#### Execute the command `npm install --save-dev --save-exact @wordpress/scripts`

#### Open `package.json` and replace the `"scripts": {}` property as like below :
```JS
"scripts": {
	"start": "wp-scripts start",
	"build": "wp-scripts build"
},
```

> If there was any dependencies, just include them at the end of the file like below :

```JS
"dependencies": {
	"style-it": "^2.1.4"
}
```

### Now run the Command `npm start` to start development!
