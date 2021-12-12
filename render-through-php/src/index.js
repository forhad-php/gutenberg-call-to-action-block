/**
 * Steps::
 * ======
 * 1. Import the component
 * 2. Pre set attributes
 * 3. Set attribute in edit() method
 * 4. Set function in edit() method
 * 5.Set markup into <PanelBody> component
 */

// https://github.com/WordPress/gutenberg/tree/master/packages/blocks
import { registerBlockType } from '@wordpress/blocks';
// https://github.com/WordPress/gutenberg/tree/master/packages/block-editor
import { InspectorControls, ColorPalette } from '@wordpress/block-editor';
// https://github.com/WordPress/gutenberg/tree/master/packages/components
import { __experimentalHeading as Heading, PanelBody, RangeControl, SelectControl } from '@wordpress/components';
// https://developer.wordpress.org/block-editor/reference-guides/packages/packages-server-side-render/
import ServerSideRender from '@wordpress/server-side-render';
// https://reactjs.org/docs/hooks-reference.html#usestate
import { useState } from '@wordpress/element';

registerBlockType( 'gutenberg-examples/example-01-basic-esnext', {
	title: 'Basic Example',
	icon: 'smiley',
	category: 'design',
	attributes: {
		titleColor: {
			type: 'string',
			default: 'black',
		},
		postsPerPage: {
			type: 'number',
			default: 0.3
		},
		category: {
			type: 'string',
			default: 'uncategorized'
		},
	},

	edit({ attributes, setAttributes }) {

		const {
			titleColor,
			postsPerPage,
			category
		} = attributes;
 
		// How to input categories in SelectControl component
		// https://wordpress.stackexchange.com/questions/372134/gutenberg-block-get-categories-in-selectcontrol
		// Or try to use checkbox
		// https://developer.wordpress.org/block-editor/reference-guides/components/checkbox-control/#when-to-use-checkboxes
		function MyAuthorsListBase() {

			const { useSelect } = wp.data;

			const categories = useSelect( ( select ) => {
				return select( 'core' ).getEntityRecords('taxonomy', 'category');
			}, [] );
		
			if ( ! categories ) {
				return null;
			}
		
			return (
				<ul>
					{ categories.map( ( category ) => (
						<li key={ category.id }>{ category.name }</li>
					) ) }
				</ul>
			);
		}

		function onTitleColorChange( newColor ) {

			setAttributes({ titleColor: newColor });
		}
		function onpostsPerPageChange( newOpacity ) {

			setAttributes({ postsPerPage: newOpacity });
		}
		function onCatChange( newCategory ) {

			setAttributes({ category: newCategory });
		}

		return ([
			// https://developer.wordpress.org/block-editor/reference-guides/components/
			<InspectorControls>
				{/* https://developer.wordpress.org/block-editor/components/panel/#design-guidelines */}
				<PanelBody
					title={ 'Font Color Settings' }
					icon="admin-appearance"
					initialOpen={ true }>
					<p><strong>Select a Title color:</strong></p>
					<ColorPalette
						value={ titleColor }
						onChange={ onTitleColorChange } />
				</PanelBody>

				<PanelBody
					title={ 'Posts Control' }
					icon="admin-generic"
					initialOpen={ false }>
					<RangeControl
						label={ 'Total Post' }
						help={ 'Set how much posts you want to show.' }
						value={ postsPerPage }
						onChange={ onpostsPerPageChange }
						min={ 1 }
						max={ 100 }
						step={ 1 } />
				</PanelBody>

				<PanelBody
					title={ 'Category' }
					icon="category"
					initialOpen={ false }>
					<Heading>The Heading Component.</Heading>
					<SelectControl
						label={ 'Category' }
						help={ 'Set a post category.' }
						value={ category }
						options={[
							{ label: 'Uncategorized', value: 'uncategorized' },
							{ label: 'Dog', value: 'dog' },
							{ label: 'Bird', value: 'bird' },
						]}
						onChange={ onCatChange }
					/>
				</PanelBody>

				<MyAuthorsListBase />

			</InspectorControls>,

			// Posts direct show from 'render_callback' on the editor.
			// Try This one: https://wordpress.stackexchange.com/questions/368875/serversiderender-does-not-render-preview-html-inside-gutenberg-block
			<div><p>Posts are showing here: yaaaaaa</p>
            <ServerSideRender
                block={ "gutenberg-examples/example-01-basic-esnext" } />
			</div>
		]);
	},

	// Render via PHP
    save() {
        return null;
    },

} );
