## React Awesome Popover Package Usage :

#### Execute the command →
`npm i react-awesome-popover`

#### Import it →
`import ReactAwesomePopover from 'react-awesome-popover';`

#### Assign the popover →
`const Popover = ReactAwesomePopover;`

#### Code →
```HTML
<Popover>
    <button>The Target</button>
    <div>The content</div>
</Popover>
````

#### Nested Component →
```JS
return ([
    <MyToggleControl />,
    <Popover>
	<button>The Target</button>
	<div>
	<NumberControl
	    label={ __( 'Set column of the posts:' ) }
	    onChange={ onPostColChange }
	    value={ postCol }
				/>
	</div>
    </Popover>
]);
```

Icon pack using popover →
https://codesandbox.io/s/ur4cb?file=/src/react-icon-picker.js
\
\
\
\
\
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
\
\
\
\
\
## Post Block - If has `package.json` file →

#### Just install dependencies via run command `npm install`
#### Then create production build via run command `npm run build`
\
\
\
\
\

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
\
\
\
\
\

# Registration multi block and include at `src/index.js`

#### First of all, create a file at `src/another-block/index.js` and write the below code :
```JS
import { registerBlockType } from '@wordpress/blocks';

registerBlockType( 'my-plugin/notice', {
	title: 'Notice',
	icon: 'admin-plugins',
	category: 'design',
	edit: () => <div>Hola, mundo!</div>,
	save: () => <div>Hola, mundo!</div>,
} );
```

#### Now write the code below at `src/index.js` to import the block :
```JS
import './another-block/';
```

** Sources →
*
* Need another render_callback for this particular block? Just follow the below link :
* https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#php-server-side
* 
* Another resource :
* https://stackoverflow.com/questions/68370984/gutenberg-blocks-registering-more-than-one-block-with-register-block-type-from
\
\
\
\
\

# Get Post Title from WordPress Core Data.
```JS
const { select } = wp.data;
const posts = select('core').getEntityRecords( 'postType', 'post', {per_page: 5});

return ([
	<div class="cta-container" style={{background: 'gray'}}>

		<ul className="post-title">
			{posts.map((item) => (
				<li className="post-title">
				{item.title.rendered}
				</li>
			))}
		</ul>
	</div>
]);
// NOTE: For the first time the block should be saved on editor page. Then you will able to see post titles.
```
