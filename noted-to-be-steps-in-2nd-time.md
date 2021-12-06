## 0. At first i've start development gutentber in the below soruce. 
	- Source: https://github.com/forhad-php/gutenberg-call-to-action-block
## 1. Install NodeJS & Cmder if have not.
	- Install NodeJS (Recommanded for most users)
## 2. Write the command in Cmder `npm init` and execute
	- Press enter and fill up the needs
## 3. Run the Command `cd post-block`
## 4. Run the Command `npm install --save-dev --save-exact @wordpress/scripts`
## 5. Create a File `src/index.js` and paste the code from below
	- Source: https://developer.wordpress.org/block-editor/tutorials/javascript/js-build-setup/#setting-up-wp-scripts-build
	```JS
	import { registerBlockType } from '@wordpress/blocks';
 
	registerBlockType( 'myguten/test-block', {
		title: 'Basic Example',
		icon: 'smiley',
		category: 'design',
		edit: () => <div>Hola, mundo!</div>,
		save: () => <div>Hola, mundo!</div>,
	} );
	```
	- Source: https://github.com/forhad-php/gutenberg-call-to-action-block/blob/master/gutenberg-call-to-action-block/src/index.js
## 6. Create file `src/style.css` and `src/editor.css` then paste the code from below in both files.
	- The file `style.css` is for display mode and `editor.css` is for editor mode.
	```CSS
	.cta-container {
		border: 2px solid red;
	}
	```
## 7. Edit the file `package.json` and replace the "scripts" like below
	- Source: https://developer.wordpress.org/block-editor/how-to-guides/javascript/js-build-setup/#development-mode
	```JS
	"scripts": {
		"start": "wp-scripts start",
		"build": "wp-scripts build"
  	},
	```
## 8. Create a file `post-block.php` and paste the below code
	- Source: https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/writing-your-first-block-type/#enqueuing-block-scripts
	```PHP
	<?php
	/*
	Plugin Name: Gutenberg examples 01
	*/
	function gutenberg_examples_01_register_block() {

		// automatically load dependencies and version.
		$asset_file = include plugin_dir_path( __FILE__ ) . 'build/index.asset.php';

		// Enqueue script
		wp_register_script(
			'gutenberg-examples-01-esnext',
			plugins_url( 'build/index.js', __FILE__ ),
			$asset_file['dependencies'],
			$asset_file['version'],
			true,
		);

		// Enqueue style on editor
		wp_register_style(
			'gutenberg-examples-01-editor',
			plugins_url( 'src/editor.css', __FILE__ ),
			array( 'wp-edit-blocks' ),
			filemtime( plugin_dir_path( __FILE__ ) . 'src/editor.css' ), // filemtime() returns the last time of when its content was modified.
		);

		// Enqueue style on display
		wp_register_style(
			'gutenberg-examples-01',
			plugins_url( 'src/style.css', __FILE__ ),
			array(),
			filemtime( plugin_dir_path( __FILE__ ) . 'src/style.css' ), // filemtime() returns the last time of when its content was modified.
		);

		// Register the block 
		register_block_type(
			'gutenberg-examples/example-01-basic-esnext',
			array(
				'api_version'   => 2,
				'style'         => 'gutenberg-examples-01',
				'editor_style'  => 'gutenberg-examples-01-editor',
				'editor_script' => 'gutenberg-examples-01-esnext',
			)
		);

	}
	add_action( 'init', 'gutenberg_examples_01_register_block' );
	```
## 9. Run the Command `npm start` to start development!
## 10. Activate the plugin!!
## 11. After development, Run the Command `npm run build` to create a prduction build. You will see a build folder in the root. Now you just move `build`, `src`, and `post-blog.php` into another folder name as same as project name. Your plugin will be ready.



## For contributers
====================
- Source: https://developer.wordpress.org/block-editor/tutorials/javascript/js-build-setup/#summary
### 0. Just remove the `node_modules` and upload into github.
### 1. They install dependencies through run the command `npm install`
Thats it!
